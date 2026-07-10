import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/session";
import { listBlogs, upsertBlog, audit } from "@/lib/data";

export const runtime = "nodejs";

/** GET /api/admin/blogs — list all blogs (incl. drafts). */
export async function GET() {
  try {
    await requireRole("admin");
    const blogs = await listBlogs(false);
    return NextResponse.json({ blogs });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e?.message === "FORBIDDEN") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    console.error(e);
    return NextResponse.json({ error: "Failed to load blogs" }, { status: 500 });
  }
}

/** POST /api/admin/blogs — upsert a blog. */
export async function POST(req: Request) {
  try {
    const user = await requireRole("admin");
    const body = await req.json();
    const title = String(body?.title || "").trim();
    const slug = String(body?.slug || "").trim();
    if (!title || !slug) return NextResponse.json({ error: "Title and slug required" }, { status: 400 });

    const blog = await upsertBlog({
      id: body?.id ? String(body.id) : undefined,
      title,
      slug,
      excerpt: body?.excerpt ? String(body.excerpt) : "",
      content: body?.content ? String(body.content) : "",
      coverImage: body?.coverImage ? String(body.coverImage) : undefined,
      authorId: user.id,
      published: !!body?.published,
    });
    await audit({
      actorId: user.id,
      actorRole: user.role,
      action: body?.id ? "admin.blog.update" : "admin.blog.create",
      entity: "Blog",
      entityId: blog.id,
      meta: { slug, title, published: !!body?.published },
    });
    return NextResponse.json({ ok: true, id: blog.id, slug: blog.slug });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e?.message === "FORBIDDEN") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    console.error(e);
    return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
  }
}
