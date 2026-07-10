import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { LeadForm } from "@/components/site/lead-form";
import { EMICalculator } from "@/components/site/emi-calculator";
import { PARTNER_BANKS, CONTACT } from "@/lib/site-data";
import {
  ShieldCheck, Handshake, Building2, Sparkles, ArrowRight, CheckCircle2, XCircle,
  Search, FileText, Calculator, Target, Send, Briefcase, Store, Factory, Stethoscope,
  Home as HomeIcon, Rocket, TrendingUp, Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Rejected by Banks? Get Your Loan File Reviewed | Velixa Capital",
  description:
    "Rejected by banks? Before you apply again, get your loan file professionally reviewed by finance experts. Manual profile review, credit & eligibility analysis, tax/GST alignment — no blind portal submissions.",
  keywords: [
    "loan rejected what to do", "business loan rejection reasons", "low cibil business loan",
    "gst loan eligibility", "loan file review", "credit structuring", "MSME loan consultant",
    "loan against property advisor india",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rejected by Banks? Get Your Loan File Reviewed | Velixa Capital",
    description: "Manual profile review, credit & eligibility analysis, tax/GST alignment — no blind portal submissions.",
    url: "/",
  },
};

const REJECTION_REASONS = [
  { t: "Low CIBIL / credit score", d: "Below the lender's cut-off — often fixable in 2–4 weeks with the right moves." },
  { t: "GST mismatch", d: "Turnover declared in GST doesn't reconcile with banking or ITR." },
  { t: "Banking issues", d: "Low average balance, cheque bounces, or cash-heavy inflows." },
  { t: "High existing obligations", d: "FOIR/DSCR breached — lenders see you as over-leveraged." },
  { t: "Wrong lender selection", d: "Your profile doesn't fit that bank's credit policy box." },
  { t: "Insufficient documentation", d: "Missing vintage, ownership, or financial proofs underwriters need." },
  { t: "Industry restrictions", d: "Your sector is on a lender's negative list or watch-list." },
];

const AUDIENCES = [
  { icon: Briefcase, t: "Business Owners", d: "Owners running an established business who need growth capital.", needs: ["Working capital", "Expansion funding", "Term loans & OD"] },
  { icon: Store, t: "Traders", d: "Traders and distributors with strong turnover but thin margins.", needs: ["Inventory finance", "Cash-flow funding", "GST-based limits"] },
  { icon: Factory, t: "Manufacturers", d: "Manufacturers investing in capacity, equipment and assets.", needs: ["Machinery & equipment", "Business expansion", "CGTMSE / MSME schemes"] },
  { icon: Stethoscope, t: "Professionals", d: "Doctors, CAs, architects and consultants building a practice.", needs: ["Doctor/professional loans", "Clinic/office setup", "LAP on owned property"] },
  { icon: HomeIcon, t: "Property Investors", d: "Investors leveraging property to fund their next move.", needs: ["Loan Against Property", "Lease Rental Discounting", "Commercial funding"] },
  { icon: Rocket, t: "Startups", d: "Revenue-stage startups needing non-dilutive growth capital.", needs: ["Revenue-based funding", "Founder credit structuring", "Working capital lines"] },
];

const STEPS = [
  { n: 1, t: "Eligibility Audit", icon: Search, d: "We read your CIBIL, banking and obligations to set a realistic eligibility before any submission." },
  { n: 2, t: "Document Review", icon: FileText, d: "Every KYC, financial and vintage proof is checked the way an underwriter will read it." },
  { n: 3, t: "Tax & GST Analysis", icon: Calculator, d: "ITR, GST and balance sheet reconciliation so the numbers tell one consistent story." },
  { n: 4, t: "Lender Matching", icon: Target, d: "We map your profile to the 1–2 lenders whose policy actually fits — not the panel of 10." },
  { n: 5, t: "Submission & Follow-Up", icon: Send, d: "Hands-on coordination with the lender's credit team till sanction and disbursal." },
];

const PILLARS = ["Credit Readiness", "Banking Readiness", "GST Readiness", "Tax Readiness", "Financial Readiness", "Documentation Readiness"];

const COMPARE = [
  { tag: "Lender", t: "Banks", points: ["Evaluate applications", "Approve or reject", "Follow internal credit policy"] },
  { tag: "Distributor", t: "Aggregators", points: ["Generate leads", "Sell applications", "Route the file to whoever picks up"] },
  { tag: "Advisor", t: "Velixa", highlight: true, points: ["Diagnose eligibility against real lender policy", "Structure your credit, banking and tax profile", "Improve funding readiness — then match to a right-fit lender", "One accountable team across loans, tax, GST and property finance"] },
];

