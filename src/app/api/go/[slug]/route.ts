import { NextResponse } from "next/server";
import { resolveAffiliate } from "@/lib/data";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolved = await resolveAffiliate(slug);
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  if (!resolved) {
    return NextResponse.redirect(new URL("/?ref=" + encodeURIComponent(slug), base));
  }
  const target = resolved.targetUrl;
  const url = target.startsWith("/") ? `${target}?ref=${encodeURIComponent(slug)}` : target;
  return NextResponse.redirect(url, { status: 302 });
}
