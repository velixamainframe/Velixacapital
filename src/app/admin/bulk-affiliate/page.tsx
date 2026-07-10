import type { Metadata } from "next";
import { BulkAffiliateAdminClient } from "@/components/admin/bulk-affiliate-admin";

export const metadata: Metadata = {
  title: { absolute: "Bulk Affiliate — Velixa Admin" },
  description: "Bulk-create affiliate tracking links.",
  robots: { index: false, follow: false },
};

export default function AdminBulkAffiliatePage() {
  return <BulkAffiliateAdminClient />;
}
