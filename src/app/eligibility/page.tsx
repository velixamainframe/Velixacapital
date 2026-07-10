import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { LeadForm } from "@/components/site/lead-form";
import { ShieldCheck, Clock, Lock, Gauge } from "lucide-react";

export const metadata: Metadata = {
  title: "Check Your Loan Eligibility — Free, 60 Seconds | Velixa Capital",
  description:
    "Free loan eligibility check — no impact on credit score. A senior Velixa Capital advisor reviews your profile and tells you what you can realistically borrow.",
  alternates: { canonical: "/eligibility" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Loan Eligibility Check — Free | Velixa Capital",
    description:
      "Free eligibility check in 60 seconds. No impact on credit score. Free for all profiles.",
    url: "/eligibility",
  },
};

const PROMISES = [
  {
    icon: Clock,
    title: "60-second review",
    body: "Share your basics — a senior advisor reads it within one business day and tells you what's realistic.",
  },
  {
    icon: ShieldCheck,
    title: "No CIBIL pull",
    body: "Your credit score stays untouched until we agree in writing to approach a specific lender.",
  },
  {
    icon: Lock,
    title: "Encrypted & private",
    body: "Your PAN, mobile, email and financial data are AES-256-GCM encrypted. Never shared without consent.",
  },
  {
    icon: Gauge,
    title: "Honest eligibility",
    body: "We tell you what you can realistically borrow — not what sounds good. Better to know now than after 4 rejections.",
  },
];

export default function EligibilityPage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            / <span className="text-primary-foreground/90">Eligibility Check</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            Free eligibility review
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-5xl">
            Check your loan eligibility — <em className="not-italic text-gold">free, in 60 seconds.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
            Share your basics. A senior advisor will read your profile, look at what's realistic, and tell you exactly
            what you can borrow — at what rate, from which lender, and what to fix first if the answer isn't yet what
            you need.
          </p>
        </div>
      </section>

      {/* LEAD FORM + PROMISES */}
      <section className="py-16">
        <div className="container-edge grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <p className="eyebrow">
              <span className="gold-line" />
              Why this matters
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              Most borrowers lose eligibility to unnecessary CIBIL enquiries.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              Every portal you submit to pulls your CIBIL — and 6+ hard enquiries in 6 months triggers automatic
              decline at most lenders. The smart move is a single, deliberate enquiry to the right lender — after your
              file is ready.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {PROMISES.map((p) => (
                <div key={p.title} className="rounded-2xl border border-border bg-card p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <p.icon className="h-4 w-4 text-gold" />
                  </span>
                  <h3 className="mt-3 font-display text-base">{p.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-gold/30 bg-gold/5 p-4 text-xs text-muted-foreground">
              <strong className="text-foreground">Good to know:</strong> This page is set to{" "}
              <code className="rounded bg-muted px-1.5 py-0.5">noindex,nofollow</code> to keep your engagement private
              and avoid duplicate-content issues with our public loan product pages.
            </div>
          </div>
          <div className="lg:sticky lg:top-24">
            <LeadForm
              title="Eligibility check"
              subtitle="No impact on credit score. Free for all profiles."
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
