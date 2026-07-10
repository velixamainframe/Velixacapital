import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { AffiliateDisclosure, SoftwareLogo, StarRating } from "@/components/site/affiliate-disclosure";
import { SOFTWARE_PRODUCTS, SOFTWARE_CATEGORIES } from "@/lib/software-data";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare Software Tools — Tax, Accounting, CRM, PM | Velixa Capital",
  description:
    "Side-by-side comparison of 8 finance and ops software tools: ClearTax, Tally, Zoho Books, QuickBooks, HubSpot, Freshsales, Monday, ClickUp. Pricing, deployment, country focus, free trial.",
  alternates: { canonical: "/software/compare" },
  openGraph: {
    title: "Software Comparison Matrix — Velixa Capital",
    description:
      "Compare 8 vetted software tools side-by-side: pricing, deployment, free trial, country focus and ratings.",
    url: "/software/compare",
  },
};

export default function SoftwareComparePage() {
  return (
    <SiteShell>
      <AffiliateDisclosure />
      <header className="bg-primary py-14 text-primary-foreground md:py-18">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/software" className="hover:text-gold">
              Software
            </Link>{" "}
            / <span className="text-primary-foreground/90">Compare</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            Comparison matrix
          </p>
          <h1 className="mt-3 font-display text-4xl leading-[1.1] md:text-5xl">
            Compare 8 software tools side-by-side.
          </h1>
          <p className="mt-5 max-w-2xl text-primary-foreground/85">
            A single matrix for the four categories Indian finance, sales and operations teams evaluate — pricing,
            deployment, country focus and free-trial availability. Click any row to read the full product breakdown.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {SOFTWARE_CATEGORIES.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="rounded-full border border-primary-foreground/20 px-3.5 py-1.5 text-xs font-semibold text-primary-foreground/85 hover:border-gold hover:text-gold"
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <section className="py-12 md:py-14">
        <div className="container-edge">
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[820px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-left">
                  <th className="p-4 font-display text-base">Product</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Vendor</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rating</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Starting price</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deployment</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Country</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Free trial</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Visit</th>
                </tr>
              </thead>
              <tbody>
                {SOFTWARE_PRODUCTS.map((p) => (
                  <tr
                    key={p.slug}
                    id={p.category}
                    className="border-b border-border last:border-b-0 hover:bg-muted/30"
                  >
                    <td className="p-4 align-middle">
                      <Link
                        href={`/software/${p.category}/${p.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <SoftwareLogo text={p.logoText} color={p.logoColor} size={36} />
                        <span className="font-medium group-hover:text-gold">{p.name}</span>
                      </Link>
                    </td>
                    <td className="p-4 align-middle text-xs text-muted-foreground">{p.vendor}</td>
                    <td className="p-4 align-middle">
                      <Link
                        href={`/software/${p.category}`}
                        className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-foreground hover:bg-gold/15 hover:text-gold"
                      >
                        {p.categoryLabel}
                      </Link>
                    </td>
                    <td className="p-4 align-middle">
                      <StarRating rating={p.rating} count={p.reviewCount} />
                    </td>
                    <td className="p-4 align-middle text-xs">{p.startingPrice}</td>
                    <td className="p-4 align-middle text-xs">{p.deployment}</td>
                    <td className="p-4 align-middle text-xs">{p.countryFocus}</td>
                    <td className="p-4 align-middle">
                      {p.freeTrial ? (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-700">
                          Yes
                        </span>
                      ) : (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">No</span>
                      )}
                    </td>
                    <td className="p-4 align-middle">
                      <a
                        href={p.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-gold"
                      >
                        Visit <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Pricing and feature data reflect public vendor information at the time of writing and may change without
            notice. Affiliate links may earn Velixa Capital a small commission at no extra cost to you.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-14">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />
            Not sure which to pick?
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Talk to a Velixa advisor.</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            We help funded clients choose and onboard the right finance stack — Tally to Zoho migration, GST automation,
            CRM setup, project-ops templates. Tell us your team size and current pain — we&apos;ll recommend the right
            combination.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-gold">
              Get a custom recommendation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/software" className="btn-outline">
              Back to marketplace
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SOFTWARE_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/software/${c.slug}`}
                className="group rounded-xl border border-border bg-card p-5 transition hover:border-gold/50"
              >
                <h3 className="font-display text-base">{c.label}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{c.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary group-hover:text-gold">
                  Browse {SOFTWARE_PRODUCTS.filter((p) => p.category === c.slug).length} tools{" "}
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
