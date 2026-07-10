import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SoftwareProductPage } from "@/components/site/software-product-page";
import { SOFTWARE_PRODUCTS, getProduct } from "@/lib/software-data";

type Params = { category: string; slug: string };

const HEADLINES: Record<string, string> = {
  cleartax:
    "ClearTax: automating GST, e-invoicing and ITR filing for Indian enterprises.",
  tally:
    "Tally Prime: India's most-trusted GST + inventory accounting stack for MSMEs.",
  zoho:
    "Zoho Books: cloud accounting built for Indian tech startups and automated finance workflows.",
  quickbooks:
    "QuickBooks Online: global multi-currency accounting for scaling businesses and cross-border teams.",
  hubspot:
    "HubSpot: all-in-one sales, marketing, and service automation stack for scaling revenue teams.",
  freshsales:
    "Freshsales: affordable, AI-powered sales CRM built for fast-growing Indian sales pipelines.",
  monday: "Monday.com: highly visual drag-and-drop work-OS for operations managers.",
  clickup:
    "ClickUp: customisable agile workspace built to replace overlapping SaaS subscriptions.",
};

export function generateStaticParams(): Params[] {
  return SOFTWARE_PRODUCTS.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const p = getProduct(slug);
  if (!p || p.category !== category) return { title: "Product not found" };
  return {
    title: `${p.name} — Pricing, Features & Rating | Velixa Capital`,
    description: p.tagline,
    alternates: { canonical: `/software/${p.category}/${p.slug}` },
    openGraph: {
      title: `${p.name} — Velixa Capital`,
      description: p.tagline,
      url: `/software/${p.category}/${p.slug}`,
    },
  };
}

export default async function ProductRoute({ params }: { params: Promise<Params> }) {
  const { category, slug } = await params;
  const p = getProduct(slug);
  if (!p || p.category !== category) notFound();
  const headline = HEADLINES[p.slug] ?? `${p.name}: ${p.tagline}`;
  return <SoftwareProductPage p={p} headline={headline} />;
}
