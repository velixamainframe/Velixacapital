import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/working-capital-finance";
const TITLE = "Working Capital Finance Advisory";
const DESCRIPTION =
  "Working capital finance: CC, OD, bill discounting and post-shipment lines structured around your operating cycle, not the lender's product quota.";

const FAQS = [
  {
    q: "What's the difference between Cash Credit and an Overdraft?",
    a: "Cash Credit (CC) is stock-and-debtor-backed — the limit is drawn against your inventory and receivables, with monthly DP statements. An Overdraft (OD) is typically cash-flow-based or against an asset like FD/property. CC suits traders and manufacturers; OD suits service businesses and professionals.",
  },
  {
    q: "How is a working-capital limit calculated?",
    a: "Most lenders use a holding-period formula — raw material days + WIP days + debtor days, less creditor days — applied to your turnover. A clean banking trail and GST turnover that reconciles with ITR are what get the formula to land in your favour.",
  },
  {
    q: "Can I get working capital without collateral?",
    a: "Yes — up to ₹5 Cr under CGTMSE for eligible MSMEs, or unsecured OD lines from NBFCs typically up to ₹50 L based on banking strength. Beyond that, stock/debtor or property collateral unlocks larger limits at lower rates.",
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
              { name: "Working Capital", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Working Capital"
        title="Working capital finance — structured around your cash cycle."
        subtitle="CC, OD, bill discounting and post-shipment lines work only when they match how your money actually moves. We design that match."
        crumbs={[
          { label: "Business Funding", to: "/business-funding" },
          { label: "Working Capital" },
        ]}
        intro="Working capital is the most under-structured product in Indian MSME lending. The wrong structure costs you either in interest or in rejected limits."
        formVariant="loan"
        formService="Working Capital Finance Advisory"
        sections={[
          {
            heading: "The right product for the right cycle",
            cards: [
              { title: "Cash Credit", body: "Stock and debtor-backed limit for trading and manufacturing. Monthly DP statement." },
              { title: "Overdraft", body: "Cash-flow-based revolving limit. See /business-overdraft for variants." },
              { title: "Bill Discounting", body: "Advance against verified invoices — convert receivables to cash within 48 hours." },
              { title: "Post-Shipment Finance", body: "Export-friendly limits backed by shipping documents and LC." },
            ],
          },
          {
            heading: "What lenders actually read in a WC file",
            bullets: [
              "Banking average balance vs drawing power",
              "Debtor ageing — anything above 90 days is haircut",
              "Stock statement consistency across months",
              "GST turnover reconciled with ITR",
              "Existing CC/OD utilisation with other lenders",
              "CIBIL enquiries in the last 6 months",
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
