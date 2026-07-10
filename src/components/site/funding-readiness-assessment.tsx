"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/lib/lead-submit";

type Answer = "yes" | "no" | "partial";

type Question = {
  id: string;
  pillar: string;
  question: string;
  help?: string;
  weight: number; // contribution to total possible score
  scoreFor: (a: Answer) => number;
};

const QUESTIONS: Question[] = [
  // CIBIL pillar (max 100)
  {
    id: "cibil_score",
    pillar: "CIBIL",
    question: "Is your CIBIL score 720 or higher?",
    help: "If you're not sure, pull your CIBIL report once (a self-check is free, no impact).",
    weight: 100,
    scoreFor: (a) => (a === "yes" ? 100 : a === "partial" ? 50 : 0),
  },
  {
    id: "cibil_enquiries",
    pillar: "CIBIL",
    question: "Have you made fewer than 4 hard credit enquiries in the last 6 months?",
    help: "Each lender application is a hard enquiry. 4+ in 6 months triggers credit-hungry flags.",
    weight: 100,
    scoreFor: (a) => (a === "yes" ? 100 : a === "partial" ? 50 : 0),
  },
  {
    id: "cibil_settled",
    pillar: "CIBIL",
    question: "Are there zero 'Settled' or 'Written-off' accounts on your CIBIL report?",
    help: "'Settled' stays on CIBIL for 7 years and triggers auto-decline at most banks.",
    weight: 100,
    scoreFor: (a) => (a === "yes" ? 100 : a === "partial" ? 30 : 0),
  },
  // Banking pillar (max 100)
  {
    id: "banking_amb",
    pillar: "Banking",
    question: "Is your average monthly balance at least 1.5× the EMI you're proposing?",
    help: "Lenders want to see AMB comfortably above the proposed EMI — typically 1.5–2×.",
    weight: 100,
    scoreFor: (a) => (a === "yes" ? 100 : a === "partial" ? 50 : 0),
  },
  {
    id: "banking_bounces",
    pillar: "Banking",
    question: "Have you had zero cheque/ECS bounces in the last 6 months?",
    help: "Even one bounce in 6 months is a yellow flag. 3+ bounces is usually a decline.",
    weight: 100,
    scoreFor: (a) => (a === "yes" ? 100 : a === "partial" ? 40 : 0),
  },
  {
    id: "banking_cash_ratio",
    pillar: "Banking",
    question: "Is less than 15% of your bank credits from cash deposits?",
    help: "Lenders prefer <10% cash deposits; >30% is a red flag signalling untraceable income.",
    weight: 100,
    scoreFor: (a) => (a === "yes" ? 100 : a === "partial" ? 50 : 0),
  },
  // ITR pillar (max 100)
  {
    id: "itr_filed",
    pillar: "ITR",
    question: "Have you filed your last 3 years' ITR on time?",
    help: "Most lenders require last 2–3 years of filed ITR; some accept 2 years.",
    weight: 100,
    scoreFor: (a) => (a === "yes" ? 100 : a === "partial" ? 50 : 0),
  },
  {
    id: "itr_profit",
    pillar: "ITR",
    question: "Does your declared ITR profit support a DSCR of 1.5× or higher for the proposed loan?",
    help: "Tax-optimised low profit is the most common DSCR failure. Compute DSCR = EBITDA ÷ annual EMI.",
    weight: 100,
    scoreFor: (a) => (a === "yes" ? 100 : a === "partial" ? 50 : 0),
  },
  // GST pillar (max 100)
  {
    id: "gst_returns",
    pillar: "GST",
    question: "Are your last 12 months of GST returns (GSTR-1 + 3B) filed and current?",
    help: "Pending GST returns is itself a decline reason at most banks.",
    weight: 100,
    scoreFor: (a) => (a === "yes" ? 100 : a === "partial" ? 50 : 0),
  },
  {
    id: "gst_reconciliation",
    pillar: "GST",
    question: "Does your GST turnover reconcile with your ITR turnover within 20%?",
    help: "A 3× gap between GST and ITR is the most common auto-reject trigger. Prepare a reconciliation note if they diverge.",
    weight: 100,
    scoreFor: (a) => (a === "yes" ? 100 : a === "partial" ? 50 : 0),
  },
  // Obligations pillar (max 100)
  {
    id: "obligations_foir",
    pillar: "Obligations",
    question: "Including the proposed EMI, is your FOIR (Fixed Obligations ÷ Income) below 50%?",
    help: "Most banks cap at 50–60%; NBFCs go up to 70%. Compute FOIR = all monthly EMIs ÷ net income.",
    weight: 100,
    scoreFor: (a) => (a === "yes" ? 100 : a === "partial" ? 50 : 0),
  },
  {
    id: "obligations_cards",
    pillar: "Obligations",
    question: "Is your credit card utilisation below 30% of the limit?",
    help: "Maxed-out cards signal over-leverage. >50% utilisation hurts both CIBIL score and approval odds.",
    weight: 100,
    scoreFor: (a) => (a === "yes" ? 100 : a === "partial" ? 50 : 0),
  },
];

