import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/loan-readiness-checklist";
const TITLE = "Loan Readiness Checklist — The Complete Pre-Application Audit";
const DESCRIPTION =
  "Before you apply to any lender: CIBIL pull, banking cleanup, ITR pull, GST reconciliation, FOIR computation, collateral docs. The full pre-application checklist, in order.";

const FAQS = [
  {
    q: "How far in advance should I start the loan readiness checklist?",
    a: "Ideally 6–12 months before you need the loan. CIBIL fixes take 3–6 months. Banking cleanup takes 6–12 months. ITR fixes take a full assessment year. If you start the checklist 6 months before applying, you have time to address the weakest pillars. If you start 1 week before applying, you're stuck with the file as-is.",
  },
  {
    q: "What documents should I have ready before approaching a lender?",
    a: "KYC (PAN, Aadhaar, address proof), last 3 years ITR + computation, last 12 months banking statements (primary account), last 12 months GST returns (GSTR-1 + 3B), business vintage proof (registration, MSME/Udyam), stock + receivables statement (for CC), property docs (for secured loans), CIBIL report. Having these ready shortens TAT by 1–2 weeks.",
  },
  {
    q: "Should I get my CIBIL report before approaching a lender?",
    a: "Absolutely yes. A self-check is free (one per year from CIBIL directly, or via your bank's app) and doesn't impact the score. Pulling your own CIBIL lets you catch errors, see your enquiry pattern, and know your score before the lender does. If your CIBIL is weak, you can fix it before applying — rather than discovering it via a rejection.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Loan Readiness Checklist", url: SLUG }])) }} />
      <AdvisoryPage
        eyebrow="Loan Readiness Checklist"
        title="Loan readiness checklist — the complete pre-application audit"
        subtitle="Run this 24-point checklist before approaching any lender. Each item is a pass/fail gate; a single failure can sink an otherwise strong file."
        crumbs={[{ label: "Home", to: "/" }, { label: "Loan Readiness Checklist" }]}
        intro="Most loan rejections are preventable — the borrower simply didn't audit their file before applying. This 24-point checklist walks through every gate an underwriter will check, in priority order. Run it honestly, fix the failures, and only then approach 1–2 best-fit lenders. Skipping the checklist is the most expensive shortcut in MSME borrowing."
        formVariant="general"
        formService="Loan Readiness Checklist Review"
        sections={[
          {
            eyebrow: "Pillar 1 — CIBIL (6 checks)",
            heading: "CIBIL readiness checks",
            bullets: [
              "1. CIBIL score 720+ (650+ acceptable at NBFCs only)",
              "2. Fewer than 4 hard enquiries in last 6 months (pull your CIBIL to confirm)",
              "3. Zero 'Settled' or 'Written-off' accounts in last 7 years",
              "4. Zero DPD (days past due) >0 in last 24 months",
              "5. Credit card utilisation below 30% of limit",
              "6. Active trade count 2–5 (not too few, not too many)",
            ],
          },
          {
            eyebrow: "Pillar 2 — Banking (4 checks)",
            heading: "Banking readiness checks",
            bullets: [
              "7. Average monthly balance (AMB) at least 1.5× proposed EMI",
              "8. Zero cheque/ECS bounces in last 6 months",
              "9. Cash deposit ratio below 15% of total credits",
              "10. Primary account shows regular business/salary credits from named parties",
            ],
          },
          {
            eyebrow: "Pillar 3 — ITR (4 checks)",
            heading: "ITR readiness checks",
            bullets: [
              "11. Last 3 years' ITR filed (some lenders accept 2)",
              "12. Profit trend stable or growing (not declining)",
              "13. Declared profit supports DSCR of 1.5×+ on proposed loan",
              "14. No major discrepancies between ITR and Form 26AS / AIS",
            ],
          },
          {
            eyebrow: "Pillar 4 — GST (3 checks)",
            heading: "GST readiness checks",
            bullets: [
              "15. Last 12 months' GSTR-1 and GSTR-3B filed on time",
              "16. GSTR-1 turnover reconciles with GSTR-3B turnover",
              "17. GST turnover reconciles with ITR turnover within 20% (or reconciliation note ready)",
            ],
          },
          {
            eyebrow: "Pillar 5 — Obligations (3 checks)",
            heading: "Obligations readiness checks",
            bullets: [
              "18. FOIR (with proposed EMI) below 50% for banks, 70% for NBFCs",
              "19. No contingent liabilities (guarantees) that could crystallise",
              "20. Existing EMIs debiting on the same date every month (discipline check)",
            ],
          },
          {
            eyebrow: "Pillar 6 — Collateral (for secured) (4 checks)",
            heading: "Collateral readiness checks",
            bullets: [
              "21. Property title clear and marketable (no encumbrance)",
              "22. Property valuation supports LTV (60–70% for residential, 50–60% for commercial)",
              "23. Ownership docs in order (sale deed, chain of title, latest property tax receipt)",
              "24. If property is rented, tenant details and lease agreement available (for LRD)",
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
