"use client";

import Link from "next/link";
import { SiteShell } from "./site-shell";
import { AffiliateDisclosure, AffiliateButton, SoftwareLogo, StarRating } from "./affiliate-disclosure";
import { CheckCircle2, XCircle, ArrowRight, Zap } from "lucide-react";
import type { SoftwareProduct } from "@/lib/software-data";
import { SOFTWARE_PRODUCTS } from "@/lib/software-data";

type Props = { p: SoftwareProduct; headline: string };

export function SoftwareProductPage({ p, headline }: Props) {
  const others = SOFTWARE_PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 4);
  return (
    <SiteShell>
      <AffiliateDisclosure />
      <div className="border-b border-border bg-muted/30 lg:hidden">
        <div className="container-edge flex items-center justify-between py-3">
          <span className="text-sm font-medium">{p.startingPrice}</span>
          <AffiliateButton href={p.affiliateUrl} className="text-sm">Visit {p.vendor} →</AffiliateButton>
        </div>
      </div>

      <header className="py-12 md:py-16">
        <div className="container-edge">
          <nav className="mb-5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link> / <Link href="/software" className="hover:text-foreground">Software</Link> / <Link href={`/software/${p.category}`} className="hover:text-foreground">{p.categoryLabel}</Link> / <span className="text-foreground">{p.name}</span>
          </nav>
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <SoftwareLogo text={p.logoText} color={p.logoColor} size={80} />
            <div className="flex-1">
              <p className="eyebrow">{p.categoryLabel}</p>
              <h1 className="mt-2 font-display text-3xl leading-tight md:text-4xl">{headline}</h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">{p.tagline}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <StarRating rating={p.rating} count={p.reviewCount} />
                <span className="text-sm text-muted-foreground">{p.deployment} · {p.countryFocus}</span>
                {p.freeTrial && <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-700">Free trial available</span>}
              </div>
            </div>
            <div className="hidden md:block">
              <AffiliateButton href={p.affiliateUrl}>Try {p.name}</AffiliateButton>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-gold/15 to-transparent py-8">
        <div className="container-edge flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-2"><Zap className="h-5 w-5 text-gold" /><p className="font-display text-lg">Exclusive via Velixa — funded clients get hands-on onboarding help</p></div>
          <AffiliateButton href={p.affiliateUrl}>Start with {p.name} →</AffiliateButton>
        </div>
      </section>

      <section className="py-14">
        <div className="container-edge grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <p className="eyebrow"><span className="gold-line" />Why teams pick {p.name}</p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl">{p.primaryUseCase}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.fullFeatures.map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{f}</div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                <h3 className="font-display text-base text-emerald-800">Pros</h3>
                <ul className="mt-3 space-y-1.5 text-sm">{p.pros.map((x) => <li key={x} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{x}</li>)}</ul>
              </div>
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
                <h3 className="font-display text-base text-red-800">Cons</h3>
                <ul className="mt-3 space-y-1.5 text-sm">{p.cons.map((x) => <li key={x} className="flex gap-2"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />{x}</li>)}</ul>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-display text-xl">Best fit for</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {p.bestFor.map((b) => <div key={b} className="rounded-xl border border-border bg-card p-4 text-sm">{b}</div>)}
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-xl">Quick facts</h3>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <Fact label="Vendor" value={p.vendor} />
                <Fact label="Starting price" value={p.startingPrice} />
                <Fact label="Deployment" value={p.deployment} />
                <Fact label="Country focus" value={p.countryFocus} />
                <Fact label="Pricing model" value={p.pricingModel} />
                <Fact label="Free trial" value={p.freeTrial ? "Yes" : "No"} />
                <Fact label="Mobile rating" value={`${p.mobileRating}/5`} />
                <Fact label="Support quality" value={`${p.supportQuality}/5`} />
              </dl>
            </div>
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3">
                <SoftwareLogo text={p.logoText} color={p.logoColor} size={48} />
                <div><p className="font-display text-lg">{p.name}</p><div className="mt-0.5"><StarRating rating={p.rating} count={p.reviewCount} /></div></div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Starting at</p>
              <p className="font-display text-2xl text-gold">{p.startingPrice}</p>
              <AffiliateButton href={p.affiliateUrl} className="mt-4 w-full">Visit {p.vendor} →</AffiliateButton>
              {p.keyIntegrations.length > 0 && (
                <>
                  <p className="mt-5 eyebrow">Key integrations</p>
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">{p.keyIntegrations.map((i) => <li key={i}>· {i}</li>)}</ul>
                </>
              )}
              <Link href="/software/compare" className="mt-5 block text-center text-xs text-primary hover:text-gold">Compare with other tools →</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-primary py-12 text-primary-foreground">
        <div className="container-edge flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">Ready to start with {p.name}?</h2>
            <p className="mt-1 text-primary-foreground/80 text-sm">Or talk to us about the right stack for your business.</p>
          </div>
          <div className="flex gap-3">
            <AffiliateButton href={p.affiliateUrl}>Get started →</AffiliateButton>
            <Link href="/contact" className="btn-outline-ivory">Talk to an advisor</Link>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-edge">
          <h2 className="font-display text-2xl">Compare with other tools</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link key={o.slug} href={`/software/${o.category}/${o.slug}`} className="group rounded-xl border border-border bg-card p-4 transition hover:border-gold/50">
                <div className="flex items-center gap-2"><SoftwareLogo text={o.logoText} color={o.logoColor} size={36} /><span className="text-sm font-medium">{o.name}</span></div>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{o.tagline}</p>
                <span className="mt-2 flex items-center gap-1 text-xs text-primary">Compare <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between border-b border-border py-1.5 text-sm"><dt className="text-muted-foreground">{label}</dt><dd className="font-medium">{value}</dd></div>;
}
