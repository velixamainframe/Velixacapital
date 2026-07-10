import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/commercial-vehicle-finance";
const TITLE = "Commercial Vehicle Finance Advisory";
const DESCRIPTION =
  "Commercial vehicle finance for new, used and refinance — fleet operators, first-time buyers and contract carriers.";

const FAQS = [
  {
    q: "Can a first-time buyer get a commercial vehicle loan?",
    a: "Yes — most CV lenders have a first-time buyer program with a slightly higher margin (15–25%) and route/permit-based underwriting. An active driving licence and a confirmed route or operator tie-up strengthens the case significantly.",
  },
  {
    q: "How old can a used CV be for financing?",
    a: "Most lenders cap at 7–10 years from first registration at the time of disbursal. LCVs and SCVs typically get a longer window than MCV/HCV. The vehicle must have a valid RC, pollution certificate, and an independent valuation report.",
  },
  {
    q: "Can I refinance an existing CV to release working capital?",
    a: "Yes — refinance against a fully-owned CV (or one where the original loan has closed) is a common way to release 60–80% of the current market value as cash. The rate is typically 200–400 bps cheaper than an unsecured business loan.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SLUG },
  openGraph: { title: `${TITLE} | Velixa Capital`, description: DESCRIPTION, url: SLUG, type: "article" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(TITLE, DESCRIPTION, SLUG)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Business Funding", url: "/business-funding" },
              { name: "CV Finance", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="CV Finance"
        title="Commercial vehicle finance — new, used and refinance."
        subtitle="Operator-based, route-based and fleet-based programs across SCV, LCV, MCV, HCV and tippers."
        crumbs={[
          { label: "Business Funding", to: "/business-funding" },
          { label: "CV Finance" },
        ]}
        intro="CV finance is operator-based, route-based and fleet-based underwriting — not balance-sheet underwriting. We position the file the way the CV lender wants to read it."
        formVariant="loan"
        formService="Commercial Vehicle Finance Advisory"
        sections={[
          {
            heading: "Programs we structure",
            cards: [
              { title: "First-time buyer", body: "Lower margin, higher hand-holding programs for new entrants." },
              { title: "Fleet operator", body: "Bulk-deal pricing across multiple chassis with route cash-flow modelling." },
              { title: "Used CV", body: "3–10 year old vehicles with structured valuations and clean RC." },
              { title: "Refinance", body: "Top-up against existing CVs to release working capital at lower rates." },
            ],
          },
          {
            heading: "CV-specific lender checks",
            bullets: [
              "Operator experience — 1+ years preferred for first-time buyers",
              "Route permit and confirmed contract / aggregator tie-up",
              "Valid commercial driving licence and trainer certificates",
              "Vehicle age, fitness certificate and insurance history",
              "Banking strength to service EMI between trip cycles",
              "Existing fleet utilisation and outstanding EMIs",
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
