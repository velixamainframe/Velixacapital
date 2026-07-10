"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { CrmShell, CrmPageSkeleton, EmptyState } from "@/components/crm/crm-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarClock,
  PhoneCall,
  Check,
  Loader2,
  CalendarCheck,
  Clock,
  MapPin,
} from "lucide-react";
import {
  formatDateTime,
  formatINR,
  priorityLabel,
  priorityTone,
  STATUS_META,
  type AssignmentStatus,
} from "@/components/crm/crm-shared";

type FollowUp = {
  id: string;
  scheduledAt: string;
  note: string | null;
  completed: boolean;
  assignment: {
    id: string;
    customerName: string;
    customerMobileMasked: string;
    city: string | null;
    service: string | null;
    loanAmount: number | null;
    status: AssignmentStatus;
    priority: number;
  } | null;
};

export function FollowUpsClient() {
  return (
    <CrmShell active="follow-ups">
      <FollowUpsInner />
    </CrmShell>
  );
}

function FollowUpsInner() {
  const [rows, setRows] = useState<FollowUp[]>([]);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/crm/follow-ups", { cache: "no-store" });
      const data = await r.json();
      setRows(data.followUps ?? []);
    } catch {
      toast.error("Failed to load follow-ups");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function markDone(id: string) {
    setCompleting(id);
    try {
      const r = await fetch(`/api/crm/follow-ups/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Failed");
      toast.success("Follow-up marked done");
      setRows((prev) => prev.filter((f) => f.id !== id));
    } catch (e: any) {
      toast.error(e?.message || "Failed to mark done");
    } finally {
      setCompleting(null);
    }
  }

  if (loading) {
    return (
      <CrmShell active="follow-ups">
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </CrmShell>
    );
  }

  const now = Date.now();
  const upcoming = rows.filter((r) => new Date(r.scheduledAt).getTime() >= now - 3600 * 1000);
  const overdue = rows.filter((r) => new Date(r.scheduledAt).getTime() < now - 3600 * 1000);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Employee CRM
          </p>
          <h1 className="font-display text-2xl text-foreground sm:text-3xl">Follow-ups</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Callbacks and reschedules from your call feedback. Be punctual — punctuality converts.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/crm/calls">
            <PhoneCall className="size-4" />
            Open dialer
          </Link>
        </Button>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          icon={CalendarCheck}
          title="No scheduled callbacks"
          description="When you log a call with disposition = Callback or Reschedule, the customer will appear here automatically at the scheduled time."
          action={
            <Button asChild size="sm" variant="outline">
              <Link href="/crm/calls">Open dialer</Link>
            </Button>
          }
        />
      ) : (
        <div className="space-y-5">
          {overdue.length > 0 && (
            <section>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-rose-700">
                <Clock className="size-4" />
                Overdue ({overdue.length})
              </div>
              <ul className="space-y-3">
                {overdue.map((f) => (
                  <FollowUpCard
                    key={f.id}
                    f={f}
                    overdue
                    completing={completing === f.id}
                    onDone={() => markDone(f.id)}
                  />
                ))}
              </ul>
            </section>
          )}

          {upcoming.length > 0 && (
            <section>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <CalendarClock className="size-4 text-gold" />
                Upcoming ({upcoming.length})
              </div>
              <ul className="space-y-3">
                {upcoming.map((f) => (
                  <FollowUpCard
                    key={f.id}
                    f={f}
                    completing={completing === f.id}
                    onDone={() => markDone(f.id)}
                  />
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function FollowUpCard({
  f,
  overdue,
  completing,
  onDone,
}: {
  f: FollowUp;
  overdue?: boolean;
  completing: boolean;
  onDone: () => void;
}) {
  const a = f.assignment;
  const status = a ? STATUS_META[a.status] ?? STATUS_META.callback : STATUS_META.callback;
  return (
    <Card className={`gap-2 py-4 ${overdue ? "border-rose-200 bg-rose-50/40" : ""}`}>
      <div className="px-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-display text-lg text-foreground">
                {a?.customerName ?? "Unknown customer"}
              </h3>
              {a && (
                <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${priorityTone(a.priority)}`}>
                  {priorityLabel(a.priority)}
                </span>
              )}
              <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${status.tone}`}>
                {status.label}
              </span>
            </div>
            {a && (
              <p className="mt-1 text-xs text-muted-foreground">
                {a.customerMobileMasked}
                {a.city && (
                  <>
                    <span className="mx-1.5">·</span>
                    <MapPin className="inline size-3 align-text-bottom" />
                    {a.city}
                  </>
                )}
                {a.service && (
                  <>
                    <span className="mx-1.5">·</span>
                    {a.service}
                  </>
                )}
                {a.loanAmount != null && (
                  <>
                    <span className="mx-1.5">·</span>
                    {formatINR(a.loanAmount)}
                  </>
                )}
              </p>
            )}
          </div>
          <div className="shrink-0 text-right">
            <p className={`text-xs font-semibold ${overdue ? "text-rose-700" : "text-gold"}`}>
              {formatDateTime(f.scheduledAt)}
            </p>
          </div>
        </div>

        {f.note && (
          <p className="mt-2 rounded-md border border-dashed border-border bg-background px-3 py-1.5 text-sm text-foreground/90">
            &ldquo;{f.note}&rdquo;
          </p>
        )}

        <div className="mt-3 flex items-center justify-end gap-2 border-t border-border pt-3">
          <Button asChild size="sm" variant="outline">
            <Link href="/crm/calls">
              <PhoneCall className="size-3.5" />
              Open call
            </Link>
          </Button>
          <Button size="sm" onClick={onDone} disabled={completing} className="gap-1.5">
            {completing ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Check className="size-3.5" />
            )}
            Mark done
          </Button>
        </div>
      </div>
    </Card>
  );
}
