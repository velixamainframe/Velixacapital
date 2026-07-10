import type { Metadata } from "next";
import { PartnerAccessClient } from "@/components/admin/partner-access";

export const metadata: Metadata = {
  title: { absolute: "Partner Access — Velixa Admin" },
  description: "Grant or revoke partner portal access.",
  robots: { index: false, follow: false },
};

export default function AdminPartnerAccessPage() {
  return <PartnerAccessClient />;
}
