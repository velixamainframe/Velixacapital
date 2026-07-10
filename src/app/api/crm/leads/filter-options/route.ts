import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { getEmployeeByUserId, getLeadFilterOptions } from "@/lib/data";

export const runtime = "nodejs";

/** GET /api/crm/leads/filter-options — distinct services + cities for filter dropdowns. */
export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "employee" && user.role !== "admin") return NextResponse.json({ error: "Employee access required" }, { status: 403 });

  let employeeId: string | undefined;
  if (user.role === "employee") {
    const employee = await getEmployeeByUserId(user.id);
    if (!employee) return NextResponse.json({ error: "No employee record" }, { status: 403 });
    employeeId = employee.id;
  }

  const options = await getLeadFilterOptions(employeeId);
  return NextResponse.json(options);
}
