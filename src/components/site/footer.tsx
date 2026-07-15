import Link from "next/link";
import { CONTACT, COMPLIANCE_DISCLAIMER } from "@/lib/site-data";

const SOCIALS: { label: string; href: string; icon: string }[] = [
  { label: "Facebook", href: "https://www.facebook.com/people/Velixa-Capital/61590876623305/", icon: "M13 22v-8h3l1-4h-4V7.5c0-1.2.4-2 2-2h2V2.2C16.6 2.1 15.4 2 14 2c-3 0-5 1.8-5 5v3H6v4h3v8h4z" },
  { label: "Instagram", href: "https://www.instagram.com/velixa_capital", icon: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.5 1s.8.9 1 1.5c.2.4.3 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-1 1.5s-.9.8-1.5 1c-.4.2-1 .3-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.5-1s-.8-.9-1-1.5c-.2-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 1-1.5s.9-.8 1.5-1c.4-.2 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 12 18.6 6.6 6.6 0 0 0 12 5.4zm0 10.9a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6zM18.9 5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" },
  { label: "LinkedIn", href: "https://linkedin.com/company/velixcapital", icon: "M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9.5h4V21H3V9.5zM10 9.5h3.8v1.6h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.8 2.6 4.8 5.9V21h-4v-5c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V21h-4V9.5z" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-primary text-primary-foreground">
      <div className="container-edge grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <img src="/favicon.jpg" alt="Velixa Capital" width={64} height={64} className="h-16 w-16 object-contain" />
            <p className="font-display text-2xl font-bold">Velixa Capital</p>
          </div>
          <p className="mt-3 text-sm text-primary-foreground/70">{CONTACT.tagline}</p>
          <p className="mt-4 text-xs text-primary-foreground/60">
            Financial distribution associate with access to leading banks and NBFCs across India.
            We are not a lender — we are your strategic financial guide.
          </p>

          <div className="mt-6 rounded-xl bg-primary-foreground/[0.05] p-4 ring-1 ring-primary-foreground/10">
            <p className="eyebrow text-primary-foreground/60">Get in touch</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href={`tel:${CONTACT.phoneRaw}`} className="text-primary-foreground/85 hover:text-gold">📞 {CONTACT.phone}</a></li>
              <li><a href={`mailto:${CONTACT.email}`} className="text-primary-foreground/85 hover:text-gold">✉️ {CONTACT.email}</a></li>
              <li><Link href="/contact" className="text-gold hover:underline">Request a callback →</Link></li>
            </ul>
          </div>
        </div>

        <div>
          <p className="eyebrow text-primary-foreground/60">Advisory</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/funding-readiness" className="text-primary-foreground/80 hover:text-gold">Funding Readiness</Link></li>
            <li><Link href="/business-funding" className="text-primary-foreground/80 hover:text-gold">Business Funding</Link></li>
            <li><Link href="/credit-improvement" className="text-primary-foreground/80 hover:text-gold">Credit Improvement</Link></li>
            <li><Link href="/tax-finance" className="text-primary-foreground/80 hover:text-gold">Tax &amp; Finance</Link></li>
            <li><Link href="/property-finance" className="text-primary-foreground/80 hover:text-gold">Property Finance</Link></li>
            <li><Link href="/funding-readiness-assessment" className="text-gold">Free funding readiness assessment →</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-primary-foreground/60">Company</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="text-primary-foreground/80 hover:text-gold">About Us</Link></li>
            <li><Link href="/careers" className="text-primary-foreground/80 hover:text-gold">Careers</Link></li>
            <li><Link href="/partner-banks" className="text-primary-foreground/80 hover:text-gold">Bank Partners</Link></li>
            <li><Link href="/partner" className="text-primary-foreground/80 hover:text-gold">Become a Partner</Link></li>
            <li><Link href="/contact" className="text-primary-foreground/80 hover:text-gold">Contact</Link></li>
            <li><Link href="/portal" className="text-primary-foreground/80 hover:text-gold">Employee Login</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-primary-foreground/60">Resources</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/knowledge-hub" className="text-primary-foreground/80 hover:text-gold">Knowledge Hub</Link></li>
            <li><Link href="/blog" className="text-primary-foreground/80 hover:text-gold">Blog</Link></li>
            <li><Link href="/business-funding-scorecard" className="text-primary-foreground/80 hover:text-gold">Funding Scorecard</Link></li>
            <li><Link href="/loan-readiness-checklist" className="text-primary-foreground/80 hover:text-gold">Loan Readiness Checklist</Link></li>
            <li><Link href="/loans" className="text-primary-foreground/80 hover:text-gold">All loan products</Link></li>
            <li><Link href="/locations" className="text-primary-foreground/80 hover:text-gold">Cities we serve</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-primary-foreground/60">Legal</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/privacy" className="text-primary-foreground/80 hover:text-gold">Privacy Policy</Link></li>
            <li><Link href="/it-act-declaration" className="text-primary-foreground/80 hover:text-gold">IT Act Declaration</Link></li>
            <li><Link href="/disclosures" className="text-primary-foreground/80 hover:text-gold">Terms of Service</Link></li>
            <li><Link href="/privacy" className="text-primary-foreground/80 hover:text-gold">Refund Policy</Link></li>
            <li><Link href="/contact" className="text-primary-foreground/80 hover:text-gold">Grievance Redressal</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-edge flex flex-col items-start gap-3 py-5 md:flex-row md:items-center md:justify-between">
          <p className="text-xs uppercase tracking-widest text-primary-foreground/60">Follow Velixa on social</p>
          <div className="flex flex-wrap gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener"
                aria-label={s.label}
                title={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition hover:bg-gold hover:text-gold-foreground"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
        <div className="container-edge py-5 text-[11px] leading-relaxed text-primary-foreground/55">
          <p><strong className="text-primary-foreground/75">Compliance disclaimer:</strong> {COMPLIANCE_DISCLAIMER}</p>
        </div>
        <div className="container-edge flex flex-col gap-2 border-t border-primary-foreground/10 py-5 text-xs text-primary-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Velixa Capital. All rights reserved.</p>
          <span>Loan products offered by partner banks &amp; NBFCs. Terms apply. *Indicative rates &amp; figures — final at lender's discretion.</span>
        </div>
      </div>
    </footer>
  );
}
