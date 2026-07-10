import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/business-accounting";
const TITLE = "Business Accounting";
const DESCRIPTION =
  "End-to-end business accounting for Indian Pvt-Ltd, LLP and partnership firms — books, ROC compliance, GST, payroll and MIS in one integrated engagement.";

const FAQS = [
  {
    q: "Why does a Pvt-Ltd need more than a CA's year-end filing?",
    a: "Year-end filing only reports what already happened — and often misses cash leaks, weak GST reconciliation and unrecorded transactions. A monthly business-accounting engagement keeps books audit-ready, surfaces issues in real time, and lets the founder see real profitability by month, not by April next year.",
  },
  {
    q: "Can you handle both ROC and income-tax filings for my company?",
    a: "Yes — we handle AOC-4, MGT-7, DPT-3, ADT-1, DIR-3 KYC, ITR-6, TDS returns and GST returns as one package. One team, one calendar, one point of contact.",
  },
  {
    q: "Do you also run payroll for our employees?",
    a: "Yes — payroll, payslips, PF/ESI/PT, Form 16 and full-and-final are part of the business-accounting engagement. We charge per-employee-per-month, no minimum seats.",
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
              { name: "Business Accounting", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Tax & Accounting"
        title="Business accounting — one team for books, ROC, GST and payroll."
        subtitle="For Indian Pvt-Ltd, LLP and partnership firms that want one integrated finance partner instead of juggling a CA, a GST consultant, a payroll vendor and a bookkeeper."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Tax & Accounting", to: "/tax-accounting" },
          { label: "Business Accounting" },
        ]}
        intro="Business accounting is more than bookkeeping — it's the monthly discipline that keeps a company compliant, audit-ready and lender-ready. Velixa runs the full stack on Tally Prime or Zoho Books, with ROC, GST, TDS, payroll and MIS handled by one team."
        formVariant="tax-accounting"
        formService="Business Accounting"
        sections={[
          {
            heading: "What's included in the engagement",
            cards: [
              { title: "Books & reconciliation", body: "Monthly recording, bank reconciliation, vendor & customer ledgers, GST input register." },
              { title: "GST & TDS returns", body: "GSTR-1, 3B, 9, 9C, TDS 24Q/26Q — filed before deadline, with pre-filing reconciliation." },
              { title: "Payroll & statutory", body: "Payslips, PF/ESI/PT, Form 16, full-and-final settlements — charged per employee per month." },
              { title: "ROC & MCA filings", body: "AOC-4, MGT-7, DPT-3, DIR-3 KYC, ADT-1 — annual and event-based filings for Pvt-Ltd and LLP." },
              { title: "MIS & review", body: "Monthly P&L, cash-flow, ageing and expense analytics shared by the 10th — plus a 30-min review call." },
              { title: "Audit & ITR", body: "Statutory audit coordination, tax audit (3CD) and company ITR-6 filing at year-end." },
            ],
          },
          {
            heading: "Industries we serve",
            bullets: [
              "Tech startups & SaaS companies",
              "D2C brands & e-commerce sellers",
              "Manufacturing & MSME units",
              "Professional firms (CA, legal, architecture)",
              "Clinics, hospitals & education institutes",
              "Real-estate developers & contractors",
              "Restaurants, cloud kitchens & FMCG",
              "B2B services & consulting firms",
            ],
          },
          {
            heading: "Velixa positioning",
            body: "Running a Pvt-Ltd means at least 12 statutory filings a year, plus payroll and ROC. Most founders discover this only when a notice arrives. We replace reactive filing with a planned monthly cadence — so compliance becomes invisible, and the founder sees real numbers every month.",
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
