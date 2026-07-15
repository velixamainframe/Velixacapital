import { db } from "@/lib/db";
import { encrypt, decrypt } from "@/lib/crypto";
import { randomBytes } from "node:crypto";

/* ============================================================
   Velixa Capital — Data Access Layer
   - Default backend: Prisma + SQLite (works out of the box)
   - Production backend: Supabase (see /supabase/migrations + README)
   - PII (name/mobile/email/pan) is AES-256-GCM encrypted at the
     application layer before storage, on both backends.
   ============================================================ */

// ---------- Types ----------
export type Role = "admin" | "employee" | "partner" | "user";

export type LeadInput = {
  name: string;
  mobile: string;
  email: string;
  pan?: string;
  employmentType?: string;
  monthlyIncome?: number;
  businessDetails?: string;
  service?: string;
  loanAmount?: number;
  city?: string;
  message?: string;
  sourcePage?: string;
  affiliateSlug?: string | null;
};

export type CallRow = {
  customerName?: string;
  customerMobile?: string;
  customerEmail?: string;
  city?: string;
  service?: string;
  loanAmount?: number;
  employmentType?: string;
  monthlyIncome?: number;
  notes?: string;
  priority?: number;
};

// ---------- LEADS ----------
export async function createLead(input: LeadInput) {
  const lead = await db.lead.create({
    data: {
      name: encrypt(input.name),
      mobile: encrypt(input.mobile),
      email: encrypt(input.email),
      pan: input.pan ? encrypt(input.pan.toUpperCase()) : null,
      employmentType: input.employmentType ?? null,
      monthlyIncome: input.monthlyIncome ?? null,
      businessDetails: input.businessDetails ?? null,
      service: input.service ?? null,
      loanAmount: input.loanAmount ?? null,
      city: input.city ?? null,
      message: input.message ?? null,
      sourcePage: input.sourcePage ?? null,
      affiliateSlug: input.affiliateSlug ?? null,
      status: "new",
    },
  });
  // If an affiliate slug was provided, bump that link's lead count.
  if (input.affiliateSlug) {
    const link = await db.affiliateLink.findUnique({ where: { slug: input.affiliateSlug } });
    if (link) {
      await db.affiliateLink.update({ where: { id: link.id }, data: { leadCount: { increment: 1 } } });
      await db.lead.update({ where: { id: lead.id }, data: { affiliateId: link.id } });
    }
  }
  return lead;
}

export async function listLeads(limit = 500, status?: string) {
  const where = status && status !== "all" ? { status } : {};
  const leads = await db.lead.findMany({ where, orderBy: { createdAt: "desc" }, take: limit });
  return leads.map((l) => ({
    ...l,
    name: decrypt(l.name) ?? "",
    mobile: decrypt(l.mobile) ?? "",
    email: decrypt(l.email) ?? "",
    pan: l.pan ? decrypt(l.pan) : null,
  }));
}

export async function countLeads() {
  return db.lead.count();
}

export async function setLeadStatus(id: string, status: string, notes?: string) {
  return db.lead.update({ where: { id }, data: { status, ...(notes !== undefined ? { notes } : {}) } });
}

// ---------- AFFILIATE / GO LINKS ----------
export async function resolveAffiliate(slug: string) {
  try {
    const link = await db.affiliateLink.findUnique({ where: { slug } });
    if (!link) return null;
    try {
      await db.affiliateLink.update({ where: { id: link.id }, data: { clicks: { increment: 1 } } });
    } catch {
      // Click counter is best-effort — don't fail the redirect if it can't be saved.
    }
    return { id: link.id, targetUrl: link.targetUrl, label: link.label };
  } catch {
    // Database unavailable (e.g. Vercel build / no Supabase configured) — no redirect target.
    return null;
  }
}

export async function createAffiliateLink(input: {
  label: string;
  targetUrl: string;
  slug?: string;
  description?: string;
  ownerId?: string;
  createdBy?: string;
}) {
  const slug = input.slug || slugify(input.label) + "-" + randomBytes(3).toString("hex");
  return db.affiliateLink.create({
    data: {
      slug,
      label: input.label,
      targetUrl: input.targetUrl,
      description: input.description ?? null,
      ownerId: input.ownerId ?? null,
      createdBy: input.createdBy ?? null,
    },
  });
}

