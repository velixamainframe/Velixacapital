import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/disclosures";
const TITLE = "Disclosures — Independent Advisory Status & Fee Policy";
const DESCRIPTION =
  "Velixa Capital is an independent loan & finance consultant — not a lender. Read our advisory-status disclosures and fee policy before engaging us.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SLUG },
  openGraph: { title: `${TITLE} | Velixa Capital`, description: DESCRIPTION, url: SLUG, type: "article" },
};

export default function DisclosuresPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(TITLE, DESCRIPTION, SLUG)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Disclosures", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Disclosures"
        title="Independent advisory status & fee policy."
        subtitle="Velixa Capital is a loan & finance consultant — not a lender, bank or NBFC. Read these disclosures before engaging us."
        crumbs={[{ label: "Home", to: "/" }, { label: "Disclosures" }]}
        intro="Transparency is the foundation of trust. These two sections explain who we are, who we are not, and how we charge. If anything is unclear, please ask before we begin work — written answers are part of every engagement."
        formVariant="general"
        formService="Disclosures — Clarification request"
        sections={[
          {
            eyebrow: "Independent advisory status",
            heading: "Who we are — and who we are not.",
            body:
              "Velixa Capital facilitates financial products and professional services through its network of banking, financial, and advisory partners. The four points below define our role precisely.",
            bullets: [
              "We are NOT a lender, bank or NBFC. We do not lend money, issue credit cards, or accept deposits. Loan approval, interest rate, credit limit, fees and all other terms are at the sole discretion of the partner institution.",
              "We are an INDEPENDENT consultant. We are not owned by, nor do we exclusively represent, any single bank, NBFC, developer, software vendor or service provider. Lender matching is based on your file's fit, not commission size.",
              "We do NOT guarantee any approval or outcome. No consultant can. What we improve is the probability and quality of the offer — by diagnosing your file, fixing what auto-rejects, and matching to right-fit lenders.",
              "Accounting, GST, ITR, legal and compliance work is facilitated via INDEPENDENT qualified professionals (CAs, tax practitioners, advocates). Velixa coordinates the engagement but does not employ these professionals directly.",
            ],
          },
          {
            eyebrow: "Fee policy",
            heading: "How we charge — disclosed in writing, upfront.",
            body:
              "Fees are never a surprise. The three points below apply to every engagement, large or small.",
            bullets: [
              "Initial eligibility review is FREE. The first conversation, file diagnosis and lender-mapping recommendation cost you nothing — no obligation, no commitment.",
              "Engagement fees are DISCLOSED IN WRITING before any work begins. For loan facilitation, the fee is typically a flat disclosed advisory fee plus an optional success-linked facilitation fee on sanction. For tax, accounting and property advisory, services are quoted per engagement.",
              "We do NOT charge percentage-of-loan traps, hidden referral fees from lenders, or surprise add-ons. Any commission or referral income we receive from a partner institution is in addition to — not instead of — the disclosed client fee, and is disclosed on request.",
            ],
          },
        ]}
      />
    </>
  );
}
