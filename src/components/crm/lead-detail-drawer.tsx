"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  X, Phone, MapPin, Briefcase, Wallet, Calendar, Clock, Flame,
  PhoneCall, PhoneOutgoing, CheckCircle2, RotateCcw, Bell, StickyNote,
  Loader2, MessageSquare, TrendingUp, Save, ExternalLink, Send, UserPlus,
} from "lucide-react";
import {
  formatINR, formatDateTime, formatDate, formatDuration, relativeTime,
  telHref, STATUS_META, DISPOSITION_META, OUTCOME_META, leadScore, tierTone,
  type AssignmentStatus, type Disposition, type Outcome,
} from "./crm-shared";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type OutcomeRow = {
  id: string; outcome: string; disposition: string;
  callDurationSec: number; notes: string | null;
  callbackAt: string | null; convertedAmount: number | null;
  createdAt: string;
};

type FollowUpRow = {
  id: string; scheduledAt: string; note: string | null;
  completed: boolean; createdAt: string;
};

type LeadDetail = {
  id: string;
  customerName: string;
  customerMobileMasked: string;
  customerMobile?: string;
  customerEmailMasked: string | null;
  customerEmail?: string;
  city: string | null;
  service: string | null;
  loanAmount: number | null;
  employmentType: string | null;
  monthlyIncome: number | null;
  notes: string | null;
  priority: number;
  status: AssignmentStatus;
  assignedAt: string;
  claimedAt: string | null;
  dueDate: string | null;
  callSheetName: string | null;
  outcomes: OutcomeRow[];
  followUps: FollowUpRow[];
};

type Props = {
  leadId: string | null;
  onClose: () => void;
  onUpdated?: () => void;
};

