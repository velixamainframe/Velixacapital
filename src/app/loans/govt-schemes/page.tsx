import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { GOVT_SCHEMES } from "@/lib/govt-schemes-data";
import { GOVT_SCHEME_DISCLAIMER } from "@/lib/site-data";
import { ArrowRight, Landmark } from "lucide-react";

export const metadata: Metadata = {
  title: "Government Business Loan Schemes — PMEGP, MUDRA, Stand-Up India, SVANidhi, CGTMSE | Velixa Capital",
  description:
    "Apply for India's top Government business loan schemes — PMEGP, MUDRA, Stand-Up India, PM SVANidhi & CGTMSE. Check eligibility, subsidy, documents & apply online.",
  alternates: { canonical: "/loans/govt-schemes" },
  openGraph: {
    title: "Government Business Loan Schemes | Velixa Capital",
    description:
      "Eligibility, subsidy, documents and application guidance for India's top Government business loan schemes.",
    url: "/loans/govt-schemes",
  },
};

export default function GovtSchemesIndexPage() {
  return (
    <SiteShell>
      <header className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container-edge">
          <Link href="/loans" className="text-sm text-primary-foreground/70 hover:text-gold">
            ← All loans
          </Link>
          <p className="eyebrow mt-4 text-primary-foreground/70">
            <span className="gold-line" />
            Government schemes
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.1] md:text-6xl">
            Govt. Business Loan Schemes <em className="italic text-gold">for every entrepreneur</em>.
          </h1>
          <p className="mt-5 max-w-2xl text-primary-foreground/80">
            From margin-money subsidy under PMEGP to collateral-free CGTMSE coverage — we help you
            choose, prepare and apply for the right central-government scheme.
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="container-edge">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GOVT_SCHEMES.map((s) => (
              <div
                key={s.slug}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elegant)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Landmark className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-display text-xl">{s.name.split("—")[0].trim()}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.short}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-[11px]">
                  <span className="rounded-full bg-muted px-2.5 py-1 text-foreground/70">
                    Loan: {s.loanAmount.split(".")[0]}
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Link
                    href="/eligibility"
                    className="rounded-md border border-border bg-background px-3 py-2 text-center text-xs font-medium hover:border-primary/40"
                  >
                    Check Eligibility
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-1 rounded-md bg-primary px-3 py-2 text-center text-xs font-medium text-primary-foreground hover:opacity-90"
                  >
                    Request Guidance <ArrowRight className="h-3 w-3" />
                  </Link>
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

          <p className="mt-10 rounded-xl border border-border bg-muted/40 p-5 text-xs leading-relaxed text-muted-foreground">
            <strong>Disclaimer:</strong> {GOVT_SCHEME_DISCLAIMER}
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
