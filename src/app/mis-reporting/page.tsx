import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/mis-reporting";
const TITLE = "MIS Reporting";
const DESCRIPTION =
  "Monthly MIS dashboards for founders and CFOs — P&L, cash flow, receivables, payables, inventory, GST summary and KPI tracking. Excel, Google Sheets, Power BI or Looker Studio.";

const FAQS = [
  {
    q: "What's the difference between MIS and accounting?",
    a: "Accounting records what happened — MIS interprets what it means. MIS turns your Tally / Zoho books into a one-page picture of profitability, cash position and operational KPIs that a founder can act on every month.",
  },
  {
    q: "Power BI, Looker Studio or Excel — which should I use?",
    a: "Excel or Google Sheets works fine up to ₹20–30 Cr turnover. Beyond that, or if you have multi-location / multi-channel data, Power BI or Looker Studio pay for themselves in speed and drill-down. We design in whatever your team is comfortable with — and migrate later when scale demands.",
  },
  {
    q: "Can you build KPIs specific to my industry?",
    a: "Yes — gross margin by product for distributors, store-wise P&L for retail, doctor-wise revenue for clinics, channel CAC for D2C, project-wise profitability for contractors, seat-utilisation for coworking. The KPI workshop is the first step in every MIS engagement.",
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
              { name: "Tax & Accounting", url: "/tax-accounting" },
              { name: "MIS Reporting", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Tax & Accounting"
        title="MIS reporting — turn raw books into decisions, every month."
        subtitle="A one-page monthly MIS dashboard with P&L, cash flow, receivables, payables, inventory and the KPIs that actually run your business — built in Excel, Sheets, Power BI or Looker Studio."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Tax & Accounting", to: "/tax-accounting" },
          { label: "MIS Reporting" },
        ]}
        intro="Numbers in Tally aren't management information — they're raw data. Velixa Capital converts your monthly books into a clear, one-page MIS dashboard that tells you exactly how the business is performing, where cash is stuck, and which customers or SKUs are profitable. Built for founders, by people who've actually run businesses."
        formVariant="tax-accounting"
        formService="MIS Reporting"
        sections={[
          {
            heading: "What a Velixa MIS pack looks like",
            cards: [
              { title: "P&L summary", body: "Revenue, gross margin, opex and EBITDA — actual vs budget vs last month, by segment." },
              { title: "Cash-flow", body: "Operating, investing and financing cash flows — with a 13-week rolling cash forecast." },
              { title: "Receivables & payables", body: "Ageing buckets, top customers/vendors, expected collection dates and overdue actions." },
              { title: "Inventory", body: "Stock ageing, slow-mover list, stock-turn ratio and reorder triggers by SKU." },
              { title: "GST summary", body: "Output, input, net payable and ITC reconciliation status — before the 20th of every month." },
              { title: "Custom KPIs", body: "CAC, contribution margin, store-wise P&L, doctor-wise revenue, project profitability — your call." },
            ],
          },
          {
            heading: "Engagement model",
            bullets: [
              "KPI workshop — what does the founder want to see every month?",
              "Dashboard template designed in Excel / Sheets / Power BI / Looker Studio",
              "Monthly data extraction from Tally / Zoho + manual inputs captured",
              "MIS published by the 10th with variance analysis and action points",
              "30-minute monthly review call with founder / CFO",
              "Quarterly refinement — add or retire KPIs as the business evolves",
            ],
          },
          {
            heading: "Why founders outsource MIS to us",
            body: "Most in-house MIS reports die because the analyst leaves, the format changes, or the founder stops reading them. We institutionalise the format — same template every month, same delivery date, same review cadence — so the discipline survives staff changes and growth.",
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
