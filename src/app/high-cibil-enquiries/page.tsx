import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/high-cibil-enquiries";
const TITLE = "High CIBIL Enquiries — How Many Is Too Many, and How to Recover";
const DESCRIPTION =
  "4+ hard enquiries in 6 months triggers credit-hungry flags at most banks. 6+ is often auto-decline. Here's how to read your enquiry pattern and recover.";

const FAQS = [
  {
    q: "Does checking my own CIBIL count as an enquiry?",
    a: "No — a self-check is a 'soft enquiry' and has zero impact on the score. Only lender-initiated 'hard enquiries' (when you actually apply for credit) affect the score. You should check your own CIBIL at least once a year, and definitely before applying for any loan.",
  },
  {
    q: "How long do hard enquiries stay on CIBIL?",
    a: "Hard enquiries stay on your CIBIL report for 24 months from the date of enquiry. The impact on your score is highest in the first 6 months, then diminishes. After 24 months, the enquiry falls off the report entirely.",
  },
  {
    q: "Will multiple enquiries for the same loan (rate-shopping) count as one?",
    a: "In India, CIBIL treats each lender enquiry separately — there's no 'rate-shopping' deduplication like in the US. So applying to 5 lenders for the same home loan generates 5 hard enquiries, all of which impact your score. Always diagnose first, shortlist 1–2 best-fit lenders, then apply only there.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "High CIBIL Enquiries", url: SLUG }])) }} />
      <AdvisoryPage
        eyebrow="High CIBIL Enquiries"
        title="High CIBIL enquiries — how many is too many, and how to recover"
        subtitle="Every hard enquiry stays 24 months. 4+ in 6 months triggers credit-hungry flags; 6+ is often auto-decline. The fix is simple — stop applying — but the recovery takes 6–12 months."
        crumbs={[{ label: "Home", to: "/" }, { label: "High CIBIL Enquiries" }]}
        intro="A hard enquiry is generated every time a lender pulls your CIBIL report for a credit application. Each one stays on your report for 24 months and affects your score. The pattern matters as much as the count — lenders see not just 'how many enquiries' but 'when' and 'for what'. Multiple recent enquiries for unsecured credit signal credit-hunger — the borrower is actively seeking new debt, which is a risk indicator. This guide explains the thresholds, the patterns, and the recovery sequence."
        formVariant="general"
        formService="High CIBIL Enquiries Advisory"
        sections={[
          {
            heading: "The enquiry thresholds lenders actually use",
            cards: [
              { title: "0–3 enquiries in 6 months", body: "Healthy. Most lenders see this as normal credit behaviour. No negative impact on approval odds." },
              { title: "4–5 enquiries in 6 months", body: "Borderline. Some lenders flag as 'credit-hungry'. Approval odds decrease, especially at PSU banks. May still be approved at NBFCs." },
              { title: "6+ enquiries in 6 months", body: "Often auto-decline at most banks. The system flags the file as credit-hungry before a human underwriter even sees it." },
              { title: "9+ enquiries in 12 months", body: "Universal decline reason at most banks. The borrower is clearly seeking multiple credit lines — high risk of over-leverage." },
              { title: "Multiple enquiries same day", body: "Looks like 'shopping' — sometimes flagged, sometimes treated as one (rate-shopping). Lender policy varies. Best to apply to 1–2 lenders, not 5 in one day." },
              { title: "Enquiries for different product types", body: "A home loan enquiry + a card enquiry + a personal loan enquiry in 30 days is more concerning than 3 enquiries for the same product type." },
            ],
          },
          {
            eyebrow: "Why this happens",
            heading: "The trap most borrowers fall into",
            body:
              "A borrower gets rejected by Bank A. Panicking, they apply to Bank B, C, D, and E in the next 30 days 'hoping one approves'. Each application is a hard enquiry. After 5 applications in 30 days, every lender sees 'credit-hungry' on the CIBIL report and rejects. The borrower is now worse off than before — score lower, profile weaker, and still no loan. This is the most common CIBIL death-spiral we see.",
            bullets: [
              "Bank A rejects → borrower panics → applies to Bank B, C, D, E in 30 days",
              "Each application is a hard enquiry — 5 enquiries in 30 days",
              "Bank B sees 4 recent enquiries, declines → borrower applies to Bank F",
              "Now 6 enquiries in 45 days → every lender auto-declines",
              "Score drops 50–80 points from the enquiry cluster alone",
              "Borrower is now worse off than before Bank A's rejection",
              "The fix: stop applying. Diagnose what Bank A rejected for. Fix it. Then apply to 1–2 best-fit lenders.",
            ],
          },
          {
            eyebrow: "Recovery plan",
            heading: "The 6–12 month enquiry recovery sequence",
            cards: [
              { title: "Stop applying", body: "Immediately. Every new enquiry extends the recovery window. Don't apply for any new credit — not even a credit card or BNPL — for the next 6 months minimum." },
              { title: "Pull your CIBIL report", body: "See exactly how many enquiries you have, from which lenders, on what dates. This tells you how long the recovery window is." },
              { title: "Fix the underlying issue", body: "Why were you rejected? Diagnose the trigger — CIBIL, banking, ITR, GST, FOIR, sector. Fix it during the no-application period." },
              { title: "Maintain clean behaviour", body: "On-time payments on all existing credit. Low utilisation on cards. No new accounts. Behaviour compounds over 6–12 months." },
              { title: "After 6 months — re-check CIBIL", body: "Pull your report again. Confirm the enquiry count has dropped (the oldest are now 6+ months old). Score should be visibly improving." },
              { title: "After 12 months — approach 1–2 lenders", body: "Most of the damaging enquiries are now 12+ months old. Approach only 1–2 best-fit lenders — not 5. If they decline, ask for the specific reason and address it before next attempt." },
            ],
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