const TOTAL_QUESTIONS = QUESTIONS.length;

function bandFor(score: number): { label: string; tone: "premium" | "strong" | "approvable" | "not_ready"; advice: string } {
  if (score >= 90) return {
    label: "Premium-ready (90+)",
    tone: "premium",
    advice: "Your file is approval-ready across all pillars. Approach 1–2 best-fit lenders for premium rates. Don't apply to 5+ lenders — pick strategically.",
  };
  if (score >= 75) return {
    label: "Strong (75–89)",
    tone: "strong",
    advice: "Strong file. Most banks will approve at competitive rates. Address the weakest pillar before applying for best pricing.",
  };
  if (score >= 60) return {
    label: "Approvable (60–74)",
    tone: "approvable",
    advice: "Approvable but borderline. Private banks and NBFCs will approve; PSU banks may decline. Address the weakest 1–2 pillars before applying.",
  };
  return {
    label: "Not Ready (below 60)",
    tone: "not_ready",
    advice: "Don't apply yet — you'll likely be rejected and the hard enquiry will further weaken your file. Address the weakest pillars first; re-evaluate in 3–6 months.",
  };
}

const PILLAR_SCORE: Record<string, number> = {};
QUESTIONS.forEach((q) => { PILLAR_SCORE[q.pillar] = (PILLAR_SCORE[q.pillar] ?? 0) + 1; });

