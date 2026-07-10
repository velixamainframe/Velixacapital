import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/session";
import { listCareers, upsertCareer, audit } from "@/lib/data";

export const runtime = "nodejs";

/** GET /api/admin/careers — list all careers (incl. unpublished). */
export async function GET() {
  try {
    await requireRole("admin");
    const careers = await listCareers(false);
    return NextResponse.json({ careers });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e?.message === "FORBIDDEN") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    console.error(e);
    return NextResponse.json({ error: "Failed to load careers" }, { status: 500 });
  }
}

/** POST /api/admin/careers — upsert a career posting. */
export async function POST(req: Request) {
  try {
    const user = await requireRole("admin");
    const body = await req.json();
    const title = String(body?.title || "").trim();
    const shortDescription = String(body?.shortDescription || "").trim();
    const description = String(body?.description || "").trim();
    if (!title || !shortDescription || !description) {
      return NextResponse.json({ error: "Title, short description and description required" }, { status: 400 });
    }
    const career = await upsertCareer({
      id: body?.id ? String(body.id) : undefined,
      title,
      department: body?.department ? String(body.department) : undefined,
      location: body?.location ? String(body.location) : undefined,
      employmentType: body?.employmentType ? String(body.employmentType) : undefined,
      shortDescription,
      description,
      requirements: Array.isArray(body?.requirements) ? body.requirements : (body?.requirements ? String(body.requirements).split("\n").map((s: string) => s.trim()).filter(Boolean) : []),
      salaryRange: body?.salaryRange ? String(body.salaryRange) : undefined,
      applyEmail: body?.applyEmail ? String(body.applyEmail) : undefined,
      published: !!body?.published,
      displayOrder: body?.displayOrder !== undefined ? Number(body.displayOrder) : 0,
    });
    await audit({
      actorId: user.id,
      actorRole: user.role,
      action: body?.id ? "admin.career.update" : "admin.career.create",
      entity: "Career",
      entityId: career.id,
      meta: { title },
    });
    return NextResponse.json({ ok: true, id: career.id });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e?.message === "FORBIDDEN") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    console.error(e);
    return NextResponse.json({ error: "Failed to save career" }, { status: 500 });
  }
}
