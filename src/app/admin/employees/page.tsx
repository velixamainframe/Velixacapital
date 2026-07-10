import type { Metadata } from "next";
import { EmployeesAdminClient } from "@/components/admin/employees-admin";

export const metadata: Metadata = {
  title: { absolute: "Employees — Velixa Admin" },
  description: "Manage employees.",
  robots: { index: false, follow: false },
};

export default function AdminEmployeesPage() {
  return <EmployeesAdminClient />;
}
