import type { Metadata } from "next";
import { AdvisoryPage, articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/site/advisory-page";

const SLUG = "/gst-advisory";
const TITLE = "GST Advisory";
const DESCRIPTION =
  "GST registration, monthly returns, ITC reconciliation, e-invoicing, annual return (GSTR-9/9C), LUT and notice handling — for Indian MSMEs, e-commerce sellers, manufacturers and service businesses.";

const FAQS = [
  {
    q: "When does GST registration become mandatory?",
    a: "When your aggregate annual turnover crosses ₹40 L (goods) or ₹20 L (services) — lower thresholds of ₹10 L / ₹20 L apply in special-category states. Inter-state sales, e-commerce operations, reverse-charge supplies and certain notified categories trigger mandatory registration irrespective of turnover.",
  },
  {
    q: "Why am I losing input tax credit every month?",
    a: "Almost always because supplier invoices haven't reflected in your GSTR-2B yet, or because the supplier filed late or didn't file at all. We reconcile your books with GSTR-2B every month before filing 3B, flag missing invoices and chase your vendors — so ITC is claimed only when legally available, avoiding future DRC-01A demands.",
  },
  {
    q: "Is e-invoicing mandatory for me?",
    a: "Mandatory once your annual aggregate turnover crosses ₹5 Cr. Voluntary e-invoicing is allowed below the threshold and often useful for fast ITC pass-through to buyers. We configure your ERP-to-IRP pipeline end-to-end, including error handling and reconciliation.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(TITLE, DESCRIPTION, SLUG)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Tax & Accounting", url: "/tax-accounting" },
              { name: "GST Advisory", url: SLUG },
            ]),
          ),
        }}
      />
      <AdvisoryPage
        eyebrow="Tax & Accounting"
        title="GST advisory — file on time, claim every rupee of ITC, defend every notice."
        subtitle="Registration, monthly returns, ITC reconciliation, e-invoicing, LUT, refunds, annual return (GSTR-9/9C) and notice defence — one team owns your GST compliance end-to-end."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Tax & Accounting", to: "/tax-accounting" },
          { label: "GST Advisory" },
        ]}
        intro="GST is the single largest compliance overhead for most Indian businesses. Velixa Capital handles the full cycle — from your first GSTIN to monthly returns, ITC reconciliation, e-invoicing, refunds and audit defence — so your finance team stops firefighting the GST portal every 20th of the month."
        formVariant="tax-accounting"
        formService="GST Advisory"
        sections={[
          {
            heading: "What we handle",
            cards: [
              { title: "Registration", body: "Regular, composition, e-commerce operator, ISD, casual taxable person and LUT for exporters." },
              { title: "Monthly returns", body: "GSTR-1, GSTR-3B, GSTR-2B reconciliation, ITC matching, challan and payment — filed before every deadline." },
              { title: "E-invoicing & e-way bill", body: "IRP integration, batch generation, error reconciliation and e-way bill automation for inter-state movement." },
              { title: "Annual return & audit", body: "GSTR-9 and GSTR-9C with reconciliation statement, signed by a qualified CA — before 31 December." },
              { title: "Refunds", body: "Export with LUT, inverted-duty structure, excess balance, ITC accumulated — end-to-end refund application and follow-up." },
              { title: "Notice & appeal", body: "Replies to SCN, ASMT-10, DRC-01, DRC-01A and suspension orders; appeals before appellate authority." },
            ],
          },
          {
            heading: "Specialised programmes",
            bullets: [
              "E-commerce sellers (Amazon, Flipkart, Meesho) — TCS reconciliation",
              "Exporters — LUT filing, refund of accumulated ITC, FTP benefits",
              "Composition dealers — quarterly CMP-08 and annual GSTR-4",
              "Multi-GSTIN groups — consolidated dashboard and reconciliation",
              "Input distributors (ISD) — ITC allocation across business units",
              "Real-estate developers — RERA + GST project-wise accounting",
            ],
          },
          {
            heading: "Why ITC reconciliation matters",
            body: "Most GST demands are not about tax rate — they're about ITC claimed but not eligible under section 16(2)(aa) and rule 36(4). We run a monthly 2B-vs-books reconciliation so you claim only what's legally available, build a vendor-compliance scorecard, and chase late-filing vendors before the next cycle.",
          },
        ]}
        faqs={FAQS}
      />
    </>
  );
}
