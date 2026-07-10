import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/credit-improvement";
const TITLE = "Credit Improvement — A 6-Month Plan to Lift Your CIBIL";
const DESCRIPTION =
  "Practical, sequenced 6-month plan to lift your CIBIL score — pay down utilisation, fix enquiry overload, dispute inaccurate trades, and rebuild vintage.";

const FAQS = [
  {
    q: "How fast can a CIBIL score realistically improve?",
    a: "Visible improvement usually takes 3–6 months of clean behaviour — on-time payments, lower utilisation, no new enquiries. The impact of stopping new enquiries compounds over 6–12 months. There is no legitimate 'quick fix' — anyone promising overnight score jumps is a fraud.",
  },
  {
    q: "Should I close old credit cards I no longer use?",
    a: "Usually no — closing your oldest card shortens your credit vintage and can lower your score. Keep the oldest card open, even with minimal activity. If it has an annual fee, ask the bank to convert it to a lifetime-free variant or downgrade it rather than close it.",
  },
  {
    q: "Will paying off a settled account improve my score?",
    a: "Paying the outstanding on a 'settled' account doesn't automatically improve the score — the 'Settled' marker stays on CIBIL for 7 years. But getting a written closure from the lender and updating the bureau to show 'Closed' (vs 'Settled') helps. The score recovers gradually as the settlement ages and clean behaviour compounds.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Credit Improvement", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Credit Improvement"
        title="Credit improvement — a structured 6-month plan to lift your CIBIL"
        subtitle="No 'CIBIL repair' shortcuts. Just the disciplined, sequenced actions that actually move the score — and the timeline you can realistically expect."
        crumbs={[{ label: "Home", to: "/" }, { label: "Credit Improvement" }]}
        intro="CIBIL improvement is not about tricks — it's about consistent behaviour over time. The score is a composite of payment history, credit mix, utilisation, enquiries and vintage. Each component moves on its own timeline. This 6-month plan addresses each in the right sequence, so by month 6 your file is genuinely stronger — not cosmetically patched."
        formVariant="general"
        formService="Credit Improvement Advisory"
        sections={[
          {
            heading: "The 5 levers that actually move the score",
            cards: [
              { title: "Payment history (35%)", body: "On-time payment of every EMI and card bill. A single 30-day delay can drop the score 50–100 points. Set auto-debit on every account." },
              { title: "Credit utilisation (30%)", body: "Keep revolving utilisation below 30% of limit. Maxed-out cards signal over-leverage. Pay down before statement generation, not just before due date." },
              { title: "Credit age / vintage (10%)", body: "Older trades improve the score. Don't close your oldest card. If it has a fee, downgrade to lifetime-free variant instead." },
              { title: "Credit mix (10%)", body: "A mix of secured (home, auto) and unsecured (personal, card) trades is healthier than all-unsecured. Add a secured trade if your file is all cards." },
              { title: "New credit / enquiries (10%)", body: "Stop applying. Every hard enquiry stays 24 months. 4+ in 6 months triggers credit-hungry flags. 6+ in 6 months is often auto-decline." },
            ],
          },
          {
            eyebrow: "Month-by-month",
            heading: "The 6-month sequenced plan",
            body:
              "Month 1 stabilises — stop the bleeding. Months 2–3 clean up — pay down utilisation, dispute inaccuracies. Months 4–5 rebuild — on-time payments compound. Month 6 verify — pull your CIBIL and confirm the score has moved before approaching any lender.",
            bullets: [
              "Month 1: Stop all new credit applications. Pull your CIBIL report. Set auto-debit on every existing EMI and card.",
              "Month 1: Dispute any inaccurate trades (wrong DPD, fraudulent enquiries, accounts that aren't yours).",
              "Month 2: Pay down credit card utilisation to <30% of limit on every card. Pay before statement generation.",
              "Month 2: If you have a settled account, get written closure from the lender. File a dispute with CIBIL to update the status.",
              "Month 3: Continue on-time payments. Don't open new credit. Don't close old cards.",
              "Month 4–5: Behaviour compounds. The score should be visibly improving. Continue the discipline.",
              "Month 6: Pull CIBIL again. Confirm score has moved. Then — and only then — approach 1–2 best-fit lenders.",
            ],
          },
          {
            eyebrow: "What to avoid",
            heading: "Credit improvement traps that hurt instead of help",
            cards: [
              { title: "CIBIL repair agents", body: "Anyone promising to 'fix' your CIBIL for a fee is either a fraud or doing what you can do for free (dispute inaccurate info). Save the money." },
              { title: "Closing old cards", body: "Closing your oldest card shortens credit vintage and lowers the score. Keep it open, even with minimal activity." },
              { title: "Multiple quick applications", body: "Applying to 5 lenders in 30 days 'hoping one approves' tanks the score further. Stop applying — diagnose first." },
              { title: "Paying to remove accurate info", body: "No legitimate service can remove accurate information faster than the natural timeline. Settled accounts stay 7 years; written-offs stay 7 years." },
              { title: "Settling instead of closing", body: "If you can afford it, pay the full outstanding and get 'Closed' status — not 'Settled'. 'Settled' is a major decline trigger at most banks." },
              { title: "Ignoring the dispute window", body: "CIBIL must respond to disputes within 30 days. If you don't follow up, the inaccurate info stays. Track every dispute to closure." },
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
