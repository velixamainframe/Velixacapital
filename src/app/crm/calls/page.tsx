import type { Metadata } from "next";
import { DialerClient } from "@/components/crm/dialer";

export const metadata: Metadata = {
  title: { absolute: "Employee CRM — Velixa Capital" },
  description: "Call dialer — contact assigned customers and log outcomes.",
  robots: { index: false, follow: false },
};

export default function CrmCallsPage() {
  return <DialerClient />;
}
