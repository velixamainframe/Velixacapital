import type { Metadata } from "next";
import { AffiliateAdminClient } from "@/components/admin/affiliate-admin";

export const metadata: Metadata = {
  title: { absolute: "Affiliate — Velixa Admin" },
  description: "Manage affiliate tracking links.",
  robots: { index: false, follow: false },
};

export default function AdminAffiliatePage() {
  return <AffiliateAdminClient />;
}
