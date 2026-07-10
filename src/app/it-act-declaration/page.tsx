import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { CONTACT } from "@/lib/site-data";
import { Scale, Mail, Phone, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "IT Act Declaration — Velixa Capital",
  description:
    "Velixa Capital statutory declaration under the Information Technology Act, 2000 and the Intermediary Guidelines, 2021 — intermediary status under Section 79, prohibited content under Rule 3(1)(b), Grievance Officer under Rule 3(2). Last updated: 28 May 2026.",
  alternates: { canonical: "/it-act-declaration" },
  openGraph: {
    title: "IT Act Declaration | Velixa Capital",
    description:
      "Statutory declaration under the IT Act, 2000 and Intermediary Guidelines, 2021. Intermediary status, Grievance Officer, prohibited content policy.",
    url: "/it-act-declaration",
    type: "article",
  },
};

const BLOCKS = [
  {
    n: 1,
    heading: "Intermediary status",
    body:
      `Velixa Capital, operating through the website velixacapital.in, is an intermediary within the meaning of Section 2(1)(w) of the Information Technology Act, 2000 ("IT Act"). We facilitate access to financial products and professional services offered by third-party banks, NBFCs, qualified professionals (CAs, advocates, tax practitioners) and software vendors. We do not ourselves provide the underlying financial products or professional services.`,
  },
  {
    n: 2,
    heading: "Protection under Section 79 of the IT Act",
    body:
      "In accordance with Section 79 of the IT Act, Velixa Capital acts as an intermediary that provides access to a communication system over which information made available by third parties is transmitted, stored or hosted. We do not initiate the transmission, select the receiver of the transmission, or select or modify the information contained in the transmission. We shall not be liable for any third-party information made available or hosted on our platform, provided we comply with the conditions set out under Section 79 and the Intermediary Guidelines, 2021.",
  },
  {
    n: 3,
    heading: "No guarantee of outcomes",
    body:
      "Velixa Capital does not guarantee any loan approval, interest rate, credit limit, fee, service outcome or other terms offered by partner banks, NBFCs, government authorities or qualified professionals. All such terms are at the sole discretion of the relevant institution or professional. We do not warrant the accuracy, completeness or timeliness of any third-party information displayed on our platform.",
  },
  {
    n: 4,
    heading: "Prohibited content — Rule 3(1)(b) of the Intermediary Guidelines, 2021",
    body:
      "In compliance with Rule 3(1)(b) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, Velixa Capital strictly prohibits users from hosting, displaying, uploading, modifying, publishing, transmitting, storing, updating or sharing any information that: (a) belongs to another person and to which the user does not have any right; (b) is defamatory, obscene, pornographic, paedophilic, invasive of another's privacy, including bodily privacy; (c) is insulting or harassing on the basis of religion, race, caste, sex, place of birth or any other ground; (d) is harmful to minors; (e) infringes any patent, trademark, copyright or other proprietary right; (f) deceives or misleads the addressee about the origin of such information; (g) impersonates another person; (h) threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with foreign states, or public order; or (i) violates any law for the time being in force.",
  },
  {
    n: 5,
    heading: "Intellectual property rights",
    body:
      "All content on velixacapital.in — including text, graphics, logos, images, software and design — is the property of Velixa Capital or its licensors and is protected under the Copyright Act, 1957, the Trade Marks Act, 1999 and other applicable intellectual property laws of India. Unauthorised reproduction, distribution, modification or commercial use of any content is strictly prohibited. Third-party trademarks, logos and brand names appearing on the platform belong to their respective owners.",
  },
  {
    n: 6,
    heading: "User responsibility & acceptable use",
    body:
      "Users of velixacapital.in agree to use the platform lawfully and in compliance with this declaration, the IT Act and all other applicable laws. Users must not upload or transmit any prohibited content described in Section 4 above, attempt to gain unauthorised access to any part of the platform, introduce viruses or malicious code, scrape or harvest data, or use the platform for any fraudulent, deceptive or unlawful purpose.",
  },
  {
    n: 7,
    heading: "Limitation of liability",
    body:
      "To the maximum extent permitted by law, Velixa Capital shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, arising from your use of (or inability to use) the platform or any reliance on third-party information hosted on the platform. Our aggregate liability, if any, shall not exceed the fees paid by you to Velixa Capital for the specific engagement giving rise to the claim.",
  },
  {
    n: 8,
    heading: "Indemnity",
    body:
      "You agree to indemnify and hold harmless Velixa Capital, its directors, officers, employees and partners from any claim, demand, action, loss, damage, cost or expense (including reasonable legal fees) arising out of your breach of this declaration, your violation of any law or third-party rights, or your uploading or transmitting any prohibited content on or through our platform.",
  },
  {
    n: 9,
    heading: "Governing law & jurisdiction",
    body:
      "This declaration and any dispute arising out of or in connection with it shall be governed by and construed in accordance with the laws of the Republic of India. The courts at Mumbai, Maharashtra shall have exclusive jurisdiction over any disputes, subject to the consumer-forum and other statutory forums retaining their jurisdiction as provided by law.",
  },
  {
    n: 10,
    heading: "Grievance Officer — Rule 3(2) of the Intermediary Guidelines, 2021",
    body:
      "In compliance with Rule 3(2) of the Intermediary Guidelines, 2021, Velixa Capital has appointed a Grievance Officer resident in India to receive and address complaints regarding any violation of the guidelines or any prohibited content hosted on our platform. The Grievance Officer shall acknowledge receipt of every complaint within forty-eight (48) hours and resolve the complaint within fifteen (15) days of receipt.",
  },
  {
    n: 11,
    heading: "Reporting prohibited content",
    body:
      "If you encounter any content on velixacapital.in that you believe violates Rule 3(1)(b) of the Intermediary Guidelines, 2021, or any other applicable law, please report it to the Grievance Officer using the contact details below. Please include the URL or specific location of the content, a description of why you believe it is prohibited, and your contact information so we may respond.",
  },
  {
    n: 12,
    heading: "Acknowledgement",
    body:
      "By accessing or using velixacapital.in, you acknowledge that you have read, understood and agree to be bound by this declaration and all applicable terms and policies of Velixa Capital, including our Privacy Policy and Cookie Policy. If you do not agree with any part of this declaration, please discontinue use of the platform immediately.",
  },
];

