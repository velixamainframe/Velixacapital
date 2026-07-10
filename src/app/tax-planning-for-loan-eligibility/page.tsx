import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/tax-planning-for-loan-eligibility";
const TITLE = "Tax Planning for Loan Eligibility";
const DESCRIPTION =
  "How ITR, GST and declared income decide your borrowing capacity — salary structure, depreciation, presumptive taxation, banking quality and FOIR. Plan today for the loan you'll need tomorrow.";

const FAQS = [
  {
    q: "I declared low income to save tax — now I can't get a business loan. What do I do?",
    a: "This is the most common reason MSMEs get rejected. Underwriters look at ITR + GST + banking together. If you've optimised tax to the point where declared income can't service the proposed EMI, no lender will approve — even with strong turnover. We restructure your tax position 12–18 months before you actually need the loan, so the declared income supports the borrowing capacity.",
  },
  {
    q: "How much income do I need to show for a ₹50 L business loan?",
    a: "Most banks cap EMI at 50–60% of net cash accruals (FOIR). For a 5-year ₹50 L unsecured business loan at ~14%, EMI is roughly ₹1.17 L — which means a sustainable post-tax profit of ₹2.3–2.5 L per month, plus existing obligations headroom. We model the exact figure for your proposed lender and tenure.",
  },
  {
    q: "Does presumptive taxation (44AD/44ADA) hurt loan eligibility?",
    a: "It can — because presumptive taxation lets you declare income at 6%/8% of turnover, which may be lower than what the bank needs to underwrite. The trade-off is real: pay less tax today vs declare higher income to borrow tomorrow. We help you decide based on your 24-month capital plan.",
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
              { name: "Tax Planning for Loan Eligibility", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Tax & Accounting"
        title="Tax planning for loan eligibility — borrow tomorrow, plan today."
        subtitle="Every ITR, GST return and banking entry you file this year decides the loan you can raise next year. We align your tax position with your 24-month borrowing plan — so the file is fundable when growth needs it."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Tax & Accounting", to: "/tax-accounting" },
          { label: "Tax Planning for Loan Eligibility" },
        ]}
        intro="Velixa Capital sits at the intersection of tax and finance. Most loan rejections aren't credit-score failures — they're tax-planning failures from 12–24 months earlier. We help MSMEs, professionals and HNIs structure their tax position so that when growth needs funding, the underwriter says yes. Trust. Growth. Stability. Prosperity."
        formVariant="tax-accounting"
        formService="Tax Planning for Loan Eligibility"
        sections={[
          {
            heading: "What underwriters actually read",
            cards: [
              { title: "ITR (last 2–3 yrs)", body: "Declared income, profit trend, capital account — the lender's first signal of repayment capacity." },
              { title: "GST returns", body: "Turnover consistency, sector classification, ITC pattern — cross-checked against ITR for any mismatch." },
              { title: "Banking", body: "Average balance, banking vintage, bounced-cheque ratio, cash-deposit ratio, repayment of existing EMIs." },
              { title: "CIBIL & enquiries", body: "Score, mix of secured/unsecured credit, recent enquiries (multiple hard pulls in 30 days hurt)." },
              { title: "FOIR & DSCR", body: "Fixed Obligations to Income Ratio and Debt Service Coverage Ratio — the two formulas that decide your EMI capacity." },
              { title: "Sector & vintage", body: "Some sectors (textiles, trading, certain services) face tighter underwriting; vintage under 2 years limits options." },
            ],
          },
          {
            heading: "Planning levers we use",
            bullets: [
              "Salary vs dividend vs buyback mix for company owners",
              "Depreciation timing — accelerated vs straight-line for the year you plan to borrow",
              "Presumptive (44AD/44ADA) vs regular scheme — tax cost vs declared income",
              "Capital-gain spreading across financial years",
              "Loan EMI prepayment to improve FOIR before applying",
              "Cash deposits reduced in favour of digital receipts for cleaner banking",
              "Vendor and customer banking aligned with your business bank",
              "Existing obligations restructured or consolidated before fresh application",
            ],
          },
          {
            heading: "The 24-month rule",
            body: "Most lenders want 2 (sometimes 3) years of consistent, rising declared income. If you only start planning in the year you need the loan, it's already too late — the file is locked in. We work backwards from your borrowing need: target EMI capacity → required declared income → tax plan for the next 24 months. That's how serious borrowers do it.",
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
