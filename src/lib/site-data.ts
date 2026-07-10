export type LoanService = {
  slug: string;
  name: string;
  short: string;
  headline: string;
  description: string;
  features: string[];
  eligibility: string[];
  documents: string[];
  fees: string;
  maxRate: number;
  defaultRate: number;
  rateMark?: string;
  seoKeywords: string[];
  image: string;
};

// Loan images (eager-loaded refs so TS sees them)


const LOAN_IMG: Record<string, string> = {
  "personal-loan": "/loans/personal-loan.jpg",
  "business-loan": "/loans/business-loan.jpg",
  "home-loan": "/loans/home-loan.jpg",
  "loan-against-property": "/loans/loan-against-property.jpg",
  "overdraft-facility": "/loans/overdraft-facility.jpg",
  "salary-overdraft": "/loans/salary-overdraft.jpg",
  "business-overdraft": "/loans/business-overdraft.jpg",
  "term-loan": "/loans/term-loan.jpg",
  "commercial-equipment-loan": "/loans/commercial-equipment-loan.jpg",
  "commercial-vehicle-loan": "/loans/commercial-vehicle-loan.jpg",
  "equipment-machinery-loan": "/loans/equipment-machinery-loan.jpg",
  "used-auto-loan": "/loans/used-auto-loan.jpg",
  "balance-transfer": "/loans/balance-transfer.jpg",
  "refinance": "/loans/refinance.jpg",
};

