import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/accounting";
const TITLE = "Accounting Advisory";
const DESCRIPTION =
  "Outsourced bookkeeping and accounting for Indian MSMEs, startups, professionals and retailers — Tally Prime, Zoho Books, QuickBooks. Audit-ready books, monthly reconciliation, MIS-ready financials.";

const FAQS = [
  {
    q: "Tally or Zoho Books — which should I pick?",
    a: "If you're a distributor, manufacturer or trader with heavy inventory and your CA already uses Tally, stay on Tally Prime. If you're a tech startup, D2C brand or service business that wants cloud access and automation, Zoho Books wins. We work on both — and we'll tell you honestly which fits your workflow.",
  },
  {
    q: "Can you take over books mid-year?",
    a: "Yes — we reconstruct opening balances from your last audited financials, reconcile the gap period, and continue cleanly from there. Most transitions take 10–15 working days depending on how clean the previous books were.",
  },
  {
    q: "Will my data stay confidential?",
    a: "Yes — strict NDA, isolated cloud folders, role-based access limited to the assigned accountant and reviewer. We never share client data with third parties, including your bank, without your written consent.",
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
              { name: "Accounting", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Tax & Accounting"
        title="Accounting advisory — clean books, every month, without surprises."
        subtitle="Tally Prime, Zoho Books, QuickBooks or Busy — we run your books on the platform that fits your business and deliver audit-ready financials by the 10th of every month."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Tax & Accounting", to: "/tax-accounting" },
          { label: "Accounting" },
        ]}
        intro="Most founders treat accounting as a year-end ritual. We treat it as a monthly operating discipline — record every transaction, reconcile every bank and GST line, and produce a clean P&L, balance sheet and cash-flow statement that's ready for audit, lender or investor the day you need it."
        formVariant="tax-accounting"
        formService="Accounting Advisory"
        sections={[
          {
            heading: "Verticals we specialise in",
            cards: [
              { title: "Retail & FMCG distribution", body: "Multi-godown inventory, batch & expiry tracking, distributor schemes and ageing-led receivables." },
              { title: "Manufacturing", body: "Bill of material, costing variants, work-in-progress and machine-hour-based overheads." },
              { title: "D2C & e-commerce", body: "Channel-wise revenue (Amazon, Flipkart, Shopify), ad-spend ROAS, return & RTO accounting." },
              { title: "Doctors & clinics", body: "Doctor-wise revenue, consumables tracking, TDS on consultation fees and OPD/IPD billing." },
              { title: "Real-estate developers", body: "Project-wise P&L, RERA compliance, customer receivables and contractor payables." },
              { title: "Professional firms", body: "Matter-wise profitability, time tracking, partner draws and tax on professional receipts." },
            ],
          },
          {
            heading: "What you get every month",
            bullets: [
              "Bank reconciliation across all accounts",
              "GST input register and GSTR-2B reconciliation",
              "Customer & vendor ledgers with ageing",
              "P&L, balance sheet and cash-flow statement",
              "Expense analytics by category and vendor",
              "Open items list — what's pending from your end",
            ],
          },
          {
            heading: "Velixa positioning",
            body: "Outsourced accounting only works if your accountant understands your business model. We assign a sector-matched accountant and a senior reviewer to every file — so the books reflect how the business actually runs, not just what the invoices say.",
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
