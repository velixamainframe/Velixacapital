import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { getEmployeeByUserId, transferLead, audit } from "@/lib/data";

export const runtime = "nodejs";

/**
 * POST /api/crm/leads/[id]/transfer
 * Body: { toEmployeeId: string, note?: string }
 *
 * Transfers a lead from the current owner (the signed-in employee) to another
 * active employee. Admins can transfer any lead; employees can only transfer
 * leads they currently own.
 */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "employee" && user.role !== "admin") {
    return NextResponse.json({ error: "Employee access required" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const { toEmployeeId, note } = body as { toEmployeeId?: string; note?: string };

  if (!toEmployeeId) return NextResponse.json({ error: "Recipient employee is required" }, { status: 400 });

  // Resolve the current owner's employeeId (admins pass null and the data layer
  // will allow the transfer because actorRole === "admin").
  let fromEmployeeId: string | null = null;
  if (user.role === "employee") {
    const employee = await getEmployeeByUserId(user.id);
    if (!employee) return NextResponse.json({ error: "No employee record" }, { status: 403 });
    fromEmployeeId = employee.id;
  } else {
    // Admin transferring someone else's lead — look up the current owner.
    const lead = await getEmployeeByUserId(user.id).catch(() => null);
    // We still need the lead's current employeeId; the data layer will resolve it.
    fromEmployeeId = null;
    void lead;
  }

  try {
    const result = await transferLead({
      assignmentId: id,
      fromEmployeeId: fromEmployeeId ?? "",
      toEmployeeId,
      note: note?.trim() || undefined,
      actorId: user.id,
      actorRole: user.role,
    });
    await audit({
      actorId: user.id,
      actorRole: user.role,
      action: "api.lead.transfer",
      entity: "call_assignment",
      entityId: id,
      meta: { to: toEmployeeId, note: note ?? null },
    });
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Transfer failed" }, { status: 400 });
  }
}
