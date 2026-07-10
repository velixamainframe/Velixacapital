import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/machinery-finance";
const TITLE = "Machinery & Equipment Finance Advisory";
const DESCRIPTION =
  "Machinery and equipment finance structured for production cycles — term loan or hypothecation, OEM-linked schemes, moratorium-aligned EMIs.";

const FAQS = [
  {
    q: "How much funding can I get against machinery?",
    a: "Most lenders finance 80–90% of the machinery cost. For OEM-tied schemes, this can stretch to 100%. Used machinery typically gets 70–80% of an independent valuation report.",
  },
  {
    q: "Can I get a moratorium on machinery loan EMIs?",
    a: "Yes — 3–6 months is standard, aligned with installation and commissioning. Some lenders offer up to 12 months for large projects. We negotiate this upfront; it's much harder to ask for after sanction.",
  },
  {
    q: "Should I take a term loan or an equipment lease?",
    a: "Term loans give you ownership from day one and appear as debt on your balance sheet. Leases keep the asset off your books and may offer tax efficiency, but you don't own the machine. We model both options against your cash flow and tax position before recommending.",
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
              { name: "Machinery", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Machinery"
        title="Machinery finance — asset-backed, structured for production cycles."
        subtitle="Term-loan or hypothecation structures for plant, equipment and CNC machinery, with repayment matched to commissioning and ramp-up."
        crumbs={[
          { label: "Business Funding", to: "/business-funding" },
          { label: "Machinery" },
        ]}
        intro="Machinery finance is one of the few cases where the asset itself secures the loan — so the structure, the moratorium and the OEM tie-up matter more than the rate."
        formVariant="loan"
        formService="Machinery Finance Advisory"
        sections={[
          {
            heading: "Structures we evaluate",
            cards: [
              { title: "Term Loan with moratorium", body: "3–6 month moratorium to align EMI start with revenue from the machine." },
              { title: "Hypothecation", body: "Asset itself collateralises the loan — lower rate, faster sanction." },
              { title: "OEM-linked schemes", body: "Subsidised rates and tenor through manufacturer tie-ups (JCB, L&T, Siemens, etc.)." },
            ],
          },
          {
            heading: "What lenders weigh on a machinery file",
            bullets: [
              "OEM quotation and approved-vendor list",
              "End-use linkage — order book or capacity utilisation",
              "Existing business vintage (typically 2+ years)",
              "Banking strength to service the new EMI",
              "CIBIL of the promoter / company",
              "Insurance and RC-equivalent registration for the asset",
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
