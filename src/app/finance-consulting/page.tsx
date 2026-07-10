import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/finance-consulting";
const TITLE = "Finance Consulting — CFO-Style Advisory for Indian MSMEs";
const DESCRIPTION =
  "Beyond loans: full-spectrum finance consulting for MSMEs — funding strategy, banking structure, credit profile, ITR planning, MIS, and lender relationships.";

const FAQS = [
  {
    q: "What's the difference between finance consulting and loan advisory?",
    a: "Loan advisory is transactional — get one loan approved. Finance consulting is ongoing — structure the business's entire financial stack: which loans to take, when, from which lender; how to plan ITR for borrowing capacity; how to set up banking for clean underwriting; how to build MIS that lenders trust. Finance consulting includes loan advisory but goes much broader.",
  },
  {
    q: "Do I need finance consulting if I only need one loan?",
    a: "If you only need one transactional loan and your file is clean, probably not — direct loan advisory is enough. But if your borrowing is recurring (every 1–3 years), if your file has weaknesses (low ITR, messy banking, settled trades), or if you're planning major capex — finance consulting pays for itself many times over in rate savings and avoided rejections.",
  },
  {
    q: "How is Velixa Capital's finance consulting priced?",
    a: "Most of our advisory is free for the borrower — we're paid by the lender on successful disbursement (the same rate you'd get going direct). For pure consulting engagements (no loan transaction involved — e.g., ITR planning, banking cleanup, MIS design), we charge a flat retainer agreed upfront. No commissions, no kickbacks, no conflicts of interest.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Finance Consulting", url: SLUG }])) }} />
      <AdvisoryPage
        eyebrow="Finance Consulting"
        title="Finance consulting — CFO-style advisory for Indian MSMEs"
        subtitle="Beyond loans: full-spectrum finance consulting — funding strategy, banking structure, credit profile, ITR planning, MIS, and lender relationships."
        crumbs={[{ label: "Home", to: "/" }, { label: "Finance Consulting" }]}
        intro="Velixa Capital is more than a loan arranger. We're a finance consultant for Indian MSMEs, professionals and property investors — combining funding advisory with credit profile management, ITR planning, banking structure, MIS design, and ongoing lender relationship management. The goal: keep your file approval-ready year-round, so every funding need is met fast at the best available rate. Trust. Growth. Stability. Prosperity."
        formVariant="general"
        formService="Finance Consulting"
        sections={[
          {
            heading: "What finance consulting covers",
            cards: [
              { title: "Funding strategy", body: "Multi-year funding roadmap aligned to your business plan. When to take term loan vs OD vs LAP. Which lender for which need. Total borrowing capacity vs growth ambition." },
              { title: "Credit profile management", body: "Keep your CIBIL and credit profile approval-ready year-round. Monitor enquiries, dispute inaccuracies, plan credit mix, manage utilisation. Annual credit audit." },
              { title: "ITR planning for borrowing", body: "Don't optimise ITR for tax alone — optimise for tax + borrowing capacity. Plan declared profit, depreciation, add-backs to support DSCR for planned loans." },
              { title: "Banking structure", body: "Which account for which inflow. How to maintain AMB, avoid bounces, build digital credit trail. Monthly banking hygiene review." },
              { title: "MIS and documentation", body: "Build monthly MIS that lenders trust — P&L, cash flow, stock ageing, receivables ageing. Clean MIS turns a borderline file into an approvable one." },
              { title: "Lender relationship management", body: "Build and maintain relationships with 2–3 best-fit lenders. Regular check-ins, RCC renewals, enhanced limits when business grows, renegotiation when file strengthens." },
            ],
          },
          {
            heading: "How finance consulting differs from loan advisory",
            bullets: [
              "Loan advisory: transactional — get one loan approved this quarter",
              "Finance consulting: ongoing — keep the file approval-ready year-round",
              "Loan advisory: reactive — engaged when there's a need",
              "Finance consulting: proactive — engaged 6–12 months before each need",
              "Loan advisory: lender-focused — pitch to multiple lenders",
              "Finance consulting: borrower-focused — optimise the file before pitching",
              "Loan advisory: one-time fee or lender commission",
              "Finance consulting: monthly/quarterly retainer + lender commission on transactions",
            ],
          },
          {
            eyebrow: "Who benefits most",
            heading: "When finance consulting pays for itself",
            cards: [
              { title: "Growing MSMEs (₹5–50 Cr turnover)", body: "Borrowing needs every 1–3 years; each year's ITR/banking affects next year's eligibility. Finance consulting keeps the file healthy and unlocks better rates each cycle." },
              { title: "Tax-optimised businesses", body: "If you aggressively minimise ITR profit, finance consulting helps balance tax savings with borrowing capacity — saving lakhs in future interest." },
              { title: "Businesses with sector restrictions", body: "Sector exposure caps at PSU banks move quarterly. Finance consulting tracks which lender is currently aggressive in your sector — and when to switch." },
              { title: "Promoters with multiple loans", body: "Personal + business loans across 3+ lenders — finance consulting consolidates, optimises the mix, and prevents over-leverage." },
              { title: "Pre-expansion planning", body: "Planning major capex (new factory, second outlet, acquisition)? Finance consulting prepares the file 12 months in advance to qualify for the best-structured deal." },
              { title: "Businesses recovering from a rejection", body: "After any rejection, finance consulting diagnoses the trigger, builds a 6–12 month fix plan, and re-evaluates before re-applying. Prevents the enquiry death-spiral." },
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
