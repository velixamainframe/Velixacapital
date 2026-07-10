import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/funding-readiness";
const TITLE = "Funding Readiness — The 6 Pillars of an Approval-Ready File";
const DESCRIPTION =
  "CIBIL, banking, ITR, GST, obligations, collateral — six pillars must all hold. A weakness in any one can sink an otherwise strong file.";

const FAQS = [
  {
    q: "How long does it take to become funding-ready?",
    a: "It depends on which pillars are weak. CIBIL fixes take 3–6 months. Banking cleanup takes 6–12 months. ITR fixes take a full assessment year. GST reconciliation can be done in 2–4 weeks. Obligations fixes can be immediate (prepay) or take months (refinance). A realistic timeline is 6–12 months to go from 'weak' to 'strong' across all six pillars.",
  },
  {
    q: "Can I apply if 5 pillars are strong and 1 is weak?",
    a: "Often yes — it depends which pillar is weak. Weak collateral: go unsecured. Weak obligations: prepay or co-applicant. Weak GST: reconciliation note. Weak ITR: take a secured loan. Weak CIBIL or banking: usually a deal-breaker — fix before applying.",
  },
  {
    q: "Should I use a funding readiness assessment tool?",
    a: "Yes — a structured assessment forces you to look at all six pillars honestly. Our free funding readiness assessment walks through each pillar in 5 minutes and gives a readiness score with specific fixes. Take it before approaching any lender.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Funding Readiness", url: SLUG }])) }} />
      <AdvisoryPage
        eyebrow="Funding Readiness"
        title="Funding readiness — the 6 pillars of an approval-ready file"
        subtitle="A 780 CIBIL doesn't help if your banking has bounces; a strong ITR doesn't help if GST turnover mismatches. All six pillars must hold."
        crumbs={[{ label: "Home", to: "/" }, { label: "Funding Readiness" }]}
        intro="Funding readiness isn't about being 'good enough' — it's about having all six pillars hold up under underwriter scrutiny. A weakness in any one pillar can sink an otherwise strong file. This guide explains each pillar, the readiness check for each, and how to score yourself honestly before approaching any lender."
        formVariant="general"
        formService="Funding Readiness Advisory"
        sections={[
          {
            heading: "The 6 pillars of funding readiness",
            cards: [
              { title: "1. CIBIL readiness", body: "Score 720+, zero settled/written-off trades, <4 enquiries in 6 months, clean 24-month payment history." },
              { title: "2. Banking readiness", body: "12 months clean banking, AMB 1.5–2x proposed EMI, zero bounces, cash deposit ratio <15%." },
              { title: "3. ITR readiness", body: "Last 3 years filed, profit trend stable or growing, declared profit supports target loan's DSCR (1.5x+)." },
              { title: "4. GST readiness", body: "Last 12 months filed on time, GSTR-1 + 3B consistent, turnover reconciles to ITR within 10–20%." },
              { title: "5. Obligations readiness", body: "FOIR <50% (with proposed EMI), no contingent liabilities that could crystallise, credit card utilisation <30%." },
              { title: "6. Collateral readiness (for secured)", body: "Clean property title, valuation supports LTV, no encumbrance, ownership docs in order." },
            ],
          },
          {
            eyebrow: "Self-check",
            heading: "Score yourself on each pillar — Strong / Adequate / Weak / Fail",
            body:
              "Before approaching any lender, score yourself honestly on each pillar. Any 'Fail' = don't apply yet, fix first. Any 'Weak' = approach only lenders whose policy is flexible on that pillar. All 'Strong' or 'Adequate' = approach 1–2 best-fit lenders for premium pricing. Use our free funding readiness assessment to walk through each pillar in 5 minutes.",
            bullets: [
              "CIBIL: pull your report, count enquiries, check for any settled trades",
              "Banking: download 12-month statement, count bounces, compute AMB",
              "ITR: pull last 3 years, compute average profit and growth trend",
              "GST: download 12-month GSTR-1 + 3B, reconcile to ITR turnover",
              "Obligations: list all EMIs + card min dues, compute FOIR",
              "Collateral: list property docs, check title, get indicative valuation",
            ],
          },
          {
            eyebrow: "Common patterns",
            heading: "What most files look like — and what to fix first",
            cards: [
              { title: "Strong CIBIL, weak ITR", body: "Common for tax-optimised MSMEs. Fix: declare higher profit next year, or take secured loan." },
              { title: "Strong ITR, weak banking", body: "Common for cash-heavy businesses. Fix: consolidate to one account, build digital credits for 6+ months." },
              { title: "Strong CIBIL+ITR, weak GST", body: "Common for B2B businesses with exempt sales. Fix: prepare signed reconciliation note before applying." },
              { title: "Strong everything, weak obligations", body: "Common for borrowers with multiple loans. Fix: prepay smallest loan, or add co-applicant." },
              { title: "Weak CIBIL, strong everything else", body: "Common after a one-off default. Fix: 6 months of no new applications + on-time payments." },
              { title: "All pillars weak", body: "Don't apply now — you'll be rejected and the enquiry will weaken CIBIL further. Take 6–12 months to fix." },
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
