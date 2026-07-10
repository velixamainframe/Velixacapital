import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { ArrowRight, ShieldCheck, Layers, Scale, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "About Velixa Capital — Loan, Tax & Finance Consultants in India",
  description:
    "Velixa Capital simplifies finance for Indian business owners, professionals and property investors. Authorized partner with leading banks & NBFCs. Trust. Growth. Stability. Prosperity.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Velixa Capital",
    description:
      "We simplify finance — so you can focus on what's next. Authorized partner, integrated services, unbiased advice, privacy first.",
    url: "/about",
    type: "article",
  },
};

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Authorized partner",
    body:
      "We are an authorized channel partner with India's leading banks and NBFCs — your file moves through official credit channels with a single accountable team.",
  },
  {
    icon: Layers,
    title: "Integrated services",
    body:
      "Loans, credit cards, tax, accounting, GST, ITR, payroll, property advisory and software advisory — all under one roof. No running between five vendors.",
  },
  {
    icon: Scale,
    title: "Unbiased advice",
    body:
      "We are not a lender. We do not push you to whichever lender pays the highest commission. We match your file to the lender whose policy actually fits.",
  },
  {
    icon: Lock,
    title: "Privacy first",
    body:
      "Your PAN, mobile, email and financial data are AES-256-GCM encrypted at the application layer before storage. Never shared without your consent.",
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            / <span className="text-primary-foreground/90">About</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            About Velixa Capital
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-5xl">
            We simplify finance — <em className="not-italic text-gold">so you can focus on what's next.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
            Velixa Capital is an Indian loan & finance consultant for business owners, professionals and property
            investors. We diagnose your file the way an underwriter will read it, fix what auto-rejects, and only then
            approach the one or two lenders whose policy actually fits — never the panel of ten.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-gold">
              Talk to an advisor <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/funding-readiness-assessment" className="btn-outline-ivory">
              Start free assessment
            </Link>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY + TAGLINE */}
      <section className="py-16">
        <div className="container-edge max-w-3xl text-center">
          <p className="eyebrow">
            <span className="gold-line" />
            Our philosophy
          </p>
          <p className="mt-5 font-display text-2xl leading-relaxed md:text-3xl">
            "Most rejections aren't about your business — they're about how your file reads to an underwriter. We fix
            the file before you apply, so the right answer arrives the first time."
          </p>
          <div className="mt-10 rounded-2xl border border-gold/30 bg-gold/5 px-6 py-8">
            <p className="text-sm uppercase tracking-wider text-muted-foreground">Our promise</p>
            <p className="mt-2 font-display text-2xl text-gold md:text-3xl">
              Trust. Growth. Stability. Prosperity.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Four words, one team. We earn your trust with honest diagnosis, drive growth with right-fit funding,
              keep your finances stable with year-round compliance, and build prosperity that compounds.
            </p>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-muted/40 py-16">
        <div className="container-edge">
          <p className="eyebrow">
            <span className="gold-line" />
            Why Velixa
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Four pillars that shape every engagement.</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            We are a consultant — not a lender, not an aggregator. That changes how we work.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-gold/50 hover:shadow-[var(--shadow-soft)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <p.icon className="h-5 w-5 text-gold" />
                </span>
                <h3 className="mt-4 font-display text-lg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container-edge flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-primary-foreground/70">
              <span className="gold-line" />
              Ready when you are
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              Have a finance question? Let's start with a conversation.
            </h2>
            <p className="mt-3 max-w-xl text-primary-foreground/80">
              A senior advisor will read your profile and tell you exactly what's possible — no obligation, no portal
              spam, no unnecessary CIBIL enquiry.
            </p>
          </div>
          <Link href="/contact" className="btn-gold shrink-0">
            Talk to an advisor <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
