import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { CONTACT } from "@/lib/site-data";
import { ArrowRight, Mail, Phone, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Velixa Capital",
  description:
    "Velixa Capital Privacy Policy. How we collect, use, store and protect your personal data under the Digital Personal Data Protection (DPDP) Act 2023. Last updated: 28 May 2026.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Velixa Capital",
    description:
      "How Velixa Capital collects, uses, stores and protects your personal data. DPDP Act 2023 compliant. Last updated 28 May 2026.",
    url: "/privacy",
    type: "article",
  },
};

const SECTIONS = [
  {
    n: 1,
    heading: "Introduction",
    body:
      `Velixa Capital ("the Company", "we", "us") is a loan, tax, accounting and property consulting business operating from India. We respect your privacy and are committed to protecting your personal data in accordance with the Digital Personal Data Protection Act, 2023 ("DPDP Act") and any other applicable laws of India. This Privacy Policy explains what personal data we collect, why we collect it, how we use it, who we share it with, how long we retain it, and the rights you have over it.`,
  },
  {
    n: 2,
    heading: "Information we collect",
    body:
      "We collect personal data that you voluntarily provide when you engage us — including your name, mobile number, email address, PAN, city, employment type, monthly income, loan amount required, business details, and any documents you share (bank statements, ITR, GST returns, KYC proofs). We also collect non-personal usage data automatically when you visit our website — IP address, browser type, device type, pages visited and time spent — through cookies and similar technologies (see Section 7).",
  },
  {
    n: 3,
    heading: "How we use your information",
    body:
      "We use your personal data solely for legitimate business purposes: to respond to your enquiry, diagnose your loan or finance eligibility, match you with a suitable lender or service partner, prepare and submit applications, coordinate with credit managers, deliver tax/accounting/property advisory services, comply with regulatory obligations, and communicate with you about your engagement. We do not use your data for any unrelated commercial purpose without your explicit consent.",
  },
  {
    n: 4,
    heading: "Sharing of information",
    body:
      "We share your personal data only with parties necessary to deliver the service you requested — partner banks, NBFCs, credit bureaus (only when you authorise a CIBIL pull), independent qualified professionals (CAs, advocates, tax practitioners), and software vendors whose products we facilitate. We never sell, rent or trade your personal data. Sharing is governed by written agreements requiring the recipient to protect your data to standards at least equivalent to ours.",
  },
  {
    n: 5,
    heading: "Data storage & security",
    body:
      "Your personal data is stored on secure cloud infrastructure with strict access controls. Personally identifiable information (PII) such as your name, mobile, email and PAN is AES-256-GCM encrypted at the application layer before being written to the database. Access is restricted to authorised personnel on a need-to-know basis, logged, and reviewed periodically. Despite our best efforts, no system can be guaranteed 100% secure — we will notify you and the relevant authorities of any material data breach in accordance with the DPDP Act.",
  },
  {
    n: 6,
    heading: "Your rights under the DPDP Act, 2023",
    body:
      "Under the DPDP Act, you have the right to: (a) access and obtain a copy of your personal data we hold; (b) request correction or completion of inaccurate or incomplete data; (c) request erasure of your personal data, except where retention is required by law or for legitimate business purposes; (d) nominate another individual to exercise your rights in the event of death or incapacity; and (e) grievance redressal. To exercise any of these rights, email the Grievance Officer (see Section 11) — we will respond within the timelines prescribed under the DPDP Act.",
  },
  {
    n: 7,
    heading: "Cookies",
    body:
      "We use cookies and similar technologies to operate the website, remember your preferences, analyse traffic, and improve our services. We use three categories: essential (required for the site to function), analytics (to understand usage), and functional (to remember preferences). You can manage your cookie preferences through your browser settings or our cookie banner. See our separate Cookie Policy for full details.",
  },
  {
    n: 8,
    heading: "Third-party links",
    body:
      "Our website may contain links to third-party websites — partner banks, government portals, software vendors, affiliate products. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any third-party websites you visit. Clicking external links is at your own discretion.",
  },
  {
    n: 9,
    heading: "Children's privacy",
    body:
      "Our services are intended for individuals aged 18 and above. We do not knowingly collect personal data from children under 18. If you believe a minor has provided us with personal data, please contact our Grievance Officer — we will promptly delete such data upon verification.",
  },
  {
    n: 10,
    heading: "Changes to this policy",
    body:
      `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements or for other operational reasons. The "Last updated" date at the top of this page indicates when the policy was last revised. Material changes will be notified through our website or by email (where we have your email address). Continued use of our services after a change constitutes acceptance of the updated policy.`,
  },
  {
    n: 11,
    heading: "Grievance Officer",
    body:
      "Under the DPDP Act, 2023, Velixa Capital has appointed a Grievance Officer to address any concerns or complaints regarding your personal data. You may contact the Grievance Officer using the details below. We acknowledge receipt of every complaint within 48 hours and resolve genuine grievances within the timeframes prescribed under the DPDP Act.",
  },
];

export default function PrivacyPage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            / <span className="text-primary-foreground/90">Privacy Policy</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            Privacy
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-5xl">Privacy Policy</h1>
          <p className="mt-5 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
            How Velixa Capital collects, uses, stores and protects your personal data — in compliance with the Digital
            Personal Data Protection Act, 2023.
          </p>
          <p className="mt-3 text-xs text-primary-foreground/70">Last updated: 28 May 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="container-edge max-w-3xl space-y-12">
          {SECTIONS.map((s) => (
            <div key={s.n} id={`section-${s.n}`}>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-gold">
                  {s.n}
                </span>
                <h2 className="font-display text-xl md:text-2xl">{s.heading}</h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{s.body}</p>
            </div>
          ))}

          {/* GRIEVANCE OFFICER BLOCK */}
          <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-gold" />
              <h2 className="font-display text-lg text-gold">Grievance Officer — Velixa Capital</h2>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-gold/50"
              >
                <Mail className="h-5 w-5 text-gold" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{CONTACT.email}</p>
                </div>
              </a>
              <a
                href={`tel:+${CONTACT.phoneRaw}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-gold/50"
              >
                <Phone className="h-5 w-5 text-gold" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{CONTACT.phone}</p>
                </div>
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              When contacting the Grievance Officer, please include your name, mobile number, the date of your
              engagement with us, and a clear description of your concern. We acknowledge every complaint within 48
              hours.
            </p>
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-border bg-muted/40 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Questions about how we handle your data? We're happy to walk through this policy with you.
            </p>
            <Link href="/contact" className="btn-gold mt-4 inline-flex">
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
