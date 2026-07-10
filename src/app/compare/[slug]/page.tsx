import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AdvisoryPage,
  articleJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/components/site/advisory-page";
import { COMPARE, getCompareArticle } from "@/lib/knowledge-data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return COMPARE.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getCompareArticle(slug);
  if (!article) return { title: "Comparison not found" };
  const canonical = `/compare/${article.slug}`;
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

export default async function CompareArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getCompareArticle(slug);
  if (!article) notFound();

  const canonical = `/compare/${article.slug}`;

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
              { name: "Compare", url: "/compare" },
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
          { label: "Compare", to: "/compare" },
          { label: article.title },
        ]}
        intro={article.intro}
        sections={article.sections}
        faqs={article.faqs}
        formVariant="general"
        formService={`Compare — ${article.title}`}
        ctaTitle="Not sure which product fits your file?"
        ctaSubtitle="Share your basic file details and the loan amount you're considering. A senior advisor will tell you which product and lender combination is right for you — free, within 24 hours."
      />
    </>
  );
}
