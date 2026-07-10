import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/session";
import { getBlog, upsertBlog, audit } from "@/lib/data";
import { STARTER_BLOGS } from "@/lib/starter-blogs";

export const runtime = "nodejs";

/** POST /api/admin/blogs/seed — insert STARTER_BLOGS (idempotent — skips existing slugs). */
export async function POST() {
  try {
    const user = await requireRole("admin");
    let inserted = 0;
    let skipped = 0;
    for (const b of STARTER_BLOGS) {
      const existing = await getBlog(b.slug);
      if (existing) { skipped++; continue; }
      await upsertBlog({
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        authorId: user.id,
        published: true,
      });
      inserted++;
    }
    await audit({
      actorId: user.id,
      actorRole: user.role,
      action: "admin.blog.seed",
      entity: "Blog",
      meta: { inserted, skipped, total: STARTER_BLOGS.length },
    });
    return NextResponse.json({ ok: true, inserted, skipped });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e?.message === "FORBIDDEN") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    console.error(e);
    return NextResponse.json({ error: "Failed to seed blogs" }, { status: 500 });
  }
}
