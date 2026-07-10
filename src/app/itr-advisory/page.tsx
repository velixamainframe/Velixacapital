import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/itr-advisory";
const TITLE = "ITR Advisory";
const DESCRIPTION =
  "Income-tax return advisory for salaried, freelancers, traders, HNIs, NRIs and companies — Form 16, capital gains, crypto, F&O, presumptive taxation and notice handling.";

const FAQS = [
  {
    q: "Old regime or new regime — which saves me more tax?",
    a: "It depends on your actual deductions — HRA, home-loan interest, 80C, 80D, NPS, LTA. We run both calculations on your real numbers and recommend the optimal regime for the year. Revisit annually because rules and slabs keep changing.",
  },
  {
    q: "How do I report crypto and F&O income?",
    a: "Crypto gains go under 'Capital Gains' — Schedule VDA (Virtual Digital Asset) — with cost and sale consideration disclosed even on a single trade. F&O and intraday equity are business income — ITR-3 with P&L, balance sheet and turnover for tax-audit applicability. We prepare both correctly.",
  },
  {
    q: "I missed the 31 July deadline — what now?",
    a: "File a belated return under section 139(4) by 31 December — with a late fee of ₹1,000–₹5,000 under 234F plus interest under 234A/B/C. We help you file it correctly, claim eligible deductions, and minimise the interest and penalty exposure.",
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
              { name: "ITR Advisory", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Tax & Accounting"
        title="ITR advisory — every return filed right, every deduction claimed."
        subtitle="Salaried, freelancer, F&O trader, HNI, NRI or company — we prepare, review and file your ITR with reconciliation against Form 26AS, AIS and TIS so no income is missed and no deduction is left on the table."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Tax & Accounting", to: "/tax-accounting" },
          { label: "ITR Advisory" },
        ]}
        intro="Filing an ITR is easy. Filing it correctly — with all income heads reported, every reconciliation matched, every deduction claimed, and the right ITR form chosen — is what we do. Velixa Capital handles ITR-1 to ITR-7 for individuals, HUFs, firms and companies, plus belated, revised and rectification returns."
        formVariant="tax-accounting"
        formService="ITR Advisory"
        sections={[
          {
            heading: "Taxpayers we serve",
            cards: [
              { title: "Salaried", body: "ITR-1/2 with Form 16 auto-import, HRA, LTA, home-loan interest, 80C/80D/80G and capital-gain schedules." },
              { title: "Freelancers & creators", body: "ITR-3/4 with presumptive 44ADA for professionals earning up to ₹75 L — minimal books, low audit risk." },
              { title: "Stock / F&O traders", body: "ITR-3 with trading P&L, turnover computation, tax-audit check and 44AD eligibility review." },
              { title: "Crypto investors", body: "Schedule VDA reporting, 30% tax + 4% cess, 1% TDS reconciliation and loss-set-off rules." },
              { title: "NRIs", body: "Residency status determination, DTAA benefits, India-sourced income (rental, capital gains, interest) reporting." },
              { title: "Companies & LLPs", body: "ITR-6 / ITR-5 with P&L, balance sheet, 3CD tax-audit where applicable, MAT computation." },
            ],
          },
          {
            heading: "Our ITR workflow",
            bullets: [
              "Document collection — Form 16, AIS, 26AS, broker statements, investment proofs",
              "Draft computation shared — total income, tax payable, regime comparison",
              "You approve refund or tax-payable figures in writing",
              "Return filed on Income Tax portal; acknowledgement (ITR-V) shared",
              "E-verification assistance within 30 days (mandatory)",
              "Refund tracking + rectification support under section 154",
            ],
          },
          {
            heading: "Notice & scrutiny support",
            body: "If you receive a 143(1) intimation, 139(9) defective-return notice, 142(1) inquiry, 143(2) scrutiny notice or 148 reassessment — we prepare the response, attend hearings on your behalf and file appeals before CIT(A) where required. Never reply to an income-tax notice on your own.",
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
