import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { getEmployeeByUserId, logCallOutcome, audit } from "@/lib/data";

export const runtime = "nodejs";

const OUTCOMES = new Set(["connected", "no_answer", "wrong_number", "busy", "voicemail"]);
const DISPOSITIONS = new Set([
  "success",
  "rejected",
  "not_connected",
  "reschedule",
  "callback",
  "converted",
  "dnd",
]);

/**
 * POST /api/crm/outcomes
 *
 * Body: {
 *   assignmentId, outcome, disposition,
 *   callDurationSec?, notes?, callbackAt?, convertedAmount?
 * }
 *
 * Logs a call outcome for the current employee. Calls `logCallOutcome`
 * (which updates the assignment status and creates a FollowUp row when
 * disposition === "callback"). Also writes an audit entry.
 *
 * Authorization: employee or admin. Admins are allowed to log outcomes for
 * any assignment (CRM preview); employees only for assignments they own.
 */
export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (user.role !== "employee" && user.role !== "admin") {
    return NextResponse.json({ error: "Employee access required" }, { status: 403 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { assignmentId, outcome, disposition } = body || {};
  if (!assignmentId || typeof assignmentId !== "string") {
    return NextResponse.json({ error: "assignmentId is required" }, { status: 400 });
  }
  if (!outcome || !OUTCOMES.has(String(outcome))) {
    return NextResponse.json(
      { error: "outcome must be one of: connected, no_answer, wrong_number, busy, voicemail" },
      { status: 400 },
    );
  }
  if (!disposition || !DISPOSITIONS.has(String(disposition))) {
    return NextResponse.json(
      { error: "disposition must be one of: success, rejected, not_connected, reschedule, callback, converted, dnd" },
      { status: 400 },
    );
  }

  // Resolve employeeId for audit + ownership.
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

  const callDurationSec =
    typeof body.callDurationSec === "number" && body.callDurationSec >= 0
      ? Math.min(body.callDurationSec, 3600)
      : typeof body.callDurationSec === "string" && body.callDurationSec.trim()
        ? Math.min(parseInt(body.callDurationSec, 10) || 0, 3600)
        : 0;

  const notes =
    typeof body.notes === "string" ? body.notes.trim().slice(0, 2000) : null;

  let callbackAt: Date | null = null;
  if ((disposition === "callback" || disposition === "reschedule") && body.callbackAt) {
    const d = new Date(body.callbackAt);
    if (!isNaN(d.getTime())) callbackAt = d;
  }

  let convertedAmount: number | null = null;
  if (disposition === "converted" && body.convertedAmount != null) {
    const n = Number(body.convertedAmount);
    if (!isNaN(n) && n >= 0) convertedAmount = n;
  }

  try {
    const created = await logCallOutcome({
      assignmentId,
      employeeId: employeeId ?? undefined,
      outcome: String(outcome),
      disposition: String(disposition),
      callDurationSec,
      notes,
      callbackAt: callbackAt ?? undefined,
      convertedAmount: convertedAmount ?? undefined,
    });

    await audit({
      actorId: user.id,
      actorRole: user.role,
      action: "crm.outcome.log",
      entity: "CallOutcome",
      entityId: created.id,
      meta: {
        assignmentId,
        outcome,
        disposition,
        callDurationSec,
        hasCallback: Boolean(callbackAt),
        convertedAmount,
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Failed to log call outcome" },
      { status: 500 },
    );
  }
}
