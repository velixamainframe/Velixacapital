import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-shell";
import { LeadForm } from "@/components/site/lead-form";
import { articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";
import { PROPERTY_SERVICES, itemSlug, type ServiceItem } from "@/lib/site-data";
import {
  CheckCircle2,
  FileText,
  ListChecks,
  Users,
  Workflow,
  BadgeIndianRupee,
  ArrowRight,
} from "lucide-react";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PROPERTY_SERVICES.items.map((it) => ({ slug: itemSlug(it) }));
}

function findItem(slug: string): ServiceItem | undefined {
  return PROPERTY_SERVICES.items.find((it) => itemSlug(it) === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) return { title: "Service not found" };
  const canonical = `/property-consulting/${slug}`;
  return {
    title: `${item.name} — Velixa Capital Property Advisory`,
    description: item.description,
    alternates: { canonical },
    openGraph: {
      title: `${item.name} | Velixa Capital`,
      description: item.description,
      url: canonical,
    },
  };
}

export default async function PropertyServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) notFound();
  const canonical = `/property-consulting/${slug}`;

  const faqs =
    item.faqs && item.faqs.length > 0
      ? item.faqs
      : [
          {
            q: `What does Velixa charge for ${item.name.toLowerCase()}?`,
            a: item.pricing ?? "Advisory fees are disclosed in writing upfront before engagement begins.",
          },
          {
            q: "Do you list or sell property?",
            a: "No. Velixa Capital is not a RERA-registered brokerage. We provide advisory and transaction assistance only — no listings, no brokerage from developers or sellers.",
          },
        ];

  const jsonLdArticle = articleJsonLd(item.name, item.description, canonical);
  const jsonLdFaq = faqJsonLd(faqs);
  const jsonLdBreadcrumb = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Property Consulting", url: "/property-consulting" },
    { name: item.name, url: canonical },
  ]);

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <header className="bg-primary py-14 text-primary-foreground md:py-18">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/property-consulting" className="hover:text-gold">
              Property Advisory
            </Link>{" "}
            / <span className="text-primary-foreground/90">{item.name}</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            Property Advisory
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-5xl">{item.name}</h1>
          <p className="mt-5 max-w-2xl text-base text-primary-foreground/85 md:text-lg">{item.description}</p>
          {item.bullets && item.bullets.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {item.bullets.map((b) => (
                <li key={b} className="flex items-center gap-1.5 text-primary-foreground/85">
                  <CheckCircle2 className="h-4 w-4 text-gold" /> {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <section className="border-b border-amber-500/20 bg-amber-50 px-4 py-2.5 text-[11px] leading-relaxed text-amber-900">
        <div className="container-edge">
          <strong className="font-semibold">Advisory only:</strong> Velixa Capital is not a RERA-registered brokerage.
          We do not list or sell property. Loan approvals and valuations are at the sole discretion of lenders and
          authorities.
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="container-edge grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="space-y-12">
            <Section eyebrow="Overview" heading="What this engagement covers" icon={<FileText className="h-5 w-5" />}>
              {item.overview && item.overview.length > 0 ? (
                <div className="space-y-3">
                  {item.overview.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  This engagement is delivered by a senior property advisor who works alongside you from initial
                  assessment through transaction close — independent of any developer, seller or lender. We disclose fees
                  in writing upfront and earn nothing from the transaction itself.
                </p>
              )}
            </Section>

            <Section eyebrow="Who this is for" heading="Ideal clients" icon={<Users className="h-5 w-5" />}>
              {item.whoFor && item.whoFor.length > 0 ? (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {item.whoFor.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {b}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Designed for Indian home buyers, HNI investors and NRIs who want independent advisory and
                  documentation support — without the conflict of interest of a commission-earning broker.
                </p>
              )}
            </Section>

            <Section eyebrow="How it works" heading="Process & timeline" icon={<Workflow className="h-5 w-5" />}>
              {item.process && item.process.length > 0 ? (
                <ol className="space-y-3">
                  {item.process.map((step, i) => (
                    <li key={step} className="flex gap-3 text-sm">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  We start with a discovery call to understand your objective, share a written scope and fee disclosure,
                  and execute the engagement over the agreed timeline with clear milestones.
                </p>
              )}
              {item.timeline && (
                <p className="mt-4 rounded-lg border border-emerald-500/25 bg-emerald-500/5 px-4 py-3 text-xs text-emerald-800">
                  <strong>Typical turnaround:</strong> {item.timeline}
                </p>
              )}
            </Section>

            <Section eyebrow="Documents" heading="What you need to share" icon={<FileText className="h-5 w-5" />}>
              {item.documents && item.documents.length > 0 ? (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {item.documents.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm">
                      <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {d}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Standard KYC of all co-applicants, income proof (Form 16 / ITR / bank statement) and property
                  documents shared by the seller. We share a precise checklist once the engagement is confirmed.
                </p>
              )}
            </Section>

            <Section eyebrow="Fees" heading="Advisory fee structure" icon={<BadgeIndianRupee className="h-5 w-5" />}>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.pricing ??
                  "Advisory fees are disclosed in writing before engagement begins — flat fee, success fee, or hybrid — your choice."}
              </p>
            </Section>

            {faqs.length > 0 && (
              <section>
                <p className="eyebrow">
                  <span className="gold-line" />
                  FAQ
                </p>
                <h2 className="mt-3 font-display text-2xl md:text-3xl">Common questions</h2>
                <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
                  {faqs.map((f) => (
                    <details key={f.q} className="group p-5">
                      <summary className="flex cursor-pointer items-center justify-between text-sm font-medium">
                        {f.q}
                        <span className="ml-4 text-2xl leading-none text-gold transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                    </details>
                  ))}
                </dl>
              </section>
            )}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm
              formVariant="property"
              service={item.name}
              title={`Talk to a ${item.name} advisor`}
              subtitle="Tell us your requirement (buy / sell / rent / invest) — an advisor responds within 24 hours."
            />
            <div className="mt-4 rounded-2xl border border-border bg-muted/30 p-5 text-xs text-muted-foreground">
              <p className="font-medium text-foreground">Not sure which engagement fits?</p>
              <p className="mt-2">
                Browse the{" "}
                <Link href="/property-consulting" className="font-medium text-primary hover:underline">
                  full Property Advisory catalogue
                </Link>{" "}
                or read our{" "}
                <Link href="/property-finance" className="font-medium text-primary hover:underline">
                  Property Finance guide
                </Link>{" "}
                first.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-14">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />
            Explore further
          </p>
          <h2 className="mt-3 font-display text-2xl md:text-3xl">Other property advisory services</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROPERTY_SERVICES.items.filter((it) => itemSlug(it) !== slug).map((it) => (
              <Link
                key={itemSlug(it)}
                href={`/property-consulting/${itemSlug(it)}`}
                className="group rounded-xl border border-border bg-card p-5 transition hover:border-gold/50"
              >
                <h3 className="font-display text-sm leading-tight">{it.name}</h3>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{it.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary group-hover:text-gold">
                  View <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Section({
  eyebrow,
  heading,
  icon,
  children,
}: {
  eyebrow: string;
  heading: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="eyebrow">
        <span className="gold-line" />
        {eyebrow}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold">{icon}</div>
        <h2 className="font-display text-2xl md:text-3xl">{heading}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
