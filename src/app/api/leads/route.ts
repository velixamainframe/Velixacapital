import { NextResponse } from "next/server";
import { createLead } from "@/lib/data";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, mobile, email, pan, employment_type, monthly_income, business_details, service, loan_amount, city, message, sourcePage, affiliateSlug } = body || {};

    if (!name || !mobile || !email) {
      return NextResponse.json({ error: "Name, mobile and email are required" }, { status: 400 });
    }
    const digits = String(mobile).replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(digits)) {
      return NextResponse.json({ error: "Enter a valid 10-digit Indian mobile" }, { status: 400 });
    }

    const lead = await createLead({
      name: String(name),
      mobile: digits,
      email: String(email),
      pan: pan ? String(pan) : undefined,
      employmentType: employment_type,
      monthlyIncome: monthly_income ? Number(monthly_income) : undefined,
      businessDetails: business_details,
      service,
      loanAmount: loan_amount ? Number(loan_amount) : undefined,
      city,
      message,
      sourcePage,
      affiliateSlug: affiliateSlug ?? null,
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (e) {
    console.error("Lead submission failed:", e);
    return NextResponse.json(
      { error: "We couldn't save your request right now. Please try again or call us directly." },
      { status: 500 },
    );
  }
}
