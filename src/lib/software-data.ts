// Central affiliate link registry — swap URLs here without touching pages.
// All outbound buttons MUST use rel="noopener noreferrer sponsored" target="_blank".

export type SoftwareCategorySlug =
  | "tax-compliance"
  | "accounting"
  | "crm"
  | "project-management";

export type SoftwareProduct = {
  slug: string;
  name: string;
  vendor: string;
  category: SoftwareCategorySlug;
  categoryLabel: string;
  tagline: string;
  logoText: string; // 2-3 char monogram for logo tile
  logoColor: string; // hex
  rating: number; // 0-5
  reviewCount: number;
  pricingModel: string;
  startingPrice: string;
  deployment: "Cloud" | "Desktop" | "Cloud + Desktop";
  countryFocus: "India" | "Global" | "India + Global";
  freeTrial: boolean;
  primaryUseCase: string;
  mobileRating: string;
  supportQuality: string;
  keyIntegrations: string[];
  topFeatures: string[]; // top 3 bullets for cards
  fullFeatures: string[];
  pros: string[];
  cons: string[];
  bestFor: string[];
  ctaLabel: string;
  affiliateUrl: string;
};

export type SoftwareCategory = {
  slug: SoftwareCategorySlug;
  label: string;
  description: string;
  longDescription: string;
};

export const SOFTWARE_CATEGORIES: SoftwareCategory[] = [
  {
    slug: "tax-compliance",
    label: "Tax & Filing",
    description: "GST, e-invoicing, ITR automation for Indian SMEs and CA firms.",
    longDescription:
      "Compliance-grade platforms for GST returns, e-invoicing, TDS, and income-tax filing. Built to keep multi-GSTIN businesses audit-ready and to remove the manual reconciliation that slows finance teams in India.",
  },
  {
    slug: "accounting",
    label: "Accounting & ERP",
    description: "Books, inventory, payroll, and multi-currency accounting.",
    longDescription:
      "End-to-end accounting suites — from on-premise GST-heavy stacks like Tally to cloud-first books like Zoho and global multi-currency systems like QuickBooks Online.",
  },
  {
    slug: "crm",
    label: "Customer Relationship Management",
    description: "Sales pipelines, marketing automation, and customer service.",
    longDescription:
      "Modern CRMs that unify lead capture, pipeline tracking, marketing automation, and post-sale support so revenue teams stop juggling spreadsheets.",
  },
  {
    slug: "project-management",
    label: "Team Collaboration",
    description: "Visual workflows, task tracking, and team productivity.",
    longDescription:
      "Flexible work-OS platforms that replace fragmented stacks of docs, sheets, and chat with one operational workspace for cross-functional teams.",
  },
];

