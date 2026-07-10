import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { CITIES } from "@/lib/cities";
import { ArrowRight, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Loans Across India — Tier 1, 2 & 3 Cities | Velixa Capital",
  description:
    "Velixa Capital facilitates loans across India — Tier 1, Tier 2 and Tier 3 cities. Personal loans, business loans, LAP and more, with right-fit lender matching per city.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "Loans Across India — Velixa Capital",
    description:
      "Loans across India — Tier 1, 2 and 3 cities. Matched to the lender whose policy fits your city profile.",
    url: "/locations",
  },
};

function CityChip({ slug, name, state }: { slug: string; name: string; state: string }) {
  return (
    <Link
      href={`/loans/personal-loan/${slug}`}
      className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm transition hover:-translate-y-0.5 hover:border-gold/50 hover:bg-gold/5 hover:text-gold"
      title={`Personal Loan in ${name}, ${state}`}
    >
      <MapPin className="h-3.5 w-3.5 text-gold" />
      <span className="font-medium">{name}</span>
      <span className="hidden text-[10px] text-muted-foreground sm:inline">· {state}</span>
    </Link>
  );
}

function TierSection({
  tier,
  title,
  blurb,
}: {
  tier: 1 | 2 | 3;
  title: string;
  blurb: string;
}) {
  const cities = CITIES.filter((c) => c.tier === tier);
  return (
    <section className="py-12 md:py-14">
      <div className="container-edge">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">
              <span className="gold-line" />
              Tier {tier}
            </p>
            <h2 className="mt-2 font-display text-2xl md:text-3xl">{title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{blurb}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-display text-2xl text-gold">{cities.length}</span> cities
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {cities.map((c) => (
            <CityChip key={c.slug} slug={c.slug} name={c.name} state={c.state} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LocationsPage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            / <span className="text-primary-foreground/90">Locations</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            Pan-India presence
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-5xl">Loans across India.</h1>
          <p className="mt-6 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
            From metros to emerging Tier-3 hubs — Velixa Capital facilitates loans across {CITIES.length}+ Indian
            cities. Each city page lists every loan product we structure there, with locally relevant lender matching.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/loans" className="btn-gold">
              Browse 14 loan products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn-outline-ivory">
              Talk to an advisor
            </Link>
          </div>
        </div>
      </section>

      <TierSection
        tier={1}
        title="Tier 1 — Metros"
        blurb="Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad. Deep lender networks and same-week disbursals for clean files."
      />
      <div className="bg-muted/40">
        <TierSection
          tier={2}
          title="Tier 2 — Emerging metros"
          blurb="State capitals and fast-growing urban centres. Strong banking ecosystems with growing NBFC footprint and faster turnaround than ever."
        />
      </div>
      <TierSection
        tier={3}
        title="Tier 3 — High-growth cities"
        blurb="Smaller cities with rising credit demand. We work with lenders that have specific Tier-3 programs and local credit-manager relationships."
      />

      {/* FOOTER NOTE */}
      <section className="bg-primary py-14 text-primary-foreground">
        <div className="container-edge text-center">
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            Comprehensive coverage
          </p>
          <h2 className="mt-3 font-display text-2xl md:text-3xl">
            14 loan types × {CITIES.length}+ cities = {14 * CITIES.length}+ city-product combinations.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-primary-foreground/80">
            Don't see your city listed? We operate across all of India. Reach out — we likely have a lender partner
            active in your district.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/loans" className="btn-gold">
              Browse loan products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn-outline-ivory">
              Talk to an advisor
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
