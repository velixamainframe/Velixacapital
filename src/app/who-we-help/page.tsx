import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { WHO_WE_HELP } from "@/lib/knowledge-data";
import { ArrowRight, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Who We Help — Funding Solutions by Audience | Velixa Capital",
  description:
    "Tailored funding solutions for business owners, traders, manufacturers, professionals, property investors and startups. Velixa Capital — Indian MSME finance consultant.",
  alternates: { canonical: "/who-we-help" },
  openGraph: {
    title: "Who We Help — Velixa Capital",
    description:
      "Funding solutions tailored to your profile — business owners, traders, manufacturers, professionals, property investors, startups.",
    url: "/who-we-help",
  },
};

const AUDIENCE_ICONS: Record<string, string> = {
  "business-owners": "Business Owners",
  traders: "Traders",
  manufacturers: "Manufacturers",
  professionals: "Professionals",
  "property-investors": "Property Investors",
  startups: "Startups",
};

export default function WhoWeHelpIndexPage() {
  return (
    <SiteShell>
      <header className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container-edge">
          <Link href="/" className="text-sm text-primary-foreground/70 hover:text-gold">
            ← Back to home
          </Link>
          <p className="eyebrow mt-4 text-primary-foreground/70">
            <span className="gold-line" />
            Who We Help
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-6xl">
            Funding solutions tailored to <em className="italic text-gold">your profile</em>.
          </h1>
          <p className="mt-5 max-w-2xl text-primary-foreground/80">
            Velixa Capital is a loan &amp; finance consultant for Indian MSMEs, professionals and
            property investors. We diagnose your file the way an underwriter will, then match it
            to the right lender and product. Trust. Growth. Stability. Prosperity.
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />
            Six audiences, one diagnostic approach
          </p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">
            Pick the profile that fits you
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Each audience has a different underwriting lens, lender appetite and product fit.
            Choose the closest match to see the financing structure that works for your file.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {WHO_WE_HELP.map((audience) => (
              <Link
                key={audience.slug}
                href={`/who-we-help/${audience.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Users className="h-5 w-5" />
                </div>
                <p className="eyebrow mt-4 text-[11px]">{AUDIENCE_ICONS[audience.slug] ?? audience.eyebrow}</p>
                <h3 className="mt-1 font-display text-lg leading-snug">{audience.title.split("—")[0].trim()}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{audience.excerpt}</p>
                <div className="mt-4 flex items-center gap-1 border-t border-border pt-4 text-sm font-medium text-primary group-hover:text-gold">
                  View funding options <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
