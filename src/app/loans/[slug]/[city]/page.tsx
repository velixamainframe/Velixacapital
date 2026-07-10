import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-shell";
import { LeadForm } from "@/components/site/lead-form";
import { EMICalculator } from "@/components/site/emi-calculator";
import { LOANS, RATES_DISCLAIMER } from "@/lib/site-data";
import { CITIES, getCity } from "@/lib/cities";
import { CheckCircle2 } from "lucide-react";

type Params = { slug: string; city: string };

// Prerender a subset (14 loans × 8 tier-1 cities) for a sane build.
// Any other valid loan+city combo is still server-rendered on demand.
const TIER1 = CITIES.filter((c) => c.tier === 1);

export function generateStaticParams(): Params[] {
  const out: Params[] = [];
  for (const l of LOANS) {
    for (const c of TIER1) {
      out.push({ slug: l.slug, city: c.slug });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, city } = await params;
  const l = LOANS.find((x) => x.slug === slug);
  const c = getCity(city);
  if (!l || !c) return { title: "Page not found" };
  return {
    title: `${l.name} in ${c.name} — Apply Online | Velixa Capital`,
    description: `Get the best ${l.name.toLowerCase()} in ${c.name}, ${c.state}. Quick approval, competitive rates from top banks & NBFCs. Free eligibility check.`,
    alternates: { canonical: `/loans/${l.slug}/${c.slug}` },
    openGraph: {
      title: `${l.name} in ${c.name} | Velixa Capital`,
      description: `${l.short} Available across ${c.name}.`,
      url: `/loans/${l.slug}/${c.slug}`,
    },
  };
}

export default async function CityLoanPage({ params }: { params: Promise<Params> }) {
  const { slug, city } = await params;
  const loan = LOANS.find((l) => l.slug === slug);
  const cityObj = getCity(city);
  if (!loan || !cityObj) notFound();

  const whyVelixa = [
    `Local servicing in ${cityObj.name}`,
    "40+ partner banks & NBFCs",
    "Doorstep documentation pickup",
    "Pre-approval eligibility check",
    "Transparent rates & fees",
    "End-to-end disbursal support",
  ];

  return (
    <SiteShell>
      <header className="bg-primary py-16 text-primary-foreground">
        <div className="container-edge">
          <Link
            href={`/loans/${loan.slug}`}
            className="text-sm text-primary-foreground/70 hover:text-gold"
          >
            ← Back to {loan.name}
          </Link>
          <p className="eyebrow mt-4 text-primary-foreground/70">
            <span className="gold-line" />
            Tier {cityObj.tier} city · {cityObj.state}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-[1.1] md:text-5xl">
            {loan.name} in {cityObj.name}
          </h1>
          <p className="mt-5 max-w-2xl text-primary-foreground/80">
            Looking for {loan.name.toLowerCase()} in {cityObj.name}? Velixa Capital partners with
            40+ banks and NBFCs serving {cityObj.name} and surrounding areas across {cityObj.state}{" "}
            — quick approvals, transparent fees and a dedicated relationship manager.
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="container-edge grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-3xl">Why apply through Velixa in {cityObj.name}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {whyVelixa.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-2 rounded-lg border border-border bg-card p-4 text-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" /> {t}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <p className="eyebrow">
                <span className="gold-line" />EMI calculator
              </p>
              <h3 className="mt-2 font-display text-2xl">Plan your repayment</h3>
              <div className="mt-4 rounded-2xl border border-border bg-card p-5 md:p-7">
                <EMICalculator
                  loanName={loan.name}
                  defaultRate={loan.defaultRate}
                  maxRate={Math.max(loan.maxRate, 40)}
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{RATES_DISCLAIMER}</p>
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-xl">About {loan.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {loan.description}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {loan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm
              service={`${loan.name} — ${cityObj.name}`}
              title={`Apply in ${cityObj.name}`}
              subtitle="Free eligibility check. Quote within 24 hours."
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
