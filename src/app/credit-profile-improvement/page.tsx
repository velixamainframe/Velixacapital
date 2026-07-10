import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/credit-profile-improvement";
const TITLE = "Credit Profile Improvement — Beyond the Score";
const DESCRIPTION =
  "Your CIBIL score is just one part of the picture. Credit profile improvement addresses the underlying report — enquiries, settled trades, utilisation pattern, credit mix and vintage.";

const FAQS = [
  {
    q: "What's the difference between CIBIL score and credit profile?",
    a: "The score is a single number (300–900). The profile is the underlying report — payment history, credit mix, utilisation, enquiries, settled/written-off markers, vintage, and the detailed tradeline history. Two borrowers with the same 740 score can have very different profiles — one approvable, one auto-decline. We work on the profile, not just the score.",
  },
  {
    q: "How long does credit profile improvement take?",
    a: "It depends on the issues. Enquiry overload: 6 months of no new applications. High utilisation: immediate fix (pay down). Late payments: 12–24 months of on-time behaviour to dilute. Settled/written-off: 7 years to fully fall off, but recoverable in 2–3 years. Most comprehensive improvements take 6–12 months.",
  },
  {
    q: "Can you guarantee a specific score improvement?",
    a: "No — and anyone who does is a fraud. CIBIL scoring is opaque; we can't promise a specific number. What we can promise: a sequenced, evidence-based plan that addresses every weakness in your profile, with realistic timelines for each. The score follows the profile, not the other way around.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Credit Profile Improvement", url: SLUG }])) }} />
      <AdvisoryPage
        eyebrow="Credit Profile Improvement"
        title="Credit profile improvement — the report matters more than the score"
        subtitle="A 740 score with 12 enquiries, a settled card and maxed-out utilisation is weaker than a 720 with a clean profile. We work on the underlying report."
        crumbs={[{ label: "Home", to: "/" }, { label: "Credit Profile Improvement" }]}
        intro="Borrowers focus on the score; underwriters focus on the profile. The score gets you in the door; the report decides. A 740 with recent enquiries, a settled trade, or 5 maxed-out cards is often declined where a 720 with a clean 5-year profile is approved. Credit profile improvement means addressing every weakness in the underlying report — not chasing a number."
        formVariant="general"
        formService="Credit Profile Improvement"
        sections={[
          {
            heading: "What an underwriter sees beyond the score",
            cards: [
              { title: "Enquiry pattern", body: "How many hard enquiries in last 6, 12, 24 months — and the lender mix. 4+ in 6 months is credit-hungry. 6+ is often auto-decline." },
              { title: "Payment history detail", body: "DPD (days past due) on every trade for last 36 months. A single 30-day DPD two years ago is a yellow flag; recent DPDs are red flags." },
              { title: "Settled / written-off markers", body: "Any 'Settled' or 'Written-off' status stays 7 years. Most banks auto-decline any settled trade, regardless of score." },
              { title: "Credit mix", body: "All-unsecured (cards + personal loans) is riskier than a mix of secured and unsecured. Adding a secured trade (auto, home, gold) improves the mix." },
              { title: "Vintage", body: "Age of oldest trade, age of average trade. A 740 on a 6-month file is weaker than a 720 on a 10-year file with a clean home loan." },
              { title: "Utilisation pattern", body: "Trend of utilisation over months, not just today. Sustained high utilisation (>50%) signals over-leverage even if you pay on time." },
              { title: "Active trade count", body: "5+ active unsecured trades = over-leverage signal. Too few trades = thin file (also weak)." },
              { title: "Recent account openings", body: "Multiple new accounts in last 6 months = credit-hungry signal. Slow down new account openings before applying for a major loan." },
            ],
          },
          {
            eyebrow: "The diagnostic",
            heading: "How we audit your credit profile",
            body:
              "We read your full CIBIL report the way an underwriter will — line by line. For every trade, every enquiry, every DPD, every status marker, we flag whether it helps or hurts your approval odds. The output is a profile audit document with specific, sequenced fixes — not generic advice.",
            bullets: [
              "Pull your full CIBIL report (we help you get it; you keep the original)",
              "Audit each tradeline: payment history, current status, age, limit, balance",
              "Audit every hard enquiry: lender, date, type — identify clusters to explain",
              "Compute utilisation per card and overall, with 6-month trend",
              "Identify any settled/written-off trades and their aging",
              "Evaluate credit mix and vintage vs lender expectations",
              "Output: profile audit document with prioritised fixes and timeline",
            ],
          },
          {
            eyebrow: "Strategic improvements",
            heading: "Profile improvements that compound over time",
            cards: [
              { title: "Diversify credit mix", body: "If your file is all unsecured (cards + personal loans), add a secured trade. A small auto loan or gold loan, paid on time, builds the mix and the score." },
              { title: "Build vintage", body: "Don't close old accounts. The age of your oldest trade is a major score factor. A 10-year-old card with minimal use is worth more than a 1-year-old card with high use." },
              { title: "Strategic limit increases", body: "Request credit limit increases on existing cards (not new cards). Higher limit with same utilisation = lower utilisation ratio. But don't use the higher limit." },
              { title: "Authorised user strategy", body: "If a family member has an old, clean card, ask to be added as an authorised user. The card's vintage and clean history reflect on your CIBIL." },
              { title: "Secured card for rebuild", body: "If your score is below 650 and you can't get an unsecured card, take a secured credit card (against FD). It builds payment history and utilisation data — the foundations of score recovery." },
              { title: "Dispute resolution follow-through", body: "File disputes for inaccurate info, then follow up every 30 days until resolved. CIBIL must respond within 30 days; if you don't follow up, the inaccurate info stays." },
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
