import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { getEmployeeByUserId, getLeadDetail, updateLeadStatus, updateLeadPriority, updateLeadNotes, audit } from "@/lib/data";
import { maskPhone, maskEmail } from "@/lib/crypto";

export const runtime = "nodejs";

/** GET /api/crm/leads/[id] — full lead detail with outcomes + follow-ups timeline. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "employee" && user.role !== "admin") return NextResponse.json({ error: "Employee access required" }, { status: 403 });

  const { id } = await params;
  const detail = await getLeadDetail(id);
  if (!detail) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  // Mask PII for employees (admins see full)
  const isFullAccess = user.role === "admin";
  return NextResponse.json({
    lead: {
      ...detail,
      customerMobileMasked: maskPhone(detail.customerMobile),
      customerEmailMasked: detail.customerEmail ? maskEmail(detail.customerEmail) : null,
      customerMobile: isFullAccess ? detail.customerMobile : undefined,
      customerEmail: isFullAccess ? detail.customerEmail : undefined,
    },
  });
}

/** PATCH /api/crm/leads/[id] — update lead status / priority / notes. */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "employee" && user.role !== "admin") return NextResponse.json({ error: "Employee access required" }, { status: 403 });

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const { status, priority, notes } = body as { status?: string; priority?: number; notes?: string };

  // Resolve employeeId for ownership check (admins pass null to bypass)
  let employeeId: string | null = null;
  if (user.role === "employee") {
    const employee = await getEmployeeByUserId(user.id);
    if (!employee) return NextResponse.json({ error: "No employee record" }, { status: 403 });
    employeeId = employee.id;
  }

  try {
    if (typeof status === "string") {
      await updateLeadStatus(id, employeeId, status);
      await audit({ actorId: user.id, actorRole: user.role, action: "update_lead_status", entity: "call_assignment", entityId: id, meta: { status } });
    }
    if (typeof priority === "number") {
      await updateLeadPriority(id, priority);
      await audit({ actorId: user.id, actorRole: user.role, action: "update_lead_priority", entity: "call_assignment", entityId: id, meta: { priority } });
    }
    if (typeof notes === "string") {
      await updateLeadNotes(id, notes);
      await audit({ actorId: user.id, actorRole: user.role, action: "update_lead_notes", entity: "call_assignment", entityId: id });
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Update failed" }, { status: 400 });
  }
}
