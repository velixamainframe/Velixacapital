"use client";

import Link from "next/link";
import { SiteShell } from "./site-shell";
import { AffiliateDisclosure } from "./affiliate-disclosure";
import { SoftwareCard } from "./software-card";
import { SOFTWARE_PRODUCTS, getCategory, type SoftwareCategorySlug } from "@/lib/software-data";

export function SoftwareCategoryPage({ slug }: { slug: SoftwareCategorySlug }) {
  const cat = getCategory(slug);
  const products = SOFTWARE_PRODUCTS.filter((p) => p.category === slug);
  return (
    <SiteShell>
      <AffiliateDisclosure />
      <header className="bg-primary py-14 text-primary-foreground md:py-18">
        <div className="container-edge">
          <nav className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">Home</Link> / <Link href="/software" className="hover:text-gold">Software</Link> / <span>{cat?.label}</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70"><span className="gold-line" />Software Marketplace</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{cat?.label ?? "Software"}</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/85">{cat?.description ?? "Evaluated tools for finance teams."}</p>
        </div>
      </header>
      <section className="py-14">
        <div className="container-edge">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => <SoftwareCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
