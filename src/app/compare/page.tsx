import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { COMPARE } from "@/lib/knowledge-data";
import { ArrowRight, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare Loan Products — Side-by-Side Decision Guides | Velixa Capital",
  description:
    "NBFC vs bank, business loan vs LAP, GST loan vs traditional, private vs public sector bank — practical cost-benefit comparisons for Indian MSMEs.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Compare Loan Products — Velixa Capital",
    description:
      "Side-by-side comparisons of loan products and lender types — pick the right one before applying.",
    url: "/compare",
  },
};

export default function CompareIndexPage() {
  return (
    <SiteShell>
      <header className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container-edge">
          <Link href="/" className="text-sm text-primary-foreground/70 hover:text-gold">
            ← Back to home
          </Link>
          <p className="eyebrow mt-4 text-primary-foreground/70">
            <span className="gold-line" />
            Compare Loan Products
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-6xl">
            Compare before you apply — <em className="italic text-gold">the wrong product costs lakhs</em>.
          </h1>
          <p className="mt-5 max-w-2xl text-primary-foreground/80">
            A 4–8% rate spread between products is normal. A 5-year ₹25 L loan at 22% costs
            ₹9 L more than at 11%. Our comparison guides walk through the trade-offs, costs and
            decision matrix for the most common product choices Indian MSMEs face.
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />
            Four critical comparisons
          </p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">
            Pick the comparison relevant to your decision
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Each guide includes a side-by-side feature comparison, a decision matrix based on
            your file strength and use case, and a worked cost illustration so you can see the
            rupee difference for yourself.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {COMPARE.map((article) => (
              <Link
                key={article.slug}
                href={`/compare/${article.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-soft)] md:p-8"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Scale className="h-5 w-5" />
                </div>
                <p className="eyebrow mt-4 text-[11px]">{article.eyebrow}</p>
                <h3 className="mt-1 font-display text-xl leading-snug md:text-2xl">{article.title.split("—")[0].trim()}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{article.excerpt}</p>
                <div className="mt-4 flex items-center gap-1 border-t border-border pt-4 text-sm font-medium text-primary group-hover:text-gold">
                  Read the comparison <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
