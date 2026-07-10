import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/business-loan-vs-lap";
const TITLE = "Business Loan vs LAP — When to Use Each (Full Cost-Benefit)";
const DESCRIPTION =
  "Unsecured business loan: fast, smaller, expensive. LAP: slow, larger, cheap. The wrong choice costs 4–8% in rate or risks your property unnecessarily. Pick by use case.";

const FAQS = [
  {
    q: "Can I take both a business loan and LAP simultaneously?",
    a: "Yes — they're independent facilities and a common combined structure. LAP for long-tenure capex (machinery, property, expansion) + business loan or OD for short-term working capital. The combined obligations must still pass FOIR and DSCR checks. Stacking both without planning causes over-leverage. We help structure the right combination.",
  },
  {
    q: "Does LAP require the property to be fully paid off (no existing loan)?",
    a: "Not necessarily. You can take LAP on a property with an existing home loan — subject to the existing lender's consent and the combined LTV staying within the new lender's cap. This is called a 'top-up loan' if from the same lender, or 'balance transfer + top-up' if moving to a new lender. The structure is common and works well.",
  },
  {
    q: "Is the interest on LAP tax-deductible?",
    a: "If LAP is used for business purpose, the interest is deductible as a business expense under Section 36(1)(iii) of the Income Tax Act. If used for non-business purposes, it's not deductible. If used to buy a rental property, interest is deductible under Section 24(b) subject to caps. Keep end-use documented — lender and tax authorities may both ask.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Business Loan vs LAP", url: SLUG }])) }} />
      <AdvisoryPage
        eyebrow="Business Loan vs LAP"
        title="Business loan vs LAP — when to use each (full cost-benefit)"
        subtitle="Unsecured business loan: fast, smaller, expensive. LAP: slow, larger, cheap. The wrong choice costs 4–8% in rate or risks your property unnecessarily."
        crumbs={[{ label: "Home", to: "/" }, { label: "Business Loan vs LAP" }]}
        intro="Business loan (unsecured term loan) and LAP (Loan Against Property) serve fundamentally different needs. A business loan is fast, small-ticket, short-tenure, expensive, and unsecured. LAP is slow, large-ticket, long-tenure, cheap, and secured against property. Choosing the wrong one is costly — both in rupees and in opportunity. This comparison helps you decide based on your use case, ticket size, and risk appetite."
        formVariant="general"
        formService="Business Loan vs LAP Advisory"
        sections={[
          {
            heading: "Side-by-side comparison",
            cards: [
              { title: "Collateral", body: "Business loan: nil (unsecured). LAP: residential/commercial/industrial property pledged." },
              { title: "Ticket size", body: "Business loan: ₹5 L–₹50 L (typical). LAP: ₹25 L–₹10 Cr+ (depending on property value)." },
              { title: "Tenure", body: "Business loan: 1–5 years (some 7). LAP: 5–15 years (some 20)." },
              { title: "Interest rate (indicative)", body: "Business loan: 11–24% p.a. LAP: 9–13% p.a. Final rate at lender's discretion." },
              { title: "Disbursement TAT", body: "Business loan: 3–7 days. LAP: 3–6 weeks (title search, valuation, legal)." },
              { title: "DSCR requirement", body: "Business loan: 1.5x+ (strict). LAP: 1.25x+ (more flexible, collateral-backed)." },
              { title: "End use", body: "Business loan: working capital, immediate capex. LAP: long-tenure capex, refinancing, large expansion." },
              { title: "Risk to borrower", body: "Business loan: only CIBIL damage on default. LAP: pledged property can be seized (SARFAESI)." },
            ],
          },
          {
            heading: "When to choose which — by use case",
            bullets: [
              "Short-term working capital, ₹5–25 L, need in 1 week → business loan",
              "Long-term capex, ₹50 L+, can wait 4 weeks, have property → LAP",
              "Refinancing expensive existing loans → LAP (lower rate, longer tenure)",
              "Major expansion (new factory, second outlet) → LAP",
              "Don't want to risk property → business loan (even if costlier)",
              "Borderline CIBIL/banking → LAP (collateral lifts approval odds)",
              "Mixed use (capex + working capital) → LAP for capex + OD for working capital",
              "Need ₹1 Cr+ unsecured → usually impossible; LAP is the realistic option",
            ],
          },
          {
            eyebrow: "Cost illustration",
            heading: "₹50 L for 5 years — business loan vs LAP",
            body:
              "Business loan @ 16% p.a., 5 yrs: EMI ~₹1,21,000, total interest ~₹22.6 L. LAP @ 10% p.a., 5 yrs: EMI ~₹1,06,000, total interest ~₹13.7 L. Same ticket, same tenure — LAP saves ₹15,000/month on EMI and ₹8.9 L in total interest. If you extend LAP to 10 years: EMI ₹66,000, total interest ₹29.2 L — lower EMI but more total interest.",
            bullets: [
              "₹50 L @ 16% business loan, 5 yrs → EMI ₹1,21,000, total interest ₹22.6 L",
              "₹50 L @ 10% LAP, 5 yrs → EMI ₹1,06,000, total interest ₹13.7 L",
              "₹50 L @ 10% LAP, 10 yrs → EMI ₹66,000, total interest ₹29.2 L",
              "5-year LAP saves ₹8.9 L in interest vs business loan",
              "10-year LAP frees ₹55,000/month cash flow but pays ₹6.6 L more total interest",
              "Choose by your binding constraint: cash flow (longer LAP) or total cost (shorter LAP)",
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
