import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { PARTNER_BANKS } from "@/lib/site-data";
import { ArrowRight, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Partner Banks & NBFCs — Velixa Capital Lender Network",
  description:
    "Velixa Capital is an authorized channel partner with 12+ leading Indian banks and NBFCs — HDFC, ICICI, Axis, Kotak, Bajaj, Tata Capital, Piramal and more.",
  alternates: { canonical: "/partner-banks" },
  openGraph: {
    title: "Partner Banks & NBFCs — Velixa Capital",
    description:
      "Backed by India's leading lenders. Authorized channel partner with 12+ banks and NBFCs across India.",
    url: "/partner-banks",
  },
};

export default function PartnerBanksPage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            / <span className="text-primary-foreground/90">Partner Banks</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            Lender network
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-5xl">
            Backed by India's leading lenders.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
            We are an authorized channel partner with {PARTNER_BANKS.length} leading banks and NBFCs, plus regional
            banks and NBFCs across India. Your file moves through official credit channels — not bounced across
            aggregators.
          </p>
        </div>
      </section>

      {/* BANK GRID */}
      <section className="py-16">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />
            Authorized partners
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Our lender network.</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Each lender has its own credit policy, sector appetite and rate card. We pre-screen your file against the
            real policy of the lender whose box you fit — not all of them.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNER_BANKS.map((bank) => (
              <div
                key={bank}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-gold/50 hover:shadow-[var(--shadow-soft)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-bold text-gold">
                  {bank.slice(0, 1)}
                </span>
                <div>
                  <h3 className="font-display text-base leading-tight">{bank}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Building2 className="h-3 w-3" /> Authorized partner
                  </p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-4 rounded-2xl border border-dashed border-gold/40 bg-gold/5 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-lg font-bold text-gold">
                +
              </span>
              <div>
                <h3 className="font-display text-base leading-tight">Several other regional banks and NBFCs</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Including state-level co-operative banks, SFBs and specialist NBFCs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER + CTA */}
      <section className="bg-muted/40 py-14">
        <div className="container-edge max-w-3xl text-center">
          <p className="text-sm text-muted-foreground">
            Velixa Capital is a loan & finance consultant — not a lender, bank or NBFC. Loan approval, interest rate,
            credit limit, fees and all other terms are at the sole discretion of the partner institution. We do not
            guarantee any approval. Our role is diagnostic — to improve the probability and the quality of the offer.
          </p>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container-edge flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-primary-foreground/70">
              <span className="gold-line" />
              Ready to start
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              Let's match your file to the right lender — not all of them.
            </h2>
            <p className="mt-3 max-w-xl text-primary-foreground/80">
              Share your profile. A senior advisor will diagnose it and tell you which 1–2 lenders fit, with the rate
              you can realistically expect.
            </p>
          </div>
          <Link href="/contact" className="btn-gold shrink-0">
            Talk to an advisor <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
