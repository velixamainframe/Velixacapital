"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { CrmShell, CrmPageSkeleton, EmptyState } from "@/components/crm/crm-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PhoneCall,
  Search,
  Loader2,
  PhoneOutgoing,
  CheckCircle2,
  Inbox,
  ListFilter,
  Lock,
  Hand,
} from "lucide-react";
import {
  OUTCOME_OPTIONS,
  DISPOSITION_OPTIONS,
  STATUS_META,
  DISPOSITION_META,
  OUTCOME_META,
  formatINR,
  formatDateTime,
  formatDuration,
  priorityLabel,
  priorityTone,
  relativeTime,
  defaultCallbackValue,
  type Outcome,
  type Disposition,
  type AssignmentStatus,
} from "@/components/crm/crm-shared";

type LatestOutcome = {
  outcome: string;
  disposition: string;
  notes: string | null;
  createdAt: string;
  callbackAt: string | null;
  convertedAmount: number | null;
  callDurationSec: number;
} | null;

type Lead = {
  id: string;
  customerName: string;
  customerMobileMasked: string;
  customerEmailMasked: string | null;
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
  latestOutcome?: LatestOutcome;
};

type Filter =
  | "all"
  | "in_progress"
  | "success"
  | "rejected"
  | "not_connected"
  | "reschedule"
  | "callback"
  | "converted"
  | "dnd";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "in_progress", label: "In Progress" },
  { value: "success", label: "Success" },
  { value: "rejected", label: "Rejected" },
  { value: "not_connected", label: "Not Connected" },
  { value: "reschedule", label: "Reschedule" },
  { value: "callback", label: "Callback" },
  { value: "converted", label: "Converted" },
  { value: "dnd", label: "DND" },
];

export function DialerClient() {
  return (
    <CrmShell active="calls">
      <DialerInner />
    </CrmShell>
  );
}

