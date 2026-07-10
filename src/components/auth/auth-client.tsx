"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, ShieldCheck, KeyRound, ArrowRight } from "lucide-react";

type Mode = "login" | "signup";

export function AuthClient() {
  const { refresh } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);

  function routeForRole(role?: string) {
    if (role === "admin") return "/admin";
    if (role === "employee") return "/crm";
    if (role === "partner") return "/portal";
    return "/";
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const body =
        mode === "login"
          ? { email, password }
          : { email, password, displayName };
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.error || "Authentication failed");
        setBusy(false);
        return;
      }
      await refresh();
      toast.success(mode === "login" ? "Welcome back." : "Account created.");
      const role = data?.user?.role;
      if (mode === "signup") {
        // New signups default to role "user" — show pending note then go home.
        toast(
          "Your account is pending admin approval for portal/crm access.",
          { duration: 6000 },
        );
        router.push("/");
      } else {
        router.push(routeForRole(role));
      }
    } catch {
      toast.error("Network error — please retry");
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary px-4 py-12">
      {/* Decorative gold orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-gold/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 size-96 rounded-full bg-secondary/40 blur-3xl"
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-primary-foreground">
            <span className="grid size-10 place-items-center rounded-md bg-gradient-gold font-display text-lg font-bold text-gold-foreground">
              V
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">Velixa Capital</span>
          </Link>
        </div>

        <Card className="border-border/40 bg-card/95 shadow-elegant backdrop-blur">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-md bg-primary/10 text-primary">
                {mode === "login" ? <KeyRound className="size-4" /> : <ShieldCheck className="size-4" />}
              </div>
              <div>
                <CardTitle className="font-display text-xl">
                  {mode === "login" ? "Sign in" : "Create account"}
                </CardTitle>
                <CardDescription className="text-xs">
                  {mode === "login"
                    ? "Access your CRM, partner portal, or admin console."
                    : "New accounts default to role 'user' — pending admin approval."}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-1.5">
                  <Label htmlFor="displayName">Display name</Label>
                  <Input
                    id="displayName"
                    autoComplete="name"
                    placeholder="e.g. Priya Sharma"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  placeholder={mode === "signup" ? "At least 6 characters" : "••••••••"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={mode === "signup" ? 6 : undefined}
                />
              </div>

              <Button type="submit" disabled={busy} className="w-full">
                {busy ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    {mode === "login" ? "Sign in" : "Create account"}
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="font-medium text-primary hover:underline"
              >
                {mode === "login" ? "Need an account? Sign up" : "Already have an account? Sign in"}
              </button>
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Back to site
              </Link>
            </div>

          </CardContent>
        </Card>

        <p className="mt-4 text-center text-[11px] text-primary-foreground/60">
          Encrypted at rest · Access audited · Velixa Capital
        </p>
      </div>
    </div>
  );
}
