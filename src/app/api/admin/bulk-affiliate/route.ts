import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/session";
import { createAffiliateLink, audit } from "@/lib/data";

export const runtime = "nodejs";

type ParsedLine = { label: string; targetUrl: string; slug?: string } | { error: string; raw: string };

function parseLine(raw: string): ParsedLine {
  const line = raw.trim();
  if (!line) return { error: "empty", raw };
  const parts = line.split("|").map((s) => s.trim()).filter(Boolean);
  if (parts.length < 2) return { error: "Need at least 'Label | URL'", raw };
  const [label, targetUrl, slug] = parts;
  if (!/^https?:\/\//i.test(targetUrl)) return { error: "URL must start with http(s)://", raw };
  return { label, targetUrl, slug: slug || undefined };
}

/** POST /api/admin/bulk-affiliate — body: { lines: string } (up to 500 lines). */
export async function POST(req: Request) {
  try {
    const user = await requireRole("admin");
    const body = await req.json();
    const text = String(body?.lines || "");
    const allLines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (allLines.length === 0) return NextResponse.json({ error: "No lines provided" }, { status: 400 });
    if (allLines.length > 500) return NextResponse.json({ error: "Max 500 lines per bulk upload" }, { status: 400 });

    const created: { slug: string; shareUrl: string; label: string; targetUrl: string }[] = [];
    const errors: { line: string; error: string }[] = [];

    for (const raw of allLines) {
      const parsed = parseLine(raw);
      if ("error" in parsed) {
        if (parsed.error !== "empty") errors.push({ line: raw, error: parsed.error });
        continue;
      }
      try {
        const link = await createAffiliateLink({
          label: parsed.label,
          targetUrl: parsed.targetUrl,
          slug: parsed.slug,
          description: "Bulk-created",
          ownerId: user.id,
          createdBy: user.id,
        });
        created.push({
          slug: link.slug,
          shareUrl: `/go/${link.slug}`,
          label: link.label,
          targetUrl: link.targetUrl,
        });
      } catch (e: any) {
        errors.push({ line: raw, error: e?.message || "Failed" });
      }
    }

    await audit({
      actorId: user.id,
      actorRole: user.role,
      action: "admin.affiliate.bulk",
      entity: "AffiliateLink",
      meta: { created: created.length, errors: errors.length, total: allLines.length },
    });

    return NextResponse.json({ ok: true, created, errors });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e?.message === "FORBIDDEN") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    console.error(e);
    return NextResponse.json({ error: "Bulk create failed" }, { status: 500 });
  }
}