export function LeadDetailDrawer({ leadId, onClose, onUpdated }: Props) {
  const [detail, setDetail] = useState<LeadDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [notesDraft, setNotesDraft] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  // Lead-transfer state
  const [transferOpen, setTransferOpen] = useState(false);
  const [employees, setEmployees] = useState<{ id: string; name: string; designation: string | null }[]>([]);
  const [transferTo, setTransferTo] = useState("");
  const [transferNote, setTransferNote] = useState("");
  const [transferring, setTransferring] = useState(false);

  useEffect(() => {
    if (!leadId) { setDetail(null); return; }
    setLoading(true);
    setNotesDraft("");
    setTransferOpen(false);
    setTransferTo("");
    setTransferNote("");
    fetch(`/api/crm/leads/${leadId}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d.lead) {
          setDetail(d.lead);
          setNotesDraft(d.lead.notes || "");
        } else {
          toast.error(d.error || "Could not load lead");
          onClose();
        }
      })
      .catch(() => toast.error("Network error"))
      .finally(() => setLoading(false));
  }, [leadId, onClose]);

  async function loadEmployees() {
    if (employees.length > 0) return;
    try {
      const r = await fetch("/api/crm/employees", { cache: "no-store" });
      const d = await r.json();
      setEmployees(d.employees ?? []);
    } catch { /* ignore */ }
  }

  async function transferLead() {
    if (!detail || !transferTo) return;
    setTransferring(true);
    try {
      const r = await fetch(`/api/crm/leads/${detail.id}/transfer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toEmployeeId: transferTo, note: transferNote.trim() || undefined }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Transfer failed");
      toast.success("Lead transferred successfully");
      setTransferOpen(false);
      setTransferTo("");
      setTransferNote("");
      onClose();
      onUpdated?.();
    } catch (e: any) {
      toast.error(e?.message || "Transfer failed");
    } finally {
      setTransferring(false);
    }
  }

  async function saveNotes() {
    if (!detail) return;
    setSavingNotes(true);
    try {
      const r = await fetch(`/api/crm/leads/${detail.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: notesDraft }),
      });
      if (!r.ok) throw new Error("Save failed");
      toast.success("Notes saved");
      setDetail((d) => d ? { ...d, notes: notesDraft } : d);
      onUpdated?.();
    } catch {
      toast.error("Could not save notes");
    } finally {
      setSavingNotes(false);
    }
  }

  async function completeFollowUp(fuId: string) {
    try {
      const r = await fetch(`/api/crm/follow-ups/${fuId}/complete`, { method: "POST" });
      if (!r.ok) throw new Error("Failed");
      toast.success("Follow-up marked complete");
      setDetail((d) => d ? {
        ...d,
        followUps: d.followUps.map((f) => f.id === fuId ? { ...f, completed: true } : f),
      } : d);
      onUpdated?.();
    } catch {
      toast.error("Could not complete follow-up");
    }
  }

  const score = detail ? leadScore({
    loanAmount: detail.loanAmount,
    assignedAt: detail.assignedAt,
    claimedAt: detail.claimedAt,
    priority: detail.priority,
    outcomesCount: detail.outcomes.length,
    latestDisposition: detail.outcomes[0]?.disposition ?? null,
  }) : null;
  const tier = score ? tierTone(score.tier) : null;
  const status = detail ? STATUS_META[detail.status] ?? STATUS_META.in_progress : null;
  const phone = detail ? telHref(detail.customerMobile ?? detail.customerMobileMasked) : null;

  return (
    <>
      {leadId && (
        <>
          {/* Overlay */}
          <div
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm"
          />
          {/* Drawer */}
          <aside
            className="fixed inset-y-0 right-0 z-[81] flex w-full max-w-md flex-col bg-card shadow-2xl"
            style={{ animation: "drawer-slide-in 0.25s ease-out" }}
          >
            {/* Header */}
            <header className="flex items-center gap-3 border-b border-border bg-primary px-4 py-3 text-primary-foreground">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium uppercase tracking-wider text-primary-foreground/70">Lead detail</p>
                <h2 className="truncate font-display text-lg">
                  {loading ? "Loading…" : detail?.customerName ?? "—"}
                </h2>
              </div>
              {status && (
                <span className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-medium ${status.tone}`}>
                  {status.label}
                </span>
              )}
              <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 hover:bg-primary-foreground/10">
                <X className="h-5 w-5" />
              </button>
            </header>

            {loading ? (
              <div className="flex flex-1 items-center justify-center">
                <Loader2 className="size-8 animate-spin text-gold" />
              </div>
            ) : detail ? (
              <div className="scroll-thin flex-1 overflow-y-auto">
                {/* Score + Quick info */}
                <section className="border-b border-border bg-muted/30 p-4">
                  {score && tier && (
                    <div className={`mb-3 flex items-center gap-3 rounded-xl border ${tier.bg} ${tier.text} p-3 ring-1 ${tier.ring}`}>
                      <span className="text-2xl">{tier.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-wide opacity-80">Lead score</p>
                        <p className="font-display text-xl">{score.score} <span className="text-xs">/ 100 · {tier.label}</span></p>
                      </div>
                      <div className="hidden text-[10px] leading-tight opacity-80 sm:block">
                        {score.reasons.length > 0 ? score.reasons.map((r) => <div key={r}>• {r}</div>) : <div>No signals</div>}
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <InfoChip icon={Phone} label="Mobile" value={detail.customerMobileMasked} />
                    {phone && (
                      <a href={phone} className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1.5 font-medium text-emerald-700 hover:bg-emerald-500/20">
                        <PhoneOutgoing className="h-3.5 w-3.5" /> Call now
                      </a>
                    )}
                    <InfoChip icon={MapPin} label="City" value={detail.city ?? "—"} />
                    <InfoChip icon={Briefcase} label="Service" value={detail.service ?? "—"} />
                    <InfoChip icon={Wallet} label="Loan amount" value={formatINR(detail.loanAmount)} />
                    <InfoChip icon={TrendingUp} label="Monthly income" value={formatINR(detail.monthlyIncome)} />
                    <InfoChip icon={Calendar} label="Assigned" value={relativeTime(detail.assignedAt)} />
                    {detail.claimedAt && <InfoChip icon={Clock} label="Claimed" value={relativeTime(detail.claimedAt)} />}
                  </div>
                  {detail.employmentType && (
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      Employment: <span className="font-medium text-foreground">{detail.employmentType}</span>
                      {detail.callSheetName && <> · Sheet: <span className="font-medium text-foreground">{detail.callSheetName}</span></>}
                    </p>
                  )}
                </section>

                {/* Activity timeline */}
                <section className="border-b border-border p-4">
                  <h3 className="mb-3 flex items-center gap-1.5 font-display text-sm font-semibold">
                    <MessageSquare className="h-4 w-4 text-gold" /> Activity timeline
                  </h3>
                  {detail.outcomes.length === 0 && detail.followUps.length === 0 ? (
                    <p className="rounded-md bg-muted/50 px-3 py-4 text-center text-xs text-muted-foreground">
                      No activity yet. Start calling to build the timeline.
                    </p>
                  ) : (
                    <ol className="relative space-y-3 border-l border-border pl-4">
                      {detail.outcomes.map((o) => {
                        const disp = DISPOSITION_META[o.disposition as Disposition];
                        const out = OUTCOME_META[o.outcome as Outcome];
                        return (
                          <li key={o.id} className="relative">
                            <span className={`absolute -left-[22px] top-1 grid size-4 place-items-center rounded-full ${disp?.tone ?? "bg-muted"}`}>
                              <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            </span>
                            <div className="rounded-md border border-border bg-background px-3 py-2">
                              <div className="flex flex-wrap items-center gap-2 text-xs">
                                <span className={`rounded border px-1.5 py-0.5 font-medium ${disp?.tone ?? ""}`}>{disp?.label ?? o.disposition}</span>
                                <span className="text-muted-foreground">{out?.label ?? o.outcome}</span>
                                <span className="ml-auto text-[10px] text-muted-foreground">{formatDateTime(o.createdAt)}</span>
                              </div>
                              {o.callDurationSec > 0 && (
                                <p className="mt-1 text-[10px] text-muted-foreground">Duration: {formatDuration(o.callDurationSec)}</p>
                              )}
                              {o.notes && <p className="mt-1 text-xs text-foreground/85">{o.notes}</p>}
                              {o.callbackAt && (
                                <p className="mt-1 flex items-center gap-1 text-[10px] text-amber-700"><Bell className="h-3 w-3" /> Callback: {formatDateTime(o.callbackAt)}</p>
                              )}
                              {o.convertedAmount != null && o.convertedAmount > 0 && (
                                <p className="mt-1 text-[11px] font-semibold text-emerald-700">💰 Converted: {formatINR(o.convertedAmount)}</p>
                              )}
                            </div>
                          </li>
                        );
                      })}
                      {detail.followUps.filter((f) => !f.completed).map((f) => (
                        <li key={f.id} className="relative">
                          <span className="absolute -left-[22px] top-1 grid size-4 place-items-center rounded-full bg-amber-200">
                            <Bell className="h-2 w-2 text-amber-700" />
                          </span>
                          <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-amber-900">Follow-up due</span>
                              <span className="text-[10px] text-amber-700">{formatDateTime(f.scheduledAt)}</span>
                            </div>
                            {f.note && <p className="mt-1 text-xs text-amber-900/85">{f.note}</p>}
                            <button
                              onClick={() => completeFollowUp(f.id)}
                              className="mt-2 inline-flex items-center gap-1 rounded bg-amber-600 px-2 py-0.5 text-[10px] font-medium text-white hover:bg-amber-700"
                            >
                              <CheckCircle2 className="h-3 w-3" /> Mark done
                            </button>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}
                </section>

                {/* Notes */}
                <section className="p-4">
                  <h3 className="mb-2 flex items-center gap-1.5 font-display text-sm font-semibold">
                    <StickyNote className="h-4 w-4 text-gold" /> Internal notes
                  </h3>
                  <Textarea
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    placeholder="Add context, observations, next-step reminders…"
                    rows={4}
                    className="text-xs"
                  />
                  <Button
                    onClick={saveNotes}
                    disabled={savingNotes || notesDraft === (detail.notes || "")}
                    size="sm"
                    className="mt-2 w-full"
                  >
                    {savingNotes ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                    Save notes
                  </Button>
                </section>

                {/* Transfer lead */}
                <section className="border-t border-border p-4">
                  <h3 className="mb-2 flex items-center gap-1.5 font-display text-sm font-semibold">
                    <UserPlus className="h-4 w-4 text-gold" /> Transfer lead
                  </h3>
                  {!transferOpen ? (
                    <button
                      onClick={() => { setTransferOpen(true); loadEmployees(); }}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground/80 hover:border-gold/40 hover:bg-gold/5"
                    >
                      <Send className="h-3.5 w-3.5" /> Hand off to another employee
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-[11px] text-muted-foreground">
                        The recipient inherits this lead, its open follow-ups, and the activity timeline. Your ownership ends immediately.
                      </p>
                      <select
                        value={transferTo}
                        onChange={(e) => setTransferTo(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                      >
                        <option value="">Select recipient…</option>
                        {employees.map((e) => (
                          <option key={e.id} value={e.id}>
                            {e.name}{e.designation ? ` — ${e.designation}` : ""}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={transferNote}
                        onChange={(e) => setTransferNote(e.target.value)}
                        placeholder="Optional reason / context for the handoff…"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => { setTransferOpen(false); setTransferTo(""); setTransferNote(""); }}
                          disabled={transferring}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={transferLead}
                          disabled={transferring || !transferTo}
                          className="flex-1 bg-gradient-gold text-gold-foreground hover:opacity-90"
                        >
                          {transferring ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                          Transfer
                        </Button>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center p-6 text-center text-sm text-muted-foreground">
                Lead not found.
              </div>
            )}
          </aside>
        </>
      )}
    </>
  );
}

function InfoChip({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-md bg-background px-2.5 py-1.5">
      <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      <span className="truncate text-[11px]">
        <span className="text-muted-foreground">{label}:</span>{" "}
        <span className="font-medium text-foreground">{value}</span>
      </span>
    </div>
  );
}
