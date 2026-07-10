import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-shell";
import { LeadForm } from "@/components/site/lead-form";
import { EMICalculator } from "@/components/site/emi-calculator";
import { LOANS, RATES_DISCLAIMER } from "@/lib/site-data";
import { CITIES } from "@/lib/cities";
import { CheckCircle2, ArrowRight, MapPin, FileText, BadgeCheck, Receipt } from "lucide-react";
import type { ReactNode } from "react";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return LOANS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = LOANS.find((x) => x.slug === slug);
  if (!l) return { title: "Loan not found" };
  return {
    title: `${l.name} — Best Rates, Eligibility & Documents | Velixa Capital`,
    description: `${l.short} Apply online — eligibility, documents, fees and interest rates compared across 40+ banks & NBFCs.`,
    keywords: l.seoKeywords,
    alternates: { canonical: `/loans/${l.slug}` },
    openGraph: {
      title: `${l.name} | Velixa Capital`,
      description: l.short,
      url: `/loans/${l.slug}`,
    },
  };
}

export default async function LoanDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const loan = LOANS.find((l) => l.slug === slug);
  if (!loan) notFound();

  const related = LOANS.filter((l) => l.slug !== loan.slug).slice(0, 4);

  return (
    <SiteShell>
      <header className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container-edge grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <Link href="/loans" className="text-sm text-primary-foreground/70 hover:text-gold">
              ← All loans
            </Link>
            <p className="eyebrow mt-4 text-primary-foreground/70">
              <span className="gold-line" />
              {loan.name}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-[1.1] md:text-5xl">{loan.headline}</h1>
            <p className="mt-5 max-w-xl text-primary-foreground/80">{loan.description}</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {loan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-primary-foreground/90">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" /> {f}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs uppercase tracking-widest text-primary-foreground/70">
              Interest from{" "}
              <span className="font-display text-xl text-gold not-italic normal-case tracking-normal">
                {loan.defaultRate}%{loan.rateMark ?? ""} p.a.
              </span>
            </p>
            {loan.rateMark === "*" && (
              <p className="mt-1 text-[11px] text-primary-foreground/60">
                *Starting rate, subject to lender approval, credit profile &amp; loan amount. T&amp;C apply.
              </p>
            )}
          </div>
          <div className="overflow-hidden rounded-2xl border border-primary-foreground/15">
            <img
              src={loan.image}
              alt={loan.name}
              className="h-72 w-full object-cover"
            />
          </div>
        </div>
      </header>

      <section className="py-16">
        <div className="container-edge grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-10">
            <div>
              <p className="eyebrow">
                <span className="gold-line" />EMI calculator
              </p>
              <h2 className="mt-2 font-display text-2xl">Plan your repayment</h2>
              <div className="mt-4 rounded-2xl border border-border bg-card p-5 md:p-7">
                <EMICalculator
                  loanName={loan.name}
                  defaultRate={loan.defaultRate}
                  maxRate={Math.max(loan.maxRate, 40)}
                  defaultYears={Math.min(20, Math.max(3, Math.round(loan.maxRate / 2)))}
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{RATES_DISCLAIMER}</p>
            </div>

            <DetailCard icon={<BadgeCheck className="h-5 w-5" />} title="Eligibility criteria" items={loan.eligibility} />
            <DetailCard icon={<FileText className="h-5 w-5" />} title="Documents required" items={loan.documents} />

            <article className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Receipt className="h-5 w-5" />
                </div>
                <h2 className="font-display text-2xl">Fees &amp; charges</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{loan.fees}</p>
            </article>

            <div>
              <h2 className="font-display text-3xl">Why route through Velixa</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Lowest rates from 40+ banks & NBFCs",
                  "Single-window documentation",
                  "Dedicated relationship manager",
                  "Transparent fee disclosure",
                  "Pre-approval eligibility checks",
                  "Post-disbursal servicing support",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 rounded-lg border border-border bg-card p-4 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm
              service={loan.name}
              title={`Apply for ${loan.name}`}
              subtitle="Free eligibility check. Quote within 24 hours."
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-16">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />
            <MapPin className="-mt-0.5 mr-1 inline h-3.5 w-3.5" />
            Available across India
          </p>
          <h2 className="mt-2 font-display text-2xl">{loan.name} in your city</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {CITIES.slice(0, 24).map((c) => (
              <Link
                key={c.slug}
                href={`/loans/${loan.slug}/${c.slug}`}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs hover:border-primary/40 hover:bg-background"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background py-16">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />Explore more
          </p>
          <h2 className="mt-2 font-display text-3xl">Other loan products</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/loans/${r.slug}`}
                className="group rounded-xl border border-border bg-card p-5 hover:border-primary/30"
              >
                <p className="font-display text-lg">{r.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{r.short}</p>
                <p className="mt-3 inline-flex items-center gap-1 text-xs text-primary">
                  Learn more <ArrowRight className="h-3 w-3" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function DetailCard({ icon, title, items }: { icon: ReactNode; title: string; items: string[] }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold">
          {icon}
        </div>
        <h2 className="font-display text-2xl">{title}</h2>
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" /> {it}
          </li>
        ))}
      </ul>
    </article>
  );
}
