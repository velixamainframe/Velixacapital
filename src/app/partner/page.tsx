import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { PartnerApplicationForm } from "@/components/site/partner-application-form";
import { ArrowRight, IndianRupee, Building2, Headphones, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Become a Channel Partner — Earn With Velixa Capital",
  description:
    "Partner with Velixa Capital — high payouts, 40+ lender access, full back-office support. For agents, CAs, real-estate brokers, wealth advisors and finance professionals across India.",
  alternates: { canonical: "/partner" },
  openGraph: {
    title: "Become a Channel Partner — Velixa Capital",
    description:
      "Earn with Velixa Capital. High payouts, 40+ lender access, full back-office support. Apply now.",
    url: "/partner",
  },
};

const PILLARS = [
  {
    icon: IndianRupee,
    title: "High payouts",
    body:
      "Industry-leading commission structure with transparent slab-based payouts. Get paid on every sanctioned file — not just disbursed ones. Monthly settlement, no claw-back surprises.",
  },
  {
    icon: Building2,
    title: "40+ lender access",
    body:
      "One relationship, 40+ lender doors. Banks, NBFCs, fintechs and HFCs — your client's file gets matched to the right-fit lender, not the highest-paying one.",
  },
  {
    icon: Headphones,
    title: "Full back-office",
    body:
      "We handle credit diagnosis, documentation, lender follow-up, sanction coordination and disbursal tracking. You focus on relationships; we run the file.",
  },
];

const PARTNER_TYPES = [
  "Insurance agents & MF distributors",
  "Chartered Accountants & tax practitioners",
  "Real-estate brokers & property advisors",
  "Wealth advisors & financial planners",
  "Loan DSA / channel partners looking for a better home",
  "Freelance sales professionals with a strong local network",
  "Ex-bankers & credit managers",
  "E-commerce / D2C ecosystem operators",
];

const WHAT_YOU_GET = [
  "Co-branded partner portal with file-tracking, status updates & commission ledger",
  "Single point of contact — a dedicated partner relationship manager",
  "Pre-screened files before any lender submission (no wasted CIBIL enquiries)",
  "Marketing collateral, loan-product training and lender-policy updates",
  "Weekly lender-policy briefings so you know what's approving today",
  "Transparent monthly settlement with downloadable payout statements",
];

export default function PartnerPage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            / <span className="text-primary-foreground/90">Partner</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            Channel partner program
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-5xl">
            Become a Channel Partner — <em className="not-italic text-gold">Earn With Velixa Capital</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
            If you already have a network of business owners, professionals or property investors — Velixa gives you
            the lender access, back-office team and infrastructure to monetise it without building your own credit
            team.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#apply" className="btn-gold">
              Apply now <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/contact" className="btn-outline-ivory">
              Talk to partner team
            </Link>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-16">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />
            Why partner with us
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Three reasons partners stay.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-gold/50 hover:shadow-[var(--shadow-soft)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <p.icon className="h-5 w-5 text-gold" />
                </span>
                <h3 className="mt-4 font-display text-lg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE PARTNER WITH */}
      <section className="bg-muted/40 py-16">
        <div className="container-edge grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="eyebrow">
              <span className="gold-line" />
              Who we partner with
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Built for finance professionals.</h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              If you have a network and want to monetise it without building an in-house credit team, this is for you.
            </p>
            <ul className="mt-6 space-y-3">
              {PARTNER_TYPES.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-foreground/85">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
            <p className="eyebrow">
              <span className="gold-line" />
              What you get
            </p>
            <h3 className="mt-3 font-display text-xl text-gold">Full Velixa infrastructure — under your brand.</h3>
            <ul className="mt-5 space-y-3">
              {WHAT_YOU_GET.map((g) => (
                <li key={g} className="flex items-start gap-2 text-sm text-foreground/85">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="py-16 md:py-20">
        <div className="container-edge grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="eyebrow">
              <span className="gold-line" />
              Apply
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Ready to partner with Velixa?</h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              Fill in the application on the right. Our partner-onboarding team reviews every application personally
              and responds within 48 hours.
            </p>
            <div className="mt-6 rounded-xl border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                What we look for
              </p>
              <ul className="mt-3 space-y-2 text-sm text-foreground/85">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  An existing network of business owners, professionals or investors
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  Willingness to learn lender-policy basics (we train you)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  Long-term mindset — we grow when our partners grow
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  Clean professional record (PAN verification required)
                </li>
              </ul>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Questions before applying? Email{" "}
              <a href="mailto:hello@velixacapital.com" className="text-gold hover:underline">
                hello@velixacapital.com
              </a>{" "}
              or call +91 95829 14054.
            </p>
          </div>
          <PartnerApplicationForm />
        </div>
      </section>
    </SiteShell>
  );
}
