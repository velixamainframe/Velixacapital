import { NextResponse } from "next/server";
import { createPartnerApplication } from "@/lib/data";

export const runtime = "nodejs";

const MOBILE_RE = /^[6-9]\d{9}$/;
const NAME_RE = /^[A-Za-z .'-]{2,100}$/;
const EMAIL_RE = /^\S+@\S+\.\S+$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/i;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      full_name,
      mobile,
      email,
      pan_number,
      city,
      current_profession,
      business_type,
      experience_years,
      expected_monthly_leads,
      message,
      sourcePage,
    } = body || {};

    if (!full_name || !mobile || !email || !city) {
      return NextResponse.json(
        { error: "Full name, mobile, email and city are required" },
        { status: 400 },
      );
    }
    if (!NAME_RE.test(String(full_name))) {
      return NextResponse.json({ error: "Enter a valid full name" }, { status: 400 });
    }
    const digits = String(mobile).replace(/\D/g, "");
    if (!MOBILE_RE.test(digits)) {
      return NextResponse.json(
        { error: "Enter a valid 10-digit Indian mobile (starting 6–9)" },
        { status: 400 },
      );
    }
    if (!EMAIL_RE.test(String(email))) {
      return NextResponse.json({ error: "Enter a valid email" }, { status: 400 });
    }
    if (pan_number && !PAN_RE.test(String(pan_number))) {
      return NextResponse.json({ error: "Enter a valid PAN (e.g. ABCDE1234F)" }, { status: 400 });
    }
    if (String(city).trim().length < 2) {
      return NextResponse.json({ error: "Enter your city" }, { status: 400 });
    }

    const app = await createPartnerApplication({
      fullName: String(full_name).trim(),
      mobile: digits,
      email: String(email).trim().toLowerCase(),
      pan: pan_number ? String(pan_number).toUpperCase() : undefined,
      city: String(city).trim(),
      currentProfession: current_profession ? String(current_profession) : undefined,
      businessType: business_type ? String(business_type) : undefined,
      experienceYears: experience_years ? Number(experience_years) : undefined,
      expectedMonthlyLeads: expected_monthly_leads ? Number(expected_monthly_leads) : undefined,
      message: message ? String(message) : undefined,
      sourcePage: sourcePage ?? "/partner",
    });

    return NextResponse.json({ ok: true, id: app.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
