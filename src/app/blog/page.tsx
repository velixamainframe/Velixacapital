import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { listBlogs } from "@/lib/data";
import { ArrowRight, Calendar, FileText } from "lucide-react";

// Blog list comes from the database — render at runtime, not build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Insights & Guides from Velixa Capital",
  description:
    "Plain-English insights and guides on loans, credit cards, GST, ITR, property and MSME schemes — written for Indian business owners, professionals and property investors.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Velixa Capital Blog",
    description: "Insights & guides on loans, credit cards, tax, accounting and property finance in India.",
    url: "/blog",
    type: "website",
  },
};

function formatDate(d: Date | string | null) {
  if (!d) return null;
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function BlogIndexPage() {
  const posts = await listBlogs();

  return (
    <SiteShell>
      {/* HERO */}
      <section className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            / <span className="text-primary-foreground/90">Blog</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            Insights &amp; guides
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-5xl">Insights &amp; guides.</h1>
          <p className="mt-6 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
            Plain-English guides on loans, credit cards, tax, accounting, GST and property — written by senior
            advisors for Indian business owners, professionals and property investors.
          </p>
        </div>
      </section>

      {/* POSTS OR EMPTY STATE */}
      <section className="py-16">
        <div className="container-edge">
          {posts.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center md:p-12">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-gold">
                <FileText className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl md:text-3xl">No articles published yet.</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                We're writing our first batch of guides. In the meantime, explore our Knowledge Hub for in-depth
                articles on loan rejections, funding readiness and industry-specific funding.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/knowledge-hub" className="btn-gold inline-flex">
                  Visit Knowledge Hub <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/admin/blogs" className="btn-outline">
                  Manage blog posts
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="eyebrow">
                <span className="gold-line" />
                Latest
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">Read what we're writing.</h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => {
                  const date = formatDate(post.publishedAt);
                  return (
                    <article
                      key={post.id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-soft)]"
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block aspect-[16/9] overflow-hidden bg-muted"
                      >
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-primary/5">
                            <span className="font-display text-3xl text-gold/40">V</span>
                          </div>
                        )}
                      </Link>
                      <div className="flex flex-1 flex-col p-5">
                        {date && (
                          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" /> {date}
                          </p>
                        )}
                        <h3 className="mt-2 font-display text-lg leading-tight">
                          <Link href={`/blog/${post.slug}`} className="hover:text-gold">
                            {post.title}
                          </Link>
                        </h3>
                        {post.excerpt && (
                          <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                        )}
                        <div className="mt-4 border-t border-border pt-3">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:text-gold"
                          >
                            Read article <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container-edge flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-primary-foreground/70">
              <span className="gold-line" />
              Need a specific answer?
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              Skip the reading. Talk to a senior advisor.
            </h2>
            <p className="mt-3 max-w-xl text-primary-foreground/80">
              If your question is "will I get this loan?", the fastest answer is a 24-hour file review — not 8 articles.
            </p>
          </div>
          <Link href="/contact" className="btn-gold shrink-0">
            Talk to an advisor <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
