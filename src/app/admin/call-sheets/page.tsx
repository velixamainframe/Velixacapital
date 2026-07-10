import type { Metadata } from "next";
import { CallSheetsAdminClient } from "@/components/admin/call-sheets-admin";

export const metadata: Metadata = {
  title: { absolute: "Call Sheets — Velixa Admin" },
  description: "Upload call sheets to assign CRM calls.",
  robots: { index: false, follow: false },
};

export default function AdminCallSheetsPage() {
  return <CallSheetsAdminClient />;
}
