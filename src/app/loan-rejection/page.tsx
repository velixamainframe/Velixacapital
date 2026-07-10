import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { LOAN_REJECTION } from "@/lib/knowledge-data";
import { ArrowRight, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Loan Rejection Library — Diagnose & Fix | Velixa Capital",
  description:
    "Rejected for low CIBIL, high existing EMIs, ITR mismatch, GST issues or banking transactions? Practical guides to diagnose the rejection and re-apply strategically.",
  alternates: { canonical: "/loan-rejection" },
  openGraph: {
    title: "Loan Rejection Library — Velixa Capital",
    description:
      "Practical guides on the 5 most common loan rejection reasons in India — and the exact fix for each.",
    url: "/loan-rejection",
  },
};

export default function LoanRejectionIndexPage() {
  return (
    <SiteShell>
      <header className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container-edge">
          <Link href="/" className="text-sm text-primary-foreground/70 hover:text-gold">
            ← Back to home
          </Link>
          <p className="eyebrow mt-4 text-primary-foreground/70">
            <span className="gold-line" />
            Loan Rejection Library
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-6xl">
            Rejected? Don&apos;t re-apply — <em className="italic text-gold">diagnose first</em>.
          </h1>
          <p className="mt-5 max-w-2xl text-primary-foreground/80">
            Every rejection leaves a hard enquiry on your CIBIL. Blind re-applications compound
            the problem. The Loan Rejection Library walks through the 5 most common rejection
            reasons in India, the exact fix for each, and the strategic re-application sequence.
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />
            The 5 most common rejection reasons
          </p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">
            Pick the rejection reason that matches your case
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Each guide walks through: what triggered the rejection, how to read your own file
            like an underwriter, the exact fix sequence, and how to re-apply strategically without
            damaging your CIBIL further.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {LOAN_REJECTION.map((article) => (
              <Link
                key={article.slug}
                href={`/loan-rejection/${article.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <p className="eyebrow mt-4 text-[11px]">{article.eyebrow}</p>
                <h3 className="mt-1 font-display text-lg leading-snug">{article.title.split("—")[0].trim()}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{article.excerpt}</p>
                <div className="mt-4 flex items-center gap-1 border-t border-border pt-4 text-sm font-medium text-primary group-hover:text-gold">
                  Read the fix <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-14">
        <div className="container-edge max-w-3xl text-center">
          <p className="eyebrow justify-center">
            <span className="gold-line" />
            Don&apos;t guess — get a diagnosis
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">
            Tell us about your rejection. Get a 48-hour fix plan.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Share the lender&apos;s decline reason (if you have it) and your basic file details.
            A senior advisor will diagnose the trigger and recommend the exact fix sequence —
            free, no obligation.
          </p>
          <Link
            href="/contact"
            className="btn-gold mt-6 inline-flex items-center gap-2"
          >
            Get a free rejection diagnosis <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
