"use client";

import { useCallback, useEffect, useState } from "react";
import { CrmShell, CrmPageSkeleton, EmptyState } from "@/components/crm/crm-shell";
import { Card } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  PhoneCall,
  CheckCircle2,
  TrendingUp,
  Target,
  Inbox,
  Filter,
  BarChart3,
  Layers,
} from "lucide-react";
import {
  DISPOSITION_COLORS,
  DISPOSITION_LABELS,
  type Disposition,
} from "@/components/crm/crm-shared";

type Stats = {
  claimed: number;
  outcomes: number;
  inProgress: number;
  converted: number;
  followUps: number;
  available: number;
  connected: number;
  success: number;
  rejected: number;
  connectRate: number;
  successRate: number;
  todayCalls?: number;
  conversionRate?: number;
};

type SeriesPoint = { date: string; label: string; calls: number; connected: number };
type DispPoint = { disposition: string; count: number };

const ALL_DISPOSITIONS: Disposition[] = [
  "success",
  "reschedule",
  "callback",
  "rejected",
  "not_connected",
  "converted",
  "dnd",
];

export function StatsClient() {
  return (
    <CrmShell active="stats">
      <StatsInner />
    </CrmShell>
  );
}

function StatsInner() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [series, setSeries] = useState<SeriesPoint[]>([]);
  const [dispRaw, setDispRaw] = useState<DispPoint[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/crm/stats", { cache: "no-store" });
      const data = await r.json();
      setStats(data.stats ?? null);
      setSeries(data.series7d ?? []);
      setDispRaw(data.dispositionBreakdown ?? []);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading && !stats) {
    return <CrmPageSkeleton />;
  }

  const s = stats ?? ({} as Stats);

  // Normalize disposition breakdown — ensure all 7 keys present (defensive
  // against older backend maps that only emitted legacy keys).
  const dispMap = new Map<string, number>();
  for (const d of dispRaw) {
    if (ALL_DISPOSITIONS.includes(d.disposition as Disposition)) {
      dispMap.set(d.disposition, d.count);
    }
  }
  const disp: DispPoint[] = ALL_DISPOSITIONS.map((k) => ({
    disposition: k,
    count: dispMap.get(k) ?? 0,
  }));
  const totalDisp = disp.reduce((acc, d) => acc + d.count, 0);

  // Mock calls/day from outcomes count if the API returned no time series.
  const seriesData: SeriesPoint[] =
    series.length > 0
      ? series
      : s.outcomes
        ? [{ date: "today", label: "Today", calls: s.outcomes, connected: s.connected ?? 0 }]
        : [];

  // Conversion funnel — claimed → called → connected → success → converted
  const funnel = [
    { stage: "Claimed", value: s.claimed ?? 0, color: "oklch(0.55 0.04 265)" },
    { stage: "Called", value: s.outcomes ?? 0, color: "oklch(0.26 0.09 255)" },
    { stage: "Connected", value: s.connected ?? 0, color: "oklch(0.78 0.13 75)" },
    {
      stage: "Success",
      value: dispMap.get("success") ?? s.success ?? 0,
      color: "oklch(0.72 0.15 145)",
    },
    {
      stage: "Converted",
      value: dispMap.get("converted") ?? s.converted ?? 0,
      color: "oklch(0.65 0.18 150)",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Employee CRM
        </p>
        <h1 className="font-display text-2xl text-foreground sm:text-3xl">Performance</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your call activity, dispositions and conversion funnel.
        </p>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <StatTile label="Available" value={s.available ?? 0} icon={Inbox} tone="text-blue-700" />
        <StatTile
          label="Claimed"
          value={s.claimed ?? 0}
          icon={Layers}
          tone="text-amber-700"
          sub={`${s.inProgress ?? 0} in progress`}
        />
        <StatTile
          label="Calls made"
          value={s.outcomes ?? 0}
          icon={PhoneCall}
          tone="text-secondary"
          sub={`Today: ${s.todayCalls ?? 0}`}
        />
        <StatTile label="Connected" value={s.connected ?? 0} icon={Filter} tone="text-gold" />
        <StatTile
          label="Converted"
          value={s.converted ?? 0}
          icon={CheckCircle2}
          tone="text-emerald-700"
        />
        <StatTile
          label="Success rate"
          value={`${s.successRate ?? 0}%`}
          icon={TrendingUp}
          tone="text-foreground"
          sub={`Conv: ${s.conversionRate ?? 0}%`}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calls per day — bar chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between px-6 pt-2">
            <div>
              <h2 className="font-display text-lg text-foreground">Calls per day — last 7 days</h2>
              <p className="text-xs text-muted-foreground">Daily totals vs connected</p>
            </div>
            <BarChart3 className="size-5 text-muted-foreground" />
          </div>
          <div className="h-72 px-2 pb-4">
            {seriesData.length === 0 ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={seriesData} margin={{ top: 16, right: 16, bottom: 0, left: -8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.02 255)" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="oklch(0.42 0.04 255)" />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="oklch(0.42 0.04 255)" />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="calls" name="Calls" radius={[4, 4, 0, 0]} fill="oklch(0.26 0.09 255)" />
                  <Bar
                    dataKey="connected"
                    name="Connected"
                    radius={[4, 4, 0, 0]}
                    fill="oklch(0.72 0.13 65)"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        {/* Disposition pie — 7 dispositions */}
        <Card>
          <div className="px-6 pt-2">
            <h2 className="font-display text-lg text-foreground">Dispositions</h2>
            <p className="text-xs text-muted-foreground">Breakdown of all call outcomes</p>
          </div>
          <div className="h-72 px-2 pb-4">
            {totalDisp === 0 ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={disp}
                    dataKey="count"
                    nameKey="disposition"
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={88}
                    paddingAngle={2}
                  >
                    {disp.map((d) => (
                      <Cell
                        key={d.disposition}
                        fill={DISPOSITION_COLORS[d.disposition as Disposition] ?? "oklch(0.7 0 0)"}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(value: any, name: any) => {
                      const label = DISPOSITION_LABELS[name as Disposition] ?? name;
                      return [`${value} call${value === 1 ? "" : "s"}`, label];
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 11 }}
                    formatter={(value) => DISPOSITION_LABELS[value as Disposition] ?? value}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>

      {/* Funnel */}
      <Card>
        <div className="flex items-center justify-between px-6 pt-2">
          <div>
            <h2 className="font-display text-lg text-foreground">Conversion funnel</h2>
            <p className="text-xs text-muted-foreground">From claim through to conversion</p>
          </div>
          <Target className="size-5 text-gold" />
        </div>
        <div className="space-y-2 px-6 pb-4 pt-4">
          {funnel.map((stage, idx) => {
            const max = funnel[0].value || 1;
            const width = Math.max(4, Math.round((stage.value / max) * 100));
            const prev = idx > 0 ? funnel[idx - 1].value || 0 : stage.value;
            const rate = prev > 0 ? Math.round((stage.value / prev) * 100) : 100;
            return (
              <div key={stage.stage}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{stage.stage}</span>
                  <span className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{stage.value}</span>
                    {idx > 0 && <span className="ml-2">({rate}%)</span>}
                  </span>
                </div>
                <div className="mt-1 h-7 w-full overflow-hidden rounded-md bg-muted">
                  <div
                    className="flex h-full items-center justify-end rounded-md px-2 text-[10px] font-semibold text-white"
                    style={{ width: `${width}%`, background: stage.color }}
                  >
                    {stage.value > 0 ? stage.value : ""}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {totalDisp === 0 && (s.outcomes ?? 0) === 0 && (
          <div className="px-6 pb-4">
            <EmptyState
              icon={TrendingUp}
              title="No performance data yet"
              description="Once you start logging calls, your daily volumes, dispositions and conversion funnel will populate here."
            />
          </div>
        )}
      </Card>

      {/* Trend line */}
      <Card>
        <div className="flex items-center justify-between px-6 pt-2">
          <div>
            <h2 className="font-display text-lg text-foreground">7-day call trend</h2>
            <p className="text-xs text-muted-foreground">Daily calls (line) and connected (line)</p>
          </div>
          <TrendingUp className="size-5 text-muted-foreground" />
        </div>
        <div className="h-64 px-2 pb-4">
          {seriesData.length === 0 ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={seriesData} margin={{ top: 16, right: 16, bottom: 0, left: -8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.02 255)" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="oklch(0.42 0.04 255)" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="oklch(0.42 0.04 255)" />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="calls"
                  name="Calls"
                  stroke="oklch(0.26 0.09 255)"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "oklch(0.26 0.09 255)" }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="connected"
                  name="Connected"
                  stroke="oklch(0.72 0.13 65)"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "oklch(0.72 0.13 65)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </div>
  );
}

function StatTile({
  label,
  value,
  icon: Icon,
  tone,
  sub,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
  sub?: string;
}) {
  return (
    <Card className="gap-0 py-3">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <Icon className={`size-4 ${tone}`} />
        </div>
        <p className="mt-1 font-display text-xl text-foreground">{value}</p>
        {sub && <p className="mt-0.5 text-[10px] text-muted-foreground">{sub}</p>}
      </div>
    </Card>
  );
}

function EmptyChart() {
  return (
    <div className="grid h-full place-items-center text-sm text-muted-foreground">
      No data to chart yet.
    </div>
  );
}
