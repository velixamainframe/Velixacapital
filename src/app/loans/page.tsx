import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { ServiceCard } from "@/components/site/service-card";
import { LOANS, GOVT_SCHEME_DISCLAIMER } from "@/lib/site-data";
import { GOVT_SCHEMES } from "@/lib/govt-schemes-data";
import { ArrowRight, Landmark, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "14 Loan Products — Retail, Business & Asset Finance | Velixa Capital",
  description:
    "Compare personal, home, business, vehicle, machinery and balance-transfer loans from 40+ partner banks & NBFCs. Indicative rates from 8.00%* p.a. — final at lender's discretion.",
  alternates: { canonical: "/loans" },
  openGraph: {
    title: "All Loan Services — Velixa Capital",
    description: "14 loan products across Retail, Business & Asset Finance categories.",
    url: "/loans",
  },
};

const CATEGORIES: { id: string; title: string; description: string; slugs: string[] }[] = [
  {
    id: "retail",
    title: "Retail Loans",
    description:
      "Personal, home and consumer-asset funding for salaried & self-employed individuals.",
    slugs: ["personal-loan", "home-loan", "used-auto-loan", "salary-overdraft", "balance-transfer"],
  },
  {
    id: "business",
    title: "Business & SME",
    description:
      "Working-capital, term and overdraft facilities for MSMEs, traders and growing companies.",
    slugs: [
      "business-loan",
      "business-overdraft",
      "term-loan",
      "overdraft-facility",
      "loan-against-property",
    ],
  },
  {
    id: "asset",
    title: "Asset & Infrastructure",
    description:
      "Commercial vehicles, machinery, equipment and asset-refinance for fleets and manufacturers.",
    slugs: [
      "commercial-vehicle-loan",
      "equipment-machinery-loan",
      "commercial-equipment-loan",
      "refinance",
    ],
  },
];

export default function LoansIndexPage() {
  const bySlug = new Map(LOANS.map((l) => [l.slug, l]));

  return (
    <SiteShell>
      <header className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container-edge">
          <Link href="/" className="text-sm text-primary-foreground/70 hover:text-gold">
            ← Back to home
          </Link>
          <p className="eyebrow mt-4 text-primary-foreground/70">
            <span className="gold-line" />Loan services
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.1] md:text-6xl">
            14 loan products, <em className="italic text-gold">3 clear categories</em>.
          </h1>
          <p className="mt-5 max-w-2xl text-primary-foreground/80">
            From unsecured personal loans to ₹1 Cr+ business funding, LAP, vehicle and equipment
            finance — we compare 40+ partner banks &amp; NBFCs and bring you the best fit. All rates
            marked with * are indicative and finalised at the lender&apos;s sole discretion.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="rounded-full border border-primary-foreground/20 px-4 py-1.5 text-xs font-semibold text-primary-foreground/85 hover:border-gold hover:text-gold"
              >
                {c.title}
              </a>
            ))}
          </div>
        </div>
      </header>

      {CATEGORIES.map((cat, idx) => (
        <section
          key={cat.id}
          id={cat.id}
          className={idx % 2 === 1 ? "border-y border-border bg-muted/40 py-16" : "py-16"}
        >
          <div className="container-edge">
            <p className="eyebrow">
              <span className="gold-line" />Category {idx + 1}
            </p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-display text-3xl md:text-4xl">{cat.title}</h2>
              <span className="text-xs text-muted-foreground">{cat.slugs.length} services</span>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{cat.description}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cat.slugs.map((s) => {
                const l = bySlug.get(s);
                if (!l) return null;
                return (
                  <ServiceCard
                    key={l.slug}
                    to={`/loans/${l.slug}`}
                    image={l.image}
                    eyebrow={l.name}
                    title={l.headline}
                    description={l.short}
                  />
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-border bg-muted/40 py-16">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />
            <Landmark className="-mt-0.5 mr-1 inline h-3.5 w-3.5" />
            Government schemes
          </p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl md:text-4xl">Govt. Business Loan Schemes</h2>
            <Link
              href="/loans/govt-schemes"
              className="text-sm font-medium text-primary inline-flex items-center gap-1"
            >
              View all schemes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Margin-money subsidy, collateral-free guarantees and interest subvention —
            central-government schemes that lower the cost of borrowing for MSMEs and entrepreneurs.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {GOVT_SCHEMES.map((s) => (
              <div
                key={s.slug}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elegant)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Landmark className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg">{s.name.split("—")[0].trim()}</h3>
                <p className="mt-2 flex-1 text-xs text-muted-foreground">{s.short}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link
                    href="/eligibility"
                    className="rounded-md border border-border bg-background px-3 py-2 text-center text-xs font-semibold hover:border-primary/40"
                  >
                    Check Eligibility
                  </Link>
                  <a
                    href={s.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 rounded-md bg-gold px-3 py-2 text-center text-xs font-bold text-gold-foreground hover:opacity-90"
                  >
                    Apply Now <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <Link
                  href={`/loans/govt-schemes/${s.slug}`}
                  className="mt-3 text-center text-[11px] text-primary hover:underline"
                >
                  View full details →
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-10 rounded-xl border border-border bg-background p-5 text-xs leading-relaxed text-muted-foreground">
            <strong>Disclaimer:</strong> {GOVT_SCHEME_DISCLAIMER}
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