function DialerInner() {
  const [tab, setTab] = useState<"available" | "mine">("available");
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [available, setAvailable] = useState<Lead[]>([]);
  const [mine, setMine] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<string | null>(null);
  const [releasing, setReleasing] = useState<string | null>(null);
  const [logOpen, setLogOpen] = useState(false);
  const [logTarget, setLogTarget] = useState<Lead | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/crm/leads", { cache: "no-store" });
      const data = await r.json();
      setAvailable(data.available ?? []);
      setMine(data.mine ?? []);
    } catch {
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function claim(lead: Lead) {
    setClaiming(lead.id);
    try {
      const r = await fetch(`/api/crm/leads/${lead.id}/claim`, { method: "POST" });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Could not claim lead");
      toast.success(`Claimed ${lead.customerName}. Switched to "My Claimed".`);
      setTab("mine");
      await load();
    } catch (e: any) {
      toast.error(e?.message || "Could not claim lead");
    } finally {
      setClaiming(null);
    }
  }

  async function release(lead: Lead) {
    if (!confirm(`Release ${lead.customerName} back to the pool?`)) return;
    setReleasing(lead.id);
    try {
      const r = await fetch(`/api/crm/leads/${lead.id}/release`, { method: "POST" });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Could not release lead");
      toast.success("Lead released back to the pool.");
      await load();
    } catch (e: any) {
      toast.error(e?.message || "Could not release lead");
    } finally {
      setReleasing(null);
    }
  }

  function openLog(lead: Lead) {
    setLogTarget(lead);
    setLogOpen(true);
  }

  async function onLogged() {
    setLogOpen(false);
    setLogTarget(null);
    await load();
  }

  const q = query.trim().toLowerCase();
  const filterFn = (a: Lead) => {
    if (filter !== "all" && a.status !== filter) return false;
    if (!q) return true;
    return [a.customerName, a.city, a.service, a.customerMobileMasked]
      .filter(Boolean)
      .some((v) => String(v).toLowerCase().includes(q));
  };

  const filteredMine = useMemo(() => mine.filter(filterFn), [mine, filter, q]);
  const filteredAvailable = useMemo(() => {
    if (!q) return available;
    return available.filter((a) =>
      [a.customerName, a.city, a.service, a.customerMobileMasked]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [available, q]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Employee CRM
          </p>
          <h1 className="font-display text-2xl text-foreground sm:text-3xl">Dialer</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Claim leads from the universal pool, then log a call for each one.
          </p>
        </div>
      </div>

      {/* Sticky search */}
      <div className="sticky top-14 z-20 -mx-4 bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, city, service…"
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as "available" | "mine")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="available" className="gap-1.5">
            <Inbox className="size-4" />
            Available
            <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-[10px]">
              {available.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="mine" className="gap-1.5">
            <PhoneCall className="size-4" />
            My Claimed
            <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-[10px]">
              {mine.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Available tab */}
        <TabsContent value="available" className="mt-3">
          {loading && available.length === 0 ? (
            <SkeletonList />
          ) : filteredAvailable.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="No leads to claim"
              description={
                available.length === 0
                  ? "The universal pool is empty. New leads will appear here when admins upload call sheets."
                  : "No available leads match your search."
              }
            />
          ) : (
            <ul className="space-y-3">
              {filteredAvailable.map((a) => (
                <AvailableCard
                  key={a.id}
                  lead={a}
                  claiming={claiming === a.id}
                  onClaim={() => claim(a)}
                />
              ))}
            </ul>
          )}
        </TabsContent>

        {/* Mine tab */}
        <TabsContent value="mine" className="mt-3">
          {/* Filter chips */}
          <div className="mb-3 flex items-center gap-1.5 overflow-x-auto pb-1 scroll-thin">
            <ListFilter className="size-3.5 shrink-0 text-muted-foreground" />
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  filter === f.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:bg-muted"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading && mine.length === 0 ? (
            <SkeletonList />
          ) : filteredMine.length === 0 ? (
            <EmptyState
              icon={PhoneCall}
              title="No claimed leads"
              description={
                mine.length === 0
                  ? "Claim a lead from the Available tab to start calling."
                  : `No "${FILTERS.find((f) => f.value === filter)?.label}" leads. Try a different filter.`
              }
              action={
                mine.length === 0 ? (
                  <Button size="sm" variant="outline" onClick={() => setTab("available")}>
                    Browse pool
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setFilter("all")}>
                    Show all
                  </Button>
                )
              }
            />
          ) : (
            <ul className="space-y-3">
              {filteredMine.map((a) => (
                <ClaimedCard
                  key={a.id}
                  lead={a}
                  releasing={releasing === a.id}
                  onLog={() => openLog(a)}
                  onRelease={() => release(a)}
                />
              ))}
            </ul>
          )}
        </TabsContent>
      </Tabs>

      <FeedbackDialog
        open={logOpen}
        onOpenChange={(v) => {
          setLogOpen(v);
          if (!v) setLogTarget(null);
        }}
        lead={logTarget}
        onDone={onLogged}
      />
    </div>
  );
}

