import type { Metadata } from "next";
import { AuthClient } from "@/components/auth/auth-client";

export const metadata: Metadata = {
  title: { absolute: "Sign in — Velixa Capital" },
  description: "Velixa Capital secure sign-in for admin, employees and partners.",
  robots: { index: false, follow: false },
};

export default function AuthPage() {
  return <AuthClient />;
}