export const LOANS: LoanService[] = [
  {
    slug: "personal-loan",
    name: "Personal Loan",
    short: "Unsecured funds for personal needs — rates starting from 9.9%* p.a. onwards, disbursed in 24–72 hours.",
    headline: "Instant Personal Loans — rates starting from 9.9%* p.a. onwards",
    description:
      "Meet immediate financial requirements without pledging any asset. Medical emergency, wedding, home renovation, or vacation — we arrange unsecured loans from top lenders at competitive rates starting from 9.9%* p.a. onwards.",
    features: ["Rates starting from 9.9%* p.a. onwards", "Zero collateral", "Minimum documentation", "Disbursement within 24–72 hours", "Tenure 12–60 months", "Loan up to ₹40 lakh"],
    eligibility: ["Age 21–60 years", "Salaried with min ₹12,000/month OR self-employed with 2+ yrs ITR", "CIBIL score 700+ preferred", "Indian citizen, resident in India"],
    documents: ["PAN & Aadhaar", "Last 3 months salary slips (salaried)", "Last 6 months bank statement", "Form 16 / latest ITR", "Address proof"],
    fees: "Processing fee 1–3%* of loan amount, GST extra. Pre-payment 0–5%*.",
    maxRate: 24, defaultRate: 9.9, rateMark: "*",
    seoKeywords: ["personal loan", "instant personal loan", "online personal loan", "unsecured loan", "personal loan low interest"],
  },
  {
    slug: "business-loan",
    name: "Business Loan",
    short: "Collateral-free MSME funding up to ₹1 Cr* — rates ranging from 8.00%* to 30.00%* p.a.",
    headline: "Collateral-Free Business Loans to Fuel Growth",
    description:
      "Scale business operations without risking personal assets. Quick unsecured business and MSME funding for working capital, inventory, or expansion. Rates ranging from 8.00%* to 30.00%* p.a. depending on lender selection (SBI, PNB, HDFC, Axis, or Fintech NBFCs).",
    features: ["Rates ranging from 8.00%* to 30.00%* p.a.", "No collateral required", "Flexible tenures up to 5 years", "Loan up to ₹1 Crore*", "Top-up facility available"],
    eligibility: ["Business vintage 2+ years", "Minimum annual turnover ₹40 lakh", "Profitable for last 1 year", "Clean banking with no bounces"],
    documents: ["KYC of all promoters", "2–3 years ITR with computation", "12 months bank statement (all current a/c)", "12 months GST returns", "Business proof — Udyam / GST / Shop Act"],
    fees: "Processing fee 1.5–3%*. Stamp duty as per state. No prepayment charge after 12 EMIs (most lenders).",
    maxRate: 30, defaultRate: 8,
    seoKeywords: ["business loan", "msme loan", "unsecured business loan", "working capital loan", "small business loan india"],
  },
  {
    slug: "home-loan",
    name: "Home Loan",
    short: "Buy, build or renovate your home — rates starting from 8.35%* p.a. onwards.",
    headline: "Affordable Home Loans — rates starting from 8.35%* p.a. onwards",
    description:
      "Make your dream home a reality with competitive home-loan rates from India's top banks and HFCs. Purchase, construction, plot + construction, renovation, or balance transfer — we match you with the right lender, lock the best rate and handle the entire paperwork. Rates starting from 8.35%* p.a. onwards.",
    features: ["Rates starting from 8.35%* p.a. onwards", "Tenure up to 30 years", "Loan up to ₹10 Crore*", "LTV up to 90%* of property value", "PMAY subsidy guidance"],
    eligibility: ["Age 21–65 (loan to mature by 70)", "Salaried with min ₹25,000/month OR self-employed with 3 yrs ITR", "CIBIL score 700+ preferred", "Clear, marketable property title"],
    documents: ["PAN & Aadhaar of all applicants", "Last 3 months salary slips / 3 yrs ITR", "6 months bank statement", "Property documents — sale deed, agreement, EC, approved plan", "Builder NOC / OC where applicable"],
    fees: "Processing fee 0.25–1%*. Legal & valuation actuals. Stamp duty as per state. Nil prepayment on floating-rate home loans.",
    maxRate: 12, defaultRate: 8.35, rateMark: "*",
    seoKeywords: ["home loan", "home loan low interest", "housing loan", "home loan 8.35%", "best home loan india", "PMAY home loan", "home loan balance transfer"],
  },
  {
    slug: "loan-against-property",
    name: "Loan Against Property",
    short: "Unlock liquidity from residential or commercial property.",
    headline: "Unlock the Hidden Value of Your Property",
    description:
      "Leverage residential, commercial, or industrial property for high-value, low-interest funding. One of the most cost-effective solutions for long-term expansion, education, or debt consolidation — while your property stays with you.",
    features: ["Interest 9%–14% p.a.", "Tenure up to 20 years", "LTV up to 70% of property value", "No end-use restriction"],
    eligibility: ["Clear, marketable title", "Self-occupied or rented property", "Age 25–65", "Income proof to support EMI"],
    documents: ["30-year title chain", "Sale deed / mother deed", "Latest property tax & EC", "3 years ITR / salary slips", "KYC of all owners"],
    fees: "Processing fee 0.5–1.5%. Legal & valuation actuals. Stamp duty on equitable mortgage as per state.",
    maxRate: 14, defaultRate: 9.5,
    seoKeywords: ["loan against property", "LAP loan", "mortgage loan", "property loan low interest", "commercial property loan"],
  },
  {
    slug: "overdraft-facility",
    name: "Overdraft (OD) Facility",
    short: "Dynamic credit line — pay interest only on utilization.",
    headline: "Flexible Overdraft Facilities for Smart Cash Flow",
    description: "A dynamic credit line where interest is charged only on the amount you use — not the total sanctioned limit. Setup against FDs, shares, or property for short-term needs.",
    features: ["Interest only on utilized amount", "Annual renewal", "No fixed EMI", "Setup against FD / property / shares"],
    eligibility: ["Eligible collateral OR strong banking", "Existing customer preferred", "Age 21–65"],
    documents: ["KYC", "Collateral documents (FD receipt / DP holding / property docs)", "Bank statement of last 6 months"],
    fees: "Setup fee 0.25–1%. Renewal fee annual. Interest only on drawn amount.",
    maxRate: 14, defaultRate: 10,
    seoKeywords: ["overdraft facility", "OD loan", "credit line", "overdraft against FD", "overdraft against property"],
  },
  {
    slug: "salary-overdraft",
    name: "Salary Overdraft",
    short: "Instant credit line up to 3X monthly salary.",
    headline: "Instant Salary Overdraft Before Payday",
    description: "Manage emergency expenses with an instant salary OD that auto-adjusts when your salary credits.",
    features: ["Limit up to 3X monthly salary", "Instant digital activation", "Interest only on usage", "Auto-repayment on salary credit"],
    eligibility: ["Salary account holder", "Min salary ₹25,000/month", "6+ months with current employer"],
    documents: ["Salary account KYC (already on file)", "PAN & Aadhaar"],
    fees: "Setup fee ₹500–2,000. Interest 13–18% p.a. on utilized amount.",
    maxRate: 24, defaultRate: 13,
    seoKeywords: ["salary overdraft", "salary OD", "instant salary loan", "advance salary loan", "personal credit line"],
  },
  {
    slug: "business-overdraft",
    name: "Business Overdraft",
    short: "OD limits sized to your turnover & banking history.",
    headline: "Business Overdraft Limits for Smooth Operations",
    description: "Built for retailers, traders, and manufacturers to manage operational expenses without interrupting growth.",
    features: ["Secured / unsecured OD", "Limit sized to turnover", "Easy annual renewal", "Interest only on usage"],
    eligibility: ["Business vintage 2+ years", "Annual turnover ₹50 lakh+", "Clean banking & GST filings"],
    documents: ["2 years ITR", "12 months bank & GST", "Business proof", "Collateral (if secured)"],
    fees: "Processing 1–2%, renewal annual.",
    maxRate: 18, defaultRate: 11,
    seoKeywords: ["business overdraft", "cash credit limit", "working capital OD", "trader overdraft"],
  },
  {
    slug: "term-loan",
    name: "Term Loan",
    short: "Structured long-term funding for capital expansion.",
    headline: "Structured Term Loans for Capital Expansion",
    description: "Long-term funding for machinery, project execution, infrastructure, or fixed assets with structured repayment.",
    features: ["Tenure up to 10 years", "Fixed monthly / quarterly EMI", "Moratorium available", "High-value funding"],
    eligibility: ["Business vintage 3+ years", "Profitable last 2 years", "Strong banking & balance sheet"],
    documents: ["3 years ITR + audited financials", "Project report", "12 months bank statement", "KYC & business proof"],
    fees: "Processing 1–2%, stamp & legal actuals.",
    maxRate: 16, defaultRate: 10.5,
    seoKeywords: ["term loan", "long term business loan", "project loan", "capex loan"],
  },
  {
    slug: "commercial-equipment-loan",
    name: "Commercial Equipment Loan",
    short: "Finance excavators, cranes, loaders & infra machinery.",
    headline: "Commercial Equipment Finance for Infrastructure",
    description: "Acquire construction and infrastructure machinery — excavators, cranes, loaders — with up to 100% financing.",
    features: ["Funding 80–100% of equipment cost", "Tenure up to 5 years", "OEM tie-ups", "Quick approval"],
    eligibility: ["Contractor / infra company", "Min 2 years experience", "Active work order preferred"],
    documents: ["KYC", "ITR & financials 2 years", "Equipment quotation", "Work order copies"],
    fees: "Processing 1–2%, insurance & RC charges extra.",
    maxRate: 15, defaultRate: 10,
    seoKeywords: ["construction equipment loan", "excavator loan", "JCB loan", "infra equipment finance"],
  },
  {
    slug: "commercial-vehicle-loan",
    name: "Commercial Vehicle Loan",
    short: "Trucks, buses, tippers & LCV finance for fleets.",
    headline: "Commercial Vehicle Loans to Grow Your Fleet",
    description: "Expand your transport business with customized financing for trucks, buses, tippers, and LCVs.",
    features: ["Funding up to 100% of on-road price", "Tenure up to 6 years", "Single & fleet operator support", "EMI aligned with route cash flow"],
    eligibility: ["Min 1 year experience (first-time buyer) or existing operator", "Age 21–65", "Valid commercial driving licence"],
    documents: ["KYC", "Vehicle quotation", "Route permit / experience proof", "Bank statement 6 months"],
    fees: "Processing 1–2%, RTO & insurance actuals.",
    maxRate: 16, defaultRate: 11,
    seoKeywords: ["commercial vehicle loan", "truck loan", "bus loan", "CV finance", "tipper loan"],
  },
  {
    slug: "equipment-machinery-loan",
    name: "Equipment / Machinery Loan",
    short: "Manufacturing & medical equipment financing.",
    headline: "Machinery Financing for Manufacturing & Healthcare",
    description: "Upgrade your facility or medical practice with affordable financing for industrial and medical equipment.",
    features: ["80–90% funding", "Tenure 3–7 years", "Moratorium up to 6 months", "Asset-backed pricing"],
    eligibility: ["Existing business / practice", "Quotation from approved OEM", "ITR last 2 years"],
    documents: ["KYC", "Quotation", "ITR & financials", "Bank statement"],
    fees: "Processing 1–2%.",
    maxRate: 16, defaultRate: 11,
    seoKeywords: ["machinery loan", "medical equipment loan", "industrial equipment finance", "manufacturing loan"],
  },
  {
    slug: "used-auto-loan",
    name: "Used / Old Auto Loan",
    short: "Finance pre-owned cars and commercial vehicles.",
    headline: "Used Vehicle Loans with Easy Financing",
    description: "Purchase pre-owned cars or commercial vehicles without exhausting capital reserves.",
    features: ["Funding 80–85% of value", "Tenure up to 5 years", "Quick valuation", "Minimal paperwork"],
    eligibility: ["Vehicle age <10 years", "RC & insurance copy", "Income proof"],
    documents: ["RC, insurance, prior owner KYC", "PUC & valuation report", "KYC & income proof"],
    fees: "Processing 2–3%, RTO transfer extra.",
    maxRate: 22, defaultRate: 14,
    seoKeywords: ["used car loan", "second hand car loan", "old vehicle loan", "pre-owned car finance"],
  },
  {
    slug: "balance-transfer",
    name: "Balance Transfer (BT)",
    short: "Move existing loans to lower-rate lenders.",
    headline: "Transfer Existing Loans to Lower Your EMI",
    description: "Reduce current interest rates by transferring active loans to a better lender through our network.",
    features: ["Lower rate", "Top-up option", "Faster processing", "No foreclosure on floating-rate retail loans"],
    eligibility: ["12+ EMIs paid", "Clean repayment record", "Eligible existing loan type"],
    documents: ["Existing loan statement", "Sanction letter", "KYC & income proof"],
    fees: "Processing 0.5–1%. Foreclosure: nil on floating retail loans.",
    maxRate: 18, defaultRate: 9,
    seoKeywords: ["balance transfer loan", "home loan balance transfer", "personal loan transfer", "lower EMI"],
  },
  {
    slug: "refinance",
    name: "Refinance",
    short: "Unlock cash from fully owned assets.",
    headline: "Unlock Cash From Existing Assets",
    description: "Generate liquidity from fully owned assets like cars, commercial vehicles, or machinery — without selling them.",
    features: ["Up to 80% of current market value", "Tenure 1–5 years", "Asset stays with you", "Lower rate than unsecured"],
    eligibility: ["Clear ownership", "No active hypothecation", "Valid RC / asset documents"],
    documents: ["RC / asset ownership proof", "Valuation report", "Insurance copy", "KYC & income proof"],
    fees: "Processing 1.5–2.5%.",
    maxRate: 18, defaultRate: 12,
    seoKeywords: ["loan refinance", "refinance car loan", "asset refinance", "unlock asset cash"],
  },
].map((l) => ({ ...l, image: LOAN_IMG[l.slug] })) as LoanService[];

