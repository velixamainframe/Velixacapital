"use client";

import { useEffect } from "react";
import { captureRefFromUrl } from "@/lib/affiliate-ref";
import { Header } from "./header";
import { Footer } from "./footer";
import { FloatingActions } from "./floating-actions";
import { CookieBanner } from "./cookie-banner";
import { Chatbot } from "./chatbot";

export function SiteShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    captureRefFromUrl();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
      <Chatbot />
      <CookieBanner />
    </div>
  );
}
