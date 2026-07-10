import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { listAffiliateLinks } from "@/lib/data";
import { db } from "@/lib/db";
import { maskPhone, maskEmail, decrypt } from "@/lib/crypto";

export const runtime = "nodejs";

/**
 * GET /api/partner-leads — leads attributed to this partner's affiliate links.
 * Admin receives all leads (for the admin's My Leads preview when needed).
 */
export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.role !== "partner" && user.role !== "admin") {
      return NextResponse.json(
        { error: "Partner access required" },
        { status: 403 },
      );
    }

    // Partner path: only leads with affiliateId in their own link set.
    const ownerId = user.role === "admin" ? undefined : user.id;
    const links = await listAffiliateLinks(ownerId);
    const linkIds = links.map((l) => l.id);
    const slugById = new Map(links.map((l) => [l.id, l.slug] as const));

    const where = user.role === "admin" ? {} : { affiliateId: { in: linkIds } };
    const leads = await db.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 500,
    });

    return NextResponse.json({
      leads: leads.map((l) => ({
        id: l.id,
        name: decrypt(l.name) ?? "",
        mobileMasked: maskPhone(l.mobile),
        emailMasked: maskEmail(l.email),
        service: l.service,
        city: l.city,
        loanAmount: l.loanAmount,
        status: l.status,
        sourcePage: l.sourcePage,
        affiliateSlug: l.affiliateSlug ?? (l.affiliateId ? slugById.get(l.affiliateId) ?? null : null),
        createdAt: l.createdAt,
      })),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to load leads" }, { status: 500 });
  }
}
