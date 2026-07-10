import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/property-finance";
const TITLE = "Property Finance Advisory";
const DESCRIPTION =
  "Independent advisory on home loans, loan against property (LAP) and mortgage products — compare offers from 12+ partner banks & NBFCs, structure co-applicants, and choose fixed vs floating tenure smartly.";

const FAQS = [
  {
    q: "Home loan or LAP — which one fits my requirement?",
    a: "Home loans finance the purchase of a residential property you're buying — typically 75–90% of agreement value, 20–30 year tenure, lowest rates. LAP (Loan Against Property) is a loan against a property you already own — usable for any purpose (business, education, marriage), 7–15 year tenure, slightly higher rate. We help you choose based on the end-use and tenure.",
  },
  {
    q: "Fixed or floating rate — which is safer?",
    a: "Floating rates track the RBI repo and almost always cost less over a full tenure. Fixed rates offer EMI certainty for 2–3 years then usually reset. We model both scenarios with current rate curves and recommend based on your cash-flow predictability and how long you intend to hold the loan.",
  },
  {
    q: "How much loan can I actually get on my salary?",
    a: "Most banks cap total EMI obligations at 50–55% of net monthly income (FOIR). For a ₹1 L/month net salary with no existing EMIs, that's roughly ₹50–55K EMI capacity — translating to a ₹55–65 L home loan at 8.5%* over 20 years. We compute this precisely for each partner lender, because FOIR limits vary.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(TITLE, DESCRIPTION, SLUG)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Property Advisory", url: "/property-consulting" },
              { name: "Property Finance", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Property Advisory"
        title="Property finance advisory — the right structure, the right lender, the right tenure."
        subtitle="Home loans, LAP, balance transfer and top-up — compared across 12+ partner banks and NBFCs. We position your file the way an underwriter reads it, not the way a salesperson pitches it."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Property Advisory", to: "/property-consulting" },
          { label: "Property Finance" },
        ]}
        intro="Velixa Capital is a property finance consultant for Indian home buyers, property investors and MSME owners. We are not a RERA-registered brokerage — we provide independent advisory and facilitation support. We compare offers, structure co-applicants, coordinate documentation, and stay with you from sanction to disbursement. Trust. Growth. Stability. Prosperity."
        formVariant="property"
        formService="Property Finance Advisory"
        sections={[
          {
            heading: "Products we facilitate",
            cards: [
              { title: "Home Loan", body: "Purchase, construction, resale or plot + construction — 75–90% LTV, 20–30 year tenure." },
              { title: "Loan Against Property", body: "Unlock liquidity from a property you own — for business, education, marriage or debt consolidation." },
              { title: "Balance Transfer", body: "Move an existing home loan to a lower-rate lender, often with a top-up facility." },
              { title: "Top-up Loan", body: "Additional borrowing on top of an existing home loan — same lender, lower rate than personal loan." },
              { title: "Plot Loan", body: "For residential plot purchase — typically 70–80% LTV, shorter tenure, end-use restricted." },
              { title: "NRI Home Loan", body: "For NRIs/OCIs buying Indian property — FEMA-compliant structure, repatriation planning." },
            ],
          },
          {
            heading: "How we position your file",
            bullets: [
              "Affordability & cash-flow assessment before lender selection",
              "CIBIL pull only after strategy is agreed — no random enquiries",
              "Co-applicant structuring to maximise eligible loan amount",
              "Income documentation optimised — ITR, Form 16, GST turnover",
              "Property documentation reviewed before lender submission",
              "Multiple lender offers compared on rate, EMI, tenure, fees, prepayment terms",
              "Sanction-to-disbursal coordination with the chosen lender",
              "Annual review for balance-transfer or prepayment opportunities",
            ],
          },
          {
            heading: "Why independent advisory matters",
            body: "A direct-bank relationship manager sells one product — their bank's. A DSA pushes the lender paying the highest commission. Velixa is neither: we charge a disclosed advisory fee, compare offers across 12+ partner banks and NBFCs, and recommend the structure that genuinely fits your cash flow and tenure. Loan approval remains at the lender's sole discretion.",
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
