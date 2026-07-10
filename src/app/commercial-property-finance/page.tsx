import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/commercial-property-finance";
const TITLE = "Commercial Property Finance Advisory";
const DESCRIPTION =
  "Finance the purchase of office, retail, warehousing or industrial property — LAP, term loans and LRD compared across partner lenders for Indian business owners, HNIs and family offices.";

const FAQS = [
  {
    q: "How is commercial property finance different from a home loan?",
    a: "Home loans finance residential property you'll live in — higher LTV (75–90%), longer tenure (up to 30 years), lower rate. Commercial property finance funds office, retail, warehouse or industrial property — lower LTV (50–65%), shorter tenure (10–15 years), higher rate, and end-use often restricted to business or investment. Documentation and valuation are stricter.",
  },
  {
    q: "What yields make commercial property finance viable?",
    a: "Indicative net yields — Grade-A office in metros: 7.5–8.5%*, high-street retail: 5–7%*, warehousing: 8–9%*. If the post-tax yield is higher than the borrowing rate, the leveraged investment makes sense. We model the post-tax, post-interest cash flow before recommending finance. Final yields depend on asset, tenant and location.",
  },
  {
    q: "Can I finance a commercial property under a company name?",
    a: "Yes — most commercial property is acquired by an LLP or Pvt-Ltd for tax efficiency and liability ring-fencing. Lenders evaluate the company's financials plus the property itself. We structure the acquisition vehicle, advise on stamp-duty implications and coordinate the lender documentation.",
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
              { name: "Commercial Property Finance", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Property Advisory"
        title="Commercial property finance — structure the buy, then fund it."
        subtitle="Office, retail, warehousing or industrial property — compared across partner lenders on LTV, rate, tenure and covenants. We assess net yield, post-tax cash flow and exit liquidity before recommending finance."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Property Advisory", to: "/property-consulting" },
          { label: "Commercial Property Finance" },
        ]}
        intro="Velixa Capital advises Indian business owners, HNIs and family offices on the financing of commercial property — Grade-A offices, high-street retail, IT parks, warehousing and industrial units. We are not a RERA-registered brokerage — advisory and facilitation only. We assess yield, structure the acquisition vehicle, and approach lenders whose underwriting fits the asset class."
        formVariant="property"
        formService="Commercial Property Finance Advisory"
        sections={[
          {
            heading: "Asset classes we finance",
            cards: [
              { title: "Grade-A office", body: "Pre-leased or under-construction Grade-A office space in IT parks and CBDs — often via LRD against the lease." },
              { title: "High-street retail", body: "Shop, showroom or kiosk in established high-street locations — tenant-mix matters as much as rent." },
              { title: "Warehousing & logistics", body: "Grade-A warehousing in tier-1 logistics corridors — 8–9%* indicative yield, long-lease tenant covenant." },
              { title: "Industrial property", body: "Factory buildings, industrial sheds and FSI-ready plots — often acquired under company or LLP." },
              { title: "IT / SEZ space", body: "SEZ-tenanted IT property — special tax and repatriation considerations, structured acquisition." },
              { title: "Pre-leased buildings", body: "Entire buildings with a single anchor tenant — LRD or structured debt against the rent roll." },
            ],
          },
          {
            heading: "Our advisory process",
            bullets: [
              "Net rental yield & cap-rate assessment vs benchmark 10-yr G-Sec",
              "Post-tax cash-flow modelling — interest cost vs rental yield",
              "Tenant covenant and lease-structure review",
              "Title chain, encumbrance, sanctioned plan, occupancy certificate check",
              "Acquisition vehicle structuring (individual / HUF / LLP / Pvt-Ltd)",
              "Stamp duty, GST and capital-gains tax mapping",
              "3–4 lender offers compared — LTV, rate, tenure, covenants",
              "Sanction-to-disbursal coordination, post-disbursal servicing",
            ],
          },
          {
            heading: "Indicative economics (subject to lender)",
            body: "LTV: 50–65% of agreement value (varies by asset class). Rate: 9.00%*–13.00%* p.a. for term loans; 8.50%*–11.50%* p.a. for LRD. Tenure: 10–15 years term loan, up to 18 years for LRD. Processing fee: 0.5%–1.5% + GST. Stamp duty & registration: state-specific (4–8% typically). Final terms at lender's sole discretion.",
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
