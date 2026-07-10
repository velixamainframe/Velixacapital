// Velixa Capital — Knowledge Hub, Who-We-Help, Loan-Rejection & Compare content.
// All copy is on-brand Velixa voice: Indian MSME / professional / property investor audience.
// Tagline: "Trust. Growth. Stability. Prosperity."

export type KnowledgeSection = {
  eyebrow?: string;
  heading: string;
  body?: string;
  bullets?: string[];
  cards?: { title: string; body: string }[];
};

export type KnowledgeArticle = {
  slug: string;
  title: string;
  excerpt: string;
  eyebrow: string;
  intro: string;
  sections: KnowledgeSection[];
  faqs?: { q: string; a: string }[];
};

// ---------- KNOWLEDGE HUB (24 articles) ----------
// Grouped into 4 clusters on the index page:
//   A. Why Loan Applications Get Rejected (6)
//   B. Funding Readiness (4)
//   C. Business Finance (5)
//   D. Industry Funding (9)

export const KNOWLEDGE_HUB: KnowledgeArticle[] = [
  // ---------- Cluster A: Why Loan Applications Get Rejected ----------
  {
    slug: "why-loan-applications-get-rejected",
    title: "Why Loan Applications Get Rejected — and How to Fix It Before Re-Applying",
    excerpt:
      "Most rejections are not about your business — they are about how the file reads to an underwriter. The 7 most common rejection triggers, and what to do about each.",
    eyebrow: "Why Rejections Happen",
    intro:
      "Banks don't reject profitable businesses — they reject files that look risky on paper. A single mismatch in CIBIL, banking, GST or ITR can auto-reject a file before a human ever sees it. This guide walks through the seven rejection triggers our advisors see every week, and the exact fix for each.",
    sections: [
      {
        heading: "The 7 most common rejection triggers",
        cards: [
          { title: "Low or thin CIBIL", body: "Score below the lender's cut-off, or a file with too few seasoned tradelines. Many lenders auto-reject below 700; some NBFCs accept 650+ at higher pricing." },
          { title: "High FOIR", body: "Fixed obligations exceed 50–70% of net income. Existing EMIs eat into the eligibility headroom before the new loan is even considered." },
          { title: "Banking red flags", body: "Bounced cheques, ECS returns, cash-heavy deposits, or average balance below the lender's threshold for the ticket size." },
          { title: "GST–ITR mismatch", body: "GST turnover and ITR turnover differ by more than ~20–30%. Underwriters treat this as either under-reporting or over-stating." },
          { title: "Low declared profit", body: "Tax-optimised ITR showing low net profit kills eligibility. DSCR falls below 1.5x even when cash flow is healthy." },
          { title: "Excess credit enquiries", body: "More than 3–4 hard enquiries in 90 days signals credit-hunger. Many lenders treat 6+ in 6 months as an automatic decline." },
          { title: "Sector or vintage policy", body: "Lender's sector exposure cap, or business vintage below their 2/3-year minimum. Outside the policy box — no flexibility." },
        ],
      },
      {
        eyebrow: "What to do next",
        heading: "Diagnose before you re-apply",
        body:
          "Every rejection leaves a footprint on your CIBIL — a fresh enquiry that other lenders can see. Blind re-applications compound the problem. The right sequence is: pull your CIBIL report, read your banking for the last 6 months, reconcile GST to ITR, and only then identify the 1–2 lenders whose policy actually fits your file.",
        bullets: [
          "Pull your CIBIL report once — read it like an underwriter",
          "Get 12-month bank statements, look for bounces & average balance",
          "Reconcile GST turnover to ITR turnover — flag and explain gaps",
          "Compute FOIR and DSCR before approaching any lender",
          "Shortlist 1–2 lenders whose policy box your file fits — not 5",
        ],
      },
    ],
    faqs: [
      {
        q: "Will my CIBIL score drop if I get rejected?",
        a: "A rejection itself is not recorded on CIBIL — but the hard enquiry made when you applied is. Multiple enquiries in a short window signal credit-hunger and lower your score, and most lenders treat 6+ enquiries in 6 months as an auto-decline reason.",
      },
      {
        q: "How long should I wait before re-applying?",
        a: "It depends on what was wrong. A CIBIL enquiry overload needs 6 months of no new applications. A GST–ITR mismatch needs the next return cycle to align. A low-profit ITR needs either a revised structure or a lender that accepts cash-flow underwriting. There is no universal 90-day rule.",
      },
      {
        q: "Should I just go to an NBFC if the bank rejects me?",
        a: "Sometimes — but an NBFC is not a guaranteed yes. NBFCs price higher for higher risk and have their own rejection triggers (vintage, sector, banking). Going straight to an NBFC after a bank rejection often means paying 4–6% more for the same loan. Diagnose first.",
      },
    ],
  },
  {
    slug: "low-cibil-rejection",
    title: "Low CIBIL Rejection — What Score Lenders Actually Want, and How to Recover",
    excerpt:
      "Most lenders don't publish their cut-offs. Here's what they actually look for, why a 'good' 750 can still get rejected, and the 6-month recovery plan.",
    eyebrow: "CIBIL Triggers",
    intro:
      "A CIBIL score is not a single number — it's a composite of payment history, credit mix, utilisation, enquiries and vintage. A 760 with 8 recent enquiries can be rejected where a 720 with a clean 24-month history is approved. This article unpacks how lenders actually read your CIBIL.",
    sections: [
      {
        heading: "What lenders actually look at",
        bullets: [
          "CIBIL score — most banks 720+, most NBFCs 650+, fintechs 600+",
          "Number of unsecured active trades (personal loans, credit cards)",
          "Hard enquiries in the last 6 and 12 months",
          "Any written-off, settled, or DPD (days past due) >30 markers",
          "Credit utilisation ratio on revolving lines (cards, OD)",
          "Vintage of oldest trade — a young file is riskier than an old one",
        ],
      },
      {
        heading: "Why a 750+ score can still get rejected",
        body:
          "Score is necessary but not sufficient. A 760 with 12 enquiries in 6 months, or a 780 with a recently settled credit card, or a 770 with 6 unsecured personal loans active — each of these gets declined by policy, even though the score looks fine. The score gets you in the door; the underlying report decides.",
        cards: [
          { title: "Enquiry overload", body: "Even at 760+, more than 4 hard enquiries in 90 days triggers credit-hungry flags at most banks." },
          { title: "Settled / written-off", body: "A 'Settled' status stays on CIBIL for 7 years. Many banks treat any settled trade as an automatic decline." },
          { title: "Too many unsecured trades", body: "5+ active unsecured personal loans or unsecured credit cards maxed out signals over-leverage." },
          { title: "Young credit file", body: "A 760 score on a 6-month-old file with one card is weaker than a 720 on a 10-year file with a clean home loan." },
        ],
      },
      {
        eyebrow: "Recovery plan",
        heading: "The 6-month CIBIL recovery sequence",
        bullets: [
          "Stop applying for any new credit for 6 months — every enquiry hurts",
          "Pay every EMI and card bill on or before the due date — set auto-debit",
          "Bring credit card utilisation below 30% of the limit",
          "Don't close your oldest card — vintage matters",
          "If you have a settled account, get a written closure and follow up with the bureau",
          "Re-check CIBIL after 6 months before approaching any lender",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I get a loan with a CIBIL score of 650?",
        a: "Possibly — most NBFCs and fintech lenders accept 650+ for unsecured loans at higher pricing (typically 18–30% p.a.). Some banks accept 650+ for secured loans (LAP, gold loan). For an unsecured business loan at competitive bank rates, you usually need 720+.",
      },
      {
        q: "How fast can a CIBIL score improve?",
        a: "Visible improvement usually takes 3–6 months of clean behaviour. On-time payments and lower utilisation show up first; the impact of stopping new enquiries compounds over 6–12 months. There is no legitimate 'quick fix' — avoid any agent promising overnight score jumps.",
      },
      {
        q: "Does checking my own CIBIL hurt the score?",
        a: "No. A self-check is a 'soft enquiry' and has zero impact on the score. Only lender-initiated 'hard enquiries' affect it. You should check your own CIBIL at least once a year, and definitely before applying for any loan.",
      },
    ],
  },
  {
    slug: "gst-mismatch-rejection",
    title: "GST–ITR Mismatch Rejection — Why Turnover Reconciliation Is Non-Negotiable",
    excerpt:
      "A 3x gap between GST turnover and ITR turnover is the single most common auto-reject trigger for MSME files. Here's how to reconcile and explain.",
    eyebrow: "GST Reconciliation",
    intro:
      "Underwriters reconcile your GST turnover to your ITR turnover before anything else. If GST says ₹2 Cr and ITR says ₹60 L, the system flags it as either under-reported income or over-stated turnover — both are decline reasons. This guide explains the reconciliation threshold, what counts as a justified gap, and how to present it.",
    sections: [
      {
        heading: "The reconciliation rule of thumb",
        bullets: [
          "GST turnover ≈ ITR turnover ± 10–15% — clean file",
          "GST turnover > ITR turnover by 20–50% — needs explanation, often approvable",
          "GST turnover > ITR turnover by >50% (or 2x+) — high decline risk",
          "GST turnover > ITR turnover by 3x+ — most lenders auto-reject",
          "GST turnover < ITR turnover — usually means exempt income (justifiable)",
        ],
      },
      {
        heading: "Why the gap exists — and which gaps are legitimate",
        cards: [
          { title: "Exempt / non-GST sales", body: "Items exempt under GST or sold to unregistered buyers (B2C under threshold) don't appear in GSTR-1 the same way. Maintain a schedule." },
          { title: "Stock transfers", body: "Branch transfers are not 'sales' for ITR but show up in GST. Cross-reference with the stock transfer register." },
          { title: "Year-end cut-off", body: "Sales billed in March but recognised in April can create a one-month mismatch. Annual reconciliation usually resolves it." },
          { title: "Cash sales not in books", body: "The dangerous one. If GST captures sales your books don't, the lender assumes suppressed income — decline." },
          { title: "Composition dealer", body: "Composition dealers don't file detailed GSTR-1 — the reconciliation works differently and some lenders accept alternate proofs." },
        ],
      },
      {
        eyebrow: "Fix it before applying",
        heading: "How to prepare a reconciliation note",
        body:
          "If your GST and ITR turnover diverge, prepare a one-page reconciliation before approaching any lender. Show the GST turnover, ITR turnover, the gap, and a line-by-line explanation of the difference (exempt sales, stock transfer, year-end cut-off, etc). A clean reconciliation note turns a likely decline into a discussion.",
        bullets: [
          "Print GSTR-1 annual consolidated + GSTR-3B annual",
          "Pull ITR (P&L schedule) for the same year",
          "List every reconciling line item with amount and reason",
          "Get your CA to sign the reconciliation note",
          "Carry this note to every lender meeting — don't wait to be asked",
        ],
      },
    ],
    faqs: [
      {
        q: "Will a 20% gap between GST and ITR get me rejected?",
        a: "Not necessarily. A 20% gap with a clean explanation (exempt sales, stock transfers, year-end timing) is usually acceptable to most banks. The decline triggers are typically gaps above 50% with no documentation, or gaps above 2–3x which most systems auto-reject.",
      },
      {
        q: "I haven't filed GST for the last 2 quarters — can I still apply?",
        a: "Most lenders require the last 6–12 months of GST returns filed and current. Pending returns is itself a decline reason at many banks — it signals compliance risk. File the pending returns, wait for them to reflect on the portal, then apply.",
      },
      {
        q: "Can I use GST turnover to get a bigger loan than my ITR supports?",
        a: "Partially. NBFCs and fintech lenders have GST-based programs that lean on turnover rather than ITR profit. But these come at higher pricing (16–24% p.a.) and lower tenures. To get a bank-rate loan sized to your real turnover, both GST and ITR need to support it.",
      },
    ],
  },
  {
    slug: "banking-red-flags",
    title: "Banking Red Flags — What Underwriters See in Your 12-Month Statement",
    excerpt:
      "Average balance, bounces, cash deposits, irregular credits — your bank statement is read like an X-ray. Here's what every line tells the lender.",
    eyebrow: "Banking Analysis",
    intro:
      "Lenders don't just look at your closing balance — they read the whole 6–12 month statement for behaviour signals. Bounced cheques, ECS returns, cash-heavy deposits, round-number transfers and lumpy credits all tell a story. This article explains what underwriters look for and how to clean up your banking before applying.",
    sections: [
      {
        heading: "The 8 banking red flags underwriters flag",
        bullets: [
          "Cheque/ECS bounces — even one in 6 months is a yellow flag",
          "Average monthly balance (AMB) far below the requested EMI",
          "Cash deposits >30% of total credits — untraceable income",
          "Round-number large credits — flagged as informal lending",
          "Negative balance days or OD hitting the limit repeatedly",
          "Same-day in-and-out large transactions (round-tripping)",
          "No salary/business credits visible in the primary account",
          "Multiple loan EMIs already debiting from the same account",
        ],
      },
      {
        heading: "What 'good banking' looks like",
        cards: [
          { title: "AMB at 1.5x–2x the proposed EMI", body: "If your proposed EMI is ₹50,000, the lender wants to see an average balance of ₹75,000–1,00,000 maintained comfortably." },
          { title: "Visible business credits", body: "Regular RTGS/NEFT/UPI credits from named parties, not cash deposits. Reconcilable to GST sales." },
          { title: "Zero or minimal bounces", body: "6 months with zero bounces is ideal; one minor bounce is usually acceptable if explained. 3+ bounces is a decline." },
          { title: "Clean EMI pattern", body: "Existing loan EMIs debit on the same date every month — shows discipline, not scrambling." },
          { title: "Build-up, not round-tripping", body: "Balance grows gradually over months, not swing-wildly day-to-day with mirror transactions." },
        ],
      },
      {
        eyebrow: "Pre-application cleanup",
        heading: "6 months before applying, do this",
        body:
          "If you know you'll need a loan in 6–12 months, start preparing your primary bank account now. Route all business credits through one account, maintain AMB, avoid bounces, and stop cash deposits where possible. Banking history is built over months — it cannot be faked in weeks.",
        bullets: [
          "Pick one primary account — route all business credits there",
          "Stop cash deposits; insist on UPI/RTGS/NEFT from named parties",
          "Set up auto-debit for every existing EMI — never miss a date",
          "Maintain AMB at least 1.5x the proposed EMI",
          "Avoid large round-number transfers in and out",
          "Don't apply for any new unsecured credit during this period",
        ],
      },
    ],
    faqs: [
      {
        q: "I have 2 cheque bounces in the last 6 months — will I be rejected?",
        a: "Two bounces in 6 months is a yellow flag for most banks. Some will decline outright; others may approve at a higher rate or with a co-applicant. If the bounces were technical (small amounts, immediately settled), get a letter from the bank explaining the same — it can rescue the file.",
      },
      {
        q: "Should I switch my salary/business account to a different bank before applying?",
        a: "No — a brand-new account has no history and is worse than a 2-year-old account with one bounce. Lenders want 12 months of behaviour in the same account. If you must switch, do it 12+ months before applying, and keep the old account active in parallel.",
      },
      {
        q: "Does the lender need bank statements for all my accounts or just one?",
        a: "Usually the primary operating account for the last 12 months. If you have a separate salary account or another current account with significant credits, the lender may ask for those too. Hiding an account that an underwriter later discovers is a fraud flag — disclose upfront.",
      },
    ],
  },
  {
    slug: "high-foir-issues",
    title: "High FOIR — How Existing EMIs Quietly Kill Your Loan Eligibility",
    excerpt:
      "FOIR (Fixed Obligations to Income Ratio) caps how much of your income can go to EMIs. Most lenders cap at 50–70%. Here's how to compute it and what to do if you're over.",
    eyebrow: "FOIR & Eligibility",
    intro:
      "Even with a great CIBIL and clean banking, your eligibility can collapse if your existing EMIs already consume too much of your income. FOIR is the ratio of all fixed monthly obligations to net monthly income. Most banks cap at 50–60%; NBFCs go up to 65–70%. This guide explains the calculation and the levers you have.",
    sections: [
      {
        heading: "How FOIR is calculated",
        body:
          "FOIR = (Sum of all existing monthly EMIs + proposed EMI) ÷ Net monthly income. Net income means income after statutory deductions (PF, PT, TDS) but before discretionary spends. For self-employed/business, it's the average monthly net profit as per the latest ITR + depreciation + interest paid back.",
        bullets: [
          "Existing home loan EMI: ₹45,000",
          "Existing car loan EMI: ₹12,000",
          "Existing personal loan EMI: ₹8,000",
          "Credit card minimum due (5% of limit utilised): ₹5,000",
          "Total existing obligations: ₹70,000",
          "If net income is ₹1,50,000 — current FOIR is 47%, leaving ~10–23% headroom",
        ],
      },
      {
        heading: "Lender FOIR caps (typical, indicative)",
        cards: [
          { title: "Public-sector banks", body: "Usually 50% FOIR cap. Conservative — they leave 50% of net income for living expenses and buffer." },
          { title: "Private banks", body: "Usually 55–60% FOIR cap. Slightly more flexible if banking and CIBIL are strong." },
          { title: "NBFCs", body: "Usually 60–70% FOIR cap. Will go higher with collateral or strong cash flow." },
          { title: "Fintech lenders", body: "Up to 70–75% FOIR, but at significantly higher pricing (18–30% p.a.)." },
        ],
      },
      {
        eyebrow: "Lower your FOIR",
        heading: "What to do if your FOIR is too high",
        bullets: [
          "Prepay and close small existing loans — even a ₹5 L personal loan closure helps",
          "Increase the tenure of an existing loan to reduce its EMI (refinance if needed)",
          "Add a co-applicant with separate income — combined FOIR improves",
          "Shift the loan to a secured instrument (LAP) — lower rate, longer tenure, lower EMI",
          "Time the application after a salary hike or a high-profit ITR year",
          "Avoid applying for unsecured credit — go secured if FOIR is borderline",
        ],
      },
    ],
    faqs: [
      {
        q: "Does credit card utilisation count in FOIR?",
        a: "Most lenders count 5% of the credit card limit as a monthly obligation (the minimum due), regardless of how much you've actually spent. Some count 5% of the utilised amount. Either way, maxed-out cards hurt your FOIR — pay them down before applying.",
      },
      {
        q: "Can I close a loan just before applying to reduce FOIR?",
        a: "Yes, but timing matters. The closure must reflect on your CIBIL (can take 30–45 days) before the new lender pulls your report. Apply for the closure, wait for the No Objection Certificate (NOC) and the CIBIL update, then approach the new lender.",
      },
      {
        q: "Will the lender count my spouse's EMIs in my FOIR?",
        a: "Only if you're a co-borrower on those loans or your spouse is a co-applicant on this loan. If you apply individually, only your own obligations count — but the lender may still ask about household EMIs as a soft factor.",
      },
    ],
  },
  {
    slug: "low-profit-declaration",
    title: "Low Profit Declaration — When Tax Optimisation Kills Loan Eligibility",
    excerpt:
      "Aggressive tax planning keeps your ITR profit low — and your loan eligibility collapses with it. The DSCR problem, and how to balance tax with borrowing capacity.",
    eyebrow: "Profit & DSCR",
    intro:
      "Many MSME owners optimise ITR to minimise tax — showing just enough profit to be credible. This is great for tax, terrible for borrowing. Lenders underwrite on declared profit. A business making ₹50 L cash profit but declaring ₹8 L on ITR will struggle to get a ₹25 L loan — DSCR fails. This article explains the trade-off and the strategies.",
    sections: [
      {
        heading: "DSCR — the underwriting metric that kills low-profit files",
        body:
          "DSCR (Debt Service Coverage Ratio) = Net Cash Flow Available for Debt Service ÷ Annual Debt Service. Most banks require 1.5x+; some NBFCs accept 1.25x. If your declared profit + interest + depreciation (EBITDA proxy) is ₹10 L and proposed EMI is ₹9 L/year, DSCR is 1.11x — auto-decline at most banks.",
        cards: [
          { title: "DSCR < 1.0x", body: "Insufficient cash flow to service the debt. Universal decline — no lender will approve." },
          { title: "DSCR 1.0–1.25x", body: "Borderline. Only NBFCs and fintechs at higher pricing; banks decline." },
          { title: "DSCR 1.25–1.5x", body: "Approvable at NBFCs; private banks may approve with strong banking/CIBIL." },
          { title: "DSCR 1.5–1.75x", body: "Sweet spot — most banks approve at competitive rates." },
          { title: "DSCR 1.75x+", body: "Strong file — eligible for premium rates and higher ticket sizes." },
        ],
      },
      {
        heading: "Why 'showing less profit' hurts more than it saves",
        body:
          "Tax saved on ₹20 L of suppressed profit at 30% = ₹6 L. Loan eligibility lost due to that same suppression: easily ₹40–60 L of borrowing capacity (since banks lend ~4–6x EBITDA). The cost of the lost loan opportunity is far higher than the tax saved, especially for growing businesses that need capital to scale.",
        bullets: [
          "Tax saved by suppressing ₹20 L profit: ~₹6 L (one-time)",
          "Loan eligibility lost on ₹20 L suppressed profit: ~₹40–60 L",
          "Cost of higher-rate NBFC vs bank-rate loan on ₹50 L for 5 yrs: ~₹6–8 L extra interest",
          "Future funding rounds compound the loss — each year of low-profit ITR hurts",
        ],
      },
      {
        eyebrow: "Strategies",
        heading: "Balancing tax efficiency with borrowing capacity",
        bullets: [
          "Declare at least enough profit to support your target loan's DSCR (1.5x)",
          "Don't over-claim depreciation if you'll need a loan in the next 24 months",
          "Keep the last 2 years' ITR clean — lenders average 2 years' profit",
          "If you've already declared low profit, wait a year and declare higher before applying",
          "Consider a secured loan (LAP) — DSCR matters less when the loan is collateral-backed",
          "Build a clean MIS that shows actual cash flow alongside ITR — some lenders will look",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I show my real cash flow to the lender instead of ITR profit?",
        a: "Some NBFCs and fintechs accept bank-statement-based cash-flow underwriting, but at higher rates. Banks almost always underwrite on ITR. If your ITR profit is too low for a bank loan, your realistic options are: wait a year and declare higher, or take a secured/collateral-backed loan.",
      },
      {
        q: "I've already filed a low-profit ITR this year — what can I do now?",
        a: "Three options: (1) File a revised ITR if you're within the revision window; (2) Wait for the next assessment year and declare higher; (3) Approach a lender that accepts bank-statement underwriting (typically NBFCs at 16–24% p.a.). Each has trade-offs — talk to an advisor before picking one.",
      },
      {
        q: "Will adding back depreciation and interest help my DSCR?",
        a: "Yes — most lenders add back depreciation and interest on existing loans to compute EBITDA, then divide by proposed annual EMI. So a ₹10 L declared profit with ₹4 L depreciation and ₹3 L interest gives a ₹17 L EBITDA base, not ₹10 L. Make sure your advisor presents this correctly.",
      },
    ],
  },

  // ---------- Cluster B: Funding Readiness (4) ----------
  {
    slug: "how-credit-managers-evaluate-files",
    title: "How Credit Managers Actually Evaluate Your File — The 6-Lens Framework",
    excerpt:
      "Every credit manager reads your file through the same six lenses. Understanding what each lens reveals helps you fix the right things before submitting.",
    eyebrow: "Underwriting Insight",
    intro:
      "Credit managers don't read files randomly — they use a structured 6-lens framework: CIBIL, banking, ITR, GST, obligations and collateral. Each lens has pass/fail thresholds and weighted scores. Understanding the framework lets you self-diagnose your file the way an underwriter will read it.",
    sections: [
      {
        heading: "The 6 underwriting lenses",
        cards: [
          { title: "1. CIBIL lens", body: "Score, recent enquiries, settled/written-off markers, unsecured trade count. Pass threshold varies by lender." },
          { title: "2. Banking lens", body: "12-month average balance, bounce count, credit pattern, cash-deposit ratio, EMI debit pattern." },
          { title: "3. ITR lens", body: "Last 2–3 years' declared profit, growth trend, EBITDA, DSCR computation basis." },
          { title: "4. GST lens", body: "GSTR-1 / 3B turnover, reconciliation to ITR, compliance consistency (any pending returns?)." },
          { title: "5. Obligations lens", body: "Existing EMIs, FOIR computation, credit card utilisation, contingent liabilities (guarantees)." },
          { title: "6. Collateral lens", body: "For secured loans — property title, valuation, LTV, encumbrance, income from property." },
        ],
      },
      {
        heading: "How the lenses combine into a decision",
        body:
          "Most lenders use a weighted scorecard: CIBIL 20%, Banking 20%, ITR 20%, GST 15%, Obligations 15%, Collateral 10% (for secured). A fail in any one lens doesn't always mean decline — a strong collateral lens can offset a borderline CIBIL, but a fail in CIBIL or banking usually kills the file regardless of strengths elsewhere.",
        bullets: [
          "CIBIL fail → auto-decline at most banks, regardless of other strengths",
          "Banking fail → auto-decline; no amount of profit makes up for bounced cheques",
          "ITR/GST fail → often approvable at NBFCs or with collateral",
          "Obligations fail (FOIR) → approvable with co-applicant or longer tenure",
          "Collateral strength → can lift an otherwise borderline file to approval",
        ],
      },
      {
        eyebrow: "Self-diagnosis",
        heading: "Run your file through the 6 lenses before applying",
        bullets: [
          "Pull your CIBIL report — score, enquiries, any settled/written-off trades",
          "Get 12 months of bank statements — count bounces, compute AMB",
          "Pull last 3 years' ITR — compute average profit and growth trend",
          "Pull GSTR-1 + 3B for 12 months — reconcile to ITR turnover",
          "List all existing EMIs + credit card min dues — compute FOIR",
          "List any properties you can offer as collateral — get indicative valuation",
        ],
      },
    ],
    faqs: [
      {
        q: "Which lens matters most?",
        a: "CIBIL and banking are pass/fail gates — a failure here usually means auto-decline regardless of other strengths. ITR and GST determine ticket size and rate. Obligations determine EMI affordability. Collateral can lift an otherwise borderline file. The order of importance is roughly: CIBIL ≥ Banking > ITR ≈ GST > Obligations > Collateral.",
      },
      {
        q: "Can a strong collateral lens offset a weak CIBIL?",
        a: "Partially. A clean property at 50% LTV can rescue a 680 CIBIL file at most NBFCs and some private banks. But a 580 CIBIL with a written-off trade will usually be declined even with gold-standard collateral — the credit-hunger signal is too strong.",
      },
      {
        q: "What if I'm strong on 5 lenses but weak on one?",
        a: "It depends which one. Weak on collateral → go unsecured, accept slightly higher rate. Weak on obligations → add co-applicant or prepay a small loan. Weak on ITR → wait a year or take a GST-based NBFC loan. Weak on CIBIL/banking → fix before applying anywhere; blind re-application compounds the problem.",
      },
    ],
  },
  {
    slug: "dscr-explained",
    title: "DSCR Explained — The Ratio That Decides Your Loan Size",
    excerpt:
      "Debt Service Coverage Ratio: how it's computed, what threshold each lender requires, and how to improve yours before applying.",
    eyebrow: "DSCR Deep Dive",
    intro:
      "DSCR (Debt Service Coverage Ratio) is the single most important ratio for any business loan. It tells the lender whether your business generates enough cash to comfortably service the proposed loan. A DSCR of 1.5x means your cash flow is 1.5 times the annual EMI — banks see this as a 50% safety margin.",
    sections: [
      {
        heading: "The DSCR formula",
        body:
          "DSCR = (Net Profit + Interest + Depreciation + Non-cash expenses) ÷ (Annual EMI on proposed loan + existing loan EMIs). The numerator is essentially EBITDA. The denominator is total debt service. Most Indian banks require 1.5x minimum; some NBFCs accept 1.25x; foreign banks and PSU banks often want 1.75x or higher.",
        bullets: [
          "Numerator (EBITDA proxy): Net Profit + Interest + Depreciation + Amortisation",
          "Denominator: Sum of all annual EMIs (existing + proposed)",
          "PSU banks: 1.75x+ preferred, 1.5x minimum",
          "Private banks: 1.5x minimum, 1.25x with strong collateral",
          "NBFCs: 1.25x minimum, sometimes lower for secured",
          "Fintech: 1.1–1.25x (cash-flow based underwriting, higher pricing)",
        ],
      },
      {
        heading: "DSCR bands and what they mean",
        cards: [
          { title: "DSCR < 1.0x", body: "Insufficient cash flow. Universal decline — no lender will approve. Restructure or wait." },
          { title: "DSCR 1.0–1.25x", body: "Tight. Only NBFCs at higher pricing, often with collateral. Banks decline." },
          { title: "DSCR 1.25–1.5x", body: "Borderline. NBFCs approve readily; private banks may approve with strong banking/CIBIL." },
          { title: "DSCR 1.5–1.75x", body: "Comfortable. Most banks approve at competitive rates. Sweet spot for unsecured loans." },
          { title: "DSCR 1.75–2.0x", body: "Strong. Premium rates, higher ticket sizes, longer tenures available." },
          { title: "DSCR 2.0x+", body: "Excellent. Top-tier bank rates, max ticket, max tenure. May be eligible for negotiated pricing." },
        ],
      },
      {
        eyebrow: "Improve DSCR",
        heading: "How to lift your DSCR before applying",
        bullets: [
          "Declare higher profit in next ITR — directly raises EBITDA",
          "Prepay existing small loans — reduces denominator",
          "Increase proposed loan tenure — reduces annual EMI in denominator",
          "Restructure existing debt to longer tenure — same as above",
          "Add co-applicant with separate income — combined EBITDA, shared obligations",
          "Show non-operating income (rental, interest) — adds to numerator if documented",
        ],
      },
    ],
    faqs: [
      {
        q: "What if my DSCR is below 1.5x but my business is genuinely profitable?",
        a: "If your DSCR is below 1.5x because of tax-optimised low profit, the lender will still read it as weak — they underwrite on declared numbers. Options: wait a year and declare higher profit, take a secured loan (DSCR matters less with collateral), or approach an NBFC with bank-statement underwriting.",
      },
      {
        q: "Does EMI for an existing home loan count in the denominator?",
        a: "Yes — all existing loan EMIs are included. If your home loan EMI is ₹60,000/year... actually it's ₹60,000/month = ₹7,20,000/year, and your proposed business loan EMI is ₹30,000/month = ₹3,60,000/year, the denominator is ₹10,80,000. If EBITDA is ₹16 L, DSCR is 1.48x — borderline.",
      },
      {
        q: "Can I get a longer tenure to reduce EMI and improve DSCR?",
        a: "Yes, up to the lender's maximum tenure. Unsecured business loans cap at 5 years (some 7); LAP can go to 15; home loans to 30. Longer tenure reduces EMI, raises DSCR, but increases total interest paid. The trade-off works if eligibility is the binding constraint.",
      },
    ],
  },
  {
    slug: "foir-explained",
    title: "FOIR Explained — The Affordability Ratio Lenders Don't Talk About",
    excerpt:
      "Fixed Obligations to Income Ratio: how it caps your eligibility, the difference between gross and net FOIR, and what counts as a 'fixed obligation'.",
    eyebrow: "FOIR Deep Dive",
    intro:
      "FOIR is the lender's way of ensuring you don't over-borrow. It caps the percentage of your net income that can go to EMIs. Most banks cap at 50–60%; NBFCs go up to 70%. FOIR is different from DSCR — DSCR is business cash flow vs debt service; FOIR is personal affordability. Both must pass.",
    sections: [
      {
        heading: "FOIR vs DSCR — what's the difference?",
        cards: [
          { title: "FOIR", body: "Personal affordability: all your fixed obligations ÷ your net income. Used for both salaried and self-employed. Most banks cap at 50–60%." },
          { title: "DSCR", body: "Business cash flow: EBITDA ÷ annual debt service. Used for business loans. Most banks require 1.5x+." },
          { title: "When FOIR matters more", body: "Personal loans, home loans, salaried applicant files, small-ticket business loans." },
          { title: "When DSCR matters more", body: "Large-ticket business loans, MSME term loans, LAP for business purpose." },
          { title: "When both matter", body: "Self-employed applicants for business loans — lender checks both. A pass on one and fail on the other usually means decline." },
        ],
      },
      {
        heading: "What counts as a 'fixed obligation'?",
        bullets: [
          "All existing loan EMIs (home, car, personal, business, education, gold)",
          "Credit card minimum dues (typically 5% of limit or utilised, varies by lender)",
          "Overdraft interest servicing (averaged or 1% of limit per month)",
          "Statutory obligations like PF/ESI if self-employed with employees",
          "Rent paid (some lenders count, most don't)",
          "Insurance premiums (some lenders count, most don't)",
          "Proposed EMI on the new loan you're applying for",
        ],
      },
      {
        eyebrow: "Practical example",
        heading: "FOIR worked example — and how to fix it",
        body:
          "Self-employed professional earning ₹2,00,000 net monthly. Existing obligations: home loan EMI ₹55,000, car loan EMI ₹15,000, personal loan EMI ₹12,000, credit card min due ₹8,000. Total obligations = ₹90,000. Current FOIR = 45%. At a 60% FOIR cap, headroom is ₹30,000/month — supports a new EMI of ~₹30,000, which is roughly a ₹15 L loan at 12% for 5 years.",
        bullets: [
          "Prepay the ₹12,000/month personal loan → frees ₹12,000 of FOIR headroom",
          "Prepay the car loan → frees ₹15,000 of headroom",
          "Pay down the credit card → reduces the 5% min due obligation",
          "Add spouse with ₹1,00,000 income → combined FOIR drops to ~38%",
          "Take a secured LAP instead — FOIR cap is more flexible on secured",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is my eligibility lower than my EMI affordability suggests?",
        a: "Because lenders apply the lower of two caps: FOIR-based eligibility (income-based) and DSCR-based eligibility (cash-flow-based). If FOIR says you can afford ₹40,000 EMI but DSCR says only ₹25,000, the lender caps you at ₹25,000. Conversely, if DSCR is strong but FOIR is tight (due to other EMIs), FOIR caps you.",
      },
      {
        q: "Does the lender include my spouse's EMIs in my FOIR?",
        a: "Only if you're a co-borrower on those loans, or your spouse is a co-applicant on the new loan. If you apply solo, the lender sees only your obligations. But the lender may still ask about household EMI burden as a soft factor in the underwriting memo.",
      },
      {
        q: "If I have an overdraft, does the OD limit count in FOIR?",
        a: "Most lenders count 1–2% of the OD limit as a monthly obligation (proxy for interest servicing), regardless of actual utilisation. So a ₹20 L OD adds ₹20,000–40,000 to your monthly obligations. Some lenders only count actual utilisation — clarify with the lender upfront.",
      },
    ],
  },
  {
    slug: "gst-vs-itr",
    title: "GST vs ITR — Which Turnover Figure Lenders Actually Use",
    excerpt:
      "Banks underwrite on ITR turnover. NBFCs sometimes use GST. The mismatch between the two is the real killer. Here's what to know.",
    eyebrow: "GST vs ITR",
    intro:
      "GST and ITR tell two different stories about your turnover. GST captures sales as billed; ITR captures sales as recognised for tax. They should match within 10–20%. When they don't, lenders see risk. Understanding which figure each lender uses — and how to handle the gap — is core to getting approved.",
    sections: [
      {
        heading: "Who underwrites on what",
        cards: [
          { title: "PSU banks", body: "Almost always ITR-based. GST is used only for cross-verification. A clean ITR with weak GST is preferable to the reverse." },
          { title: "Private banks", body: "Mostly ITR-based; some have GST-based programs for small-ticket MSME loans (typically up to ₹25–50 L)." },
          { title: "NBFCs", body: "Mix of both. Bajaj, L&T, Tata Capital have GST-based programs. Pricing is higher (16–24% p.a.)." },
          { title: "Fintech lenders", body: "Predominantly GST- and banking-based. Fast approval, smaller tickets (₹5–25 L), higher rates (18–30%)." },
          { title: "CGTMSE scheme loans", body: "Bank/NBFC underwrites per their own policy; CGTMSE provides the guarantee. Most still use ITR." },
        ],
      },
      {
        heading: "Why GST and ITR diverge — and which gaps matter",
        bullets: [
          "Exempt / non-GST sales → appears in ITR, not GST. Legitimate, explainable",
          "B2C sales to unregistered buyers → in GST (GSTR-1), in ITR. No gap expected",
          "Stock transfers between branches → in GST, not in ITR turnover. Explainable",
          "Composition scheme → GST turnover capped at threshold; ITR shows actual",
          "Year-end cut-off timing → one-month mismatch, annual reconciliation resolves",
          "Cash sales not in books → in GST if charged, but if books don't capture → red flag",
          "Suppressed ITR turnover → if GST shows higher, lender sees under-reporting → decline",
        ],
      },
      {
        eyebrow: "Practical guidance",
        heading: "How to present turnover to a lender",
        body:
          "Always present ITR turnover as the primary figure for bank loans, with GST as corroboration. For NBFC GST-based programs, present GST turnover with ITR as supporting. If they diverge, prepare a signed reconciliation note before the meeting — don't wait to be asked. A prepared reconciliation turns a decline into a discussion.",
        bullets: [
          "Pull 3 years of ITR + 12 months of GST returns before approaching any lender",
          "Compute the turnover gap and prepare a line-by-line reconciliation",
          "Get your CA to sign the reconciliation — adds credibility",
          "Identify which lenders' programs fit your stronger figure (ITR or GST)",
          "Don't apply to 5 lenders at once — pick 1–2 whose policy matches your profile",
        ],
      },
    ],
    faqs: [
      {
        q: "My GST turnover is much higher than ITR — can I still get a loan?",
        a: "Possibly, depending on the gap. Up to 20% gap with explanation: most banks accept. 20–50% gap: NBFCs accept, banks are wary. 50%+ gap: most lenders decline unless you can prove the gap is from exempt sales or stock transfers. A 3x gap is almost always an auto-decline.",
      },
      {
        q: "I'm a composition dealer — does GST-based lending work for me?",
        a: "Limited. Most GST-based lenders require regular scheme registration with GSTR-1 + 3B filings. Composition dealers' returns don't carry the same data. You'll typically need to fall back on ITR-based bank lending, or migrate to regular scheme (which has its own compliance cost).",
      },
      {
        q: "Should I rely on GST-based fintech loans for fast funding?",
        a: "GST-based fintech loans are fast (often 3–7 days) but expensive (18–30% p.a.) and short-tenure (12–36 months). They work for short-term working capital needs where speed matters more than cost. For longer-term or larger-ticket needs, ITR-based bank loans are almost always cheaper.",
      },
    ],
  },

  // ---------- Cluster C: Business Finance (5) ----------
  {
    slug: "banking-analysis",
    title: "Banking Analysis — Reading Your Bank Statement Like an Underwriter",
    excerpt:
      "Average balance, credit pattern, bounce count, cash-deposit ratio — every line on your statement tells the lender something. Learn what they see.",
    eyebrow: "Banking Analysis",
    intro:
      "Your bank statement is the most honest document in your loan file — it shows actual money in and out, not optimised accounting. Underwriters read it carefully. This guide walks through the 12 metrics they look for, how each is computed, and what 'good' looks like for the ticket size you're seeking.",
    sections: [
      {
        heading: "12 metrics underwriters extract from your statement",
        cards: [
          { title: "Average monthly balance (AMB)", body: "Sum of daily closing balances ÷ number of days. Lenders want AMB at 1.5–2x proposed EMI." },
          { title: "Bounce count (cheque/ECS)", body: "Number of dishonours in 6–12 months. Zero is ideal; 3+ is usually a decline." },
          { title: "Cash deposit ratio", body: "Cash deposits ÷ total credits. Lenders prefer <10%; >30% is a red flag." },
          { title: "Credit pattern", body: "Regularity of business credits — RTGS/NEFT/UPI from named parties, reconcilable to sales." },
          { title: "Round-number transactions", body: "Large round-amount credits/debits (₹5,00,000 in, ₹5,00,000 out same day) flagged as round-tripping." },
          { title: "EMI debit pattern", body: "Existing EMIs debit consistently on the same date — shows discipline. Missed dates are red flags." },
          { title: "Negative balance days", body: "Any day the account went negative. Most lenders treat even 1 such day as a yellow flag." },
          { title: "OD utilisation pattern", body: "For OD accounts: average utilisation, peak utilisation, time spent near limit." },
          { title: "Cheque return inward", body: "Cheques you deposited that bounced. Different from your outward bounces; still a signal." },
          { title: "Concentration of credits", body: "If 1–2 parties are 70%+ of credits, that's concentration risk — what if they stop?" },
          { title: "End-of-month balance trend", body: "Does the balance build up over months or stay flat/decline? Trend matters more than absolute level." },
          { title: "Multiple account pattern", body: "Are you routing income through many accounts? Fragmented banking weakens the file." },
        ],
      },
      {
        heading: "What 'good banking' looks like for a ₹25 L loan",
        body:
          "For a ₹25 L unsecured business loan at 12% for 5 years, EMI is ~₹55,000/month. Lenders want to see: AMB of ₹1,00,000+ comfortably maintained, zero bounces in last 6 months, cash deposit ratio <15%, regular business credits from named parties, existing EMIs (if any) debiting on time, and a gradually building balance trend.",
        bullets: [
          "AMB ≥ ₹1,00,000 (≈2x proposed EMI)",
          "Zero bounces in last 6 months (1 acceptable if technical)",
          "Cash deposit ratio <15%",
          "Credit pattern regular — UPI/RTGS/NEFT from named parties",
          "Existing EMI debits consistent on date",
          "End-of-month balance growing or stable",
        ],
      },
      {
        eyebrow: "Pre-application preparation",
        heading: "Build your banking profile over 6–12 months before applying",
        bullets: [
          "Consolidate to one primary account — route all business income there",
          "Stop cash deposits; insist on digital transfers from named parties",
          "Set up auto-debit for every existing EMI",
          "Maintain AMB at least 2x the EMI you'll eventually apply for",
          "Avoid round-number large transfers in and out",
          "Get 12 months of clean banking before applying",
        ],
      },
    ],
    faqs: [
      {
        q: "I have multiple current accounts — does that hurt?",
        a: "It can. Multiple active current accounts fragment your banking profile — the lender can't see the full picture in one statement. Pick one primary account, route all major credits there, and minimise activity in the others. Ideally one strong account is better than three average ones.",
      },
      {
        q: "Will the lender ask for statements of all my accounts?",
        a: "Mostly just the primary operating account for 12 months. But the lender may ask for other accounts if your CIBIL shows EMIs being paid from a different account, or if your stated income doesn't match the primary account's credits. Disclose upfront — hiding accounts is worse.",
      },
      {
        q: "I had a cheque bounce 4 months ago — should I wait or apply now?",
        a: "One bounce in 6 months is usually explainable, especially if it was a small amount or a technical bounce (e.g., signature mismatch). Get a letter from the bank explaining the reason. Apply with the explanation ready. If you have 2+ bounces, wait until they're 6+ months in the past.",
      },
    ],
  },
  {
    slug: "funding-readiness",
    title: "Funding Readiness — The 6 Pillars of an Approval-Ready File",
    excerpt:
      "CIBIL, banking, ITR, GST, obligations, collateral — six pillars must all hold. A weakness in any one can sink an otherwise strong file.",
    eyebrow: "Funding Readiness",
    intro:
      "Funding readiness isn't about being 'good enough' — it's about having all six pillars hold up under underwriter scrutiny. A 780 CIBIL doesn't help if your banking has bounces; a strong ITR doesn't help if GST turnover mismatches. This article outlines the six pillars and the readiness check for each.",
    sections: [
      {
        heading: "The 6 pillars of funding readiness",
        cards: [
          { title: "1. CIBIL readiness", body: "Score 720+, zero settled/written-off trades, <4 enquiries in 6 months, clean 24-month payment history." },
          { title: "2. Banking readiness", body: "12 months clean banking, AMB 1.5–2x proposed EMI, zero bounces, cash deposit ratio <15%." },
          { title: "3. ITR readiness", body: "Last 3 years filed, profit trend stable or growing, declared profit supports target loan's DSCR (1.5x+)." },
          { title: "4. GST readiness", body: "Last 12 months filed on time, GSTR-1 + 3B consistent, turnover reconciles to ITR within 10–20%." },
          { title: "5. Obligations readiness", body: "FOIR <50% (with proposed EMI), no contingent liabilities that could crystallise, credit card utilisation <30%." },
          { title: "6. Collateral readiness (for secured)", body: "Clean property title, valuation supports LTV, no encumbrance, ownership docs in order." },
        ],
      },
      {
        heading: "Self-check: which pillars are weak in your file?",
        body:
          "Before approaching any lender, score yourself on each pillar — Strong / Adequate / Weak / Fail. Any 'Fail' = don't apply yet, fix first. Any 'Weak' = approach only lenders whose policy is flexible on that pillar. All 'Strong' or 'Adequate' = approach 1–2 best-fit lenders for premium pricing.",
        bullets: [
          "CIBIL: pull your report, count enquiries, check for any settled trades",
          "Banking: download 12-month statement, count bounces, compute AMB",
          "ITR: pull last 3 years, compute average profit and growth trend",
          "GST: download 12-month GSTR-1 + 3B, reconcile to ITR turnover",
          "Obligations: list all EMIs + card min dues, compute FOIR",
          "Collateral: list property docs, check title, get indicative valuation",
        ],
      },
      {
        eyebrow: "Common patterns",
        heading: "What most files look like — and what to fix first",
        cards: [
          { title: "Strong CIBIL, weak ITR", body: "Common for tax-optimised MSMEs. Fix: declare higher profit next year, or take secured loan." },
          { title: "Strong ITR, weak banking", body: "Common for cash-heavy businesses. Fix: consolidate to one account, build digital credits for 6+ months." },
          { title: "Strong CIBIL+ITR, weak GST", body: "Common for B2B businesses with exempt sales. Fix: prepare signed reconciliation note before applying." },
          { title: "Strong everything, weak obligations", body: "Common for borrowers with multiple loans. Fix: prepay smallest loan, or add co-applicant." },
          { title: "Weak CIBIL, strong everything else", body: "Common after a one-off default. Fix: 6 months of no new applications + on-time payments." },
          { title: "All pillars weak", body: "Don't apply now — you'll be rejected and the enquiry will weaken CIBIL further. Take 6–12 months to fix." },
        ],
      },
    ],
    faqs: [
      {
        q: "How long does it take to become funding-ready?",
        a: "It depends on which pillars are weak. CIBIL fixes take 3–6 months. Banking cleanup takes 6–12 months. ITR fixes take a full assessment year. GST reconciliation can be done in 2–4 weeks. Obligations fixes can be immediate (prepay) or take months (refinance). A realistic timeline is 6–12 months to go from 'weak' to 'strong' across all six pillars.",
      },
      {
        q: "Can I apply if 5 pillars are strong and 1 is weak?",
        a: "Often yes — it depends which pillar is weak. Weak collateral: go unsecured. Weak obligations: prepay or co-applicant. Weak GST: reconciliation note. Weak ITR: take a secured loan. Weak CIBIL or banking: usually a deal-breaker — fix before applying.",
      },
      {
        q: "Should I use a funding readiness assessment tool?",
        a: "Yes — a structured assessment forces you to look at all six pillars honestly, instead of optimistically. Our free funding readiness assessment walks through each pillar in 5 minutes and gives you a readiness score with specific fixes. Take it before approaching any lender.",
      },
    ],
  },
  {
    slug: "business-loan-vs-lap",
    title: "Business Loan vs LAP — When to Use Each (and the Cost of Choosing Wrong)",
    excerpt:
      "Unsecured business loan = fast, short, expensive. LAP = slow, long, cheap. The right choice depends on use of funds, tenure and your DSCR.",
    eyebrow: "Product Comparison",
    intro:
      "Business loan and LAP serve different needs. A business loan is an unsecured term loan, fast to disburse, short tenure, higher rate. LAP is a secured loan against property, slower to disburse, longer tenure, lower rate. Choosing the wrong one is expensive — a 5-year business loan at 16% costs far more than a 10-year LAP at 10% for the same ticket.",
    sections: [
      {
        heading: "Side-by-side comparison",
        cards: [
          { title: "Ticket size", body: "Business loan: ₹5 L–₹50 L (typical). LAP: ₹25 L–₹10 Cr+ (depending on property value)." },
          { title: "Tenure", body: "Business loan: 1–5 years (some up to 7). LAP: 5–15 years (some up to 20)." },
          { title: "Rate (indicative)", body: "Business loan: 11–24% p.a. LAP: 9–13% p.a. Final rate at lender's discretion." },
          { title: "Disbursement time", body: "Business loan: 3–7 days. LAP: 3–6 weeks (title search, valuation, legal)." },
          { title: "Collateral", body: "Business loan: nil (unsecured). LAP: residential/commercial/industrial property." },
          { title: "DSCR requirement", body: "Business loan: 1.5x+ (strict). LAP: 1.25x+ (more flexible, collateral-backed)." },
          { title: "End use", body: "Business loan: working capital, immediate capex. LAP: long-tenure capex, refinancing, large expansion." },
          { title: "Prepayment penalty", body: "Business loan: 4–5% (foreclosure). LAP: 2–4% (some nil on floating rate)." },
        ],
      },
      {
        heading: "When to choose which",
        bullets: [
          "Choose business loan: short-term working capital, fast requirement, no property to pledge",
          "Choose LAP: long-tenure capex, refinancing expensive debt, large ticket, you have free property",
          "Choose business loan: ₹5–25 L ticket, need disbursement in 1 week, 3-year repayment horizon",
          "Choose LAP: ₹50 L+ ticket, can wait 4 weeks for disbursement, want lowest EMI",
          "Choose business loan: don't want to risk property in case of business downturn",
          "Choose LAP: max tax benefit on interest (if used for business purpose, interest is deductible)",
        ],
      },
      {
        eyebrow: "Cost illustration",
        heading: "₹50 L for 5 years — business loan vs LAP",
        body:
          "Business loan at 16% p.a., 5 years: EMI ~₹1,21,000/month, total interest paid ~₹22.6 L. LAP at 10% p.a., 10 years: EMI ~₹66,000/month, total interest paid ~₹29.2 L. Lower EMI but more total interest over the longer LAP tenure. If you can afford the higher EMI and don't need 10 years to repay, business loan costs less in absolute interest.",
        bullets: [
          "₹50 L @ 16%, 5 yrs → EMI ₹1,21,000, total interest ₹22.6 L",
          "₹50 L @ 10%, 10 yrs → EMI ₹66,000, total interest ₹29.2 L",
          "₹50 L @ 10%, 5 yrs → EMI ₹1,06,000, total interest ₹13.7 L (LAP wins)",
          "If cash flow allows 5-year repayment, LAP @ 10% is cheaper in absolute interest",
          "If cash flow tight, LAP @ 10% for 10 years frees monthly cash",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I take both a business loan and LAP simultaneously?",
        a: "Yes — they're independent facilities. A common structure: LAP for long-tenure capex (machinery, property, expansion) + business loan or OD for short-term working capital. The combined obligations must still pass FOIR and DSCR checks. Stacking both without planning causes over-leverage.",
      },
      {
        q: "Does LAP require the property to be fully paid off?",
        a: "Not necessarily. You can take LAP on a property that has an existing home loan (subject to the existing lender's consent and available LTV). This is called a 'top-up loan' if from the same lender, or a 'balance transfer + top-up' if moving to a new lender. The combined LTV (existing + new) must stay within the lender's cap.",
      },
      {
        q: "Is the interest on LAP tax-deductible?",
        a: "If the LAP is used for business purpose, the interest is deductible as a business expense under Section 36(1)(iii) of the Income Tax Act. If used for non-business purposes (e.g., personal use, buying another residential property), it's not deductible. Keep the end-use documented — lenders will ask.",
      },
    ],
  },
  {
    slug: "od-vs-term-loan",
    title: "Overdraft vs Term Loan — The Working Capital Decision That Affects Every MSME",
    excerpt:
      "OD for revolving working capital swings. Term loan for one-time capex. Get this wrong and you either over-pay interest or under-fund operations.",
    eyebrow: "OD vs Term Loan",
    intro:
      "Overdraft and term loan serve fundamentally different needs. A term loan is a one-time disbursement repaid in fixed EMIs — perfect for capex. An overdraft is a revolving limit you draw and repay flexibly — perfect for working capital swings. Using the wrong instrument is costly: a term loan for working capital leaves you paying interest on idle cash; an OD for capex is usually too small.",
    sections: [
      {
        heading: "The fundamental difference",
        cards: [
          { title: "Term loan", body: "Lump-sum disbursement today, fixed EMI over fixed tenure. Interest charged on full amount from day 1. Best for one-time spends." },
          { title: "Overdraft (OD)", body: "Approved limit you can draw and repay any time. Interest charged only on utilised amount, only for days used. Best for working capital swings." },
          { title: "Cash credit (CC)", body: "Similar to OD but specifically for inventory/receivables financing. Drawing power = eligible receivables/inventory × lender's percentage." },
          { title: "Bill discounting", body: "Specific form of working capital — lender discounts your accepted invoices, gives you cash upfront, recovers from your buyer on due date." },
        ],
      },
      {
        heading: "When to use which — by use case",
        bullets: [
          "Buy machinery → term loan (one-time spend, long-life asset)",
          "Pay vendors during a 60-day receivables cycle → OD/CC (revolving)",
          "Festival season inventory build-up → OD/CC (peak need, then repay)",
          "Office renovation → term loan (one-time spend)",
          "Bridge a 30-day GST refund delay → OD (short-term, repay on refund)",
          "Expand to a new city → term loan for capex + OD for working capital",
          "Replace an old expensive loan → term loan (refinance)",
          "Bid for a large tender requiring bank guarantee → CC against margin",
        ],
      },
      {
        eyebrow: "Cost comparison",
        heading: "₹20 L for 12 months — OD vs term loan cost",
        body:
          "Term loan at 13% p.a., ₹20 L, 12 months: EMI ~₹1,78,000, total interest ~₹1,42,000. OD at 13% p.a., ₹20 L limit, average utilisation 60% over 12 months: interest ~₹1,56,000. If you genuinely need the full ₹20 L for the full year, term loan is cheaper. If you only need it for 6 months of the year, OD costs ~half.",
        bullets: [
          "Always need ₹20 L for 12 months → term loan cheaper (interest from day 1 either way)",
          "Need ₹20 L for 6 months, ₹0 for 6 months → OD much cheaper (interest only when used)",
          "Need ₹10 L average with ₹20 L peak → OD cheaper (interest on ₹10 L average)",
          "Need ₹20 L peak, ₹5 L trough → OD cheaper, but commitment fee may apply on unused",
          "Mixed use (some capex + some working capital) → term loan for capex + OD for working capital",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I have both an OD and a term loan from the same lender?",
        a: "Yes — and it's often the optimal structure for MSMEs. A term loan for capex (machinery, expansion) plus an OD or CC for working capital. The lender sees both facilities, can underwrite them together, and may offer better combined terms than two separate lenders.",
      },
      {
        q: "Is OD interest calculated daily?",
        a: "Yes — OD interest is charged on the daily utilised balance, typically debited monthly. This makes OD significantly cheaper than a term loan if your utilisation is irregular. The trade-off: most ODs have a 12-month renewable tenure, vs a term loan's fixed multi-year tenure.",
      },
      {
        q: "What's the difference between OD and Cash Credit (CC)?",
        a: "OD is a generic overdraft against your banking relationship or collateral. CC is specifically for working capital against inventory and receivables — the lender sets a 'drawing power' based on your eligible current assets. CC tends to be cheaper (lower rate) but requires monthly stock/receivable statements. OD is simpler but often at a higher rate.",
      },
    ],
  },
  {
    slug: "secured-vs-unsecured",
    title: "Secured vs Unsecured Business Loan — The Trade-Off No One Explains",
    excerpt:
      "Unsecured = fast, smaller, expensive, no collateral risk. Secured = slow, larger, cheaper, but you pledge an asset. Here's the full trade-off.",
    eyebrow: "Secured vs Unsecured",
    intro:
      "Secured and unsecured business loans are not just 'with collateral vs without'. They serve different ticket sizes, tenures and use cases. Going unsecured when you could go secured means paying 4–8% more in interest. Going secured when you don't need to means risking an asset for a small saving. The decision matters.",
    sections: [
      {
        heading: "The full trade-off",
        cards: [
          { title: "Ticket size", body: "Unsecured: ₹5 L–₹50 L (typical). Secured (LAP): ₹25 L–₹10 Cr+. Secured unlocks much larger tickets." },
          { title: "Tenure", body: "Unsecured: 1–5 years (some 7). Secured: 5–15 years (some 20). Secured gives longer repayment runway." },
          { title: "Rate (indicative)", body: "Unsecured: 11–24% p.a. Secured: 9–13% p.a. A 4–10% spread on the same ticket is significant." },
          { title: "Disbursement speed", body: "Unsecured: 3–7 days. Secured: 3–6 weeks (title, valuation, legal). Unsecured is 4–6x faster." },
          { title: "Documentation", body: "Unsecured: KYC + ITR + GST + bank statements. Secured: all that + property docs + title chain + valuation." },
          { title: "Collateral risk", body: "Unsecured: no asset at risk. Secured: you can lose the pledged asset if you default." },
          { title: "DSCR/FOIR flexibility", body: "Unsecured: strict 1.5x DSCR, 50–60% FOIR. Secured: flexible 1.25x DSCR, 60–70% FOIR." },
          { title: "Prepayment penalty", body: "Unsecured: 4–5% (high). Secured: 2–4% (some nil on floating). Secured is more prepay-friendly." },
        ],
      },
      {
        heading: "Decision matrix — which to choose",
        bullets: [
          "Ticket <₹25 L + need in 1 week + no property → unsecured",
          "Ticket ₹25–50 L + can wait 4 weeks + have property → secured (save 4–8% rate)",
          "Ticket >₹50 L → almost always secured (unsecured cap is ~₹50 L)",
          "Tenure >5 years → secured (unsecured rarely beyond 5)",
          "Bad CIBIL/borderline file → secured (collateral lifts approval odds)",
          "Don't want to risk property → unsecured (even if costlier)",
          "Mixed use → secured for capex, unsecured/OD for working capital",
        ],
      },
      {
        eyebrow: "Cost illustration",
        heading: "₹40 L for 5 years — unsecured vs LAP",
        body:
          "Unsecured business loan @ 16% p.a., 5 yrs: EMI ~₹97,000, total interest ~₹18.2 L. LAP @ 10% p.a., 5 yrs: EMI ~₹85,000, total interest ~₹11.0 L. LAP saves ₹12,000/month on EMI and ₹7.2 L in total interest — for the same ticket, same tenure, same use of funds.",
        bullets: [
          "₹40 L unsecured @ 16%, 5 yrs → EMI ₹97,000, total interest ₹18.2 L",
          "₹40 L LAP @ 10%, 5 yrs → EMI ₹85,000, total interest ₹11.0 L",
          "Same ticket, same tenure — LAP saves ₹7.2 L in interest",
          "If you extend LAP to 10 yrs: EMI ₹53,000, total interest ₹23.4 L",
          "Trade-off: lower EMI vs higher total interest vs longer repayment burden",
        ],
      },
    ],
    faqs: [
      {
        q: "I don't own property — can I still get a secured loan?",
        a: "Possibly, by pledging other assets: fixed deposits (loan against FD), gold (gold loan), shares/MFs (loan against securities), insurance policy (loan against LIC). These are smaller-ticket but cheaper than unsecured. Alternatively, find a co-applicant (spouse, parent) who owns property.",
      },
      {
        q: "If I have property, should I always go secured?",
        a: "Not always. If your need is small (₹5–15 L), short-term (1–3 years), and you don't want to risk the property, unsecured may be better — the rate premium is small in absolute rupees on a small ticket, and the disbursement is much faster. Secured makes sense for larger tickets (₹25 L+) or longer tenures (5+ years).",
      },
      {
        q: "What happens to my pledged property if my business fails?",
        a: "If you default on a secured loan, the lender can invoke the SARFAESI Act to take possession of and sell the pledged property to recover the dues. The proceeds first cover the outstanding loan; any surplus is returned to you. If the sale proceeds are insufficient, the lender can pursue you personally for the shortfall. This is the real risk of secured loans.",
      },
    ],
  },

  // ---------- Cluster D: Industry Funding (9) ----------
  {
    slug: "nbfc-vs-bank",
    title: "NBFC vs Bank Business Loan — When to Use Which (and the True Cost Difference)",
    excerpt:
      "Banks offer lower rates but stricter policy. NBFCs are faster and more flexible but cost 4–8% more. Here's how to choose.",
    eyebrow: "NBFC vs Bank",
    intro:
      "Banks and NBFCs both lend to MSMEs, but they operate under different rules. Banks are regulated by RBI with strict underwriting norms; NBFCs have more flexibility on policy but price higher for the additional risk they take. Going NBFC when you could qualify for a bank loan is expensive; going bank when you don't qualify wastes 4–6 weeks.",
    sections: [
      {
        heading: "The fundamental difference",
        cards: [
          { title: "Banks (PSU + private)", body: "Lower cost of funds → lower lending rates. Stricter underwriting (CIBIL cut-offs, FOIR caps, sector restrictions). Slower TAT." },
          { title: "NBFCs", body: "Higher cost of funds → higher lending rates. Flexible underwriting. Faster TAT. Willing to lend where banks won't." },
          { title: "Rate spread", body: "Same borrower: NBFC rate typically 3–8% higher than bank rate. The spread is the cost of flexibility." },
          { title: "TAT difference", body: "Bank: 3–6 weeks. NBFC: 1–2 weeks. Fintech NBFC: 3–7 days. Speed matters when working capital is urgent." },
        ],
      },
      {
        heading: "When to choose a bank vs an NBFC",
        bullets: [
          "CIBIL 720+, clean banking, ITR profit strong → bank (lower rate)",
          "CIBIL 650–720, banking adequate, ITR weak → NBFC (more flexible)",
          "CIBIL below 650 → NBFC or fintech (banks won't approve)",
          "Need disbursement in 1 week → NBFC/fintech (banks are slower)",
          "Ticket >₹50 L → bank (NBFC ticket caps lower for unsecured)",
          "Sector restricted by banks (e.g., real estate, certain services) → NBFC",
          "Vintage <3 years → NBFC (banks usually want 3+)",
          "Clean strong file → always try bank first; save NBFC for second attempt",
        ],
      },
      {
        eyebrow: "Cost comparison",
        heading: "₹25 L for 5 years — bank vs NBFC vs fintech",
        body:
          "Bank @ 11% p.a.: EMI ~₹54,400, total interest ~₹7.6 L. NBFC @ 16% p.a.: EMI ~₹60,800, total interest ~₹11.5 L. Fintech @ 22% p.a.: EMI ~₹69,300, total interest ~₹16.6 L. The same ₹25 L loan costs ₹3.9 L more at NBFC and ₹9.0 L more at fintech vs bank — over 5 years.",
        bullets: [
          "₹25 L @ 11% bank, 5 yrs → EMI ₹54,400, total interest ₹7.6 L",
          "₹25 L @ 16% NBFC, 5 yrs → EMI ₹60,800, total interest ₹11.5 L",
          "₹25 L @ 22% fintech, 5 yrs → EMI ₹69,300, total interest ₹16.6 L",
          "Bank vs NBFC cost difference on ₹25 L: ₹3.9 L over 5 years",
          "Bank vs fintech cost difference on ₹25 L: ₹9.0 L over 5 years",
          "Always try bank first if your file qualifies; the rate saving is real",
        ],
      },
    ],
    faqs: [
      {
        q: "Will applying to an NBFC hurt my CIBIL the same as applying to a bank?",
        a: "Yes — every lender-initiated enquiry, whether bank or NBFC, is a hard enquiry on CIBIL. Multiple enquiries across both in a short window compound the damage. Don't 'test the market' by applying to 5 lenders simultaneously. Diagnose your file, identify the 1–2 lenders most likely to approve, and apply only there.",
      },
      {
        q: "Are NBFCs safer or riskier than banks?",
        a: "For the borrower, the safety is similar — both are RBI-regulated. The difference is mostly in pricing and flexibility. NBFCs may have less consumer-friendly processes (collections, restructuring) than banks. The bigger risk for the borrower is the higher interest rate, not the lender failing.",
      },
      {
        q: "Can I move from an NBFC loan to a bank loan later?",
        a: "Yes — this is called 'takeover' or 'balance transfer'. If your file has improved (CIBIL up, banking clean, ITR stronger) since the NBFC loan, a bank may takeover the outstanding at a lower rate. The savings must justify the takeover cost (processing fee + documentation). Worth considering after 12–18 months of on-time repayment.",
      },
    ],
  },
  {
    slug: "industry-funding",
    title: "Industry Funding — How Lenders View Different Sectors",
    excerpt:
      "Each sector has its own underwriting lens — banking patterns, GST profile, peak season, working capital cycle. Here's what lenders see for 8 industries.",
    eyebrow: "Industry Funding",
    intro:
      "Underwriters don't just read your file in isolation — they compare it to sector benchmarks. A trading business with 60% gross margin is risky; a manufacturing business with 30% gross margin is normal. Each sector has its own lending profile, risk appetite, and preferred lender set. Knowing your sector's profile helps you pick the right lender and frame your file correctly.",
    sections: [
      {
        heading: "Sector-by-sector underwriting lens",
        cards: [
          { title: "Manufacturing", body: "Long working capital cycle, asset-heavy, cyclical. Lenders want clean ITR, strong banking, asset cover. Prefer banks + asset finance companies." },
          { title: "Trading", body: "Thin margins, fast turnover, high volume. Lenders look at GST turnover, banking credits, inventory days. NBFC-friendly sector." },
          { title: "Services", body: "Asset-light, recurring revenue. Lenders look at ITR profit, banking regularity, client concentration. Bank-friendly if profit is strong." },
          { title: "Contractors", body: "Lumpy revenue, work-in-progress heavy. Lenders look at order book, MOA/WC cycle, banking. NBFC + select banks." },
          { title: "Restaurants", body: "Cash-heavy, thin margin, high failure rate. Lenders look at POS banking, GST, lease tenure. NBFC-preferred, smaller tickets." },
          { title: "E-commerce sellers", body: "Marketplace-dependent, fast growth, thin margin. Lenders look at platform settlement data, GST. Fintech-preferred." },
          { title: "Distributors", body: "Principal-dependent, thin margin, high inventory. Lenders look at principal relationship, stock turnover, dealer agreement." },
          { title: "Professionals (doctors, CAs, lawyers)", body: "Income from practice, low capital. Lenders look at ITR, qualifications, clinic/office tenure. Special professional loan schemes." },
        ],
      },
      {
        heading: "Sector restrictions to be aware of",
        bullets: [
          "Real estate / land trading — most banks cap exposure; some don't lend at all",
          "Crypto / gambling / cannabis-adjacent — almost no Indian lender will touch",
          "Charitable / religious trusts — restricted at most banks",
          "Cash-heavy unorganised retail — restricted; requires strong banking proof",
          "Pure agriculture — separate agri-lending rules; not standard MSME loan",
          "Steel / cement cyclical — sector exposure caps at PSU banks",
          " NBFC-of-NBFC / lending business — restricted unless you're a registered NBFC",
          "Foreign-exchange / hawala-adjacent — high AML scrutiny",
        ],
      },
      {
        eyebrow: "Practical guidance",
        heading: "How to frame your file for your sector",
        body:
          "Each sector has its own story to tell. A manufacturer should emphasise asset cover and order book; a trader should emphasise GST turnover and inventory days; a contractor should emphasise order book and MOA cycle. Tailor your file's narrative to your sector's underwriting lens — a generic file is harder to approve than a sector-aware one.",
        bullets: [
          "Manufacturing: lead with asset cover, ITR profit, order book",
          "Trading: lead with GST turnover, inventory days, banking credits",
          "Contractor: lead with order book, MOA cycle, work-in-progress",
          "Restaurant: lead with POS banking, GST, lease tenure",
          "E-commerce: lead with platform settlement data, GST, growth trend",
          "Distributor: lead with principal agreement, stock turnover, dealer letter",
          "Professional: lead with qualifications, ITR, clinic/office vintage",
        ],
      },
    ],
    faqs: [
      {
        q: "My sector is restricted at most banks — what can I do?",
        a: "Three options: (1) Approach an NBFC that lends to your sector (they have more flexibility); (2) Take a secured loan (LAP) — collateral-backed loans are less sector-sensitive; (3) Take a personal loan or professional loan in your individual capacity if your ITR is strong. The right path depends on ticket size and urgency.",
      },
      {
        q: "How do I know which lenders prefer my sector?",
        a: "Most banks publish their sector exposures in their annual reports; many have specific MSME schemes for manufacturing, trading, etc. An experienced loan advisor (like us) tracks which lender is currently aggressive in which sector. Sectoral appetite changes quarterly based on each lender's portfolio performance.",
      },
      {
        q: "I run two businesses in different sectors — which one do I apply under?",
        a: "Usually the one with stronger ITR + banking + sector-friendliness. Some lenders will consider combined income from both businesses if both are properly documented. But splitting focus weakens the file — pick the stronger business, get the loan, then if needed take a second facility later for the other.",
      },
    ],
  },
  {
    slug: "funding-for-doctors",
    title: "Funding for Doctors — Practice Loans, Clinic Setup & Equipment Finance",
    excerpt:
      "Doctors have unique funding needs: clinic setup, equipment, working capital during patient ramp-up. Here's the lender landscape and how to prepare your file.",
    eyebrow: "Funding for Doctors",
    intro:
      "Doctors are among the most lendable professionals in India — stable income, growing demand, regulated qualifications. Most banks have dedicated 'doctor loans' with relaxed collateral norms and faster TAT. But funding a clinic setup vs expanding an established practice vs buying equipment all need different instruments.",
    sections: [
      {
        heading: "Types of doctor loans",
        cards: [
          { title: "Doctor loan (unsecured)", body: "Up to ₹50 L (some ₹75 L) based on qualification and ITR. No collateral. Typical rate 11–16% p.a., tenure 1–7 years." },
          { title: "Clinic setup loan", body: "Higher-ticket (₹25 L–₹2 Cr) for premises, interiors, equipment. Often secured (LAP) if ticket is large." },
          { title: "Medical equipment finance", body: "Asset-backed loan for MRI, CT, dental chairs, etc. Lender holds lien on the equipment. Lower rate (10–14% p.a.)." },
          { title: "Practice OD/CC", body: "Revolving working capital against insurance receivables (TPA cycle is 60–120 days). Useful for established practices." },
          { title: " LAP for clinic property", body: "If you own the clinic premises or another property, LAP at 9–12% p.a. for major capex or expansion." },
        ],
      },
      {
        heading: "What lenders evaluate for doctor loans",
        bullets: [
          "Qualification — MBBS, BDS, MD/MS, DM/MCh, MDS; super-specialists get higher tickets",
          "Years of practice — most banks want 3+ years post-qualification; some 5+",
          "ITR — last 3 years; profit should support DSCR 1.5x+ on proposed loan",
          "Clinic tenure — long lease (3+ years) or owned premises is favourable",
          "Patient profile — walk-in vs empanelled; empanelment with TPAs/corporates adds value",
          "Banking — credits from named parties, regular pattern, AMB comfortable",
          "Existing obligations — FOIR with proposed EMI should be <50–60%",
          "CIBIL — 720+ preferred; some banks accept 700+ for doctor loans",
        ],
      },
      {
        eyebrow: "Best-fit lenders",
        heading: "Lenders known for doctor loans",
        body:
          "Several banks and NBFCs have dedicated doctor loan programs with customised underwriting. Indicative list (not exhaustive; lender policies change): HDFC Bank Doctor's Loan, ICICI Bank Doctor Loan, Axis Bank Doctor Loan, Bajaj Finserv Doctor Loan, Kotak Doctor Loan, Federal Bank Doctor Loan. Each has slightly different ticket caps, rate ranges and tenure. We match your file to the 1–2 best fits before any submission.",
        bullets: [
          "HDFC Bank — up to ₹50 L unsecured, 4–5 day TAT for existing customers",
          "ICICI Bank — up to ₹40 L unsecured, doctor-specific scheme",
          "Bajaj Finserv — up to ₹80 L (some secured), fast TAT, slightly higher rate",
          "Kotak — competitive rate, strong on super-specialists",
          "Federal Bank — good for South India-based practices",
          "All rates indicative; final rate at lender's discretion post-appraisal",
        ],
      },
    ],
    faqs: [
      {
        q: "I'm a fresh MBBS starting a clinic — can I get a loan?",
        a: "It's harder. Most doctor loan schemes require 3+ years of practice. For a fresh setup, options are: (1) Secured LAP if you or family have property; (2) CGTMSE-backed MSME loan (clinic as a startup); (3) Personal loan for small-ticket equipment (₹5–10 L); (4) Equipment finance where the equipment itself is the collateral. Once you have 2–3 years of ITR, doctor loans open up.",
      },
      {
        q: "Should I take a doctor loan or equipment finance for an MRI machine?",
        a: "Equipment finance is almost always better for high-value medical equipment. The lender holds a lien on the equipment itself (so no other collateral needed), rates are lower (10–14% vs 14–18% for unsecured doctor loan), and the tenure matches the equipment's useful life. Reserve doctor loans for working capital, clinic setup, or top-up funding.",
      },
      {
        q: "My clinic revenue is mostly cash — will I struggle to get a loan?",
        a: "Possibly. Lenders want to see digital credits (UPI/RTGS/NEFT) in your bank statement that reconcile with your ITR and GST. If 70%+ of your revenue is cash, the file looks weak even if ITR is strong. Start routing patient collections through UPI/digital channels, build 12 months of clean digital banking, then apply.",
      },
    ],
  },
  {
    slug: "funding-for-manufacturers",
    title: "Funding for Manufacturers — Term Loans, Working Capital, Machinery Finance",
    excerpt:
      "Manufacturers have the most financing options but also the most complex needs — capex, working capital, machinery, raw material. Here's the structure.",
    eyebrow: "Funding for Manufacturers",
    intro:
      "Manufacturing businesses are asset-heavy, cyclical, and have long working capital cycles. The financing structure usually combines: term loan for capex, CC/OD for working capital, machinery finance for equipment, and sometimes LC/BG limits for procurement. Getting the mix right matters more than getting any single facility.",
    sections: [
      {
        heading: "The four-facility structure for manufacturers",
        cards: [
          { title: "Term loan (capex)", body: "For plant, building, expansion. 5–10 year tenure. Bank/NBFC. Often secured against the asset being financed or other property." },
          { title: "Cash credit / OD (working capital)", body: "Revolving limit against inventory + receivables. Drawing power = eligible current assets × lender's percentage. 12-month renewable." },
          { title: "Machinery finance", body: "Asset-backed loan for specific equipment. Lender holds lien on the machine. Lower rate, tenure matches asset life." },
          { title: "LC / BG limits", body: "Non-fund-based limits for procurement (LC for raw material imports) and contracts (BG for tenders). Saves cash outflow." },
        ],
      },
      {
        heading: "What lenders evaluate for manufacturer loans",
        bullets: [
          "Last 3 years ITR — profit trend, EBITDA margin (10%+ healthy for manufacturing)",
          "GST turnover and reconciliation with ITR",
          "Banking — 12-month clean, AMB supporting proposed obligations",
          "DSCR — 1.5x+ for term loan; lender computes combined DSCR across all facilities",
          "Asset cover — total secured loans ÷ net owned assets; 1.33x+ preferred",
          "Stock and receivables statement (monthly for CC)",
          "Order book — pipeline of confirmed orders adds confidence",
          "CIBIL of business + promoters — 720+ preferred",
          "Environmental / pollution compliance for the industry",
        ],
      },
      {
        eyebrow: "Best-fit lenders",
        heading: "Lender types for manufacturing",
        body:
          "Manufacturing is generally bank-friendly (PSU + private) with strong NBFC participation. Indicative landscape: SBI MSME loans, PNB MSME, Bank of Baroda MSME, HDFC Bank MSME, ICICI Bank MSME, Axis Bank MSME, IDFC First, Tata Capital, Aditya Birla Finance, L&T Finance. For machinery: Cholamandalam, Mahindra Finance, Shriram. We match your specific need to the right lender.",
        bullets: [
          "PSU banks — lowest rates, slowest TAT, strictest underwriting",
          "Private banks — competitive rates, moderate TAT, moderate flexibility",
          "NBFCs — higher rates, fast TAT, flexible on collateral/sector",
          "Asset finance companies (Cholamandalam, Mahindra) — best for machinery",
          "CGTMSE — collateral-free up to ₹5 Cr; most lenders offer it",
          "All rates indicative; final rate at lender's discretion post-appraisal",
        ],
      },
    ],
    faqs: [
      {
        q: "Should I take one large loan or split across multiple facilities?",
        a: "Split almost always. A single ₹2 Cr term loan for capex + working capital is the wrong structure — you'll pay interest on idle working capital, and the tenure will be wrong for one of the uses. The right structure is usually: term loan for capex (5–10 years), CC/OD for working capital (revolving), machinery finance for specific equipment. Each facility matches its use.",
      },
      {
        q: "My manufacturing unit runs 24/7 with high power cost — how do lenders view this?",
        a: "Lenders care about your unit economics — power cost as % of revenue, raw material cost, gross margin. If your power cost is high but your gross margin is healthy (15%+), it's fine. If power cost eats into margin, the lender will see weakness. Maintain a clean MIS that shows unit economics clearly — underwriters appreciate transparency.",
      },
      {
        q: "Can I get CGTMSE funding for a manufacturing unit?",
        a: "Yes — manufacturing is one of the most eligible sectors for CGTMSE. Up to ₹5 Cr collateral-free, with the Credit Guarantee Trust providing cover to the lender. Most banks and NBFCs offer CGTMSE-backed loans. The processing is slightly longer (guarantee registration) but the absence of collateral requirement is a major advantage for new and growing manufacturers.",
      },
    ],
  },
  {
    slug: "funding-for-traders",
    title: "Funding for Traders — Working Capital, Stock Finance & GST-Based Loans",
    excerpt:
      "Traders need fast, flexible working capital. Bank CC is cheapest but slow. NBFCs and fintech GST-loans are faster. Here's the structure.",
    eyebrow: "Funding for Traders",
    intro:
      "Trading businesses are high-turnover, thin-margin, fast-cycle. The financing need is almost always working capital — to buy stock, sell on credit, bridge the receivables cycle. The instruments: bank cash credit (cheapest, slowest), NBFC working capital (faster), fintech GST-based loans (fastest, smallest), and bill discounting against accepted invoices.",
    sections: [
      {
        heading: "Financing instruments for traders",
        cards: [
          { title: "Bank cash credit (CC)", body: "Cheapest (10–13% p.a.). Drawing power = eligible inventory + receivables × 75–90%. Slow to set up (4–6 weeks), 12-month renewable." },
          { title: "NBFC working capital OD", body: "Slightly higher rate (13–18%). Faster setup (1–2 weeks). More flexible on drawing power computation." },
          { title: "GST-based fintech loan", body: "Fast (3–7 days). Small tickets (₹5–25 L). Higher rate (16–24%). Underwritten on GST turnover + banking." },
          { title: "Bill discounting", body: "Against accepted invoices from creditworthy buyers. Lender pays you upfront, recovers from buyer on due date. Rate 11–15%." },
          { title: "Invoice factoring", body: "Like bill discounting but the lender takes over the receivable (sale of invoice, not loan). Faster but more expensive." },
          { title: "Trader's term loan", body: "For one-time expansion (new warehouse, vehicles). 3–5 year tenure. Used alongside CC for working capital." },
        ],
      },
      {
        heading: "What lenders evaluate for trader loans",
        bullets: [
          "GST turnover — last 12 months, regular and growing",
          "ITR — last 3 years; profit margin (3–8% is typical for trading)",
          "Banking — credits from named buyers, regular pattern",
          "Stock statement — monthly for CC; inventory turnover ratio",
          "Receivables ageing — older than 90 days is hair-cut",
          "Buyer concentration — top 3 buyers should be <50% of receivables",
          "Vintage — most lenders want 3+ years in same line",
          "Sector — commodity trading vs branded goods vs B2B distribution",
        ],
      },
      {
        eyebrow: "Choosing the right instrument",
        heading: "Pick by ticket, urgency and cycle",
        body:
          "₹5–25 L, urgent: fintech GST-loan (3–7 days). ₹25 L–₹2 Cr, can wait 4–6 weeks: bank CC (cheapest). ₹25–75 L, moderate urgency: NBFC OD (1–2 weeks). Have accepted invoices from creditworthy buyers: bill discounting (rate 11–15%). Don't over-borrow — traders often qualify for more than they need, but over-leverage kills thin-margin businesses fast.",
        bullets: [
          "₹5–25 L, urgent → fintech GST-loan (fast, expensive)",
          "₹25 L–₹2 Cr, patient → bank CC (cheapest, slowest)",
          "₹25–75 L, moderate urgency → NBFC OD (balanced)",
          "Buyer-accepted invoices → bill discounting (best rate for short cycle)",
          "One-time expansion → term loan alongside CC for working capital",
          "Don't stack multiple ODs across lenders — over-leverage risk",
        ],
      },
    ],
    faqs: [
      {
        q: "My GST turnover is ₹5 Cr but ITR profit is just ₹15 L — can I get a loan?",
        a: "Yes, but the structure matters. Banks may decline (DSCR fails on ₹15 L profit). NBFCs and fintech GST-based lenders will lend on turnover, with tickets of ₹25 L–₹1 Cr depending on the lender. The rate will be higher (16–22%). Alternatively, bill discounting against your invoices doesn't depend on your ITR profit at all — it depends on your buyer's creditworthiness.",
      },
      {
        q: "I sell on 60–90 day credit to my buyers — which financing is best?",
        a: "Bill discounting or invoice factoring. The lender pays you upfront (less a discount), and recovers from your buyer on due date. Rate is typically 11–15% p.a. — cheaper than OD — and the limit grows with your sales. Most useful when your buyers are creditworthy (large corporates, PSUs, government departments).",
      },
      {
        q: "Should I take a CC against stock or against receivables?",
        a: "Both — most banks give you CC drawing power against eligible stock (raw material + finished goods, less margins) plus eligible receivables (less than 90 days old, less margin). The mix depends on your business: stock-heavy traders get more from stock; credit-selling traders get more from receivables. Submit monthly stock + receivables statements to maximise drawing power.",
      },
    ],
  },
  {
    slug: "funding-for-contractors",
    title: "Funding for Contractors — Bill Discounting, BG Limits & Working Capital",
    excerpt:
      "Contractors face lumpy revenue, work-in-progress heavy balance sheets, and slow government payments. Here's how lenders view your file and which instruments fit.",
    eyebrow: "Funding for Contractors",
    intro:
      "Contractors (civil, electrical, MEP, services) are a unique underwriting profile — high revenue but lumpy, large work-in-progress, slow-paying government/PSU clients, and tenders requiring bank guarantees. The right financing structure combines: working capital (CC/OD), bill discounting against running bills, BG limits for tenders, and term loans for equipment.",
    sections: [
      {
        heading: "Financing instruments for contractors",
        cards: [
          { title: "Bill discounting (running bills)", body: "Against interim/RA bills raised on government/PSU/corporate clients. Lender pays upfront, recovers on payment. Best for contractors." },
          { title: "BG / LC limits", body: "Non-fund-based limits for tender submission (EMD), performance guarantee, retention. Saves cash outflow." },
          { title: "Working capital CC/OD", body: "For mobilisation advance, labour, material. Drawing power against eligible WIP + receivables." },
          { title: "Equipment term loan", body: "For machinery (excavators, cranes, batching plants). Asset-backed, lower rate, longer tenure." },
          { title: "Mobilisation advance loan", body: "Some lenders offer specific 'mobilisation advance' loans against the contract itself, disbursed as a lumpsum." },
        ],
      },
      {
        heading: "What lenders evaluate for contractor loans",
        bullets: [
          "Order book — total value of confirmed contracts, profile of clients",
          "Client mix — government / PSU / corporate / private; diversification matters",
          "Work-in-progress statement — value of work done but not yet billed",
          "Receivables ageing — government receivables >180 days get heavy haircut",
          "ITR — last 3 years; profit margin 4–10% typical for contracting",
          "Banking — credits from clients, regular pattern, clean of bounces",
          "GST returns — reconcile to declared turnover",
          "CIBIL of business + key promoters — 720+ preferred",
          "Past project execution record — completion certificates, client references",
        ],
      },
      {
        eyebrow: "The contractor's financing dilemma",
        heading: "Why contractors struggle with traditional MSME loans",
        body:
          "Standard MSME term loans and unsecured business loans are designed for stable-profit businesses with predictable monthly cash flow. Contractors have lumpy revenue (paid on milestones) and large WIP. Traditional DSCR computation fails — EBITDA may be strong but EMI affordability is uneven. The right structure is bill discounting (matches revenue to repayment) + BG limits (frees cash from tender deposits) + term loan for equipment (asset-backed).",
        bullets: [
          "Don't take a ₹50 L unsecured business loan for working capital — EMI kills cash flow",
          "Do take bill discounting against RA bills — revenue-matched repayment",
          "Do take BG limits instead of cash deposits for tender EMD/performance guarantee",
          "Do take equipment term loan for machinery — asset-backed, longer tenure",
          "Build a 24-month track record of clean banking + on-time GST filing before approaching",
        ],
      },
    ],
    faqs: [
      {
        q: "I have a ₹5 Cr government contract but need ₹1 Cr to mobilise — what's best?",
        a: "Three options in order of cost: (1) Mobilisation advance from the client (if your contract allows) — usually interest-free or low-cost; (2) Bill discounting against the first RA bill once you've done some work — cheapest financing; (3) Working capital CC/OD against the contract + your other receivables. Don't take a term loan for mobilisation — the EMI structure doesn't match lumpy contract receipts.",
      },
      {
        q: "My tender requires a 10% performance BG — do I need to deposit cash?",
        a: "No — that's exactly what BG limits are for. The bank issues a performance guarantee on your behalf for a fee (typically 1.5–3% p.a. of the BG amount). Your cash isn't blocked. Most banks give BG limits alongside CC/OD as part of the working capital arrangement.",
      },
      {
        q: "Government receivables take 6–9 months to pay — does this hurt my loan eligibility?",
        a: "It complicates things. Most lenders haircut receivables older than 90 days heavily (50%+) and may not consider those older than 180 days at all. The solution is bill discounting — the lender pays you upfront against the accepted bill, then waits for the government payment themselves (priced into the discount rate). This is far better than waiting 9 months for working capital.",
      },
    ],
  },
  {
    slug: "funding-for-restaurants",
    title: "Funding for Restaurants — Working Capital, Setup & POS-Linked Loans",
    excerpt:
      "Restaurants are cash-heavy, thin-margin, high-failure. Lenders are cautious but there are specific instruments that fit the sector.",
    eyebrow: "Funding for Restaurants",
    intro:
      "Restaurants are among the harder sectors to finance — high failure rate, cash-heavy operations, thin margins, and high fixed costs (rent, salaries, utilities). But there are specific instruments: POS-linked loans against daily card settlements, equipment finance for kitchen gear, and CGTMSE-backed term loans for new setups. The key is presenting the file with strong digital banking and a long lease.",
    sections: [
      {
        heading: "Financing instruments for restaurants",
        cards: [
          { title: "POS-linked loan", body: "Loan repaid as a small % of daily card/UPI settlements. Lenders love this — auto-deduction, no EMI bounce risk. Rate 14–22%." },
          { title: "CGTMSE term loan", body: "Collateral-free up to ₹5 Cr for new setup or expansion. Most banks offer. Slower TAT (4–6 weeks)." },
          { title: "Equipment finance", body: "For ovens, refrigerators, espresso machines, POS systems. Lender holds lien on the equipment. Rate 12–16%." },
          { title: "Working capital OD", body: "Small OD (₹5–25 L) against monthly credits. Useful for inventory + salary bridge during slow weeks." },
          { title: "LAP for premises", body: "If you own the premises (or another property), LAP at 9–12% p.a. for major capex or refinancing costlier debt." },
        ],
      },
      {
        heading: "What lenders evaluate for restaurant loans",
        bullets: [
          "POS/settlement banking — last 12 months; daily credits, growth trend",
          "GST turnover — reconciles to POS settlements and ITR",
          "ITR — last 3 years; profit margin 8–15% is healthy for restaurants",
          "Lease tenure — long lease (3+ years) or owned premises is critical",
          "Vintage — most lenders want 2+ years of operations; new setups harder",
          "Food license (FSSAI) — current and clean",
          "CIBIL of owner — 720+ preferred",
          "Existing obligations — FOIR with proposed EMI <50%",
          "Brand/franchise vs independent — franchisee files are slightly easier",
        ],
      },
      {
        eyebrow: "Common pitfalls",
        heading: "Why restaurant files get rejected — and how to fix it",
        body:
          "Most restaurant loan rejections come from: cash-heavy operations (lender can't see digital trail), short lease (lender worries about eviction risk), thin ITR profit (tax-optimised), or FSSAI/fire compliance gaps. Each is fixable: route collections through UPI/digital, sign a longer lease or buy the premises, declare honest profit on ITR for 1–2 years before applying, and keep all licences current.",
        bullets: [
          "Cash-heavy operations → route 80%+ through UPI/POS for 12 months before applying",
          "Short lease → negotiate 3+ year lease with renewal option; owned premises is best",
          "Thin ITR profit → declare honest profit for 1–2 years before applying",
          "Compliance gaps → keep FSSAI, fire, GST, shops-establishment all current",
          "Single-location risk → expand to 2–3 locations to diversify revenue",
          "High rent-to-revenue ratio → keep rent <20% of revenue (lenders look at this)",
        ],
      },
    ],
    faqs: [
      {
        q: "I'm starting my first restaurant — can I get funding?",
        a: "It's hard but possible. Options: (1) CGTMSE-backed startup MSME loan (some banks offer); (2) Equipment finance for the kitchen (asset-backed); (3) LAP if you have property; (4) Personal loan for small-ticket needs. Most restaurant term loans require 2+ years of operations. Build a 12-month track record of POS + GST + banking before applying for unsecured working capital.",
      },
      {
        q: "My restaurant is profitable but I take most revenue in cash — will I struggle?",
        a: "Yes. Lenders want to see digital credits in your bank statement that match your GST and ITR. If 70%+ of revenue is cash, the file looks weak. Start routing collections through UPI/POS — most customers now prefer UPI anyway. Build 12 months of strong digital banking, then apply. The interest savings alone (3–5% p.a. lower rate) make the transition worthwhile.",
      },
      {
        q: "I have 3 profitable outlets — can I consolidate debt into one loan?",
        a: "Yes — debt consolidation is a common use case. Take one larger LAP or secured term loan (against one of your outlets if you own it, or against another property), use it to repay multiple smaller expensive loans (credit card, personal loans, small ODs). The lower rate on the consolidated loan can save 4–8% p.a. — significant on a ₹50 L+ ticket.",
      },
    ],
  },
  {
    slug: "funding-for-e-commerce-sellers",
    title: "Funding for E-Commerce Sellers — Settlement-Linked & GST-Based Loans",
    excerpt:
      "E-commerce sellers have unique profiles: marketplace-dependent revenue, settlement cycles, GST turnover. Fintech lenders offer purpose-built products.",
    eyebrow: "Funding for E-Commerce",
    intro:
      "E-commerce sellers (Amazon, Flipkart, Meesho, etc.) have a unique underwriting profile: high turnover, thin margin, marketplace-dependent, 7–14 day settlement cycles, returns-heavy. Traditional banks struggle to underwrite these files because the profile doesn't fit standard MSME boxes. Fintech lenders and some NBFCs offer purpose-built products: GST-based loans, settlement-linked loans, and seller-financing schemes.",
    sections: [
      {
        heading: "Financing instruments for e-commerce sellers",
        cards: [
          { title: "Marketplace seller financing", body: "Some marketplaces (Amazon Lending, Flipkart Growth Capital) offer financing to sellers based on platform data. Fast, but limited to sellers in good standing." },
          { title: "GST-based fintech loan", body: "Underwritten on GST turnover + banking. Tickets ₹5–50 L. Rate 16–24%. Fast (3–7 days)." },
          { title: "Settlement-linked loan", body: "Repayment auto-deducted from marketplace settlements. Daily/weekly frequency. Rate 14–22%. Matches cash flow." },
          { title: "Inventory finance", body: "Loan against inventory in your warehouse (or 3PL). Lender monitors stock levels. Useful for festival season build-up." },
          { title: "Bank MSME loan", body: "Standard bank MSME term loan or OD. Cheapest (10–14%) but strictest underwriting — needs 3+ years ITR, strong profit." },
        ],
      },
      {
        heading: "What lenders evaluate for e-commerce seller loans",
        bullets: [
          "GST turnover — last 12 months; consistency matters more than absolute level",
          "Marketplace settlement data — daily/weekly settlement pattern",
          "ITR — last 3 years; profit margin 5–12% typical for e-commerce",
          "Banking — credits from marketplace settlement accounts",
          "Returns rate — high returns (>15%) worry lenders about revenue quality",
          "Catalogue depth — number of SKUs, private label vs reselling",
          "Account standing — marketplace health metrics, no policy violations",
          "Inventory turnover — days of inventory, festival season spike",
          "CIBIL of seller — 700+ preferred",
        ],
      },
      {
        eyebrow: "Common pitfalls",
        heading: "Why e-commerce seller files get rejected — and how to fix it",
        body:
          "Most rejections: cash-heavy operations outside the marketplace (lender can't see), high returns rate (>20%), marketplace policy violations, weak ITR profit (declared too low), or sector restriction at the lender. Each is fixable: route all marketplace collections through one bank account, manage returns actively, keep your marketplace account healthy, declare honest profit on ITR, and target lenders with e-commerce-specific products.",
        bullets: [
          "Cash-heavy outside marketplace → minimise off-marketplace sales",
          "High returns rate → improve product quality, photos, sizing accuracy",
          "Marketplace violations → resolve open cases, appeal unfair flags",
          "Weak ITR profit → declare honest profit for 1–2 years before applying",
          "Single-marketplace concentration → diversify across 2–3 platforms",
          "No brand identity → build a private label (lenders favour branded sellers)",
        ],
      },
    ],
    faqs: [
      {
        q: "I sell on Amazon and Flipkart with ₹3 Cr annual turnover — what ticket can I get?",
        a: "Most fintech lenders offer 5–10% of annual GST turnover as a loan — so ₹15–30 L is typical. Bank MSME loans can go higher if your ITR profit supports the DSCR. For a ₹50 L+ ticket, you typically need 3+ years of operations, strong ITR, and a clean CIBIL — a fintech loan alone won't reach that size.",
      },
      {
        q: "My marketplace account has a policy violation — will I be rejected?",
        a: "Possibly. Most marketplace-linked financing (Amazon Lending, Flipkart Growth Capital) requires your account to be in good standing. Some fintech lenders don't check marketplace standing directly — they only look at GST + banking. But the violation often correlates with cash flow disruption, which can show up in banking. Resolve the violation before applying.",
      },
      {
        q: "I want to launch my own D2C website — can I get funding for it?",
        a: "Yes, but the structure is different. D2C launch needs: (1) Capex for website/brand build (term loan or personal investment); (2) Working capital for inventory (CC/OD or fintech loan); (3) Marketing spend (OD or term loan). Lenders will look at your existing marketplace business for the underwriting basis. A 12-month strong track record on marketplaces makes the D2C launch fundable.",
      },
    ],
  },
  {
    slug: "funding-for-distributors",
    title: "Funding for Distributors — Dealer Financing, Stock Limits & Principal Backing",
    excerpt:
      "Distributors depend on a single principal, hold high inventory, sell on credit. Lenders evaluate principal relationship, stock turnover, and dealer agreement.",
    eyebrow: "Funding for Distributors",
    intro:
      "Distributors and dealers occupy a unique position — they depend on one or two principals (FMCG, autos, pharma), hold large inventory, sell on credit to retailers, and operate on thin margins (3–8%). Lenders view distributors favourably when the principal is creditworthy and the dealer agreement is long-standing. The financing mix: CC against stock + receivables, dealer financing schemes from the principal, and term loans for warehouse/vehicles.",
    sections: [
      {
        heading: "Financing instruments for distributors",
        cards: [
          { title: "Bank CC against stock + receivables", body: "Standard working capital CC. Drawing power = eligible inventory + receivables × lender's percentage. Cheapest (10–13%)." },
          { title: "Principal's dealer financing scheme", body: "Many principals (HUL, ITC, Maruti, etc.) have NBFC tie-ups for their distributors. Subsidised rate, fast approval. Best when available." },
          { title: "Channel financing", body: "Some principals offer financing to their distributors through partner NBFCs, often at preferential rates as part of the distribution agreement." },
          { title: "Term loan for warehouse / vehicles", body: "For expansion of storage capacity or delivery vehicles. Asset-backed, 3–7 year tenure." },
          { title: "LAP for warehouse premises", body: "If you own the warehouse or another property, LAP at 9–12% for major capex." },
        ],
      },
      {
        heading: "What lenders evaluate for distributor loans",
        bullets: [
          "Principal relationship — length of dealership, exclusive vs multi-brand",
          "Dealer agreement — tenure, renewal terms, termination clauses",
          "Stock turnover — days of inventory; fast turnover = healthy distributor",
          "Receivables ageing — credit to retailers, recovery pattern",
          "ITR — last 3 years; profit margin 3–8% typical for distribution",
          "Banking — credits from retailers, regular pattern, AMB comfortable",
          "GST turnover — reconcile with ITR and stock statement",
          "CIBIL of distributor + key promoters — 720+ preferred",
          "Vintage — most lenders want 3+ years as distributor",
          "Principal's financial strength — creditworthy principal = lower risk",
        ],
      },
      {
        eyebrow: "Best-fit financing",
        heading: "Choosing the right instrument for your distribution business",
        body:
          "Start by checking if your principal has a dealer financing scheme — these are usually the cheapest and fastest. If not, a bank CC against stock + receivables is the workhorse — cheapest standalone option. For expansion (new warehouse, more vehicles), term loan or LAP. Don't over-borrow against stock — if your principal terminates the agreement, you'll be left with inventory you can't sell and a loan you can't service.",
        bullets: [
          "First check principal's dealer financing scheme — usually best terms",
          "Then bank CC against stock + receivables — workhorse working capital",
          "Expansion (warehouse, vehicles) → term loan (asset-backed)",
          "Major capex (buy premises) → LAP against owned property",
          "Submit monthly stock + receivables statements to maximise CC drawing power",
          "Maintain 3+ year dealer agreement to strengthen file",
        ],
      },
    ],
    faqs: [
      {
        q: "My principal terminated my dealership — can I still get a loan?",
        a: "It's much harder. Lenders view the principal relationship as the core of the distributor's business. A terminated dealership means your revenue source is gone — most lenders will decline. Options: (1) Take a secured loan against property (doesn't depend on business revenue); (2) Pivot to a new principal and build 12+ months of track record before applying; (3) Personal loan for smaller needs.",
      },
      {
        q: "I'm a new distributor (1 year) — can I get working capital CC?",
        a: "It's harder but possible. Most banks want 3+ years of distribution track record for CC. Options: (1) Principal's dealer financing scheme (often available from year 1); (2) NBFC working capital OD (more flexible on vintage); (3) GST-based fintech loan (underwritten on turnover, not vintage); (4) Secured LAP if you have property. Build a 3-year track record to unlock bank CC rates.",
      },
      {
        q: "My stock turnover is 60 days — is that too slow for CC?",
        a: "Depends on the product category. FMCG distribution: 30–45 days is healthy, 60 days is slow. Pharma: 45–60 days is normal. Auto parts: 60–90 days is normal. Building materials: 60–90 days is normal. The lender benchmarks your turnover against category norms. If you're slower than category, the lender will haircut the stock value (lower drawing power).",
      },
    ],
  },
];

// ---------- WHO WE HELP (6 audiences) ----------
export const WHO_WE_HELP: KnowledgeArticle[] = [
  {
    slug: "business-owners",
    title: "Funding Solutions for Business Owners — Term Loans, OD, LAP & More",
    excerpt:
      "MSME business owners need a financing partner who reads the file the way an underwriter will. From capex to working capital, here's how we help.",
    eyebrow: "For Business Owners",
    intro:
      "As a business owner, your financing needs span capex, working capital, expansion and refinancing — each with a different optimal instrument. Velixa Capital is a loan & finance consultant for Indian MSMEs. We diagnose your file across all 6 funding pillars, identify the 1–2 lenders whose policy actually fits, and structure the right combination of facilities — not push the product that pays the highest commission.",
    sections: [
      {
        heading: "What we do for business owners",
        cards: [
          { title: "Credit readiness diagnosis", body: "We read your CIBIL, banking, ITR, GST, obligations and collateral the way an underwriter will — and tell you exactly what's blocking approval before you apply anywhere." },
          { title: "Product fit", body: "Term loan vs OD vs CC vs LAP vs CGTMSE — we match the instrument to the use of funds, not the other way around. The wrong structure costs you 4–8% in rate or hundreds in EMI." },
          { title: "Lender match", body: "40+ partner banks and NBFCs. Each has different policy boxes, sector preferences, ticket caps and rate ranges. We shortlist the 1–2 best fits for your file before any submission." },
          { title: "Documentation & submission", body: "We prepare the complete file — KYC, ITR, GST, banking, stock statement, MIS, reconciliation notes — so the underwriter sees a clean, well-presented case, not a pile of papers." },
          { title: "Negotiation", body: "When the offer comes in, we negotiate rate, tenure, processing fee and prepayment terms. The first offer is rarely the best — most lenders have flex depending on the strength of your file." },
          { title: "Post-disbursement support", body: "We help with documentation completion, RCC reviews, drawing power optimisation, and renewal planning — the work that keeps your facility healthy over time." },
        ],
      },
      {
        heading: "Typical engagement for a business owner",
        bullets: [
          "Free 30-minute discovery call to understand your need and current file",
          "Funding readiness scorecard across 6 pillars — shared in 48 hours",
          "Specific fixes identified (CIBIL, banking, ITR, GST) — usually 1–6 month roadmap",
          "Once file is ready, 1–2 lenders shortlisted based on policy fit",
          "Complete documentation pack prepared and submitted",
          "Offer negotiation — rate, tenure, fees",
          "Disbursement coordination and post-disbursement handover",
        ],
      },
      {
        eyebrow: "Common scenarios",
        heading: "How we've helped business owners like you",
        cards: [
          { title: "Manufacturer with low ITR profit", body: "Tax-optimised ITR was killing DSCR. We helped structure a 6-month plan to declare higher profit, then secured ₹1.5 Cr LAP against factory premises at 10.5% (vs 17% NBFC would have charged)." },
          { title: "Trader with cash-heavy banking", body: "Banking was 60% cash deposits — auto-decline at most banks. 6-month cleanup of digital credits + reconciliation note → ₹50 L bank CC at 11% (vs 22% fintech alternative)." },
          { title: "Established business with multiple expensive loans", body: "₹80 L of credit card + personal loan + small ODs averaging 22% p.a. Consolidated into one LAP at 10.5%, saving ₹9 L/year in interest." },
          { title: "Fast-growing startup needing scaling capital", body: "Bank wouldn't lend (vintage too short, ITR weak). Structured CGTMSE-backed ₹40 L term loan + ₹25 L NBFC OD for working capital. Total funding ₹65 L at blended 14% rate." },
        ],
      },
    ],
    faqs: [
      {
        q: "Do you charge the business owner for your service?",
        a: "No — our advisory is free for the borrower. We are paid by the lender on successful disbursement (a commission built into the loan pricing — the same rate you'd get going direct). You pay nothing extra to use us vs going direct; you get the value of expert advice and lender matchmaking.",
      },
      {
        q: "Will you pull my CIBIL report?",
        a: "Only with your explicit consent, and only when we're ready to submit to a specific lender. We do a 'soft' assessment first based on what you tell us + your bank statements. Hard enquiries only happen at submission — and only to the 1–2 best-fit lenders we've shortlisted, not 5+ random ones.",
      },
      {
        q: "What if my file isn't ready for a loan yet?",
        a: "We'll tell you honestly. If your CIBIL is too weak, banking too messy, or ITR too thin, we'll give you a 3–6–12 month roadmap with specific fixes. Once you've completed the fixes, we'll re-evaluate and approach lenders. There's no charge for the roadmap — we want your file to be approval-ready when you apply.",
      },
    ],
  },
  {
    slug: "traders",
    title: "Funding for Traders — Working Capital, Stock Finance & Receivables Backing",
    excerpt:
      "Trading businesses need fast, flexible working capital. From bank CC to fintech GST-loans to bill discounting — here's how we structure it.",
    eyebrow: "For Traders",
    intro:
      "Traders run on thin margins and fast cycles. The financing need is almost always working capital — to buy stock, sell on credit, bridge the receivables gap. Velixa Capital structures the right combination of CC, OD, bill discounting and GST-based loans for traders — based on your turnover, buyer profile, and stock cycle. We don't push a single product; we match the instrument to the use of funds.",
    sections: [
      {
        heading: "How we help traders",
        cards: [
          { title: "Working capital CC setup", body: "Bank CC against stock + receivables is the cheapest working capital (10–13% p.a.). We help with stock statement format, drawing power computation, and bank negotiation." },
          { title: "Bill discounting setup", body: "Against accepted invoices from creditworthy buyers. We identify which of your buyers qualify, set up the limit, and structure the discounting arrangement." },
          { title: "GST-based fintech loan", body: "For fast small-ticket needs (₹5–25 L). We match you to the right fintech based on your GST turnover and banking profile — avoiding the trap of applying to 5 and damaging your CIBIL." },
          { title: "Term loan for expansion", body: "For warehouse, vehicles, or one-time capex. Asset-backed, longer tenure. Combined with CC for working capital — the right mix for a growing trader." },
          { title: "Buyer reconciliation", body: "If your buyers are large corporates, PSUs, or government departments, we structure bill discounting that monetises their creditworthiness — often at rates 4–6% lower than OD." },
          { title: "Lender match", body: "Some banks prefer commodity traders; others prefer branded goods distributors; NBFCs are flexible but pricier. We match your trading profile to the right lender's policy box." },
        ],
      },
      {
        heading: "Typical trader engagement",
        bullets: [
          "Review of last 12 months GST returns, ITR, banking",
          "Assessment of buyer profile — creditworthy buyers enable bill discounting",
          "Stock and receivables ageing analysis",
          "Shortlist 1–2 best-fit lenders based on your trading line and turnover",
          "Prepare complete documentation pack (stock statement, buyer list, KYC, ITR, GST)",
          "Negotiate rate, drawing power %, margins",
          "Disbursement coordination and post-disbursement support (monthly stock statements)",
        ],
      },
      {
        eyebrow: "Common trader scenarios",
        heading: "Traders we've helped — and what we did",
        cards: [
          { title: "Commodity trader, ₹20 Cr turnover, ₹60 L profit", body: "Bank declined unsecured loan (DSCR borderline). Structured ₹2 Cr CC at 11% + ₹50 L bill discounting against corporate buyers. Total working capital ₹2.5 Cr at blended 12% rate." },
          { title: "FMCG distributor, principal-dependent", body: "Principal's dealer financing available but only ₹30 L. Top-up with bank CC of ₹75 L against stock + receivables. Total working capital ₹1.05 Cr — supports festival season build-up." },
          { title: "B2B trader with strong buyers but thin ITR", body: "ITR profit ₹8 L, GST turnover ₹4 Cr. Bill discounting against the corporate buyers — ₹1 Cr limit at 12% (vs NBFC OD at 18% that would have been the alternative)." },
          { title: "Cash-heavy trader switching to digital", body: "6-month cleanup of banking (insisted on UPI/RTGS from buyers), then secured ₹40 L bank CC at 11% (vs 22% fintech rate pre-cleanup). Interest savings of ₹4.4 L/year." },
        ],
      },
    ],
    faqs: [
      {
        q: "I have ₹5 Cr GST turnover but only ₹15 L ITR profit — can you help?",
        a: "Yes — this is a common trader profile. Traditional bank MSME loans will decline (DSCR fails on ₹15 L profit). We'd structure: (1) Bill discounting against your creditworthy buyers (rate 11–15%, doesn't depend on your profit); (2) NBFC working capital OD on turnover basis (rate 16–20%); (3) GST-based fintech loan (₹25 L–₹1 Cr, rate 16–22%). The right mix depends on your buyer profile and ticket need.",
      },
      {
        q: "My buyers take 60–90 days to pay — how do I finance the gap?",
        a: "Bill discounting is purpose-built for this. The lender pays you upfront against your accepted invoices (less a discount), then recovers from your buyer on due date. Rate is typically 11–15% p.a. — cheaper than OD — and the limit grows with your sales. Most useful when your buyers are creditworthy (large corporates, PSUs, government).",
      },
      {
        q: "I sell on Amazon and Flipkart — is that 'trading'?",
        a: "Yes — e-commerce selling is a form of trading. The financing options are slightly different (marketplace seller financing, settlement-linked loans, GST-based fintech loans). See our dedicated e-commerce seller page for the specific structure. We help both traditional B2B traders and online marketplace sellers.",
      },
    ],
  },
  {
    slug: "manufacturers",
    title: "Funding for Manufacturers — Term Loans, CC, Machinery Finance & CGTMSE",
    excerpt:
      "Manufacturing needs the right mix of term loan, working capital, machinery finance and BG limits. We structure the complete facility stack.",
    eyebrow: "For Manufacturers",
    intro:
      "Manufacturing is asset-heavy, cyclical, and has long working capital cycles. The financing structure usually combines four facilities — term loan for capex, CC for working capital, machinery finance for equipment, and BG limits for procurement. Velixa Capital structures the complete stack so each facility matches its use, instead of one large mispriced loan.",
    sections: [
      {
        heading: "What we structure for manufacturers",
        cards: [
          { title: "Term loan (capex)", body: "For plant, building, expansion. 5–10 year tenure, secured. Bank or NBFC. We negotiate rate, tenure, and prepayment terms." },
          { title: "Cash credit (working capital)", body: "Revolving limit against inventory + receivables. 12-month renewable. We help with drawing power computation and monthly stock statements." },
          { title: "Machinery finance", body: "Asset-backed loan for specific equipment. Lender holds lien on the machine. Lower rate, tenure matches asset life. We match you to the right asset finance company." },
          { title: "BG / LC limits", body: "Non-fund-based limits for procurement (LC for raw material imports) and contracts (BG for tenders). Saves cash outflow." },
          { title: "CGTMSE-backed loans", body: "Collateral-free up to ₹5 Cr under the Credit Guarantee scheme. We help with the eligibility check and the guarantee registration process." },
          { title: "LAP for factory premises", body: "If you own the factory or another property, LAP at 9–12% p.a. for major capex or refinancing costlier debt." },
        ],
      },
      {
        heading: "Typical manufacturer engagement",
        bullets: [
          "Full file diagnosis across 6 pillars — CIBIL, banking, ITR, GST, obligations, collateral",
          "Asset cover computation — total secured loans ÷ net owned assets",
          "Combined DSCR analysis across existing + proposed facilities",
          "Stock and receivables statement preparation (with stock age analysis)",
          "Order book documentation — confirmed orders, principal relationships",
          "Shortlist 1–2 lenders based on sector appetite and ticket size",
          "Negotiation of rate, tenure, drawing power, margins",
          "Post-disbursement support — monthly stock statements, RCC reviews, renewals",
        ],
      },
      {
        eyebrow: "Common manufacturer scenarios",
        heading: "Manufacturers we've structured financing for",
        cards: [
          { title: "Auto components manufacturer, ₹15 Cr turnover", body: "Needed ₹4 Cr for new CNC line. Structured: ₹2.5 Cr machinery finance at 11% (lien on CNC) + ₹1.5 Cr LAP against factory at 10%. Blended rate 10.6% vs 16% unsecured alternative." },
          { title: "Pharma manufacturer with sector exposure cap", body: "PSU bank had sector exposure cap on pharma. Pivoted to private bank + NBFC consortium: ₹3 Cr term loan + ₹2 Cr CC at blended 12% (vs 18% if forced to fintech)." },
          { title: "Small manufacturer with weak ITR but strong cash flow", body: "Tax-optimised ITR was killing bank DSCR. Took 6-month ITR cleanup approach + CGTMSE-backed ₹1 Cr term loan at 11% (collateral-free, government-guaranteed)." },
          { title: "Established manufacturer consolidating multiple loans", body: "₹3 Cr across 5 expensive loans (avg 17%). Consolidated into ₹3 Cr LAP at 10.5% + ₹1 Cr CC at 11%. Saves ₹18 L/year in interest." },
        ],
      },
    ],
    faqs: [
      {
        q: "How do you decide between term loan, CC and machinery finance?",
        a: "By use of funds. Term loan for plant/building/long-term capex (5–10 year tenure, secured against property). CC for working capital (revolving, against stock + receivables). Machinery finance for specific equipment (asset-backed, lien on the machine). The mix depends on what you're buying — rarely is one facility right for everything.",
      },
      {
        q: "Can you help with CGTMSE for a new manufacturing unit?",
        a: "Yes — CGTMSE is one of the most useful instruments for manufacturers. Up to ₹5 Cr collateral-free, with the Credit Guarantee Trust providing cover. Most banks and NBFCs offer it. The processing is slightly longer (guarantee registration) but the absence of collateral requirement is a major advantage. We handle the eligibility check, the documentation, and the guarantee registration.",
      },
      {
        q: "I have an existing CC and want to increase the limit — can you help?",
        a: "Yes — CC renewals and enhancements are a common engagement. We review your current drawing power, your stock and receivables growth, and approach your existing lender (or a new one) for an enhanced limit. Often a fresh lender will offer a significantly higher limit at a competitive rate if your file has improved since the original CC was sanctioned.",
      },
    ],
  },
  {
    slug: "professionals",
    title: "Funding for Professionals — Doctor, CA, Architect, Lawyer Practice Loans",
    excerpt:
      "Professionals have unique lending products: doctor loans, professional loans, practice ODs. We match you to the right scheme.",
    eyebrow: "For Professionals",
    intro:
      "Doctors, CAs, architects, lawyers, and other qualified professionals are among the most lendable categories in India — stable income, regulated qualifications, growing demand. Most banks have dedicated professional loan schemes with relaxed collateral norms and faster TAT. Velixa Capital matches your qualification, practice profile and need to the right scheme — across HDFC, ICICI, Axis, Bajaj, Kotak and others.",
    sections: [
      {
        heading: "How we help professionals",
        cards: [
          { title: "Doctor loan structuring", body: "HDFC, ICICI, Axis, Bajaj, Kotak all have doctor loan schemes. Up to ₹50 L (some ₹75 L) unsecured, 4–7 day TAT. We match your qualification + ITR to the best scheme." },
          { title: "CA / CS / ICWA professional loans", body: "Similar schemes for chartered accountants and company secretaries. Slightly smaller tickets (₹25–50 L) but similar relaxed norms." },
          { title: "Architect / engineer practice loans", body: "For architects, engineers, designers — combination of professional loan for working capital + equipment finance for tech/software/hardware." },
          { title: "Lawyer practice loans", body: "Specialised schemes for advocates — usually smaller tickets, based on ITR and years of practice." },
          { title: "Clinic / office setup loan", body: "For premises, interiors, equipment. Higher-ticket (₹25 L–₹2 Cr). Often secured (LAP) for larger tickets." },
          { title: "Equipment finance", body: "For medical equipment (MRI, CT, dental chairs), computers, software, design workstations. Asset-backed, lower rate." },
        ],
      },
      {
        heading: "Typical professional engagement",
        bullets: [
          "Free 30-minute discovery call — understand your practice, need, current file",
          "Review qualification, years of practice, ITR, banking, GST (if applicable)",
          "Shortlist 1–2 best-fit professional loan schemes based on your qualification",
          "Determine ticket size based on DSCR (1.5x+ preferred) and FOIR (<50–60%)",
          "Prepare documentation pack — qualification proof, ITR, banking, clinic/office tenure",
          "Submit to selected lender(s); negotiate rate, tenure, processing fee",
          "Disbursement coordination and post-disbursement support",
        ],
      },
      {
        eyebrow: "Common professional scenarios",
        heading: "Professionals we've helped — and how",
        cards: [
          { title: "MD doctor setting up new clinic", body: "₹75 L needed for premises + equipment. Structured: ₹35 L unsecured doctor loan at 13% + ₹20 L equipment finance at 12% (against the dental chair) + ₹20 L LAP against family property at 10.5%. Blended 11.8%." },
          { title: "CA firm expanding to second office", body: "₹40 L needed for office setup + 2 new partners. HDFC professional loan at 12.5% for ₹30 L + ₹10 L term loan against office equipment. Total ₹40 L at blended 12.6%." },
          { title: "Architect buying high-end workstation + software", body: "₹15 L for 4 workstations + Revit/AutoCAD licenses. Equipment finance at 11% — lien on the equipment, no other collateral needed." },
          { title: "Senior advocate with strong ITR, no property", body: "₹25 L personal-cum-professional loan at 13% ( Axis Bank lawyer scheme). Unsecured, 5-year tenure, EMI ~₹57,000." },
        ],
      },
    ],
    faqs: [
      {
        q: "I'm a fresh MBBS / BDS — can I get a loan to set up my first clinic?",
        a: "It's harder for fresh graduates. Most professional loan schemes require 3+ years of practice. Options for fresh setup: (1) CGTMSE-backed MSME loan (clinic as a startup); (2) LAP against family property; (3) Equipment finance where the equipment itself is collateral; (4) Personal loan for smaller needs (₹5–15 L). Once you have 2–3 years of ITR, professional loan schemes open up with much better terms.",
      },
      {
        q: "I'm a CA with ₹25 L ITR — how much can I borrow?",
        a: "Professional loans typically go up to 4–6x annual declared income (after add-backs). On ₹25 L ITR (with add-backs for depreciation/interest), you could qualify for ₹1–1.5 Cr unsecured at the high end. The exact ticket depends on FOIR (existing obligations), banking, and CIBIL. We'd compute your specific eligibility in the discovery call.",
      },
      {
        q: "My practice income is mostly cash — does that disqualify me?",
        a: "Not disqualify, but weaken. Lenders want to see digital credits (UPI/RTGS/NEFT) in your bank statement that reconcile with ITR and GST. If 60%+ of your revenue is cash, the file looks weak even with strong ITR. Start routing collections through UPI/digital channels — most clients prefer this now anyway. Build 12 months of clean digital banking, then apply.",
      },
    ],
  },
  {
    slug: "property-investors",
    title: "Funding for Property Investors — LAP, LRD, Top-Up & Portfolio Financing",
    excerpt:
      "Property investors have unique needs: LAP against held property, LRD against rental income, top-up on existing home loans. We structure it.",
    eyebrow: "For Property Investors",
    intro:
      "Property investors need financing instruments that unlock the value of property — without selling it. LAP (Loan Against Property) for outright-owned property, LRD (Lease Rental Discounting) against rental income, top-up on existing home loans, and portfolio-level financing across multiple properties. Velixa Capital structures the right mix for property investors, with the LTV, tenure and rate that match your strategy.",
    sections: [
      {
        heading: "Financing instruments for property investors",
        cards: [
          { title: "Loan Against Property (LAP)", body: "Against residential, commercial or industrial property you own. Up to 60–70% LTV (residential) or 50–60% (commercial). Rate 9–13% p.a. Tenure up to 15–20 years." },
          { title: "Lease Rental Discounting (LRD)", body: "Against rental income from a leased property. Lender takes assignment of rent. Higher LTV (up to 70–80% of discounted rental NPV). Rate 9.5–13% p.a." },
          { title: "Top-up on existing home loan", body: "If you have an existing home loan with repayment track record, top-up is the cheapest source of funds (home loan rate, not LAP rate). Up to the overall LTV cap." },
          { title: "Balance transfer + top-up", body: "Move existing home loan to a new lender at a lower rate, with a top-up for additional funds. Saves on rate + unlocks capital." },
          { title: "Plot loan + construction loan", body: "For buying land and constructing. Plot loan up to 70–80% LTV (residential plot); construction loan disbursed in stages." },
          { title: "Portfolio LAP", body: "For investors with multiple properties — pledge multiple properties as collateral for a single larger line. Useful for major capex or new acquisition." },
        ],
      },
      {
        heading: "What lenders evaluate for property-backed loans",
        bullets: [
          "Property title — clear, marketable, no encumbrance",
          "Valuation — lender's empanelled valuer, typically conservative vs market",
          "LTV — Loan-to-Value ratio; lower LTV = better rate + easier approval",
          "Property type — residential easiest, then commercial, then industrial",
          "DSCR / FOIR — your repayment capacity, independent of collateral",
          "CIBIL of borrower — 720+ preferred",
          "ITR / income proof — for repayment capacity assessment",
          "Property age — older properties may have lower LTV or shorter tenure",
          "Occupancy status — self-occupied, rented, or vacant affects LTV",
        ],
      },
      {
        eyebrow: "Investor strategies",
        heading: "How property investors use these instruments",
        cards: [
          { title: "Unlock capital from owned property", body: "₹1.5 Cr residential property owned outright. LAP at 60% LTV → ₹90 L at 10% p.a. Funds used for new acquisition or business capex." },
          { title: "Monetise rental income", body: "Commercial property leased to a corporate tenant at ₹3 L/month. LRD at 9.5% → ₹2 Cr line (against discounted rental NPV), without selling the property." },
          { title: "Refinance + extract equity", body: "Existing home loan of ₹40 L on property now worth ₹1.2 Cr (LTV 33%). Balance transfer + top-up → ₹70 L loan at home loan rate (cheaper than LAP)." },
          { title: "Portfolio pledge for new acquisition", body: "Two owned properties worth ₹2 Cr combined. Pledge both as collateral for ₹1 Cr LAP at 10% to fund a third acquisition." },
        ],
      },
    ],
    faqs: [
      {
        q: "How much can I borrow against my property?",
        a: "Typically 60–70% of the property's value for residential (LAP), 50–60% for commercial, 40–50% for industrial. The exact LTV depends on the lender, property type, your CIBIL, and the title clarity. A clean residential property in a tier-1 city with a clear title and a strong borrower profile can fetch 70% LTV at the best rate.",
      },
      {
        q: "Can I get LAP on a property that has an existing home loan?",
        a: "Yes — through a 'top-up loan' from the existing lender, or a 'balance transfer + top-up' to a new lender. The combined LTV (existing loan + new top-up) must stay within the lender's cap (typically 60–70% of property value for residential). The top-up rate is usually the home loan rate (cheaper than LAP rate).",
      },
      {
        q: "What's the difference between LAP and LRD?",
        a: "LAP is a loan against the property itself (any property you own, whether rented or not). LRD is a loan specifically against the rental income from a leased property — the lender takes assignment of the rent. LRD typically offers higher LTV (because the rental cash flow is contractually committed) but requires a lease with a creditworthy tenant.",
      },
    ],
  },
  {
    slug: "startups",
    title: "Funding for Startups — CGTMSE, MSME Loans, Venture Debt & Pre-Series Bridge",
    excerpt:
      "Startups face the toughest funding landscape — short vintage, weak ITR, no collateral. We help structure realistic options: CGTMSE, MSME loans, venture debt.",
    eyebrow: "For Startups",
    intro:
      "Startups are the hardest category to finance via traditional bank loans — short vintage, weak ITR, often negative profit, no collateral. But there are realistic options: CGTMSE-backed collateral-free MSME loans, NBFC working capital against banking and GST, and venture debt for venture-backed startups. We help founders navigate what's actually possible — not push unsecured loans at 24% that will crush the business.",
    sections: [
      {
        heading: "Realistic funding options for startups",
        cards: [
          { title: "CGTMSE-backed MSME loan", body: "Collateral-free up to ₹5 Cr under the Credit Guarantee scheme. Most banks offer. Requires Udyam registration, ITR (or projection if new), banking history. Slower TAT (4–6 weeks)." },
          { title: "NBFC working capital OD", body: "Small-ticket (₹5–50 L) OD against banking + GST. Higher rate (16–22%) but flexible. Useful for working capital bridge." },
          { title: "GST-based fintech loan", body: "For startups with >12 months of GST turnover. Fast (3–7 days), small ticket (₹5–25 L), high rate (18–24%). Best for short-term needs." },
          { title: "Venture debt", body: "For venture-backed startups that have raised an equity round. Specialised venture debt funds (InnoVen, Stride, Alteria) lend against the equity raise. Rate 12–15% + warrants." },
          { title: "Equipment finance", body: "For startups with tangible assets — servers, machinery, vehicles. Asset-backed, lender holds lien on the asset. Lower rate (11–14%)." },
          { title: "Founder personal loan + collateral", body: "For very early-stage startups, founder's personal credit + collateral (property, FD) is often the only realistic source. We structure LAP at 10–12% against founder/family property." },
        ],
      },
      {
        heading: "What we honestly tell startups",
        bullets: [
          "If <6 months vintage, no ITR, no collateral → very limited options (founder personal loan, friends & family, angel)",
          "If 1–2 years vintage, banking + GST growing → CGTMSE + NBFC OD become possible",
          "If 3+ years vintage, ITR positive → traditional bank MSME loans open up",
          "If venture-backed with an equity raise → venture debt is a strong option",
          "If pre-revenue, pre-VC → focus on equity (angels, accelerators) — debt is premature",
          "If profitable but cash-tight → CC/OD against receivables is the cleanest debt",
          "We won't push a 24% unsecured loan on a startup that should be raising equity",
        ],
      },
      {
        eyebrow: "Common startup scenarios",
        heading: "Startups we've helped — realistic outcomes",
        cards: [
          { title: "D2C brand, 2 years, ₹3 Cr revenue, ₹40 L profit", body: "CGTMSE-backed ₹50 L term loan at 12% + ₹25 L NBFC OD at 18% for inventory. Total ₹75 L at blended 14%. Avoided a 24% fintech alternative." },
          { title: "SaaS startup, pre-revenue, post-angel", body: "Honest assessment: no traditional debt available. Referred to two venture debt funds and an accelerator. Returned 6 months later post-VC seed round — structured ₹2 Cr venture debt at 13% + warrants." },
          { title: "Manufacturing startup, Udyam registered, 18 months", body: "CGTMSE ₹1 Cr term loan at 11% for plant + ₹40 L machinery finance at 12% for CNC line. Collateral-free, total ₹1.4 Cr at blended 11.3%." },
          { title: "Marketplace seller scaling fast", body: "GST-based fintech ₹20 L loan at 22% for festival inventory + ₹10 L OD at 18%. Quick disbursement, paid down within 90 days post-Diwali. Higher rate but matched the use case." },
        ],
      },
    ],
    faqs: [
      {
        q: "I'm a 6-month-old startup with no revenue — can I get a loan?",
        a: "Realistically, no traditional debt is available at 6 months with no revenue. Your options are: (1) Founder personal loan / credit card (small tickets only); (2) Friends & family / angel investment; (3) Accelerator program with grant/seed; (4) Wait — build revenue and GST history, then CGTMSE becomes available at 12+ months. We'd rather tell you this honestly than push a 24% loan that will crush your business.",
      },
      {
        q: "I've raised a seed round from VCs — can I get venture debt?",
        a: "Yes, if you've raised from a recognised institutional VC. Venture debt funds (InnoVent, Stride, Alteria, Trifecta, etc.) typically lend 25–40% of the last equity round, at 12–15% p.a. + equity warrants. The process takes 4–8 weeks. We help prepare the venture debt pack — financial model, use of funds, repayment plan — and match you to the right fund.",
      },
      {
        q: "Can I get a startup business loan without collateral?",
        a: "Yes — through CGTMSE. The Credit Guarantee Trust provides collateral-free cover up to ₹5 Cr for MSMEs (including eligible startups). Most banks and NBFCs offer CGTMSE-backed loans. You need Udyam registration, banking history (12+ months), and either ITR or projected financials. The guarantee registration adds 1–2 weeks to TAT but eliminates collateral requirement.",
      },
    ],
  },
];

// ---------- LOAN REJECTION LIBRARY (5 articles) ----------
export const LOAN_REJECTION: KnowledgeArticle[] = [
  {
    slug: "low-cibil",
    title: "Rejected for Low CIBIL — What to Do Next (and What Not to Do)",
    excerpt:
      "Your loan was rejected because of CIBIL. Don't apply to 5 more lenders — that makes it worse. Here's the exact recovery sequence.",
    eyebrow: "Low CIBIL Rejection",
    intro:
      "A CIBIL-based rejection is the most common — and the most mismanaged. Most borrowers react by applying to more lenders, hoping one will say yes. Each application is a hard enquiry, so 5 applications in 30 days tanks your score further and triggers 'credit-hungry' flags at every lender. The right sequence is: stop applying, pull your report, diagnose, fix, then approach 1–2 best-fit lenders.",
    sections: [
      {
        heading: "Step 1: Stop applying for new credit immediately",
        body:
          "Every hard enquiry stays on your CIBIL for 24 months. Lenders see the count and treat 4+ in 6 months as credit-hunger. 6+ in 6 months is often an automatic decline at most banks — regardless of your score. The first thing to do after any rejection is: don't apply anywhere else for the next 6 months.",
        bullets: [
          "Hard enquiries stay on CIBIL for 24 months",
          "4+ enquiries in 6 months = credit-hungry flag",
          "6+ enquiries in 6 months = auto-decline at most banks",
          "Stop applying immediately after a rejection — don't 'test the market'",
          "Pull your own CIBIL (soft check, no impact) to diagnose",
        ],
      },
      {
        heading: "Step 2: Pull your CIBIL report and read it like an underwriter",
        cards: [
          { title: "Score", body: "Below 700 = tight for most banks. Below 650 = only NBFCs/fintechs at higher rates. Below 600 = rarely approved anywhere." },
          { title: "Enquiry count", body: "Last 6 months: 0–3 healthy, 4–5 borderline, 6+ problematic. Last 12 months: 0–5 healthy, 6–8 borderline, 9+ problematic." },
          { title: "Days Past Due (DPD)", body: "Any DPD >0 in last 24 months is a yellow flag. DPD >30 is a red flag. DPD >90 (NPA) is a major decline reason." },
          { title: "Settled / written-off", body: "Any 'Settled' status stays for 7 years. Most banks auto-decline any settled trade. 'Written-off' is even worse." },
          { title: "Active trade mix", body: "5+ active unsecured trades (personal loans, credit cards) = over-leverage signal. Too few trades = thin file (also weak)." },
          { title: "Utilisation on revolving lines", body: "Credit card utilisation >50% of limit hurts score. >80% is a major red flag. Bring it under 30% for score recovery." },
        ],
      },
      {
        eyebrow: "Step 3 onwards",
        heading: "Step 3–5: Fix the report, wait, then re-apply strategically",
        bullets: [
          "Step 3: Pay down credit card utilisation to <30% of limit",
          "Step 4: Pay every existing EMI on or before due date for 6 months (set auto-debit)",
          "Step 5: If you have a settled trade, get a written closure letter and follow up with the bureau to update",
          "Step 6: After 6 months of clean behaviour + no new enquiries, re-check your CIBIL",
          "Step 7: Approach only 1–2 best-fit lenders (based on your score band and policy fit) — not 5",
          "Step 8: If still rejected, ask the lender for the specific decline reason and address it before next attempt",
        ],
      },
    ],
    faqs: [
      {
        q: "How long until my CIBIL score recovers enough to get a loan?",
        a: "It depends on the starting point and the issues. Pure enquiry overload: 6 months of no new applications + on-time payments should lift score 30–50 points. A settled trade: 7 years to fully fall off, but 2–3 years of clean behaviour afterwards helps. A recent DPD: 12–24 months of on-time payments to dilute. There is no overnight fix — anyone promising one is a fraud.",
      },
      {
        q: "Can I pay someone to 'fix' my CIBIL quickly?",
        a: "No legitimate service can remove accurate information from your CIBIL report faster than the natural timeline. Any agent promising 'CIBIL repair' for a fee is either a fraud or doing what you can do yourself for free: dispute inaccurate information (legitimate, takes 30 days), pay down utilisation, make on-time payments. Don't pay for 'repair'.",
      },
      {
        q: "I need a loan urgently and can't wait 6 months — what can I do?",
        a: "Three realistic options: (1) Secured loan against FD/gold/shares/property — CIBIL matters less when fully collateralised; (2) Apply with a co-applicant who has a strong CIBIL — combined profile can lift approval odds; (3) Approach an NBFC that accepts lower CIBIL, accepting the higher rate (16–24%). Avoid the trap of applying to 5 fintechs in parallel — each is a hard enquiry.",
      },
    ],
  },
  {
    slug: "existing-loans",
    title: "Rejected Due to Existing Loans — High FOIR and How to Reduce It",
    excerpt:
      "Your existing EMIs are eating your eligibility. Prepay, refinance, add a co-applicant — three levers to lower FOIR and qualify.",
    eyebrow: "Existing Loans / High FOIR",
    intro:
      "A rejection for 'high existing obligations' (high FOIR) is common and very fixable. FOIR caps your total monthly EMIs at 50–70% of net income. If your existing EMIs already consume 60%, there's no room for a new loan — even with a strong CIBIL and banking. The three levers: prepay existing loans (frees up FOIR), refinance/extend tenure (reduces EMI), or add a co-applicant (dilutes FOIR).",
    sections: [
      {
        heading: "Understand your current FOIR before re-applying",
        body:
          "FOIR = (Sum of all existing monthly EMIs + proposed EMI) ÷ Net monthly income. Compute this honestly before approaching any lender. List every loan EMI, credit card minimum (5% of limit or utilised — lender policy varies), and OD servicing. The proposed EMI is on the new loan you want. If the resulting FOIR is >60% for a bank or >70% for an NBFC, you'll be rejected — fix before applying.",
        bullets: [
          "List every existing EMI (home, car, personal, business, education, gold)",
          "Add credit card minimum dues (5% of limit per lender convention)",
          "Add OD interest servicing (1–2% of OD limit per month)",
          "Compute total existing obligations",
          "Divide by net monthly income → current FOIR (without new loan)",
          "Add proposed EMI → new FOIR (this is what the lender computes)",
        ],
      },
      {
        heading: "Three levers to reduce FOIR",
        cards: [
          { title: "1. Prepay existing loans", body: "Closing even one small loan (₹3–5 L personal loan) frees up significant monthly EMI. Prepay the highest-rate smallest-tenure loan first. Wait for closure to reflect on CIBIL (30–45 days) before applying." },
          { title: "2. Refinance / extend tenure", body: "Refinance an existing loan to a longer tenure — EMI drops, FOIR improves. Or restructure with the same lender. Trade-off: total interest paid increases, but eligibility unlocks." },
          { title: "3. Add a co-applicant", body: "Co-applicant's income gets added to the numerator (combined income), their EMIs to the denominator. If co-applicant has low obligations and separate income, combined FOIR drops significantly. Spouse, parent, sibling." },
        ],
      },
      {
        eyebrow: "Worked example",
        heading: "₹1.5 L income, ₹1 L existing EMIs — how to qualify for ₹25 L loan",
        body:
          "Current FOIR: ₹1,00,000 ÷ ₹1,50,000 = 67%. Bank cap 60%. Even with no new loan, FOIR exceeds some banks' cap. Proposed ₹25 L loan at 12% for 5 yrs → EMI ₹55,000. New FOIR: ₹1,55,000 ÷ ₹1,50,000 = 103% — auto-decline. Three paths: (1) Prepay the ₹8,000/month personal loan (₹4 L outstanding) → frees ₹8,000, FOIR drops to 97% — still over; (2) Add spouse with ₹80,000 income and no obligations → combined FOIR becomes (₹1,55,000) ÷ (₹2,30,000) = 67% — approvable at NBFC; (3) Take a smaller loan (₹10 L instead of ₹25 L) → EMI ₹22,000, new FOIR = 81% — still over.",
        bullets: [
          "Original scenario: FOIR 103% — auto-decline everywhere",
          "Prepay personal loan only: FOIR 97% — still declined",
          "Add spouse co-applicant: FOIR 67% — approvable at NBFC",
          "Combination (prepay + co-applicant): FOIR 63% — approvable at private bank",
          "Smaller ticket + co-applicant: FOIR 52% — approvable at PSU bank at best rate",
        ],
      },
    ],
    faqs: [
      {
        q: "If I prepay a loan, how soon can I apply for a new one?",
        a: "Wait for the prepayment to reflect on your CIBIL report — typically 30–45 days from the closure. Get the No Objection Certificate (NOC) from the closed lender and the closure confirmation. Pull your CIBIL to confirm the loan shows as 'Closed'. Then apply for the new loan — the lender will see the closed loan and your improved FOIR.",
      },
      {
        q: "Can I extend the tenure of an existing loan to reduce EMI?",
        a: "Sometimes. Your existing lender may agree to restructure (extend tenure) if you've been paying on time — approach them. Alternatively, refinance the existing loan with a new lender at a longer tenure (the new lender pays off the old loan, you start a new EMI). Both approaches reduce EMI and improve FOIR. Trade-off: more total interest paid over the longer tenure.",
      },
      {
        q: "Does adding a co-applicant affect their CIBIL?",
        a: "Yes — a co-applicant is equally liable for the loan. The loan appears on their CIBIL report, and any default hurts their score too. Their existing EMIs are also added to the FOIR computation. A co-applicant should be someone with separate income, low existing obligations, and strong CIBIL. Don't add a co-applicant with weak credit — it hurts the file.",
      },
    ],
  },
  {
    slug: "itr-mismatch",
    title: "Rejected for ITR Mismatch — Profit, Turnover & Reconciliation Fixes",
    excerpt:
      "ITR mismatch with GST or banking is a common decline. Here's how to prepare a reconciliation note and which lenders accept which gaps.",
    eyebrow: "ITR Mismatch",
    intro:
      "An ITR mismatch rejection usually means your ITR turnover doesn't reconcile with GST, banking, or your stated income doesn't support the proposed loan. Lenders underwrite on declared numbers — if ITR profit is too low for DSCR or turnover diverges from GST/banking, the file looks risky. The fixes: reconciliation note, revised ITR (if in window), or wait for next assessment year.",
    sections: [
      {
        heading: "Types of ITR mismatch rejections",
        cards: [
          { title: "ITR vs GST turnover", body: "GST turnover much higher than ITR turnover (3x+ gap = auto-decline). Lender suspects under-reported income." },
          { title: "ITR vs banking credits", body: "Banking credits much higher than ITR turnover. Lender suspects under-reported income or parallel cash flow." },
          { title: "Low ITR profit (DSCR fail)", body: "Tax-optimised ITR showing low net profit. DSCR falls below 1.5x for the proposed loan — bank decline." },
          { title: "Profit trend declining", body: "Last 3 years ITR shows declining profit. Lender worries about business trajectory." },
          { title: "Recent ITR not filed", body: "Latest assessment year ITR not yet filed. Most banks require last 2–3 years filed." },
          { title: "ITR and GST return dates mismatch", body: "Returns filed on different dates, suggesting inconsistencies. Clean up the timeline." },
        ],
      },
      {
        heading: "How to prepare a reconciliation note",
        body:
          "A reconciliation note explains every gap between ITR, GST, and banking — line by line. It turns a likely decline into a discussion. Pull GSTR-1 annual consolidated, GSTR-3B annual, ITR P&L schedule, and 12-month banking summary. List the turnover figures, the gap, and a one-line explanation for each reconciling item. Get your CA to sign the note — adds credibility.",
        bullets: [
          "Pull GSTR-1 + 3B annual consolidated (12 months)",
          "Pull ITR P&L schedule for the same financial year",
          "Pull 12-month bank statement, compute total credits",
          "List turnover figures side-by-side: GST vs ITR vs banking",
          "For each gap, identify the reconciling item (exempt sales, stock transfer, etc.)",
          "Get CA to sign the reconciliation note",
          "Carry this note to every lender meeting — don't wait to be asked",
        ],
      },
      {
        eyebrow: "Fix strategies",
        heading: "Three paths depending on the mismatch type",
        cards: [
          { title: "Gap is explainable (exempt sales, stock transfer)", body: "Reconciliation note usually rescues the file. Approach lenders with the note upfront. Most banks accept gaps <30% with proper documentation." },
          { title: "Gap is from suppressed ITR turnover", body: "Two options: (1) File revised ITR if within revision window (Section 139(5)); (2) Wait for next assessment year and declare honest turnover. Don't try to explain away suppressed income — lenders see it as fraud risk." },
          { title: "Low profit (DSCR fail) — tax-optimised", body: "Wait a year and declare higher profit. Or take a secured loan (DSCR matters less with collateral). Or approach NBFC with bank-statement underwriting (higher rate, but doesn't depend on ITR profit)." },
        ],
      },
    ],
    faqs: [
      {
        q: "Can I file a revised ITR after a loan rejection?",
        a: "Yes, if you're within the revision window. Under Section 139(5), you can revise your ITR any time before the end of the relevant assessment year, or before the assessment is completed (whichever is earlier). So for FY 2023-24 (AY 2024-25), you can revise until 31 December 2024. The revised ITR overrides the original. After the window closes, you have to wait for the next assessment year.",
      },
      {
        q: "How much gap between GST and ITR is acceptable to lenders?",
        a: "It varies by lender and reason for the gap. Indicative: <10% gap = no concern. 10–20% gap = acceptable with brief explanation. 20–30% gap = needs detailed reconciliation note. 30–50% gap = wary, may approve at higher rate or smaller ticket. 50%+ gap = most lenders decline. 3x+ gap = almost universal auto-decline.",
      },
      {
        q: "My ITR profit is genuinely low because the business had a bad year — will I be rejected?",
        a: "Possibly, but it depends on context. If it's a one-year dip with strong recovery in the next year, lenders will look at the trend. Bring documentation of what caused the dip (one-time event, market disruption) and proof of recovery (next year's ITR or provisional numbers). Most banks compute eligibility on the average of last 2 years' profit, which cushions a one-year dip.",
      },
    ],
  },
  {
    slug: "gst-issues",
    title: "Rejected for GST Issues — Returns, Mismatch & Compliance Fixes",
    excerpt:
      "Pending GST returns, GSTR-1 vs 3B mismatch, turnover gap with ITR — each is a different rejection. Here's the fix for each.",
    eyebrow: "GST Issues Rejection",
    intro:
      "A GST-based rejection can mean several things: pending returns (compliance failure), GSTR-1 vs 3B mismatch (data inconsistency), GST-ITR turnover gap (under-reporting suspicion), or GST registration issues. Each has a different fix. This guide walks through each rejection type and the specific remediation.",
    sections: [
      {
        heading: "Types of GST-related rejections",
        cards: [
          { title: "Pending GST returns", body: "Last 6–12 months of GSTR-1 or 3B not filed. Most lenders require 12 months of current returns. Pending returns is itself a decline reason." },
          { title: "GSTR-1 vs 3B mismatch", body: "GSTR-1 (outward supplies) doesn't reconcile with GSTR-3B (summary return). Indicates data inconsistency or compliance failure." },
          { title: "GST vs ITR turnover gap", body: "GST turnover much higher than ITR turnover — lender suspects under-reported income. 3x+ gap is usually auto-decline." },
          { title: "Composition scheme limitation", body: "Composition dealers don't file detailed GSTR-1. Some lenders' GST-based programs don't accept composition dealers." },
          { title: "Recent GST registration", body: "GST registration <12 months old — most GST-based lending requires 12+ months of returns." },
          { title: "GST turnover too low", body: "Annual GST turnover below lender's threshold (typically ₹25–50 L minimum for GST-based lending programs)." },
        ],
      },
      {
        heading: "Step-by-step GST compliance fix",
        bullets: [
          "Step 1: File all pending GSTR-1 and GSTR-3B for the last 12 months — late fee + interest applicable",
          "Step 2: Reconcile GSTR-1 (outward supplies) with GSTR-3B (summary) — fix any mismatch",
          "Step 3: Reconcile GST turnover with ITR turnover — prepare line-by-line reconciliation note",
          "Step 4: Reconcile GST turnover with banking credits — explain gaps (cash sales, exempt income)",
          "Step 5: Get CA-signed reconciliation note for any remaining gap",
          "Step 6: Wait for filed returns to reflect on GST portal (usually 24–48 hours)",
          "Step 7: Then approach lender with clean GST history + reconciliation note in hand",
        ],
      },
      {
        eyebrow: "Lender-specific guidance",
        heading: "Which lenders accept what GST profile",
        cards: [
          { title: "PSU banks", body: "Strict — require 12+ months of filed GST returns, GSTR-1 vs 3B match, GST-ITR turnover gap <30%. Use GST for cross-verification, not underwriting." },
          { title: "Private banks", body: "Slightly flexible — accept gap with reconciliation note up to 50%. Some have GST-based programs for small-ticket MSME loans." },
          { title: "NBFCs", body: "Mix — some have GST-based underwriting (will accept wider gaps), some use GST only for verification. Generally more flexible than banks." },
          { title: "Fintech GST-loan lenders", body: "Underwrite on GST turnover. Accept composition scheme (some), recent registration (some). Fast approval, small ticket, higher rate (16–24%)." },
        ],
      },
    ],
    faqs: [
      {
        q: "I have 3 pending GST returns — can I still apply for a loan?",
        a: "Most banks will decline until the pending returns are filed. File the pending returns (with late fee + interest), wait for them to reflect on the GST portal (24–48 hours), then apply. NBFCs and fintech lenders may be more lenient but at higher pricing. Don't apply with pending returns — it's a near-universal decline reason and the rejection enquiry will further weaken your CIBIL.",
      },
      {
        q: "My GSTR-1 turnover is ₹2 Cr but GSTR-3B shows ₹1.5 Cr — is this a problem?",
        a: "Yes — GSTR-1 vs 3B mismatch is a data inconsistency the lender will flag. Reconcile the two before applying. The mismatch usually comes from: (1) Amended invoices not reflected in 3B; (2) Credit notes issued but not adjusted; (3) Manual errors in 3B. Fix the underlying 3B (file revised if needed) so it matches GSTR-1. Then apply.",
      },
      {
        q: "Should I switch from composition scheme to regular scheme for easier lending?",
        a: "It depends on your turnover and willingness to comply. Composition scheme is simpler (less compliance, lower rate) but limits GST-based lending options. Regular scheme unlocks more lenders but adds monthly return filing, ITC reconciliation, e-invoicing (above threshold). If your turnover is approaching ₹1.5 Cr (the composition threshold for goods), switching to regular is often necessary anyway. Talk to your CA before deciding.",
      },
    ],
  },
  {
    slug: "banking-transactions",
    title: "Rejected for Banking Transactions — Bounces, Cash Deposits & AMB Fixes",
    excerpt:
      "Your bank statement is read like an X-ray. Bounces, cash deposits, low AMB — each red flag has a specific fix. Here's the 6-month cleanup.",
    eyebrow: "Banking Transactions Rejection",
    intro:
      "Banking rejections are the most under-appreciated — most borrowers focus on CIBIL and ITR but forget that the bank statement is read line-by-line. Bounced cheques, ECS returns, high cash-deposit ratio, low average balance, round-number transactions — each is a red flag. The fix takes 6–12 months of clean banking before applying.",
    sections: [
      {
        heading: "Banking red flags that trigger rejection",
        cards: [
          { title: "Cheque/ECS bounces", body: "Even one in 6 months is a yellow flag. 3+ in 12 months is usually auto-decline. Bounces signal cash-flow indiscipline." },
          { title: "Low average balance (AMB)", body: "AMB far below the proposed EMI. Lenders want AMB at 1.5–2x the proposed EMI comfortably maintained." },
          { title: "Cash deposit ratio >30%", body: "Cash deposits >30% of total credits signal untraceable income. Lenders prefer <10%." },
          { title: "Round-number large transactions", body: "Round-amount credits/debits (₹5 L in, ₹5 L out same day) flagged as round-tripping or informal lending." },
          { title: "Negative balance days", body: "Any day the account went negative. Most lenders treat even 1 such day as a yellow flag." },
          { title: "Concentrated credits", body: "1–2 parties = 70%+ of credits — concentration risk. What if they stop paying?" },
          { title: "Multiple small accounts", body: "Fragmented banking across many accounts — lender can't see the full picture." },
          { title: "No visible business/salary credits", body: "Primary account doesn't show income inflows — where's the money coming from?" },
        ],
      },
      {
        heading: "6-month banking cleanup plan",
        bullets: [
          "Step 1: Pick one primary account — route all business/salary income there",
          "Step 2: Stop cash deposits; insist on UPI/RTGS/NEFT from named parties",
          "Step 3: Set up auto-debit for every existing EMI — never miss a date",
          "Step 4: Maintain AMB at least 2x the EMI you'll eventually apply for",
          "Step 5: Avoid round-number large transfers in and out",
          "Step 6: Don't apply for any new unsecured credit during this period",
          "Step 7: Build 6+ months of clean banking before approaching any lender",
          "Step 8: Pull 12-month statement before applying — self-check for red flags",
        ],
      },
      {
        eyebrow: "Special situations",
        heading: "When you can't wait 6 months — alternatives",
        cards: [
          { title: "One-off bounce 4 months ago", body: "Get a letter from the bank explaining the reason (technical/signature mismatch). Apply with the explanation letter. Many lenders accept one explained bounce." },
          { title: "AMB too low for ticket", body: "Apply for a smaller loan with a smaller EMI that fits your AMB. Or apply with co-applicant whose banking is stronger." },
          { title: "Cash-heavy business (can't avoid)", body: "Some NBFCs and fintechs accept cash-heavy banking at higher pricing (16–24%). Be honest with the lender — hiding cash deposits is worse than disclosing." },
          { title: "Multiple accounts fragmenting profile", body: "Pick the strongest account, route all major activity there for 6+ months. Don't close other accounts immediately — lender may ask about them." },
        ],
      },
    ],
    faqs: [
      {
        q: "I had 2 cheque bounces in the last 6 months — should I wait or apply now?",
        a: "Two bounces in 6 months is borderline. Some banks will decline outright; others may approve at higher rate or with a co-applicant. If the bounces were technical (small amounts, signature mismatch, immediately settled), get a letter from the bank explaining each — this can rescue the file. If the bounces were from insufficient funds, wait until they're 6+ months in the past before applying.",
      },
      {
        q: "Can I switch my primary account to a different bank before applying?",
        a: "No — a brand-new account has no history and is worse than a 2-year-old account with one bounce. Lenders want 12 months of behaviour in the same account. If you must switch, do it 12+ months before applying, and keep the old account active in parallel during the transition. Consolidate to one strong primary account over time.",
      },
      {
        q: "I have an OD account that hits the limit frequently — will this hurt?",
        a: "Yes — frequent OD utilisation at the limit is a red flag. Lenders see it as cash-flow stress. Bring the OD utilisation down to 60–70% of the limit on average. If the OD is genuinely for working capital swings, document the pattern (e.g., seasonal build-up before festival sales) and explain in the file. Some lenders accept seasonal patterns if documented.",
      },
    ],
  },
];

// ---------- COMPARE (4 articles) ----------
export const COMPARE: KnowledgeArticle[] = [
  {
    slug: "nbfc-vs-bank-business-loan",
    title: "NBFC vs Bank Business Loan — Which Is Right for Your File?",
    excerpt:
      "Banks are cheaper but stricter. NBFCs are faster and more flexible but cost 3–8% more. The right choice depends on your file strength and urgency.",
    eyebrow: "NBFC vs Bank",
    intro:
      "Banks and NBFCs both lend to MSMEs, but with very different rules. Banks underwrite strictly (lower rates, slower TAT, harder to qualify). NBFCs are flexible (higher rates, faster TAT, more forgiving policy). Choosing wrong is expensive — going NBFC when you could qualify for a bank loan wastes 3–8% p.a. in rate; going bank when you don't qualify wastes 4–6 weeks of waiting and another hard enquiry on CIBIL.",
    sections: [
      {
        heading: "Side-by-side comparison",
        cards: [
          { title: "Underwriting strictness", body: "Banks: strict (CIBIL 720+, FOIR 50–60%, sector restrictions). NBFCs: flexible (CIBIL 650+, FOIR 60–70%, wider sector acceptance)." },
          { title: "Interest rate (indicative)", body: "Banks: 9–14% p.a. NBFCs: 13–22% p.a. Fintech NBFCs: 16–30% p.a. Final rate at lender's discretion." },
          { title: "Disbursement TAT", body: "Banks: 3–6 weeks. NBFCs: 1–2 weeks. Fintech NBFCs: 3–7 days. Speed premium for NBFCs is real." },
          { title: "Ticket size (unsecured)", body: "Banks: up to ₹50 L (some ₹75 L). NBFCs: up to ₹50 L. Fintech NBFCs: ₹5–25 L. Larger tickets require secured." },
          { title: "Tenure", body: "Banks: up to 5–7 years. NBFCs: up to 5 years. Fintech: 1–3 years. Longer tenure = lower EMI but more interest paid." },
          { title: "Documentation", body: "Banks: more paperwork (KYC + ITR + GST + banking + stock + MIS + reconciliation). NBFCs: lighter. Fintech: minimal (GST + banking API)." },
          { title: "Processing fee", body: "Banks: 0.5–2% + GST. NBFCs: 1.5–3% + GST. Fintech: 2–4% + GST. Higher fee for faster, more flexible." },
          { title: "Prepayment penalty", body: "Banks: 2–4% (some nil on floating). NBFCs: 4–5% (foreclosure). Fintech: 4–6%. Read the fine print carefully." },
        ],
      },
      {
        heading: "When to choose which — decision matrix",
        bullets: [
          "CIBIL 720+, clean banking, ITR profit strong → bank (lower rate)",
          "CIBIL 650–720, banking adequate, ITR weak → NBFC (more flexible)",
          "CIBIL below 650 → NBFC or fintech (banks won't approve)",
          "Need disbursement in 1 week → NBFC/fintech (banks slower)",
          "Ticket >₹50 L → bank (NBFC unsecured caps lower)",
          "Sector restricted at banks → NBFC (wider sector acceptance)",
          "Vintage <3 years → NBFC (banks want 3+ years)",
          "Clean strong file → always try bank first; save NBFC for second attempt",
        ],
      },
      {
        eyebrow: "Cost illustration",
        heading: "₹25 L for 5 years — bank vs NBFC vs fintech",
        body:
          "Bank @ 11% p.a.: EMI ~₹54,400, total interest ~₹7.6 L. NBFC @ 16% p.a.: EMI ~₹60,800, total interest ~₹11.5 L. Fintech @ 22% p.a.: EMI ~₹69,300, total interest ~₹16.6 L. Same ₹25 L loan costs ₹3.9 L more at NBFC and ₹9.0 L more at fintech vs bank — over 5 years. The rate spread is the cost of flexibility and speed.",
        bullets: [
          "₹25 L @ 11% bank, 5 yrs → EMI ₹54,400, total interest ₹7.6 L",
          "₹25 L @ 16% NBFC, 5 yrs → EMI ₹60,800, total interest ₹11.5 L",
          "₹25 L @ 22% fintech, 5 yrs → EMI ₹69,300, total interest ₹16.6 L",
          "Bank vs NBFC cost difference on ₹25 L: ₹3.9 L over 5 years",
          "Bank vs fintech cost difference on ₹25 L: ₹9.0 L over 5 years",
          "If your file qualifies for bank, the rate saving is substantial",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I move from an NBFC loan to a bank loan later?",
        a: "Yes — this is called 'takeover' or 'balance transfer'. If your file has improved (CIBIL up, banking clean, ITR stronger) since the NBFC loan, a bank may takeover the outstanding at a lower rate. The savings must justify the takeover cost (processing fee + documentation, typically 1–2% of outstanding). Worth considering after 12–18 months of on-time repayment.",
      },
      {
        q: "Why are NBFC rates higher than banks?",
        a: "Two reasons: (1) Cost of funds — banks raise deposits at lower rates (savings accounts at 3–4%, FDs at 6–7%), so they lend at lower rates. NBFCs raise money at higher rates (commercial paper, bonds at 8–10%), so they lend higher. (2) Risk premium — NBFCs lend to profiles banks decline, so they price in the additional risk. The spread covers both.",
      },
      {
        q: "Are NBFCs safer or riskier than banks for the borrower?",
        a: "For the borrower, the safety is similar — both are RBI-regulated. NBFCs may have less consumer-friendly processes (collections, restructuring, grievance redressal) than banks. The bigger risk for the borrower is the higher interest rate, not the lender failing. Always check the NBFC's RBI registration and ratings before borrowing.",
      },
    ],
  },
  {
    slug: "business-loan-vs-lap",
    title: "Business Loan vs Loan Against Property (LAP) — The Full Cost-Benefit",
    excerpt:
      "Unsecured business loan: fast, smaller, expensive. LAP: slow, larger, cheap. The wrong choice costs 4–8% in rate or risks your property unnecessarily.",
    eyebrow: "Business Loan vs LAP",
    intro:
      "Business loan (unsecured term loan) and LAP (Loan Against Property) serve fundamentally different needs. A business loan is fast, small-ticket, short-tenure, expensive, and unsecured. LAP is slow, large-ticket, long-tenure, cheap, and secured against property. Choosing the wrong one is costly — both in rupees and in opportunity. This comparison helps you decide based on your use case, ticket size, and risk appetite.",
    sections: [
      {
        heading: "Side-by-side comparison",
        cards: [
          { title: "Collateral", body: "Business loan: nil (unsecured). LAP: residential/commercial/industrial property pledged." },
          { title: "Ticket size", body: "Business loan: ₹5 L–₹50 L (typical). LAP: ₹25 L–₹10 Cr+ (depending on property value)." },
          { title: "Tenure", body: "Business loan: 1–5 years (some 7). LAP: 5–15 years (some 20)." },
          { title: "Interest rate (indicative)", body: "Business loan: 11–24% p.a. LAP: 9–13% p.a. Final rate at lender's discretion." },
          { title: "Disbursement TAT", body: "Business loan: 3–7 days. LAP: 3–6 weeks (title search, valuation, legal)." },
          { title: "DSCR requirement", body: "Business loan: 1.5x+ (strict). LAP: 1.25x+ (more flexible, collateral-backed)." },
          { title: "Documentation", body: "Business loan: KYC + ITR + GST + banking. LAP: all that + property docs + title chain + valuation." },
          { title: "End use", body: "Business loan: working capital, immediate capex. LAP: long-tenure capex, refinancing, large expansion." },
          { title: "Prepayment penalty", body: "Business loan: 4–5% (foreclosure). LAP: 2–4% (some nil on floating rate)." },
          { title: "Risk to borrower", body: "Business loan: only CIBIL damage on default. LAP: pledged property can be seized (SARFAESI)." },
        ],
      },
      {
        heading: "When to choose which — by use case",
        bullets: [
          "Short-term working capital, ₹5–25 L, need in 1 week → business loan",
          "Long-term capex, ₹50 L+, can wait 4 weeks, have property → LAP",
          "Refinancing expensive existing loans → LAP (lower rate, longer tenure)",
          "Major expansion (new factory, second outlet) → LAP",
          "Don't want to risk property → business loan (even if costlier)",
          "Borderline CIBIL/banking → LAP (collateral lifts approval odds)",
          "Mixed use (capex + working capital) → LAP for capex + OD for working capital",
          "Need ₹1 Cr+ unsecured → usually impossible; LAP is the realistic option",
        ],
      },
      {
        eyebrow: "Cost illustration",
        heading: "₹50 L for 5 years — business loan vs LAP",
        body:
          "Business loan @ 16% p.a., 5 yrs: EMI ~₹1,21,000, total interest ~₹22.6 L. LAP @ 10% p.a., 5 yrs: EMI ~₹1,06,000, total interest ~₹13.7 L. Same ticket, same tenure — LAP saves ₹15,000/month on EMI and ₹8.9 L in total interest. If you extend LAP to 10 years: EMI ₹66,000, total interest ₹29.2 L — lower EMI but more total interest.",
        bullets: [
          "₹50 L @ 16% business loan, 5 yrs → EMI ₹1,21,000, total interest ₹22.6 L",
          "₹50 L @ 10% LAP, 5 yrs → EMI ₹1,06,000, total interest ₹13.7 L",
          "₹50 L @ 10% LAP, 10 yrs → EMI ₹66,000, total interest ₹29.2 L",
          "5-year LAP saves ₹8.9 L in interest vs business loan",
          "10-year LAP frees ₹55,000/month cash flow but pays ₹6.6 L more total interest",
          "Choose by your binding constraint: cash flow (longer LAP) or total cost (shorter LAP)",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I take both a business loan and LAP simultaneously?",
        a: "Yes — they're independent facilities and a common combined structure. LAP for long-tenure capex (machinery, property, expansion) + business loan or OD for short-term working capital. The combined obligations must still pass FOIR and DSCR checks. Stacking both without planning causes over-leverage. We help structure the right combination.",
      },
      {
        q: "Does LAP require the property to be fully paid off (no existing loan)?",
        a: "Not necessarily. You can take LAP on a property with an existing home loan — subject to the existing lender's consent and the combined LTV staying within the new lender's cap. This is called a 'top-up loan' if from the same lender, or 'balance transfer + top-up' if moving to a new lender. The structure is common and works well.",
      },
      {
        q: "Is the interest on LAP tax-deductible?",
        a: "If LAP is used for business purpose, the interest is deductible as a business expense under Section 36(1)(iii) of the Income Tax Act. If used for non-business purposes (e.g., personal use, buying another residential property for self-occupation), it's not deductible. If used to buy a rental property, interest is deductible under Section 24(b) subject to caps. Keep end-use documented — lender will ask, and tax authorities may.",
      },
    ],
  },
  {
    slug: "gst-loan-vs-traditional-loan",
    title: "GST Loan vs Traditional Business Loan — When Speed Beats Rate",
    excerpt:
      "GST-based fintech loans are fast (3–7 days) but expensive (16–24%). Traditional bank loans are slow (4–6 weeks) but cheap (10–14%). Choose by urgency.",
    eyebrow: "GST Loan vs Traditional Loan",
    intro:
      "GST-based loans (offered by fintech NBFCs like Lendingkart, Indifi, FlexiLoans, etc.) underwrite on your GST turnover and banking — not ITR profit. They disburse in 3–7 days but charge 16–24% p.a. Traditional bank MSME loans underwrite on ITR profit and disburse in 4–6 weeks but charge 10–14% p.a. The right choice depends on your urgency, ticket need, and ITR strength.",
    sections: [
      {
        heading: "Side-by-side comparison",
        cards: [
          { title: "Underwriting basis", body: "GST loan: GST turnover + banking. Traditional: ITR profit + banking + collateral (if secured)." },
          { title: "Ticket size", body: "GST loan: ₹5 L–₹50 L (typical). Traditional unsecured: ₹5 L–₹50 L. Traditional secured (LAP): ₹25 L–₹10 Cr+." },
          { title: "Interest rate (indicative)", body: "GST loan: 16–24% p.a. Traditional unsecured: 11–18% p.a. Traditional secured (LAP): 9–13% p.a." },
          { title: "Disbursement TAT", body: "GST loan: 3–7 days. Traditional bank: 3–6 weeks. The speed premium is significant." },
          { title: "Documentation", body: "GST loan: minimal (GST portal API + bank statement API + KYC). Traditional: full pack (ITR + GST + banking + stock + MIS + reconciliation)." },
          { title: "Tenure", body: "GST loan: 6–36 months (short). Traditional: 1–7 years (unsecured) or up to 15 years (LAP)." },
          { title: "CIBIL requirement", body: "GST loan: 650+ (flexible). Traditional: 720+ (strict) for unsecured, 700+ for secured." },
          { title: "Prepayment penalty", body: "GST loan: 4–6% (foreclosure). Traditional: 2–4% (some nil on floating LAP)." },
        ],
      },
      {
        heading: "When to choose which — decision matrix",
        bullets: [
          "Need funds in <2 weeks → GST loan (speed wins)",
          "Need funds in 4–6 weeks → traditional bank (rate wins)",
          "ITR profit strong, clean banking → traditional (cheaper)",
          "ITR profit weak / tax-optimised → GST loan (underwrites on turnover)",
          "Ticket ₹5–25 L → either works; choose by urgency and ITR",
          "Ticket >₹25 L → traditional (GST loans cap lower)",
          "Short-term working capital need (3–12 months) → GST loan",
          "Long-term capex (3–7 years) → traditional (lower rate over long tenure)",
          "Borderline CIBIL (650–720) → GST loan (more lenient)",
          "Strong CIBIL (720+) → traditional (better rate)",
        ],
      },
      {
        eyebrow: "Cost illustration",
        heading: "₹15 L for 24 months — GST loan vs traditional",
        body:
          "GST loan @ 22% p.a. (flat-rate equivalent ~14%): EMI ~₹78,000, total interest ~₹3.7 L. Traditional bank @ 13% p.a.: EMI ~₹71,500, total interest ~₹2.1 L. On a 2-year ₹15 L loan, traditional saves ₹6,500/month on EMI and ₹1.6 L in total interest. The savings justify the longer wait if you have 4–6 weeks.",
        bullets: [
          "₹15 L @ 22% GST loan, 24 mo → EMI ₹78,000, total interest ₹3.7 L",
          "₹15 L @ 13% traditional, 24 mo → EMI ₹71,500, total interest ₹2.1 L",
          "Traditional saves ₹1.6 L over 24 months on same ticket",
          "GST loan disburses in 5 days vs traditional's 30–40 days",
          "Choose GST loan when the 25-day speed premium is worth ₹1.6 L",
          "Choose traditional when you can wait — the saving compounds on larger tickets",
        ],
      },
    ],
    faqs: [
      {
        q: "Why do GST loans charge higher rates than traditional bank loans?",
        a: "Three reasons: (1) Risk premium — GST loans underwrite on turnover, not profit. The lender takes on more risk (the borrower may have thin profit) and prices for it. (2) Cost of capital — fintech NBFCs raise funds at higher rates than banks (commercial paper, bonds), so they lend higher. (3) Speed premium — the 3–7 day TAT requires more automation, less manual underwriting, which costs the lender.",
      },
      {
        q: "Can I take a GST loan first and refinance to a bank loan later?",
        a: "Yes — this is a common strategy for borrowers who need fast cash now but want lower rates later. Take a GST loan for immediate need (3–7 days), build a 12–18 month repayment track record, then approach a bank for a 'takeover' or 'balance transfer' at a lower rate. The bank sees the GST loan's clean repayment as positive credit behaviour. Net cost: slightly higher for the first year, then lower for the remaining tenure.",
      },
      {
        q: "Are GST loans safe? Some fintech lenders seem aggressive.",
        a: "Most RBI-registered NBFCs offering GST-based loans are legitimate, but practices vary. Watch out for: (1) Hidden processing fees or 'platform fees' added to the principal; (2) Flat-rate quoting (which understates the true effective rate — convert to reducing balance for comparison); (3) Aggressive collection practices in case of default. Always check RBI registration, read the loan agreement carefully, and verify the effective rate (not the headline rate).",
      },
    ],
  },
  {
    slug: "private-vs-public-sector-bank-loans",
    title: "Private vs Public Sector Bank Business Loans — Rate, Speed & Flexibility",
    excerpt:
      "PSU banks offer the lowest rates but slowest TAT. Private banks are faster and more flexible but slightly costlier. Here's how to choose.",
    eyebrow: "Private vs Public Sector Bank",
    intro:
      "Within the bank universe, PSU banks (SBI, PNB, BoB, Canara, Bank of India, etc.) and private banks (HDFC, ICICI, Axis, Kotak, Yes, IDFC First) operate quite differently. PSU banks have lower cost of funds and offer the lowest rates, but are slower and stricter on documentation. Private banks are faster, more flexible, and have better digital processes, but charge 0.5–1.5% more. The right choice depends on your file strength and timeline.",
    sections: [
      {
        heading: "Side-by-side comparison",
        cards: [
          { title: "Interest rate (indicative)", body: "PSU banks: 9.5–13% p.a. Private banks: 10.5–14.5% p.a. PSU banks typically 0.5–1.5% cheaper for the same profile." },
          { title: "Disbursement TAT", body: "PSU banks: 4–6 weeks (sometimes 8). Private banks: 2–4 weeks. Private is faster on average." },
          { title: "Underwriting flexibility", body: "PSU banks: strict policy, less discretion at branch level. Private banks: more discretion, can make exceptions." },
          { title: "Documentation", body: "PSU banks: heavier, more bureaucratic. Private banks: more streamlined, more digital." },
          { title: "Processing fee", body: "PSU banks: 0.25–1.5% + GST. Private banks: 0.5–2.5% + GST. PSU banks typically lower." },
          { title: "Customer service", body: "PSU banks: variable, branch-dependent. Private banks: more consistent, better digital support." },
          { title: "Sectoral appetite", body: "PSU banks: mandated priority sector lending (agriculture, MSME, weaker sections). Private banks: more selective on sectors." },
          { title: "Prepayment penalty", body: "Both: 2–4% typical (some nil on floating rate loans). Read the fine print carefully." },
        ],
      },
      {
        heading: "When to choose which — decision matrix",
        bullets: [
          "Lowest rate is the priority, can wait 6 weeks → PSU bank",
          "Need disbursement in 2–3 weeks → private bank",
          "Clean strong file, vanilla MSME loan → PSU bank (lowest rate)",
          "Borderline file, need flexibility on policy → private bank",
          "Priority sector (agriculture, MSME manufacturing) → PSU bank (priority sector rates)",
          "Service sector, professionals → private bank (more appetite)",
          "Existing relationship with PSU bank → PSU (faster processing for existing customers)",
          "Existing salary/business account with private bank → private (faster KYC)",
          "Larger ticket (₹2 Cr+) → PSU bank (better ticket capacity)",
          "Smaller ticket (₹10–25 L) → either; choose by relationship and TAT",
        ],
      },
      {
        eyebrow: "Cost illustration",
        heading: "₹50 L for 7 years — PSU vs private bank",
        body:
          "PSU bank @ 10.5% p.a., 7 yrs: EMI ~₹83,500, total interest ~₹20.1 L. Private bank @ 12% p.a., 7 yrs: EMI ~₹88,200, total interest ~₹24.1 L. Same ticket, same tenure — PSU saves ₹4,700/month on EMI and ₹4.0 L in total interest. The savings are real but the trade-off is 1–2 weeks longer TAT and stricter documentation at PSU.",
        bullets: [
          "₹50 L @ 10.5% PSU, 7 yrs → EMI ₹83,500, total interest ₹20.1 L",
          "₹50 L @ 12% private, 7 yrs → EMI ₹88,200, total interest ₹24.1 L",
          "PSU saves ₹4,700/month EMI and ₹4.0 L total interest",
          "Trade-off: PSU is slower (4–6 weeks vs 2–4) and stricter on docs",
          "For very strong files, the rate saving justifies the wait",
          "For time-sensitive needs, private bank's speed premium is worth it",
        ],
      },
    ],
    faqs: [
      {
        q: "Are PSU banks safer than private banks for borrowers?",
        a: "From a borrower's perspective, both are RBI-regulated and equally safe. PSU banks are government-owned (soveraignty-backed); private banks are shareholder-owned but subject to the same RBI regulation and deposit insurance. The borrower's risk in either case is the interest rate, processing fee, and prepayment terms — not the bank failing. Choose based on rate, TAT, and service, not on perceived 'safety'.",
      },
      {
        q: "Why do PSU banks charge lower rates than private banks?",
        a: "Two reasons: (1) Cost of funds — PSU banks have a large base of savings accounts (3.5% interest) and current accounts (0% interest), giving them a low cost of funds. Private banks rely more on fixed deposits and wholesale funding. (2) Mandate — PSU banks have priority sector lending mandates that require them to lend to MSMEs at regulated rates. Both factors let PSU banks offer lower lending rates.",
      },
      {
        q: "I have an existing relationship with SBI — should I apply there first?",
        a: "Usually yes. Existing PSU bank customers (especially with a 5+ year relationship, salary account, or business current account) get faster processing, lower documentation, and sometimes preferential rates. The branch manager has more discretion for known customers. Apply to your existing PSU bank first — if declined or slow, then approach a private bank or NBFC.",
      },
    ],
  },
];

// ---------- HELPERS ----------
export function getKnowledgeArticle(slug: string): KnowledgeArticle | undefined {
  return KNOWLEDGE_HUB.find((a) => a.slug === slug);
}

export function getWhoWeHelpAudience(slug: string): KnowledgeArticle | undefined {
  return WHO_WE_HELP.find((a) => a.slug === slug);
}

export function getLoanRejectionArticle(slug: string): KnowledgeArticle | undefined {
  return LOAN_REJECTION.find((a) => a.slug === slug);
}

export function getCompareArticle(slug: string): KnowledgeArticle | undefined {
  return COMPARE.find((a) => a.slug === slug);
}

// Cluster definitions for the knowledge-hub index page
export const KNOWLEDGE_HUB_CLUSTERS: { id: string; title: string; description: string; slugs: string[] }[] = [
  {
    id: "rejections",
    title: "Why Loan Applications Get Rejected",
    description:
      "The 6 most common rejection triggers — CIBIL, FOIR, banking, GST mismatch, low profit, excess enquiries — and the fix for each.",
    slugs: [
      "why-loan-applications-get-rejected",
      "low-cibil-rejection",
      "gst-mismatch-rejection",
      "banking-red-flags",
      "high-foir-issues",
      "low-profit-declaration",
    ],
  },
  {
    id: "readiness",
    title: "Funding Readiness",
    description:
      "How credit managers evaluate your file, what DSCR and FOIR actually mean, and the 6-pillar readiness framework.",
    slugs: [
      "how-credit-managers-evaluate-files",
      "dscr-explained",
      "foir-explained",
      "gst-vs-itr",
    ],
  },
  {
    id: "business-finance",
    title: "Business Finance",
    description:
      "Banking analysis, funding readiness, and the product comparisons every MSME should understand before borrowing.",
    slugs: [
      "banking-analysis",
      "funding-readiness",
      "business-loan-vs-lap",
      "od-vs-term-loan",
      "secured-vs-unsecured",
    ],
  },
  {
    id: "industry-funding",
    title: "Industry Funding",
    description:
      "Sector-specific underwriting lenses — manufacturing, trading, doctors, contractors, restaurants, e-commerce, distributors.",
    slugs: [
      "nbfc-vs-bank",
      "industry-funding",
      "funding-for-doctors",
      "funding-for-manufacturers",
      "funding-for-traders",
      "funding-for-contractors",
      "funding-for-restaurants",
      "funding-for-e-commerce-sellers",
      "funding-for-distributors",
    ],
  },
];
