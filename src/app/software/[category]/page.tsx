import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SoftwareCategoryPage } from "@/components/site/software-category-page";
import {
  SOFTWARE_CATEGORIES,
  type SoftwareCategorySlug,
} from "@/lib/software-data";

type Params = { category: string };

export function generateStaticParams(): Params[] {
  return SOFTWARE_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = SOFTWARE_CATEGORIES.find((c) => c.slug === category);
  if (!cat) return { title: "Category not found" };
  return {
    title: `${cat.label} Software — Compare Tools | Velixa Capital`,
    description: cat.longDescription,
    alternates: { canonical: `/software/${cat.slug}` },
    openGraph: {
      title: `${cat.label} Software — Velixa Capital`,
      description: cat.description,
      url: `/software/${cat.slug}`,
    },
  };
}

export default async function CategoryRoute({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const valid = SOFTWARE_CATEGORIES.some((c) => c.slug === category);
  if (!valid) notFound();
  return <SoftwareCategoryPage slug={category as SoftwareCategorySlug} />;
}
