import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { getEmployeeByUserId, bulkClaimLeads, bulkUpdateStatus, audit } from "@/lib/data";

export const runtime = "nodejs";

/** POST /api/crm/leads/bulk — bulk claim or bulk status update. */
export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "employee") return NextResponse.json({ error: "Only employees can bulk-action leads" }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const { action, ids, status } = body as { action: "claim" | "status"; ids: string[]; status?: string };

  if (!Array.isArray(ids) || ids.length === 0) return NextResponse.json({ error: "ids required" }, { status: 400 });
  if (ids.length > 100) return NextResponse.json({ error: "Max 100 leads per bulk action" }, { status: 400 });

  const employee = await getEmployeeByUserId(user.id);
  if (!employee) return NextResponse.json({ error: "No employee record" }, { status: 403 });

  try {
    if (action === "claim") {
      const result = await bulkClaimLeads(ids, employee.id);
      await audit({ actorId: user.id, actorRole: user.role, action: "bulk_claim_leads", entity: "call_assignment", meta: result });
      return NextResponse.json(result);
    }
    if (action === "status") {
      if (!status) return NextResponse.json({ error: "status required for status action" }, { status: 400 });
      const result = await bulkUpdateStatus(ids, employee.id, status);
      await audit({ actorId: user.id, actorRole: user.role, action: "bulk_update_status", entity: "call_assignment", meta: { ...result, status } });
      return NextResponse.json(result);
    }
    return NextResponse.json({ error: "Unknown action. Use 'claim' or 'status'." }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Bulk action failed" }, { status: 400 });
  }
}
