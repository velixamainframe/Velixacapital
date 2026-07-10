import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/lease-rental-discounting";
const TITLE = "Lease Rental Discounting (LRD) Advisory";
const DESCRIPTION =
  "Loan against rental income of a leased commercial property — tenant covenant analysis, LTV, tenure and lender comparison for Indian landlords of pre-leased Grade-A offices, retail and warehousing.";

const FAQS = [
  {
    q: "What kind of tenant qualifies for LRD?",
    a: "Lenders want investment-grade tenants — listed companies, PSU banks, MNCs, established Indian corporates or government departments. Lease tenure of 9+ years remaining (3+5+3 lock-in structure typical), rent paid via bank transfer with TDS compliance. Weaker tenant covenants (startups, single-location SMEs) significantly reduce LTV or disqualify the file.",
  },
  {
    q: "How is the loan amount calculated in LRD?",
    a: "Typically 6–9 years of discounted rental cash flow, capped at 50–60% of property market value. Lenders compute net rent (gross less TDS, society dues, maintenance), discount it at their internal rate, and set the eligible loan. We model this with 3–4 lenders to surface the best quote.",
  },
  {
    q: "What happens if the tenant vacates mid-tenure?",
    a: "Most LRD agreements have a substitution clause — you must replace the tenant with an equivalent covenant within 6–12 months, and the EMI continues from your other income. Some lenders offer a 6-month moratorium. We review the default clause carefully before signing.",
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
              { name: "Lease Rental Discounting", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Property Advisory"
        title="Lease Rental Discounting — turn your lease into liquid capital."
        subtitle="For landlords of pre-leased commercial property — borrow against the rental cash flow itself, with the tenant's covenant underwriting the loan. Lower rate than LAP, longer tenure, no personal income stress."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Property Advisory", to: "/property-consulting" },
          { label: "Lease Rental Discounting" },
        ]}
        intro="LRD is the cheapest form of property-backed debt for owners of pre-leased Grade-A offices, high-street retail and warehousing. Velixa Capital analyses tenant covenant, lease structure and property title — then approaches 3–4 lenders whose underwriting fits the file. Advisory only — loan approval is at the lender's sole discretion."
        formVariant="property"
        formService="Lease Rental Discounting Advisory"
        sections={[
          {
            heading: "What makes a strong LRD file",
            cards: [
              { title: "Tenant covenant", body: "Investment-grade tenant — listed, PSU, MNC, established corporate or government. Weakest link is the file." },
              { title: "Lease structure", body: "9+ years remaining tenure with lock-in; rent paid via banking channel with TDS compliance." },
              { title: "Property title", body: "30-year title chain clean, encumbrance certificate clear, sanctioned plan and occupancy certificate in place." },
              { title: "Property type", body: "Grade-A office, high-street retail, IT park or warehousing — most lenders avoid residential rental." },
              { title: "Location grade", body: "Tier-1 and Tier-2 metros preferred; micro-market fundamentals matter for valuation." },
              { title: "Rent-to-value ratio", body: "Gross yield of 6%*+ on property value improves LTV — sub-5% yields cap the eligible loan." },
            ],
          },
          {
            heading: "How we structure an LRD engagement",
            bullets: [
              "Tenant covenant review — financials, sector, lease agreement",
              "Lease audit — lock-in, escalation, renewal, default clauses",
              "Property documentation & title verification (via independent advocate)",
              "Independent valuation commissioned if lender range is wide",
              "3–4 lender offers compared on rate, LTV, tenure, foreclosure, default terms",
              "Sanction-to-disbursal coordination, post-disbursal servicing support",
              "Annual refinance review — LRD rates change with the yield curve",
            ],
          },
          {
            heading: "Indicative LRD economics",
            body: "Loan amount: 6–9 years of discounted net rent, capped at 50–60% of property market value. Rate: 8.50%*–11.50%* p.a. Tenure: 10–15 years. Processing: 0.5%–1.5% + GST. Foreclosure: nil on floating-rate loans (RBI). Final terms are at the lender's sole discretion — we model the structure, the bank underwrites it.",
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
