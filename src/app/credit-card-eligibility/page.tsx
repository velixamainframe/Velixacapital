import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { CreditCardLeadForm } from "@/components/site/credit-card-lead-form";
import { CREDIT_CARD_DISCLAIMER } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Check Your Credit Card Eligibility",
  description: "Find the best credit card matching your spending profile. Takes less than 2 minutes.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/credit-card-eligibility" },
};

export default async function CreditCardEligibilityPage({
  searchParams,
}: {
  searchParams: Promise<{ card?: string }>;
}) {
  const { card } = await searchParams;
  const cardName = card || undefined;

  return (
    <SiteShell>
      <header className="bg-primary py-14 text-primary-foreground">
        <div className="container-edge">
          <Link href="/credit-cards" className="text-sm text-primary-foreground/70 hover:text-gold">
            ← All credit cards
          </Link>
          <p className="eyebrow mt-4 text-primary-foreground/70">
            <span className="gold-line" />
            Credit Card
          </p>
          <h1 className="mt-3 font-display text-4xl leading-[1.1] md:text-5xl">
            Check your credit card eligibility
          </h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            Find the best card matching your spending profile. Takes less than 2 minutes.
          </p>
        </div>
      </header>

      <section className="py-14">
        <div className="container-edge max-w-2xl">
          <CreditCardLeadForm cardName={cardName} />
          <p className="mt-5 text-center text-xs text-muted-foreground">
            {CREDIT_CARD_DISCLAIMER}
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
