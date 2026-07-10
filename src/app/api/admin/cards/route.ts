import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/session";
import { listCreditCards, upsertCreditCard, audit } from "@/lib/data";
import { slugify as toSlug } from "@/lib/data";

export const runtime = "nodejs";

/** GET /api/admin/cards — list all credit card offers (incl. unpublished). */
export async function GET() {
  try {
    await requireRole("admin");
    const cards = await listCreditCards(false);
    return NextResponse.json({ cards });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e?.message === "FORBIDDEN") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    console.error(e);
    return NextResponse.json({ error: "Failed to load cards" }, { status: 500 });
  }
}

/** POST /api/admin/cards — upsert a credit card offer. */
export async function POST(req: Request) {
  try {
    const user = await requireRole("admin");
    const body = await req.json();
    const name = String(body?.name || "").trim();
    const bank = String(body?.bank || "").trim();
    if (!name || !bank) return NextResponse.json({ error: "Name and bank required" }, { status: 400 });
    const slug = body?.slug ? String(body.slug) : toSlug(`${bank}-${name}`);

    const card = await upsertCreditCard({
      id: body?.id ? String(body.id) : undefined,
      slug,
      name,
      bank,
      category: body?.category ? String(body.category) : "General",
      imageUrl: body?.imageUrl ? String(body.imageUrl) : undefined,
      annualFee: body?.annualFee !== undefined ? Number(body.annualFee) : undefined,
      joiningFee: body?.joiningFee !== undefined ? Number(body.joiningFee) : undefined,
      features: Array.isArray(body?.features) ? body.features : (body?.features ? String(body.features).split("\n").map((s: string) => s.trim()).filter(Boolean) : []),
      benefits: body?.benefits ? String(body.benefits) : "",
      affiliateUrl: body?.affiliateUrl ? String(body.affiliateUrl) : undefined,
      published: !!body?.published,
      displayOrder: body?.displayOrder !== undefined ? Number(body.displayOrder) : 0,
    });
    await audit({
      actorId: user.id,
      actorRole: user.role,
      action: body?.id ? "admin.card.update" : "admin.card.create",
      entity: "CreditCard",
      entityId: card.id,
      meta: { slug, name, bank },
    });
    return NextResponse.json({ ok: true, id: card.id, slug: card.slug });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e?.message === "FORBIDDEN") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    console.error(e);
    return NextResponse.json({ error: "Failed to save card" }, { status: 500 });
  }
}
