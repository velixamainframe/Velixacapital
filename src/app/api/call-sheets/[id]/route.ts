import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { audit } from "@/lib/data";

export const runtime = "nodejs";

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireRole("admin");
    const { id } = await ctx.params;
    await db.callOutcome.deleteMany({ where: { assignment: { callSheetId: id } } }).catch(() => {});
    await db.followUp.deleteMany({ where: { assignment: { callSheetId: id } } }).catch(() => {});
    await db.callAssignment.deleteMany({ where: { callSheetId: id } });
    await db.callSheet.delete({ where: { id } });
    await audit({ actorId: user.id, actorRole: user.role, action: "admin.callsheet.delete", entity: "CallSheet", entityId: id });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e?.message === "FORBIDDEN") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    return NextResponse.json({ error: "Failed to delete call sheet" }, { status: 500 });
  }
}
