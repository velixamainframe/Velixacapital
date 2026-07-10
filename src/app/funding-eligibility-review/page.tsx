import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/funding-eligibility-review";
const TITLE = "Funding Eligibility Review — How Much Can You Actually Borrow?";
const DESCRIPTION =
  "Eligibility isn't a single number — it's the lower of DSCR-based, FOIR-based, and LTV-based caps. We compute all three before you apply, so you don't waste a hard enquiry.";

const FAQS = [
  {
    q: "Why is the loan amount I'm eligible for lower than my EMI affordability suggests?",
    a: "Because lenders apply the lower of three caps: DSCR-based (cash flow), FOIR-based (affordability), and LTV-based (collateral value, for secured loans). Even if your FOIR says you can afford ₹50,000 EMI, your DSCR may cap you at ₹25,000. The lowest cap wins. We compute all three before you apply.",
  },
  {
    q: "Can I increase my eligibility before applying?",
    a: "Yes, by lifting any of the three caps. To lift DSCR: declare higher profit, prepay existing loans, take longer tenure. To lift FOIR: prepay existing loans, add co-applicant, take longer tenure. To lift LTV: pledge additional collateral, or improve property valuation. The fastest fix is usually adding a co-applicant with separate income.",
  },
  {
    q: "Will my eligibility be the same across all lenders?",
    a: "No — each lender has different DSCR, FOIR, and LTV caps. PSU banks typically cap FOIR at 50%; NBFCs go up to 70%. DSCR requirements range from 1.25x (NBFC) to 1.75x (some PSU banks). LTV caps vary by property type and lender. We compute eligibility under each lender's policy to find the best fit for your file.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Funding Eligibility Review", url: SLUG }])) }} />
      <AdvisoryPage
        eyebrow="Funding Eligibility Review"
        title="Funding eligibility review — three caps, one number"
        subtitle="Eligibility is the lower of DSCR-based, FOIR-based, and LTV-based caps. We compute all three before you apply — so you know exactly how much you can borrow."
        crumbs={[{ label: "Home", to: "/" }, { label: "Funding Eligibility Review" }]}
        intro="Most borrowers think eligibility is 'how much EMI can I afford'. It's not — it's the lower of three caps. DSCR-based (cash flow vs annual debt service), FOIR-based (income vs monthly obligations), and LTV-based (loan vs collateral value, for secured loans). Lenders apply all three and offer the lowest. We compute all three upfront, with each lender's specific policy, so you know the real number before you apply."
        formVariant="general"
        formService="Funding Eligibility Review"
        sections={[
          {
            heading: "The three eligibility caps",
            cards: [
              { title: "DSCR-based cap", body: "DSCR = EBITDA ÷ annual debt service. Most banks require 1.5x+; some NBFCs accept 1.25x. Eligibility = (EBITDA ÷ required DSCR) ÷ annual EMI per ₹1 L loan." },
              { title: "FOIR-based cap", body: "FOIR = (existing EMIs + proposed EMI) ÷ net income. Most banks cap 50–60%; NBFCs up to 70%. Eligibility = ((net income × FOIR cap) − existing EMIs) ÷ EMI per ₹1 L loan." },
              { title: "LTV-based cap (secured)", body: "LTV = loan ÷ property value. Residential LAP: 60–70% LTV. Commercial: 50–60%. Eligibility = property value × LTV cap." },
              { title: "The lowest cap wins", body: "If DSCR says ₹40 L, FOIR says ₹50 L, and LTV says ₹30 L (for secured) — your eligibility is ₹30 L. The lender offers the lowest of the three." },
            ],
          },
          {
            eyebrow: "Worked example",
            heading: "Self-employed, ₹2 L net monthly income, ₹50 L property",
            body:
              "EBITDA (from ITR, after add-backs): ₹18 L/year. Existing EMIs: ₹60,000/month. FOIR cap (private bank): 60%. DSCR cap: 1.5x. Property value: ₹50 L. LTV cap: 65%.",
            bullets: [
              "DSCR cap: (₹18 L ÷ 1.5) = ₹12 L available for debt service. At 12% rate, 5-year loan: ₹12 L ÷ ₹0.022 EMI per ₹1 = ₹54 L eligible",
              "FOIR cap: (₹2 L × 60%) − ₹60,000 = ₹60,000/month available. At 12%, 5-yr: ₹60,000 ÷ ₹0.022 = ₹27 L eligible",
              "LTV cap (secured LAP): ₹50 L × 65% = ₹32.5 L eligible",
              "Bank will offer the lowest of {₹54 L, ₹27 L, ₹32.5 L} = ₹27 L (FOIR-constrained)",
              "To lift: prepay existing loans (frees FOIR), add co-applicant (raises FOIR numerator), or pledge more property (raises LTV)",
            ],
          },
          {
            eyebrow: "Pre-application review",
            heading: "What a funding eligibility review gives you",
            body:
              "Before you approach any lender, our funding eligibility review computes your eligibility under each major lender's policy — DSCR, FOIR, LTV caps for PSU banks, private banks, and NBFCs. You walk away with: (1) the maximum ticket you can borrow, (2) the best-fit lender for your file, (3) specific levers to lift eligibility if needed, and (4) a documentation pack ready for submission. No hard enquiry, no CIBIL pull, no obligation.",
            bullets: [
              "Maximum ticket size you can borrow (under each lender's policy)",
              "Best-fit lender identification (1–2 options, not 5)",
              "Specific eligibility-lifting levers (prepay, co-applicant, tenure, collateral)",
              "Complete documentation pack prepared for submission",
              "No hard enquiry, no CIBIL pull, no obligation",
              "48-hour turnaround from receiving your CIBIL + ITR + banking + GST",
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
