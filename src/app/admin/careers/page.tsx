import type { Metadata } from "next";
import { CareersAdminClient } from "@/components/admin/careers-admin";

export const metadata: Metadata = {
  title: { absolute: "Careers — Velixa Admin" },
  description: "Manage career postings.",
  robots: { index: false, follow: false },
};

export default function AdminCareersPage() {
  return <CareersAdminClient />;
}