export default function ITActDeclarationPage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-edge">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            / <span className="text-primary-foreground/90">IT Act Declaration</span>
          </nav>
          <p className="eyebrow text-primary-foreground/70">
            <span className="gold-line" />
            Statutory
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] md:text-5xl">
            IT Act Declaration
          </h1>
          <p className="mt-5 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
            Statutory declaration under the Information Technology Act, 2000 and the Information Technology
            (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
          </p>
          <p className="mt-3 text-xs text-primary-foreground/70">Last updated: 28 May 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="container-edge max-w-3xl">
          <div className="rounded-2xl border border-gold/30 bg-gold/5 p-5">
            <div className="flex items-center gap-2 text-sm">
              <Scale className="h-4 w-4 text-gold" />
              <span className="font-medium">This declaration applies to the website velixacapital.in.</span>
            </div>
          </div>
          <div className="mt-10 space-y-12">
            {BLOCKS.map((b) => (
              <div key={b.n} id={`block-${b.n}`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-gold">
                    {b.n}
                  </span>
                  <h2 className="font-display text-lg md:text-xl">{b.heading}</h2>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{b.body}</p>
              </div>
            ))}
          </div>

          {/* GRIEVANCE OFFICER BLOCK */}
          <div className="mt-12 rounded-2xl border border-gold/30 bg-gold/5 p-6">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-gold" />
              <h2 className="font-display text-lg text-gold">Grievance Officer Contact Details</h2>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              The Grievance Officer under Rule 3(2) of the Intermediary Guidelines, 2021, can be reached at:
            </p>
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
              Acknowledgement within 48 hours · Resolution within 15 days as required under Rule 3(2).
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Questions about this declaration? We're happy to clarify.
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
