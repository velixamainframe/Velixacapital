import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { getEmployeeByUserId, getUniversalLeads, getMyClaimedLeads } from "@/lib/data";
import { maskPhone, maskEmail } from "@/lib/crypto";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "employee" && user.role !== "admin") return NextResponse.json({ error: "Employee access required" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const mineStatus = searchParams.get("mine") || undefined;

  if (user.role === "admin") {
    const available = await getUniversalLeads(200);
    return NextResponse.json({ mode: "admin", available: available.map(mapLead), mine: [] });
  }

  const employee = await getEmployeeByUserId(user.id);
  if (!employee) return NextResponse.json({ error: "No employee record" }, { status: 403 });

  const [available, mine] = await Promise.all([
    getUniversalLeads(200),
    getMyClaimedLeads(employee.id, mineStatus || undefined),
  ]);

  return NextResponse.json({
    mode: "employee",
    employee: { id: employee.id, fullName: employee.fullName, designation: employee.designation, targetCalls: employee.targetCalls },
    available: available.map(mapLead),
    mine: mine.map((r: any) => {
      const last = r.outcomes?.[0];
      return { ...mapLead(r), latestOutcome: last ? { outcome: last.outcome, disposition: last.disposition, notes: last.notes, createdAt: last.createdAt, callbackAt: last.callbackAt, convertedAmount: last.convertedAmount, callDurationSec: last.callDurationSec } : null };
    }),
  });
}

function mapLead(r: any) {
  return {
    id: r.id, customerName: r.customerName,
    customerMobileMasked: maskPhone(r.customerMobile),
    customerEmailMasked: r.customerEmail ? maskEmail(r.customerEmail) : null,
    city: r.city, service: r.service, loanAmount: r.loanAmount,
    employmentType: r.employmentType, monthlyIncome: r.monthlyIncome,
    notes: r.notes, priority: r.priority, status: r.status,
    assignedAt: r.assignedAt, claimedAt: r.claimedAt, callSheetId: r.callSheetId,
  };
}
