import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/business-overdraft";
const TITLE = "Business Overdraft Advisory";
const DESCRIPTION =
  "Structured business overdraft advisory — secured or unsecured, drop-line or revolving, matched to your operating cycle.";

const FAQS = [
  {
    q: "How is an OD different from a term loan?",
    a: "An OD is a revolving limit — you draw what you need, when you need it, and pay interest only on the utilized amount. A term loan is a one-time disbursal with a fixed EMI. OD suits working-capital swings; term loans suit one-time capex.",
  },
  {
    q: "What's the typical unsecured OD limit I can get?",
    a: "Most NBFCs offer unsecured business OD up to ₹50 L based on banking strength and GST turnover. Banks go higher (₹1–2 Cr) but usually require an existing relationship. Secured OD against property or FD can stretch to ₹5 Cr+.",
  },
  {
    q: "What is a drop-line OD and when should I use one?",
    a: "In a drop-line OD, the sanctioned limit reduces every quarter by a fixed amount. It's ideal when you're using the OD as a capex bridge — you want the discipline of a forced paydown without locking into a term loan EMI from day one.",
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
              { name: "Business Funding", url: "/business-funding" },
              { name: "Overdraft", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Overdraft"
        title="Business overdraft — pay interest only on what you use."
        subtitle="An OD is the right structure for cash-cycle swings, seasonal businesses, and any operating-capital need that is not a one-time spend."
        crumbs={[
          { label: "Business Funding", to: "/business-funding" },
          { label: "Overdraft" },
        ]}
        intro="An overdraft is the most flexible credit line an MSME can hold — and the easiest to misuse. We size it to your cycle so it stays a buffer, not a trap."
        formVariant="loan"
        formService="Business Overdraft Advisory"
        sections={[
          {
            heading: "Where OD beats a term loan",
            bullets: [
              "Working-capital swings — receivables, inventory cycles",
              "Seasonality — festive, harvest, project-based",
              "Buffer for tax and statutory dues",
              "Supplier pre-payment opportunities",
              "Bridge between disbursal milestones",
              "Tender / LBG margin money float",
            ],
          },
          {
            heading: "Variants",
            cards: [
              { title: "Secured OD", body: "Against property, FD or business assets. Lower rate, larger limit." },
              { title: "Unsecured OD", body: "Cash-flow based — typical limits up to ₹50 L from NBFCs." },
              { title: "Drop-line OD", body: "Sanctioned limit reduces every quarter — useful for capex bridge." },
            ],
          },
          {
            heading: "Velixa positioning",
            body: "We right-size the limit so you don't pay for unused drawing power, and we choose between bank and NBFC based on your banking strength — not based on which DSA gets the highest commission.",
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
