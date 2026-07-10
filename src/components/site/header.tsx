"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { CONTACT } from "@/lib/site-data";

type NavLeaf = { to: string; label: string };
type NavGroup = { label: string; to?: string; children: NavLeaf[] };

const NAV: NavGroup[] = [
  {
    label: "Funding Readiness",
    to: "/funding-readiness",
    children: [
      { to: "/funding-readiness", label: "Overview" },
      { to: "/funding-readiness-assessment", label: "Readiness Assessment" },
      { to: "/funding-eligibility-review", label: "Eligibility Review" },
      { to: "/business-funding-scorecard", label: "Funding Scorecard" },
      { to: "/loan-readiness-checklist", label: "Readiness Checklist" },
    ],
  },
  {
    label: "Business Funding",
    to: "/loans",
    children: [
      { to: "/loans", label: "All Loan Products" },
      { to: "/business-funding", label: "Funding Advisory" },
      { to: "/business-loan", label: "Business Loans" },
      { to: "/loan-against-property", label: "Loan Against Property" },
      { to: "/working-capital-finance", label: "Working Capital" },
      { to: "/business-overdraft", label: "Business Overdraft" },
      { to: "/cgtmse-funding", label: "CGTMSE Funding" },
      { to: "/machinery-finance", label: "Machinery Finance" },
      { to: "/commercial-vehicle-finance", label: "Commercial Vehicle" },
      { to: "/loans/govt-schemes", label: "Govt. Schemes" },
    ],
  },
  {
    label: "Credit",
    to: "/credit-cards",
    children: [
      { to: "/credit-cards", label: "Credit Cards" },
      { to: "/credit-card-eligibility", label: "Card Eligibility" },
      { to: "/credit-improvement", label: "Credit Improvement" },
      { to: "/credit-profile-improvement", label: "Credit Profile" },
      { to: "/low-cibil-solutions", label: "Low CIBIL Solutions" },
      { to: "/settled-account-guidance", label: "Settled Accounts" },
      { to: "/high-cibil-enquiries", label: "High Enquiries" },
    ],
  },
  {
    label: "Tax & Accounting",
    to: "/tax-accounting",
    children: [
      { to: "/tax-accounting", label: "Tax & Accounting Hub" },
      { to: "/tax-compliance", label: "Tax & Compliance" },
      { to: "/accounting", label: "Accounting" },
      { to: "/tax-finance", label: "Tax & Finance Advisory" },
      { to: "/business-accounting", label: "Business Accounting" },
      { to: "/itr-advisory", label: "ITR Advisory" },
      { to: "/gst-advisory", label: "GST Advisory" },
      { to: "/mis-reporting", label: "MIS Reporting" },
      { to: "/tax-planning-for-loan-eligibility", label: "Tax Planning for Loans" },
    ],
  },
  {
    label: "Property Advisory",
    to: "/property-consulting",
    children: [
      { to: "/property-consulting", label: "Property Consulting" },
      { to: "/property-finance", label: "Property Finance" },
      { to: "/property-funding", label: "Property Funding" },
      { to: "/lease-rental-discounting", label: "Lease Rental Discounting" },
      { to: "/commercial-property-finance", label: "Commercial Property" },
      { to: "/property-investment-advisory", label: "Investment Advisory" },
    ],
  },
  {
    label: "Knowledge",
    to: "/knowledge-hub",
    children: [
      { to: "/knowledge-hub", label: "Knowledge Hub" },
      { to: "/blog", label: "Blog" },
      { to: "/case-studies", label: "Case Studies" },
      { to: "/loan-rejection", label: "Loan Rejection Library" },
      { to: "/compare", label: "Comparisons" },
      { to: "/who-we-help", label: "Who We Help" },
      { to: "/faq", label: "FAQ" },
      { to: "/disclosures", label: "Disclosures" },
      { to: "/eligibility", label: "Eligibility Tools" },
      { to: "/partner", label: "Become a Partner" },
      { to: "/about", label: "About Us" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    label: "Software",
    to: "/software",
    children: [
      { to: "/software", label: "Marketplace Hub" },
      { to: "/software/tax-compliance", label: "Tax & Filing" },
      { to: "/software/accounting", label: "Accounting & ERP" },
      { to: "/software/crm", label: "CRM" },
      { to: "/software/project-management", label: "Project Management" },
      { to: "/software/compare", label: "Compare Tools" },
    ],
  },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-edge flex h-16 items-center justify-between gap-2 sm:gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Velixa Capital">
          <img src="/favicon.svg" alt="Velixa Capital" width={40} height={40} className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10" />
          <span className="font-display text-sm sm:text-base lg:text-lg font-bold tracking-tight text-foreground whitespace-nowrap">Velixa Capital</span>
        </Link>

        {/* Desktop nav — only show on xl+ screens (1200px+) to avoid overflow */}
        <nav className="hidden items-center gap-0.5 xl:flex">
          {NAV.map((g) => {
            const active = g.to && pathname === g.to;
            return (
              <div
                key={g.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(g.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <Link
                  href={g.to || "#"}
                  className={`flex items-center gap-0.5 px-2 py-2 text-[12px] font-semibold whitespace-nowrap transition-colors hover:text-primary ${active ? "text-primary" : "text-foreground/85"}`}
                >
                  {g.label}<ChevronDown className="h-3 w-3" />
                </Link>
                {openGroup === g.label && (
                  <div className="absolute left-0 top-full min-w-[230px] rounded-md border border-border/60 bg-background shadow-lg p-1">
                    {g.children.map((c) => (
                      <Link
                        key={c.to}
                        href={c.to}
                        className={`block rounded px-3 py-2 text-[13px] hover:bg-muted hover:text-primary ${pathname === c.to ? "text-primary" : "text-foreground/85"}`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right-side actions — only show on lg+ screens */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <a href={`tel:${CONTACT.phoneRaw}`} className="hidden xl:flex items-center gap-1.5 text-[12px] text-foreground/80 hover:text-foreground whitespace-nowrap">
            <Phone className="h-3.5 w-3.5" /> {CONTACT.phone}
          </a>
          <Link href="/contact" className="btn-gold text-[12px] px-4 py-2 whitespace-nowrap">Free Consultation</Link>
        </div>

        {/* Mobile/tablet menu button — visible below xl */}
        <button className="xl:hidden p-2 -mr-2" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile/tablet menu — slides in below xl (1200px) */}
      {open && (
        <div className="border-t border-border/60 bg-background xl:hidden max-h-[calc(100vh-4rem)] overflow-y-auto scroll-thin">
          <div className="container-edge flex flex-col gap-1 py-3">
            {/* Quick CTA bar at top of mobile menu */}
            <div className="flex flex-col gap-2 pb-3 mb-1 border-b border-border/40">
              <a href={`tel:${CONTACT.phoneRaw}`} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
                <Phone className="h-4 w-4 text-gold" /> {CONTACT.phone}
              </a>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-gold text-sm">Free Consultation</Link>
            </div>
            {NAV.map((g) => (
              <div key={g.label} className="border-b border-border/40 pb-2 mb-1">
                <div className="px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">{g.label}</div>
                {g.children.map((c) => (
                  <Link
                    key={c.to}
                    href={c.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-1.5 text-sm hover:bg-muted"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
