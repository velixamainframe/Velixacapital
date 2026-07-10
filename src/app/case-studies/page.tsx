import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/case-studies";
const TITLE = "Case Studies — Real Files, Real Outcomes";
const DESCRIPTION =
  "Four selected Velixa Capital engagements: low-CIBIL trader recovery, doctor with no banking discipline, manufacturer unlocked CGTMSE, distributor with high FOIR. Indicative outcomes only.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SLUG },
  openGraph: { title: `${TITLE} | Velixa Capital`, description: DESCRIPTION, url: SLUG, type: "article" },
};

export default function CaseStudiesPage() {
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
              { name: "Case Studies", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Engagements"
        title="Case studies — real files, real outcomes."
        subtitle="Four indicative engagements showing how diagnosis beats blind re-application. Names, sectors and amounts are illustrative; outcomes depend on the lender and the file."
        crumbs={[{ label: "Home", to: "/" }, { label: "Case Studies" }]}
        intro="Every case below started the same way — a borrower stuck after one or more rejections. None were resolved by re-applying to more lenders. Each was resolved by sitting with the file, understanding what was actually breaking, and fixing that before the next submission."
        formVariant="general"
        formService="Case Studies — Request a similar review"
        sections={[
          {
            eyebrow: "Selected engagements",
            heading: "Four engagements. Four different fixes.",
            body:
              "These case studies are indicative and based on aggregated engagements. Final loan approval, interest rate and limit are at the sole discretion of the lender.",
            cards: [
              {
                title: "Trader · Low CIBIL recovery",
                body:
                  "A textile trader in Surat rejected by 3 banks for CIBIL at 640 with 9 hard enquiries in 6 months. Diagnosis: credit-hungry CIBIL plus a 4-year-old settled personal loan flag. We advised a 6-month enquiry freeze, contested the incorrectly-reported settled status with the bureau, and restructured one active card to drop utilisation from 78% to 22%. At month 7, score reached 712. Matched to a private-bank MSME program. Indicative outcome: ₹28 lakh working-capital limit sanctioned at 13.2%* p.a.",
              },
              {
                title: "Doctor · No banking discipline",
                body:
                  "A Mumbai-based consulting doctor earning ₹3.2 L/month but with cash-heavy deposits, irregular average balance and 2 cheque bounces in the last 6 months. Three lenders declined. Diagnosis: banking pattern, not income. We rebuilt the banking — moved receipts to digital channels, set up auto-sweep FDs to maintain average balance, and waited 4 months for a clean statement. Matched to a doctor-specific program at a private bank. Indicative outcome: ₹50 lakh unsecured professional loan at 11.5%* p.a.",
              },
              {
                title: "Manufacturer · CGTMSE unlock",
                body:
                  "A Pune-based machinery manufacturer needed ₹1.5 Cr for capacity expansion but had no collateral to pledge. Two banks declined for collateral requirement. Diagnosis: profile fit the CGTMSE credit-guarantee scheme but original DSA hadn't positioned it. We re-positioned the application under CGTMSE with a CGTMSE-empanelled bank, obtained the project report and Udyam certificate, and submitted through the correct channel. Indicative outcome: ₹1.6 Cr term loan + ₹40 L cash-credit limit sanctioned, collateral-free under CGTMSE cover.",
              },
              {
                title: "Distributor · High FOIR restructuring",
                body:
                  "A Delhi FMCG distributor earning ₹4.8 L/month but with existing EMIs of ₹2.6 L/month (FOIR 54%) — over most lenders' cap. Declined for additional ₹35 L business loan. Diagnosis: obligations, not income. We refinanced two existing high-rate personal loans into a single lower-rate LAP against an owned warehouse, dropping the EMI burden to ₹1.5 L/month (FOIR 31%). With headroom restored, the new ₹35 L business loan was sanctioned. Indicative outcome: ₹35 L unsecured business loan at 14%* p.a. after LAP refinance.",
              },
            ],
          },
        ]}
        faqs={[
          {
            q: "Are these outcomes guaranteed for my case?",
            a: "No. Each case study is indicative and based on aggregated engagements. Your outcome depends entirely on your file, your lender's policy at the time of submission, and the broader credit environment. What is replicable is the diagnostic approach — sit with the file, understand what's breaking, fix that first.",
          },
          {
            q: "How long do engagements like these take?",
            a: "It depends on the diagnosis. CIBIL recovery cases need 4–6 months of disciplined behaviour before re-application. Banking-pattern fixes need 3–6 months of clean statements. CGTMSE and refinance cases can move in 4–8 weeks from a clean submission. We'll give you a realistic timeline after the first review.",
          },
          {
            q: "What does a similar engagement cost?",
            a: "The initial eligibility review is free. If we take on the case, fees are disclosed in writing upfront — typically a flat advisory fee for the diagnostic and structuring work, plus a success-linked facilitation fee on sanction. No hidden charges, no percentage surprises.",
          },
        ]}
      />
    </>
  );
}
