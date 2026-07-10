import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/settled-account-guidance";
const TITLE = "Settled Account Guidance — What 'Settled' Really Means and How to Recover";
const DESCRIPTION =
  "A 'Settled' status on CIBIL stays 7 years and triggers auto-decline at most banks. Here's how to convert it to 'Closed', dispute inaccuracies, and rebuild over time.";

const FAQS = [
  {
    q: "What's the difference between 'Settled' and 'Closed' on CIBIL?",
    a: "'Closed' means you paid the full outstanding and the account is fully resolved. 'Settled' means you negotiated a partial payment with the lender and they waived the rest — the lender took a loss. 'Settled' is a major negative marker; most banks auto-decline any settled trade. 'Closed' is positive.",
  },
  {
    q: "Can I convert a 'Settled' status to 'Closed' on CIBIL?",
    a: "Only by paying the waived amount in full and getting the lender to update the bureau. The lender must agree to revoke the settlement and accept full payment. Some lenders do this; others don't. If they refuse, the 'Settled' status stays until it ages off (7 years from settlement date).",
  },
  {
    q: "I settled a credit card 3 years ago — can I get a loan now?",
    a: "It depends on the lender. PSU banks usually auto-decline any settled trade regardless of age. Private banks may approve if the settlement is 3+ years old and your post-settlement behaviour is clean. NBFCs are more flexible. Be honest about the settlement upfront — hiding it (the lender will discover it on CIBIL anyway) is worse than disclosing.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Settled Account Guidance", url: SLUG }])) }} />
      <AdvisoryPage
        eyebrow="Settled Account Guidance"
        title="Settled account guidance — what 'Settled' really means and how to recover"
        subtitle="A 'Settled' status is one of the heaviest CIBIL weights — staying 7 years and triggering auto-decline at most banks. Here's the full picture and the recovery path."
        crumbs={[{ label: "Home", to: "/" }, { label: "Settled Account Guidance" }]}
        intro="A 'Settled' account on your CIBIL is one of the heaviest negative markers — heavier than a single late payment, sometimes heavier than a written-off (depending on recency). It tells future lenders: this borrower didn't fully repay a debt; the lender took a loss. Most banks auto-decline any settled trade. This guide walks through what 'Settled' really means, the recovery options, and the timeline for rebuilding your credit profile."
        formVariant="general"
        formService="Settled Account Guidance"
        sections={[
          {
            heading: "What 'Settled' really means",
            cards: [
              { title: "The borrower negotiated", body: "You couldn't repay the full outstanding, so you negotiated a partial payment with the lender. The lender accepted the partial amount as full and final settlement." },
              { title: "The lender took a loss", body: "The waived portion is a loss for the lender. From a future lender's perspective, this borrower has a history of not fully repaying debt — high risk." },
              { title: "It stays 7 years on CIBIL", body: "From the date of settlement, the marker stays on your CIBIL report for 7 years. After that it falls off automatically. Until then, it's visible to every lender." },
              { title: "Most banks auto-decline", body: "PSU banks and most private banks treat any settled trade as an automatic decline reason, regardless of score or current income. The settlement is a hard no." },
              { title: "NBFCs are more flexible", body: "Some NBFCs will approve loans if the settlement is 2–3+ years old and post-settlement behaviour is clean. But at higher pricing (16–24% p.a.)." },
              { title: "It's different from 'Written-off'", body: "'Written-off' means the lender gave up trying to collect (usually after 180+ days DPD) and closed the account as a loss — even worse than 'Settled'. Both stay 7 years." },
            ],
          },
          {
            eyebrow: "Recovery options",
            heading: "What you can do — in priority order",
            bullets: [
              "1. Pay the waived amount in full and ask the lender to convert to 'Closed' status (best outcome; some lenders agree, some don't)",
              "2. Get a written No Objection Certificate (NOC) from the lender confirming the settlement terms are fully met",
              "3. File a dispute with CIBIL with the NOC attached — request status update from 'Settled' to 'Closed' (success depends on lender confirmation)",
              "4. If lender refuses to convert, accept the 'Settled' marker and focus on rebuilding the rest of your profile",
              "5. Maintain 100% on-time payments on every other trade for 24+ months — clean post-settlement behaviour dilutes the negative marker",
              "6. Add a 'consumer statement' to your CIBIL explaining the settlement circumstances (visible to lenders who pull the report)",
              "7. Wait — the settlement ages off after 7 years automatically. After that, the marker disappears and your profile is clean again",
            ],
          },
          {
            eyebrow: "Lender-specific guidance",
            heading: "Which lenders will approve with a settled account",
            cards: [
              { title: "PSU banks", body: "Almost universal auto-decline on any settled trade, regardless of age or score. Don't waste a hard enquiry applying." },
              { title: "Private banks", body: "Case-by-case. May approve if settlement is 3+ years old, post-settlement behaviour is clean, and current income/banking is strong. Apply through a senior relationship manager, not the website." },
              { title: "NBFCs", body: "More flexible. Bajaj, L&T, Tata Capital may approve at higher pricing (16–22%) if settlement is 2+ years old and behaviour is clean post-settlement." },
              { title: "Fintech lenders", body: "Case-by-case. Some auto-decline; some accept at 22–30% pricing. Higher rate than NBFCs, but faster approval." },
              { title: "Secured loans (LAP, gold, FD)", body: "CIBIL matters less when fully collateralised. LAP at 10–13% is possible even with a settled trade — the property is the lender's security, not your historical behaviour." },
              { title: "Co-applicant route", body: "Add a co-applicant with clean CIBIL and separate income. The combined profile may lift approval odds at private banks — but the settlement is still visible." },
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