function AvailableCard({
  lead,
  claiming,
  onClaim,
}: {
  lead: Lead;
  claiming: boolean;
  onClaim: () => void;
}) {
  const pTone = priorityTone(lead.priority);
  return (
    <Card className="gap-3 py-4">
      <div className="px-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-display text-lg text-foreground">{lead.customerName}</h3>
              <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${pTone}`}>
                {priorityLabel(lead.priority)} priority
              </span>
              <span className="rounded-md border border-blue-200 bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-800">
                Available
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {[lead.city, lead.service].filter(Boolean).join(" · ") || "—"}
            </p>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <p className="font-medium text-foreground">{formatINR(lead.loanAmount)}</p>
            <p>{lead.employmentType || ""}</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-muted/40 p-2.5">
          <Lock className="size-4 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">Mobile (masked until claimed)</p>
            <p className="font-mono text-sm font-medium tracking-wide text-foreground">
              {lead.customerMobileMasked}
            </p>
          </div>
        </div>

        {lead.notes && (
          <div className="mt-3 rounded-md border border-dashed border-border bg-background px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Sheet notes
            </p>
            <p className="mt-0.5 text-sm text-foreground">{lead.notes}</p>
          </div>
        )}

        <div className="mt-3 flex items-center justify-end gap-2 border-t border-border pt-3">
          <span className="mr-auto text-[11px] text-muted-foreground">
            Added {relativeTime(lead.assignedAt)}
          </span>
          <Button
            size="sm"
            onClick={onClaim}
            disabled={claiming}
            className="bg-gradient-gold text-gold-foreground hover:opacity-90"
          >
            {claiming ? <Loader2 className="size-4 animate-spin" /> : <PhoneCall className="size-4" />}
            Claim & Call
          </Button>
        </div>
      </div>
    </Card>
  );
}

function ClaimedCard({
  lead,
  releasing,
  onLog,
  onRelease,
}: {
  lead: Lead;
  releasing: boolean;
  onLog: () => void;
  onRelease: () => void;
}) {
  const status = STATUS_META[lead.status] ?? STATUS_META.in_progress;
  const pTone = priorityTone(lead.priority);
  const last = lead.latestOutcome;
  const lastDisp =
    last && (last.disposition as Disposition)
      ? DISPOSITION_META[last.disposition as Disposition]
      : null;
  const lastOut =
    last && (last.outcome as Outcome) ? OUTCOME_META[last.outcome as Outcome] : null;

  return (
    <Card className="gap-3 py-4">
      <div className="px-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-display text-lg text-foreground">{lead.customerName}</h3>
              <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${pTone}`}>
                {priorityLabel(lead.priority)} priority
              </span>
              <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${status.tone}`}>
                {status.label}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {[lead.city, lead.service].filter(Boolean).join(" · ") || "—"}
            </p>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <p className="font-medium text-foreground">{formatINR(lead.loanAmount)}</p>
            <p>{lead.employmentType || ""}</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-muted/40 p-2.5">
          <PhoneCall className="size-4 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">Mobile (masked)</p>
            <p className="font-mono text-sm font-medium tracking-wide text-foreground">
              {lead.customerMobileMasked}
            </p>
          </div>
        </div>

        {lead.notes && (
          <div className="mt-3 rounded-md border border-dashed border-border bg-background px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Sheet notes
            </p>
            <p className="mt-0.5 text-sm text-foreground">{lead.notes}</p>
          </div>
        )}

        {last && (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="text-[10px] font-semibold uppercase tracking-wide">Last:</span>
            {lastOut && (
              <span className="rounded border border-border bg-muted px-1.5 py-0.5 font-medium text-foreground">
                {lastOut.label}
              </span>
            )}
            {lastDisp && (
              <span className={`rounded border px-1.5 py-0.5 font-medium ${lastDisp.tone}`}>
                {lastDisp.label}
              </span>
            )}
            {last.callDurationSec > 0 && (
              <span>· {formatDuration(last.callDurationSec)}</span>
            )}
            <span>· {relativeTime(last.createdAt)}</span>
            {last.callbackAt && (
              <span className="basis-full text-amber-800">
                Callback: {formatDateTime(last.callbackAt)}
              </span>
            )}
            {last.notes && (
              <span className="basis-full text-foreground/80">&ldquo;{last.notes}&rdquo;</span>
            )}
          </div>
        )}

        <div className="mt-3 flex items-center justify-end gap-2 border-t border-border pt-3">
          <span className="mr-auto text-[11px] text-muted-foreground">
            Claimed {lead.claimedAt ? relativeTime(lead.claimedAt) : "—"}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={onRelease}
            disabled={releasing}
            className="gap-1"
          >
            {releasing ? <Loader2 className="size-3.5 animate-spin" /> : <Hand className="size-3.5" />}
            Release
          </Button>
          <Button size="sm" onClick={onLog} className="gap-1">
            <PhoneOutgoing className="size-3.5" />
            Log Call
          </Button>
        </div>
      </div>
    </Card>
  );
}

function FeedbackDialog({
  open,
  onOpenChange,
  lead,
  onDone,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  lead: Lead | null;
  onDone: () => void;
}) {
  const [outcome, setOutcome] = useState<Outcome>("no_answer");
  const [disposition, setDisposition] = useState<Disposition>("not_connected");
  const [callDurationSec, setCallDurationSec] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [callbackAt, setCallbackAt] = useState<string>(defaultCallbackValue());
  const [convertedAmount, setConvertedAmount] = useState<string>("");
  const [saving, setSaving] = useState(false);

  // Reset form when a new lead is loaded.
  useEffect(() => {
    if (open && lead) {
      setOutcome("no_answer");
      setDisposition("not_connected");
      setCallDurationSec("");
      setNotes("");
      setCallbackAt(defaultCallbackValue());
      setConvertedAmount("");
    }
  }, [open, lead]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!lead) return;
    setSaving(true);
    try {
      const body: Record<string, unknown> = {
        assignmentId: lead.id,
        outcome,
        disposition,
      };
      if (callDurationSec.trim()) body.callDurationSec = parseInt(callDurationSec, 10) || 0;
      if (notes.trim()) body.notes = notes.trim();
      if ((disposition === "callback" || disposition === "reschedule") && callbackAt) {
        body.callbackAt = new Date(callbackAt).toISOString();
      }
      if (disposition === "converted" && convertedAmount.trim()) {
        body.convertedAmount = Number(convertedAmount);
      }
      const r = await fetch("/api/crm/outcomes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Failed to log call");
      toast.success("Feedback saved");
      onDone();
    } catch (e: any) {
      toast.error(e?.message || "Failed to log call");
    } finally {
      setSaving(false);
    }
  }

  if (!lead) return null;
  const status = STATUS_META[lead.status] ?? STATUS_META.in_progress;
  const showCallback = disposition === "callback" || disposition === "reschedule";
  const showConverted = disposition === "converted";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto scroll-thin sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Call Feedback — {lead.customerName}
          </DialogTitle>
          <DialogDescription>
            Record what happened on this call. Status will update automatically.
          </DialogDescription>
        </DialogHeader>

        {/* Quick customer context */}
        <div className="rounded-lg border border-border bg-muted/40 p-3 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-foreground">{lead.customerName}</span>
            <Badge variant="outline" className={`text-[10px] ${status.tone}`}>
              {status.label}
            </Badge>
            <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${priorityTone(lead.priority)}`}>
              {priorityLabel(lead.priority)} priority
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {[lead.city, lead.service, formatINR(lead.loanAmount)]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            <Lock className="inline size-3 align-text-bottom" /> {lead.customerMobileMasked}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {/* Call outcome */}
          <div className="space-y-1.5">
            <Label htmlFor="outcome">Call outcome</Label>
            <Select value={outcome} onValueChange={(v) => setOutcome(v as Outcome)}>
              <SelectTrigger id="outcome" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {OUTCOME_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                    {o.hint && (
                      <span className="ml-2 text-[11px] text-muted-foreground">— {o.hint}</span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Disposition radio cards */}
          <div className="space-y-1.5">
            <Label>Disposition</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {DISPOSITION_OPTIONS.map((d) => {
                const selected = disposition === d.value;
                return (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setDisposition(d.value)}
                    className={`flex flex-col items-start gap-1 rounded-lg border p-2.5 text-left transition-all ${
                      selected ? d.selectedTone : d.idleTone
                    }`}
                  >
                    <span className="text-base leading-none">{d.emoji}</span>
                    <span className="text-xs font-semibold leading-tight">{d.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-1.5">
            <Label htmlFor="duration">Call duration (seconds)</Label>
            <Input
              id="duration"
              type="number"
              min={0}
              max={3600}
              placeholder="0"
              value={callDurationSec}
              onChange={(e) => setCallDurationSec(e.target.value)}
            />
          </div>

          {/* Callback / Reschedule */}
          {showCallback && (
            <div className="space-y-1.5">
              <Label htmlFor="callback">
                {disposition === "callback" ? "Callback at" : "Reschedule for"}
              </Label>
              <Input
                id="callback"
                type="datetime-local"
                value={callbackAt}
                onChange={(e) => setCallbackAt(e.target.value)}
              />
              <p className="text-[11px] text-muted-foreground">
                Will be added to your follow-ups list.
              </p>
            </div>
          )}

          {/* Converted amount */}
          {showConverted && (
            <div className="space-y-1.5">
              <Label htmlFor="convertedAmount">Converted amount (₹)</Label>
              <Input
                id="convertedAmount"
                type="number"
                min={0}
                step={1000}
                placeholder="e.g. 1500000"
                value={convertedAmount}
                onChange={(e) => setConvertedAmount(e.target.value)}
              />
            </div>
          )}

          {/* Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Conversation summary, customer objections, next steps…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="gap-1.5">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />}
              {saving ? "Saving…" : "Save Feedback"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SkeletonList() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="gap-2 py-4">
          <div className="px-4">
            <div className="h-5 w-40 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-3 w-56 animate-pulse rounded bg-muted" />
          </div>
        </Card>
      ))}
    </div>
  );
}
