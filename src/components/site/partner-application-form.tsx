"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

const MOBILE_RE = /^[6-9]\d{9}$/;
const NAME_RE = /^[A-Za-z .'-]{2,100}$/;
const EMAIL_RE = /^\S+@\S+\.\S+$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/i;

type FormState = {
  full_name: string;
  mobile: string;
  email: string;
  pan_number: string;
  city: string;
  current_profession: string;
  business_type: string;
  experience_years: string;
  expected_monthly_leads: string;
  message: string;
};

const EMPTY: FormState = {
  full_name: "",
  mobile: "",
  email: "",
  pan_number: "",
  city: "",
  current_profession: "",
  business_type: "",
  experience_years: "",
  expected_monthly_leads: "",
  message: "",
};

const inputCls =
  "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary disabled:bg-muted disabled:text-muted-foreground";

export function PartnerApplicationForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const full_name = form.full_name.trim();
    const mobile = form.mobile.trim().replace(/\D/g, "");
    const email = form.email.trim();
    const pan = form.pan_number.trim().toUpperCase();
    const city = form.city.trim();

    if (!NAME_RE.test(full_name)) {
      toast.error("Enter a valid full name (letters, min 2)");
      return;
    }
    if (!MOBILE_RE.test(mobile)) {
      toast.error("Enter a valid 10-digit Indian mobile (starting 6–9)");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      toast.error("Enter a valid email");
      return;
    }
    if (!PAN_RE.test(pan)) {
      toast.error("Enter a valid PAN (e.g. ABCDE1234F)");
      return;
    }
    if (city.length < 2) {
      toast.error("Enter your city");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/partner-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name,
          mobile,
          email,
          pan_number: pan,
          city,
          current_profession: form.current_profession.trim(),
          business_type: form.business_type.trim(),
          experience_years: form.experience_years ? Number(form.experience_years) : undefined,
          expected_monthly_leads: form.expected_monthly_leads ? Number(form.expected_monthly_leads) : undefined,
          message: form.message.trim(),
          sourcePage: typeof window !== "undefined" ? window.location.pathname : "/partner",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Submission failed");
      }
      setDone(true);
      toast.success("Application received — welcome aboard!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not submit. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-gold/30 bg-card p-8 text-center shadow-[var(--shadow-elegant)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
          <CheckCircle2 className="h-8 w-8 text-gold" />
        </div>
        <h3 className="mt-5 font-display text-2xl text-gold">Welcome aboard!</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Your channel-partner application has been received. Our partner-onboarding team will review it and reach out
          within 48 hours on the mobile number you provided.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Keep an eye on WhatsApp — most of our partner conversations happen there.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(EMPTY);
            setDone(false);
          }}
          className="btn-outline mt-6"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-elegant)] md:p-8"
    >
      <p className="eyebrow">
        <span className="gold-line" />
        Apply now
      </p>
      <h3 className="mt-2 font-display text-2xl">Channel partner application</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Fill in the form below — our partner-onboarding team responds within 48 hours.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Full name *</label>
          <input
            className={inputCls}
            value={form.full_name}
            onChange={(e) => update("full_name", e.target.value)}
            placeholder="Your full name"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Mobile *</label>
          <input
            className={inputCls}
            inputMode="numeric"
            maxLength={10}
            value={form.mobile}
            onChange={(e) => update("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="10-digit mobile (6–9 start)"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email *</label>
          <input
            className={inputCls}
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">PAN *</label>
          <input
            className={`${inputCls} uppercase`}
            value={form.pan_number}
            onChange={(e) => update("pan_number", e.target.value.toUpperCase().slice(0, 10))}
            placeholder="ABCDE1234F"
            maxLength={10}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">City *</label>
          <input
            className={inputCls}
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="e.g. Mumbai"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Current profession</label>
          <input
            className={inputCls}
            value={form.current_profession}
            onChange={(e) => update("current_profession", e.target.value)}
            placeholder="e.g. Insurance agent, CA, real-estate broker"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Business type</label>
          <select
            className={inputCls}
            value={form.business_type}
            onChange={(e) => update("business_type", e.target.value)}
          >
            <option value="">Select…</option>
            <option>Individual / Freelancer</option>
            <option>Proprietorship</option>
            <option>Partnership firm</option>
            <option>LLP</option>
            <option>Private limited company</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Experience (years)</label>
          <input
            className={inputCls}
            type="number"
            min={0}
            max={50}
            value={form.experience_years}
            onChange={(e) => update("experience_years", e.target.value)}
            placeholder="e.g. 5"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Expected monthly leads</label>
          <input
            className={inputCls}
            type="number"
            min={0}
            max={10000}
            value={form.expected_monthly_leads}
            onChange={(e) => update("expected_monthly_leads", e.target.value)}
            placeholder="e.g. 25"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Message (optional)</label>
          <textarea
            className={inputCls}
            rows={3}
            maxLength={2000}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Tell us about your network, current book of business, and what you'd like to achieve with Velixa"
          />
        </div>
      </div>
      <button type="submit" disabled={loading} className="btn-gold mt-6 w-full disabled:opacity-70">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {loading ? "Submitting…" : "Submit application"}
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Your data is AES-256-GCM encrypted and never shared without consent.
      </p>
    </form>
  );
}
