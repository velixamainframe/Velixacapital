import type { Metadata } from "next";
import { CardsAdminClient } from "@/components/admin/cards-admin";

export const metadata: Metadata = {
  title: { absolute: "Credit Cards — Velixa Admin" },
  description: "Manage credit card offers.",
  robots: { index: false, follow: false },
};

export default function AdminCardsPage() {
  return <CardsAdminClient />;
}
