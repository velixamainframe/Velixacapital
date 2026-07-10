import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { getEmployeeByUserId, audit } from "@/lib/data";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * POST /api/crm/follow-ups/[id]
 *
 * Marks a follow-up as completed (i.e. the employee has re-contacted the
 * customer and logged the call). The follow-up record itself is just marked
 * done — the actual call outcome is logged separately via /api/crm/outcomes.
 *
 * Body (optional): { note?: string }
 *
 * Authorization: employee may only complete their own follow-ups; admin may
 * complete any.
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (user.role !== "employee" && user.role !== "admin") {
    return NextResponse.json({ error: "Employee access required" }, { status: 403 });
  }

  const { id } = await params;

  let employeeId: string | null = null;
  if (user.role === "employee") {
    const employee = await getEmployeeByUserId(user.id);
    if (!employee) {
      return NextResponse.json(
        { error: "No employee record linked to this account." },
        { status: 403 },
      );
    }
    employeeId = employee.id;
  }

  const existing = await db.followUp.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Follow-up not found" }, { status: 404 });
  }
  if (employeeId && existing.employeeId !== employeeId) {
    return NextResponse.json(
      { error: "This follow-up is not yours." },
      { status: 403 },
    );
  }

  let note: string | null = null;
  try {
    const body = await req.json();
    if (body && typeof body.note === "string") {
      note = body.note.trim().slice(0, 500);
    }
  } catch {
    /* body optional */
  }

  const updated = await db.followUp.update({
    where: { id },
    data: { completed: true },
  });

  await audit({
    actorId: user.id,
    actorRole: user.role,
    action: "crm.followup.complete",
    entity: "FollowUp",
    entityId: id,
    meta: { assignmentId: existing.assignmentId, note },
  });

  return NextResponse.json({ ok: true, id: updated.id, completed: true });
}
