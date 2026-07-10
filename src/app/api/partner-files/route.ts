import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import {
  createPartnerFile,
  listPartnerFiles,
  partnerStats,
  audit,
} from "@/lib/data";
import { maskPhone, maskEmail } from "@/lib/crypto";

export const runtime = "nodejs";

/** Look up (or lazily create) the PartnerProfile row for a given userId. */
async function ensurePartnerProfile(userId: string) {
  const existing = await db.partnerProfile.findUnique({ where: { userId } });
  if (existing) return existing;
  // Lazy-create: admins grant role via /admin/partner-access; profile auto-seeded here.
  return db.partnerProfile.create({
    data: { userId, partnerCode: "VC" + userId.slice(-6).toUpperCase() },
  });
}

/** POST /api/partner-files — partner submits a customer file. */
export async function POST(req: Request) {
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
    const body = await req.json();
    const customerName = String(body?.customerName || "").trim();
    const customerMobile = String(body?.customerMobile || "").replace(/\D/g, "");
    const customerEmail = body?.customerEmail ? String(body.customerEmail).trim() : undefined;
    const city = body?.city ? String(body.city).trim() : undefined;
    const service = body?.service ? String(body.service) : undefined;
    const loanAmount = body?.loanAmount ? Number(body.loanAmount) : undefined;
    const employmentType = body?.employmentType ? String(body.employmentType) : undefined;
    const notes = body?.notes ? String(body.notes).trim() : undefined;
    const fileName = body?.fileName ? String(body.fileName) : undefined;

    if (!customerName) {
      return NextResponse.json({ error: "Customer name is required" }, { status: 400 });
    }
    if (!/^[6-9]\d{9}$/.test(customerMobile)) {
      return NextResponse.json(
        { error: "Enter a valid 10-digit Indian mobile (starting 6–9)" },
        { status: 400 },
      );
    }

    const profile = await ensurePartnerProfile(user.id);
    const file = await createPartnerFile({
      partnerId: profile.id,
      customerName,
      customerMobile,
      customerEmail,
      city,
      service,
      loanAmount: Number.isFinite(loanAmount) ? loanAmount : undefined,
      employmentType,
      fileName,
      notes,
    });
    await audit({
      actorId: user.id,
      actorRole: user.role,
      action: "partner.file.submit",
      entity: "PartnerFile",
      entityId: file.id,
      meta: { service, fileName },
    });

    return NextResponse.json({ ok: true, id: file.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to submit file" }, { status: 500 });
  }
}

/** GET /api/partner-files — partner lists own files; admin lists all. */
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

    if (user.role === "admin") {
      const [files, stats] = await Promise.all([
        listPartnerFiles(),
        partnerStats(),
      ]);
      return NextResponse.json({
        files: files.map((f) => ({
          id: f.id,
          customerName: f.customerName,
          customerMobile: f.customerMobile,
          customerEmail: f.customerEmail,
          city: f.city,
          service: f.service,
          loanAmount: f.loanAmount,
          employmentType: f.employmentType,
          fileName: f.fileName,
          notes: f.notes,
          status: f.status,
          adminNotes: f.adminNotes,
          partnerId: f.partnerId,
          createdAt: f.createdAt,
        })),
        stats,
      });
    }

    // Partner path: mask PII in lists; admin sees decrypted.
    const profile = await ensurePartnerProfile(user.id);
    const [files, stats] = await Promise.all([
      listPartnerFiles(profile.id),
      partnerStats(profile.id),
    ]);
    return NextResponse.json({
      files: files.map((f) => ({
        id: f.id,
        customerName: f.customerName,
        customerMobileMasked: maskPhone(f.customerMobile),
        customerEmailMasked: f.customerEmail ? maskEmail(f.customerEmail) : null,
        city: f.city,
        service: f.service,
        loanAmount: f.loanAmount,
        employmentType: f.employmentType,
        fileName: f.fileName,
        notes: f.notes,
        status: f.status,
        adminNotes: f.adminNotes,
        createdAt: f.createdAt,
      })),
      stats,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 });
  }
}
