/**
 * Shared helpers for the CRM employee UI (client-only).
 * No React — pure functions + constants + types.
 *
 * Lead-claiming model:
 *   - Admin uploads call sheets → leads enter universal pool (status: "available")
 *   - Employee claims a lead → status flips to "in_progress"
 *   - Employee submits a post-call feedback form → CallOutcome row created,
 *     assignment status moves to one of the disposition statuses.
 */

export type Outcome = "connected" | "no_answer" | "wrong_number" | "busy" | "voicemail";
export type Disposition =
  | "success"
  | "rejected"
  | "not_connected"
  | "reschedule"
  | "callback"
  | "converted"
  | "dnd";
export type AssignmentStatus =
  | "available"
  | "in_progress"
  | "success"
  | "rejected"
  | "not_connected"
  | "reschedule"
  | "callback"
  | "converted"
  | "dnd";

export const OUTCOME_OPTIONS: { value: Outcome; label: string; hint?: string }[] = [
  { value: "connected", label: "Connected", hint: "Customer picked up" },
  { value: "no_answer", label: "No answer", hint: "Rang, no response" },
  { value: "busy", label: "Busy", hint: "Line was busy" },
  { value: "wrong_number", label: "Wrong number", hint: "Invalid / not reachable" },
  { value: "voicemail", label: "Voicemail", hint: "Went to voicemail" },
];

export const DISPOSITION_OPTIONS: {
  value: Disposition;
  label: string;
  emoji: string;
  /** Tailwind classes for the radio-card (border + bg + text) when selected */
  selectedTone: string;
  /** Tailwind classes for the radio-card in idle state */
  idleTone: string;
}[] = [
  {
    value: "success",
    label: "Success",
    emoji: "✅",
    selectedTone: "border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200",
    idleTone: "border-border bg-card hover:border-emerald-300 hover:bg-emerald-50/40",
  },
  {
    value: "reschedule",
    label: "Reschedule",
    emoji: "🔄",
    selectedTone: "border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-200",
    idleTone: "border-border bg-card hover:border-amber-300 hover:bg-amber-50/40",
  },
  {
    value: "callback",
    label: "Callback",
    emoji: "📞",
    selectedTone: "border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-200",
    idleTone: "border-border bg-card hover:border-amber-300 hover:bg-amber-50/40",
  },
  {
    value: "rejected",
    label: "Rejected",
    emoji: "❌",
    selectedTone: "border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-200",
    idleTone: "border-border bg-card hover:border-rose-300 hover:bg-rose-50/40",
  },
  {
    value: "not_connected",
    label: "Not connected",
    emoji: "🚫",
    selectedTone: "border-zinc-400 bg-zinc-100 text-zinc-700 ring-2 ring-zinc-200",
    idleTone: "border-border bg-card hover:border-zinc-400 hover:bg-zinc-100/40",
  },
  {
    value: "converted",
    label: "Converted",
    emoji: "💰",
    selectedTone: "border-emerald-600 bg-emerald-100 text-emerald-900 ring-2 ring-emerald-300",
    idleTone: "border-border bg-card hover:border-emerald-400 hover:bg-emerald-100/40",
  },
  {
    value: "dnd",
    label: "DND",
    emoji: "🛑",
    selectedTone: "border-zinc-500 bg-zinc-200 text-zinc-800 ring-2 ring-zinc-300",
    idleTone: "border-border bg-card hover:border-zinc-500 hover:bg-zinc-200/40",
  },
];

