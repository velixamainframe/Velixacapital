import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/high-existing-emi";
const TITLE = "High Existing EMI — How to Lower FOIR and Qualify for the Next Loan";
const DESCRIPTION =
  "Existing EMIs eating your eligibility? Three levers — prepay, refinance/extend, add co-applicant — and which combination works for which file.";

const FAQS = [
  {
    q: "How much existing EMI is too much?",
    a: "It depends on your income. The metric is FOIR (existing EMIs + proposed EMI ÷ net income). Most banks cap at 50–60%; NBFCs up to 70%. If your existing EMIs alone are already 50%+ of net income, there's little room for a new loan. The fix: prepay small existing loans (frees up FOIR), refinance/extend tenure (reduces EMI), or add a co-applicant (dilutes FOIR).",
  },
  {
    q: "Should I prepay an existing loan or apply for a new one first?",
    a: "Prepay first, then apply. After prepayment, wait 30–45 days for the closure to reflect on your CIBIL (get the No Objection Certificate and pull CIBIL to confirm). Then apply for the new loan — the lender will see the closed loan and your improved FOIR. Applying with high FOIR is the most common cause of rejection; prepaying first eliminates the trigger.",
  },
  {
    q: "Will extending the tenure of an existing loan hurt my CIBIL?",
    a: "Restructuring or refinancing to a longer tenure doesn't directly hurt your CIBIL — the loan remains in good standing with on-time payments. The trade-off is more total interest paid over the longer tenure. But the FOIR improvement may unlock a new loan at a much better rate, saving far more than the additional interest on the existing loan. Run the numbers carefully.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "High Existing EMI", url: SLUG }])) }} />
      <AdvisoryPage
        eyebrow="High Existing EMI"
        title="High existing EMI — three levers to lower FOIR and qualify"
        subtitle="Existing EMIs eating your eligibility? Prepay, refinance/extend, or add co-applicant — here's which combination works for which file, with worked examples."
        crumbs={[{ label: "Home", to: "/" }, { label: "High Existing EMI" }]}
        intro="A high existing EMI burden is one of the most common rejection reasons — and one of the most fixable. Lenders apply a FOIR cap (typically 50–60% for banks, 70% for NBFCs) that includes your existing EMIs plus the proposed EMI. If your existing EMIs already consume most of your FOIR headroom, there's no room for the new loan. Three levers — prepay, refinance/extend tenure, add co-applicant — each with different costs and timelines. This guide walks through each with worked examples."
        formVariant="general"
        formService="High Existing EMI Advisory"
        sections={[
          {
            heading: "Compute your FOIR before applying",
            body:
              "FOIR = (Sum of all existing monthly EMIs + proposed EMI) ÷ Net monthly income. Compute this honestly before approaching any lender. List every loan EMI, credit card minimum (typically 5% of limit per lender convention), and OD servicing (1–2% of OD limit per month). The proposed EMI is on the new loan you want. If the resulting FOIR is >60% for a bank or >70% for an NBFC, you'll be rejected — fix before applying.",
            bullets: [
              "List every existing EMI: home, car, personal, business, education, gold",
              "Add credit card minimum dues (5% of limit per lender convention)",
              "Add OD interest servicing (1–2% of OD limit per month)",
              "Compute total existing obligations per month",
              "Divide by net monthly income → current FOIR (without new loan)",
              "Add proposed EMI → new FOIR (this is what the lender computes)",
              "If new FOIR >60% (bank) or >70% (NBFC) → fix before applying",
            ],
          },
          {
            heading: "The three levers to lower FOIR",
            cards: [
              { title: "1. Prepay existing loans", body: "Closing even one small loan frees up significant monthly EMI. Prepay the highest-rate smallest-tenure loan first. Wait 30–45 days for closure to reflect on CIBIL, then apply for the new loan." },
              { title: "2. Refinance / extend tenure", body: "Refinance an existing loan to a longer tenure — EMI drops, FOIR improves. Or restructure with the same lender. Trade-off: more total interest paid, but eligibility unlocks." },
              { title: "3. Add a co-applicant", body: "Co-applicant's income gets added to the numerator (combined income); their EMIs to the denominator. If co-applicant has low obligations and separate income, combined FOIR drops significantly." },
            ],
          },
          {
            eyebrow: "Worked example",
            heading: "₹1.5 L income, ₹1 L existing EMIs — qualifying for ₹25 L loan",
            body:
              "Current FOIR: ₹1,00,000 ÷ ₹1,50,000 = 67%. Bank cap 60%. Proposed ₹25 L loan at 12% for 5 yrs → EMI ₹55,000. New FOIR: ₹1,55,000 ÷ ₹1,50,000 = 103% — auto-decline. Three paths computed:",
            bullets: [
              "Path 1: Prepay ₹8,000/mo personal loan (₹4 L outstanding) → FOIR 97% — still declined",
              "Path 2: Add spouse co-applicant with ₹80,000 income → combined FOIR 67% — approvable at NBFC",
              "Path 3: Combine Path 1 + Path 2 → FOIR 63% — approvable at private bank at better rate",
              "Path 4: Smaller ticket (₹10 L instead of ₹25 L) + spouse co-applicant → FOIR 52% — PSU bank approval at best rate",
              "Best path depends on your urgency (smaller ticket = faster, lower total cost) vs ticket need",
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
