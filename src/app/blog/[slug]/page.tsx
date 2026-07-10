import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-shell";
import { LeadForm } from "@/components/site/lead-form";
import { getBlog } from "@/lib/data";
import { ArrowRight, Calendar, ArrowLeft } from "lucide-react";

type Params = { slug: string };

// Blog posts live in the database (Supabase in prod / SQLite in dev).
// They must NOT be queried at build time — Vercel's build environment has
// no SQLite file and should not depend on a live DB connection. Pages are
// rendered on-demand at runtime instead.
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams(): Promise<Params[]> {
  // Return an empty array so Next.js does not attempt to pre-render any
  // blog slugs at build time. With `dynamicParams = true` (default), every
  // slug is still rendered on-demand at runtime.
  return [];
}

async function findPost(slug: string) {
  return getBlog(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPost(slug);
  if (!post) return { title: "Article not found" };
  const canonical = `/blog/${slug}`;
  return {
    title: `${post.title} | Velixa Capital`,
    description: post.excerpt ?? post.title,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? post.title,
      url: canonical,
      type: "article",
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
  };
}

function formatDate(d: Date | string | null) {
  if (!d) return null;
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await findPost(slug);
  if (!post) notFound();
  const canonical = `/blog/${slug}`;
  const date = formatDate(post.publishedAt);

  return (
    <SiteShell>
      {/* HERO */}
      <section className="bg-primary py-12 text-primary-foreground md:py-16">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/blog" className="hover:text-gold">
              Blog
            </Link>{" "}
            / <span className="text-primary-foreground/90">{post.title}</span>
          </nav>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs text-primary-foreground/70 hover:text-gold"
          >
            <ArrowLeft className="h-3 w-3" /> Back to all articles
          </Link>
          {date && (
            <p className="mt-6 flex items-center gap-1.5 text-xs text-primary-foreground/70">
              <Calendar className="h-3 w-3" /> {date}
            </p>
          )}
          <h1 className="mt-3 max-w-3xl font-display text-3xl leading-[1.15] md:text-5xl">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-5 max-w-2xl text-base text-primary-foreground/85 md:text-lg">{post.excerpt}</p>
          )}
        </div>
      </section>

      {/* COVER IMAGE */}
      {post.coverImage && (
        <section className="bg-muted/40 py-10">
          <div className="container-edge max-w-4xl">
            <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* CONTENT + LEAD FORM */}
      <section className="py-14 md:py-16">
        <div className="container-edge grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <article className="max-w-3xl">
            <p className="eyebrow">
              <span className="gold-line" />
              Article
            </p>
            <div className="mt-5 whitespace-pre-wrap text-base leading-relaxed text-foreground/90">
              {post.content}
            </div>
            <div className="mt-10 rounded-2xl border border-gold/30 bg-gold/5 p-5 text-xs text-muted-foreground">
              The content above is for informational purposes only and does not constitute financial, legal or tax
              advice. Loan approval, interest rates and all other terms are at the sole discretion of the lender.
              Indicator rates are marked with * and are subject to change. Reach out to Velixa Capital for advice
              specific to your situation.
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/blog" className="btn-outline">
                <ArrowLeft className="h-4 w-4" /> All articles
              </Link>
              <Link href="/contact" className="btn-gold">
                Talk to an advisor <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
          <aside className="lg:sticky lg:top-24">
            <LeadForm title="Got a question?" subtitle="A senior advisor responds within 24 hours." />
          </aside>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt ?? "",
            datePublished: post.publishedAt ?? undefined,
            url: canonical,
            author: { "@type": "Organization", name: "Velixa Capital" },
            publisher: { "@type": "Organization", name: "Velixa Capital" },
            ...(post.coverImage ? { image: post.coverImage } : {}),
          }),
        }}
      />
    </SiteShell>
  );
}
