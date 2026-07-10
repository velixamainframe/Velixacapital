import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { deleteAffiliateLink, audit } from "@/lib/data";

export const runtime = "nodejs";

/** DELETE /api/affiliate/[id] — delete own link (admin can delete any). */
export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.role !== "partner" && user.role !== "admin") {
      return NextResponse.json(
        { error: "Partner or admin access required" },
        { status: 403 },
      );
    }
    const { id } = await ctx.params;
    const link = await db.affiliateLink.findUnique({ where: { id } });
    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }
    // Ownership: partner can only delete their own; admin can delete any.
    if (user.role !== "admin" && link.ownerId !== user.id) {
      return NextResponse.json(
        { error: "You can only delete your own links" },
        { status: 403 },
      );
    }
    await deleteAffiliateLink(id);
    await audit({
      actorId: user.id,
      actorRole: user.role,
      action: "affiliate.link.delete",
      entity: "AffiliateLink",
      entityId: id,
      meta: { slug: link.slug, label: link.label },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete link" }, { status: 500 });
  }
}
