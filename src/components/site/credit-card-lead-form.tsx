"use client";

import { useState } from "react";
import { toast } from "sonner";
import { submitLead } from "@/lib/lead-submit";
import { Loader2, CheckCircle2 } from "lucide-react";

const inputCls = "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary";
const CITIES = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Noida", "Gurugram", "Nashik", "Other"];

export function CreditCardLeadForm({ cardName, compact = false }: { cardName?: string; compact?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const mobile = String(fd.get("mobile") || "").trim().replace(/\D/g, "");
    const email = String(fd.get("email") || "").trim();
    const city = String(fd.get("city") || "");
    const incomeBand = String(fd.get("income") || "");
    const employment = String(fd.get("employment") || "");
    const hasCard = fd.get("has_card") === "on";
    if (!/^[A-Za-z .'-]{2,100}$/.test(name)) { toast.error("Enter a valid full name"); return; }
    if (!/^[6-9]\d{9}$/.test(mobile)) { toast.error("Enter a valid 10-digit mobile"); return; }
    if (!/^\S+@\S+\.\S+$/.test(email)) { toast.error("Enter a valid email"); return; }
    setLoading(true);
    try {
      await submitLead({ name, mobile, email, city, service: cardName ? `Credit Card — ${cardName}` : "Credit Card Eligibility", employment_type: employment, message: `Income band: ${incomeBand}. Existing card: ${hasCard ? "Yes" : "No"}.` }, typeof window !== "undefined" ? window.location.pathname : "/");
      setDone(true);
      toast.success("Thanks! We'll match you with suitable bank offers.");
    } catch {
      toast.error("Could not submit. Please try again.");
    } finally { setLoading(false); }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-gold" />
        <h3 className="mt-3 text-lg">Request received</h3>
        <p className="mt-1 text-sm text-muted-foreground">We'll call you with the best-matching card offers shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      {!compact && <h3 className="font-display text-lg">{cardName ? `Apply for ${cardName}` : "Check Card Eligibility"}</h3>}
      <div className={`mt-3 grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div><label className="text-xs font-medium">Full name *</label><input name="name" className={inputCls} placeholder="Your name" required /></div>
        <div><label className="text-xs font-medium">Mobile *</label><input name="mobile" inputMode="numeric" maxLength={10} className={inputCls} placeholder="10-digit mobile" required /></div>
        <div><label className="text-xs font-medium">Email *</label><input name="email" type="email" className={inputCls} placeholder="you@example.com" required /></div>
        <div><label className="text-xs font-medium">City *</label>
          <select name="city" className={inputCls} defaultValue="" required><option value="" disabled>Select city</option>{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
        </div>
        <div><label className="text-xs font-medium">Monthly income *</label>
          <select name="income" className={inputCls} defaultValue="" required><option value="" disabled>Select band</option><option>Under ₹25k</option><option>₹25k–₹50k</option><option>₹50k–₹1 Lakh</option><option>₹1 Lakh+</option></select>
        </div>
        <div><label className="text-xs font-medium">Employment *</label>
          <select name="employment" className={inputCls} defaultValue="" required><option value="" disabled>Select</option><option value="salaried">Salaried</option><option value="self_employed">Self-Employed</option><option value="business">Business Owner</option></select>
        </div>
      </div>
      <label className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><input type="checkbox" name="has_card" className="h-3.5 w-3.5" /> I already own a credit card</label>
      <button type="submit" disabled={loading} className="btn-gold mt-4 w-full text-sm disabled:opacity-70">{loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Matching you with suitable bank offers…</> : "Check Eligibility"}</button>
    </form>
  );
}
