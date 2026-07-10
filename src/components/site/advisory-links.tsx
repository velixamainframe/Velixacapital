import Link from "next/link";
import { ArrowRight } from "lucide-react";

const LINKS = [
  { to: "/funding-readiness-assessment", title: "Funding Readiness Assessment", desc: "Score your business against the 6 pillars lenders actually evaluate." },
  { to: "/knowledge-hub/why-loan-applications-get-rejected", title: "Why Loan Applications Get Rejected", desc: "The 8 silent killers behind approval failures — and how to fix each." },
  { to: "/tax-planning-for-loan-eligibility", title: "Tax Planning for Loan Eligibility", desc: "How ITR & GST decisions today decide your borrowing capacity tomorrow." },
  { to: "/business-loan-vs-lap", title: "Business Loan vs LAP", desc: "Which structure actually fits your cash flow, risk and tenure." },
  { to: "/credit-improvement", title: "Credit Profile Improvement", desc: "From low CIBIL or rejection to a fundable file — the structured way." },
];

export function AdvisoryLinks({ heading = "Continue your funding readiness journey" }: { heading?: string }) {
  return (
    <section className="border-t border-border py-14">
      <div className="container-edge">
        <p className="eyebrow"><span className="gold-line" />Explore further</p>
        <h2 className="mt-3 font-display text-2xl md:text-3xl">{heading}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {LINKS.map((l) => (
            <Link key={l.to} href={l.to} className="group rounded-2xl border border-border bg-card p-5 transition hover:border-gold/50 hover:shadow-[var(--shadow-soft)]">
              <h3 className="font-display text-base flex items-center justify-between gap-2">{l.title} <ArrowRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" /></h3>
              <p className="mt-2 text-sm text-muted-foreground">{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
