"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth/auth-context";
import { CrmShell, CrmPageSkeleton, EmptyState } from "@/components/crm/crm-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PhoneCall, PhoneOutgoing, CheckCircle2, CalendarClock, ArrowRight, Flame,
  Inbox, Layers, Loader2, MessageSquare, BarChart3, LayoutGrid, List, Target,
  Zap, Clock, TrendingUp,
} from "lucide-react";
import {
  formatINR, priorityLabel, priorityTone, STATUS_META, relativeTime,
  type AssignmentStatus, type Disposition, type Outcome,
  DISPOSITION_META, OUTCOME_META, leadScore, tierTone,
} from "@/components/crm/crm-shared";
import { PipelineKanban } from "@/components/crm/pipeline-kanban";
import { LeadDetailDrawer } from "@/components/crm/lead-detail-drawer";

type LatestOutcome = {
  outcome: string; disposition: string; notes: string | null;
  createdAt: string; callbackAt: string | null;
  convertedAmount: number | null; callDurationSec: number;
} | null;

type Lead = {
  id: string; customerName: string; customerMobileMasked: string;
  customerEmailMasked: string | null; city: string | null;
  service: string | null; loanAmount: number | null;
  employmentType: string | null; monthlyIncome: number | null;
  notes: string | null; priority: number; status: AssignmentStatus;
  assignedAt: string; claimedAt: string | null;
  latestOutcome?: LatestOutcome;
};

type Stats = {
  claimed: number; outcomes: number; inProgress: number;
  converted: number; followUps: number; available: number;
  connected: number; success: number; rejected: number;
  connectRate: number; successRate: number;
  todayCalls?: number; conversionRate?: number;
};

export function DashboardClient() {
  return (
    <CrmShell active="dashboard">
      <DashboardInner />
    </CrmShell>
  );
}

