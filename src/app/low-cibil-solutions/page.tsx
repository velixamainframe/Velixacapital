import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/low-cibil-solutions";
const TITLE = "Low CIBIL Solutions — Realistic Options When Your Score Is Below 700";
const DESCRIPTION =
  "If your CIBIL is below 700, traditional bank loans are hard. Here are realistic solutions: secured loans, co-applicant, NBFC routes, and the 6-month recovery path.";

const FAQS = [
  {
    q: "Can I get a loan with a CIBIL score of 600?",
    a: "Possibly — fintech NBFCs and some gold/FD-backed lenders accept 600+. Options: secured loan against FD/gold/shares/property (CIBIL matters less when fully collateralised); co-applicant with strong CIBIL; NBFC at higher pricing (18–24%). Avoid applying to 5 lenders in parallel — each hard enquiry further lowers the score.",
  },
  {
    q: "Should I take a high-rate NBFC loan now or wait 6 months to fix my CIBIL?",
    a: "It depends on urgency. If the loan is for genuine emergency or time-sensitive business need, take the NBFC loan now and refinance to a bank loan after 12–18 months of on-time repayment. If the need is not urgent, fixing CIBIL first saves 4–8% in rate — significant on any ticket >₹5 L.",
  },
  {
    q: "Will a co-applicant with a high CIBIL help me get approved?",
    a: "Yes — a co-applicant with 750+ CIBIL and separate income can lift approval odds significantly, especially if your co-applicant has low existing obligations. The loan appears on both CIBIL reports; default hurts both. Use this option carefully — only with someone who understands and accepts the joint liability.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Low CIBIL Solutions", url: SLUG }])) }} />
      <AdvisoryPage
        eyebrow="Low CIBIL Solutions"
        title="Low CIBIL solutions — realistic options when your score is below 700"
        subtitle="Banks may say no, but you still have options: secured loans, co-applicant, NBFC routes, and a 6-month recovery path to bank-rate lending."
        crumbs={[{ label: "Home", to: "/" }, { label: "Low CIBIL Solutions" }]}
        intro="A low CIBIL score (below 700) closes most bank doors but doesn't close all doors. Secured loans (against FD, gold, shares, property) are still available because collateral matters more than score. NBFCs and fintech lenders accept 600–700 scores at higher pricing. And a co-applicant with strong credit can lift your approval odds. This guide walks through each option, the realistic cost, and the strategic path back to bank-rate lending."
        formVariant="general"
        formService="Low CIBIL Solutions Advisory"
        sections={[
          {
            heading: "Five realistic options for low CIBIL",
            cards: [
              { title: "1. Secured loan against FD", body: "Loan against your fixed deposit — 90–95% of FD amount, rate = FD rate + 1–2%. CIBIL barely matters; the FD is the collateral. Fast (24–48 hours). Best for small-ticket emergency needs." },
              { title: "2. Gold loan", body: "Loan against gold ornaments — up to 75–90% of gold value (RBI LTV cap), rate 9–24% p.a. CIBIL irrelevant; gold is collateral. Disburses in 30 minutes at most branches." },
              { title: "3. Loan against shares / MFs", body: "Loan against approved shares or mutual funds — up to 50–80% LTV (varies by lender), rate 9–13% p.a. CIBIL secondary; collateral is primary." },
              { title: "4. LAP (loan against property)", body: "If you own property, LAP at 9–13% p.a. is available even at 650 CIBIL — collateral lifts approval odds. Slower (3–6 weeks) but cheap." },
              { title: "5. Co-applicant with strong CIBIL", body: "Add spouse/parent/sibling with 750+ CIBIL as co-applicant. Combined profile lifts approval odds at most banks. Loan appears on both reports; default hurts both." },
              { title: "6. NBFC unsecured loan", body: "NBFCs (Bajaj, L&T, Tata Capital) accept 650+ at higher pricing (16–22%). Fintechs (PaySense, Niro, etc.) accept 600+ at 22–30%. Last resort when speed matters more than cost." },
            ],
          },
          {
            eyebrow: "Decision matrix",
            heading: "Pick the option by your urgency and asset base",
            bullets: [
              "Have FD/gold/shares → use them; cheapest secured option",
              "Own property, can wait 4 weeks → LAP at 10–13%",
              "Need ₹5–25 L in 1 week → NBFC at 16–22%",
              "Strong co-applicant available → add as co-applicant, approach bank",
              "Need ₹1–3 L emergency → gold loan (fastest, reasonable rate)",
              "Below 600 CIBIL → only secured routes (FD/gold/LAP)",
              "Above 650 + can wait 6 months → fix CIBIL first, then approach bank at 11–14%",
            ],
          },
          {
            eyebrow: "The strategic path",
            heading: "From NBFC pricing to bank-rate lending — the 18-month plan",
            body:
              "If you must take a high-rate NBFC loan now, structure it as a bridge — not a long-term solution. Make 12–18 months of on-time repayments, then approach a bank for a takeover or balance transfer at a lower rate. The bank sees the clean repayment history as positive credit behaviour and may approve at 11–14% (vs the 18–22% you started at). The interest savings over the remaining tenure justify the takeover cost.",
            cards: [
              { title: "Months 0–12", body: "Take the NBFC loan at 18–22%. Set up auto-debit. Never miss a payment. Build the repayment track record." },
              { title: "Months 12–18", body: "Pull your CIBIL — confirm the score has improved. The clean repayment of the NBFC loan is positive data." },
              { title: "Month 18", body: "Approach a bank for takeover/balance transfer. Present your improved CIBIL, clean repayment history, and current ITR/banking." },
              { title: "Post-takeover", body: "Pay 11–14% instead of 18–22% on the remaining outstanding. Savings: 4–8% per year on the outstanding — significant on any ticket." },
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
