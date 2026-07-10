import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { getEmployeeByUserId, listTransferableEmployees } from "@/lib/data";

export const runtime = "nodejs";

/**
 * GET /api/crm/employees
 * Returns all active employees (id + name + designation), excluding the
 * signed-in employee. Used to populate the "Transfer lead to…" dropdown.
 */
export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "employee" && user.role !== "admin") {
    return NextResponse.json({ error: "Employee access required" }, { status: 403 });
  }

  let excludeId: string | undefined;
  if (user.role === "employee") {
    const emp = await getEmployeeByUserId(user.id);
    if (!emp) return NextResponse.json({ error: "No employee record" }, { status: 403 });
    excludeId = emp.id;
  }

  const employees = await listTransferableEmployees(excludeId);
  return NextResponse.json({ employees });
}
