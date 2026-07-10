export type GovtScheme = {
  slug: string;
  name: string;
  short: string;
  overview: string;
  loanAmount: string;
  interestRate: string;
  subsidy: string;
  eligibility: string[];
  documents: string[];
  applyProcess: string[];
  officialUrl: string;
};

export const GOVT_SCHEMES: GovtScheme[] = [
  {
    slug: "pmegp",
    name: "PMEGP — Prime Minister's Employment Generation Programme",
    short: "Credit-linked subsidy scheme for new micro-enterprises with margin money subsidy up to 35%.",
    overview:
      "PMEGP is a flagship credit-linked subsidy scheme of the Ministry of MSME, implemented by KVIC. It helps create employment opportunities by setting up new micro-enterprises in non-farm sectors. Eligible beneficiaries get capital subsidy on the project cost via participating banks.",
    loanAmount: "Up to ₹50 lakh (manufacturing) / ₹20 lakh (service & business).",
    interestRate: "Bank's prevailing rate (typically 11%–14% p.a.).",
    subsidy: "15%–35% margin-money subsidy depending on category & area (Urban/Rural, General/Special).",
    eligibility: [
      "Indian citizen, 18+ years",
      "Min 8th pass for projects > ₹10L (manufacturing) / > ₹5L (service)",
      "Only new units; existing/already-subsidised units not eligible",
      "Self-help groups, charitable trusts, co-operative societies also eligible",
    ],
    documents: [
      "Aadhaar & PAN",
      "Caste / Special-category certificate (if applicable)",
      "Project Report (DPR)",
      "Educational qualification proof",
      "Address proof of unit location",
    ],
    applyProcess: [
      "Register on the KVIC PMEGP e-portal",
      "Submit online application with project report",
      "District Task Force interview",
      "Bank sanction & disbursal",
      "EDP training & subsidy release after lock-in",
    ],
    officialUrl: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp",
  },
  {
    slug: "mudra-loan",
    name: "PMMY — MUDRA Loan",
    short: "Collateral-free loans up to ₹10 lakh for non-corporate small business units under Shishu, Kishor & Tarun categories.",
    overview:
      "Pradhan Mantri MUDRA Yojana provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises through banks, NBFCs and MFIs. Categorised as Shishu (up to ₹50K), Kishor (₹50K–₹5L) and Tarun (₹5L–₹10L).",
    loanAmount: "Up to ₹10 lakh (Shishu / Kishor / Tarun).",
    interestRate: "8%–12% p.a. (RBI-linked, lender-specific).",
    subsidy: "No direct subsidy. Collateral-free under CGFMU guarantee.",
    eligibility: [
      "Indian citizen running non-farm small business",
      "Activities: manufacturing, processing, trading, services",
      "No prior loan default history",
      "Existing or new units both eligible",
    ],
    documents: [
      "Identity & Address proof (Aadhaar/PAN)",
      "Business address proof",
      "Quotation of machinery (if applicable)",
      "Last 6 months bank statement",
      "Recent passport-sized photos",
    ],
    applyProcess: [
      "Visit udyamimitra.in or partner bank/NBFC branch",
      "Submit MUDRA loan application form with KYC & business proof",
      "Bank appraisal of business plan",
      "Sanction & disbursal (typically 7–15 days)",
    ],
    officialUrl: "https://www.mudra.org.in/",
  },
  {
    slug: "stand-up-india",
    name: "Stand-Up India",
    short: "Bank loans between ₹10 lakh and ₹1 crore for SC/ST and women entrepreneurs setting up a greenfield enterprise.",
    overview:
      "Stand-Up India facilitates bank loans between ₹10 lakh and ₹1 crore to at least one SC/ST borrower and at least one woman borrower per bank branch, for setting up a greenfield enterprise in manufacturing, services, agri-allied or trading.",
    loanAmount: "₹10 lakh to ₹1 crore (composite loan: term + working capital).",
    interestRate: "Lowest applicable rate of the bank in that category (MCLR + 3% + tenor premium typically).",
    subsidy: "Refinance through SIDBI; CGFSIL credit guarantee available.",
    eligibility: [
      "SC/ST and/or Woman entrepreneur (18+ years)",
      "Greenfield project (first venture in this activity)",
      "For non-individual enterprises: 51%+ holding by SC/ST/Woman",
      "Borrower should not be in default to any bank/FI",
    ],
    documents: [
      "Caste certificate (for SC/ST applicants)",
      "Identity & Address proof",
      "Project report with financial projections",
      "Proof of business premises",
      "Rental / lease agreement if applicable",
    ],
    applyProcess: [
      "Register on standupmitra.in",
      "Get hand-holding support for project report",
      "Branch shortlist & loan application",
      "Sanction & disbursement within 8–10 weeks",
    ],
    officialUrl: "https://www.standupmitra.in/",
  },
  {
    slug: "pm-svanidhi",
    name: "PM SVANidhi",
    short: "Micro-credit for street vendors — collateral-free working capital loans up to ₹50,000 with interest subvention.",
    overview:
      "PM Street Vendor's AtmaNirbhar Nidhi provides collateral-free working capital loans to street vendors. The loan ladder progresses from ₹10,000 → ₹20,000 → ₹50,000 on timely repayment, with 7% interest subvention and cashback on digital transactions.",
    loanAmount: "₹10,000 (1st tranche) / ₹20,000 (2nd) / ₹50,000 (3rd).",
    interestRate: "Lender's prevailing rate, with 7% p.a. interest subvention credited quarterly.",
    subsidy: "7% interest subvention + ₹1,200/year cashback for digital transactions.",
    eligibility: [
      "Street vendor with Certificate of Vending / ID card from Urban Local Body",
      "Vending in urban areas as on / before 24-Mar-2020",
      "Surveyed but not issued CoV — provisional certificate issued",
      "Vendors from peri-urban / rural areas also eligible",
    ],
    documents: [
      "Aadhaar (mandatory)",
      "Voter ID / Driving Licence / PAN",
      "Certificate of Vending or LoR",
      "Bank account details",
    ],
    applyProcess: [
      "Apply at pmsvanidhi.mohua.gov.in or via CSC / partner lender",
      "Vendor verification by ULB",
      "Lender appraisal & sanction",
      "Disbursal in vendor's bank account",
    ],
    officialUrl: "https://pmsvanidhi.mohua.gov.in/",
  },
  {
    slug: "cgtmse",
    name: "CGTMSE — Credit Guarantee for MSEs",
    short: "Credit guarantee on collateral-free loans up to ₹5 crore for Micro & Small Enterprises.",
    overview:
      "CGTMSE provides credit guarantee to member lenders for collateral-free / third-party guarantee-free credit to Micro & Small Enterprises. Guarantee coverage extends up to 85% of the credit facility, enabling MSEs to access bank credit without pledging assets.",
    loanAmount: "Up to ₹5 crore per borrower (composite credit).",
    interestRate: "Lender's prevailing MSME rate (typically 9%–14% p.a.).",
    subsidy: "Up to 85% guarantee coverage. AGF (Annual Guarantee Fee) 0.37%–1.35% based on slab.",
    eligibility: [
      "New & existing Micro & Small Enterprises (manufacturing or service)",
      "Both proprietorship, partnership, LLP and pvt-ltd MSEs",
      "Loan should be collateral-free / no third-party guarantee",
      "Educational / training institutions, SHGs are excluded",
    ],
    documents: [
      "Udyam Registration certificate",
      "Business KYC + Promoter KYC",
      "Financials (2–3 years if existing)",
      "Project report / business plan",
      "GST & ITR returns",
    ],
    applyProcess: [
      "Apply for MSME loan at a CGTMSE-empanelled lender",
      "Lender appraises & sanctions credit under CGS",
      "Lender lodges guarantee with CGTMSE",
      "Disbursal post AGF payment",
    ],
    officialUrl: "https://www.cgtmse.in/",
  },
];
