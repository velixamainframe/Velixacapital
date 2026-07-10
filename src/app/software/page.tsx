import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { AffiliateDisclosure } from "@/components/site/affiliate-disclosure";
import { SoftwareCard } from "@/components/site/software-card";
import { SOFTWARE_PRODUCTS, SOFTWARE_CATEGORIES } from "@/lib/software-data";
import { ArrowRight, LayoutGrid, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Software Marketplace — Tax, Accounting, CRM & Project Tools | Velixa Capital",
  description:
    "Compare 8 vetted software tools for Indian MSMEs and professionals — ClearTax, Tally Prime, Zoho Books, QuickBooks, HubSpot, Freshsales, Monday.com, ClickUp. Real ratings, pricing, deployment, free-trial info.",
  alternates: { canonical: "/software" },
  openGraph: {
    title: "Software Marketplace — Velixa Capital",
    description:
      "Pick the right software for tax, books, CRM and project ops — without the SaaS overwhelm.",
    url: "/software",
  },
};

export default function SoftwareIndexPage() {
  return (
    <SiteShell>
      <AffiliateDisclosure />
      <header className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            / <span className="text-primary-foreground/90">Software</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            Software Marketplace
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-5xl">
            Pick the right software for tax, books, CRM, and project ops — without the SaaS overwhelm.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
            We evaluate 8 compliance, accounting, CRM and project-management platforms against real Indian finance
            workflows — so you skip the trial-and-error, avoid overlapping subscriptions, and pick the stack that fits
            your team and your scale.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/software/compare" className="btn-gold">
              Open comparison matrix <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn-outline-ivory">
              Get a custom recommendation
            </Link>
          </div>
        </div>
      </header>

      <section className="py-14 md:py-16">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />
            <LayoutGrid className="-mt-0.5 mr-1 inline h-3.5 w-3.5" />
            Browse by category
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Find your category</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Each category page lists every product we&apos;ve evaluated with ratings, deployment options and starting
            prices — no marketing fluff, no upsells.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SOFTWARE_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/software/${c.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-elegant)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15 text-gold">
                    <LayoutGrid className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-gold" />
                </div>
                <h3 className="mt-4 font-display text-lg">{c.label}</h3>
                <p className="mt-2 flex-1 text-xs text-muted-foreground">{c.description}</p>
                <span className="mt-4 text-[11px] font-medium uppercase tracking-widest text-primary">
                  {SOFTWARE_PRODUCTS.filter((p) => p.category === c.slug).length} products
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-14 md:py-16">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />
            <Search className="-mt-0.5 mr-1 inline h-3.5 w-3.5" />
            All products
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-3xl md:text-4xl">Every tool we&apos;ve evaluated</h2>
            <span className="text-xs text-muted-foreground">{SOFTWARE_PRODUCTS.length} products · 4 categories</span>
          </div>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            All ratings and pricing reflect publicly available information at the time of writing. Pricing changes
            frequently — verify the latest on the vendor&apos;s site via the affiliate links on each product page.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SOFTWARE_PRODUCTS.map((p) => (
              <SoftwareCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
