import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/business-loan-vs-overdraft";
const TITLE = "Business Loan vs Overdraft — The Working Capital Decision";
const DESCRIPTION =
  "Business loan = one-time disbursement, fixed EMI, interest from day 1. Overdraft = revolving limit, interest only on utilised amount. Pick by use case, not by habit.";

const FAQS = [
  {
    q: "Can I have both an OD and a term loan from the same lender?",
    a: "Yes — and it's often the optimal structure for MSMEs. A term loan for capex (machinery, expansion) plus an OD or CC for working capital. The lender sees both facilities, can underwrite them together, and may offer better combined terms than two separate lenders.",
  },
  {
    q: "Is OD interest calculated daily?",
    a: "Yes — OD interest is charged on the daily utilised balance, typically debited monthly. This makes OD significantly cheaper than a term loan if your utilisation is irregular. The trade-off: most ODs have a 12-month renewable tenure, vs a term loan's fixed multi-year tenure.",
  },
  {
    q: "What's the difference between OD and Cash Credit (CC)?",
    a: "OD is a generic overdraft against your banking relationship or collateral. CC is specifically for working capital against inventory and receivables — the lender sets a 'drawing power' based on your eligible current assets. CC tends to be cheaper (lower rate) but requires monthly stock/receivable statements. OD is simpler but often at a higher rate.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Business Loan vs Overdraft", url: SLUG }])) }} />
      <AdvisoryPage
        eyebrow="Business Loan vs Overdraft"
        title="Business loan vs overdraft — the working capital decision"
        subtitle="Business loan = one-time disbursement, fixed EMI, interest from day 1. Overdraft = revolving limit, interest only on utilised amount. Pick by use case, not by habit."
        crumbs={[{ label: "Home", to: "/" }, { label: "Business Loan vs Overdraft" }]}
        intro="Business loan and overdraft serve fundamentally different needs. A business loan is a one-time disbursement repaid in fixed EMIs — perfect for capex. An overdraft is a revolving limit you draw and repay flexibly — perfect for working capital swings. Using the wrong instrument is costly: a term loan for working capital leaves you paying interest on idle cash; an OD for capex is usually too small. This guide walks through the decision."
        formVariant="general"
        formService="Business Loan vs Overdraft Advisory"
        sections={[
          {
            heading: "Side-by-side comparison",
            cards: [
              { title: "Disbursement", body: "Business loan: lump-sum on day 1. OD: approved limit; draw as needed." },
              { title: "Interest", body: "Business loan: charged on full amount from day 1. OD: charged only on utilised amount, only for days used." },
              { title: "Repayment", body: "Business loan: fixed EMI over fixed tenure. OD: flexible — draw and repay any time within the limit." },
              { title: "Tenure", body: "Business loan: 1–7 years fixed. OD: 12 months renewable (reviewed annually)." },
              { title: "Rate (indicative)", body: "Business loan: 11–24% p.a. OD: 12–18% p.a. (typically slightly higher than equivalent term loan)." },
              { title: "Best for", body: "Business loan: one-time capex (machinery, expansion). OD: working capital swings, receivables bridge, festival inventory." },
              { title: "Documentation", body: "Business loan: full pack (KYC + ITR + GST + banking). OD: similar, plus stock + receivables statement (for CC)." },
              { title: "Prepayment", body: "Business loan: 4–5% foreclosure penalty. OD: no penalty — pay down any time (revolving)." },
            ],
          },
          {
            heading: "When to use which — by use case",
            bullets: [
              "Buy machinery → business loan (one-time spend, long-life asset)",
              "Pay vendors during a 60-day receivables cycle → OD (revolving)",
              "Festival season inventory build-up → OD (peak need, then repay)",
              "Office renovation → business loan (one-time spend)",
              "Bridge a 30-day GST refund delay → OD (short-term, repay on refund)",
              "Expand to a new city → business loan for capex + OD for working capital",
              "Replace an old expensive loan → business loan (refinance)",
              "Bid for a large tender requiring bank guarantee → CC against margin",
            ],
          },
          {
            eyebrow: "Cost comparison",
            heading: "₹20 L for 12 months — OD vs term loan cost",
            body:
              "Term loan at 13% p.a., ₹20 L, 12 months: EMI ~₹1,78,000, total interest ~₹1,42,000. OD at 13% p.a., ₹20 L limit, average utilisation 60% over 12 months: interest ~₹1,56,000. If you genuinely need the full ₹20 L for the full year, term loan is cheaper. If you only need it for 6 months of the year, OD costs ~half.",
            bullets: [
              "Always need ₹20 L for 12 months → term loan cheaper (interest from day 1 either way)",
              "Need ₹20 L for 6 months, ₹0 for 6 months → OD much cheaper (interest only when used)",
              "Need ₹10 L average with ₹20 L peak → OD cheaper (interest on ₹10 L average)",
              "Need ₹20 L peak, ₹5 L trough → OD cheaper, but commitment fee may apply on unused",
              "Mixed use (some capex + some working capital) → term loan for capex + OD for working capital",
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