export type ServiceFAQ = { q: string; a: string };
export type ServiceItem = {
  slug?: string;
  name: string;
  description: string;
  bullets?: string[];
  overview?: string[];          // long paragraphs
  whoFor?: string[];            // ideal customers
  process?: string[];           // step-by-step
  documents?: string[];         // docs required
  pricing?: string;             // fee note
  timeline?: string;            // turnaround
  faqs?: ServiceFAQ[];
};

export function itemSlug(item: ServiceItem): string {
  return (
    item.slug ??
    item.name
      .toLowerCase()
      .replace(/[—–&/().,]/g, " ")
      .trim()
      .replace(/\s+/g, "-")
  );
}
export type ServiceArea = {
  slug: string;
  title: string;
  intro: string;
  items: ServiceItem[];
  defaultBullets: string[];
  seoKeywords: string[];
};

export const TAX_ACCOUNTING: ServiceArea = {
  slug: "tax-accounting",
  title: "Tax, Compliance & Accounting Services",
  intro:
    "Accuracy, expertise, and on-time execution. One team for ITR, GST, payroll, bookkeeping and MIS — so finance never slows your business down.",
  items: [
    { name: "Income Tax Return (ITR) Filing",
      description: "Hassle-free ITR for salaried individuals, freelancers, HNIs, and private companies. Maximum deduction optimization, error-free e-filing, and dedicated post-filing support.",
      bullets: ["All ITR forms (1 to 7)", "Capital gains & crypto reporting", "Notice handling & rectification", "Tax-saving advisory"],
      overview: [
        "Our ITR filing service covers the full spectrum — salaried employees, freelancers & consultants, F&O / intraday traders, capital-gain cases (equity, mutual funds, property, crypto), NRIs, HUFs, partnership firms, LLPs and private limited companies.",
        "Every return is prepared by a qualified tax practitioner, cross-checked against your Form 26AS, AIS and TIS so no income is missed and every eligible deduction (80C, 80D, 80G, HRA, home-loan interest, LTA) is claimed correctly.",
        "We also help with belated and revised returns, response to defective return notices (139(9)), refund tracking, e-verification and rectification under section 154.",
      ],
      whoFor: ["Salaried employees & professionals", "Freelancers, consultants & creators", "Stock / F&O / crypto traders", "Business owners, LLPs & companies", "NRIs with Indian income", "Senior citizens & pensioners"],
      process: [
        "Share Form 16, salary slips, bank statements & investment proofs on WhatsApp / email",
        "We compute taxable income, reconcile with 26AS / AIS and prepare a draft computation",
        "You approve refund / tax-payable figures",
        "We file the return on the Income Tax portal and assist with e-verification",
        "Acknowledgement (ITR-V) and computation shared for your records",
      ],
      documents: ["PAN & Aadhaar", "Form 16 / Form 16A", "Bank statements (all accounts) for the FY", "Capital-gain / broker statements", "Home-loan interest certificate", "Investment proofs (LIC, ELSS, PPF, NPS, mediclaim)", "Rent receipts (for HRA)"],
      pricing: "Salaried ITR-1 from ₹499. Capital gains / business income from ₹1,499. Company / LLP returns on quotation.",
      timeline: "Most individual returns filed within 24–48 hours of document submission.",
      faqs: [
        { q: "What if I miss the 31 July deadline?", a: "You can still file a belated return up to 31 December with a late fee of ₹1,000–₹5,000 under section 234F. We help you file it correctly and minimise interest." },
        { q: "Do I have to file ITR if TDS is already deducted?", a: "Yes — TDS is only tax collected at source. You must still file ITR to report total income, claim refund (if any) and stay compliant for visas, loans and credit cards." },
        { q: "Can you handle income-tax notices?", a: "Absolutely. We respond to intimations under 143(1), defective return notices 139(9), scrutiny notices 142/143(2) and reassessment notices 148." },
      ],
    },
    { name: "GST Registration & Returns",
      description: "End-to-end GST registration, monthly returns (GSTR-1, 3B), annual reconciliation (GSTR-9/9C), ITC optimization and notice handling.",
      bullets: ["New GSTIN & amendments", "Monthly & quarterly returns", "Annual return & audit", "ITC reconciliation & e-invoicing"],
      overview: [
        "From your first GSTIN to monthly compliance and annual audit — Velixa is your single point of contact for all GST work. We handle regular taxpayers, composition dealers, e-commerce operators, exporters and ISD registrations.",
        "Our team reconciles books, GSTR-2B and supplier invoices every month so you claim every rupee of Input Tax Credit (ITC) without inviting notices. We also set up e-invoicing & e-way bill processes for businesses crossing the threshold.",
        "If you've received an SCN, ASMT-10, DRC-01 or had your GSTIN suspended, we prepare structured replies, attend personal hearings and file appeals before the GST authorities.",
      ],
      whoFor: ["MSMEs, traders & manufacturers", "E-commerce sellers (Amazon, Flipkart, Meesho)", "Service providers & freelancers above ₹20 L turnover", "Exporters claiming LUT / refund", "Startups setting up GST from day one"],
      process: [
        "Document collection & verification (KYC, business proof, bank details)",
        "Application filed on GST portal — ARN issued within hours",
        "Department verification & GSTIN allotted (3–7 working days)",
        "Onboarding to monthly compliance — books setup, invoice template, e-invoice configuration",
        "Monthly: GSTR-1, GSTR-3B, ITC reconciliation, payment & filing",
      ],
      documents: ["PAN of business / proprietor / directors", "Aadhaar of authorised signatory", "Business address proof (rent agreement / electricity bill + NOC)", "Bank account proof (cancelled cheque / statement)", "Photographs of promoters", "MOA/AOA or partnership deed (where applicable)"],
      pricing: "GST registration from ₹1,499. Monthly returns from ₹999/month. GSTR-9 & 9C on quotation.",
      timeline: "GSTIN typically issued in 3–7 working days. Returns filed within deadline every month.",
      faqs: [
        { q: "Is GST registration mandatory for me?", a: "Mandatory if your annual turnover crosses ₹40 L (goods) / ₹20 L (services), or if you sell inter-state, on e-commerce, or are required by law. Voluntary registration is also possible." },
        { q: "What is composition scheme?", a: "A simplified scheme for small businesses (turnover up to ₹1.5 Cr for goods, ₹50 L for services) — pay tax at a flat 1–6% on turnover with quarterly filings." },
        { q: "Can I claim ITC on all purchases?", a: "Only on purchases used for business, where the supplier has filed GSTR-1 and it reflects in your GSTR-2B. We reconcile every month so you never lose ITC." },
      ],
    },
    { name: "Tax Planning & Advisory",
      description: "Strategic tax planning across personal and corporate structures — capital gains, salary restructuring, business deductions, and year-round advisory.",
      bullets: ["Salary restructuring", "Capital-gain planning", "Corporate tax structuring", "TDS advisory"],
      overview: [
        "Most people pay extra tax simply because no one sat down with them in April to plan the year. Our tax-planning service is proactive — we model your income for the full year and structure salary, investments, business expenses and capital gains so you pay only what you legally must.",
        "For business owners and HNIs, we model section 54 / 54F / 54EC capital-gain exemptions, 44AD / 44ADA presumptive taxation, family-trust structures, LLP vs Pvt-Ltd tax efficiency, and dividend vs salary mix for directors.",
        "Advisory continues year-round — every quarter we check actual numbers vs the plan and re-balance if needed before the financial year closes.",
      ],
      whoFor: ["Salaried employees earning ₹15 L+ p.a.", "Business owners & directors", "HNIs with capital-gain events", "NRIs returning to India", "Startups planning ESOPs & buy-backs"],
      process: [
        "Discovery call — current income, investments, family situation",
        "We prepare a written tax plan with optimal structure & projected savings",
        "Implementation support — salary letters, investment paperwork, declarations to employer",
        "Quarterly review & rebalancing",
        "Year-end check before March 31 to lock all benefits",
      ],
      documents: ["Last 2 years' ITR + Form 16", "Latest salary structure / employment contract", "Investment portfolio statements", "Property & capital-asset details", "Business P&L (for owners)"],
      pricing: "Personal tax plan from ₹4,999. Corporate / HNI plans on quotation.",
      timeline: "Plan delivered in 5–7 working days after document submission.",
      faqs: [
        { q: "Old regime or new regime — which is better?", a: "It depends on your deductions. We run both calculations and recommend the optimal regime for the year — and revisit annually because rules keep changing." },
        { q: "Can I save tax after selling property?", a: "Yes — sections 54, 54F and 54EC offer LTCG exemption if reinvested in residential property or NHAI/REC bonds within specified timelines. We map the right route for you." },
      ],
    },
    { name: "Bookkeeping & Accounting",
      description: "Outsourced books for MSMEs, startups, traders and medical practices — invoices, expenses, reconciliations, ledgers, audit-ready statements.",
      bullets: ["Daily / monthly books in Tally or Zoho", "Bank & vendor reconciliation", "Audit-ready financials", "Year-end closing support"],
      overview: [
        "We become your virtual accounting team — recording every sale, purchase, expense and bank entry in Tally Prime, Zoho Books, QuickBooks or Busy. You get a real-time financial picture without hiring a full-time accountant.",
        "Every month we reconcile bank statements, vendor & customer ledgers, GST input register, and produce a clean P&L, balance sheet, cash-flow and ageing report. Books stay audit-ready throughout the year.",
        "Specialised verticals supported — retail & FMCG distributors, manufacturing units, restaurants, doctors & clinics, e-commerce sellers, real-estate developers and professional firms.",
      ],
      whoFor: ["MSMEs ₹1 Cr – ₹50 Cr turnover", "Startups & D2C brands", "Doctors, lawyers & consultants", "Retail & wholesale traders", "E-commerce sellers"],
      process: [
        "Onboarding — chart of accounts, software setup, opening balances",
        "Daily / weekly entry of sales, purchases, expenses, bank",
        "Monthly: reconciliation, GST register, MIS report shared by 10th",
        "Quarterly review with founder / CFO",
        "Year-end: closing entries, depreciation, audit support & ITR/ROC filing",
      ],
      documents: ["Sales invoices & purchase bills", "Bank statements (all accounts)", "Cash voucher / petty-cash register", "Loan & investment statements", "Last audited balance sheet (for opening balances)"],
      pricing: "From ₹4,999/month for proprietors. Pvt-Ltd & multi-location businesses on quotation.",
      timeline: "Monthly books closed and MIS shared by the 10th of the following month.",
      faqs: [
        { q: "Will my data stay confidential?", a: "Yes — we sign a strict NDA, work on isolated cloud folders, and limit access to assigned team members only." },
        { q: "Can you take over books mid-year?", a: "Absolutely. We reconstruct opening balances from your last audited financials and continue cleanly from there." },
      ],
    },
    { name: "Payroll Management",
      description: "End-to-end payroll — salary processing, PF/ESI/PT, TDS on salary, payslips, Form 16, and statutory filings.",
      bullets: ["Monthly payroll & payslips", "PF, ESI, PT compliance", "Form 16 & 24Q quarterly", "Full & final settlement"],
      overview: [
        "Payroll is more than salary transfers — it's PF, ESI, Professional Tax, LWF, TDS, gratuity, leave accounting and statutory filings. One miss invites notices, interest and damages. We manage the entire cycle so your team gets paid accurately and you stay 100% compliant.",
        "Cloud payslips delivered to every employee, investment-declaration & proof-collection windows handled, Form 16 generated and dispatched annually, and full-and-final settlements processed within statutory timelines.",
      ],
      whoFor: ["Startups with first 5–50 employees", "MSMEs & growing companies", "Clinics, hospitals & education institutes", "Companies hiring contract workers"],
      process: [
        "Employee master setup — KYC, salary structure, PF/ESI/UAN",
        "Monthly inputs — attendance, leave, variable pay",
        "Salary computation with statutory deductions & TDS",
        "Payslip delivery + bank salary upload file",
        "Monthly: PF/ESI/PT challan, payment & return filing",
        "Quarterly: TDS return (24Q). Annual: Form 16 & gratuity workings",
      ],
      documents: ["PAN, Aadhaar & bank details of employees", "Appointment / salary letters", "PF / ESI registration certificates", "Investment declarations (Form 12BB)", "Attendance & leave register"],
      pricing: "From ₹99 per employee per month. Statutory registration packages from ₹4,999.",
      timeline: "Salary processing within 2 working days of inputs received.",
      faqs: [
        { q: "Is PF mandatory for my company?", a: "Mandatory once you cross 20 employees (10 in some states). Voluntary registration is also possible and helps employees build retirement corpus." },
        { q: "Do you handle full-and-final settlements?", a: "Yes — exit dues, leave encashment, gratuity, notice-pay adjustment and final TDS workings, all delivered within the statutory window." },
      ],
    },
    { name: "MIS & Financial Reporting",
      description: "Monthly MIS dashboards — P&L, cash flow, receivables, payables, GST summary — so you always know where the business stands.",
      bullets: ["Monthly P&L & cash flow", "Receivables / payables ageing", "Inventory & GST summary", "Custom KPI dashboards"],
      overview: [
        "Numbers in Tally aren't management information — they're raw data. We convert your books into a one-page monthly MIS dashboard that tells you exactly how the business is performing, where cash is stuck, and which customers / SKUs are profitable.",
        "Custom dashboards designed for your industry — gross margin by product, store-wise P&L for retail, doctor-wise revenue for clinics, channel-wise CAC for D2C brands, project-wise profitability for contractors.",
      ],
      whoFor: ["Founders & CXOs of MSMEs", "Multi-branch retail / clinic chains", "D2C brands tracking CAC & contribution margin", "Manufacturers tracking unit economics"],
      process: [
        "KPI workshop — what does the founder want to see every month?",
        "Dashboard template designed in Excel / Power BI / Google Sheets",
        "Monthly data extraction from Tally/Zoho + manual inputs",
        "MIS published with variance analysis & action points by 10th of the month",
        "Monthly review call with founder / CFO",
      ],
      documents: ["Last 12 months books / Tally backup", "Budget / target file (if available)", "Sales & inventory MIS in current format"],
      pricing: "From ₹7,999/month. Power BI dashboard setup one-time ₹25,000 onwards.",
      timeline: "First MIS delivered within 20 days of onboarding.",
      faqs: [
        { q: "Do you build dashboards in Power BI?", a: "Yes — Power BI, Google Looker Studio, or simple Excel/Sheets, depending on your team's comfort and data volume." },
      ],
    },
    { name: "MSME / Udyam Registration",
      description: "Get your MSME (Udyam) certificate to unlock priority-sector lending, government tenders, subsidies, ISO reimbursement and faster GST/Income-tax processing.",
      bullets: ["Udyam registration & update", "Udyam Assist for informal units", "NSIC & GeM onboarding", "Subsidy & scheme advisory"],
      overview: [
        "Udyam registration is the gateway to MSME benefits — lower interest rates, collateral-free loans up to ₹2 Cr under CGTMSE, 1% interest subvention, protection against delayed payments under MSMED Act, and eligibility for hundreds of central & state schemes.",
        "We register your unit correctly under the latest classification (turnover + investment criteria), and help with NSIC empanelment, GeM (Government e-Marketplace) onboarding, and access to applicable subsidies like CLCSS, ZED, ISO reimbursement and Lean schemes.",
      ],
      whoFor: ["Manufacturers & service providers", "Traders (retail & wholesale)", "Startups looking for MSME benefits", "Existing units missing Udyam upgrade"],
      process: [
        "Eligibility check — turnover & investment classification",
        "Document collection & Aadhaar OTP verification",
        "Udyam application filed — certificate issued same day",
        "NSIC / GeM / scheme add-ons (optional)",
      ],
      documents: ["Aadhaar of proprietor / partner / director", "PAN of business", "GSTIN (if applicable)", "Bank account & IFSC", "NIC code of activity"],
      pricing: "Udyam registration ₹999. NSIC + GeM packages from ₹4,999.",
      timeline: "Certificate issued same day in most cases.",
      faqs: [
        { q: "Is Aadhaar mandatory?", a: "Yes — Udyam is fully Aadhaar-OTP based for the authorised signatory." },
        { q: "Can a trader register under MSME?", a: "Yes — retail & wholesale traders are now covered under MSME for the purpose of priority-sector lending." },
      ],
    },
    { name: "IEC Code Registration",
      description: "Importer Exporter Code (IEC) application, modification and annual update on the DGFT portal — issued within 1 working day.",
      bullets: ["IEC apply (new)", "IEC modification & update", "IEC annual KYC update", "Linked PAN, bank & address proof"],
      overview: [
        "Importer Exporter Code (IEC) is a 10-digit code issued by DGFT, mandatory for any business importing into or exporting from India. We handle the entire DGFT portal filing — from PAN-based application to digital signature, bank verification and certificate download.",
        "We also handle annual IEC KYC updates (mandatory every April–June), address / partner / bank modifications, and reactivation of de-activated IECs.",
      ],
      whoFor: ["First-time exporters & importers", "E-commerce sellers on Amazon Global / Etsy / Shopify", "Service exporters claiming forex remittances", "Existing IEC holders needing modification or annual update"],
      process: [
        "Document collection & PAN / Aadhaar / bank verification",
        "DGFT portal application with Class-3 DSC or Aadhaar OTP",
        "IEC certificate issued — usually within 1 working day",
        "Optional: annual KYC update & modifications",
      ],
      documents: ["PAN of firm / proprietor / company", "Cancelled cheque or bank certificate", "Aadhaar of authorised signatory", "Business address proof (electricity bill / rent agreement)", "Passport-size photo of signatory"],
      pricing: "New IEC ₹1,999. Annual update ₹999. Modification ₹1,499.",
      timeline: "Issued within 1 working day after document submission.",
      faqs: [
        { q: "Is IEC mandatory for service exporters?", a: "IEC is not mandatory if you are only exporting services and do not claim benefits under the Foreign Trade Policy — but most banks ask for it for forex remittances above a threshold." },
        { q: "How often must IEC be updated?", a: "IEC must be electronically updated/confirmed every year between April and June, even if no details have changed. Non-update auto-deactivates the IEC." },
      ],
    },

    { name: "Labour Licence & Establishment Compliance",
      description: "End-to-end labour-law compliance — Shops & Establishment, Contract Labour, PF & ESI, Professional Tax and Factories Act registrations and returns.",
      bullets: ["Shops & Establishment registration", "Contract Labour (CLRA) licence", "PF, ESI & PT registration", "Annual & half-yearly returns"],
      overview: [
        "Labour-law compliance is jurisdiction-heavy and changes state to state. Our team handles every registration and return under the Shops & Establishment Act, Contract Labour (Regulation & Abolition) Act, EPF & MP Act, ESI Act, Professional Tax, Labour Welfare Fund, Factories Act and Standing Orders.",
        "We also draft HR policies — appointment letters, NDA, employee handbook, POSH (sexual harassment) policy, leave & attendance policy — and conduct internal audits before government inspections.",
      ],
      whoFor: ["Offices, shops & retail outlets", "Factories & manufacturing units", "Companies engaging contract labour or housekeeping", "BPO, IT services & startups hiring across states"],
      process: [
        "Mapping of applicable laws & jurisdictions",
        "Registration filings (Shops Act, PF, ESI, PT, LWF, CLRA)",
        "Monthly: PF/ESI/PT challan & return filing",
        "Half-yearly & annual returns under all applicable Acts",
        "Audit & inspection support",
      ],
      documents: ["Establishment KYC", "Employee count & wage register", "Existing registrations (if any)", "Rent agreement / address proof"],
      pricing: "Shops Act registration from ₹2,499. PF + ESI registration ₹6,999. CLRA on quotation.",
      timeline: "Registrations typically issued within 7–15 working days.",
      faqs: [
        { q: "Is Shops Act mandatory?", a: "Yes — for every commercial establishment in every state, with timelines varying from 30 days of starting operations." },
        { q: "POSH compliance — what's mandatory?", a: "Every workplace with 10+ employees must constitute an Internal Committee, issue a written POSH policy, and file the annual return with the District Officer." },
      ],
    },
    { name: "Business Registrations & Licences",
      description: "One-window registration for FSSAI, Trade Licence, Trademark, ISO, Startup India (DPIIT), Drug Licence, Pollution NOC and other state/central approvals.",
      bullets: ["FSSAI (basic / state / central)", "Trademark & ISO certification", "Startup India (DPIIT) recognition", "Pollution NOC & Trade Licence"],
      overview: [
        "Whether you're opening a restaurant, launching a brand, or setting up a manufacturing unit, the right approvals protect your business and unlock benefits. We handle FSSAI (basic, state, central), Trademark (TM application, opposition, renewal), ISO 9001 / 14001 / 22000 / 27001 certification, Startup India DPIIT recognition (tax holiday & easy compliance), Drug Licence (wholesale / retail), Legal Metrology, BIS, Pollution Control NOC and municipal Trade Licence.",
      ],
      whoFor: ["Restaurants, cloud kitchens & FMCG brands", "D2C & e-commerce sellers", "Pharmacies & medical stores", "Manufacturers & traders", "DPIIT-eligible startups"],
      process: [
        "Eligibility & licence-mapping consultation",
        "Document collection & application drafting",
        "Filing with respective authority / portal",
        "Follow-up, query response & certificate delivery",
      ],
      documents: ["KYC of proprietor / directors", "Business address proof", "GSTIN & PAN", "Product / activity details", "Photographs & layout (where applicable)"],
      pricing: "FSSAI basic from ₹999. Trademark filing from ₹4,499 (govt fee extra). ISO from ₹6,999. DPIIT from ₹4,999.",
      timeline: "FSSAI 7–15 days. Trademark TM application same day; registration 12–18 months. DPIIT 7–10 days.",
      faqs: [
        { q: "Which FSSAI licence do I need?", a: "Basic up to ₹12 L turnover, State ₹12 L–₹20 Cr, Central above ₹20 Cr or for imports/exports. We pick the right one based on your scale and category." },
        { q: "Trademark — class & opposition?", a: "We do a free clearance search, file in the right class(es), and represent you in opposition / examination report response till registration." },
      ],
    },
  ],
  defaultBullets: ["Accurate, on-time filing", "Notice & audit support", "Dedicated CA/consultant", "Transparent fees"],
  seoKeywords: ["ITR filing online", "GST registration", "GST return filing", "online tax consultant", "outsourced bookkeeping india", "payroll services MSME", "tax planning advisor", "Udyam MSME registration", "IEC code registration", "DGFT consultant", "labour licence registration", "FSSAI registration", "trademark registration"],
};

