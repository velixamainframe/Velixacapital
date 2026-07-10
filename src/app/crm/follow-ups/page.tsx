import type { Metadata } from "next";
import { FollowUpsClient } from "@/components/crm/follow-ups";

export const metadata: Metadata = {
  title: { absolute: "Employee CRM — Velixa Capital" },
  description: "Scheduled callbacks and follow-ups.",
  robots: { index: false, follow: false },
};

export default function CrmFollowUpsPage() {
  return <FollowUpsClient />;
}