export const SOFTWARE_PRODUCTS: SoftwareProduct[] = [
  {
    slug: "cleartax",
    name: "ClearTax",
    vendor: "Clear (Defmacro Software)",
    category: "tax-compliance",
    categoryLabel: "Tax & Filing",
    tagline:
      "Automated ITR, GST, and E-Invoicing compliance trusted by 6,000+ Indian enterprises.",
    logoText: "CT",
    logoColor: "#1B7CFF",
    rating: 4.6,
    reviewCount: 4820,
    pricingModel: "Subscription + per-return",
    startingPrice: "Free ITR-1 / Paid GST suite from ₹3,999/yr",
    deployment: "Cloud",
    countryFocus: "India",
    freeTrial: true,
    primaryUseCase: "GST returns, e-invoicing, ITR filing automation",
    mobileRating: "4.4★ (Play Store)",
    supportQuality: "Email, chat, dedicated CSM on Enterprise",
    keyIntegrations: ["Tally", "Zoho Books", "SAP", "Oracle", "Excel"],
    topFeatures: [
      "Auto GSTR-2B reconciliation with 100% ITC match",
      "Bulk e-invoice & e-way bill generation",
      "ITR-1 to ITR-7 filing with auto-import",
    ],
    fullFeatures: [
      "Multi-GSTIN dashboard for groups & holding companies",
      "Vendor compliance scoring before payment release",
      "Automated GSTR-1, 3B, 9 and 9C filings",
      "TDS return preparation and challan generation",
      "Salaried-taxpayer ITR with auto Form-16 import",
      "Audit trail and maker-checker workflows",
    ],
    pros: [
      "Deepest GST automation in the Indian market",
      "Used by Big-4 audit firms and listed groups",
      "Strong API for ERP-to-GSTN data push",
    ],
    cons: [
      "Enterprise pricing requires sales conversation",
      "Advanced ITC matching needs onboarding support",
    ],
    bestFor: [
      "CA firms managing multi-client GST portfolios",
      "SMEs with monthly e-invoicing obligations",
      "Enterprise finance teams running multi-GSTIN ops",
    ],
    ctaLabel: "File Your Taxes & Automate GST with ClearTax",
    affiliateUrl: "https://cleartax.in/?ref=velixa",
  },
  {
    slug: "tally",
    name: "Tally Prime",
    vendor: "Tally Solutions",
    category: "accounting",
    categoryLabel: "Accounting & ERP",
    tagline:
      "India's most-trusted GST + inventory accounting stack for MSMEs and distributors.",
    logoText: "TP",
    logoColor: "#D52027",
    rating: 4.5,
    reviewCount: 9100,
    pricingModel: "One-time licence + annual renewal",
    startingPrice: "₹22,500 one-time (Silver)",
    deployment: "Desktop",
    countryFocus: "India",
    freeTrial: true,
    primaryUseCase: "GST-compliant books, inventory & payables for MSMEs",
    mobileRating: "4.2★ (TallyPrime app)",
    supportQuality: "Partner network across 200+ Indian cities",
    keyIntegrations: ["ClearTax", "Razorpay", "Excel", "Bank statements"],
    topFeatures: [
      "GST-ready invoicing, e-way bills, and e-invoicing",
      "Multi-godown inventory with batch & expiry",
      "Receivables & payables ageing with reminders",
    ],
    fullFeatures: [
      "Multi-company, multi-currency books",
      "Cost centres and budgeting",
      "Bank reconciliation with auto-import",
      "Payroll with statutory compliance",
      "Audit-ready financial statements",
    ],
    pros: [
      "Massive ecosystem of CAs and partners",
      "Battle-tested for GST and inventory edge cases",
      "Low TCO once licence is purchased",
    ],
    cons: [
      "Desktop-first — remote access needs Tally on Cloud",
      "UI is functional, not modern",
    ],
    bestFor: [
      "Distributors and traders with heavy inventory",
      "MSMEs whose CA already uses Tally",
      "Manufacturers needing batch + costing",
    ],
    ctaLabel: "Get Tally Prime — Start Free Trial",
    affiliateUrl: "https://tallysolutions.com/?ref=velixa",
  },
  {
    slug: "zoho",
    name: "Zoho Books",
    vendor: "Zoho Corporation",
    category: "accounting",
    categoryLabel: "Accounting & ERP",
    tagline:
      "Cloud accounting built for Indian tech startups and automated finance workflows.",
    logoText: "ZB",
    logoColor: "#E42528",
    rating: 4.7,
    reviewCount: 6450,
    pricingModel: "SaaS subscription (per org)",
    startingPrice: "Free up to ₹25L turnover / Paid from ₹749/mo",
    deployment: "Cloud",
    countryFocus: "India + Global",
    freeTrial: true,
    primaryUseCase: "Cloud books with automation, GST, and bank feeds",
    mobileRating: "4.6★ (iOS & Android)",
    supportQuality: "24×5 email & chat, phone on Premium+",
    keyIntegrations: ["Zoho CRM", "Razorpay", "Stripe", "Shopify", "Slack"],
    topFeatures: [
      "Bank feeds with automated reconciliation",
      "Workflow rules & approval chains",
      "GST returns, e-invoicing, and e-way bills",
    ],
    fullFeatures: [
      "Recurring invoices and payment links",
      "Project-based time tracking and billing",
      "Multi-currency and multi-branch accounting",
      "Vendor portal and purchase approvals",
      "Deep integration across the Zoho One suite",
    ],
    pros: [
      "Best-in-class cloud UX for finance teams",
      "Strong free tier for early-stage startups",
      "Automation rules reduce manual data entry",
    ],
    cons: [
      "Inventory module lighter than Tally",
      "Advanced features locked to higher tiers",
    ],
    bestFor: [
      "Tech startups and D2C brands",
      "Service businesses billing across geographies",
      "Founders who want books accessible from anywhere",
    ],
    ctaLabel: "Try Zoho Books Free for 14 Days",
    affiliateUrl: "https://www.zoho.com/books/?ref=velixa",
  },
  {
    slug: "quickbooks",
    name: "QuickBooks Online",
    vendor: "Intuit",
    category: "accounting",
    categoryLabel: "Accounting & ERP",
    tagline:
      "Global multi-currency accounting for scaling businesses and cross-border teams.",
    logoText: "QB",
    logoColor: "#2CA01C",
    rating: 4.5,
    reviewCount: 18750,
    pricingModel: "SaaS subscription (per user)",
    startingPrice: "From $30/mo (Essentials)",
    deployment: "Cloud",
    countryFocus: "Global",
    freeTrial: true,
    primaryUseCase: "Multi-currency books for global SMBs",
    mobileRating: "4.7★ (iOS & Android)",
    supportQuality: "24/7 chat, callback on higher plans",
    keyIntegrations: ["Stripe", "PayPal", "Shopify", "HubSpot", "Gusto"],
    topFeatures: [
      "Multi-currency books with live FX rates",
      "650+ app marketplace integrations",
      "AI-assisted categorisation and forecasting",
    ],
    fullFeatures: [
      "Project profitability tracking",
      "Class and location-based reporting",
      "1099/contractor payment workflows",
      "Cash-flow planner with scenario modelling",
      "Receipt capture via mobile",
    ],
    pros: [
      "Strong global accountant ecosystem",
      "Powerful reporting and consolidation",
      "Mature ecosystem of integrations",
    ],
    cons: [
      "Indian GST handling weaker than local tools",
      "Pricing scales fast with seats",
    ],
    bestFor: [
      "Cross-border SaaS and e-commerce brands",
      "US/UK subsidiaries of Indian groups",
      "CFOs consolidating global entities",
    ],
    ctaLabel: "Start QuickBooks Online Free Trial",
    affiliateUrl: "https://quickbooks.intuit.com/?ref=velixa",
  },
  {
    slug: "hubspot",
    name: "HubSpot",
    vendor: "HubSpot, Inc.",
    category: "crm",
    categoryLabel: "CRM",
    tagline:
      "All-in-one sales, marketing, and service automation stack for scaling revenue teams.",
    logoText: "HS",
    logoColor: "#FF7A59",
    rating: 4.6,
    reviewCount: 22150,
    pricingModel: "Freemium + Hub-based subscriptions",
    startingPrice: "Free forever / Paid from $20/mo per seat",
    deployment: "Cloud",
    countryFocus: "Global",
    freeTrial: true,
    primaryUseCase: "Unified marketing + sales + service automation",
    mobileRating: "4.7★ (iOS & Android)",
    supportQuality: "Email free; chat & phone on paid tiers",
    keyIntegrations: ["Gmail", "Outlook", "Slack", "Zoom", "Shopify"],
    topFeatures: [
      "Free CRM with unlimited contacts",
      "Marketing automation with visual workflows",
      "Service desk + knowledge base in one stack",
    ],
    fullFeatures: [
      "Sequences and meeting links for sales reps",
      "Lifecycle stages and lead scoring",
      "Landing pages, forms, and email campaigns",
      "Conversation routing across email, chat, WhatsApp",
      "Revenue attribution reporting",
    ],
    pros: [
      "Best free tier on the market",
      "Seamless across marketing, sales, and service",
      "Huge academy and certification ecosystem",
    ],
    cons: [
      "Paid Hubs add up quickly at scale",
      "Contact-based pricing can surprise marketers",
    ],
    bestFor: [
      "B2B SaaS scaling revenue ops",
      "Marketing teams running content + nurture",
      "Founder-led sales teams graduating from spreadsheets",
    ],
    ctaLabel: "Start with HubSpot Free CRM",
    affiliateUrl: "https://www.hubspot.com/?ref=velixa",
  },
  {
    slug: "freshsales",
    name: "Freshsales",
    vendor: "Freshworks",
    category: "crm",
    categoryLabel: "CRM",
    tagline:
      "Affordable, AI-powered sales CRM built for fast-growing Indian sales pipelines.",
    logoText: "FS",
    logoColor: "#1F8FFF",
    rating: 4.5,
    reviewCount: 8740,
    pricingModel: "SaaS subscription (per seat)",
    startingPrice: "Free / Paid from ₹749/seat/mo",
    deployment: "Cloud",
    countryFocus: "India + Global",
    freeTrial: true,
    primaryUseCase: "AI-assisted sales pipeline for high-velocity teams",
    mobileRating: "4.5★ (iOS & Android)",
    supportQuality: "24×5 email, chat, phone",
    keyIntegrations: ["Freshdesk", "Slack", "Gmail", "Razorpay", "Zapier"],
    topFeatures: [
      "Freddy AI deal insights and next-best-action",
      "Built-in caller, email, and WhatsApp",
      "Visual sales pipeline with custom stages",
    ],
    fullFeatures: [
      "Lead scoring with behavioural signals",
      "Workflow automation across deals & contacts",
      "Custom modules for B2B and B2C",
      "Native chat campaigns and chatbots",
      "Forecast and territory management",
    ],
    pros: [
      "Strong India-first pricing in INR",
      "Tight integration with Freshworks suite",
      "Fast to onboard small sales teams",
    ],
    cons: [
      "Marketing automation lighter than HubSpot",
      "Reporting depth limited on lower tiers",
    ],
    bestFor: [
      "Indian SMBs running outbound + inbound pipelines",
      "Teams needing built-in dialler",
      "Companies already on Freshdesk",
    ],
    ctaLabel: "Try Freshsales Free for 21 Days",
    affiliateUrl: "https://www.freshworks.com/crm/sales/?ref=velixa",
  },
  {
    slug: "monday",
    name: "Monday.com",
    vendor: "monday.com Ltd.",
    category: "project-management",
    categoryLabel: "Project Management",
    tagline:
      "Highly visual drag-and-drop work-OS for operations managers and cross-functional teams.",
    logoText: "MO",
    logoColor: "#FF3D57",
    rating: 4.7,
    reviewCount: 16200,
    pricingModel: "SaaS subscription (per seat, 3-seat minimum)",
    startingPrice: "Free up to 2 seats / Paid from $9/seat/mo",
    deployment: "Cloud",
    countryFocus: "Global",
    freeTrial: true,
    primaryUseCase: "Visual workflow tracking and cross-team operations",
    mobileRating: "4.6★ (iOS & Android)",
    supportQuality: "24/7 email + priority support on Pro/Enterprise",
    keyIntegrations: ["Slack", "Google Workspace", "Outlook", "Zoom", "Jira"],
    topFeatures: [
      "Drag-and-drop boards with 30+ column types",
      "Automations that replace manual hand-offs",
      "Dashboards aggregating data across boards",
    ],
    fullFeatures: [
      "Gantt, timeline, calendar, and kanban views",
      "Workdocs for collaborative briefs",
      "Forms to capture intake from external teams",
      "Workload view for capacity planning",
      "Time tracking and budget columns",
    ],
    pros: [
      "Industry-leading visual UX",
      "Easy for non-technical operators to configure",
      "Strong template gallery for fast setup",
    ],
    cons: [
      "3-seat minimum makes solo plans expensive",
      "Advanced automations gated to higher tiers",
    ],
    bestFor: [
      "Operations and marketing teams",
      "Agencies tracking client deliverables",
      "Cross-functional launch programmes",
    ],
    ctaLabel: "Try Monday.com Free Today",
    affiliateUrl: "https://monday.com/?ref=velixa",
  },
  {
    slug: "clickup",
    name: "ClickUp",
    vendor: "ClickUp",
    category: "project-management",
    categoryLabel: "Project Management",
    tagline:
      "Customisable agile workspace built to replace overlapping SaaS subscriptions.",
    logoText: "CU",
    logoColor: "#7B68EE",
    rating: 4.6,
    reviewCount: 14380,
    pricingModel: "Freemium + SaaS subscription",
    startingPrice: "Free forever / Paid from $7/seat/mo",
    deployment: "Cloud",
    countryFocus: "Global",
    freeTrial: true,
    primaryUseCase: "All-in-one workspace: tasks, docs, goals, chat",
    mobileRating: "4.5★ (iOS & Android)",
    supportQuality: "24/7 chat across all paid plans",
    keyIntegrations: ["Slack", "GitHub", "Figma", "HubSpot", "Zoom"],
    topFeatures: [
      "15+ task views including list, board, gantt",
      "Native docs, whiteboards, and chat",
      "Goals & OKRs tied directly to tasks",
    ],
    fullFeatures: [
      "Custom fields and statuses per workspace",
      "Automations and recurring tasks",
      "Time tracking and timesheet reports",
      "AI assistant for summaries and updates",
      "Sprints, backlogs, and velocity reporting",
    ],
    pros: [
      "Replaces docs + tasks + chat in one tool",
      "Generous free tier",
      "Deep customisation per team",
    ],
    cons: [
      "Sheer feature surface area has a learning curve",
      "Occasional UI lag on very large workspaces",
    ],
    bestFor: [
      "Engineering and product teams",
      "Startups consolidating tooling spend",
      "Agencies running many parallel projects",
    ],
    ctaLabel: "Get ClickUp Free Forever",
    affiliateUrl: "https://clickup.com/?ref=velixa",
  },
];

export function getProduct(slug: string): SoftwareProduct | undefined {
  return SOFTWARE_PRODUCTS.find((p) => p.slug === slug);
}

export function productsByCategory(slug: SoftwareCategorySlug): SoftwareProduct[] {
  return SOFTWARE_PRODUCTS.filter((p) => p.category === slug);
}

export function getCategory(slug: SoftwareCategorySlug): SoftwareCategory | undefined {
  return SOFTWARE_CATEGORIES.find((c) => c.slug === slug);
}

// SEO disclosure text used across all software pages
export const AFFILIATE_DISCLOSURE =
  "Transparency Note: Some links on this page are affiliate links. Clicking them helps support Velixa Capital via a small commission — at zero extra cost to you. We only recommend tools we have evaluated against real client workflows.";