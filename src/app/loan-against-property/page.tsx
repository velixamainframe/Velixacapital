import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/loan-against-property";
const TITLE = "Loan Against Property Advisory";
const DESCRIPTION =
  "Advisor-led LAP — long tenure, lowest rate, structured valuation and the right lender match for residential or commercial property.";

const FAQS = [
  {
    q: "What LTV can I expect on a Loan Against Property?",
    a: "Most lenders cap LTV at 60–70% of the valuation report for residential property and 50–60% for commercial or industrial. The final LTV also depends on your income, FOIR and the lender's sector exposure at the time of appraisal.",
  },
  {
    q: "How long does LAP sanction take?",
    a: "Typically 2–4 weeks from file submission to sanction, and another 1–2 weeks for disbursal. The longest pole is usually the legal & valuation chain — a clean 30-year title with all approvals shaves days off.",
  },
  {
    q: "Can I use LAP to refinance costlier unsecured debt?",
    a: "Yes — refinancing high-cost business loans, ODs or personal loans into LAP is one of the most common use cases. The interest rate delta is often 400–700 bps, which compounds into a meaningful monthly EMI saving.",
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
              { name: "LAP", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="LAP"
        title="Loan against property — long tenure, lower rate, larger limit."
        subtitle="LAP is the most cost-efficient large-ticket business credit available in India today — when structured correctly. We make sure it is."
        crumbs={[
          { label: "Business Funding", to: "/business-funding" },
          { label: "LAP" },
        ]}
        intro="A well-structured LAP is the cheapest large-ticket business loan in India. A badly structured one becomes a 15-year EMI you regret."
        formVariant="loan"
        formService="Loan Against Property Advisory"
        sections={[
          {
            heading: "When LAP wins",
            bullets: [
              "Large ticket — typically ₹50 L and above",
              "Long tenure — 10–15 years for genuine cash flow easing",
              "Refinance of costlier unsecured debt",
              "Capex with long payback period",
              "Business expansion where property is the only lever",
              "Education or marriage funding at sub-10% rates",
            ],
          },
          {
            heading: "Where LAP files break",
            bullets: [
              "Weak property valuation vs expected market price",
              "Title chain or approvals missing",
              "Cash-heavy business profile reducing FOIR fit",
              "Wrong lender — pricing or LTV mismatch",
              "Property in a sector or locality on the lender's watch-list",
              "Co-owner not available for KYC / consent",
            ],
          },
          {
            heading: "Velixa positioning",
            body: "We commission an independent valuation sense-check before approaching the lender, validate the 30-year title chain, and match your ticket + tenure to the lender whose LTV and pricing box actually fits.",
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
