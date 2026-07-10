import type { Metadata } from "next";
import { LeadsAdminClient } from "@/components/admin/leads-admin";

export const metadata: Metadata = {
  title: { absolute: "Leads & Dialer — Velixa Admin" },
  description: "Admin leads & dialer.",
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  return <LeadsAdminClient />;
}