export const PROPERTY_SERVICES: ServiceArea = {
  slug: "property-consulting",
  title: "Property Advisory & Transaction Assistance",
  intro:
    "Independent property advisory and transaction assistance — covering home-loan comparison and facilitation support, market assessment, investment analysis, property evaluation, documentation assistance and transaction support. We are not a RERA-registered brokerage and we do not list or sell property.",
  items: [
    { name: "Residential Property Assistance",
      slug: "residential-property-assistance",
      description: "Support for home buyers including financing, affordability analysis, and transaction guidance — so you borrow the right amount from the right lender.",
      bullets: ["Affordability & EMI assessment", "Home-loan comparison and facilitation support", "Documentation assistance for chosen property", "Co-applicant & tax-benefit structuring"],
      overview: [
        "Buying a home is primarily a financing decision. We assess your true affordability (income, existing EMIs, dependents, tax outflow), build a long-term cash-flow projection, and help you compare home-loan structures (fixed vs floating, tenure, co-applicant, top-up headroom) that fit your life.",
        "Once you've identified a property, our team assists with documentation review — guidance in reviewing publicly available RERA registration information, 30-year title chain, encumbrance certificate, sanctioned building plan and occupancy / completion certificate that the lender will require at sanction.",
        "We do not market, list or sell property. Our role is independent advisory and transaction assistance only.",
      ],
      whoFor: ["First-time home buyers", "Salaried families upgrading homes", "NRIs financing Indian property", "Self-employed structuring co-applicant loans"],
      process: [
        "Affordability & cash-flow review",
        "Home-loan comparison across partner lenders",
        "Documentation assistance checklist for chosen property",
        "Loan structuring, sanction & disbursement coordination",
        "Annual review — balance transfer, top-up, pre-payment plan",
      ],
      documents: ["KYC of all co-applicants (PAN, Aadhaar)", "Income proof — Form 16 / ITR / bank statement", "Existing loan & credit-card statements", "Property documents shared by seller (for review)"],
      pricing: "Flat advisory fee from ₹4,999 per engagement OR success-fee linked to loan sanction — disclosed in writing upfront.",
      timeline: "Affordability report in 3–5 days. Loan sanction typically 7–21 days post-document submission.",
      faqs: [
        { q: "Do you sell or list property?", a: "No. We are not a RERA-registered real estate brokerage. We only provide advisory and transaction assistance for properties you have already identified." },
        { q: "What does the home-loan assistance cover?", a: "We compare offers from leading partner banks & NBFCs, structure co-applicants, and coordinate the sanction & disbursement on your behalf." },
      ],
    },
    { name: "Commercial Property Advisory",
      slug: "commercial-property-advisory",
      description: "Investment analysis, rental yield assessment, and commercial asset evaluation for investors evaluating commercial assets.",
      bullets: ["Net rental yield & cap-rate assessment", "Post-tax cash-flow analysis", "LAP / lease-rental discounting facilitation", "Tenant covenant & exit-liquidity review"],
      overview: [
        "Commercial real-estate decisions move significant capital and must be data-led. We assess net rental yield, cap-rate, occupancy risk, post-tax cash flow and exit liquidity for any commercial property you are evaluating — Grade-A offices, high-street retail, warehousing, IT parks and pre-leased buildings.",
        "If you need to unlock liquidity from a commercial asset, we facilitate Loan Against Property (LAP) or Lease Rental Discounting (LRD) with our partner lenders.",
        "We do not represent the seller or developer. Our role is independent advisory and transaction assistance.",
      ],
      whoFor: ["HNIs evaluating pre-leased assets", "Family offices building real-estate portfolios", "Business owners using LAP for expansion", "Investors comparing commercial vs residential yields"],
      process: [
        "Brief intake — usage, budget, hold horizon",
        "Yield, cash-flow & risk analysis shared as PDF",
        "Documentation review on title, approvals, tenant covenant",
        "Lender facilitation (LAP / LRD) where required",
        "Annual review of yield and refinance options",
      ],
      documents: ["Investor KYC & source-of-funds proof", "Existing rent / lease deed (for LRD)", "Property title chain & approvals", "Tenant financials (for covenant review)"],
      pricing: "Advisory fee from ₹15,000 per engagement. LAP facilitation success-fee disclosed upfront.",
      timeline: "Analysis in 7–10 days. LAP sanction 15–30 days post-document submission.",
      faqs: [
        { q: "What yields are realistic in 2026?", a: "Indicative ranges — Grade-A office in metros: 7.5–8.5%*. High-street retail: 5–7%*. Warehousing: 8–9%*. Final yields depend on asset, tenant and location." },
        { q: "Can you facilitate an LAP on my existing property?", a: "Yes — we facilitate LAP and Lease Rental Discounting with partner banks & NBFCs. Approval is at the sole discretion of the lender." },
      ],
    },
    { name: "Property Investment Advisory",
      slug: "property-investment-advisory",
      description: "Portfolio diversification, ROI modelling, and long-term investment planning for first-time investors, HNIs and NRIs.",
      bullets: ["Capital-gains tax mapping (54 / 54F / 54EC)", "NRI / FEMA / repatriation guidance", "Portfolio diversification across asset classes", "Exit-route & liquidity planning"],
      overview: [
        "Real estate is one of the biggest investments most families make — and one of the least researched. We bring an institutional approach to your decision: capital-gains tax mapping, exit-route planning and portfolio diversification built around your wider financial plan.",
        "For NRIs we provide FEMA & RBI guidance, source-of-funds documentation, Form 15CA/CB workings and repatriation support through your authorised dealer bank.",
        "Advisory only — we do not market property or earn brokerage from any developer.",
      ],
      whoFor: ["First-time real-estate investors", "Salaried investors building passive income", "HNIs & family offices", "NRIs investing in India", "Sellers planning capital-gain reinvestment"],
      process: [
        "Financial profile review — goals, horizon, risk appetite",
        "Recommended asset mix and capital-gains plan",
        "Documentation assistance for selected property",
        "Tax / FEMA / repatriation paperwork support",
        "Annual portfolio review",
      ],
      documents: ["KYC & income proof", "Existing property portfolio summary", "Tax & financial statements", "PIO / OCI card (for NRIs)"],
      pricing: "Advisory fee from ₹15,000 per engagement. Disclosed in writing upfront — no hidden brokerage.",
      timeline: "Initial recommendation in 7–10 days.",
      faqs: [
        { q: "How is capital gain on property taxed?", a: "Long-term (>24 months) capital gain is currently taxed at 12.5%* without indexation. Sections 54 / 54F / 54EC exemptions may be available if reinvested. We map the right route for you." },
        { q: "Can NRIs repatriate sale proceeds?", a: "Yes — up to USD 1 million per financial year under FEMA, subject to tax compliance and CA-certified Form 15CA/CB. The remittance is executed by your AD bank." },
      ],
    },
    { name: "Lease & Documentation Support",
      slug: "lease-documentation-support",
      description: "Rent agreements, lease documentation, verification guidance, and compliance assistance — so both sides start with clear paperwork.",
      bullets: ["Rent / lease agreement drafting", "E-stamping & registration guidance", "Verification & compliance checklist", "Documentation assistance for both parties"],
      overview: [
        "Most rental disputes start with sloppy paperwork. We draft a clean rent or lease agreement (residential or commercial), advise on e-stamp value, registration and notarisation, and share a verification checklist for both landlord and tenant.",
        "This is a documentation and advisory service. We do not introduce tenants to landlords, do not collect brokerage and do not act as a real-estate agent.",
      ],
      whoFor: ["Landlords renting out residential or commercial property", "Tenants moving to a new city", "Corporate HR teams documenting employee housing", "NRIs renting out their Indian property"],
      process: [
        "Term sheet intake — rent, deposit, lock-in, escalation",
        "Agreement drafted and shared for both-party review",
        "E-stamp / notarisation / registration guidance",
        "Police-verification & move-in checklist shared",
      ],
      documents: ["KYC of both parties", "Property ownership proof", "Previous agreement (if renewal)"],
      pricing: "Documentation-only packages from ₹2,999.",
      timeline: "First draft within 2 working days.",
      faqs: [
        { q: "Do you find me a tenant or a property?", a: "No. We provide documentation and verification support only. We do not list properties or introduce parties." },
        { q: "Is rent agreement registration mandatory?", a: "Mandatory for rentals of 12 months and above in most states. Below 12 months, a notarised agreement is acceptable." },
      ],
    },
  ],
  defaultBullets: ["Independent advisory — no hidden brokerage", "Documentation assistance & verification guidance", "Market assessment & investment analysis", "Home-loan facilitation with partner banks & NBFCs"],
  seoKeywords: ["property advisory india", "home loan facilitation", "property documentation assistance", "commercial property advisory", "LAP loan against property", "NRI property advisor", "capital gains tax property", "lease documentation support"],
};

