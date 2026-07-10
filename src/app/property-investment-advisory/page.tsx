import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/property-investment-advisory";
const TITLE = "Property Investment Advisory";
const DESCRIPTION =
  "Independent real-estate investment advisory for Indian HNIs, NRIs and family offices — capital-gains planning (54/54F/54EC), portfolio diversification, FEMA / repatriation support. No brokerage from developers.";

const FAQS = [
  {
    q: "How is long-term capital gain on property taxed in India?",
    a: "Long-term capital gain (property held >24 months) is currently taxed at 12.5%* without indexation. Sections 54 and 54F offer exemption if you reinvest the gain in a residential house (subject to caps), and section 54EC allows reinvestment in specified bonds (NHAI/REC/etc.) up to ₹50 L within 6 months. We map the right route for your situation — final tax depends on transaction specifics.",
  },
  {
    q: "Can NRIs invest in Indian property and repatriate sale proceeds?",
    a: "Yes — NRIs and OCIs can acquire residential and commercial property in India (other than agricultural, plantation or farm house). Sale proceeds can be repatriated up to USD 1 million per financial year under FEMA, subject to tax compliance and CA-certified Form 15CA/CB. The remittance is executed by your authorised dealer bank — we coordinate the paperwork.",
  },
  {
    q: "Do you recommend specific projects or developers?",
    a: "No. We are not a RERA-registered brokerage and do not earn commission from any developer. Our advisory focuses on the financial, tax and structural decision — yield, capital-gains, FEMA, exit-liquidity — not on identifying specific properties. You bring the property; we evaluate it.",
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
              { name: "Property Investment Advisory", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Property Advisory"
        title="Property investment advisory — institutional rigour for personal decisions."
        subtitle="Capital-gains planning, portfolio diversification, FEMA / repatriation and exit-liquidity modelling for first-time investors, HNIs, NRIs and family offices. Independent advisory — no brokerage from developers."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Property Advisory", to: "/property-consulting" },
          { label: "Property Investment Advisory" },
        ]}
        intro="Real estate is one of the largest investments most families make — and one of the least researched. Velixa Capital brings an institutional approach to the decision: yield, capital-gains tax, exit-liquidity, FEMA compliance and portfolio fit. We are not a RERA-registered brokerage and we do not market property or earn brokerage from any developer. Advisory only — your property, our analysis."
        formVariant="property"
        formService="Property Investment Advisory"
        sections={[
          {
            heading: "Decisions we help you make",
            cards: [
              { title: "Capital-gains planning", body: "Sections 54 / 54F / 54EC mapping — reinvestment route, timeline lock-ins, bond vs property reinvestment." },
              { title: "Yield & cap-rate", body: "Net rental yield and cap-rate assessment for any commercial or residential asset you're evaluating." },
              { title: "Portfolio diversification", body: "How does this property fit your wider portfolio — equity, debt, gold, business? Right mix by life-stage." },
              { title: "Exit-liquidity", body: "Pre-committed exit routes — resale, REIT, fractional ownership, family transfer — modelled before you buy." },
              { title: "NRI / FEMA", body: "Source-of-funds documentation, Form 15CA/CB workings, repatriation limits, AD-bank coordination." },
              { title: "Holding structure", body: "Individual vs HUF vs LLP vs family trust — tax efficiency, succession and transferability implications." },
            ],
          },
          {
            heading: "What an engagement looks like",
            bullets: [
              "Discovery — goals, horizon, risk appetite, current portfolio",
              "Recommended asset mix and capital-gains plan shared as PDF",
              "Documentation assistance for selected property (review only)",
              "Tax / FEMA / repatriation paperwork support end-to-end",
              "Annual portfolio review — yield, valuation, refinance, exit options",
              "Holding-structure optimisation for succession planning",
            ],
          },
          {
            heading: "Why independent advisory matters",
            body: "Most property advice in India comes from people who earn commission on what you buy. Velixa Capital earns nothing from the transaction — only a disclosed advisory fee. That changes the conversation: we'll tell you when not to buy, when to wait, and when to sell. Trust. Growth. Stability. Prosperity.",
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
