import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { getEmployeeByUserId, searchLeads } from "@/lib/data";
import { maskPhone, maskEmail } from "@/lib/crypto";

export const runtime = "nodejs";

/** GET /api/crm/leads/search?q=...&status=...&priority=...&service=...&city=...&scope=all|mine|pool */
export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "employee" && user.role !== "admin") return NextResponse.json({ error: "Employee access required" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || undefined;
  const status = searchParams.get("status") || undefined;
  const priorityStr = searchParams.get("priority");
  const priority = priorityStr != null && priorityStr !== "all" ? Number(priorityStr) : undefined;
  const service = searchParams.get("service") || undefined;
  const city = searchParams.get("city") || undefined;
  const scope = (searchParams.get("scope") as "all" | "mine" | "pool") || "all";

  let employeeId: string | undefined;
  if (user.role === "employee") {
    const employee = await getEmployeeByUserId(user.id);
    if (!employee) return NextResponse.json({ error: "No employee record" }, { status: 403 });
    employeeId = employee.id;
  }

  const results = await searchLeads({ employeeId, query, status, priority, service, city, scope });

  // Mask PII
  const masked = results.map((r: any) => ({
    ...r,
    customerMobileMasked: maskPhone(r.customerMobile),
    customerEmailMasked: r.customerEmail ? maskEmail(r.customerEmail) : null,
    customerMobile: undefined,
    customerEmail: undefined,
  }));

  return NextResponse.json({ leads: masked, count: masked.length });
}
