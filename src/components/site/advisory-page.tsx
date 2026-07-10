import Link from "next/link";
import type { ReactNode } from "react";
import { SiteShell } from "./site-shell";
import { LeadForm } from "./lead-form";
import { AdvisoryLinks } from "./advisory-links";
import { CheckCircle2, ArrowRight } from "lucide-react";

type Crumb = { label: string; to?: string };

export type AdvisoryPageProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  crumbs?: Crumb[];
  intro?: ReactNode;
  sections: {
    eyebrow?: string;
    heading: string;
    body?: ReactNode;
    bullets?: string[];
    cards?: { title: string; body: string }[];
  }[];
  faqs?: { q: string; a: string }[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  formVariant?: "loan" | "tax-accounting" | "property" | "general";
  formService?: string;
  children?: ReactNode;
};

export function AdvisoryPage(p: AdvisoryPageProps) {
  return (
    <SiteShell>
      <header className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-edge">
          {p.crumbs && (
            <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
              {p.crumbs.map((c, i) => (
                <span key={i}>
                  {c.to ? <Link href={c.to} className="hover:text-gold">{c.label}</Link> : <span>{c.label}</span>}
                  {i < p.crumbs!.length - 1 && <span className="mx-2 text-primary-foreground/40">/</span>}
                </span>
              ))}
            </nav>
          )}
          <p className="eyebrow text-primary-foreground/70"><span className="gold-line" />{p.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.1] md:text-5xl">{p.title}</h1>
          {p.subtitle && <p className="mt-5 max-w-3xl text-lg text-primary-foreground/85">{p.subtitle}</p>}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/funding-readiness-assessment" className="btn-gold">Start free assessment <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/contact" className="btn-outline-ivory">Talk to a specialist</Link>
          </div>
        </div>
      </header>

      {p.intro && (
        <section className="py-14">
          <div className="container-edge max-w-3xl text-base leading-relaxed text-foreground/85">{p.intro}</div>
        </section>
      )}

      {p.sections.map((s, i) => (
        <section key={i} className={i % 2 === 0 ? "py-16" : "bg-muted/40 py-16"}>
          <div className="container-edge">
            {s.eyebrow && <p className="eyebrow"><span className="gold-line" />{s.eyebrow}</p>}
            <h2 className="mt-3 font-display text-3xl md:text-4xl">{s.heading}</h2>
            {s.body && <div className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">{s.body}</div>}
            {s.bullets && (
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {b}
                  </li>
                ))}
              </ul>
            )}
            {s.cards && (
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {s.cards.map((c) => (
                  <div key={c.title} className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="font-display text-lg">{c.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {p.children}

      {p.faqs && p.faqs.length > 0 && (
        <section className="py-16">
          <div className="container-edge">
            <p className="eyebrow"><span className="gold-line" />FAQ</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Common questions</h2>
            <dl className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
              {p.faqs.map((f) => (
                <details key={f.q} className="group p-6">
                  <summary className="flex cursor-pointer items-center justify-between text-base font-medium">
                    {f.q}
                    <span className="ml-4 text-2xl leading-none text-gold transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </dl>
          </div>
        </section>
      )}

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container-edge grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <p className="eyebrow text-primary-foreground/70"><span className="gold-line" />Next step</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">{p.ctaTitle ?? "Get your file reviewed before you apply again."}</h2>
            <p className="mt-4 max-w-xl text-primary-foreground/80">
              {p.ctaSubtitle ?? "Share basic details — a senior advisor will read your profile, diagnose what's blocking approval, and tell you exactly what to fix first."}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-primary-foreground/85">
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" /> No CIBIL pull until strategy is agreed</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" /> No blind portal submissions</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" /> Review by a senior advisor — not a call-centre agent</li>
            </ul>
          </div>
          <div>
            <LeadForm formVariant={p.formVariant ?? "loan"} service={p.formService} title="Free advisory review" subtitle="A senior advisor responds within 24 hours." />
          </div>
        </div>
      </section>

      <AdvisoryLinks />
    </SiteShell>
  );
}

export function articleJsonLd(title: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Velixa Capital" },
    publisher: { "@type": "Organization", name: "Velixa Capital" },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.url })),
  };
}
