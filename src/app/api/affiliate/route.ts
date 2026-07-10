import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { createAffiliateLink, listAffiliateLinks } from "@/lib/data";

export const runtime = "nodejs";

/** POST /api/affiliate — create a tracking link. Requires auth (partner or admin). */
export async function POST(req: Request) {
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
    const body = await req.json();
    const label = String(body?.label || "").trim();
    const targetUrl = String(body?.targetUrl || "").trim();
    const slug = body?.slug ? String(body.slug).trim() : undefined;
    const description = body?.description ? String(body.description).trim() : undefined;

    if (!label) {
      return NextResponse.json({ error: "Label is required" }, { status: 400 });
    }
    if (!targetUrl || !(/^https?:\/\//i.test(targetUrl) || targetUrl.startsWith("/"))) {
      return NextResponse.json({ error: "A valid target URL is required (absolute http(s):// or absolute path like /loans/personal-loan)" }, { status: 400 });
    }

    const link = await createAffiliateLink({
      label,
      targetUrl,
      slug,
      description,
      ownerId: user.id,
      createdBy: user.id,
    });

    return NextResponse.json({
      ok: true,
      id: link.id,
      slug: link.slug,
      label: link.label,
      targetUrl: link.targetUrl,
      shareUrl: `/go/${link.slug}`,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create link" }, { status: 500 });
  }
}

/** GET /api/affiliate — list own links (admin sees all). */
export async function GET() {
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
    const ownerId = user.role === "admin" ? undefined : user.id;
    const links = await listAffiliateLinks(ownerId);
    return NextResponse.json({
      links: links.map((l) => ({
        id: l.id,
        slug: l.slug,
        label: l.label,
        targetUrl: l.targetUrl,
        description: l.description,
        clicks: l.clicks,
        leadCount: l.leadCount,
        shareUrl: `/go/${l.slug}`,
        createdAt: l.createdAt,
      })),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to list links" }, { status: 500 });
  }
}
