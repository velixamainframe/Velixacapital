import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SITE_URL, CONTACT } from "@/lib/site-config";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Velixa Capital — Loans, Tax, Property & Accounting Consultants",
    template: "%s",
  },
  description:
    "Authorized channel partner with top banks & NBFCs. Best rates on 13+ loan types, GST/ITR filing, accounting and property consulting under one roof.",
  keywords: [
    "business loan", "loan against property", "personal loan", "MSME loan consultant",
    "CGTMSE funding", "GST registration", "ITR filing", "loan rejection help",
    "credit improvement", "working capital finance", "Velixa Capital",
  ],
  authors: [{ name: "Velixa Capital" }],
  creator: "Velixa Capital",
  publisher: "Velixa Capital",
  applicationName: "Velixa Capital",
  category: "Finance",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Velixa Capital",
    title: "Velixa Capital — Loans, Tax, Property & Accounting Consultants",
    description:
      "Authorized channel partner with top banks & NBFCs. Best rates on 13+ loan types, GST/ITR filing, accounting and property consulting under one roof.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Velixa Capital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velixa Capital — Loans, Tax, Property & Accounting Consultants",
    description:
      "Authorized channel partner with top banks & NBFCs. Best rates on 13+ loan types, GST/ITR filing, accounting and property consulting under one roof.",
    images: ["/og-image.svg"],
  },
  verification: { google: "google-site-verification-token" },
  other: {
    "format-detection": "telephone=yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1a2456" },
    { media: "(prefers-color-scheme: dark)", color: "#1a2456" },
  ],
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Velixa Capital",
  slogan: "Trust. Growth. Stability. Prosperity.",
  description: "Loan, tax, accounting and property consulting under one roof. Authorized channel partner with India's leading banks and NBFCs. Diagnosis-first approach — we review your file before submitting.",
  url: SITE_URL, areaServed: "IN",
  telephone: `+91-${CONTACT.phoneRaw}`, email: CONTACT.email, priceRange: "₹₹",
  knowsAbout: ["Business Loans", "Personal Loans", "Home Loans", "Loan Against Property", "Working Capital Finance", "Business Overdraft", "CGTMSE Funding", "GST Registration & Returns", "ITR Filing", "Bookkeeping & Accounting", "Credit Improvement", "Credit Cards", "Property Advisory", "CIBIL Score", "DSCR", "FOIR", "MSME Loans", "MUDRA Loans"],
  hasOfferCatalog: { "@type": "OfferCatalog", name: "Financial Services", itemListElement: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Loans", description: "Collateral-free MSME funding up to ₹1 Cr, rates from 8%* p.a." } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Personal Loans", description: "Unsecured funds, rates from 9.9%* p.a., disbursal in 24-72 hours" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Loans", description: "Rates from 8.35%* p.a., tenure up to 30 years" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Loan Against Property", description: "Unlock property value, rates from 9.5%* p.a." } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "CGTMSE Funding", description: "Collateral-free MSME funding up to ₹5 Cr" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "GST & ITR Filing", description: "Registration, returns, bookkeeping — ITR from ₹499" } },
  ] },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "120", bestRating: "5" },
};

const websiteJsonLd = {
  "@context": "https://schema.org", "@type": "WebSite",
  name: "Velixa Capital", url: SITE_URL,
  description: "Authorized channel partner with top banks & NBFCs. Best rates on 14+ loan types, GST/ITR filing, accounting and property consulting under one roof.",
  inLanguage: "en-IN",
  potentialAction: { "@type": "SearchAction", target: `${SITE_URL}/knowledge-hub?q={search_term_string}`, "query-input": "required name=search_term_string" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
