import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-shell";
import { CreditCardLeadForm } from "@/components/site/credit-card-lead-form";
import { CREDIT_CARD_TYPES, CREDIT_CARD_DISCLAIMER } from "@/lib/site-data";
import { CheckCircle2, ExternalLink } from "lucide-react";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return CREDIT_CARD_TYPES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = CREDIT_CARD_TYPES.find((c) => c.slug === slug);
  if (!t) return { title: "Credit Card type not found" };
  const title = `${t.name} — Eligibility, Features & Apply`;
  const desc = `${t.overview} Compare picks: ${t.picks}.`;
  return {
    title,
    description: desc,
    alternates: { canonical: `/credit-cards/${t.slug}` },
    openGraph: { title, description: desc, url: `/credit-cards/${t.slug}`, type: "article" },
  };
}

export default async function CardTypePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const t = CREDIT_CARD_TYPES.find((c) => c.slug === slug);
  if (!t) notFound();

  return (
    <SiteShell>
      <header className="bg-primary py-16 text-primary-foreground">
        <div className="container-edge grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-start">
          <div>
            <Link href="/credit-cards" className="text-sm text-primary-foreground/70 hover:text-gold">
              ← All credit cards
            </Link>
            <p className="eyebrow mt-4 text-primary-foreground/70">
              <span className="gold-line" />
              {t.name}
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl leading-[1.1] md:text-5xl">
              {t.name}
            </h1>
            <p className="mt-4 max-w-2xl text-primary-foreground/80">{t.overview}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/credit-card-eligibility?card=${encodeURIComponent(t.name)}`}
                className="btn-gold"
              >
                Check Eligibility
              </Link>
              <a
                href={t.applyUrl || "#"}
                target="_blank"
                rel="noopener nofollow sponsored"
                className="btn-outline-ivory inline-flex items-center gap-1"
              >
                Apply Now <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <div>
            <CreditCardLeadForm cardName={t.name} />
          </div>
        </div>
      </header>

      <section className="py-14">
        <div className="container-edge grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <img src={t.image} alt={t.name} className="aspect-[16/10] w-full object-cover" />
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest text-gold">Popular picks</p>
              <p className="mt-1 text-base">{t.picks}</p>
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl">Best for</h2>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {t.bestFor.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" /> {b}
                </li>
              ))}
            </ul>
            <h2 className="mt-8 font-display text-2xl">Key features</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-14">
        <div className="container-edge grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">Eligibility criteria</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {t.eligibility.map((e) => (
                <li key={e} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" /> {e}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl">Documents required</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {t.documents.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" /> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-edge rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="font-display text-2xl">
            Ready to apply for a {t.name.replace(" Cards", "")} card?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Check eligibility in under 2 minutes, then apply directly with our partner banks.
          </p>
          <div className="mt-5 inline-flex flex-wrap justify-center gap-3">
            <Link
              href={`/credit-card-eligibility?card=${encodeURIComponent(t.name)}`}
              className="btn-outline"
            >
              Check Eligibility
            </Link>
            <a
              href={t.applyUrl || "#"}
              target="_blank"
              rel="noopener nofollow sponsored"
              className="btn-primary inline-flex items-center gap-1"
            >
              Apply Now <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">{CREDIT_CARD_DISCLAIMER}</p>
        </div>
      </section>
    </SiteShell>
  );
}
