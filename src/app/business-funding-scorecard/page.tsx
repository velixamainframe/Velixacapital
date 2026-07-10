import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/business-funding-scorecard";
const TITLE = "Business Funding Scorecard — Score Bands & How to Lift Yours";
const DESCRIPTION =
  "0–60 Not Ready · 60–75 Approvable · 75–90 Strong · 90+ Premium. Where does your business file score, and what's the fastest way to lift it to the next band?";

const FAQS = [
  {
    q: "What score do I need to get a business loan at a competitive rate?",
    a: "Score 75+ (Strong) opens competitive rates at most private banks. Score 90+ (Premium) opens the best rates and highest ticket sizes at PSU banks. Below 75, you're looking at NBFC pricing (3–8% higher). Below 60, don't apply yet — fix the weakest pillars first.",
  },
  {
    q: "How is the business funding scorecard different from CIBIL score?",
    a: "CIBIL is one input. The scorecard combines all 6 pillars — CIBIL, banking, ITR, GST, obligations, collateral — into one 0–100 score that reflects your overall funding readiness. A 780 CIBIL with weak banking and weak ITR might score 55 (Not Ready); a 720 CIBIL with strong everything else might score 85 (Strong).",
  },
  {
    q: "How fast can I lift my score to the next band?",
    a: "Depends on the band gap. 60→75: 3–6 months (prepay a small loan, fix banking bounces, file pending GST). 75→90: 6–12 months (declare higher ITR profit, build 12-month clean banking, reduce enquiries). 90+: sustained clean behaviour across all pillars for 12+ months. There's no overnight fix.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Business Funding Scorecard", url: SLUG }])) }} />
      <AdvisoryPage
        eyebrow="Business Funding Scorecard"
        title="Business funding scorecard — the 4 bands that decide your loan terms"
        subtitle="0–60 Not Ready · 60–75 Approvable · 75–90 Strong · 90+ Premium. Where does your business file score — and what's the fastest way to lift it?"
        crumbs={[{ label: "Home", to: "/" }, { label: "Business Funding Scorecard" }]}
        intro="The business funding scorecard combines all six funding pillars into one 0–100 score that tells you — and the lender — where you stand. The score maps to four bands, each with different lender options, rate ranges, and ticket sizes. Knowing your band before applying saves you from wasted hard enquiries and tells you exactly what to fix to lift to the next band."
        formVariant="general"
        formService="Business Funding Scorecard"
        sections={[
          {
            heading: "The four score bands",
            cards: [
              {
                title: "0–60 · Not Ready",
                body: "Don't apply — you'll be rejected and the hard enquiry will further weaken CIBIL. Address the weakest pillars first (typically CIBIL or banking). Realistic timeline to Approvable: 6–12 months. Options during this period: secured loans (gold, FD, LAP) where CIBIL matters less.",
              },
              {
                title: "60–75 · Approvable",
                body: "Private banks and NBFCs will approve; PSU banks may decline. Expect rates 13–22% p.a. To lift to Strong: prepay a small loan, build 6+ months clean banking, file pending GST returns, prepare ITR-GST reconciliation. Timeline: 3–6 months.",
              },
              {
                title: "75–90 · Strong",
                body: "Most banks approve at competitive rates (11–15% p.a.). PSU banks accessible. To lift to Premium: declare higher ITR profit for one more year, eliminate all CIBIL enquiries for 6+ months, build 12+ months clean banking. Timeline: 6–12 months.",
              },
              {
                title: "90+ · Premium",
                body: "Top-tier bank rates (9–12% p.a.), maximum ticket sizes, longest tenures, most flexible terms. Eligible for negotiated pricing on large tickets. Maintain the discipline that got you here — one missed payment or one bad enquiry can drop you back to Strong.",
              },
            ],
          },
          {
            eyebrow: "How the score is computed",
            heading: "The 6 pillars, weighted",
            body:
              "The scorecard is a weighted average of 6 pillars, each scored 0–100. CIBIL and banking are pass/fail gates — they get higher weights. ITR and GST determine ticket size. Obligations and collateral modulate the final number. Compute each pillar's score honestly, then apply the weights.",
            bullets: [
              "CIBIL — 25% weight (score: 720+=100, 700–719=80, 650–699=60, 600–649=30, <600=0)",
              "Banking — 20% weight (score: zero bounces + AMB 2× EMI=100, else progressively lower)",
              "ITR — 20% weight (score: 3 yrs filed + DSCR 1.5×+=100, scaled down for weaker files)",
              "GST — 15% weight (score: 12 mo filed + ITR match <20%=100, scaled for gaps)",
              "Obligations — 10% weight (score: FOIR <50%=100, 50–60%=70, 60–70%=40, >70%=0)",
              "Collateral — 10% weight (score: clean title + 50% LTV=100, scaled for higher LTV or weak title)",
            ],
          },
          {
            eyebrow: "Lift strategies",
            heading: "How to lift your score from one band to the next",
            cards: [
              { title: "Not Ready → Approvable", body: "Address CIBIL (stop applying, pay on time, dispute inaccuracies) and banking (consolidate to one account, stop cash deposits, set auto-debit). Realistic 6–12 month timeline." },
              { title: "Approvable → Strong", body: "Prepay smallest existing loan (frees FOIR), build 6+ months clean banking, file pending GST, prepare ITR-GST reconciliation. Realistic 3–6 month timeline." },
              { title: "Strong → Premium", body: "Declare higher ITR profit for one more year, eliminate all CIBIL enquiries for 6+ months, build 12+ months clean banking. Realistic 6–12 month timeline." },
              { title: "Maintain Premium", body: "Sustained clean behaviour across all pillars for 12+ months. One missed payment or one bad enquiry can drop you back. Discipline compounds — both ways." },
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
