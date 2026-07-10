import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/session";
import { findUserByEmail, setUserRole, listUsersByRole, audit } from "@/lib/data";

export const runtime = "nodejs";

/** GET /api/admin/partner-access — list current partners. */
export async function GET() {
  try {
    await requireRole("admin");
    const partners = await listUsersByRole("partner");
    return NextResponse.json({
      partners: partners.map((u) => ({
        id: u.id,
        email: u.email,
        displayName: u.displayName,
        role: u.role,
        createdAt: u.createdAt,
      })),
    });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e?.message === "FORBIDDEN") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    console.error(e);
    return NextResponse.json({ error: "Failed to list partners" }, { status: 500 });
  }
}

/** POST /api/admin/partner-access — { email, grant: boolean } */
export async function POST(req: Request) {
  try {
    const user = await requireRole("admin");
    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const grant = !!body?.grant;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const target = await findUserByEmail(email);
    if (!target) return NextResponse.json({ error: "No account found for this email" }, { status: 404 });

    if (grant) {
      if (target.role === "partner") return NextResponse.json({ ok: true, already: true });
      await setUserRole(target.id, "partner");
    } else {
      if (target.role !== "partner") return NextResponse.json({ ok: true, already: true });
      await setUserRole(target.id, "user");
    }

    await audit({
      actorId: user.id,
      actorRole: user.role,
      action: grant ? "admin.partner.grant" : "admin.partner.revoke",
      entity: "User",
      entityId: target.id,
      meta: { email: target.email, from: target.role, to: grant ? "partner" : "user" },
    });

    return NextResponse.json({ ok: true, userId: target.id, role: grant ? "partner" : "user" });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e?.message === "FORBIDDEN") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    console.error(e);
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 });
  }
}
