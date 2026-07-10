import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { LeadForm } from "@/components/site/lead-form";
import { TAX_ACCOUNTING, itemSlug } from "@/lib/site-data";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Tax, Compliance & Accounting Services — Velixa Capital",
  description:
    "ITR, GST, payroll, bookkeeping, MIS, Udyam, IEC, labour licences and business registrations — one team for every compliance and accounting need of Indian MSMEs and professionals.",
  alternates: { canonical: "/tax-accounting" },
  openGraph: {
    title: "Tax, Compliance & Accounting Services — Velixa Capital",
    description:
      "One team for ITR, GST, payroll, bookkeeping, MIS and registrations. Trust. Growth. Stability. Prosperity.",
    url: "/tax-accounting",
  },
};

export default function TaxAccountingHubPage() {
  const items = TAX_ACCOUNTING.items;

  return (
    <SiteShell>
      <header className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            / <span className="text-primary-foreground/90">Tax &amp; Accounting</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            Tax, Compliance &amp; Accounting
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-5xl">{TAX_ACCOUNTING.title}</h1>
          <p className="mt-5 max-w-2xl text-base text-primary-foreground/85 md:text-lg">{TAX_ACCOUNTING.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#services" className="btn-gold">
              Browse {items.length} services <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/contact" className="btn-outline-ivory">
              Talk to a consultant
            </Link>
          </div>
        </div>
      </header>

      <section id="services" className="py-14 md:py-16">
        <div className="container-edge grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <p className="eyebrow">
              <span className="gold-line" />
              Services
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Pick the service you need.</h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              Each service is run by a dedicated qualified consultant. Click any service for the full scope, process,
              documents, fees and turnaround timeline.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {items.map((item) => {
                const slug = itemSlug(item);
                const pricing =
                  item.pricing ??
                  (item.bullets && item.bullets.length > 0 ? item.bullets[0] : "Custom quote on request");
                return (
                  <Link
                    key={slug}
                    href={`/tax-accounting/${slug}`}
                    className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-soft)]"
                  >
                    <h3 className="font-display text-base leading-tight">{item.name}</h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                    <div className="mt-4 rounded-lg bg-muted/60 px-3 py-2 text-[11px] leading-relaxed text-foreground/80">
                      <span className="font-semibold text-gold">Fees:</span> {pricing}
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:text-gold">
                      View full details <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-6">
              <h3 className="font-display text-lg">Why founders &amp; CFOs choose Velixa</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {TAX_ACCOUNTING.defaultBullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm
              formVariant="tax-accounting"
              title="Tax &amp; accounting consultation"
              subtitle="Tell us your business and the service you need — a consultant responds within 24 hours."
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-14">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />
            Explore related advisory
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Standalone tax &amp; accounting advisory</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Long-form guides for founders and CFOs who want to think through the structure before signing up for a
            service.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { to: "/tax-compliance", title: "Tax & Compliance" },
              { to: "/accounting", title: "Accounting" },
              { to: "/tax-finance", title: "Tax & Finance Advisory" },
              { to: "/business-accounting", title: "Business Accounting" },
              { to: "/itr-advisory", title: "ITR Advisory" },
              { to: "/gst-advisory", title: "GST Advisory" },
              { to: "/mis-reporting", title: "MIS Reporting" },
              { to: "/tax-planning-for-loan-eligibility", title: "Tax Planning for Loans" },
            ].map((a) => (
              <Link
                key={a.to}
                href={a.to}
                className="group rounded-xl border border-border bg-card p-5 transition hover:border-gold/50"
              >
                <h3 className="font-display text-base">{a.title}</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary group-hover:text-gold">
                  Read guide <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
