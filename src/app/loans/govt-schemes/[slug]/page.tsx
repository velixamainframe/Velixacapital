import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-shell";
import { LeadForm } from "@/components/site/lead-form";
import { GOVT_SCHEMES } from "@/lib/govt-schemes-data";
import { GOVT_SCHEME_DISCLAIMER } from "@/lib/site-data";
import { CheckCircle2, FileText, BadgeCheck, Workflow, ExternalLink, Landmark } from "lucide-react";
import type { ReactNode } from "react";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return GOVT_SCHEMES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = GOVT_SCHEMES.find((x) => x.slug === slug);
  if (!s) return { title: "Scheme not found" };
  return {
    title: `${s.name} — Eligibility, Subsidy & Apply Online | Velixa Capital`,
    description: s.short,
    alternates: { canonical: `/loans/govt-schemes/${s.slug}` },
    openGraph: {
      title: `${s.name} | Velixa Capital`,
      description: s.short,
      url: `/loans/govt-schemes/${s.slug}`,
    },
  };
}

export default async function SchemeDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const scheme = GOVT_SCHEMES.find((s) => s.slug === slug);
  if (!scheme) notFound();

  return (
    <SiteShell>
      <header className="bg-primary py-16 text-primary-foreground">
        <div className="container-edge">
          <Link
            href="/loans/govt-schemes"
            className="text-sm text-primary-foreground/70 hover:text-gold"
          >
            ← All Govt schemes
          </Link>
          <p className="eyebrow mt-4 text-primary-foreground/70">
            <span className="gold-line" />
            Govt scheme
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl leading-[1.1] md:text-5xl">
            {scheme.name}
          </h1>
          <p className="mt-4 max-w-3xl text-primary-foreground/80">{scheme.short}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            <Link
              href="/eligibility"
              className="rounded-md border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-2 font-medium hover:bg-primary-foreground/20"
            >
              Check Eligibility
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 rounded-md bg-gold px-4 py-2 font-semibold text-gold-foreground hover:opacity-90"
            >
              Request Guidance
            </Link>
          </div>
        </div>
      </header>

      <section className="py-16">
        <div className="container-edge grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-8">
            <Card icon={<Landmark className="h-5 w-5" />} title="Overview">
              <p className="text-sm leading-relaxed text-muted-foreground">{scheme.overview}</p>
            </Card>

            <div className="grid gap-6 sm:grid-cols-3">
              <Stat label="Loan amount" value={scheme.loanAmount} />
              <Stat label="Interest rate" value={scheme.interestRate} />
              <Stat label="Subsidy / Guarantee" value={scheme.subsidy} />
            </div>

            <List
              icon={<BadgeCheck className="h-5 w-5" />}
              title="Eligibility"
              items={scheme.eligibility}
            />
            <List
              icon={<FileText className="h-5 w-5" />}
              title="Documents required"
              items={scheme.documents}
            />
            <List
              icon={<Workflow className="h-5 w-5" />}
              title="How to apply"
              items={scheme.applyProcess}
              numbered
            />

            <div className="rounded-2xl border border-border bg-muted/30 p-6 text-sm">
              <p className="text-muted-foreground">
                Official portal:{" "}
                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  {scheme.officialUrl}
                </a>
              </p>
              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 rounded-md bg-gold px-4 py-2 text-xs font-bold text-gold-foreground hover:opacity-90"
              >
                Visit official portal <ExternalLink className="h-3 w-3" />
              </a>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                <strong>Disclaimer:</strong> {GOVT_SCHEME_DISCLAIMER}
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm
              service={scheme.name}
              title={`Apply via ${scheme.name.split("—")[0].trim()}`}
              subtitle="Free hand-holding. Our advisor calls within 24 hours."
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Card({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold">
          {icon}
        </div>
        <h2 className="font-display text-2xl">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </article>
  );
}

function List({
  icon,
  title,
  items,
  numbered,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
  numbered?: boolean;
}) {
  return (
    <article className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold">
          {icon}
        </div>
        <h2 className="font-display text-2xl">{title}</h2>
      </div>
      <ul className="mt-4 grid gap-2 text-sm">
        {items.map((it, i) => (
          <li key={it} className="flex items-start gap-2">
            {numbered ? (
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                {i + 1}
              </span>
            ) : (
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
            )}
            {it}
          </li>
        ))}
      </ul>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1.5 font-display text-base text-foreground">{value}</p>
    </div>
  );
}
