import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/property-funding";
const TITLE = "Property Funding Advisory";
const DESCRIPTION =
  "Raise capital against residential, commercial or industrial property — LAP, lease rental discounting, structured debt. For Indian MSMEs, business owners and property investors.";

const FAQS = [
  {
    q: "How much funding can I raise against my property?",
    a: "Typically 50–70% of the property's market value (residential: 60–70%, commercial: 50–60%, industrial: 50–55%). The exact LTV depends on property type, location, age, legal title clarity and your repayment capacity. We commission an independent valuation if needed before approaching lenders.",
  },
  {
    q: "What's the difference between LAP and Lease Rental Discounting?",
    a: "LAP is a term loan against property you own — EMI-based, 7–15 years, end-use flexible. LRD is a loan against the rental income of a leased property — the rent services the EMI directly, 10–15 year tenure, tenant covenant is critical. We help choose based on whether you have a tenant and how you want cash flow to work.",
  },
  {
    q: "How fast can a property-backed loan be disbursed?",
    a: "Indicative sanction in 7–15 working days post document submission; disbursal typically 15–30 days once valuation, legal and technical checks are complete. Slower than unsecured loans, but significantly cheaper — and structured tenure means lower monthly EMI pressure.",
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
              { name: "Property Advisory", url: "/property-consulting" },
              { name: "Property Funding", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Property Advisory"
        title="Property funding advisory — unlock capital from property you already own."
        subtitle="LAP, Lease Rental Discounting and structured debt against residential, commercial or industrial property. Lower cost than unsecured borrowing, longer tenure, predictable EMI."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Property Advisory", to: "/property-consulting" },
          { label: "Property Funding" },
        ]}
        intro="Property is often the cheapest collateral a business owner or investor has. Velixa Capital helps Indian MSMEs, professionals and HNIs raise funding against property — for business expansion, working capital, debt consolidation or acquisition. We are not a RERA-registered brokerage — advisory and facilitation only, with fees disclosed in writing upfront."
        formVariant="property"
        formService="Property Funding Advisory"
        sections={[
          {
            heading: "Funding structures we facilitate",
            cards: [
              { title: "Loan Against Property (LAP)", body: "Term loan against residential, commercial or industrial property — 7–15 year tenure, 50–70% LTV." },
              { title: "Lease Rental Discounting (LRD)", body: "Loan against rental income of a leased property — rent services the EMI directly." },
              { title: "LAP + Overdraft", body: "Hybrid structure: term loan plus a drop-line overdraft for working-capital flexibility." },
              { title: "Top-up on existing LAP", body: "Additional funding on a property already mortgaged — at the same lender or via balance transfer." },
              { title: "NRI / OCI property funding", body: "FEMA-compliant funding against Indian property for NRIs, with repatriation planning." },
              { title: "Structured debt", body: "For complex transactions — mezzanine, senior-junior structures via NBFC partners." },
            ],
          },
          {
            heading: "Indicative rate ranges (subject to lender)",
            bullets: [
              "Residential LAP: 9.00%*–13.00%* p.a.",
              "Commercial LAP: 9.50%*–14.00%* p.a.",
              "Industrial LAP: 10.00%*–14.50%* p.a.",
              "Lease Rental Discounting: 8.50%*–11.50%* p.a.",
              "Tenure: 5–18 years (LAP), 10–15 years (LRD)",
              "LTV: 50–70% of market value (varies by property type)",
              "Processing fee: 0.5%–1.5% + GST (lender discretion)",
              "Foreclosure: nil on floating-rate retail loans (RBI mandate)",
            ],
          },
          {
            heading: "What we check before approaching lenders",
            body: "Title chain (30 years), encumbrance certificate, sanctioned building plan, occupancy / completion certificate, property tax receipts, society NOC and current valuation. A weak title is the single biggest reason LAP files get rejected — we surface and fix issues before the lender does.",
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