const WHY_REJECTED = [
  { t: "Low CIBIL", to: "/knowledge-hub/low-cibil-rejection" },
  { t: "GST mismatch", to: "/knowledge-hub/gst-mismatch-rejection" },
  { t: "Banking issues", to: "/knowledge-hub/banking-red-flags" },
  { t: "High obligations", to: "/knowledge-hub/high-foir-issues" },
  { t: "Wrong lender selection", to: "/bank-vs-nbfc-business-loan" },
  { t: "Weak financial presentation", to: "/knowledge-hub/low-profit-declaration" },
  { t: "Tax filing issues", to: "/tax-planning-for-loan-eligibility" },
  { t: "Industry restrictions", to: "/knowledge-hub/why-loan-applications-get-rejected" },
];

const CASES = [
  { tag: "Business Loan", t: "Rejected by 4 lenders, sanctioned at the 5th", problem: "Trading firm rejected by 4 banks despite ₹6 Cr GST turnover.", diagnosis: "High unsecured utilisation + ITR understated.", solution: "Credit restructuring + ITR alignment, matched to NBFC.", result: "₹35 lakh unsecured BL sanctioned." },
  { tag: "LAP", t: "LAP at lower rate after refinance review", problem: "Existing LAP at 13.5% — original lender's risk-grading penalised her sector.", diagnosis: "Sector risk-grading, not the borrower.", solution: "Refinanced via private bank with stronger property valuation.", result: "Rate reduced ~250 bps, ₹18k/month EMI saving." },
  { tag: "MSME", t: "Manufacturer unlocked CGTMSE-backed limit", problem: "₹2 Cr machinery loan rejected, no collateral.", diagnosis: "Profile fit CGTMSE; original DSA missed it.", solution: "Re-positioned under CGTMSE.", result: "₹1.6 Cr term loan + ₹40L WC sanctioned." },
];

