import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { KNOWLEDGE_HUB, KNOWLEDGE_HUB_CLUSTERS } from "@/lib/knowledge-data";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Knowledge Hub — Loan, Credit & Funding Readiness Guides | Velixa Capital",
  description:
    "Practical, jargon-free guides for Indian MSMEs, professionals and property investors — why loans get rejected, how underwriting works, and how to be approval-ready.",
  alternates: { canonical: "/knowledge-hub" },
  openGraph: {
    title: "Knowledge Hub — Velixa Capital",
    description:
      "Guides on loan rejections, funding readiness, business finance, and industry-specific underwriting — written for Indian MSMEs and professionals.",
    url: "/knowledge-hub",
  },
};

export default function KnowledgeHubIndexPage() {
  const bySlug = new Map(KNOWLEDGE_HUB.map((a) => [a.slug, a]));

  return (
    <SiteShell>
      <header className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container-edge">
          <Link href="/" className="text-sm text-primary-foreground/70 hover:text-gold">
            ← Back to home
          </Link>
          <p className="eyebrow mt-4 text-primary-foreground/70">
            <span className="gold-line" />
            Knowledge Hub
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-6xl">
            Read your file the way an <em className="italic text-gold">underwriter will</em>.
          </h1>
          <p className="mt-5 max-w-2xl text-primary-foreground/80">
            Practical, jargon-free guides on loan approvals, credit readiness, business finance
            and industry-specific underwriting — written for Indian MSMEs, professionals and
            property investors. Trust. Growth. Stability. Prosperity.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {KNOWLEDGE_HUB_CLUSTERS.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="rounded-full border border-primary-foreground/20 px-4 py-1.5 text-xs font-semibold text-primary-foreground/85 hover:border-gold hover:text-gold"
              >
                {c.title}
              </a>
            ))}
          </div>
        </div>
      </header>

      {KNOWLEDGE_HUB_CLUSTERS.map((cluster, idx) => (
        <section
          key={cluster.id}
          id={cluster.id}
          className={idx % 2 === 1 ? "border-y border-border bg-muted/40 py-16" : "py-16"}
        >
          <div className="container-edge">
            <p className="eyebrow">
              <span className="gold-line" />
              Cluster {idx + 1}
            </p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-display text-3xl md:text-4xl">{cluster.title}</h2>
              <span className="text-xs text-muted-foreground">
                {cluster.slugs.length} articles
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{cluster.description}</p>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {cluster.slugs.map((slug) => {
                const article = bySlug.get(slug);
                if (!article) return null;
                return (
                  <Link
                    key={slug}
                    href={`/knowledge-hub/${slug}`}
                    className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-soft)]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <p className="eyebrow mt-4 text-[11px]">{article.eyebrow}</p>
                    <h3 className="mt-1 font-display text-lg leading-snug">{article.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{article.excerpt}</p>
                    <div className="mt-4 flex items-center gap-1 border-t border-border pt-4 text-sm font-medium text-primary group-hover:text-gold">
                      Read article <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </SiteShell>
  );
}
