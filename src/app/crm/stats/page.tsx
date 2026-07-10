import type { Metadata } from "next";
import { StatsClient } from "@/components/crm/stats";

export const metadata: Metadata = {
  title: { absolute: "Employee CRM — Velixa Capital" },
  description: "Performance metrics — calls, conversions, dispositions.",
  robots: { index: false, follow: false },
};

export default function CrmStatsPage() {
  return <StatsClient />;
}
