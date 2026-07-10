import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/session";
import { listEmployees, createUser, createEmployee, audit } from "@/lib/data";
import { hashPassword } from "@/lib/auth/session";
import { db } from "@/lib/db";

export const runtime = "nodejs";

const MOBILE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^\S+@\S+\.\S+$/;
const NAME_RE = /^[A-Za-z .'-]{2,100}$/;

/** GET /api/admin/employees — list employees with stats. */
export async function GET() {
  try {
    await requireRole("admin");
    const employees = await listEmployees();
    // Augment with assignment counts + conversions.
    const withStats = await Promise.all(
      employees.map(async (e) => {
        const [assignments, converted] = await Promise.all([
          db.callAssignment.count({ where: { employeeId: e.id } }),
          db.callAssignment.count({ where: { employeeId: e.id, status: "converted" } }),
        ]);
        return {
          id: e.id,
          userId: e.userId,
          fullName: e.fullName,
          email: e.email,
          mobile: e.mobile,
          userEmail: e.userEmail,
          displayName: e.displayName,
          employeeCode: e.employeeCode,
          designation: e.designation,
          targetCalls: e.targetCalls,
          assignments,
          converted,
        };
      }),
    );
    return NextResponse.json({ employees: withStats });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e?.message === "FORBIDDEN") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    console.error(e);
    return NextResponse.json({ error: "Failed to load employees" }, { status: 500 });
  }
}

/** POST /api/admin/employees — create a User (role=employee) + Employee profile. */
export async function POST(req: Request) {
  try {
    const user = await requireRole("admin");
    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");
    const fullName = String(body?.fullName || "").trim();
    const mobile = String(body?.mobile || "").replace(/\D/g, "");
    const employeeEmail = String(body?.employeeEmail || email).trim().toLowerCase();
    const employeeCode = body?.employeeCode ? String(body.employeeCode).trim() : undefined;
    const designation = body?.designation ? String(body.designation).trim() : undefined;
    const targetCalls = body?.targetCalls ? Number(body.targetCalls) : 50;

    if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Valid login email required" }, { status: 400 });
    if (password.length < 6) return NextResponse.json({ error: "Password must be 6+ chars" }, { status: 400 });
    if (!NAME_RE.test(fullName)) return NextResponse.json({ error: "Valid full name required" }, { status: 400 });
    if (!MOBILE_RE.test(mobile)) return NextResponse.json({ error: "Valid 10-digit mobile required" }, { status: 400 });

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "Email already in use" }, { status: 409 });

    const newUser = await createUser({
      email,
      passwordHash: hashPassword(password),
      displayName: fullName,
      role: "employee",
    });
    const employee = await createEmployee({
      userId: newUser.id,
      fullName,
      mobile,
      email: employeeEmail,
      employeeCode,
      designation,
      targetCalls,
    });
    await audit({
      actorId: user.id,
      actorRole: user.role,
      action: "admin.employee.create",
      entity: "Employee",
      entityId: employee.id,
      meta: { email, fullName, designation: designation ?? null },
    });
    return NextResponse.json({ ok: true, id: employee.id, userId: newUser.id });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e?.message === "FORBIDDEN") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    console.error(e);
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 });
  }
}
