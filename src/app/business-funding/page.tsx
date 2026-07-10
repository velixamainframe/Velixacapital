import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/business-funding";
const TITLE = "Business Funding Advisory";
const DESCRIPTION =
  "Independent business funding advisory across term loans, overdraft, working capital, machinery, CGTMSE and LAP. Trust. Growth. Stability. Prosperity.";

const FAQS = [
  {
    q: "Why did one bank reject my file while another approved it?",
    a: "Every bank has its own credit policy — sector exposure, vintage thresholds, profile boxes, regional risk. The same file can be a clear no at one and a clear yes at another. We pre-screen against real lender policy before any submission.",
  },
  {
    q: "Can GST turnover compensate for low declared income?",
    a: "Partially — many NBFCs and some banks have GST-based programs that lean on turnover. But banking, ITR and GST still need to line up. A 3x mismatch between GST turnover and ITR is the most common auto-reject trigger.",
  },
  {
    q: "Why do profitable businesses fail eligibility checks?",
    a: "Usually one of four — over-optimised tax, weak banking, high existing obligations, or sector restrictions. Profitability isn't underwritten; the file is. We diagnose which of these four is blocking you before re-applying.",
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
              { name: "Home", url: "/" },
              { name: "Business Funding", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Business Funding"
        title="Business funding advisory — structured for the right lender, not the loudest one."
        subtitle="Term loans, overdrafts, working capital, machinery finance, CGTMSE, LAP — matched to your cash cycle, not pushed to whoever picks up first."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Business Funding" },
        ]}
        intro="Velixa Capital is a loan & finance consultant for Indian MSMEs, professionals and property investors. We diagnose your file the way an underwriter will read it, fix what auto-rejects, and only then approach the 1–2 lenders whose policy actually fits. Trust. Growth. Stability. Prosperity."
        formVariant="loan"
        formService="Business Funding Advisory"
        sections={[
          {
            heading: "Products we structure",
            cards: [
              { title: "Business Loan", body: "Unsecured term loan for working capital, expansion or one-time spend." },
              { title: "Loan Against Property", body: "Highest tenure, lowest rate. Best used for long-tenure capex or refinancing costlier debt." },
              { title: "Business Overdraft", body: "Revolving limit for working-capital swings — pay interest on the used portion only." },
              { title: "Working Capital Finance", body: "CC, OD, bill discounting and post-shipment lines matched to your operating cycle." },
              { title: "Machinery Finance", body: "Asset-backed term loans for plant, machinery and equipment with structured repayments." },
              { title: "Commercial Vehicle Finance", body: "For new and used CV purchases, with route and operator-based programs." },
              { title: "CGTMSE Funding", body: "Collateral-free MSME credit up to ₹5 Cr under the Credit Guarantee scheme." },
            ],
          },
          {
            heading: "Compare structures before you choose",
            bullets: [
              "Business Loan vs LAP — speed vs cost",
              "Business Loan vs Overdraft — one-time spend vs revolving cycle",
              "Secured vs Unsecured Business Loan — collateral vs rate",
              "Bank vs NBFC Business Loan — policy box vs pricing",
              "GST-loan vs Traditional Loan — turnover vs ITR",
              "Private vs Public Sector Bank — risk appetite vs rate",
            ],
          },
          {
            heading: "Our diagnostic approach",
            bullets: [
              "Credit readiness — CIBIL, enquiries, mix",
              "Banking readiness — average balance, bounces, cash ratio",
              "GST readiness — turnover reconciled to banking & ITR",
              "Tax readiness — ITR strength vs declared income",
              "Financial readiness — DSCR, FOIR, obligations",
              "Documentation readiness — KYC, vintage, ownership proofs",
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