export function FundingReadinessAssessment() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [current, setCurrent] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // For lead capture after assessment
  const [lead, setLead] = useState({ name: "", mobile: "", email: "", city: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const q = QUESTIONS[current];
  const isLast = current === TOTAL_QUESTIONS - 1;
  const answered = Object.keys(answers).length;

  function answer(a: Answer) {
    setAnswers({ ...answers, [q.id]: a });
    if (isLast) {
      setShowResult(true);
    } else {
      setTimeout(() => setCurrent((c) => Math.min(c + 1, TOTAL_QUESTIONS - 1)), 200);
    }
  }

  function restart() {
    setAnswers({});
    setCurrent(0);
    setShowResult(false);
    setSubmitted(false);
    setLead({ name: "", mobile: "", email: "", city: "" });
  }

  // Compute score (only over answered questions, weighted equally)
  const totalAnsweredWeight = QUESTIONS.filter((qq) => answers[qq.id]).reduce((s, qq) => s + qq.weight, 0);
  const earned = QUESTIONS.filter((qq) => answers[qq.id]).reduce((s, qq) => s + qq.scoreFor(answers[qq.id]), 0);
  const score = totalAnsweredWeight > 0 ? Math.round((earned / totalAnsweredWeight) * 100) : 0;
  const band = bandFor(score);

  // Pillar breakdown
  const pillars = ["CIBIL", "Banking", "ITR", "GST", "Obligations"];
  const pillarScores = pillars.map((p) => {
    const qs = QUESTIONS.filter((qq) => qq.pillar === p);
    const w = qs.reduce((s, qq) => s + (answers[qq.id] ? qq.weight : 0), 0);
    const e = qs.reduce((s, qq) => s + (answers[qq.id] ? qq.scoreFor(answers[qq.id]) : 0), 0);
    return { pillar: p, score: w > 0 ? Math.round((e / w) * 100) : null, answered: qs.every((qq) => answers[qq.id]) };
  });

  async function submitLeadForm(e: React.FormEvent) {
    e.preventDefault();
    const mobile = lead.mobile.trim().replace(/\s|-/g, "");
    if (!/^[6-9]\d{9}$/.test(mobile)) { toast.error("Enter a valid 10-digit Indian mobile (6–9 start)"); return; }
    if (!/^[A-Za-z .'-]{2,100}$/.test(lead.name.trim())) { toast.error("Enter a valid full name"); return; }
    if (!/^\S+@\S+\.\S+$/.test(lead.email.trim())) { toast.error("Enter a valid email"); return; }
    if (lead.city.trim().length < 2) { toast.error("Enter your city"); return; }
    setSubmitting(true);
    try {
      await submitLead({
        name: lead.name.trim(),
        mobile,
        email: lead.email.trim(),
        city: lead.city.trim(),
        service: "Funding Readiness Assessment",
        message: `Readiness score: ${score}/100 (${band.label}). Pillar breakdown: ${pillarScores.map((p) => `${p.pillar}: ${p.score ?? "n/a"}`).join(", ")}.`,
      }, typeof window !== "undefined" ? window.location.pathname : "/funding-readiness-assessment");
      setSubmitted(true);
      toast.success("Thanks! A senior advisor will respond within 24 hours.");
    } catch (err) {
      console.error(err);
      toast.error("Could not submit. Please try again or call us directly.");
    } finally { setSubmitting(false); }
  }

  if (!showResult) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-elegant)] md:p-10">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Question {current + 1} of {TOTAL_QUESTIONS}</span>
          <span>{answered} answered</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-gold transition-all"
            style={{ width: `${((current + 1) / TOTAL_QUESTIONS) * 100}%` }}
          />
        </div>

        <p className="eyebrow mt-6"><span className="gold-line" />{q.pillar} pillar</p>
        <h3 className="mt-2 font-display text-xl leading-snug md:text-2xl">{q.question}</h3>
        {q.help && <p className="mt-3 text-sm text-muted-foreground">{q.help}</p>}

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => answer("yes")}
            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
              answers[q.id] === "yes"
                ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                : "border-border bg-background hover:border-emerald-600/40 hover:bg-emerald-50/30"
            }`}
          >
            <CheckCircle2 className="h-4 w-4" /> Yes
          </button>
          <button
            type="button"
            onClick={() => answer("partial")}
            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
              answers[q.id] === "partial"
                ? "border-amber-600 bg-amber-50 text-amber-700"
                : "border-border bg-background hover:border-amber-600/40 hover:bg-amber-50/30"
            }`}
          >
            <AlertTriangle className="h-4 w-4" /> Partially
          </button>
          <button
            type="button"
            onClick={() => answer("no")}
            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
              answers[q.id] === "no"
                ? "border-red-600 bg-red-50 text-red-700"
                : "border-border bg-background hover:border-red-600/40 hover:bg-red-50/30"
            }`}
          >
            <AlertTriangle className="h-4 w-4" /> No
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
            disabled={current === 0}
            className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-40"
          >
            ← Previous
          </button>
          {current < TOTAL_QUESTIONS - 1 && (
            <button
              type="button"
              onClick={() => setCurrent((c) => Math.min(c + 1, TOTAL_QUESTIONS - 1))}
              className="text-sm font-medium text-primary hover:text-gold"
            >
              Skip →
            </button>
          )}
        </div>
      </div>
    );
  }

  const toneClasses = {
    premium: "border-emerald-600 bg-emerald-50",
    strong: "border-emerald-500 bg-emerald-50/70",
    approvable: "border-amber-500 bg-amber-50",
    not_ready: "border-red-500 bg-red-50",
  } as const;

  return (
    <div className="space-y-6">
      <div className={`rounded-2xl border-2 p-6 md:p-10 ${toneClasses[band.tone]}`}>
        <p className="eyebrow"><span className="gold-line" />Your readiness score</p>
        <div className="mt-3 flex items-end gap-4">
          <span className="font-display text-6xl leading-none md:text-7xl">{score}</span>
          <span className="pb-1 text-xl text-muted-foreground">/ 100</span>
        </div>
        <p className="mt-2 font-display text-2xl">{band.label}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{band.advice}</p>

        <div className="mt-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Pillar breakdown</p>
          {pillarScores.map((p) => (
            <div key={p.pillar}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">{p.pillar}</span>
                <span className="text-muted-foreground">{p.answered ? `${p.score}/100` : "skipped"}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full transition-all ${
                    p.score === null ? "bg-muted-foreground/30"
                    : p.score >= 75 ? "bg-emerald-600"
                    : p.score >= 50 ? "bg-amber-500"
                    : "bg-red-500"
                  }`}
                  style={{ width: `${p.score ?? 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={restart} className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:border-primary/30">
            <RotateCcw className="h-4 w-4" /> Retake assessment
          </button>
          <a href="#get-diagnosis" className="btn-gold inline-flex items-center gap-2">
            Get a free diagnosis <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div id="get-diagnosis" className="rounded-2xl border border-border bg-card p-6 md:p-8">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-gold" />
            <h3 className="mt-4 text-xl">You&apos;re in good hands</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              We&apos;ve received your assessment. A senior advisor will call you within 24 hours with a specific fix plan based on your score.
            </p>
          </div>
        ) : (
          <form onSubmit={submitLeadForm}>
            <p className="eyebrow"><span className="gold-line" />Get a free diagnosis</p>
            <h3 className="mt-2 font-display text-2xl">Send your score to a senior advisor</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We&apos;ll respond within 24 hours with the specific fixes that will move your score the most — free, no obligation.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Full name *</label>
                <input
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  value={lead.name}
                  onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Mobile *</label>
                <input
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  inputMode="numeric"
                  maxLength={10}
                  value={lead.mobile}
                  onChange={(e) => setLead({ ...lead, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                  placeholder="10-digit mobile"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email *</label>
                <input
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  type="email"
                  value={lead.email}
                  onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">City *</label>
                <input
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  value={lead.city}
                  onChange={(e) => setLead({ ...lead, city: e.target.value })}
                  placeholder="e.g. Mumbai"
                  required
                />
              </div>
            </div>
            <button type="submit" disabled={submitting} className="btn-gold mt-5 w-full disabled:opacity-70">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {submitting ? "Submitting…" : "Get my free diagnosis"}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Your data is protected and never shared without consent. Your readiness score is included in the lead for the advisor.
            </p>
          </form>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-muted/30 p-6">
        <p className="eyebrow"><span className="gold-line" />What to do next</p>
        <h3 className="mt-2 font-display text-xl">Based on your score</h3>
        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Read the <Link href="/funding-readiness" className="font-medium text-primary hover:underline">6-pillar funding readiness guide</Link>.</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Browse the <Link href="/loan-rejection" className="font-medium text-primary hover:underline">loan rejection library</Link> for the triggers most relevant to your weakest pillar.</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Use the <Link href="/business-funding-scorecard" className="font-medium text-primary hover:underline">business funding scorecard</Link> to track your pillar scores over time.</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Run through the <Link href="/loan-readiness-checklist" className="font-medium text-primary hover:underline">loan readiness checklist</Link> before approaching any lender.</li>
        </ul>
      </div>
    </div>
  );
}
