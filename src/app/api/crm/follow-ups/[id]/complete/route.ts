import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { completeFollowUp, audit } from "@/lib/data";

export const runtime = "nodejs";

/** POST /api/crm/follow-ups/[id]/complete — mark a follow-up as done. */
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "employee" && user.role !== "admin") return NextResponse.json({ error: "Employee access required" }, { status: 403 });

  const { id } = await params;
  try {
    await completeFollowUp(id);
    await audit({ actorId: user.id, actorRole: user.role, action: "complete_followup", entity: "follow_up", entityId: id });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Could not complete follow-up" }, { status: 400 });
  }
}
