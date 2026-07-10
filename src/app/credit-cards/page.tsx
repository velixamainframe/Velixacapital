import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { CreditCardLeadForm } from "@/components/site/credit-card-lead-form";
import {
  CREDIT_CARD_TYPES,
  CREDIT_CARD_BENEFITS,
  CREDIT_CARD_ELIGIBILITY,
  CREDIT_CARD_DISCLAIMER,
} from "@/lib/site-data";
import { listCreditCards } from "@/lib/data";
import { CheckCircle2, ExternalLink, CreditCard, ArrowRight } from "lucide-react";

// Credit card data comes from the database — render at runtime, not build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Best Credit Cards in India 2026 — Types, Benefits, Eligibility | Velixa Capital",
  description:
    "Compare top credit cards from HDFC, ICICI, Axis, SBI, Amex. Cashback, travel, fuel, lifetime-free. See types, benefits, eligibility criteria & documents. Apply online.",
  alternates: { canonical: "/credit-cards" },
  openGraph: {
    title: "Best Credit Cards in India | Velixa Capital",
    description: "Compare types, benefits & eligibility of top Indian credit cards.",
    url: "/credit-cards",
  },
};

export default async function CreditCardsPage() {
  const cards = await listCreditCards();

  return (
    <SiteShell>
      <header className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container-edge grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-start">
          <div>
            <Link href="/" className="text-sm text-primary-foreground/70 hover:text-gold">
              ← Back
            </Link>
            <p className="eyebrow mt-4 text-primary-foreground/70">
              <span className="gold-line" />
              Credit Cards
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.1] md:text-6xl">
              Compare India&apos;s best credit cards — apply in minutes.
            </h1>
            <p className="mt-5 max-w-2xl text-primary-foreground/80">
              Cashback, travel, fuel, lifetime-free. We tie up with India&apos;s leading banks so you
              get the right card without juggling forms.
            </p>
          </div>
          <div>
            <CreditCardLeadForm />
            <p className="mt-4 text-xs text-primary-foreground/65">{CREDIT_CARD_DISCLAIMER}</p>
          </div>
        </div>
      </header>

      <section className="py-16">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />
            Categories
          </p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">Types of credit cards in India</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CREDIT_CARD_TYPES.map((t) => (
              <article
                key={t.slug}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
              >
                <Link
                  href={`/credit-cards/${t.slug}`}
                  className="block aspect-[16/10] overflow-hidden"
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl">{t.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                  <p className="mt-3 text-xs uppercase tracking-widest text-gold">Popular picks</p>
                  <p className="text-sm">{t.picks}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link
                      href={`/credit-card-eligibility?card=${encodeURIComponent(t.name)}`}
                      className="rounded-md border border-border bg-background px-3 py-2 text-center text-xs font-semibold transition-colors hover:border-primary/40 hover:bg-muted"
                    >
                      Check Eligibility
                    </Link>
                    <Link
                      href={`/credit-cards/${t.slug}`}
                      className="inline-flex items-center justify-center gap-1 rounded-md bg-gold px-3 py-2 text-center text-xs font-bold text-gold-foreground shadow-sm transition-opacity hover:opacity-90"
                    >
                      View Details <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-16">
        <div className="container-edge grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">
              <span className="gold-line" />
              Benefits
            </p>
            <h2 className="mt-2 font-display text-3xl">Why use a credit card</h2>
            <p className="mt-3 text-muted-foreground">
              Used responsibly, a credit card improves your CIBIL, gives interest-free credit and
              stacks rewards on every spend.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2 text-sm">
              {CREDIT_CARD_BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h3 className="font-display text-2xl">Eligibility criteria</h3>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-widest text-gold">Salaried</p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {CREDIT_CARD_ELIGIBILITY.salaried.map((e) => (
                    <li key={e} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" /> {e}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gold">Self-employed</p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {CREDIT_CARD_ELIGIBILITY.selfEmployed.map((e) => (
                    <li key={e} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" /> {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-xs uppercase tracking-widest text-gold">Documents</p>
              <ul className="mt-2 grid gap-1.5 text-sm sm:grid-cols-2">
                {CREDIT_CARD_ELIGIBILITY.documents.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" /> {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />
            Featured cards
          </p>
          <h2 className="mt-2 font-display text-3xl">Apply now</h2>
          <div className="mt-8">
            {cards.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((c) => (
                  <CardTile key={c.id} c={c} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

type CardRow = Awaited<ReturnType<typeof listCreditCards>>[number];

function CardTile({ c }: { c: CardRow }) {
  const features: string[] = Array.isArray(c.features) ? c.features : [];
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
      <div className="aspect-[16/10] overflow-hidden rounded-xl bg-muted">
        {c.imageUrl ? (
          <img
            src={c.imageUrl}
            alt={`${c.bank} ${c.name}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <CreditCard className="h-10 w-10" />
          </div>
        )}
      </div>
      <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
        {c.bank}
        {c.category ? ` · ${c.category}` : ""}
      </p>
      <h3 className="mt-1 font-display text-xl">{c.name}</h3>
      {c.benefits && <p className="mt-2 text-sm text-muted-foreground">{c.benefits}</p>}
      {features.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm">
          {features.slice(0, 4).map((f, i) => (
            <li key={`${f}-${i}`} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" /> {f}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4 text-xs text-muted-foreground">
        <span>Joining: ₹{(c.joiningFee ?? 0).toLocaleString("en-IN")}</span>
        <span>Annual: ₹{(c.annualFee ?? 0).toLocaleString("en-IN")}</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <Link
          href={`/credit-card-eligibility?card=${encodeURIComponent(`${c.bank} ${c.name}`)}`}
          className="rounded-md border border-border bg-background px-3 py-2 text-center text-xs font-semibold transition-colors hover:border-primary/40 hover:bg-muted"
        >
          Check Eligibility
        </Link>
        <a
          href={c.affiliateUrl || "#"}
          target="_blank"
          rel="noopener nofollow sponsored"
          className="inline-flex items-center justify-center gap-1 rounded-md bg-gold px-3 py-2 text-center text-xs font-bold text-gold-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          Apply Now <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
      <CreditCard className="mx-auto h-10 w-10 text-muted-foreground" />
      <h2 className="mt-4 font-display text-2xl">Live card offers coming soon</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Our team is finalising the best card offers. Speak to an advisor for a personalised
        recommendation.
      </p>
      <Link href="/contact" className="btn-primary mt-6 inline-flex">
        Talk to an advisor
      </Link>
    </div>
  );
}
