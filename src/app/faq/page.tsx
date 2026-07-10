import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/faq";
const TITLE = "Frequently Asked Questions";
const DESCRIPTION =
  "Answers to common questions about Velixa Capital — Are you a lender? Will applying affect my CIBIL? How are fees charged? Can you guarantee approval? Plus eligibility and credit basics.";

const FAQS = [
  {
    q: "Are you a lender?",
    a: "No. Velixa Capital is a loan & finance consultant — not a bank, NBFC or lender. We are an authorized channel partner with leading banks and NBFCs. Final loan approval, interest rate, credit limit and all terms are at the sole discretion of the partner institution. Our role is diagnostic and advisory — we improve the probability and quality of the offer, but we do not lend.",
  },
  {
    q: "Will applying through Velixa affect my CIBIL score?",
    a: "Only when we agree to submit to a specific lender — and only then. We review your profile, banking and documents first without any credit pull. A hard enquiry happens only when you confirm in writing that we should approach a particular lender. Blind portal submissions, which generate multiple enquiries and lower your score, are exactly what we help you avoid.",
  },
  {
    q: "How are your fees charged?",
    a: "The initial eligibility review is free. If we take on the case, fees are disclosed in writing upfront before any work begins — no hidden charges, no surprise add-ons, no percentage-of-loan traps. For most loan facilitation engagements, the fee is a flat disclosed amount; for tax, accounting and property advisory, services are quoted per engagement.",
  },
  {
    q: "Can you guarantee loan approval?",
    a: "No — and you should treat anyone who promises one with suspicion. Loan approval depends entirely on the lender's credit policy and your file. What we improve is the probability and the quality of the offer: we diagnose what's blocking approval, fix it before submission, and match you to the 1–2 lenders whose policy actually fits your file.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SLUG },
  openGraph: { title: `${TITLE} | Velixa Capital`, description: DESCRIPTION, url: SLUG, type: "article" },
};

export default function FAQPage() {
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
              { name: "FAQ", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Knowledge"
        title="Frequently Asked Questions"
        subtitle="Clear, honest answers to the four questions we hear most — and the eligibility and credit basics every borrower should know."
        crumbs={[{ label: "Home", to: "/" }, { label: "FAQ" }]}
        intro="Velixa Capital is a loan & finance consultant — not a lender. We earn your trust with honest diagnosis, never by promising approvals we cannot deliver. These four FAQs cover the questions we get asked most often; the two sections below cover the eligibility and credit basics every borrower should understand before applying anywhere."
        formVariant="general"
        formService="FAQ — General enquiry"
        sections={[
          {
            eyebrow: "Before you apply",
            heading: "Eligibility basics",
            body:
              "Every lender applies a different eligibility filter. These four points are what most have in common — and what most rejections get wrong.",
            bullets: [
              "CIBIL score — most banks prefer 720+, most NBFCs 650+, fintechs 600+. Score is necessary but not sufficient; the file behind it matters more.",
              "Stable income & banking — average monthly balance around 25–35% of monthly turnover, no cheque bounces, predictable inflows.",
              "FOIR below 50–65% — total fixed obligations (EMIs, credit card minimums) should not exceed this share of net income, including the new loan you're applying for.",
              "Vintage & sector — most business loans need 2–3 years of vintage, and some sectors (real-estate, gold, liquor, crypto) face stricter underwriting or negative lists.",
            ],
          },
          {
            eyebrow: "Credit & CIBIL",
            heading: "Credit & CIBIL fundamentals",
            body:
              "Your CIBIL report is read like an underwriting file — not just a number. These four points explain why a 'good' score can still get rejected.",
            bullets: [
              "Enquiries matter — 6+ hard enquiries in 6 months signals credit-hunger and triggers auto-decline at most lenders.",
              "Settled ≠ closed — a 'settled' flag on your CIBIL is read as a partial default, even if your score has recovered.",
              "Credit mix counts — a healthy file blends secured (home/auto) and unsecured (personal/card) credit responsibly.",
              "Utilisation ratio — keep revolving credit utilisation under 30%. Maxing out cards every month hurts even if you pay in full.",
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
