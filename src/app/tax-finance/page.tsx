import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/tax-finance";
const TITLE = "Tax & Finance Advisory";
const DESCRIPTION =
  "Combined tax and finance strategy for founders and CFOs — cash-flow modelling, working-capital planning, tax-efficient capital structure and lender-ready financials.";

const FAQS = [
  {
    q: "How is this different from accounting or tax filing?",
    a: "Filing is backwards-looking — reporting what already happened. Tax & finance advisory is forward-looking — modelling the next 12–24 months, structuring transactions for tax efficiency, and producing financials that lenders and investors trust. It's the difference between a historian and a CFO.",
  },
  {
    q: "Can you help me raise debt or equity?",
    a: "We prepare the financial package lenders and investors ask for — audited financials, projections, fund-use plan, MIS and sector benchmarking. We don't underwrite or sell securities, but we make sure your numbers tell the right story to the right counterparty.",
  },
  {
    q: "What's the right cadence for advisory reviews?",
    a: "Monthly for high-growth startups and companies raising capital. Quarterly for stable MSMEs. Annual-only works for small proprietorships. We scale the cadence to your business stage and budget.",
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
              { name: "Tax & Finance Advisory", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Tax & Accounting"
        title="Tax & finance advisory — when the numbers need to drive decisions."
        subtitle="For founders and CFOs who want forward-looking financial strategy, not just historical bookkeeping. Tax-efficient structures, lender-ready projections and a real CFO partner."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Tax & Accounting", to: "/tax-accounting" },
          { label: "Tax & Finance Advisory" },
        ]}
        intro="Velixa Capital combines tax expertise with corporate-finance discipline. We help MSMEs, startups and HNI-run businesses structure transactions, model cash flow, plan capital expenditure and prepare financials that survive lender and investor diligence. Trust. Growth. Stability. Prosperity."
        formVariant="tax-accounting"
        formService="Tax & Finance Advisory"
        sections={[
          {
            heading: "Where this engagement helps most",
            bullets: [
              "Founder salary vs dividend vs buyback — optimising the mix",
              "Working-capital cycle — receivables, payables, inventory days",
              "Capex planning and depreciation-led tax shield",
              "Project finance and term-loan structuring",
              "Cash-flow forecast for the next 12–24 months",
              "Sector benchmarking against listed peers",
              "Lender and investor data-room preparation",
              "Quarterly board / MIS reporting pack",
            ],
          },
          {
            heading: "How we engage",
            cards: [
              { title: "Discovery", body: "We start with a 90-minute session to understand the business model, capital structure, growth plan and tax posture." },
              { title: "Diagnostic", body: "We review books, banking, GST and previous filings to spot gaps and opportunities before suggesting changes." },
              { title: "Plan", body: "A written 12-month financial and tax plan with quarterly milestones, projected savings and recommended structures." },
              { title: "Execution", body: "We work alongside your CA / internal finance team to implement — salary structures, vendor agreements, projections, MIS." },
              { title: "Review", body: "Monthly or quarterly reviews compare actual vs plan, surface variances and recalibrate before the year closes." },
            ],
          },
          {
            heading: "Why this matters for borrowing capacity",
            body: "Every loan underwriter reads your ITR, GST and banking together. A finance team that thinks only about tax savings often under-declares income — and then discovers they can't borrow when growth needs it. We balance both, so your file is loan-ready when opportunity knocks.",
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
