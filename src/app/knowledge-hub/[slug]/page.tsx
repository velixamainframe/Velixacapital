import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AdvisoryPage,
  articleJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/components/site/advisory-page";
import { KNOWLEDGE_HUB, getKnowledgeArticle } from "@/lib/knowledge-data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return KNOWLEDGE_HUB.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);
  if (!article) return { title: "Article not found" };
  const canonical = `/knowledge-hub/${article.slug}`;
  return {
    title: `${article.title} | Velixa Capital`,
    description: article.excerpt,
    alternates: { canonical },
    openGraph: {
      title: `${article.title} | Velixa Capital`,
      description: article.excerpt,
      url: canonical,
      type: "article",
    },
  };
}

export default async function KnowledgeArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);
  if (!article) notFound();

  const canonical = `/knowledge-hub/${article.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(article.title, article.excerpt, canonical)),
        }}
      />
      {article.faqs && article.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(article.faqs)) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Knowledge Hub", url: "/knowledge-hub" },
              { name: article.title, url: canonical },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow={article.eyebrow}
        title={article.title}
        subtitle={article.excerpt}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Knowledge Hub", to: "/knowledge-hub" },
          { label: article.title },
        ]}
        intro={article.intro}
        sections={article.sections}
        faqs={article.faqs}
        formVariant="general"
        formService={`Knowledge Hub — ${article.title}`}
      />
    </>
  );
}
