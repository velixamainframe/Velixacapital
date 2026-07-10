import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-shell";
import { LeadForm } from "@/components/site/lead-form";
import { articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";
import { TAX_ACCOUNTING, itemSlug, type ServiceItem } from "@/lib/site-data";
import { CheckCircle2, FileText, ListChecks, Users, Workflow, BadgeIndianRupee, ArrowRight } from "lucide-react";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return TAX_ACCOUNTING.items.map((it) => ({ slug: itemSlug(it) }));
}

function findItem(slug: string): ServiceItem | undefined {
  return TAX_ACCOUNTING.items.find((it) => itemSlug(it) === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) return { title: "Service not found" };
  const canonical = `/tax-accounting/${slug}`;
  return {
    title: `${item.name} — Velixa Capital Tax & Accounting`,
    description: item.description,
    alternates: { canonical },
    openGraph: {
      title: `${item.name} | Velixa Capital`,
      description: item.description,
      url: canonical,
    },
  };
}

export default async function TaxServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) notFound();
  const canonical = `/tax-accounting/${slug}`;

  const faqs =
    item.faqs && item.faqs.length > 0
      ? item.faqs
      : [
          {
            q: `What does Velixa charge for ${item.name.toLowerCase()}?`,
            a: item.pricing ?? "Fees are disclosed in writing before engagement begins — no hidden charges.",
          },
          {
            q: "How long does onboarding take?",
            a: item.timeline ?? "Most engagements start within 24–48 hours of document submission.",
          },
        ];

  const jsonLdArticle = articleJsonLd(item.name, item.description, canonical);
  const jsonLdFaq = faqJsonLd(faqs);
  const jsonLdBreadcrumb = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Tax & Accounting", url: "/tax-accounting" },
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
            <Link href="/tax-accounting" className="hover:text-gold">
              Tax &amp; Accounting
            </Link>{" "}
            / <span className="text-primary-foreground/90">{item.name}</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            Tax &amp; Accounting
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

      <section className="py-14 md:py-16">
        <div className="container-edge grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="space-y-12">
            <Section eyebrow="Overview" heading="What this service covers" icon={<FileText className="h-5 w-5" />}>
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
                  This engagement is delivered by a qualified consultant who owns your file end-to-end — from document
                  collection through filing, acknowledgement and post-filing follow-up. You get a single point of contact
                  and a clear timeline.
                </p>
              )}
            </Section>

            <Section eyebrow="Who this is for" heading="Ideal customers" icon={<Users className="h-5 w-5" />}>
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
                  Designed for Indian MSMEs, professionals and high-income individuals who need accurate, on-time
                  execution without the overhead of a full-time in-house finance team.
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
                  We start with a discovery call, collect documents over email or WhatsApp, deliver the work within the
                  agreed timeline, and follow up until the acknowledgement is in your inbox.
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
                  Standard KYC (PAN, Aadhaar), business proof and the previous year&apos;s filings. We share a precise
                  document checklist once you confirm the engagement.
                </p>
              )}
            </Section>

            <Section eyebrow="Fees" heading="Transparent pricing" icon={<BadgeIndianRupee className="h-5 w-5" />}>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.pricing ??
                  "Fees are disclosed in writing upfront before the engagement starts. No hourly surprises — pick a fixed-fee package or a quoted scope."}
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
              formVariant="tax-accounting"
              service={item.name}
              title={`Talk to a ${item.name} consultant`}
              subtitle="Share your business and the service you need — a senior consultant responds within 24 hours."
            />
            <div className="mt-4 rounded-2xl border border-border bg-muted/30 p-5 text-xs text-muted-foreground">
              <p className="font-medium text-foreground">Not sure which service fits?</p>
              <p className="mt-2">
                Browse the{" "}
                <Link href="/tax-accounting" className="font-medium text-primary hover:underline">
                  full Tax &amp; Accounting catalogue
                </Link>{" "}
                or read our{" "}
                <Link href="/tax-compliance" className="font-medium text-primary hover:underline">
                  Tax &amp; Compliance guide
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
          <h2 className="mt-3 font-display text-2xl md:text-3xl">Other tax &amp; accounting services</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TAX_ACCOUNTING.items.filter((it) => itemSlug(it) !== slug).slice(0, 4).map((it) => (
              <Link
                key={itemSlug(it)}
                href={`/tax-accounting/${itemSlug(it)}`}
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
