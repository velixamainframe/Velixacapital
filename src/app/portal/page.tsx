import type { Metadata } from "next";
import { PortalClient } from "@/components/portal/portal-client";

export const metadata: Metadata = {
  title: { absolute: "Partner Portal — Velixa Capital" },
  description: "Partner portal — tracking links, leads, and customer file submissions.",
  robots: { index: false, follow: false },
};

export default function PortalPage() {
  return <PortalClient />;
}
