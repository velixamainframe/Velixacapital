import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/bank-vs-nbfc-business-loan";
const TITLE = "Bank vs NBFC Business Loan — Pick the Right Lender for Your File";
const DESCRIPTION =
  "Banks are cheaper but stricter. NBFCs are faster and more flexible but cost 3–8% more. Pick wrong and you either over-pay interest or waste weeks on a certain rejection.";

const FAQS = [
  {
    q: "Will applying to an NBFC hurt my CIBIL the same as applying to a bank?",
    a: "Yes — every lender-initiated enquiry, whether bank or NBFC, is a hard enquiry on CIBIL. Multiple enquiries across both in a short window compound the damage. Don't 'test the market' by applying to 5 lenders simultaneously. Diagnose your file, identify the 1–2 lenders most likely to approve, and apply only there.",
  },
  {
    q: "Are NBFCs safer or riskier than banks for the borrower?",
    a: "For the borrower, the safety is similar — both are RBI-regulated. NBFCs may have less consumer-friendly processes (collections, restructuring, grievance redressal) than banks. The bigger risk for the borrower is the higher interest rate, not the lender failing. Always check the NBFC's RBI registration and ratings before borrowing.",
  },
  {
    q: "Can I move from an NBFC loan to a bank loan later?",
    a: "Yes — this is called 'takeover' or 'balance transfer'. If your file has improved (CIBIL up, banking clean, ITR stronger) since the NBFC loan, a bank may takeover the outstanding at a lower rate. The savings must justify the takeover cost (processing fee + documentation, typically 1–2% of outstanding). Worth considering after 12–18 months of on-time repayment.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Bank vs NBFC Business Loan", url: SLUG }])) }} />
      <AdvisoryPage
        eyebrow="Bank vs NBFC Business Loan"
        title="Bank vs NBFC business loan — pick the right lender for your file"
        subtitle="Banks are cheaper but stricter. NBFCs are faster and more flexible but cost 3–8% more. Choose wrong and you either over-pay interest or waste weeks on a certain rejection."
        crumbs={[{ label: "Home", to: "/" }, { label: "Bank vs NBFC Business Loan" }]}
        intro="Banks and NBFCs both lend to MSMEs, but with very different rules. Banks underwrite strictly — lower rates, slower TAT, harder to qualify. NBFCs are flexible — higher rates, faster TAT, more forgiving policy. Choosing wrong is expensive. Going NBFC when you could qualify for a bank loan wastes 3–8% p.a. in rate. Going bank when you don't qualify wastes 4–6 weeks and another hard enquiry. This guide helps you choose based on your file strength and urgency."
        formVariant="general"
        formService="Bank vs NBFC Business Loan"
        sections={[
          {
            heading: "Side-by-side comparison",
            cards: [
              { title: "Underwriting strictness", body: "Banks: strict (CIBIL 720+, FOIR 50–60%, sector restrictions). NBFCs: flexible (CIBIL 650+, FOIR 60–70%, wider sector acceptance)." },
              { title: "Interest rate (indicative)", body: "Banks: 9–14% p.a. NBFCs: 13–22% p.a. Fintech NBFCs: 16–30% p.a. Final rate at lender's discretion." },
              { title: "Disbursement TAT", body: "Banks: 3–6 weeks. NBFCs: 1–2 weeks. Fintech NBFCs: 3–7 days. Speed premium for NBFCs is real." },
              { title: "Ticket size (unsecured)", body: "Banks: up to ₹50 L (some ₹75 L). NBFCs: up to ₹50 L. Fintech NBFCs: ₹5–25 L. Larger tickets require secured." },
              { title: "Tenure", body: "Banks: up to 5–7 years. NBFCs: up to 5 years. Fintech: 1–3 years. Longer tenure = lower EMI but more interest paid." },
              { title: "Documentation", body: "Banks: more paperwork (KYC + ITR + GST + banking + stock + MIS + reconciliation). NBFCs: lighter. Fintech: minimal (GST + banking API)." },
              { title: "Processing fee", body: "Banks: 0.5–2% + GST. NBFCs: 1.5–3% + GST. Fintech: 2–4% + GST. Higher fee for faster, more flexible." },
              { title: "Prepayment penalty", body: "Banks: 2–4% (some nil on floating). NBFCs: 4–5% (foreclosure). Fintech: 4–6%. Read the fine print carefully." },
            ],
          },
          {
            heading: "When to choose which — decision matrix",
            bullets: [
              "CIBIL 720+, clean banking, ITR profit strong → bank (lower rate)",
              "CIBIL 650–720, banking adequate, ITR weak → NBFC (more flexible)",
              "CIBIL below 650 → NBFC or fintech (banks won't approve)",
              "Need disbursement in 1 week → NBFC/fintech (banks slower)",
              "Ticket >₹50 L → bank (NBFC unsecured caps lower)",
              "Sector restricted at banks → NBFC (wider sector acceptance)",
              "Vintage <3 years → NBFC (banks want 3+ years)",
              "Clean strong file → always try bank first; save NBFC for second attempt",
            ],
          },
          {
            eyebrow: "Cost illustration",
            heading: "₹25 L for 5 years — bank vs NBFC vs fintech",
            body:
              "Bank @ 11% p.a.: EMI ~₹54,400, total interest ~₹7.6 L. NBFC @ 16% p.a.: EMI ~₹60,800, total interest ~₹11.5 L. Fintech @ 22% p.a.: EMI ~₹69,300, total interest ~₹16.6 L. Same ₹25 L loan costs ₹3.9 L more at NBFC and ₹9.0 L more at fintech vs bank — over 5 years. The rate spread is the cost of flexibility and speed.",
            bullets: [
              "₹25 L @ 11% bank, 5 yrs → EMI ₹54,400, total interest ₹7.6 L",
              "₹25 L @ 16% NBFC, 5 yrs → EMI ₹60,800, total interest ₹11.5 L",
              "₹25 L @ 22% fintech, 5 yrs → EMI ₹69,300, total interest ₹16.6 L",
              "Bank vs NBFC cost difference on ₹25 L: ₹3.9 L over 5 years",
              "Bank vs fintech cost difference on ₹25 L: ₹9.0 L over 5 years",
              "If your file qualifies for bank, the rate saving is substantial",
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