export const STATUS_META: Record<AssignmentStatus, { label: string; tone: string }> = {
  available: { label: "Available", tone: "bg-blue-100 text-blue-800 border-blue-200" },
  in_progress: { label: "In progress", tone: "bg-amber-100 text-amber-900 border-amber-200" },
  success: { label: "Success", tone: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  rejected: { label: "Rejected", tone: "bg-rose-100 text-rose-800 border-rose-200" },
  not_connected: { label: "Not connected", tone: "bg-zinc-100 text-zinc-700 border-zinc-200" },
  reschedule: { label: "Reschedule", tone: "bg-amber-100 text-amber-900 border-amber-200" },
  callback: { label: "Callback", tone: "bg-amber-100 text-amber-900 border-amber-200" },
  converted: { label: "Converted", tone: "bg-emerald-600 text-white border-emerald-700" },
  dnd: { label: "DND", tone: "bg-zinc-200 text-zinc-700 border-zinc-300" },
};

export const DISPOSITION_META: Record<Disposition, { label: string; tone: string }> = {
  success: { label: "Success", tone: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  reschedule: { label: "Reschedule", tone: "bg-amber-100 text-amber-900 border-amber-200" },
  callback: { label: "Callback", tone: "bg-amber-100 text-amber-900 border-amber-200" },
  rejected: { label: "Rejected", tone: "bg-rose-100 text-rose-800 border-rose-200" },
  not_connected: { label: "Not connected", tone: "bg-zinc-100 text-zinc-700 border-zinc-200" },
  converted: { label: "Converted", tone: "bg-emerald-600 text-white border-emerald-700" },
  dnd: { label: "DND", tone: "bg-zinc-200 text-zinc-700 border-zinc-300" },
};

export const OUTCOME_META: Record<Outcome, { label: string }> = {
  connected: { label: "Connected" },
  no_answer: { label: "No answer" },
  busy: { label: "Busy" },
  wrong_number: { label: "Wrong number" },
  voicemail: { label: "Voicemail" },
};

/** Disposition color palette used by the stats pie chart. oklch strings. */
export const DISPOSITION_COLORS: Record<Disposition, string> = {
  success: "oklch(0.72 0.15 145)",
  reschedule: "oklch(0.78 0.13 75)",
  callback: "oklch(0.80 0.10 85)",
  rejected: "oklch(0.58 0.20 25)",
  not_connected: "oklch(0.55 0.04 265)",
  converted: "oklch(0.65 0.18 150)",
  dnd: "oklch(0.45 0.02 265)",
};

export const DISPOSITION_LABELS: Record<Disposition, string> = {
  success: "Success",
  reschedule: "Reschedule",
  callback: "Callback",
  rejected: "Rejected",
  not_connected: "Not connected",
  converted: "Converted",
  dnd: "DND",
};

export function formatINR(amount: number | null | undefined): string {
  if (amount == null || isNaN(amount)) return "—";
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount.toFixed(0)}`;
}

export function formatDateTime(iso: string | Date | null | undefined): string {
  if (!iso) return "—";
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDate(iso: string | Date | null | undefined): string {
  if (!iso) return "—";
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDuration(sec: number | null | undefined): string {
  if (!sec || sec <= 0) return "0s";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

export function priorityLabel(p: number | null | undefined): string {
  if (p == null) return "—";
  if (p >= 2) return "High";
  if (p === 1) return "Medium";
  return "Low";
}

export function priorityTone(p: number | null | undefined): string {
  if (p == null) return "bg-muted text-foreground border-border";
  if (p >= 2) return "bg-rose-100 text-rose-800 border-rose-200";
  if (p === 1) return "bg-amber-100 text-amber-900 border-amber-200";
  return "bg-muted text-foreground border-border";
}

export function relativeTime(iso: string | Date | null | undefined): string {
  if (!iso) return "—";
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (isNaN(d.getTime())) return "—";
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(d);
}

/** Build a `tel:` href from a phone string (digits only, prefixed with +91 if 10 digits). */
export function telHref(mobile: string | null | undefined): string | null {
  if (!mobile) return null;
  const digits = String(mobile).replace(/\D/g, "");
  if (digits.length === 10) return `tel:+91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `tel:+91${digits.slice(1)}`;
  if (digits.length === 12 && digits.startsWith("91")) return `tel:+${digits}`;
  if (digits.length === 13 && digits.startsWith("910")) return `tel:+91${digits.slice(3)}`;
  if (digits.length > 0) return `tel:${digits}`;
  return null;
}

/** Default datetime-local value: now + 2 hours, rounded to the next 15-minute mark. */
export function defaultCallbackValue(): string {
  const d = new Date(Date.now() + 2 * 3600 * 1000);
  d.setMinutes(Math.ceil(d.getMinutes() / 15) * 15, 0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/* ========================================================================
   Lead scoring — auto-prioritize leads based on amount, recency, engagement
   ========================================================================
   Score range: 0–100. Higher = hotter lead.
   - Loan amount: bigger loan = higher score (capped)
   - Recency: newer leads score higher (decay over 30 days)
   - Engagement: leads with prior callbacks/dispositions score higher
   - Priority flag: explicit admin priority multiplies
*/
export function leadScore(input: {
  loanAmount?: number | null;
  assignedAt?: string | null;
  claimedAt?: string | null;
  priority?: number | null;
  outcomesCount?: number;
  latestDisposition?: string | null;
}): { score: number; tier: "hot" | "warm" | "cold"; reasons: string[] } {
  const reasons: string[] = [];
  let score = 30; // baseline

  // Loan amount (0–30 pts, logarithmic to handle wide range)
  const amt = input.loanAmount ?? 0;
  if (amt > 0) {
    const amtScore = Math.min(30, Math.round(Math.log10(amt / 10000) * 10));
    score += amtScore;
    if (amt >= 1000000) reasons.push(`High ticket size (${formatINR(amt)})`);
  }

  // Recency (0–20 pts, decays over 30 days)
  const ref = input.claimedAt || input.assignedAt;
  if (ref) {
    const daysSince = (Date.now() - new Date(ref).getTime()) / (24 * 3600 * 1000);
    const recencyScore = Math.max(0, Math.round(20 * (1 - daysSince / 30)));
    score += recencyScore;
    if (daysSince < 1) reasons.push("Fresh lead (< 24h old)");
  }

  // Priority flag (0–15 pts)
  const p = input.priority ?? 0;
  if (p >= 2) { score += 15; reasons.push("Marked high priority"); }
  else if (p === 1) { score += 8; }

  // Engagement (0–5 pts)
  if ((input.outcomesCount ?? 0) > 0) {
    score += 5;
    reasons.push(`${input.outcomesCount} prior call(s)`);
  }

  // Disposition bonus
  if (input.latestDisposition === "callback") { score += 10; reasons.push("Requested callback"); }
  else if (input.latestDisposition === "reschedule") { score += 8; reasons.push("Asked to reschedule"); }
  else if (input.latestDisposition === "success") { score += 5; }

  score = Math.max(0, Math.min(100, score));
  const tier: "hot" | "warm" | "cold" = score >= 70 ? "hot" : score >= 45 ? "warm" : "cold";
  return { score, tier, reasons: reasons.slice(0, 3) };
}

/** Tier → badge styling. */
export function tierTone(tier: "hot" | "warm" | "cold"): { bg: string; text: string; ring: string; emoji: string; label: string } {
  switch (tier) {
    case "hot":
      return { bg: "bg-rose-100", text: "text-rose-800", ring: "ring-rose-300", emoji: "🔥", label: "Hot" };
    case "warm":
      return { bg: "bg-amber-100", text: "text-amber-900", ring: "ring-amber-300", emoji: "⚡", label: "Warm" };
    case "cold":
      return { bg: "bg-sky-100", text: "text-sky-800", ring: "ring-sky-300", emoji: "❄️", label: "Cold" };
  }
}

/* ========================================================================
   Kanban column definitions — the pipeline view
   ======================================================================== */
export const KANBAN_COLUMNS: { id: AssignmentStatus; label: string; tone: string; dot: string }[] = [
  { id: "available",    label: "Available",    tone: "border-blue-300 bg-blue-50",       dot: "bg-blue-500" },
  { id: "in_progress",  label: "In Progress",  tone: "border-amber-300 bg-amber-50",     dot: "bg-amber-500" },
  { id: "callback",     label: "Callback",     tone: "border-orange-300 bg-orange-50",   dot: "bg-orange-500" },
  { id: "reschedule",   label: "Reschedule",   tone: "border-yellow-300 bg-yellow-50",   dot: "bg-yellow-500" },
  { id: "success",      label: "Success",      tone: "border-emerald-300 bg-emerald-50", dot: "bg-emerald-500" },
  { id: "converted",    label: "Converted",    tone: "border-green-600 bg-green-100",    dot: "bg-green-600" },
  { id: "rejected",     label: "Rejected",     tone: "border-rose-300 bg-rose-50",       dot: "bg-rose-500" },
  { id: "not_connected",label: "Not Connected",tone: "border-zinc-300 bg-zinc-50",       dot: "bg-zinc-400" },
  { id: "dnd",          label: "DND",          tone: "border-zinc-400 bg-zinc-100",      dot: "bg-zinc-600" },
];

/** Quick action status options for bulk-update menu. */
export const BULK_STATUS_OPTIONS: { value: string; label: string; emoji: string }[] = [
  { value: "callback",      label: "Mark callback",      emoji: "📞" },
  { value: "reschedule",    label: "Mark reschedule",    emoji: "🔄" },
  { value: "success",       label: "Mark success",       emoji: "✅" },
  { value: "converted",     label: "Mark converted",     emoji: "💰" },
  { value: "rejected",      label: "Mark rejected",      emoji: "❌" },
  { value: "not_connected", label: "Mark not connected", emoji: "🚫" },
  { value: "dnd",           label: "Mark DND",           emoji: "🛑" },
  { value: "available",     label: "Release to pool",    emoji: "↩️" },
];

