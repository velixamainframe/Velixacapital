import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { LOANS, CREDIT_CARD_TYPES, TAX_ACCOUNTING, PROPERTY_SERVICES, itemSlug } from "@/lib/site-data";
import { GOVT_SCHEMES } from "@/lib/govt-schemes-data";
import { SOFTWARE_PRODUCTS, SOFTWARE_CATEGORIES } from "@/lib/software-data";
import {
  KNOWLEDGE_HUB,
  WHO_WE_HELP,
  LOAN_REJECTION,
  COMPARE,
} from "@/lib/knowledge-data";
import { listBlogs } from "@/lib/data";

type Freq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

type Entry = {
  url: string;
  lastModified?: Date;
  changeFrequency?: Freq;
  priority?: number;
};

const TODAY = new Date();

function entry(path: string, priority = 0.6, changeFrequency: Freq = "monthly"): Entry {
  return { url: `${SITE_URL}${path}`, lastModified: TODAY, changeFrequency, priority };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ----- Static public routes -----
  const staticRoutes: Entry[] = [
    entry("", 1.0, "weekly"), // home
    entry("/about", 0.6),
    entry("/contact", 0.7, "monthly"),
    entry("/locations", 0.6),
    entry("/partner-banks", 0.5),
    entry("/careers", 0.6, "weekly"),
    entry("/faq", 0.6),
    entry("/blog", 0.7, "weekly"),
    entry("/case-studies", 0.6),
    entry("/resources", 0.6),
    entry("/disclosures", 0.4),
    entry("/privacy", 0.4),
    entry("/cookie-policy", 0.4),
    entry("/it-act-declaration", 0.4),
    entry("/partner", 0.7, "monthly"),
    // eligibility is noindex,nofollow — intentionally EXCLUDED from sitemap.

    // Funding-readiness cluster (5)
    entry("/funding-readiness", 0.7),
    entry("/funding-readiness-assessment", 0.7),
    entry("/funding-eligibility-review", 0.7),
    entry("/business-funding-scorecard", 0.7),
    entry("/loan-readiness-checklist", 0.7),
    // Credit-structuring & finance-consulting (2)
    entry("/credit-structuring-method", 0.7),
    entry("/finance-consulting", 0.7),
    // Other advisory (8)
    entry("/no-itr-business-loan", 0.7),
    entry("/high-existing-emi", 0.7),
    entry("/bank-vs-nbfc-business-loan", 0.7),
    entry("/business-loan-vs-lap", 0.7),
    entry("/business-loan-vs-overdraft", 0.7),
    entry("/secured-vs-unsecured-business-loan", 0.7),
    // Loan advisory standalone (8)
    entry("/business-funding", 0.8),
    entry("/business-loan", 0.8),
    entry("/loan-against-property", 0.8),
    entry("/working-capital-finance", 0.8),
    entry("/business-overdraft", 0.8),
    entry("/cgtmse-funding", 0.8),
    entry("/machinery-finance", 0.8),
    entry("/commercial-vehicle-finance", 0.8),
    // Credit advisory standalone (5)
    entry("/credit-improvement", 0.7),
    entry("/credit-profile-improvement", 0.7),
    entry("/low-cibil-solutions", 0.7),
    entry("/settled-account-guidance", 0.7),
    entry("/high-cibil-enquiries", 0.7),
    // Tax & accounting standalone (8)
    entry("/tax-compliance", 0.7),
    entry("/accounting", 0.7),
    entry("/tax-finance", 0.7),
    entry("/business-accounting", 0.7),
    entry("/itr-advisory", 0.7),
    entry("/gst-advisory", 0.7),
    entry("/mis-reporting", 0.7),
    entry("/tax-planning-for-loan-eligibility", 0.7),
    // Property advisory standalone (5)
    entry("/property-finance", 0.7),
    entry("/property-funding", 0.7),
    entry("/lease-rental-discounting", 0.7),
    entry("/commercial-property-finance", 0.7),
    entry("/property-investment-advisory", 0.7),
    // Hubs
    entry("/software", 0.7),
    entry("/software/compare", 0.6),
    entry("/loans", 0.9, "weekly"),
    entry("/loans/govt-schemes", 0.7),
    entry("/credit-cards", 0.8),
    entry("/tax-accounting", 0.8),
    entry("/property-consulting", 0.7),
    entry("/knowledge-hub", 0.8),
    entry("/who-we-help", 0.7),
    entry("/loan-rejection", 0.7),
    entry("/compare", 0.7),
  ];

  // ----- Dynamic loan routes -----
  const loanRoutes: Entry[] = LOANS.map((l) => entry(`/loans/${l.slug}`, 0.8, "monthly"));

  // ----- Govt schemes -----
  const govtRoutes: Entry[] = GOVT_SCHEMES.map((g) => entry(`/loans/govt-schemes/${g.slug}`, 0.6));

  // ----- Credit card types -----
  const cardRoutes: Entry[] = CREDIT_CARD_TYPES.map((c) => entry(`/credit-cards/${c.slug}`, 0.7));

  // ----- Tax & accounting services -----
  const taxRoutes: Entry[] = TAX_ACCOUNTING.items.map((it) =>
    entry(`/tax-accounting/${itemSlug(it)}`, 0.7),
  );

  // ----- Property services -----
  const propertyRoutes: Entry[] = PROPERTY_SERVICES.items.map((it) =>
    entry(`/property-consulting/${itemSlug(it)}`, 0.6),
  );

  // ----- Knowledge hub -----
  const knowledgeRoutes: Entry[] = KNOWLEDGE_HUB.map((k) => entry(`/knowledge-hub/${k.slug}`, 0.6));

  // ----- Who we help -----
  const whoRoutes: Entry[] = WHO_WE_HELP.map((w) => entry(`/who-we-help/${w.slug}`, 0.6));

  // ----- Loan rejection -----
  const rejectionRoutes: Entry[] = LOAN_REJECTION.map((r) => entry(`/loan-rejection/${r.slug}`, 0.6));

  // ----- Compare -----
  const compareRoutes: Entry[] = COMPARE.map((c) => entry(`/compare/${c.slug}`, 0.6));

  // ----- Software: categories + products -----
  const softwareCategoryRoutes: Entry[] = SOFTWARE_CATEGORIES.map((c) =>
    entry(`/software/${c.slug}`, 0.6),
  );
  const softwareProductRoutes: Entry[] = SOFTWARE_PRODUCTS.map((p) =>
    entry(`/software/${p.category}/${p.slug}`, 0.6),
  );

  // ----- Tier-1 city routes (kept lean — only tier-1 city×loan combos) -----
  // Skipped tier 2 & 3 to keep the sitemap reasonable. Search engines still
  // discover them via in-page links on /loans/[slug] and /locations.
  const TIER1_SLUGS = [
    "mumbai", "delhi", "bengaluru", "hyderabad", "chennai",
    "kolkata", "pune", "ahmedabad",
  ];
  const cityRoutes: Entry[] = LOANS.flatMap((l) =>
    TIER1_SLUGS.map((c) => entry(`/loans/${l.slug}/${c}`, 0.5)),
  );

  // ----- Blog posts -----
  let blogRoutes: Entry[] = [];
  try {
    const posts = await listBlogs();
    blogRoutes = posts.map((p) =>
      entry(`/blog/${p.slug}`, 0.6, p.publishedAt ? "monthly" : "yearly"),
    );
  } catch {
    // If DB is unavailable at build time, skip blog routes.
    blogRoutes = [];
  }

  return [
    ...staticRoutes,
    ...loanRoutes,
    ...govtRoutes,
    ...cardRoutes,
    ...taxRoutes,
    ...propertyRoutes,
    ...knowledgeRoutes,
    ...whoRoutes,
    ...rejectionRoutes,
    ...compareRoutes,
    ...softwareCategoryRoutes,
    ...softwareProductRoutes,
    ...cityRoutes,
    ...blogRoutes,
  ];
}
