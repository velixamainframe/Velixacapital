import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { FundingReadinessAssessment } from "@/components/site/funding-readiness-assessment";
import { ArrowRight, ShieldCheck } from "lucide-react";

const SLUG = "/funding-readiness-assessment";
const TITLE = "Free Funding Readiness Assessment — 5-Minute Score";
const DESCRIPTION =
  "Answer 12 questions across the 5 funding pillars (CIBIL, banking, ITR, GST, obligations). Get your readiness score in 5 minutes — and a free 24-hour diagnosis from a senior advisor.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SLUG },
  openGraph: { title: `${TITLE} | Velixa Capital`, description: DESCRIPTION, url: SLUG, type: "article" },
};

export default function Page() {
  return (
    <SiteShell>
      <header className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span className="mx-2 text-primary-foreground/40">/</span>
            <span>Funding Readiness Assessment</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70"><span className="gold-line" />Free assessment</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.1] md:text-5xl">
            Funding readiness score in <em className="italic text-gold">5 minutes</em>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">
            12 questions across 5 pillars — CIBIL, banking, ITR, GST and obligations. Get an
            honest readiness score, a pillar-by-pillar breakdown, and a free 24-hour diagnosis
            from a senior advisor. No CIBIL pull. No spam. No obligation.
          </p>
        </div>
      </header>

      <section className="py-12">
        <div className="container-edge">
          <div className="mx-auto max-w-3xl">
            <FundingReadinessAssessment />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-14">
        <div className="container-edge">
          <p className="eyebrow"><span className="gold-line" />How to use your score</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">What your readiness score means</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border-2 border-emerald-600 bg-emerald-50 p-6">
              <p className="font-display text-3xl text-emerald-700">90+</p>
              <p className="mt-1 font-display text-lg">Premium-ready</p>
              <p className="mt-2 text-xs text-muted-foreground">Approach 1–2 best-fit lenders for premium rates. Don&apos;t apply to 5+ lenders.</p>
            </div>
            <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50/70 p-6">
              <p className="font-display text-3xl text-emerald-700">75–89</p>
              <p className="mt-1 font-display text-lg">Strong</p>
              <p className="mt-2 text-xs text-muted-foreground">Most banks will approve at competitive rates. Address the weakest pillar first.</p>
            </div>
            <div className="rounded-2xl border-2 border-amber-500 bg-amber-50 p-6">
              <p className="font-display text-3xl text-amber-700">60–74</p>
              <p className="mt-1 font-display text-lg">Approvable</p>
              <p className="mt-2 text-xs text-muted-foreground">Private banks and NBFCs will approve. PSU banks may decline. Fix 1–2 pillars first.</p>
            </div>
            <div className="rounded-2xl border-2 border-red-500 bg-red-50 p-6">
              <p className="font-display text-3xl text-red-700">Below 60</p>
              <p className="mt-1 font-display text-lg">Not ready</p>
              <p className="mt-2 text-xs text-muted-foreground">Don&apos;t apply yet — the rejection enquiry will weaken your file further. Address pillars first.</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-gold" />
            <span>Your answers stay in your browser. No CIBIL pull. We only see what you submit at the end.</span>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-edge grid gap-6 md:grid-cols-3">
          <Link href="/funding-readiness" className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-gold/50">
            <p className="eyebrow text-[11px]"><span className="gold-line" />Read next</p>
            <h3 className="mt-2 font-display text-lg">Funding Readiness — The 6 Pillars</h3>
            <p className="mt-2 text-sm text-muted-foreground">Understand what each pillar means and how underwriters evaluate it.</p>
            <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:text-gold">Read <ArrowRight className="h-3.5 w-3.5" /></p>
          </Link>
          <Link href="/business-funding-scorecard" className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-gold/50">
            <p className="eyebrow text-[11px]"><span className="gold-line" />Track over time</p>
            <h3 className="mt-2 font-display text-lg">Business Funding Scorecard</h3>
            <p className="mt-2 text-sm text-muted-foreground">Score bands 0–100 across 4 tiers — Not Ready, Approvable, Strong, Premium.</p>
            <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:text-gold">Read <ArrowRight className="h-3.5 w-3.5" /></p>
          </Link>
          <Link href="/loan-readiness-checklist" className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-gold/50">
            <p className="eyebrow text-[11px]"><span className="gold-line" />Before you apply</p>
            <h3 className="mt-2 font-display text-lg">Loan Readiness Checklist</h3>
            <p className="mt-2 text-sm text-muted-foreground">The complete pre-application checklist — every doc and every fix, in order.</p>
            <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:text-gold">Read <ArrowRight className="h-3.5 w-3.5" /></p>
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
