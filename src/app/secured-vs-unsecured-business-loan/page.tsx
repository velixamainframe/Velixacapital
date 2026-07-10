import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/secured-vs-unsecured-business-loan";
const TITLE = "Secured vs Unsecured Business Loan — The Full Trade-Off";
const DESCRIPTION =
  "Unsecured = fast, smaller, expensive, no collateral risk. Secured = slow, larger, cheaper, but you pledge an asset. Here's the full trade-off and decision matrix.";

const FAQS = [
  {
    q: "I don't own property — can I still get a secured loan?",
    a: "Possibly, by pledging other assets: fixed deposits (loan against FD), gold (gold loan), shares/MFs (loan against securities), insurance policy (loan against LIC). These are smaller-ticket but cheaper than unsecured. Alternatively, find a co-applicant (spouse, parent) who owns property.",
  },
  {
    q: "If I have property, should I always go secured?",
    a: "Not always. If your need is small (₹5–15 L), short-term (1–3 years), and you don't want to risk the property, unsecured may be better — the rate premium is small in absolute rupees on a small ticket, and the disbursement is much faster. Secured makes sense for larger tickets (₹25 L+) or longer tenures (5+ years).",
  },
  {
    q: "What happens to my pledged property if my business fails?",
    a: "If you default on a secured loan, the lender can invoke the SARFAESI Act to take possession of and sell the pledged property to recover the dues. The proceeds first cover the outstanding loan; any surplus is returned to you. If the sale proceeds are insufficient, the lender can pursue you personally for the shortfall. This is the real risk of secured loans.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Secured vs Unsecured Business Loan", url: SLUG }])) }} />
      <AdvisoryPage
        eyebrow="Secured vs Unsecured Business Loan"
        title="Secured vs unsecured business loan — the full trade-off"
        subtitle="Unsecured = fast, smaller, expensive, no collateral risk. Secured = slow, larger, cheaper, but you pledge an asset. Here's the decision matrix."
        crumbs={[{ label: "Home", to: "/" }, { label: "Secured vs Unsecured Business Loan" }]}
        intro="Secured and unsecured business loans are not just 'with collateral vs without'. They serve different ticket sizes, tenures and use cases. Going unsecured when you could go secured means paying 4–8% more in interest. Going secured when you don't need to means risking an asset for a small saving. The decision matters — and most borrowers get it wrong because they don't run the numbers."
        formVariant="general"
        formService="Secured vs Unsecured Business Loan Advisory"
        sections={[
          {
            heading: "The full trade-off",
            cards: [
              { title: "Ticket size", body: "Unsecured: ₹5 L–₹50 L (typical). Secured (LAP): ₹25 L–₹10 Cr+. Secured unlocks much larger tickets." },
              { title: "Tenure", body: "Unsecured: 1–5 years (some 7). Secured: 5–15 years (some 20). Secured gives longer repayment runway." },
              { title: "Rate (indicative)", body: "Unsecured: 11–24% p.a. Secured: 9–13% p.a. A 4–10% spread on the same ticket is significant." },
              { title: "Disbursement speed", body: "Unsecured: 3–7 days. Secured: 3–6 weeks (title, valuation, legal). Unsecured is 4–6x faster." },
              { title: "Documentation", body: "Unsecured: KYC + ITR + GST + bank statements. Secured: all that + property docs + title chain + valuation." },
              { title: "Collateral risk", body: "Unsecured: no asset at risk. Secured: you can lose the pledged asset if you default." },
              { title: "DSCR/FOIR flexibility", body: "Unsecured: strict 1.5x DSCR, 50–60% FOIR. Secured: flexible 1.25x DSCR, 60–70% FOIR." },
              { title: "Prepayment penalty", body: "Unsecured: 4–5% (high). Secured: 2–4% (some nil on floating). Secured is more prepay-friendly." },
            ],
          },
          {
            heading: "Decision matrix — which to choose",
            bullets: [
              "Ticket <₹25 L + need in 1 week + no property → unsecured",
              "Ticket ₹25–50 L + can wait 4 weeks + have property → secured (save 4–8% rate)",
              "Ticket >₹50 L → almost always secured (unsecured cap is ~₹50 L)",
              "Tenure >5 years → secured (unsecured rarely beyond 5)",
              "Bad CIBIL/borderline file → secured (collateral lifts approval odds)",
              "Don't want to risk property → unsecured (even if costlier)",
              "Mixed use → secured for capex, unsecured/OD for working capital",
            ],
          },
          {
            eyebrow: "Cost illustration",
            heading: "₹40 L for 5 years — unsecured vs LAP",
            body:
              "Unsecured business loan @ 16% p.a., 5 yrs: EMI ~₹97,000, total interest ~₹18.2 L. LAP @ 10% p.a., 5 yrs: EMI ~₹85,000, total interest ~₹11.0 L. Same ticket, same tenure — LAP saves ₹12,000/month on EMI and ₹7.2 L in total interest — for the same ticket, same tenure, same use of funds.",
            bullets: [
              "₹40 L unsecured @ 16%, 5 yrs → EMI ₹97,000, total interest ₹18.2 L",
              "₹40 L LAP @ 10%, 5 yrs → EMI ₹85,000, total interest ₹11.0 L",
              "Same ticket, same tenure — LAP saves ₹7.2 L in interest",
              "If you extend LAP to 10 yrs: EMI ₹53,000, total interest ₹23.4 L",
              "Trade-off: lower EMI vs higher total interest vs longer repayment burden",
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
