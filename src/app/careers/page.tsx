import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { listCareers } from "@/lib/data";
import { ArrowRight, MapPin, Briefcase, IndianRupee, Mail, Building2 } from "lucide-react";

// Job listings come from the database — render at runtime, not build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers at Velixa Capital — Build Your Career in Finance Advisory",
  description:
    "Join Velixa Capital — a loan, tax & finance consultant for Indian business owners, professionals and property investors. Open roles across advisory, sales, credit, operations and content.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers at Velixa Capital",
    description:
      "Build your career at Velixa. Open roles across advisory, sales, credit, operations and content.",
    url: "/careers",
  },
};

const CAREERS_EMAIL = "careers@velixcapital.in";

function vacancyApplyHref(title: string) {
  const subject = `Application — ${title}`;
  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export default async function CareersPage() {
  const jobs = await listCareers();

  return (
    <SiteShell>
      {/* HERO */}
      <section className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            / <span className="text-primary-foreground/90">Careers</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            Careers
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-5xl">
            Build your career at Velixa.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
            We are building India's most trusted finance consulting team — one that diagnoses files like underwriters,
            not call-centre agents. If you love untangling credit profiles and want to do right by the borrower, we'd
            like to meet you.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={`mailto:${CAREERS_EMAIL}`} className="btn-gold">
              Email your CV <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/about" className="btn-outline-ivory">
              About Velixa
            </Link>
          </div>
        </div>
      </section>

      {/* JOBS OR EMPTY STATE */}
      <section className="py-16">
        <div className="container-edge">
          {jobs.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center md:p-12">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-gold">
                <Briefcase className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl md:text-3xl">No open roles right now — but we're always hiring talent.</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                We don't always have a posted vacancy for the role we'll need next month. If you have a background in
                loans, credit, tax, accounting, sales, operations or content — and Velixa's mission resonates — send
                us your CV. We read every application.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3">
                <a
                  href={`mailto:${CAREERS_EMAIL}`}
                  className="btn-gold inline-flex"
                >
                  <Mail className="h-4 w-4" /> Email your CV
                </a>
                <p className="text-xs text-muted-foreground">{CAREERS_EMAIL}</p>
              </div>
            </div>
          ) : (
            <>
              <p className="eyebrow">
                <span className="gold-line" />
                Open positions
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">{jobs.length} role{jobs.length === 1 ? "" : "s"} open.</h2>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                Click any role to apply with your CV. Don't see a perfect fit? Email us — we hire for trajectory, not
                just job descriptions.
              </p>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {jobs.map((job) => (
                  <article
                    key={job.id}
                    className="flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-gold/50 hover:shadow-[var(--shadow-soft)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {job.department && (
                          <p className="eyebrow">
                            <span className="gold-line" />
                            {job.department}
                          </p>
                        )}
                        <h3 className="mt-1 font-display text-lg leading-tight">{job.title}</h3>
                      </div>
                      {job.employmentType && (
                        <span className="shrink-0 rounded-full bg-primary/5 px-3 py-1 text-[11px] font-medium text-primary">
                          {job.employmentType}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">{job.shortDescription}</p>

                    <div className="mt-4 grid gap-2 text-xs text-muted-foreground">
                      {job.location && (
                        <p className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-gold" />
                          <span className="font-medium text-foreground">Location:</span> {job.location}
                        </p>
                      )}
                      {job.salaryRange && (
                        <p className="flex items-center gap-2">
                          <IndianRupee className="h-3.5 w-3.5 text-gold" />
                          <span className="font-medium text-foreground">Salary:</span> {job.salaryRange}
                        </p>
                      )}
                      {job.employmentType && (
                        <p className="flex items-center gap-2">
                          <Building2 className="h-3.5 w-3.5 text-gold" />
                          <span className="font-medium text-foreground">Type:</span> {job.employmentType}
                        </p>
                      )}
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{job.description}</p>

                    {job.requirements && job.requirements.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Requirements
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {job.requirements.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-foreground/85">
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                      <a
                        href={vacancyApplyHref(job.title)}
                        className="btn-gold inline-flex text-sm"
                      >
                        Apply now <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={`mailto:${CAREERS_EMAIL}`}
                        className="text-xs text-muted-foreground hover:text-gold"
                      >
                        {CAREERS_EMAIL}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ALWAYS-HIRING CTA */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container-edge flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-primary-foreground/70">
              <span className="gold-line" />
              Don't see your role?
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              Send us your CV anyway. We hire for trajectory.
            </h2>
            <p className="mt-3 max-w-xl text-primary-foreground/80">
              Tell us what you do well, what you want to do next, and why Velixa. We read every email.
            </p>
          </div>
          <a href={`mailto:${CAREERS_EMAIL}`} className="btn-gold shrink-0">
            Email your CV <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
