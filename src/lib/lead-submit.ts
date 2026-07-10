"use client";

import { getStoredRef } from "@/lib/affiliate-ref";

export type LeadPayload = {
  name: string;
  mobile: string;
  email: string;
  pan?: string;
  employment_type?: string;
  monthly_income?: number;
  business_details?: string;
  service?: string;
  loan_amount?: number;
  city?: string;
  message?: string;
};

/** Submit a lead to the backend (writes to the encrypted leads table). */
export async function submitLead(input: LeadPayload, sourcePage: string) {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...input, sourcePage, affiliateSlug: getStoredRef() }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to submit lead");
  }
  return res.json();
}
