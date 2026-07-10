"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { KeyRound, Plus, Loader2, RefreshCw, ShieldCheck, ShieldOff } from "lucide-react";

type Partner = {
  id: string;
  email: string;
  displayName?: string | null;
  role: string;
  createdAt: string;
};

export function PartnerAccessClient() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/partner-access", { cache: "no-store" });
      const j = await res.json();
      setPartners(j.partners || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function grant(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/partner-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), grant: true }),
      });
      const j = await res.json();
      if (!res.ok) return toast.error(j?.error || "Failed");
      if (j.already) toast.info("User is already a partner.");
      else toast.success(`Partner access granted to ${email}`);
      setEmail("");
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function revoke(id: string, mail: string) {
    if (!confirm(`Revoke partner access for ${mail}? They will lose portal access.`)) return;
    const res = await fetch("/api/admin/partner-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: mail, grant: false }),
    });
    const j = await res.json();
    if (res.ok) {
      toast.success(`Partner access revoked for ${mail}`);
      await load();
    } else {
      toast.error(j?.error || "Failed");
    }
  }

  return (
    <AdminShell active="partner-access">
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl">Partner Access</h1>
            <p className="text-sm text-muted-foreground">Grant or revoke partner-portal access by email.</p>
          </div>
          <Button variant="outline" size="sm" onClick={load}><RefreshCw className="size-4" /> Refresh</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Grant partner access</CardTitle>
            <CardDescription>Find a user by their signup email and elevate to role 'partner'.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={grant} className="flex flex-wrap gap-2">
              <div className="flex-1 space-y-1.5">
                <Label htmlFor="email" className="sr-only">Email</Label>
                <Input id="email" type="email" placeholder="partner@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Button type="submit" disabled={busy}>
                {busy ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                Grant access
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Active partners ({partners.length})</CardTitle></CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="space-y-2 p-4">{Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
            ) : partners.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-10 text-center">
                <KeyRound className="mb-2 size-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No active partners yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {partners.map((p) => (
                  <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{p.displayName || p.email}</span>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-800">{p.role}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">{p.email} · added {new Date(p.createdAt).toLocaleDateString("en-IN")}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href="/portal" target="_blank" rel="noopener noreferrer"><ShieldCheck className="size-4" /> View portal</a>
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => revoke(p.id, p.email)}>
                        <ShieldOff className="size-4" /> Revoke
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
