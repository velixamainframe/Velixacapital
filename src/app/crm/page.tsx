import type { Metadata } from "next";
import { DashboardClient } from "@/components/crm/dashboard";

export const metadata: Metadata = {
  title: { absolute: "Employee CRM — Velixa Capital" },
  description: "Employee CRM dashboard — call assignments, follow-ups and performance.",
  robots: { index: false, follow: false },
};

export default function CrmDashboardPage() {
  return <DashboardClient />;
}
