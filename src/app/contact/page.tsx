import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { LeadForm } from "@/components/site/lead-form";
import { Phone, MessageCircle, Mail, ShieldCheck, Clock, Lock } from "lucide-react";
import { CONTACT } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact Velixa Capital — Talk to a Loan & Finance Advisor",
  description:
    "Call +91 95829 14054, WhatsApp us, or request a callback. A senior Velixa Capital advisor responds within 24 hours. No spam, no portal submissions without your consent.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Velixa Capital",
    description: "Talk to an advisor. A senior Velixa Capital advisor responds within 24 hours.",
    url: "/contact",
  },
};

const CONTACT_CARDS = [
  {
    icon: Phone,
    title: "Call us",
    detail: CONTACT.phone,
    sub: "Mon–Sat, 9:30 AM – 7:00 PM IST",
    href: `tel:+${CONTACT.phoneRaw}`,
    cta: "Call now",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: CONTACT.phone,
    sub: "Fastest — typical reply within minutes",
    href: `https://wa.me/${CONTACT.phoneRaw}`,
    cta: "Chat on WhatsApp",
  },
  {
    icon: Mail,
    title: "Email",
    detail: CONTACT.email,
    sub: "For detailed queries & document sharing",
    href: `mailto:${CONTACT.email}`,
    cta: "Send an email",
  },
];

const PROMISES = [
  {
    icon: Clock,
    title: "24-hour response",
    body: "A senior advisor — not a call-centre agent — will personally read your request and respond within one business day.",
  },
  {
    icon: ShieldCheck,
    title: "No CIBIL pull",
    body: "We review your profile, banking and documents first. A credit pull happens only when we agree to submit to a specific lender.",
  },
  {
    icon: Lock,
    title: "Encrypted & private",
    body: "Your PAN, mobile, email and financial data are AES-256-GCM encrypted before storage. Never shared without consent.",
  },
];

export default function ContactPage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            / <span className="text-primary-foreground/90">Contact</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            Contact
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-5xl">
            Talk to an advisor.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
            Tell us what you need — a loan, a credit card, tax filing, accounting, or a property question. The right
            senior advisor will reach you within 24 hours.
          </p>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="py-16">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />
            Reach us directly
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Three ways to start a conversation.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {CONTACT_CARDS.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-soft)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <c.icon className="h-5 w-5 text-gold" />
                </span>
                <h3 className="mt-4 font-display text-lg">{c.title}</h3>
                <p className="mt-1 text-base font-medium text-foreground">{c.detail}</p>
                <p className="mt-1 text-xs text-muted-foreground">{c.sub}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:text-gold">
                  {c.cta} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISE + LEAD FORM */}
      <section className="bg-muted/40 py-16">
        <div className="container-edge grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <p className="eyebrow">
              <span className="gold-line" />
              Our promise
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Senior advice, on your schedule.</h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              We don't operate a call-centre. Every enquiry is read by a senior advisor who decides whether we can
              genuinely help you — and tells you so honestly before any work begins.
            </p>
            <div className="mt-8 space-y-4">
              {PROMISES.map((p) => (
                <div key={p.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <p.icon className="h-4 w-4 text-gold" />
                  </span>
                  <div>
                    <h3 className="font-display text-base">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:sticky lg:top-24">
            <LeadForm
              title="Request a callback"
              subtitle="A senior advisor will reach you within 24 hours."
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
