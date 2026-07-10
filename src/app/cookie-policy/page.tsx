import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy — Velixa Capital",
  description:
    "How Velixa Capital uses cookies — essential, analytics, functional and marketing. Manage your cookie preferences. Last updated: February 2026.",
  alternates: { canonical: "/cookie-policy" },
  openGraph: {
    title: "Cookie Policy | Velixa Capital",
    description: "What cookies are, the types we use, and how to manage your preferences.",
    url: "/cookie-policy",
    type: "article",
  },
};

const COOKIE_TYPES = [
  {
    name: "Essential cookies",
    required: true,
    body:
      "These cookies are strictly necessary for the website to function. They enable core functionality such as security, session integrity and accessibility. The website cannot function properly without these cookies — they are set as soon as you visit the site and cannot be disabled in our systems.",
    examples: ["Session ID", "CSRF token", "Cookie-banner preference", "Load-balancer routing"],
  },
  {
    name: "Analytics cookies",
    required: false,
    body:
      "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our website. They help us understand which pages are most and least popular, how visitors move around the site, and what content resonates — all in aggregate, never identifying individual visitors.",
    examples: ["Anonymous page-view tracking", "Referrer source", "Device type aggregate", "Session duration"],
  },
  {
    name: "Functional cookies",
    required: false,
    body:
      "These cookies enable enhanced functionality and personalisation — such as remembering your city, your service of interest, or pre-filling parts of a lead form. They may be set by us or by third-party providers whose services we have added to our pages.",
    examples: ["Selected city", "Service interest", "Form draft auto-save", "Language preference"],
  },
  {
    name: "Marketing cookies",
    required: false,
    body:
      "These cookies may be set on our website by our advertising partners to build a profile of your interests and show you relevant advertisements on other websites. They do not store directly personal data but are based on uniquely identifying your browser and internet device.",
    examples: ["Retargeting pixel", "Conversion tracking", "Ad-platform identifier"],
  },
];

export default function CookiePolicyPage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            / <span className="text-primary-foreground/90">Cookie Policy</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            Cookies
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-5xl">Cookie Policy</h1>
          <p className="mt-5 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
            What cookies are, the types we use, and how to manage your preferences.
          </p>
          <p className="mt-3 text-xs text-primary-foreground/70">Last Updated: February 2026</p>
        </div>
      </section>

      {/* SECTION 1 — What are cookies */}
      <section className="py-14">
        <div className="container-edge max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-gold">
              <Cookie className="h-5 w-5" />
            </span>
            <h2 className="font-display text-2xl md:text-3xl">What are cookies?</h2>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            Cookies are small text files stored on your device (computer, tablet or mobile) when you visit a website.
            They allow the website to recognise your device and remember your actions and preferences over a period of
            time, so you don't have to re-enter them every time you visit the site or move from one page to another.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Cookies are widely used to make websites work more efficiently and to provide information to site owners.
            They are not programs and cannot run code on your device, install malware, or access personal files on your
            device. Cookies only store the data you or the website place in them.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Velixa Capital uses cookies to operate the website, remember your preferences, analyse traffic, and improve
            our services. We never use cookies to identify you personally without your explicit consent.
          </p>
        </div>
      </section>

      {/* SECTION 2 — Types of cookies */}
      <section className="bg-muted/40 py-14">
        <div className="container-edge max-w-4xl">
          <p className="eyebrow">
            <span className="gold-line" />
            Cookie categories
          </p>
          <h2 className="mt-3 font-display text-2xl md:text-3xl">Types of cookies we use.</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            We use four categories of cookies. Only the essential category is required — the rest can be managed
            through your preferences.
          </p>
          <div className="mt-8 grid gap-5">
            {COOKIE_TYPES.map((c) => (
              <div key={c.name} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-lg">{c.name}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      c.required
                        ? "bg-emerald-500/10 text-emerald-700"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {c.required ? "Required" : "Optional"}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                <div className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Examples</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {c.examples.map((e) => (
                      <span
                        key={e}
                        className="rounded-full border border-border bg-background px-3 py-1 text-xs"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Managing your preferences */}
      <section className="py-14">
        <div className="container-edge max-w-3xl">
          <p className="eyebrow">
            <span className="gold-line" />
            Your control
          </p>
          <h2 className="mt-3 font-display text-2xl md:text-3xl">Managing your preferences.</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            You have full control over which cookies are stored on your device. The first time you visit our website,
            a cookie banner appears — you can accept all categories or manage your preferences by category. You can
            change your preferences at any time.
          </p>
          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-base">Through our cookie banner</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Click "Manage preferences" on the cookie banner at the bottom of the page to enable or disable
                analytics, functional and marketing cookies. Essential cookies cannot be disabled.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-base">Through your browser settings</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Most browsers let you refuse cookies or alert you when cookies are being sent. Refer to your browser's
                help documentation for instructions. Disabling cookies may affect functionality of some parts of our
                website.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-base">Opting out of analytics & marketing</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You can opt out of third-party analytics and marketing cookies directly through the relevant provider
                opt-out pages. We honour "Do Not Track" signals where supported by your browser.
              </p>
            </div>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            For any questions about our use of cookies, please contact us at{" "}
            <Link href="/contact" className="text-gold hover:underline">
              our contact page
            </Link>
            . See also our{" "}
            <Link href="/privacy" className="text-gold hover:underline">
              Privacy Policy
            </Link>{" "}
            for how we handle your personal data more broadly.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
