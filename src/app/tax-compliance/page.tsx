import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/tax-compliance";
const TITLE = "Tax & Compliance Advisory";
const DESCRIPTION =
  "Indian direct & indirect tax compliance advisory — ITR, GST, TDS, e-invoicing, notice handling and audit defence. Stay on the right side of every deadline.";

const FAQS = [
  {
    q: "What's the difference between tax planning and tax compliance?",
    a: "Compliance is filing what's due — on time and accurately. Planning is structuring income, expenses and investments so you pay the least legal tax. Velixa does both, but the compliance side is non-negotiable: every return filed on time, every reconciliation done before the deadline.",
  },
  {
    q: "Do you handle GST and income-tax notices?",
    a: "Yes — we respond to intimations under 143(1), defective-return notices 139(9), scrutiny notices 142/143(2), reassessment 148, and GST notices like SCN, ASMT-10, DRC-01 and suspension orders. Our team prepares structured replies, attends hearings and files appeals where needed.",
  },
  {
    q: "Is e-invoicing mandatory for my business?",
    a: "Mandatory once your annual aggregate turnover crosses ₹5 Cr (threshold updated by CBIC). Voluntary e-invoicing is allowed below the threshold and often useful for fast ITC pass-through to buyers. We configure your ERP-to-IRP pipeline end-to-end.",
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
              { name: "Tax & Compliance", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Tax & Accounting"
        title="Tax & compliance advisory — filed right, filed on time."
        subtitle="ITR, GST, TDS, e-invoicing, e-way bill, ROC — every statutory deadline tracked, every reconciliation done before filing, every notice defended."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Tax & Accounting", to: "/tax-accounting" },
          { label: "Tax & Compliance" },
        ]}
        intro="Velixa Capital is a finance and tax consultant for Indian MSMEs, professionals and HNIs. We take ownership of the full compliance calendar — direct tax, indirect tax, TDS, ROC and labour-law filings — so you stop firefighting deadlines and start using financial data to run the business."
        formVariant="tax-accounting"
        formService="Tax & Compliance Advisory"
        sections={[
          {
            heading: "Compliance areas we cover",
            cards: [
              { title: "Income Tax", body: "ITR-1 to ITR-7 for individuals, HUFs, firms, LLPs and companies — including capital gains, crypto, F&O and NRI returns." },
              { title: "GST", body: "Registration, GSTR-1/3B/9/9C, ITC reconciliation, e-invoicing & e-way bills, LUT, refunds and notice handling." },
              { title: "TDS & TCS", body: "Quarterly 24Q/26Q/27Q returns, challan generation, Form 16/16A and lower-deduction certificates (Form 13)." },
              { title: "ROC & MCA", body: "Annual filings (AOC-4, MGT-7), DPT-3, DIR-3 KYC, ADT-1 and event-based filings for Pvt-Ltd and LLP." },
              { title: "Labour & PF/ESI", body: "Shops & Establishment, PF, ESI, PT and LWF monthly/annual returns, plus POSH compliance." },
              { title: "Audit Defence", body: "Structured responses to 143(1), 139(9), 142(1), 143(2), 148 and GST SCNs, DRC-01 and ASMT-10." },
            ],
          },
          {
            heading: "Our compliance workflow",
            bullets: [
              "Annual compliance calendar built for your business structure",
              "Monthly bookkeeping & reconciliation so filings are audit-ready",
              "Pre-filing review — every return cross-checked with 26AS, AIS, GSTR-2B",
              "Soft copy + acknowledgement delivered to your dashboard",
              "Notice tracker — every communication logged and replied to in writing",
              "Quarterly compliance health report shared with founders",
            ],
          },
          {
            heading: "Why founders trust Velixa with compliance",
            body: "Most compliance failures aren't negligence — they're missing calendar awareness and weak reconciliation. We fix both with a single team that owns your books and your filings, so what's reported to the department matches what's in your P&L.",
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
