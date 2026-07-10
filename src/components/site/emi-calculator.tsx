"use client";

import { useMemo, useState } from "react";
import { LOANS } from "@/lib/site-data";
import { LeadForm } from "./lead-form";
import {
  ArrowRight, Calculator, TrendingDown, Wallet, CalendarClock, ChartPie,
  Table2, Sparkles, RotateCcw, Info, ChevronDown, ChevronUp,
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";

type Props = {
  defaultPrincipal?: number;
  defaultRate?: number;
  defaultYears?: number;
  maxRate?: number;
  loanName?: string;
  fixedSlug?: string;
};

const LOAN_RANGES: Record<string, { min: number; max: number; step: number; default: number; minYears: number; maxYears: number; defaultYears: number }> = {
  "personal-loan": { min: 50000, max: 5000000, step: 50000, default: 500000, minYears: 1, maxYears: 5, defaultYears: 3 },
  "business-loan": { min: 100000, max: 10000000, step: 100000, default: 1500000, minYears: 1, maxYears: 5, defaultYears: 3 },
  "home-loan": { min: 500000, max: 50000000, step: 100000, default: 5000000, minYears: 5, maxYears: 30, defaultYears: 20 },
  "loan-against-property": { min: 500000, max: 100000000, step: 500000, default: 10000000, minYears: 3, maxYears: 15, defaultYears: 10 },
  "overdraft-facility": { min: 100000, max: 20000000, step: 100000, default: 1000000, minYears: 1, maxYears: 3, defaultYears: 1 },
  "salary-overdraft": { min: 25000, max: 1000000, step: 25000, default: 200000, minYears: 1, maxYears: 3, defaultYears: 1 },
  "business-overdraft": { min: 200000, max: 20000000, step: 100000, default: 2000000, minYears: 1, maxYears: 3, defaultYears: 1 },
  "term-loan": { min: 500000, max: 50000000, step: 500000, default: 5000000, minYears: 3, maxYears: 10, defaultYears: 5 },
  "commercial-equipment-loan": { min: 500000, max: 50000000, step: 500000, default: 5000000, minYears: 3, maxYears: 7, defaultYears: 5 },
  "commercial-vehicle-loan": { min: 300000, max: 20000000, step: 100000, default: 2000000, minYears: 2, maxYears: 7, defaultYears: 4 },
  "equipment-machinery-loan": { min: 500000, max: 50000000, step: 500000, default: 5000000, minYears: 3, maxYears: 7, defaultYears: 5 },
  "used-auto-loan": { min: 100000, max: 10000000, step: 50000, default: 800000, minYears: 1, maxYears: 7, defaultYears: 4 },
  "balance-transfer": { min: 500000, max: 50000000, step: 100000, default: 5000000, minYears: 1, maxYears: 25, defaultYears: 15 },
  "refinance": { min: 500000, max: 50000000, step: 100000, default: 5000000, minYears: 1, maxYears: 20, defaultYears: 10 },
};

function formatINR(n: number): string {
  if (n >= 10000000) return `₹ ${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹ ${(n / 100000).toFixed(2)} L`;
  return `₹ ${Math.round(n).toLocaleString("en-IN")}`;
}

function compactINR(n: number): string {
  if (n >= 10000000) return `${(n / 10000000).toFixed(n % 10000000 === 0 ? 0 : 2)} Cr`;
  if (n >= 100000) return `${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 2)} L`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return `${n}`;
}

const QUICK_PRESETS: { label: string; principal: number; years: number; slug: string; rate: number }[] = [
  { label: "Home Loan · ₹50L · 20yr", principal: 5000000, years: 20, slug: "home-loan", rate: 8.5 },
  { label: "Business Loan · ₹15L · 3yr", principal: 1500000, years: 3, slug: "business-loan", rate: 11 },
  { label: "Personal Loan · ₹5L · 3yr", principal: 500000, years: 3, slug: "personal-loan", rate: 12 },
  { label: "LAP · ₹1Cr · 10yr", principal: 10000000, years: 10, slug: "loan-against-property", rate: 9.5 },
];

export function EMICalculator({ defaultPrincipal, defaultRate, defaultYears, loanName, fixedSlug }: Props) {
  const initialSlug = fixedSlug || "personal-loan";
  const initialLoan = LOANS.find((l) => l.slug === initialSlug) || LOANS[0];
  const initialRange = LOAN_RANGES[initialSlug] || LOAN_RANGES["personal-loan"];

  const [selectedSlug, setSelectedSlug] = useState(initialSlug);
  const loan = LOANS.find((l) => l.slug === selectedSlug) || initialLoan;
  const range = LOAN_RANGES[selectedSlug] || initialRange;

  const [principal, setPrincipal] = useState(
    defaultPrincipal ? Math.min(Math.max(defaultPrincipal, range.min), range.max) : range.default
  );
  const [rate, setRate] = useState(defaultRate ?? loan.defaultRate ?? 11);
  const [years, setYears] = useState(defaultYears ? Math.min(Math.max(defaultYears, range.minYears), range.maxYears) : range.defaultYears);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"summary" | "schedule" | "compare">("summary");
  // Prepayment scenario
  const [prepayPct, setPrepayPct] = useState(0); // % of principal prepaid annually
  const [showAllYears, setShowAllYears] = useState(false);

  function changeLoan(slug: string) {
    const newLoan = LOANS.find((l) => l.slug === slug);
    const newRange = LOAN_RANGES[slug] || initialRange;
    setSelectedSlug(slug);
    setPrincipal(newRange.default);
    setRate(newLoan?.defaultRate ?? 11);
    setYears(newRange.defaultYears);
    setShowForm(false);
  }

  function applyPreset(p: typeof QUICK_PRESETS[number]) {
    setSelectedSlug(p.slug);
    setPrincipal(p.principal);
    setRate(p.rate);
    setYears(p.years);
    setShowForm(false);
  }

  function resetToDefaults() {
    setPrincipal(range.default);
    setRate(loan.defaultRate ?? 11);
    setYears(range.defaultYears);
    setPrepayPct(0);
  }

  const months = years * 12;
  const { emi, totalInterest, totalPayment, principalPct, interestPct, schedule } = useMemo(() => {
    const P = principal;
    const n = months;
    const r = rate / 12 / 100;
    if (P <= 0 || n <= 0 || r <= 0) return { emi: 0, totalInterest: 0, totalPayment: 0, principalPct: 0, interestPct: 0, schedule: [] as YearRow[] };
    const e = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const tp = e * n;
    const ti = tp - P;

    // Build monthly amortization, then roll up to yearly rows
    let bal = P;
    const yearlyMap = new Map<number, { principal: number; interest: number; balance: number }>();
    for (let m = 1; m <= n; m++) {
      const interestM = bal * r;
      const principalM = e - interestM;
      bal -= principalM;
      const yr = Math.ceil(m / 12);
      const cur = yearlyMap.get(yr) || { principal: 0, interest: 0, balance: 0 };
      cur.principal += principalM;
      cur.interest += interestM;
      cur.balance = Math.max(0, bal);
      yearlyMap.set(yr, cur);
    }
    const sched: YearRow[] = Array.from(yearlyMap.entries()).map(([yr, v]) => ({
      year: yr,
      principalPaid: v.principal,
      interestPaid: v.interest,
      totalPaid: v.principal + v.interest,
      balance: v.balance,
    }));

    return { emi: e, totalInterest: ti, totalPayment: tp, principalPct: Math.round((P / tp) * 100), interestPct: Math.round((ti / tp) * 100), schedule: sched };
  }, [principal, months, rate]);

  // Prepayment scenario: simulate prepaying `prepayPct`% of original principal once per year
  const prepayScenario = useMemo(() => {
    if (prepayPct <= 0 || emi <= 0) return null;
    const P = principal;
    const n = months;
    const r = rate / 12 / 100;
    const annualPrepay = (prepayPct / 100) * P;
    let bal = P;
    let monthsElapsed = 0;
    let totalInterestSaved = 0;
    const originalInterest = emi * n - P;
    let month = 0;
    while (bal > 0.01 && month < n + 12) {
      month++;
      const interestM = bal * r;
      const principalM = emi - interestM;
      bal -= principalM;
      // Apply annual prepayment at end of each year
      if (month % 12 === 0 && bal > 0) {
        const prepay = Math.min(annualPrepay, bal);
        bal -= prepay;
      }
      monthsElapsed = month;
    }
    const newTotalPayment = emi * monthsElapsed;
    const newTotalInterest = newTotalPayment - P;
    totalInterestSaved = originalInterest - newTotalInterest;
    return {
      monthsSaved: n - monthsElapsed,
      yearsSaved: (n - monthsElapsed) / 12,
      interestSaved: totalInterestSaved,
      newTotalInterest,
      newTotalPayment,
      monthsElapsed,
    };
  }, [prepayPct, principal, months, rate, emi]);

  // Tenure comparison data
  const comparisonData = useMemo(() => {
    if (emi <= 0) return [];
    const P = principal;
    const r = rate / 12 / 100;
    const tenures = [range.minYears, Math.ceil((range.minYears + range.maxYears) / 2), range.maxYears].filter((v, i, a) => a.indexOf(v) === i);
    return tenures.map((y) => {
      const n = y * 12;
      if (r <= 0 || n <= 0) return { tenure: `${y}y`, years: y, emi: 0, total: 0, interest: 0 };
      const e = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const tp = e * n;
      return { tenure: `${y}y`, years: y, emi: Math.round(e), total: Math.round(tp), interest: Math.round(tp - P) };
    });
  }, [principal, rate, range.minYears, range.maxYears, emi]);

  const pieData = [
    { name: "Principal", value: principal, color: "oklch(0.72 0.13 65)" },
    { name: "Interest", value: totalInterest, color: "oklch(0.38 0.10 255)" },
  ];

  const visibleSchedule = showAllYears ? schedule : schedule.slice(0, 5);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-4 py-3 sm:px-5">
        <Calculator className="h-4 w-4 text-gold" />
        <h3 className="font-display text-base font-semibold sm:text-lg">EMI Calculator</h3>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live calculation
        </span>
      </div>

      {/* Quick presets */}
      {!fixedSlug && (
        <div className="border-b border-border bg-muted/20 px-4 py-2.5 sm:px-5">
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Quick presets</p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => applyPreset(p)}
                className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-foreground/80 transition hover:border-gold/40 hover:bg-gold/5 hover:text-primary"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
        {/* Inputs */}
        <div className="space-y-5 p-4 sm:p-5 md:p-6">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Loan type</label>
            <select value={selectedSlug} onChange={(e) => changeLoan(e.target.value)} disabled={Boolean(fixedSlug)}
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-medium outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:opacity-60">
              {LOANS.map((l) => (<option key={l.slug} value={l.slug}>{l.name} — from {l.defaultRate}%* p.a.</option>))}
            </select>
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium">
              <span className="flex items-center gap-1.5"><Wallet className="h-3.5 w-3.5 text-muted-foreground" /> Loan amount</span>
              <span className="font-display text-base text-gold">{formatINR(principal)}</span>
            </label>
            <input type="range" min={range.min} max={range.max} step={range.step} value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="mt-3 w-full accent-[oklch(0.72_0.13_65)]" />
            <div className="mt-1 flex justify-between text-[11px] text-muted-foreground"><span>{compactINR(range.min)}</span><span>{compactINR(range.max)}</span></div>
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium">
              <span className="flex items-center gap-1.5"><TrendingDown className="h-3.5 w-3.5 text-muted-foreground" /> Interest rate (% p.a.)</span>
              <span className="font-display text-base text-gold">{rate.toFixed(2)}%</span>
            </label>
            <input type="range" min={Math.max(1, Math.floor(loan.defaultRate * 0.7))} max={loan.maxRate} step={0.05} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-3 w-full accent-[oklch(0.72_0.13_65)]" />
            <div className="mt-1 flex justify-between text-[11px] text-muted-foreground"><span>Starting {loan.defaultRate}%*</span><span>Up to {loan.maxRate}%</span></div>
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium">
              <span className="flex items-center gap-1.5"><CalendarClock className="h-3.5 w-3.5 text-muted-foreground" /> Tenure</span>
              <span className="font-display text-base text-gold">{years} {years === 1 ? "year" : "years"} <span className="text-xs text-muted-foreground">({months} mo)</span></span>
            </label>
            <input type="range" min={range.minYears} max={range.maxYears} step={1} value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-3 w-full accent-[oklch(0.72_0.13_65)]" />
            <div className="mt-1 flex justify-between text-[11px] text-muted-foreground"><span>{range.minYears} {range.minYears === 1 ? "yr" : "yrs"}</span><span>{range.maxYears} yrs</span></div>
          </div>

          {/* Prepayment slider */}
          <div>
            <label className="flex items-center justify-between text-sm font-medium">
              <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-muted-foreground" /> Annual prepayment</span>
              <span className="font-display text-base text-gold">{prepayPct}%{prepayPct > 0 && <span className="ml-1 text-xs text-muted-foreground">of principal</span>}</span>
            </label>
            <input type="range" min={0} max={20} step={1} value={prepayPct} onChange={(e) => setPrepayPct(Number(e.target.value))} className="mt-3 w-full accent-[oklch(0.72_0.13_65)]" />
            <div className="mt-1 flex justify-between text-[11px] text-muted-foreground"><span>No prepayment</span><span>20% / year</span></div>
            {prepayPct > 0 && prepayScenario && (
              <div className="mt-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 text-xs">
                <p className="font-medium text-emerald-700">💡 You save {formatINR(prepayScenario.interestSaved)} in interest</p>
                <p className="mt-0.5 text-muted-foreground">Loan ends {prepayScenario.yearsSaved.toFixed(1)} years earlier · Pay {formatINR(prepayScenario.newTotalPayment)} instead of {formatINR(totalPayment)}</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={resetToDefaults} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground/80 hover:bg-muted">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
            {!showForm && (
              <button onClick={() => setShowForm(true)} className="btn-gold flex-1 text-sm">
                Get This Loan <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Result + Tabs */}
        <div className="flex flex-col bg-primary p-4 text-primary-foreground sm:p-5 md:p-6">
          <div>
            <p className="eyebrow text-primary-foreground/60">Monthly EMI</p>
            <p className="mt-1 font-display text-3xl text-gold sm:text-4xl md:text-5xl">{emi > 0 ? formatINR(emi) : "—"}</p>
            <p className="mt-1 text-xs text-primary-foreground/60">for {loan.name} · {years} {years === 1 ? "year" : "years"} @ {rate.toFixed(2)}%</p>
          </div>

          {/* Tab nav */}
          <div className="mt-4 flex gap-1 rounded-lg bg-primary-foreground/10 p-1">
            <TabBtn active={activeTab === "summary"} onClick={() => setActiveTab("summary")} icon={ChartPie} label="Summary" />
            <TabBtn active={activeTab === "schedule"} onClick={() => setActiveTab("schedule")} icon={Table2} label="Schedule" />
            <TabBtn active={activeTab === "compare"} onClick={() => setActiveTab("compare")} icon={CalendarClock} label="Compare" />
          </div>

          <div className="mt-4 flex-1">
            {activeTab === "summary" && (
              <div>
                <div className="flex h-2.5 overflow-hidden rounded-full bg-primary-foreground/15">
                  <div className="bg-gold transition-all" style={{ width: `${principalPct}%` }} />
                  <div className="bg-primary-foreground/30 transition-all" style={{ width: `${interestPct}%` }} />
                </div>
                <div className="mt-2 flex justify-between text-[11px]">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-gold" /> Principal {principalPct}%</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary-foreground/30" /> Interest {interestPct}%</span>
                </div>

                <div className="mt-4 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2}>
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <RTooltip
                        formatter={(v: number) => formatINR(v)}
                        contentStyle={{ background: "oklch(1 0 0)", border: "1px solid oklch(0.88 0.02 255)", borderRadius: 8, fontSize: 12 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex justify-between border-b border-primary-foreground/10 pb-2"><span className="text-primary-foreground/70">Principal</span><span className="font-medium">{formatINR(principal)}</span></div>
                  <div className="flex justify-between border-b border-primary-foreground/10 pb-2"><span className="text-primary-foreground/70">Total interest</span><span className="font-medium">{formatINR(totalInterest)}</span></div>
                  <div className="flex justify-between pt-1 font-semibold"><span>Total payable</span><span className="text-gold">{formatINR(totalPayment)}</span></div>
                </div>
              </div>
            )}

            {activeTab === "schedule" && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs text-primary-foreground/70">Yearly amortization breakdown</p>
                  {schedule.length > 5 && (
                    <button onClick={() => setShowAllYears((v) => !v)} className="inline-flex items-center gap-1 text-[11px] text-gold hover:underline">
                      {showAllYears ? "Show less" : `Show all ${schedule.length}`} {showAllYears ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>
                  )}
                </div>
                <div className="max-h-56 overflow-y-auto scroll-thin rounded-lg bg-primary-foreground/5">
                  <table className="w-full text-[11px]">
                    <thead className="sticky top-0 bg-primary text-primary-foreground/80">
                      <tr>
                        <th className="px-2 py-1.5 text-left font-medium">Yr</th>
                        <th className="px-2 py-1.5 text-right font-medium">Principal</th>
                        <th className="px-2 py-1.5 text-right font-medium">Interest</th>
                        <th className="px-2 py-1.5 text-right font-medium">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleSchedule.map((row) => (
                        <tr key={row.year} className="border-t border-primary-foreground/10">
                          <td className="px-2 py-1.5 font-medium text-gold">{row.year}</td>
                          <td className="px-2 py-1.5 text-right">{formatINR(row.principalPaid)}</td>
                          <td className="px-2 py-1.5 text-right text-primary-foreground/70">{formatINR(row.interestPaid)}</td>
                          <td className="px-2 py-1.5 text-right">{formatINR(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 flex items-start gap-1 text-[10px] text-primary-foreground/50">
                  <Info className="mt-0.5 h-3 w-3 shrink-0" />
                  Each year you pay more principal and less interest. The balance column shows what's left to repay at year-end.
                </p>
              </div>
            )}

            {activeTab === "compare" && (
              <div>
                <p className="mb-2 text-xs text-primary-foreground/70">EMI &amp; total payable across tenures</p>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.1)" />
                      <XAxis dataKey="tenure" tick={{ fill: "oklch(0.985 0.005 85)", fontSize: 11 }} />
                      <YAxis tickFormatter={(v) => compactINR(Number(v))} tick={{ fill: "oklch(0.985 0.005 85)", fontSize: 10 }} />
                      <RTooltip
                        formatter={(v: number) => formatINR(v)}
                        contentStyle={{ background: "oklch(1 0 0)", border: "1px solid oklch(0.88 0.02 255)", borderRadius: 8, fontSize: 12 }}
                      />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="emi" name="Monthly EMI" fill="oklch(0.72 0.13 65)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="interest" name="Total Interest" fill="oklch(0.78 0.13 75)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 space-y-1.5 text-[11px]">
                  {comparisonData.map((c) => (
                    <div key={c.tenure} className="flex items-center justify-between rounded-md bg-primary-foreground/5 px-2 py-1">
                      <span className="font-medium text-gold">{c.tenure}</span>
                      <span className="text-primary-foreground/70">EMI {formatINR(c.emi)}</span>
                      <span className="text-primary-foreground/70">Interest {formatINR(c.interest)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="mt-4 text-[10px] leading-relaxed text-primary-foreground/50">*Indicative EMI based on the selected rate. Final rate, tenure and EMI are at the lender&apos;s discretion and depend on your credit profile.</p>
        </div>
      </div>

      {showForm && (
        <div className="border-t border-border bg-muted/30 p-4 sm:p-5 md:p-6">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="eyebrow"><span className="gold-line" />Apply now</p>
              <h4 className="mt-1 font-display text-lg">Get a callback for your {loan.name}</h4>
              <p className="text-xs text-muted-foreground">Your calculated EMI: <span className="font-medium text-foreground">{emi > 0 ? formatINR(emi) + "/month" : "—"}</span> · Amount: <span className="font-medium text-foreground">{formatINR(principal)}</span>{prepayPct > 0 && prepayScenario ? ` · With ${prepayPct}% prepayment you save ${formatINR(prepayScenario.interestSaved)}` : ""}</p>
            </div>
            <button onClick={() => setShowForm(false)} className="text-xs text-muted-foreground hover:text-foreground">Close ✕</button>
          </div>
          <LeadForm formVariant="loan" service={`${loan.name} (EMI: ${emi > 0 ? formatINR(emi) + "/mo" : "calculated"}, Amount: ${formatINR(principal)}, Tenure: ${years}y @ ${rate.toFixed(2)}%${prepayPct > 0 && prepayScenario ? `, Prepay: ${prepayPct}%/yr saving ${formatINR(prepayScenario.interestSaved)}` : ""})`} title="" subtitle="" variant="inline" />
        </div>
      )}
    </div>
  );
}

type YearRow = {
  year: number;
  principalPaid: number;
  interestPaid: number;
  totalPaid: number;
  balance: number;
};

function TabBtn({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-medium transition ${
        active ? "bg-primary-foreground text-primary" : "text-primary-foreground/70 hover:bg-primary-foreground/10"
      }`}
    >
      <Icon className="h-3 w-3" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
