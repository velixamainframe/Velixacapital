import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/no-itr-business-loan";
const TITLE = "No ITR Business Loan — Realistic Options When You Haven't Filed";
const DESCRIPTION =
  "No ITR? Bank MSME loans are off the table. But NBFCs, fintech GST-loans, and secured loans still work. Here's what's actually available, with honest rate expectations.";

const FAQS = [
  {
    q: "Can I get a business loan without ITR?",
    a: "From a traditional bank, almost certainly no — banks underwrite on ITR profit. From an NBFC with a GST-based program, possibly — they underwrite on GST turnover and banking. From a fintech, possibly at high rates. From a secured lender (LAP, gold, FD-backed), yes — CIBIL matters less when fully collateralised. The realistic path depends on your ticket, urgency, and asset base.",
  },
  {
    q: "Should I file pending ITR before applying for a loan?",
    a: "Almost always yes. Pending ITR is itself a decline reason at most lenders. File the pending ITR (with late fee + interest if applicable), wait for it to process (typically 2–4 weeks for e-filing acknowledgement, longer for processing), then apply. The 1-month wait saves you from a near-certain rejection and the resulting CIBIL enquiry.",
  },
  {
    q: "I'm a new business with no ITR yet — what can I do?",
    a: "Three options: (1) CGTMSE-backed collateral-free MSME loan — some banks accept projection financials for new MSMEs; (2) Secured LAP or gold loan against founder/family property; (3) Founder personal loan + credit card for small-ticket needs. After 1–2 years of ITR, full MSME loan options open up.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "No ITR Business Loan", url: SLUG }])) }} />
      <AdvisoryPage
        eyebrow="No ITR Business Loan"
        title="No ITR business loan — realistic options when you haven't filed"
        subtitle="Banks will say no. But NBFC GST-based loans, fintech loans, and secured routes (LAP, gold, FD) still work. Here's what's actually available — with honest rate expectations."
        crumbs={[{ label: "Home", to: "/" }, { label: "No ITR Business Loan" }]}
        intro="A business loan without ITR is hard — most banks underwrite on ITR profit and reject files without it. But you're not out of options. NBFCs with GST-based programs underwrite on GST turnover. Fintech lenders underwrite on banking + GST. Secured loans (LAP against property, gold loan, FD-backed) don't depend on ITR — collateral is the security. The realistic path depends on your ticket, urgency, asset base, and CIBIL. This guide walks through each option with honest rate expectations."
        formVariant="general"
        formService="No ITR Business Loan Advisory"
        sections={[
          {
            heading: "Five realistic options without ITR",
            cards: [
              { title: "1. NBFC GST-based loan", body: "Underwrites on GST turnover + banking. Tickets ₹5 L–₹1 Cr depending on GST turnover. Rate 16–22% p.a. Faster TAT (3–7 days). Requires 12+ months of filed GST returns." },
              { title: "2. Fintech business loan", body: "Underwrites on banking + GST (some on banking alone). Tickets ₹2–25 L. Rate 18–30% p.a. Fastest TAT (3–5 days). Smaller tickets only." },
              { title: "3. LAP (loan against property)", body: "If you or family own property, LAP at 10–13% p.a. doesn't depend on ITR (collateral is the security). Some lenders may still ask for ITR for repayment capacity assessment." },
              { title: "4. Gold loan", body: "Loan against gold ornaments — 9–24% p.a. depending on lender. CIBIL and ITR irrelevant; gold is collateral. Disburses in 30 minutes at most branches." },
              { title: "5. FD-backed loan", body: "Loan against fixed deposit — FD rate + 1–2%. CIBIL and ITR irrelevant. Fast (24–48 hours). Best for small-ticket emergency needs." },
              { title: "6. CGTMSE for new MSMEs", body: "Some banks accept projection financials for new MSMEs under CGTMSE. Collateral-free up to ₹5 Cr. Slower TAT (4–6 weeks) but the only collateral-free option without ITR." },
            ],
          },
          {
            eyebrow: "Decision matrix",
            heading: "Pick the option by your ticket and asset base",
            bullets: [
              "₹2–25 L, fast (3–5 days), no collateral → fintech at 18–30%",
              "₹5 L–₹1 Cr, 12+ mo GST filed, can wait 1 week → NBFC GST-loan at 16–22%",
              "₹25 L–₹10 Cr+, own property, can wait 4 weeks → LAP at 10–13%",
              "₹1–10 L emergency, own gold → gold loan at 9–24%",
              "₹1–10 L emergency, own FD → FD-backed loan at FD rate + 1–2%",
              "New MSME, no ITR, no collateral, can wait 6 weeks → CGTMSE",
              "No ITR + no GST + no collateral + no gold/FD/property → no realistic debt option. Build ITR + GST for 12 months first.",
            ],
          },
          {
            eyebrow: "The honest path",
            heading: "If no option fits — build the file first",
            body:
              "If none of the above fits (no ITR, no GST, no collateral, no gold, no FD), there's no realistic debt option for your business today. The honest path: file your ITR (even for one year), register for GST (if applicable), build 12 months of digital banking, then approach lenders. We help you build this 12-month roadmap — free, no obligation. After 12 months, the full MSME loan market opens up.",
            bullets: [
              "File ITR for current year (even if just one year, it's a start)",
              "Register for GST if your turnover exceeds the threshold",
              "Open a current account and route all business income through it",
              "Build 12 months of digital credits (UPI/RTGS/NEFT from named parties)",
              "Get Udyam (MSME) registration — opens CGTMSE eligibility",
              "After 12 months, approach lenders with proper documentation",
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
