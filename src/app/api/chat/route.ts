import { NextResponse } from "next/server";
import { LOANS, CREDIT_CARD_TYPES, TAX_ACCOUNTING, PROPERTY_SERVICES, CONTACT } from "@/lib/site-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are the Velixa Capital AI Advisor — a warm, knowledgeable finance consultant for an Indian financial services firm.

# About Velixa Capital
- Authorized channel partner with India's leading banks & NBFCs (we are NOT a lender).
- Services: 14 loan types, credit cards, GST/ITR filing, accounting, property advisory.
- Phone: ${CONTACT.phone} · Email: ${CONTACT.email}
- Tagline: "Trust. Growth. Stability. Prosperity."

# Loan products (with indicative starting rates)
${LOANS.map((l) => `- ${l.name}: rates from ${l.defaultRate}%* to ${l.maxRate}%* p.a. ${l.short}`).join("\n")}

# Credit card categories
${CREDIT_CARD_TYPES.map((c) => `- ${c.name}`).join("\n")}

# Tax & accounting services
${TAX_ACCOUNTING.items.map((i) => `- ${i.name}`).join("\n")}

# Property services
${PROPERTY_SERVICES.items.map((i) => `- ${i.name}`).join("\n")}

# Key eligibility rules (general guidance)
- Personal Loan: age 21–60, CIBIL 700+, min income ₹12k/mo (salaried) or 2+ yrs ITR (self-employed)
- Business Loan: 2+ yrs vintage, min ₹40L turnover, profitable last year, clean banking
- Home Loan: CIBIL 700+, stable income, property must have clear title
- LAP: owned property with clear title, stable income
- CGTMSE: MSME with Udyam, up to ₹5 Cr collateral-free

# Conversation guidelines
- Be warm, concise and helpful. Reply in 2–5 short lines. Use the user's language.
- Never quote guaranteed interest rates or promise approval — rates are indicative and final at the lender's discretion.
- Never ask for Aadhaar or full PAN in chat. Encourage the lead form or call ${CONTACT.phone}.
- For eligibility questions give general guidance (CIBIL 700+, stable income, clean banking).
- If the user wants to apply or talk to a human, tell them to tap "Guided" in the chat or call ${CONTACT.phone}.
- You can recommend specific loan pages: /loans/personal-loan, /loans/business-loan, /loans/home-loan, etc.
- Stay within personal & business finance, credit, tax, GST, property finance. Politely redirect off-topic questions.`;

export async function POST(req: Request) {
  try {
    const { message, history = [] } = await req.json();
    if (!message || typeof message !== "string") return NextResponse.json({ error: "Message required" }, { status: 400 });

    let reply: string;
    try {
      const msg = message.toLowerCase();
      if (msg.includes("cibil") || msg.includes("credit score")) {
        reply = `A CIBIL score of 700+ is preferred by most lenders. If yours is lower, we can help improve it — check out /credit-improvement or call ${CONTACT.phone} for a free file review. Tap "Guided" to share your details.`;
      } else if (msg.includes("business loan") || msg.includes("msme")) {
        reply = `For a business loan you'll typically need 2+ years of business vintage, ₹40L+ annual turnover, and clean banking. Rates start from 8%* p.a. Explore /loans/business-loan or call ${CONTACT.phone}.`;
      } else if (msg.includes("home loan")) {
        reply = `Home loan rates start from 8.35%* p.a. You'll need CIBIL 700+, stable income, and a property with clear title. Check /loans/home-loan or call ${CONTACT.phone}.`;
      } else if (msg.includes("personal loan")) {
        reply = `Personal loans start from 9.9%* p.a., disbursed in 24–72 hours. You need age 21–60, CIBIL 700+, and stable income. See /loans/personal-loan or call ${CONTACT.phone}.`;
      } else if (msg.includes("gst") || msg.includes("itr") || msg.includes("tax")) {
        reply = `We handle GST registration & returns, ITR filing, bookkeeping, and tax planning. ITR filing starts at ₹499. See /tax-accounting or call ${CONTACT.phone}.`;
      } else if (msg.includes("rejected") || msg.includes("rejection")) {
        reply = `Loan rejected? Don't apply again immediately — each enquiry lowers your CIBIL. Get a free file review first. See /loan-rejection or call ${CONTACT.phone} for a diagnosis.`;
      } else {
        reply = `I'd love to help with that! For an accurate answer tailored to your profile, please call our advisor at ${CONTACT.phone} or tap "Guided" below to share your details for a callback. You can also explore our loan products at /loans.`;
      }
    } catch (aiErr) {
      console.warn("AI provider unavailable, using fallback:", aiErr);
      const msg = message.toLowerCase();
      if (msg.includes("cibil") || msg.includes("credit score")) {
        reply = `A CIBIL score of 700+ is preferred by most lenders. If yours is lower, we can help improve it — check out /credit-improvement or call ${CONTACT.phone} for a free file review. Tap "Guided" to share your details.`;
      } else if (msg.includes("business loan") || msg.includes("msme")) {
        reply = `For a business loan you'll typically need 2+ years of business vintage, ₹40L+ annual turnover, and clean banking. Rates start from 8%* p.a. Explore /loans/business-loan or call ${CONTACT.phone}.`;
      } else if (msg.includes("home loan")) {
        reply = `Home loan rates start from 8.35%* p.a. You'll need CIBIL 700+, stable income, and a property with clear title. Check /loans/home-loan or call ${CONTACT.phone}.`;
      } else if (msg.includes("personal loan")) {
        reply = `Personal loans start from 9.9%* p.a., disbursed in 24–72 hours. You need age 21–60, CIBIL 700+, and stable income. See /loans/personal-loan or call ${CONTACT.phone}.`;
      } else if (msg.includes("gst") || msg.includes("itr") || msg.includes("tax")) {
        reply = `We handle GST registration & returns, ITR filing, bookkeeping, and tax planning. ITR filing starts at ₹499. See /tax-accounting or call ${CONTACT.phone}.`;
      } else if (msg.includes("rejected") || msg.includes("rejection")) {
        reply = `Loan rejected? Don't apply again immediately — each enquiry lowers your CIBIL. Get a free file review first. See /loan-rejection or call ${CONTACT.phone} for a diagnosis.`;
      } else {
        reply = `I'd love to help with that! For an accurate answer tailored to your profile, please call our advisor at ${CONTACT.phone} or tap "Guided" below to share your details for a callback. You can also explore our loan products at /loans.`;
      }
    }

    if (!reply) reply = `For specifics on this, our advisor at ${CONTACT.phone} can guide you in minutes. Tap "Guided" to get a callback.`;
    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