export async function listAffiliateLinks(ownerId?: string) {
  return db.affiliateLink.findMany({
    where: ownerId ? { ownerId } : {},
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteAffiliateLink(id: string) {
  return db.affiliateLink.delete({ where: { id } });
}

// ---------- BLOGS ----------
export async function listBlogs(publishedOnly = true) {
  try {
    return await db.blog.findMany({
      where: publishedOnly ? { published: true } : {},
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    // Database unavailable (e.g. Vercel build / no Supabase configured) — return empty list.
    return [];
  }
}

export async function getBlog(slug: string) {
  try {
    return await db.blog.findUnique({ where: { slug } });
  } catch {
    return null;
  }
}

export async function upsertBlog(input: {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  authorId?: string;
  published?: boolean;
}) {
  const publishedAt = input.published ? new Date() : null;
  if (input.id) {
    return db.blog.update({
      where: { id: input.id },
      data: {
        slug: input.slug,
        title: input.title,
        excerpt: input.excerpt ?? "",
        content: input.content ?? "",
        coverImage: input.coverImage ?? null,
        published: input.published ?? false,
        ...(input.published ? { publishedAt } : {}),
      },
    });
  }
  return db.blog.create({
    data: {
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt ?? "",
      content: input.content ?? "",
      coverImage: input.coverImage ?? null,
      authorId: input.authorId ?? null,
      published: input.published ?? false,
      publishedAt,
    },
  });
}

// ---------- CREDIT CARDS (DB offers) ----------
export async function listCreditCards(publishedOnly = true) {
  try {
    const cards = await db.creditCard.findMany({
      where: publishedOnly ? { published: true } : {},
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
    return cards.map((c) => ({ ...c, features: safeParseArray(c.features) }));
  } catch {
    // Database unavailable — return empty list so the page renders an empty state.
    return [];
  }
}

export async function upsertCreditCard(input: {
  id?: string; slug: string; name: string; bank: string; category: string;
  imageUrl?: string; annualFee?: number; joiningFee?: number; features?: string[];
  benefits?: string; affiliateUrl?: string; published?: boolean; displayOrder?: number;
}) {
  const data = {
    slug: input.slug,
    name: input.name,
    bank: input.bank,
    category: input.category,
    imageUrl: input.imageUrl ?? null,
    annualFee: input.annualFee ?? 0,
    joiningFee: input.joiningFee ?? 0,
    features: JSON.stringify(input.features ?? []),
    benefits: input.benefits ?? "",
    affiliateUrl: input.affiliateUrl ?? null,
    published: input.published ?? true,
    displayOrder: input.displayOrder ?? 0,
  };
  if (input.id) return db.creditCard.update({ where: { id: input.id }, data });
  return db.creditCard.create({ data });
}

// ---------- CAREERS ----------
export async function listCareers(publishedOnly = true) {
  try {
    const careers = await db.career.findMany({
      where: publishedOnly ? { published: true } : {},
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
    return careers.map((c) => ({ ...c, requirements: safeParseArray(c.requirements) }));
  } catch {
    // Database unavailable — return empty list so the page renders an empty state.
    return [];
  }
}

export async function upsertCareer(input: {
  id?: string; title: string; department?: string; location?: string;
  employmentType?: string; shortDescription: string; description: string;
  requirements?: string[]; salaryRange?: string; applyEmail?: string;
  published?: boolean; displayOrder?: number;
}) {
  const data = {
    title: input.title,
    department: input.department ?? null,
    location: input.location ?? "Remote / India",
    employmentType: input.employmentType ?? "Full-time",
    shortDescription: input.shortDescription,
    description: input.description,
    requirements: JSON.stringify(input.requirements ?? []),
    salaryRange: input.salaryRange ?? null,
    applyEmail: input.applyEmail ?? "careers@velixacapital.in",
    published: input.published ?? true,
    displayOrder: input.displayOrder ?? 0,
  };
  if (input.id) return db.career.update({ where: { id: input.id }, data });
  return db.career.create({ data });
}

// ---------- PARTNER APPLICATIONS ----------
export async function createPartnerApplication(input: {
  fullName: string; mobile: string; email: string; pan?: string; city: string;
  currentProfession?: string; businessType?: string; experienceYears?: number;
  expectedMonthlyLeads?: number; message?: string; sourcePage?: string;
}) {
  return db.partnerApplication.create({
    data: {
      fullName: input.fullName,
      mobile: encrypt(input.mobile),
      email: encrypt(input.email),
      pan: input.pan ? encrypt(input.pan.toUpperCase()) : null,
      city: input.city,
      currentProfession: input.currentProfession ?? null,
      businessType: input.businessType ?? null,
      experienceYears: input.experienceYears ?? 0,
      expectedMonthlyLeads: input.expectedMonthlyLeads ?? 0,
      message: input.message ?? null,
      sourcePage: input.sourcePage ?? null,
      status: "new",
    },
  });
}

export async function listPartnerApplications() {
  const apps = await db.partnerApplication.findMany({ orderBy: { createdAt: "desc" } });
  return apps.map((a) => ({
    ...a,
    mobile: decrypt(a.mobile) ?? "",
    email: decrypt(a.email) ?? "",
    pan: a.pan ? decrypt(a.pan) : null,
  }));
}

// ---------- USERS & AUTH (local backend) ----------
export async function findUserByEmail(email: string) {
  return db.user.findUnique({ where: { email: email.toLowerCase() } });
}

export async function createUser(input: {
  email: string; passwordHash?: string; displayName?: string; role?: Role; id?: string;
}) {
  const data: Record<string, unknown> = {
    email: input.email.toLowerCase(),
    passwordHash: input.passwordHash ?? null,
    displayName: input.displayName ?? null,
    role: input.role ?? "user",
  };

  if (input.id) {
    data.id = input.id;
  }

  return db.user.create({ data });
}

export async function setUserRole(userId: string, role: Role) {
  return db.user.update({ where: { id: userId }, data: { role } });
}

export async function listUsersByRole(role: Role) {
  return db.user.findMany({ where: { role }, orderBy: { createdAt: "desc" } });
}

export async function listAllUsers() {
  return db.user.findMany({ orderBy: { createdAt: "desc" } });
}

// ---------- EMPLOYEES (CRM) ----------
export async function listEmployees() {
  const emps = await db.employee.findMany({
    where: { isActive: true },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
  return emps.map((e) => ({
    ...e,
    fullName: decrypt(e.fullName) ?? "",
    mobile: decrypt(e.mobile) ?? "",
    email: decrypt(e.email) ?? "",
    displayName: e.user?.displayName ?? "",
    userEmail: e.user?.email ?? "",
  }));
}

export async function getEmployeeByUserId(userId: string) {
  const e = await db.employee.findUnique({ where: { userId }, include: { user: true } });
  if (!e) return null;
  return {
    ...e,
    fullName: decrypt(e.fullName) ?? "",
    mobile: decrypt(e.mobile) ?? "",
    email: decrypt(e.email) ?? "",
    displayName: e.user?.displayName ?? "",
    userEmail: e.user?.email ?? "",
  };
}

export async function createEmployee(input: {
  userId: string; fullName: string; mobile: string; email: string;
  employeeCode?: string; designation?: string; targetCalls?: number;
}) {
  return db.employee.create({
    data: {
      userId: input.userId,
      fullName: encrypt(input.fullName),
      mobile: encrypt(input.mobile),
      email: encrypt(input.email),
      employeeCode: input.employeeCode ?? null,
      designation: input.designation ?? null,
      targetCalls: input.targetCalls ?? 0,
    },
  });
}

// ---------- CALL SHEETS & ASSIGNMENTS ----------
export async function createCallSheet(input: { name: string; uploadedById?: string; fileName?: string }) {
  return db.callSheet.create({
    data: {
      name: input.name,
      uploadedById: input.uploadedById ?? null,
      fileName: input.fileName ?? null,
      totalRecords: 0,
    },
  });
}

export async function addCallAssignments(callSheetId: string, rows: CallRow[]) {
  const data = rows.map((r) => ({
    callSheetId, employeeId: null,
    customerName: encrypt(r.customerName || "Unknown"),
    customerMobile: encrypt(r.customerMobile || "0000000000"),
    customerEmail: r.customerEmail ? encrypt(r.customerEmail) : null,
    city: r.city ?? null, service: r.service ?? null,
    loanAmount: r.loanAmount ?? null, employmentType: r.employmentType ?? null,
    monthlyIncome: r.monthlyIncome ?? null, notes: r.notes ?? null,
    priority: r.priority ?? 0, status: "available" as const,
  }));
  const result = await db.callAssignment.createMany({ data });
  await db.callSheet.update({ where: { id: callSheetId }, data: { totalRecords: { increment: result.count } } });
  return result.count;
}

export async function listCallSheets() {
  return db.callSheet.findMany({ orderBy: { createdAt: "desc" }, include: { _count: { select: { assignments: true } } } });
}

export async function getUniversalLeads(limit = 200) {
  const rows = await db.callAssignment.findMany({
    where: { employeeId: null, status: "available" },
    orderBy: [{ priority: "desc" }, { assignedAt: "desc" }], take: limit,
  });
  return rows.map(decryptLead);
}

export async function getMyClaimedLeads(employeeId: string, status?: string) {
  const where: any = { employeeId };
  if (status && status !== "all") where.status = status;
  const rows = await db.callAssignment.findMany({
    where, orderBy: [{ claimedAt: "desc" }, { assignedAt: "desc" }], take: 500,
    include: { outcomes: { orderBy: { createdAt: "desc" }, take: 1 } },
  });
  return rows.map(decryptLead);
}

export async function getAllAssignments(status?: string, employeeId?: string) {
  const where: any = {};
  if (status && status !== "all") where.status = status;
  if (employeeId) where.employeeId = employeeId;
  const rows = await db.callAssignment.findMany({ where, orderBy: [{ assignedAt: "desc" }], take: 500 });
  return rows.map(decryptLead);
}

export async function claimLead(assignmentId: string, employeeId: string) {
  const updated = await db.callAssignment.updateMany({
    where: { id: assignmentId, employeeId: null, status: "available" },
    data: { employeeId, status: "in_progress", claimedAt: new Date() },
  });
  if (updated.count === 0) {
    const existing = await db.callAssignment.findUnique({ where: { id: assignmentId } });
    if (!existing) throw new Error("Lead not found");
    if (existing.employeeId === employeeId) return existing;
    throw new Error("This lead was just claimed by another employee.");
  }
  return db.callAssignment.findUnique({ where: { id: assignmentId } });
}

export async function releaseLead(assignmentId: string, employeeId: string) {
  const updated = await db.callAssignment.updateMany({
    where: { id: assignmentId, employeeId, status: "in_progress" },
    data: { employeeId: null, claimedAt: null, status: "available" },
  });
  if (updated.count === 0) throw new Error("You can only release leads you currently hold.");
  return { ok: true };
}

export async function logCallOutcome(input: {
  assignmentId: string; employeeId?: string; outcome: string; disposition: string;
  callDurationSec?: number; notes?: string; callbackAt?: Date; convertedAmount?: number;
}) {
  const dispositionStatus: Record<string, string> = {
    success: "success", rejected: "rejected", not_connected: "not_connected",
    reschedule: "reschedule", callback: "callback", converted: "converted", dnd: "dnd",
  };
  const newStatus = dispositionStatus[input.disposition] ?? input.disposition;
  const outcome = await db.callOutcome.create({
    data: {
      assignmentId: input.assignmentId, employeeId: input.employeeId ?? null,
      outcome: input.outcome, disposition: input.disposition,
      callDurationSec: input.callDurationSec ?? 0, notes: input.notes ?? null,
      callbackAt: input.callbackAt ?? null, convertedAmount: input.convertedAmount ?? null,
    },
  });
  await db.callAssignment.update({ where: { id: input.assignmentId }, data: { status: newStatus } });
  if ((input.disposition === "callback" || input.disposition === "reschedule") && input.callbackAt) {
    await db.followUp.create({
      data: {
        assignmentId: input.assignmentId, employeeId: input.employeeId ?? null,
        scheduledAt: input.callbackAt,
        note: input.notes ?? (input.disposition === "reschedule" ? "Reschedule requested" : "Callback requested"),
      },
    });
  }
  return outcome;
}

export async function listFollowUps(employeeId?: string, upcoming = true) {
  const where: any = { completed: false };
  if (employeeId) where.employeeId = employeeId;
  if (upcoming) where.scheduledAt = { gte: new Date(Date.now() - 24 * 3600 * 1000) };
  return db.followUp.findMany({ where, orderBy: { scheduledAt: "asc" }, take: 100, include: { assignment: true } });
}

// ---------- CRM: Lead detail, status updates, bulk actions, search ----------

/** Get full lead detail with all outcomes + follow-ups for the activity timeline. */
export async function getLeadDetail(assignmentId: string) {
  const row = await db.callAssignment.findUnique({
    where: { id: assignmentId },
    include: {
      outcomes: { orderBy: { createdAt: "desc" }, take: 100 },
      followUps: { orderBy: { scheduledAt: "asc" }, take: 50 },
      lead: true,
      callSheet: true,
    },
  });
  if (!row) return null;
  const decrypted = decryptLead(row);
  return {
    ...decrypted,
    dueDate: row.dueDate,
    callSheetId: row.callSheetId,
    callSheetName: row.callSheet?.name ?? null,
    leadId: row.lead?.id ?? null,
    leadStatus: row.lead?.status ?? null,
    outcomes: row.outcomes.map((o) => ({
      id: o.id, outcome: o.outcome, disposition: o.disposition,
      callDurationSec: o.callDurationSec, notes: o.notes,
      callbackAt: o.callbackAt, convertedAmount: o.convertedAmount,
      createdAt: o.createdAt,
    })),
    followUps: row.followUps.map((f) => ({
      id: f.id, scheduledAt: f.scheduledAt, note: f.note,
      completed: f.completed, createdAt: f.createdAt,
    })),
  };
}

/**
 * Update a lead's status (used by the Kanban drag-and-drop).
 * Only the assigned employee (or admin) can change status. The status must be
 * one of the valid dispositions or "in_progress".
 */
export async function updateLeadStatus(assignmentId: string, employeeId: string | null, newStatus: string) {
  const validStatuses = ["available", "in_progress", "success", "rejected", "not_connected", "reschedule", "callback", "converted", "dnd"];
  if (!validStatuses.includes(newStatus)) throw new Error("Invalid status");
  // Verify ownership (or admin if employeeId is null)
  const existing = await db.callAssignment.findUnique({ where: { id: assignmentId } });
  if (!existing) throw new Error("Lead not found");
  if (employeeId !== null && existing.employeeId !== employeeId) {
    throw new Error("You can only move leads you own.");
  }
  return db.callAssignment.update({
    where: { id: assignmentId },
    data: { status: newStatus },
  });
}

/** Update a lead's priority (0=low, 1=medium, 2+=high). */
export async function updateLeadPriority(assignmentId: string, priority: number) {
  return db.callAssignment.update({
    where: { id: assignmentId },
    data: { priority: Math.max(0, Math.min(3, priority)) },
  });
}

/** Update notes on a lead. */
export async function updateLeadNotes(assignmentId: string, notes: string) {
  return db.callAssignment.update({
    where: { id: assignmentId },
    data: { notes: notes.slice(0, 5000) },
  });
}

/** Mark a follow-up as completed. */
export async function completeFollowUp(followUpId: string) {
  return db.followUp.update({
    where: { id: followUpId },
    data: { completed: true },
  });
}

/**
 * Transfer a lead from one employee to another.
 * - Only the current owner (or an admin) can initiate a transfer.
 * - The receiving employee must exist and be active.
 * - Records an audit entry + a note on the assignment so the new owner
 *   sees context. Status is preserved (so an in-progress lead stays in-progress).
 * - Re-opens follow-ups that belong to the old employee so the new owner
 *   inherits them (they're not auto-completed).
 */
export async function transferLead(input: {
  assignmentId: string;
  fromEmployeeId: string;
  toEmployeeId: string;
  note?: string;
  actorId: string;
  actorRole: string;
}) {
  const { assignmentId, fromEmployeeId, toEmployeeId, note, actorId, actorRole } = input;

  // Validate recipient
  const recipient = await db.employee.findUnique({ where: { id: toEmployeeId }, include: { user: true } });
  if (!recipient) throw new Error("Recipient employee not found.");
  if (!recipient.isActive) throw new Error("Recipient employee is not active.");
  if (toEmployeeId === fromEmployeeId) throw new Error("Cannot transfer a lead to yourself.");

  // Validate current ownership
  const assignment = await db.callAssignment.findUnique({ where: { id: assignmentId } });
  if (!assignment) throw new Error("Lead not found.");
  // Admins can transfer any lead; employees can only transfer their own.
  if (actorRole !== "admin" && assignment.employeeId !== fromEmployeeId) {
    throw new Error("You can only transfer leads you currently own.");
  }

  const fromEmp = await db.employee.findUnique({ where: { id: fromEmployeeId } });
  const fromName = fromEmp ? decrypt(fromEmp.fullName) ?? "Unknown" : "Unknown";
  const toName = decrypt(recipient.fullName) ?? "Unknown";

  // Build the transfer note (appended to the existing notes).
  const transferLine = `\n[Transfer ${new Date().toISOString().slice(0, 16).replace("T", " ")}] ${fromName} → ${toName}${note ? `: ${note}` : ""}`;
  const newNotes = ((assignment.notes ?? "") + transferLine).slice(0, 5000);

  // Perform the transfer.
  const updated = await db.callAssignment.update({
    where: { id: assignmentId },
    data: {
      employeeId: toEmployeeId,
      claimedAt: new Date(),
      notes: newNotes,
      // Status is intentionally preserved.
    },
  });

  // Reassign open follow-ups to the new owner so they inherit the schedule.
  await db.followUp.updateMany({
    where: { assignmentId, completed: false },
    data: { employeeId: toEmployeeId },
  });

  // Log a call outcome entry so the activity timeline shows the transfer.
  await db.callOutcome.create({
    data: {
      assignmentId,
      employeeId: fromEmployeeId,
      outcome: "connected",
      disposition: "reschedule", // closest semantic: "handed off, follow up"
      callDurationSec: 0,
      notes: `Lead transferred to ${toName}.${note ? ` Reason: ${note}` : ""}`,
    },
  });

  // Audit log.
  await audit({
    actorId,
    actorRole,
    action: "lead.transfer",
    entity: "call_assignment",
    entityId: assignmentId,
    meta: { from: fromEmployeeId, to: toEmployeeId, note: note ?? null },
  });

  return { ok: true, assignmentId, fromEmployeeId, toEmployeeId };
}

/** List all active employees (for the transfer-to dropdown). Excludes the given id. */
export async function listTransferableEmployees(excludeEmployeeId?: string) {
  const where: any = { isActive: true };
  if (excludeEmployeeId) where.id = { not: excludeEmployeeId };
  const rows = await db.employee.findMany({
    where,
    select: {
      id: true,
      fullName: true,
      designation: true,
      employeeCode: true,
      user: { select: { displayName: true, email: true } },
    },
    orderBy: { fullName: "asc" },
    take: 100,
  });
  return rows.map((r) => ({
    id: r.id,
    name: decrypt(r.fullName) ?? r.user?.displayName ?? "Unknown",
    designation: r.designation,
    employeeCode: r.employeeCode,
  }));
}

/** Bulk action: assign multiple available leads to an employee. */
export async function bulkClaimLeads(assignmentIds: string[], employeeId: string) {
  const results = await db.callAssignment.updateMany({
    where: { id: { in: assignmentIds }, employeeId: null, status: "available" },
    data: { employeeId, status: "in_progress", claimedAt: new Date() },
  });
  return { claimed: results.count, requested: assignmentIds.length };
}

/** Bulk action: update status for multiple leads owned by the employee. */
export async function bulkUpdateStatus(assignmentIds: string[], employeeId: string, newStatus: string) {
  const validStatuses = ["success", "rejected", "not_connected", "reschedule", "callback", "converted", "dnd", "available"];
  if (!validStatuses.includes(newStatus)) throw new Error("Invalid status");
  const results = await db.callAssignment.updateMany({
    where: { id: { in: assignmentIds }, employeeId },
    data: { status: newStatus, ...(newStatus === "available" ? { employeeId: null, claimedAt: null } : {}) },
  });
  return { updated: results.count, requested: assignmentIds.length };
}

/**
 * Search/filter leads. Returns combined view of universal pool + employee's own leads
 * matching the query. Used by the advanced filter UI.
 */
export async function searchLeads(opts: {
  employeeId?: string;
  query?: string;
  status?: string;
  priority?: number;
  service?: string;
  city?: string;
  scope?: "all" | "mine" | "pool";
  limit?: number;
}) {
  const { query, status, priority, service, city, scope = "all", limit = 200 } = opts;
  const where: any = {};
  if (status && status !== "all") where.status = status;
  if (priority != null) where.priority = priority;
  if (service && service !== "all") where.service = { contains: service };
  if (city && city !== "all") where.city = { contains: city };

  if (scope === "mine") {
    where.employeeId = opts.employeeId ?? null;
  } else if (scope === "pool") {
    where.employeeId = null;
    where.status = "available";
  } else {
    // "all" — show leads owned by this employee OR in the pool
    where.OR = [
      { employeeId: opts.employeeId ?? null },
      { employeeId: null, status: "available" },
    ];
  }

  const rows = await db.callAssignment.findMany({
    where, orderBy: [{ priority: "desc" }, { assignedAt: "desc" }], take: limit,
    include: { outcomes: { orderBy: { createdAt: "desc" }, take: 1 } },
  });

  let decrypted = rows.map((r) => {
    const d = decryptLead(r);
    const last = r.outcomes?.[0];
    return {
      ...d,
      latestOutcome: last ? {
        outcome: last.outcome, disposition: last.disposition,
        createdAt: last.createdAt, callbackAt: last.callbackAt,
      } : null,
    };
  });

  // Client-side text search on decrypted fields (name, city, service, mobile)
  if (query && query.trim().length >= 2) {
    const q = query.trim().toLowerCase();
    decrypted = decrypted.filter((d) =>
      (d.customerName || "").toLowerCase().includes(q) ||
      (d.city || "").toLowerCase().includes(q) ||
      (d.service || "").toLowerCase().includes(q) ||
      (d.customerMobileMasked || "").includes(q) ||
      (d.notes || "").toLowerCase().includes(q)
    );
  }
  return decrypted;
}

/** Get distinct services + cities for filter dropdowns. */
export async function getLeadFilterOptions(employeeId?: string) {
  const where: any = {
    OR: [{ employeeId }, { employeeId: null, status: "available" }],
  };
  const rows = await db.callAssignment.findMany({
    where, select: { service: true, city: true }, take: 1000,
  });
  const services = Array.from(new Set(rows.map((r) => r.service).filter(Boolean))) as string[];
  const cities = Array.from(new Set(rows.map((r) => r.city).filter(Boolean))) as string[];
  return { services: services.sort(), cities: cities.sort() };
}

export async function employeeStats(employeeId: string) {
  const [claimed, outcomes, inProgress, converted, followUps, available] = await Promise.all([
    db.callAssignment.count({ where: { employeeId } }),
    db.callOutcome.count({ where: { employeeId } }),
    db.callAssignment.count({ where: { employeeId, status: "in_progress" } }),
    db.callAssignment.count({ where: { employeeId, status: { in: ["converted", "success"] } } }),
    db.followUp.count({ where: { employeeId, completed: false, scheduledAt: { gte: new Date() } } }),
    db.callAssignment.count({ where: { employeeId: null, status: "available" } }),
  ]);
  const connected = await db.callOutcome.count({ where: { employeeId, outcome: "connected" } });
  const success = await db.callAssignment.count({ where: { employeeId, status: "success" } });
  const rejected = await db.callAssignment.count({ where: { employeeId, status: "rejected" } });
  return {
    claimed, outcomes, inProgress, converted, followUps, available,
    connected, success, rejected,
    connectRate: claimed ? Math.round((connected / claimed) * 100) : 0,
    successRate: outcomes ? Math.round((success / outcomes) * 100) : 0,
  };
}

// ---------- EMPLOYEE CHAT (48h self-delete) ----------
export async function listChatMessages(channel = "general", limit = 200) {
  const since = new Date(Date.now() - 48 * 60 * 60 * 1000);
  return db.chatMessage.findMany({ where: { channel, createdAt: { gte: since } }, orderBy: { createdAt: "asc" }, take: limit });
}

export async function createChatMessage(input: {
  userId?: string; userName: string; userRole?: string; channel?: string; content: string;
}) {
  await db.chatMessage.deleteMany({ where: { createdAt: { lt: new Date(Date.now() - 48 * 60 * 60 * 1000) } } }).catch(() => {});
  return db.chatMessage.create({
    data: {
      userId: input.userId ?? null, userName: input.userName, userRole: input.userRole ?? null,
      channel: input.channel || "general", content: input.content.slice(0, 2000),
    },
  });
}

export async function purgeOldChatMessages() {
  const r = await db.chatMessage.deleteMany({ where: { createdAt: { lt: new Date(Date.now() - 48 * 60 * 60 * 1000) } } });
  return r.count;
}

function decryptLead(r: any) {
  return {
    ...r,
    customerName: decrypt(r.customerName) ?? "",
    customerMobile: decrypt(r.customerMobile) ?? "",
    customerEmail: r.customerEmail ? decrypt(r.customerEmail) : null,
  };
}

// ---------- PARTNER FILES ----------
export async function createPartnerFile(input: {
  partnerId?: string; customerName: string; customerMobile: string; customerEmail?: string;
  city?: string; service?: string; loanAmount?: number; employmentType?: string;
  fileName?: string; fileUrl?: string; notes?: string;
}) {
  return db.partnerFile.create({
    data: {
      partnerId: input.partnerId ?? null,
      customerName: encrypt(input.customerName),
      customerMobile: encrypt(input.customerMobile),
      customerEmail: input.customerEmail ? encrypt(input.customerEmail) : null,
      city: input.city ?? null,
      service: input.service ?? null,
      loanAmount: input.loanAmount ?? null,
      employmentType: input.employmentType ?? null,
      fileName: input.fileName ?? null,
      fileUrl: input.fileUrl ? encrypt(input.fileUrl) : null,
      notes: input.notes ?? null,
      status: "new",
    },
  });
}

export async function listPartnerFiles(partnerId?: string) {
  const where = partnerId ? { partnerId } : {};
  const files = await db.partnerFile.findMany({ where, orderBy: { createdAt: "desc" } });
  return files.map((f) => ({
    ...f,
    customerName: decrypt(f.customerName) ?? "",
    customerMobile: decrypt(f.customerMobile) ?? "",
    customerEmail: f.customerEmail ? decrypt(f.customerEmail) : null,
    fileUrl: f.fileUrl ? decrypt(f.fileUrl) : null,
  }));
}

export async function setPartnerFileStatus(id: string, status: string, adminNotes?: string) {
  return db.partnerFile.update({
    where: { id },
    data: { status, ...(adminNotes !== undefined ? { adminNotes } : {}) },
  });
}

export async function partnerStats(partnerId?: string) {
  const where = partnerId ? { partnerId } : {};
  const [total, newF, review, sanctioned, rejected] = await Promise.all([
    db.partnerFile.count({ where }),
    db.partnerFile.count({ where: { ...where, status: "new" } }),
    db.partnerFile.count({ where: { ...where, status: "in_review" } }),
    db.partnerFile.count({ where: { ...where, status: "sanctioned" } }),
    db.partnerFile.count({ where: { ...where, status: "rejected" } }),
  ]);
  return { total, new: newF, review, sanctioned, rejected };
}

// ---------- ADMIN DASHBOARD STATS ----------
export async function adminStats() {
  const [leads, blogs, cards, affiliates, employees, partners, callSheets, partnerFiles, assignments, converted] = await Promise.all([
    db.lead.count(),
    db.blog.count(),
    db.creditCard.count(),
    db.affiliateLink.count(),
    db.employee.count({ where: { isActive: true } }),
    db.user.count({ where: { role: "partner" } }),
    db.callSheet.count(),
    db.partnerFile.count(),
    db.callAssignment.count(),
    db.callAssignment.count({ where: { status: "converted" } }),
  ]);
  return { leads, blogs, cards, affiliates, employees, partners, callSheets, partnerFiles, assignments, converted };
}

// ---------- AUDIT LOG ----------
export async function audit(input: { actorId?: string; actorRole?: string; action: string; entity?: string; entityId?: string; meta?: any }) {
  try {
    return db.auditLog.create({
      data: {
        actorId: input.actorId ?? null,
        actorRole: input.actorRole ?? null,
        action: input.action,
        entity: input.entity ?? null,
        entityId: input.entityId ?? null,
        meta: input.meta ? JSON.stringify(input.meta) : null,
      },
    });
  } catch {
    return null;
  }
}

// ---------- helpers ----------
export function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64);
}

function safeParseArray(s: string | null): string[] {
  if (!s) return [];
  try { const v = JSON.parse(s); return Array.isArray(v) ? v : []; } catch { return []; }
}
