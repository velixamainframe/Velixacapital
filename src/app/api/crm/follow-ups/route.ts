import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { getEmployeeByUserId, listFollowUps } from "@/lib/data";
import { decrypt, maskPhone } from "@/lib/crypto";

export const runtime = "nodejs";

/**
 * GET /api/crm/follow-ups
 *
 * Returns upcoming (and recently-due) follow-ups for the current employee with
 * masked customer phone + decrypted name (for the list view). The full mobile
 * is fetched separately via /api/crm/assignments/[id] when the employee taps
 * "Reveal".
 */
export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (user.role !== "employee" && user.role !== "admin") {
    return NextResponse.json({ error: "Employee access required" }, { status: 403 });
  }

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

  const rows = await listFollowUps(employeeId ?? undefined, true);

  const followUps = rows.map((f) => {
    const a = f.assignment;
    return {
      id: f.id,
      scheduledAt: f.scheduledAt,
      note: f.note,
      completed: f.completed,
      assignment: a
        ? {
            id: a.id,
            customerName: decrypt(a.customerName) ?? "",
            customerMobileMasked: maskPhone(a.customerMobile),
            city: a.city,
            service: a.service,
            loanAmount: a.loanAmount,
            status: a.status,
            priority: a.priority,
          }
        : null,
    };
  });

  return NextResponse.json({ followUps });
}
