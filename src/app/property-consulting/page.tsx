import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { LeadForm } from "@/components/site/lead-form";
import { PROPERTY_SERVICES, itemSlug } from "@/lib/site-data";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Property Advisory & Transaction Assistance — Velixa Capital",
  description:
    "Independent property advisory for Indian home buyers, investors and NRIs — financing, market assessment, investment analysis, documentation and transaction support. We are not a RERA-registered brokerage.",
  alternates: { canonical: "/property-consulting" },
  openGraph: {
    title: "Property Advisory — Velixa Capital",
    description:
      "Financing, evaluation, documentation and investment analysis for residential and commercial property. Independent advisory — no brokerage, no listings.",
    url: "/property-consulting",
  },
};

export default function PropertyConsultingHubPage() {
  const items = PROPERTY_SERVICES.items;

  return (
    <SiteShell>
      <header className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            / <span className="text-primary-foreground/90">Property Advisory</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            Property Advisory
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-5xl">{PROPERTY_SERVICES.title}</h1>
          <p className="mt-5 max-w-2xl text-base text-primary-foreground/85 md:text-lg">{PROPERTY_SERVICES.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#services" className="btn-gold">
              Explore services <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/contact" className="btn-outline-ivory">
              Talk to an advisor
            </Link>
          </div>
        </div>
      </header>

      <section className="border-b border-amber-500/20 bg-amber-50 px-4 py-3 text-[12px] leading-relaxed text-amber-900">
        <div className="container-edge flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <span>
            <strong className="font-semibold">Important:</strong> Velixa Capital is not a RERA-registered real-estate
            brokerage. We do not list, market, or sell property. Our role is independent advisory and transaction
            assistance for properties you have already identified. Loan sanctions, approvals and valuations are at the
            sole discretion of the respective lenders and authorities.
          </span>
        </div>
      </section>

      <section id="services" className="py-14 md:py-16">
        <div className="container-edge grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <p className="eyebrow">
              <span className="gold-line" />
              Services
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Pick the engagement you need.</h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              Advisory fees are disclosed in writing upfront — no brokerage, no hidden commissions from developers or
              sellers. Click any service for the full scope, process, documents, fees and timeline.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {items.map((item) => {
                const slug = itemSlug(item);
                const pricing =
                  item.pricing ??
                  (item.bullets && item.bullets.length > 0 ? item.bullets[0] : "Custom quote on request");
                return (
                  <Link
                    key={slug}
                    href={`/property-consulting/${slug}`}
                    className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-soft)]"
                  >
                    <h3 className="font-display text-base leading-tight">{item.name}</h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                    <div className="mt-4 rounded-lg bg-muted/60 px-3 py-2 text-[11px] leading-relaxed text-foreground/80">
                      <span className="font-semibold text-gold">Fees:</span> {pricing}
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:text-gold">
                      View full details <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-6">
              <h3 className="font-display text-lg">What we do — and what we don&apos;t</h3>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">We do</p>
                  <ul className="mt-2 space-y-2 text-sm">
                    {[
                      "Affordability & financing analysis",
                      "Home-loan comparison and facilitation support",
                      "Documentation review and verification guidance",
                      "Investment, yield and post-tax cash-flow analysis",
                      "Capital-gains, FEMA and NRI-repatriation advisory",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-600">We don&apos;t</p>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    {[
                      "List, market or sell property",
                      "Act as a RERA-registered broker",
                      "Take brokerage from developers or sellers",
                      "Recommend specific projects or stock",
                      "Guarantee loan approval or property valuation",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-3 w-3 shrink-0 rounded-full border border-red-400 text-center text-[10px] leading-none text-red-500">
                          ×
                        </span>{" "}
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm
              formVariant="property"
              title="Property advisory consultation"
              subtitle="Tell us your requirement (buy / sell / rent / invest) — an advisor responds within 24 hours."
            />
            <div className="mt-4 rounded-2xl border border-border bg-muted/30 p-5 text-xs text-muted-foreground">
              <p className="font-medium text-foreground">Independent advisory only</p>
              <p className="mt-2">
                We are{" "}
                <strong className="text-foreground">not a RERA-registered brokerage</strong> and we do not list or sell
                property. Engagements begin with a written fee disclosure — no hidden commissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-14">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />
            Explore related advisory
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Standalone property advisory guides</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Long-form advisory pages for property financing, investment and structuring decisions.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { to: "/property-finance", title: "Property Finance" },
              { to: "/property-funding", title: "Property Funding" },
              { to: "/lease-rental-discounting", title: "Lease Rental Discounting" },
              { to: "/commercial-property-finance", title: "Commercial Property Finance" },
              { to: "/property-investment-advisory", title: "Property Investment Advisory" },
            ].map((a) => (
              <Link
                key={a.to}
                href={a.to}
                className="group rounded-xl border border-border bg-card p-5 transition hover:border-gold/50"
              >
                <h3 className="font-display text-base">{a.title}</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary group-hover:text-gold">
                  Read guide <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
