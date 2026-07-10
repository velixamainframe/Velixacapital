import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/session";
import { setLeadStatus, audit } from "@/lib/data";

export const runtime = "nodejs";

const VALID = new Set(["new", "contacted", "qualified", "converted", "lost"]);

/** PATCH /api/admin/leads/[id] — { status?, notes? } */
export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireRole("admin");
    const { id } = await ctx.params;
    const body = await req.json();
    const updates: { status?: string; notes?: string } = {};
    if (body?.status !== undefined) {
      const s = String(body.status);
      if (!VALID.has(s)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      updates.status = s;
    }
    if (body?.notes !== undefined) {
      updates.notes = String(body.notes).slice(0, 5000);
    }
    if (!updates.status && updates.notes === undefined) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }
    const lead = await setLeadStatus(id, updates.status ?? "new", updates.notes);
    await audit({
      actorId: user.id,
      actorRole: user.role,
      action: "admin.lead.update",
      entity: "Lead",
      entityId: id,
      meta: updates,
    });
    return NextResponse.json({ ok: true, lead });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e?.message === "FORBIDDEN") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    console.error(e);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}