export type CreditCardType = {
  slug: string;
  image: string;
  name: string;
  desc: string;
  picks: string;
  applyUrl: string;
  overview: string;
  bestFor: string[];
  features: string[];
  eligibility: string[];
  documents: string[];
};

export const CREDIT_CARD_TYPES: CreditCardType[] = [
  {
    slug: "cashback", image: "/cards/cashback.jpg", name: "Cashback Cards",
    desc: "Flat or category-wise cashback on every spend. Great for everyday users who want guaranteed monthly savings without tracking reward points.",
    picks: "Axis ACE, HDFC Millennia, SBI Cashback",
    applyUrl: "#",
    overview: "Cashback credit cards put real money back into your account on every transaction — no points to convert, no expiry games. Ideal for groceries, bill payments, utilities and online shopping.",
    bestFor: ["Salaried professionals", "First-time card users", "Bill-payment heavy households", "Online shoppers"],
    features: ["1–5% cashback across categories", "Accelerated cashback on bills, food & groceries", "No reward redemption hassle", "Low/zero joining fee on most variants"],
    eligibility: ["Age 21–65", "Salaried min ₹25,000/month OR self-employed ₹3 LPA ITR", "CIBIL 700+", "No active defaults"],
    documents: ["PAN & Aadhaar", "Latest 3 months salary slips / 2 yrs ITR", "Address proof", "3 months bank statement"],
  },
  {
    slug: "travel", image: "/cards/travel.jpg", name: "Travel & Miles Cards",
    desc: "Earn airline miles, complimentary lounge access, hotel privileges and zero foreign-exchange markup. Best for frequent domestic & international flyers.",
    picks: "HDFC Infinia, Axis Atlas, ICICI Emeralde",
    applyUrl: "#",
    overview: "Travel credit cards turn every spend into miles, free flights and luxury hotel nights. Premium variants add unlimited lounge access, low forex markup and elite hotel status.",
    bestFor: ["Frequent flyers", "International travelers", "Business executives", "Premium-lifestyle spenders"],
    features: ["Airline miles / EDGE / Reward points", "Complimentary domestic & international lounge access", "Low foreign-exchange markup (0.99–2%)", "Milestone flight & hotel vouchers"],
    eligibility: ["Age 21–65", "Income ₹6 LPA+ (entry) / ₹25 LPA+ (super-premium)", "CIBIL 750+", "Existing relationship with the bank helps"],
    documents: ["PAN & Aadhaar", "Latest 3 months salary slips / 2 yrs ITR", "Address proof", "6 months bank statement"],
  },
  {
    slug: "fuel", image: "/cards/fuel.jpg", name: "Fuel Cards",
    desc: "Waive the 1% fuel surcharge and earn accelerated reward points at HPCL, IOCL & BPCL pumps. Ideal for daily commuters and fleet owners.",
    picks: "BPCL SBI Card Octane, HPCL ICICI, IOCL Axis Bank Credit Card",
    applyUrl: "#",
    overview: "Fuel credit cards remove the 1% fuel surcharge and reward you at every fill-up. Co-branded variants like the IOCL Axis Bank Credit Card and BPCL SBI Card Octane give boosted points and instant cashback at partner outlets.",
    bestFor: ["Daily commuters", "Fleet & cab owners", "Field-sales professionals", "Self-employed who travel by car"],
    features: ["1% fuel surcharge waiver (up to ₹400/month)", "Accelerated points at HPCL / IOCL / BPCL", "Cashback / vouchers on partner outlets", "EMI on big fuel & service spends"],
    eligibility: ["Age 21–65", "Salaried min ₹20,000/month OR self-employed ITR", "CIBIL 700+", "Active driving licence helps"],
    documents: ["PAN & Aadhaar", "Salary slips / ITR", "Address proof", "Bank statement"],
  },
  {
    slug: "lifetime-free", image: "/cards/lifetime-free.jpg", name: "Lifetime-Free Cards",
    desc: "Zero joining and zero annual fee — for life. Perfect first card for students, young earners and anyone building a credit history.",
    picks: "IDFC FIRST Select, Amazon Pay ICICI, Kotak 811 #DreamDifferent",
    applyUrl: "#",
    overview: "Lifetime-free credit cards never charge a joining or annual fee. They’re the safest way to build CIBIL score from scratch and enjoy interest-free credit for up to 50 days.",
    bestFor: ["Students & first jobbers", "Anyone building CIBIL", "Light spenders", "Backup secondary card holders"],
    features: ["Zero joining fee", "Zero annual fee for life (no spend conditions)", "Reward points & welcome benefits", "EMI conversion on big purchases"],
    eligibility: ["Age 21–65 (18+ for student variants)", "Salary ₹15,000/month+ OR ITR ₹2 LPA+", "CIBIL 700+ (or NTC for student cards)", "Indian citizen"],
    documents: ["PAN & Aadhaar", "Salary slip / ITR / college ID", "Address proof", "Bank statement"],
  },
  {
    slug: "shopping", image: "/cards/shopping.jpg", name: "Shopping & Co-branded Cards",
    desc: "Boosted reward points and instant discounts on Amazon, Flipkart, Myntra, Tata Neu and other major e-commerce platforms.",
    picks: "Amazon Pay ICICI, Flipkart Axis, Tata Neu HDFC",
    applyUrl: "#",
    overview: "Co-branded shopping cards stack instant discounts, accelerated reward points and EMI offers on India’s biggest e-commerce platforms.",
    bestFor: ["Frequent online shoppers", "Amazon / Flipkart Plus members", "Big-ticket gadget buyers", "Fashion & lifestyle spenders"],
    features: ["3–5% rewards on partner platforms", "Instant bank discounts during sale events", "No-cost EMI on electronics", "Welcome vouchers"],
    eligibility: ["Age 21–60", "Salaried ₹20,000/month+ OR ITR ₹3 LPA+", "CIBIL 700+", "Active e-commerce account preferred"],
    documents: ["PAN & Aadhaar", "Salary slip / ITR", "Address proof", "Bank statement"],
  },
  {
    slug: "premium", image: "/cards/premium.jpg", name: "Premium & Super-Premium Cards",
    desc: "Unlimited lounge access, dedicated concierge, golf programs, milestone vouchers and luxury hotel collections for high-spend lifestyles.",
    picks: "HDFC Infinia, AmEx Platinum, Axis Magnus Burgundy",
    applyUrl: "#",
    overview: "Super-premium cards are invite-grade products with unlimited lounges, concierge, golf, fine-dining and elite hotel status. Built for HNIs and high-spend executives.",
    bestFor: ["HNIs & senior executives", "Premium frequent flyers", "Golf & fine-dining enthusiasts", "Annual spends ₹15 lakh+"],
    features: ["Unlimited domestic & international lounges", "24x7 concierge", "Golf privileges & milestone benefits", "Luxury hotel collections (Marriott, Taj, Hyatt)"],
    eligibility: ["Age 21–70", "Income ₹25 LPA+ (varies by issuer)", "CIBIL 780+", "Existing private-banking relationship helps"],
    documents: ["PAN & Aadhaar", "2 yrs ITR / latest Form 16", "Address proof", "12 months bank statement"],
  },
];

