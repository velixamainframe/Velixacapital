import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/credit-structuring-method";
const TITLE = "Credit Structuring Method — Designing the Right Loan Before Applying";
const DESCRIPTION =
  "Loan structure matters as much as loan approval. Term loan vs OD vs CC vs LAP, tenure, EMI cycle, security mix — structuring determines the cost and cash-flow fit.";

const FAQS = [
  {
    q: "What is credit structuring and why does it matter?",
    a: "Credit structuring is the design of the loan facility — product type (term loan/OD/CC/LAP), ticket, tenure, EMI cycle, security mix, and lender match — before applying. Good structuring matches the loan to the use of funds and cash flow. Bad structuring (e.g., a term loan for working capital) costs 4–8% more in rate or causes cash-flow stress from EMI mismatch.",
  },
  {
    q: "Should I take one large loan or multiple smaller facilities?",
    a: "Almost always multiple smaller facilities — each matched to a use of funds. Term loan for capex, CC/OD for working capital, BG limits for tenders, equipment finance for machinery. Each facility has its own optimal instrument, rate, and tenure. One large loan means paying interest on idle capital and tenure mismatch with the underlying asset.",
  },
  {
    q: "How do I know which lender to approach for which facility?",
    a: "Each lender has different policy boxes and sector appetites. PSU banks are cheapest for term loans and CC but strictest. Private banks are flexible on professional loans and mid-ticket LAP. NBFCs are best for fast working capital ODs. Asset finance companies (Cholamandalam, Mahindra) are best for machinery. We match the facility to the lender's appetite as part of the structuring.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(TITLE, DESCRIPTION, SLUG)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Credit Structuring Method", url: SLUG }])) }} />
      <AdvisoryPage
        eyebrow="Credit Structuring Method"
        title="Credit structuring method — design the right loan before you apply"
        subtitle="Approval matters. But structure — product, ticket, tenure, EMI cycle, security mix — determines whether the loan actually works for your cash flow. Get the structure right first."
        crumbs={[{ label: "Home", to: "/" }, { label: "Credit Structuring Method" }]}
        intro="Most borrowers focus on getting approved and overlook the structure of the loan itself — the product type, ticket, tenure, EMI cycle, and security mix. A ₹50 L 5-year business loan at 16% costs ₹22.6 L in interest; the same ₹50 L as a 10-year LAP at 10% costs ₹29.2 L but with 45% lower EMI. The right structure for your use of funds and cash flow can save lakhs over the loan life. This is what credit structuring means."
        formVariant="general"
        formService="Credit Structuring Advisory"
        sections={[
          {
            heading: "The 5 dimensions of credit structuring",
            cards: [
              { title: "1. Product type", body: "Term loan, OD, CC, LAP, machinery finance, bill discounting, BG limits — each fits a different use of funds. Term loan for capex; CC/OD for working capital; BG for tenders; machinery finance for equipment." },
              { title: "2. Ticket size", body: "How much to borrow. Not 'how much am I eligible for' but 'how much do I actually need, and what's the minimum I can deploy effectively'. Over-borrowing costs interest; under-borrowing starves the business." },
              { title: "3. Tenure", body: "Match tenure to use of funds. Working capital: 12 months (CC/OD revolving). Capex (machinery): 5–7 years. Property/LAP: 10–15 years. Mismatching tenure to asset life creates cash-flow stress." },
              { title: "4. EMI cycle", body: "Monthly, quarterly, or step-up/step-down EMI. Match EMI cycle to your revenue cycle — quarterly EMI for project-based businesses with lumpy receipts; monthly for stable-income businesses." },
              { title: "5. Security mix", body: "Secured (cheaper, slower, collateral at risk) vs unsecured (faster, expensive, no collateral). Sometimes a mix — partial secured + partial unsecured — is optimal for cost-vs-flexibility trade-off." },
            ],
          },
          {
            eyebrow: "Common structures",
            heading: "Typical credit structures by use case",
            bullets: [
              "Working capital swing (inventory + receivables) → CC against stock + receivables (12-month renewable)",
              "One-time capex (machinery, expansion) → Term loan (5–7 years, secured against asset or property)",
              "Festival inventory build-up → OD against banking + GST (revolving, pay down post-festival)",
              "Major expansion (new unit, large machinery) → LAP against owned property (10–15 years, lowest rate)",
              "Bridge finance (GST refund, buyer payment delay) → Short-term OD (3–6 months, repay on receipt)",
              "Tender requirement (EMD, performance) → BG limits (non-fund-based, saves cash)",
              "Refinance expensive existing loans → LAP at lower rate, longer tenure (consolidation)",
              "Mixed use (capex + working capital) → Term loan for capex + CC for working capital (parallel facilities)",
            ],
          },
          {
            eyebrow: "The structuring process",
            heading: "How we structure credit for your file",
            body:
              "Credit structuring starts with understanding the use of funds, the cash flow available for repayment, and the asset base available for security. We then design the optimal facility mix, identify the 1–2 lenders whose policy fits the structure, prepare the documentation, and negotiate rate/tenure/fees. The output is a structured facility that fits your business — not a one-size-fits-all loan that the bank happens to be selling.",
            bullets: [
              "Step 1: Understand use of funds, repayment capacity, asset base",
              "Step 2: Design facility mix (term loan + OD + BG, etc.) matched to use of funds",
              "Step 3: Identify 1–2 best-fit lenders based on policy + sector appetite",
              "Step 4: Compute eligibility under each lender's DSCR/FOIR/LTV caps",
              "Step 5: Prepare documentation pack, submit to chosen lender(s)",
              "Step 6: Negotiate rate, tenure, processing fee, prepayment terms",
              "Step 7: Disbursement coordination and post-disbursement review",
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
