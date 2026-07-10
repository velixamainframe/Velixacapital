import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/cgtmse-funding";
const TITLE = "CGTMSE Funding Advisory";
const DESCRIPTION =
  "Collateral-free MSME credit up to ₹5 Cr under CGTMSE — eligibility, positioning and the right lender match.";

const FAQS = [
  {
    q: "Does CGTMSE guarantee mean automatic approval?",
    a: "No. CGTMSE is a credit guarantee to the lender — it covers default risk up to 85%, but the lender still has to underwrite and sanction the loan on its own credit policy. Many files lose CGTMSE because the bank's credit team rejects them, not CGTMSE.",
  },
  {
    q: "What's the maximum loan under CGTMSE?",
    a: "Up to ₹5 crore per borrower as composite credit (term loan + working capital). The Annual Guarantee Fee (AGF) ranges from 0.37% to 1.35% depending on the slab and is paid by the lender (recovered from borrower).",
  },
  {
    q: "Which sectors are excluded from CGTMSE?",
    a: "Educational/training institutions, self-help groups, agriculture and allied activities, and retail trade are excluded. Manufacturing and most services are eligible. We map your activity code before applying.",
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
              { name: "CGTMSE", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="CGTMSE"
        title="CGTMSE funding — collateral-free MSME credit done right."
        subtitle="Up to ₹5 Cr in collateral-free credit under the Credit Guarantee scheme — only when the file is positioned correctly."
        crumbs={[
          { label: "Business Funding", to: "/business-funding" },
          { label: "CGTMSE" },
        ]}
        intro="CGTMSE unlocks collateral-free credit up to ₹5 Cr — but the guarantee covers the lender, not your file. The credit team still has to say yes."
        formVariant="loan"
        formService="CGTMSE Funding Advisory"
        sections={[
          {
            heading: "What CGTMSE actually is",
            body: "A government guarantee scheme that backs the lender, not the borrower. The bank's risk is covered, so they can extend credit without collateral. But the file must still meet the bank's credit standards.",
          },
          {
            heading: "Where most files lose CGTMSE",
            bullets: [
              "Sector outside the eligible list",
              "Promoter profile not aligned with MSME definition",
              "Lender chosen does not actively use CGTMSE",
              "DSCR weak even with guarantee cover",
              "Udyam registration mismatch with actual activity",
              "Existing collateral-free loan already running",
            ],
          },
          {
            heading: "Velixa positioning",
            body: "We start from the lender side — we know which banks actively lodge CGTMSE guarantees and which only pay lip-service to the scheme. We position your file at a lender where CGTMSE is a real lever, not a marketing line.",
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