export const CREDIT_CARD_BENEFITS = [
  "Reward points / cashback (1–10% by category)",
  "Fuel surcharge waiver (up to ₹400/month)",
  "Domestic & international airport lounge access",
  "Movie, dining & shopping offers",
  "Insurance cover — purchase, travel, fraud",
  "Welcome benefits & milestone vouchers",
  "EMI on big purchases",
  "Interest-free credit period up to 50 days",
];

export const CREDIT_CARD_ELIGIBILITY = {
  salaried: ["Age 21–65", "Minimum salary ₹15,000/month (entry-level)", "1+ year of stable employment", "CIBIL score 700+ preferred"],
  selfEmployed: ["Age 21–65", "ITR of ₹3 LPA+ (entry-level), ₹15 LPA+ (super-premium)", "Business vintage 2+ years", "CIBIL score 750+ preferred"],
  documents: ["PAN & Aadhaar", "Address proof — utility bill / rent agreement", "Income proof — salary slips or last 2 ITRs", "Latest 3 months bank statement"],
};

export const CREDIT_CARD_DISCLAIMER =
  "Card approval, limits, and benefits are determined solely by the issuing bank.";

export const RATES_DISCLAIMER =
  "Interest rates mentioned are indicative and final interest rates, eligibility, and approval terms are subject to lender policies and applicant profile.";

export const GOVT_SCHEME_DISCLAIMER =
  "Scheme eligibility, approval, and benefits are determined solely by the relevant government authorities, banks, and implementing institutions.";

export const PARTNER_BANKS = [
  "Tata Capital", "Poonawalla Fincorp", "Piramal Finance", "HDFC Bank", "ICICI Bank", "Axis Bank",
  "Kotak Mahindra Bank", "Yes Bank", "IndusInd Bank", "Bajaj Finserv", "L&T Finance", "Aditya Birla Capital",
];

export const CONTACT = {
  brand: "Velixa Capital",
  tagline: "Trust. Growth. Stability. Prosperity.",
  phone: "+91 95829 14054",
  phoneRaw: "919582914054",
  email: "hello@velixacapital.com",
};

export const COMPLIANCE_DISCLAIMER =
  "Velixa Capital facilitates financial products and professional services through its network of banking, financial, and advisory partners. We are not a lender, bank, or NBFC. Loan approvals, interest rates, credit limits, and service outcomes are subject to the policies of the respective institutions and service providers. Accounting and legal compliances are facilitated via independent qualified financial professionals. Property transactions, investment decisions, and documentation reviews are subject to independent verification by the respective parties and authorities.";