function DashboardInner() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [available, setAvailable] = useState<Lead[]>([]);
  const [mine, setMine] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<string | null>(null);
  const [view, setView] = useState<"board" | "list">("board");
  const [selectedLead, setSelectedLead] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [s, l] = await Promise.all([
        fetch("/api/crm/stats", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/crm/leads", { cache: "no-store" }).then((r) => r.json()),
      ]);
      setStats(s.stats ?? null);
      setAvailable(l.available ?? []);
      setMine(l.mine ?? []);
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function claim(id: string) {
    setClaiming(id);
    try {
      const r = await fetch(`/api/crm/leads/${id}/claim`, { method: "POST" });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Could not claim lead");
      toast.success("Lead claimed — open the dialer to start calling.");
      await load();
    } catch (e: any) {
      toast.error(e?.message || "Could not claim lead");
    } finally {
      setClaiming(null);
    }
  }

  if (loading && !stats) {
    return <CrmPageSkeleton />;
  }

  const greetingName = user?.displayName || (user?.email ? user.email.split("@")[0] : null);
  const poolPreview = [...available]
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
    .slice(0, 5);
  const minePreview = mine.slice(0, 5);

  // Today's Focus — smart insights
  const hotLeads = mine.filter((l) => {
    const s = leadScore({
      loanAmount: l.loanAmount,
      assignedAt: l.assignedAt,
      claimedAt: l.claimedAt,
      priority: l.priority,
      outcomesCount: l.latestOutcome ? 1 : 0,
      latestDisposition: l.latestOutcome?.disposition ?? null,
    });
    return s.tier === "hot";
  });
  const dueCallbacks = mine.filter((l) =>
    l.latestOutcome?.callbackAt &&
    new Date(l.latestOutcome.callbackAt).getTime() <= Date.now() + 24 * 3600 * 1000
  );
  const inProgressStale = mine.filter((l) => {
    if (l.status !== "in_progress") return false;
    if (!l.claimedAt) return false;
    const hrsSince = (Date.now() - new Date(l.claimedAt).getTime()) / 3600000;
    return hrsSince > 4;
  });

  return (
    <div className="space-y-6">
      {/* Greeting + view toggle */}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Employee CRM
          </p>
          <h1 className="font-display text-2xl text-foreground sm:text-3xl">
            Welcome{greetingName ? `, ${greetingName}` : ""}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Claim leads from the universal pool, then log every call.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-border bg-card p-0.5">
            <button
              onClick={() => setView("board")}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${view === "board" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted"}`}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Pipeline
            </button>
            <button
              onClick={() => setView("list")}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${view === "list" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted"}`}
            >
              <List className="h-3.5 w-3.5" /> List
            </button>
          </div>
          <Button asChild className="bg-gradient-gold text-gold-foreground hover:opacity-90">
            <Link href="/crm/calls">
              <PhoneOutgoing className="size-4" />
              Open dialer
            </Link>
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Available leads" value={stats?.available ?? 0} icon={Inbox} tone="bg-blue-50 text-blue-700 border-blue-100" sub="In universal pool" />
        <StatCard label="My claimed" value={stats?.claimed ?? 0} icon={Layers} tone="bg-amber-50 text-amber-700 border-amber-100" sub={`${stats?.inProgress ?? 0} in progress`} />
        <StatCard label="Calls made" value={stats?.outcomes ?? 0} icon={PhoneCall} tone="bg-secondary/15 text-secondary border-secondary/30" sub={`${stats?.connected ?? 0} connected`} />
        <StatCard label="Success rate" value={`${stats?.successRate ?? 0}%`} icon={CheckCircle2} tone="bg-emerald-50 text-emerald-700 border-emerald-100" sub={`${stats?.converted ?? 0} converted`} />
      </div>

      {/* Today's Focus — smart insights */}
      {(hotLeads.length > 0 || dueCallbacks.length > 0 || inProgressStale.length > 0) && (
        <Card className="border-gold/30 bg-gradient-to-br from-gold/5 to-transparent">
          <div className="flex items-center gap-2 px-5 pt-4">
            <Zap className="h-5 w-5 text-gold" />
            <h2 className="font-display text-base font-semibold text-foreground">Today&apos;s focus</h2>
            <span className="ml-auto text-[11px] text-muted-foreground">Smart prioritization</span>
          </div>
          <div className="grid gap-2 px-4 pb-4 pt-3 sm:grid-cols-3">
            {hotLeads.length > 0 && (
              <FocusTile
                icon={Flame}
                tone="bg-rose-50 text-rose-700 border-rose-200"
                count={hotLeads.length}
                label="Hot leads"
                hint={hotLeads[0]?.customerName ?? "—"}
                onClick={() => setSelectedLead(hotLeads[0]?.id ?? null)}
              />
            )}
            {dueCallbacks.length > 0 && (
              <FocusTile
                icon={PhoneCall}
                tone="bg-amber-50 text-amber-700 border-amber-200"
                count={dueCallbacks.length}
                label="Due callbacks"
                hint={dueCallbacks[0]?.latestOutcome?.callbackAt ? relativeTime(dueCallbacks[0].latestOutcome.callbackAt) : "—"}
                onClick={() => setSelectedLead(dueCallbacks[0]?.id ?? null)}
              />
            )}
            {inProgressStale.length > 0 && (
              <FocusTile
                icon={Clock}
                tone="bg-orange-50 text-orange-700 border-orange-200"
                count={inProgressStale.length}
                label="Stale in-progress"
                hint="Open & log a call"
                onClick={() => setSelectedLead(inProgressStale[0]?.id ?? null)}
              />
            )}
          </div>
        </Card>
      )}

      {/* View: Pipeline kanban OR list */}
      {view === "board" ? (
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2 px-5 pt-4">
            <div>
              <h2 className="font-display text-lg text-foreground">Pipeline</h2>
              <p className="text-xs text-muted-foreground">Drag leads between stages · click a card for detail</p>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
              <LayoutGrid className="h-3.5 w-3.5" /> Kanban view
            </span>
          </div>
          <div className="p-3">
            <PipelineKanban onUpdated={load} />
          </div>
        </Card>
      ) : (
        <>
          {/* Universal Lead Pool preview */}
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-2 px-6 pt-2">
              <div>
                <h2 className="font-display text-lg text-foreground">Universal Lead Pool</h2>
                <p className="text-xs text-muted-foreground">
                  Top 5 unclaimed leads — claim one to start calling.
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/crm/calls">View all <ArrowRight className="size-4" /></Link>
              </Button>
            </div>
            <div className="px-4 pb-4 pt-3">
              {loading && available.length === 0 ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-lg" />)}
                </div>
              ) : poolPreview.length === 0 ? (
                <EmptyState icon={Inbox} title="Pool is empty" description="When admins upload new call sheets, fresh leads will appear here ready to claim." />
              ) : (
                <ul className="space-y-2">
                  {poolPreview.map((a) => <PoolRow key={a.id} lead={a} claiming={claiming === a.id} onClaim={() => claim(a.id)} onClick={() => setSelectedLead(a.id)} />)}
                </ul>
              )}
            </div>
          </Card>

          {/* My Active Leads preview */}
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-2 px-6 pt-2">
              <div>
                <h2 className="font-display text-lg text-foreground">My active leads</h2>
                <p className="text-xs text-muted-foreground">Your claimed leads — log a call to move them forward.</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/crm/calls">Open dialer <ArrowRight className="size-4" /></Link>
              </Button>
            </div>
            <div className="px-4 pb-4 pt-3">
              {loading && mine.length === 0 ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-lg" />)}
                </div>
              ) : minePreview.length === 0 ? (
                <EmptyState icon={Layers} title="No claimed leads yet" description="Claim a lead from the universal pool above — it will show up here." action={<Button asChild size="sm" variant="outline"><Link href="/crm/calls">Browse pool</Link></Button>} />
              ) : (
                <ul className="space-y-2">
                  {minePreview.map((a) => <MineRow key={a.id} lead={a} onClick={() => setSelectedLead(a.id)} />)}
                </ul>
              )}
            </div>
          </Card>
        </>
      )}

      <LeadDetailDrawer leadId={selectedLead} onClose={() => setSelectedLead(null)} onUpdated={load} />
    </div>
  );
}

