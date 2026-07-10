import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/resources";
const TITLE = "Resources — Knowledge, Tools & Insights from Velixa Capital";
const DESCRIPTION =
  "Velixa Capital resource hub — Knowledge Hub, eligibility tools, and our blog. Everything you need to diagnose your file before you apply.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SLUG },
  openGraph: { title: `${TITLE} | Velixa Capital`, description: DESCRIPTION, url: SLUG, type: "article" },
};

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(TITLE, DESCRIPTION, SLUG)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Resources", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Resources"
        title="Resources — knowledge, tools & insights."
        subtitle="Read the file the way an underwriter will. Use the tools to diagnose before you apply. Then talk to us."
        crumbs={[{ label: "Home", to: "/" }, { label: "Resources" }]}
        intro="Most borrowers re-apply blindly after a rejection — and burn more CIBIL enquiries in the process. The resources below let you diagnose your file the way an underwriter will, run a free funding-readiness assessment, and read our latest insights before you talk to any advisor."
        formVariant="general"
        formService="Resources — Request guidance"
        sections={[
          {
            eyebrow: "Browse",
            heading: "Resource categories",
            body:
              "Three ways to engage with Velixa's content — deep-read articles, interactive tools, and our regular blog.",
            cards: [
              {
                title: "Knowledge Hub",
                body:
                  "24 in-depth articles covering the 7 rejection triggers, funding-readiness framework, business finance fundamentals, and industry-specific funding guides. Each written by senior advisors — not interns.",
              },
              {
                title: "Eligibility tools",
                body:
                  "Free interactive tools: a 12-question funding-readiness assessment with a weighted 0–100 score and pillar-by-pillar breakdown, plus an EMI calculator for every loan product. No CIBIL pull, no spam.",
              },
              {
                title: "Blog",
                body:
                  "Regular plain-English guides on loans, credit cards, GST, ITR, property and MSME schemes. Practical, current and written for Indian business owners, professionals and property investors.",
              },
            ],
          },
        ]}
        faqs={[
          {
            q: "Are these resources free?",
            a: "Yes — every article, tool and guide in our resource hub is free to read and use. The funding-readiness assessment and EMI calculator run entirely in your browser and never trigger a CIBIL pull.",
          },
          {
            q: "How often is the content updated?",
            a: "We review and update key articles every quarter, and publish new blog posts regularly. Rate ranges, scheme rules and lender policies change frequently — always confirm current terms before applying.",
          },
          {
            q: "Can I share these resources with my CA or financial advisor?",
            a: "Absolutely. Many of our articles are written to be shared with accountants, advisors and co-applicants so everyone involved in your file reads it the same way an underwriter will.",
          },
        ]}
      />
    </>
  );
}
