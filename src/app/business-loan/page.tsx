import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/business-loan";
const TITLE = "Business Loan Advisory";
const DESCRIPTION =
  "Independent advisory on business loans — eligibility, rate range, tenure, and the right lender match. We diagnose the file before any submission.";

const FAQS = [
  {
    q: "Why did one bank reject my file while another approved it?",
    a: "Every bank has its own credit policy — sector exposure, vintage thresholds, profile boxes, regional risk. The same file can be a clear no at one and a clear yes at another. We pre-screen against real lender policy before submitting.",
  },
  {
    q: "Can GST turnover compensate for low declared income?",
    a: "Partially — many NBFCs and some banks have GST-based programs that lean on turnover. But banking, ITR and GST still need to line up. A 3x mismatch between GST turnover and ITR is the most common auto-reject trigger.",
  },
  {
    q: "What rate should I expect on an unsecured business loan?",
    a: "Indicative rates range from 8.00%* to 30.00%* p.a. depending on the lender (SBI, PNB, HDFC, Axis vs Fintech NBFCs), vintage, banking quality and sector. The final rate is set by the lender after appraisal — never trust a 'guaranteed rate' quote.",
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
              { name: "Business Loan", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Business Loan"
        title="Business loan — when it actually fits."
        subtitle="An unsecured business loan is the right tool when you need a one-time spend, a short-tenure top-up, or fast access without pledging collateral. We position it the way an underwriter sees it — not the way a portal markets it."
        crumbs={[
          { label: "Business Funding", to: "/business-funding" },
          { label: "Business Loan" },
        ]}
        intro="We position business loans the way an underwriter sees them — not the way a portal markets them. That is the difference between sanction and a wasted enquiry."
        formVariant="loan"
        formService="Business Loan Advisory"
        sections={[
          {
            heading: "When a business loan is the right structure",
            bullets: [
              "Short to mid-tenure spend (12–60 months)",
              "No collateral available or worth pledging",
              "Speed matters more than cost",
              "Existing relationship-banking limits already in use",
              "Top-up on an existing running loan",
              "Bridge funding for a confirmed order or receivable",
            ],
          },
          {
            heading: "Eligibility signals lenders weigh",
            bullets: [
              "2–3 years of business vintage",
              "Audited financials with declared profitability",
              "Banking that supports the proposed EMI",
              "Clean CIBIL and a healthy credit mix",
              "GST turnover that ties back to banking",
              "Sector not on the lender's negative list",
            ],
          },
          {
            heading: "Velixa positioning",
            body: "We do not race to submit. We diagnose the file, fix the gaps that auto-reject, and only then approach the 1–2 lenders whose policy actually fits your profile.",
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
