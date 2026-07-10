"use client";

import { useState } from "react";
import { toast } from "sonner";
import { submitLead } from "@/lib/lead-submit";
import { CheckCircle2, Loader2, Pencil } from "lucide-react";

export type LeadVariant = "loan" | "tax-accounting" | "property" | "credit-card" | "general";

type Props = {
  service?: string;
  variant?: "card" | "inline";
  formVariant?: LeadVariant;
  title?: string;
  subtitle?: string;
};

const inputCls =
  "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary disabled:bg-muted disabled:text-muted-foreground";

const MOBILE_RE = /^[6-9]\d{9}$/;
const NAME_RE = /^[A-Za-z .'-]{2,100}$/;
const EMAIL_RE = /^\S+@\S+\.\S+$/;

export function LeadForm({ service, variant = "card", formVariant = "loan", title, subtitle }: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [employment, setEmployment] = useState<"salaried" | "self_employed" | "business">("salaried");
  const [basic, setBasic] = useState({ name: "", mobile: "", email: "", city: "" });
  const [verified, setVerified] = useState(false);

  function verifyBasic(e: React.FormEvent) {
    e.preventDefault();
    const name = basic.name.trim();
    const mobile = basic.mobile.trim().replace(/\s|-/g, "");
    const email = basic.email.trim();
    const city = basic.city.trim();
    if (!NAME_RE.test(name)) { toast.error("Enter a valid full name (letters only, min 2)"); return; }
    if (!MOBILE_RE.test(mobile)) { toast.error("Enter a valid 10-digit Indian mobile (starting 6–9)"); return; }
    if (!EMAIL_RE.test(email)) { toast.error("Enter a valid email"); return; }
    if (city.length < 2) { toast.error("Enter your city"); return; }
    setBasic({ name, mobile, email, city });
    setVerified(true);
    toast.success("Mobile verified — please complete the details below.");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const num = (k: string) => (fd.get(k) ? Number(fd.get(k)) : undefined);
    const base = {
      name: basic.name,
      mobile: basic.mobile,
      email: basic.email,
      city: basic.city,
      message: get("message"),
      service: service ?? get("service_label"),
    };
    if (!MOBILE_RE.test(base.mobile)) { toast.error("Mobile verification expired — please re-verify"); setVerified(false); return; }
    let payload: any = base;
    if (formVariant === "loan") {
      const pan = get("pan");
      const income = num("monthly_income");
      const loan = num("loan_amount");
      if (!pan || !/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(pan)) { toast.error("Enter a valid PAN (e.g. ABCDE1234F)"); return; }
      if (!income) { toast.error("Enter your monthly income"); return; }
      if (!loan) { toast.error("Enter the loan amount you need"); return; }
      payload = { ...base, pan, employment_type: employment, monthly_income: income, loan_amount: loan, business_details: get("business_details") };
    } else if (formVariant === "credit-card") {
      const pan = get("pan");
      const income = num("monthly_income");
      if (!pan || !/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(pan)) { toast.error("Enter a valid PAN (e.g. ABCDE1234F)"); return; }
      if (!income) { toast.error("Enter your monthly income"); return; }
      payload = { ...base, pan, employment_type: employment, monthly_income: income };
    } else if (formVariant === "tax-accounting") {
      const biz = get("business_details");
      if (!biz) { toast.error("Tell us briefly about your business / requirement"); return; }
      payload = { ...base, employment_type: employment, business_details: biz };
    } else if (formVariant === "property") {
      const biz = get("business_details");
      if (!biz) { toast.error("Tell us your property requirement (buy/sell/rent + budget)"); return; }
      const budget = num("loan_amount");
      payload = { ...base, business_details: biz, loan_amount: budget };
    }
    setLoading(true);
    try {
      await submitLead(payload, typeof window !== "undefined" ? window.location.pathname : "/");
      setDone(true);
      toast.success("Thanks! Our advisor will reach out within 24 hours.");
    } catch (err) {
      console.error(err);
      toast.error("Could not submit. Please try again or call us directly.");
    } finally { setLoading(false); }
  }

  const wrap = variant === "card"
    ? "rounded-2xl border border-border bg-card text-card-foreground p-6 shadow-[var(--shadow-elegant)] md:p-8"
    : "";

  if (done) {
    return (
      <div className={wrap}>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CheckCircle2 className="h-12 w-12 text-gold" />
          <h3 className="mt-4 text-xl">You're in good hands</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            We've received your request. A senior advisor will call you within 24 hours on the mobile you provided.
          </p>
        </div>
      </div>
    );
  }

  const header = title && (
    <div className="mb-6">
      <p className="eyebrow"><span className="gold-line" />Get a callback</p>
      <h3 className="mt-2 text-2xl">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );

  if (!verified) {
    return (
      <form onSubmit={verifyBasic} className={wrap}>
        {header}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Full name *</label>
            <input className={inputCls} value={basic.name} onChange={(e) => setBasic({ ...basic, name: e.target.value })} placeholder="Your full name" required />
          </div>
          <div>
            <label className="text-sm font-medium">Mobile *</label>
            <input className={inputCls} value={basic.mobile} inputMode="numeric" maxLength={10} onChange={(e) => setBasic({ ...basic, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })} placeholder="10-digit mobile (6–9 start)" required />
          </div>
          <div>
            <label className="text-sm font-medium">Email *</label>
            <input className={inputCls} type="email" value={basic.email} onChange={(e) => setBasic({ ...basic, email: e.target.value })} placeholder="you@example.com" required />
          </div>
          <div>
            <label className="text-sm font-medium">City *</label>
            <input className={inputCls} value={basic.city} onChange={(e) => setBasic({ ...basic, city: e.target.value })} placeholder="e.g. Delhi" required />
          </div>
        </div>
        <button type="submit" className="btn-gold mt-6 w-full">Submit</button>
        <p className="mt-3 text-center text-xs text-muted-foreground">Your data is protected and never shared without consent.</p>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className={wrap}>
      {header}
      <div className="mb-4 flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <div>
            <p className="font-medium text-foreground">{basic.name} · +91 {basic.mobile}</p>
            <p className="text-muted-foreground">{basic.email} · {basic.city}</p>
          </div>
        </div>
        <button type="button" onClick={() => setVerified(false)} className="flex items-center gap-1 text-primary hover:underline">
          <Pencil className="h-3 w-3" /> Edit
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {(formVariant === "loan" || formVariant === "credit-card") && (
          <>
            <Field label="PAN *" name="pan" required placeholder="ABCDE1234F" className="uppercase" />
            <div>
              <label className="text-sm font-medium">Employment *</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["salaried", "self_employed", "business"] as const).map((v) => (
                  <button key={v} type="button" onClick={() => setEmployment(v)} className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${employment === v ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40"}`}>
                    {v === "salaried" ? "Salaried" : v === "self_employed" ? "Self-emp." : "Business"}
                  </button>
                ))}
              </div>
            </div>
            <Field label={employment === "salaried" ? "Monthly salary (₹) *" : "Monthly income (₹) *"} name="monthly_income" required type="number" placeholder="e.g. 75000" />
            {formVariant === "loan" && <Field label="Loan amount needed (₹) *" name="loan_amount" required type="number" placeholder="e.g. 1000000" />}
            {employment !== "salaried" && formVariant === "loan" && (
              <div className="sm:col-span-2">
                <Field label="Business / profession details" name="business_details" placeholder="Nature of business, vintage…" />
              </div>
            )}
          </>
        )}
        {formVariant === "tax-accounting" && (
          <>
            <div>
              <label className="text-sm font-medium">Profile *</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["salaried", "self_employed", "business"] as const).map((v) => (
                  <button key={v} type="button" onClick={() => setEmployment(v)} className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${employment === v ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40"}`}>
                    {v === "salaried" ? "Individual" : v === "self_employed" ? "Professional" : "Business / Co."}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Services needed</label>
              <select name="service_label" className={inputCls} defaultValue={service ?? "ITR Filing"}>
                <option>ITR Filing</option><option>GST Registration</option><option>GST Returns</option>
                <option>Bookkeeping / Accounting</option><option>Payroll & TDS</option><option>Tax Planning</option>
                <option>Notice / Audit Support</option><option>IEC Code Registration</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <Field label="Tell us about your requirement *" name="business_details" required placeholder="Nature of business, turnover, current setup…" />
            </div>
          </>
        )}
        {formVariant === "property" && (
          <>
            <div>
              <label className="text-sm font-medium">I want to *</label>
              <select name="service_label" className={inputCls} defaultValue={service?.includes("Rental") ? "Rent / Lease" : "Buy"}>
                <option>Buy</option><option>Sell</option><option>Rent / Lease</option><option>Invest</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Property type *</label>
              <select name="property_type_label" className={inputCls} defaultValue="Residential apartment">
                <option>Residential apartment</option><option>Villa / Independent house</option><option>Residential plot</option>
                <option>Commercial office / retail</option><option>Warehouse / industrial</option>
              </select>
            </div>
            <Field label="Budget (₹)" name="loan_amount" type="number" placeholder="e.g. 5000000" />
            <Field label="Preferred locality" name="business_details_part" placeholder="e.g. Sector 62, Noida" />
            <div className="sm:col-span-2">
              <Field label="Requirement details *" name="business_details" required placeholder="BHK, configuration, possession timeline…" />
            </div>
          </>
        )}
        {formVariant === "general" && (
          <div className="sm:col-span-2">
            <Field label="Service of interest" name="service_label" placeholder={service ?? "What can we help with?"} defaultValue={service ?? ""} />
          </div>
        )}
        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Remark (optional)</label>
          <textarea name="message" rows={3} maxLength={2000} className={inputCls} placeholder="Anything you'd like our advisor to know" />
        </div>
      </div>
      <button type="submit" disabled={loading} className="btn-gold mt-6 w-full disabled:opacity-70">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {loading ? "Submitting…" : "Request Free Consultation"}
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">Your data is protected and never shared without consent.</p>
    </form>
  );
}

function Field({ label, name, type = "text", required, placeholder, className = "", defaultValue, disabled }: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string;
  className?: string; defaultValue?: string; disabled?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input name={name} type={type} required={required} placeholder={placeholder} defaultValue={defaultValue} disabled={disabled} className={`${inputCls} ${className}`} />
    </div>
  );
}
