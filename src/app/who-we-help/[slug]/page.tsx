import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AdvisoryPage,
  articleJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/components/site/advisory-page";
import { WHO_WE_HELP, getWhoWeHelpAudience } from "@/lib/knowledge-data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return WHO_WE_HELP.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const audience = getWhoWeHelpAudience(slug);
  if (!audience) return { title: "Audience not found" };
  const canonical = `/who-we-help/${audience.slug}`;
  return {
    title: `${audience.title} | Velixa Capital`,
    description: audience.excerpt,
    alternates: { canonical },
    openGraph: {
      title: `${audience.title} | Velixa Capital`,
      description: audience.excerpt,
      url: canonical,
      type: "article",
    },
  };
}

export default async function WhoWeHelpDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const audience = getWhoWeHelpAudience(slug);
  if (!audience) notFound();

  const canonical = `/who-we-help/${audience.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(audience.title, audience.excerpt, canonical)),
        }}
      />
      {audience.faqs && audience.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(audience.faqs)) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Who We Help", url: "/who-we-help" },
              { name: audience.title, url: canonical },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow={audience.eyebrow}
        title={audience.title}
        subtitle={audience.excerpt}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Who We Help", to: "/who-we-help" },
          { label: audience.title },
        ]}
        intro={audience.intro}
        sections={audience.sections}
        faqs={audience.faqs}
        formVariant="general"
        formService={`Who We Help — ${audience.title}`}
      />
    </>
  );
}