const FAQS = [
  { q: "I was rejected by a bank — what should I do before applying again?", a: "Stop applying. Every fresh enquiry pulls your CIBIL down further. Get a manual file review first — most rejections are fixable in 2–4 weeks if you don't burn more enquiries in the meantime." },
  { q: "Will you do a CIBIL pull just to review my file?", a: "No. We review your profile, banking and documents first and discuss the strategy with you. A CIBIL pull happens only when we agree to submit to a specific lender." },
  { q: "Do you guarantee loan approval?", a: "No one can. Velixa Capital is not a lender — final approval, interest rate and limit are at the partner institution's sole discretion. What we improve is the probability and the quality of the offer." },
  { q: "Are you a RERA-registered real estate brokerage?", a: "No. We provide independent property advisory, finance facilitation and documentation review only — we do not list, market or sell property." },
  { q: "What does the file review cost?", a: "The initial eligibility review is free. If we take on the case, fees are disclosed upfront in writing — no hidden charges, no surprise add-ons." },
  { q: "How long does the full process take?", a: "File review typically 24–48 hours. From a clean submission, most working capital and personal loans sanction in 5–10 working days; LAP and large business loans in 2–4 weeks depending on legal/valuation." },
  { q: "Why did one bank reject my file while another approved it?", a: "Every bank has its own credit policy — sector exposure, vintage thresholds, profile boxes, regional risk. The same file can be a clear no at one and a clear yes at another. The skill is matching the file to the lender whose policy actually fits it." },
  { q: "Can GST turnover compensate for low declared income?", a: "Partially. Many NBFCs and a few private banks now have GST-based programs that look at turnover instead of ITR profit. But the gap can't be wild — banking, ITR and GST still need to tell a consistent story." },
  { q: "Why do profitable businesses fail eligibility checks?", a: "Usually one of four things: low declared income (tax planning over-optimised), banking that doesn't reflect the P&L, high existing obligations, or sector restrictions. Profitability alone isn't underwritten — the file is." },
  { q: "How do lenders analyze bank statements?", a: "They look at average balance, credit consistency, cheque bounces, cash deposit ratio, EMI obligations, end-of-month balance trends, and patterns that suggest round-tripping. Twelve months of clean banking does more for eligibility than any pitch." },
  { q: "How much does existing debt affect eligibility?", a: "FOIR (for individuals) and DSCR (for businesses) are the two ratios that decide. Most lenders cap total obligations at 50–65% of income. A high credit card utilisation can drop eligibility even before a formal EMI is counted." },
  { q: "What is considered a strong banking profile?", a: "Stable average bank balance (ideally 25–35% of monthly turnover), no cheque returns, EMI debits cleared on time, low cash-to-credit ratio, and predictable inflows. Lenders trust patterns more than peaks." },
  { q: "How do credit managers view cash deposits?", a: "Cash deposits beyond a small operating buffer are discounted. Many programs cap eligible turnover at the non-cash credit portion. Heavy cash businesses need either a cash-friendly program or a 6–12 month transition into more banked transactions." },
  { q: "Which industries face stricter underwriting?", a: "Real-estate adjacent, gold/jewellery, liquor, crypto, gaming, education-tech, and some export sectors face tighter rules — higher collateral, lower exposure, or outright negative lists. The right diagnosis avoids wasted enquiries." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function HomePage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(/hero.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)", opacity: 0.92 }} />
        <div className="container-edge relative grid gap-10 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="eyebrow text-primary-foreground/70"><span className="gold-line" />For business owners, professionals &amp; property investors</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.08] md:text-5xl lg:text-6xl">
              Rejected by Banks? <em className="not-italic text-gold">Before you apply again,</em> get your loan file professionally reviewed by finance experts.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/85">
              We don't blast your file to portals. We sit with your profile, fix what's breaking it, and match you to the right lender — so you don't burn another CIBIL enquiry on a rejection.
            </p>
            <ul className="mt-6 grid gap-2 text-sm text-primary-foreground/90 sm:grid-cols-2">
              {["No blind portal submissions", "Manual profile review", "Credit & eligibility analysis", "Tax, GST & banking alignment", "No unnecessary CIBIL enquiries"].map((b) => (
                <li key={b} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-gold" />{b}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/eligibility" className="btn-gold">Get Free Eligibility Review <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/contact" className="btn-outline-ivory">Request Loan Assessment</Link>
              <Link href="/contact" className="text-sm text-gold hover:underline self-center">Talk to a Finance Specialist →</Link>
            </div>
          </div>
          <div>
            <LeadForm title="Free loan file review" subtitle="Share basic details — a senior advisor responds within 24 hours." />
          </div>
        </div>
      </section>

      {/* PARTNER MARQUEE */}
      <section className="border-y border-border bg-muted/40 py-12">
        <div className="container-edge text-center">
          <p className="eyebrow"><span className="gold-line" />Our lender network</p>
          <h2 className="mt-3 font-display text-2xl md:text-3xl">Access to leading banks &amp; NBFCs across India</h2>
          <p className="mt-2 text-sm text-muted-foreground">We route your file to the right partner — not all of them.</p>
        </div>
        <div className="marquee-mask mt-8 overflow-hidden">
          <div className="marquee-track gap-4 px-2">
            {[...PARTNER_BANKS, ...PARTNER_BANKS].map((bank, i) => (
              <div key={i} className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{bank.slice(0, 1)}</span>
                <span className="whitespace-nowrap text-sm font-medium">{bank}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-16 md:py-20">
        <div className="container-edge">
          <p className="eyebrow"><span className="gold-line" />The problem</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Why good businesses still get <em className="not-italic text-gold">rejected.</em></h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">Most rejections aren't about whether you're creditworthy — they're about how your file reads to an underwriter. Here's what trips up otherwise fundable businesses:</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REJECTION_REASONS.map((r) => (
              <div key={r.t} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-2"><XCircle className="h-5 w-5 text-red-500" /><h3 className="font-display text-base">{r.t}</h3></div>
                <p className="mt-2 text-sm text-muted-foreground">{r.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <p className="eyebrow text-red-700">The aggregator path</p>
              <ol className="mt-4 space-y-2 text-sm">
                {["Submit to 10+ portals", "Multiple CIBIL enquiries", "File lands at whoever pays most", "Lenders see a 'shopped' file", "Multiple CIBIL hits → Automated rejection"].map((s, i) => (
                  <li key={i} className="flex gap-2"><span className="font-bold text-red-500">{i + 1}.</span>{s}</li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
              <p className="eyebrow text-gold">The Velixa consultant path</p>
              <ol className="mt-4 space-y-2 text-sm">
                {["Profile diagnosis & eligibility audit", "File structuring (credit, banking, tax)", "Matched to 1–2 right-fit lenders", "Single, deliberate CIBIL pull", "Higher approval probability"].map((s, i) => (
                  <li key={i} className="flex gap-2"><span className="font-bold text-gold">{i + 1}.</span>{s}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE HELP */}
      <section className="bg-muted/40 py-16 md:py-20">
        <div className="container-edge">
          <p className="eyebrow"><span className="gold-line" />Who we help</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Built for owners, professionals &amp; investors who deserve a real advisor.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCES.map((a) => (
              <div key={a.t} className="rounded-2xl border border-border bg-card p-6">
                <a.icon className="h-7 w-7 text-gold" />
                <h3 className="mt-3 font-display text-lg">{a.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.d}</p>
                <ul className="mt-3 space-y-1 text-xs text-foreground/80">{a.needs.map((n) => <li key={n} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-gold" />{n}</li>)}</ul>
                <Link href="/contact" className="mt-4 block text-sm font-medium text-primary hover:text-gold">Discuss your case →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRAMEWORK — 5 STEP */}
      <section className="py-16 md:py-20">
        <div className="container-edge">
          <p className="eyebrow"><span className="gold-line" />Our framework</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">The 5-Step Credit Structuring Method<sup className="text-base">™</sup></h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-5">
                <span className="inline-block rounded-full bg-gradient-gold px-2.5 py-0.5 text-xs font-semibold text-gold-foreground" style={{ backgroundImage: "var(--gradient-gold)" }}>Step {s.n}</span>
                <s.icon className="mt-3 h-6 w-6 text-primary" />
                <h3 className="mt-2 font-display text-base">{s.t}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNDING READINESS FRAMEWORK */}
      <section id="funding-readiness" className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container-edge">
          <p className="eyebrow text-primary-foreground/70"><span className="gold-line" />The Velixa method</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">The Funding Readiness Framework<sup className="text-base">™</sup></h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <div key={p} className="rounded-2xl bg-primary-foreground/[0.06] p-5 ring-1 ring-primary-foreground/10">
                <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold text-gold-foreground" style={{ backgroundImage: "var(--gradient-gold)" }}>Pillar {i + 1}</span>
                <h3 className="mt-3 font-display text-lg">{p}</h3>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/funding-readiness-assessment" className="btn-gold">Score my business <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/funding-readiness" className="btn-outline-ivory">Explore funding readiness</Link>
          </div>
        </div>
      </section>

      {/* BANKS VS AGGREGATORS VS VELIXA */}
      <section className="py-16 md:py-20">
        <div className="container-edge">
          <p className="eyebrow"><span className="gold-line" />The market vs us</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Banks vs Aggregators vs Velixa</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {COMPARE.map((c) => (
              <div key={c.t} className={`rounded-2xl border p-6 ${c.highlight ? "border-gold bg-gold/5 shadow-[var(--shadow-soft)]" : "border-border bg-card"}`}>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${c.highlight ? "bg-gold text-gold-foreground" : "bg-muted text-muted-foreground"}`}>{c.tag}</span>
                <h3 className="mt-3 font-display text-xl">{c.t}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">{c.points.map((p) => <li key={p} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{p}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY GOOD BUSINESSES GET REJECTED */}
      <section className="bg-muted/40 py-16 md:py-20">
        <div className="container-edge">
          <p className="eyebrow"><span className="gold-line" />The silent killers</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Why good businesses get rejected</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_REJECTED.map((w) => (
              <Link key={w.t} href={w.to} className="group rounded-xl border border-border bg-card p-4 transition hover:border-gold/50 hover:shadow-[var(--shadow-soft)]">
                <h3 className="text-sm font-medium flex items-center justify-between gap-2">{w.t} <ArrowRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" /></h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container-edge">
          <p className="eyebrow text-primary-foreground/70"><span className="gold-line" />Case studies</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Real files. Real diagnoses. Real outcomes.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {CASES.map((c) => (
              <div key={c.t} className="rounded-2xl bg-primary-foreground/[0.06] p-6 ring-1 ring-primary-foreground/10">
                <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-medium text-gold-foreground">{c.tag}</span>
                <h3 className="mt-3 font-display text-lg">{c.t}</h3>
                <dl className="mt-3 space-y-2 text-xs text-primary-foreground/80">
                  <div><dt className="font-semibold text-primary-foreground/90">Problem</dt><dd>{c.problem}</dd></div>
                  <div><dt className="font-semibold text-primary-foreground/90">Diagnosis</dt><dd>{c.diagnosis}</dd></div>
                  <div><dt className="font-semibold text-primary-foreground/90">Solution</dt><dd>{c.solution}</dd></div>
                  <div><dt className="font-semibold text-gold">Result</dt><dd className="text-primary-foreground">{c.result}</dd></div>
                </dl>
                <p className="mt-3 text-[10px] text-primary-foreground/50">*Indicative outcome.</p>
              </div>
            ))}
          </div>
          <div className="mt-8"><Link href="/contact" className="btn-gold">Get a file review like this <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </section>

      {/* EMI CALC */}
      <section className="py-16 md:py-20">
        <div className="container-edge">
          <p className="eyebrow"><span className="gold-line" />Plan smart</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Know your EMI before you borrow.</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Tweak the amount, rate and tenure. Then talk to us about the structure that actually keeps your DSCR healthy — not just the EMI you can afford.</p>
          <div className="mt-8"><EMICalculator /></div>
        </div>
      </section>

      {/* FINANCE + TAX INTEGRATION */}
      <section className="bg-muted/40 py-16 md:py-20">
        <div className="container-edge grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow"><span className="gold-line" />Finance &amp; tax integration</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Why tax planning decides your loan approval.</h2>
            <ul className="mt-6 space-y-3 text-sm">
              {["ITR profile & declared income", "GST turnover vs banking", "Bank statement quality", "Balance sheet strength", "Profitability & margins", "Existing obligations / DSCR"].map((b) => (
                <li key={b} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{b}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/tax-accounting" className="btn-primary text-sm">Tax &amp; accounting services</Link>
              <Link href="/contact" className="btn-outline text-sm">Plan ahead with an advisor</Link>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <h3 className="font-display text-lg">Most business owners learn this too late</h3>
            <div className="mt-4 space-y-3">
              {["Low ITR vs high bank turnover", "GST returns don't match invoices", "Director salary draining profitability", "Cash transactions weakening statements"].map((c) => (
                <div key={c} className="flex items-center gap-2 rounded-lg bg-red-500/5 px-3 py-2 text-sm"><XCircle className="h-4 w-4 shrink-0 text-red-500" />{c}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container-edge">
          <p className="eyebrow text-primary-foreground/70"><span className="gold-line" />Why Velixa</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">We put your file ahead of the lender's funnel.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, t: "Independent advisory", d: "We're not tied to one lender. We recommend what fits your file." },
              { icon: Handshake, t: "One-stop ecosystem", d: "Loans, tax, GST, accounting and property advisory — one team." },
              { icon: Sparkles, t: "Diagnosis-first", d: "We fix the file before we submit — not after a rejection." },
              { icon: Building2, t: "Strict data privacy", d: "Your documents are encrypted and never shared without consent." },
            ].map((w) => (
              <div key={w.t} className="rounded-2xl bg-primary-foreground/[0.06] p-5 ring-1 ring-primary-foreground/10">
                <w.icon className="h-7 w-7 text-gold" />
                <h3 className="mt-3 font-display text-base">{w.t}</h3>
                <p className="mt-1 text-xs text-primary-foreground/75">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="container-edge max-w-4xl">
          <p className="eyebrow"><span className="gold-line" />FAQ</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Answers to the questions everyone asks first.</h2>
          <dl className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
            {FAQS.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer items-center justify-between text-base font-medium">{f.q}<span className="ml-4 text-2xl leading-none text-gold transition-transform group-open:rotate-45">+</span></summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </dl>
        </div>
      </section>

      {/* TRUST / EEAT STRIP */}
      <section className="bg-muted/40 py-16">
        <div className="container-edge grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-display text-xl">Senior advisors, not call-centre executives.</h3>
            <p className="mt-2 text-sm text-muted-foreground">Every file is read by someone who understands credit policy — not routed through a lead funnel.</p>
            <Link href="/about" className="mt-3 inline-block text-sm font-medium text-primary hover:text-gold">Read our story →</Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-lg">Disclosures</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {["Independent finance consultant", "Authorized channel partner — RBI-registered banks & NBFCs", "No guarantee of approval", "Transparent, disclosed fees only"].map((d) => (
                <li key={d} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{d}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gold bg-gold/5 p-6">
            <h3 className="font-display text-lg">Ready when you are</h3>
            <p className="mt-2 text-sm text-muted-foreground">Start with a free eligibility review — no CIBIL pull, no obligation.</p>
            <Link href="/eligibility" className="btn-gold mt-4 text-sm">Start Free Eligibility Review <ArrowRight className="h-4 w-4" /></Link>
            <a href={`tel:${CONTACT.phoneRaw}`} className="mt-3 flex items-center gap-2 text-sm text-primary hover:text-gold"><Phone className="h-4 w-4" />{CONTACT.phone}</a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
