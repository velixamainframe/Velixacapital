import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AdvisoryPage,
  articleJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/components/site/advisory-page";
import { LOAN_REJECTION, getLoanRejectionArticle } from "@/lib/knowledge-data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return LOAN_REJECTION.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getLoanRejectionArticle(slug);
  if (!article) return { title: "Article not found" };
  const canonical = `/loan-rejection/${article.slug}`;
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

export default async function LoanRejectionArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getLoanRejectionArticle(slug);
  if (!article) notFound();

  const canonical = `/loan-rejection/${article.slug}`;

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
              { name: "Loan Rejection Library", url: "/loan-rejection" },
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
          { label: "Loan Rejection", to: "/loan-rejection" },
          { label: article.title },
        ]}
        intro={article.intro}
        sections={article.sections}
        faqs={article.faqs}
        formVariant="general"
        formService={`Loan Rejection — ${article.title}`}
        ctaTitle="Get a free rejection diagnosis."
        ctaSubtitle="Share the lender's decline reason and your basic file details. A senior advisor responds within 24 hours with the exact fix sequence."
      />
    </>
  );
}
