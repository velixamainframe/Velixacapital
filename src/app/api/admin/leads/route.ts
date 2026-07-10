import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/session";
import { listLeads } from "@/lib/data";

export const runtime = "nodejs";

/**
 * GET /api/admin/leads?status=&limit=
 * Admin-only. Returns up to 500 leads with DECRYPTED PII (admin sees everything).
 */
export async function GET(req: Request) {
  try {
    await requireRole("admin");
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || undefined;
    const limit = Math.min(Number(searchParams.get("limit") || 500), 1000);
    const leads = await listLeads(limit, status);
    return NextResponse.json({
      leads: leads.map((l) => ({
        id: l.id,
        name: l.name,
        mobile: l.mobile,
        email: l.email,
        service: l.service,
        city: l.city,
        loanAmount: l.loanAmount,
        employmentType: l.employmentType,
        sourcePage: l.sourcePage,
        affiliateSlug: l.affiliateSlug,
        status: l.status,
        notes: l.notes,
        createdAt: l.createdAt,
      })),
    });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e?.message === "FORBIDDEN") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    console.error(e);
    return NextResponse.json({ error: "Failed to load leads" }, { status: 500 });
  }
}