function PoolRow({ lead, claiming, onClaim, onClick }: { lead: Lead; claiming: boolean; onClaim: () => void; onClick: () => void; }) {
  const pTone = priorityTone(lead.priority);
  const score = leadScore({
    loanAmount: lead.loanAmount,
    assignedAt: lead.assignedAt,
    claimedAt: lead.claimedAt,
    priority: lead.priority,
    outcomesCount: lead.latestOutcome ? 1 : 0,
    latestDisposition: lead.latestOutcome?.disposition ?? null,
  });
  const tier = tierTone(score.tier);
  return (
    <li className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-background px-4 py-3">
      <button onClick={onClick} className="grid size-10 shrink-0 place-items-center rounded-full bg-muted text-foreground hover:bg-muted/70">
        <Flame className={`size-5 ${(lead.priority ?? 0) >= 2 ? "text-rose-600" : "text-amber-500"}`} />
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={onClick} className="truncate font-medium text-foreground hover:text-primary">
            {lead.customerName}
          </button>
          <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${pTone}`}>{priorityLabel(lead.priority)}</span>
          <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-bold ${tier.bg} ${tier.text}`}>{tier.emoji} {score.score}</span>
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {[lead.city, lead.service, formatINR(lead.loanAmount)].filter(Boolean).join(" · ")}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">{lead.customerMobileMasked}</p>
      </div>
      <Button size="sm" onClick={onClaim} disabled={claiming} className="bg-gradient-gold text-gold-foreground hover:opacity-90">
        {claiming ? <Loader2 className="size-4 animate-spin" /> : <PhoneCall className="size-4" />}
        Claim &amp; Call
      </Button>
    </li>
  );
}

function MineRow({ lead, onClick }: { lead: Lead; onClick: () => void; }) {
  const status = STATUS_META[lead.status] ?? STATUS_META.in_progress;
  const last = lead.latestOutcome;
  const lastDisp = last && (last.disposition as Disposition) ? DISPOSITION_META[last.disposition as Disposition] : null;
  const lastOut = last && (last.outcome as Outcome) ? OUTCOME_META[last.outcome as Outcome] : null;
  const score = leadScore({
    loanAmount: lead.loanAmount,
    assignedAt: lead.assignedAt,
    claimedAt: lead.claimedAt,
    priority: lead.priority,
    outcomesCount: lead.latestOutcome ? 1 : 0,
    latestDisposition: lead.latestOutcome?.disposition ?? null,
  });
  const tier = tierTone(score.tier);
  return (
    <li className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-background px-4 py-3">
      <button onClick={onClick} className="grid size-10 shrink-0 place-items-center rounded-full bg-muted text-foreground hover:bg-muted/70">
        <PhoneCall className="size-5 text-gold" />
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={onClick} className="truncate font-medium text-foreground hover:text-primary">
            {lead.customerName}
          </button>
          <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${status.tone}`}>{status.label}</span>
          <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-bold ${tier.bg} ${tier.text}`}>{tier.emoji} {score.score}</span>
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {[lead.city, lead.service, formatINR(lead.loanAmount)].filter(Boolean).join(" · ")}
        </p>
        {last && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            Last: {lastOut?.label ?? "—"} · {lastDisp?.label ?? "—"} · {relativeTime(last.createdAt)}
          </p>
        )}
      </div>
      <Button asChild size="sm" variant="outline">
        <Link href="/crm/calls"><PhoneOutgoing className="size-4" /> Resume</Link>
      </Button>
    </li>
  );
}

function StatCard({ label, value, icon: Icon, tone, sub }: {
  label: string; value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  tone: string; sub?: string;
}) {
  return (
    <Card className="gap-0 py-4">
      <div className="px-5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <span className={`grid size-7 place-items-center rounded-md border ${tone}`}><Icon className="size-4" /></span>
        </div>
        <p className="mt-2 font-display text-2xl text-foreground">{value}</p>
        {sub && <p className="mt-0.5 text-[11px] text-muted-foreground">{sub}</p>}
      </div>
    </Card>
  );
}

function FocusTile({ icon: Icon, tone, count, label, hint, onClick }: {
  icon: React.ComponentType<{ className?: string }>;
  tone: string; count: number; label: string; hint: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg border ${tone} p-3 text-left transition hover:shadow-md`}
    >
      <span className={`grid size-9 shrink-0 place-items-center rounded-md ${tone}`}>
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-lg leading-none">{count}</p>
        <p className="text-[11px] font-medium uppercase tracking-wide opacity-80">{label}</p>
        <p className="truncate text-[10px] opacity-70">{hint}</p>
      </div>
    </button>
  );
}
