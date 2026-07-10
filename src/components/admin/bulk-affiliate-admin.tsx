"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Layers, Loader2, Copy, CheckCircle2 } from "lucide-react";

type CreatedLink = { slug: string; shareUrl: string; label: string; targetUrl: string };
type ErrorItem = { line: string; error: string };

const EXAMPLE = `Personal Loan July | https://velixacapital.com/loans/personal-loan | personal-july
Business Loan MSME | https://velixacapital.com/loans/business-loan
LAP | https://velixacapital.com/loans/loan-against-property | lap-q3`;

export function BulkAffiliateAdminClient() {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState<CreatedLink[] | null>(null);
  const [errors, setErrors] = useState<ErrorItem[] | null>(null);
  const [copied, setCopied] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return toast.error("Paste at least one line");
    setBusy(true);
    setCreated(null);
    setErrors(null);
    try {
      const res = await fetch("/api/admin/bulk-affiliate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: text }),
      });
      const j = await res.json();
      if (!res.ok) return toast.error(j?.error || "Bulk create failed");
      setCreated(j.created || []);
      setErrors(j.errors || []);
      toast.success(`Created ${j.created?.length || 0} links${j.errors?.length ? `, ${j.errors.length} failed` : ""}.`);
    } finally {
      setBusy(false);
    }
  }

  const allUrls = (created || []).map((c) => `${typeof window !== "undefined" ? window.location.origin : ""}${c.shareUrl}`).join("\n");

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(allUrls);
      setCopied(true);
      toast.success(`Copied ${created?.length || 0} URLs`);
      setTimeout(() => setCopied(false), 1500);
    } catch { toast.error("Copy failed"); }
  }

  return (
    <AdminShell active="bulk-affiliate">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl">Bulk Affiliate Links</h1>
          <p className="text-sm text-muted-foreground">Paste up to 500 lines — each becomes a /go/&lt;slug&gt; tracking link.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Input</CardTitle>
            <CardDescription>
              Format: <code className="rounded bg-muted px-1 py-0.5 text-xs">Label | https://target | optional-slug</code> — one per line.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="bulk">Lines (max 500)</Label>
                <Textarea
                  id="bulk"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={10}
                  className="font-mono text-xs"
                  placeholder={EXAMPLE}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="submit" disabled={busy}>
                  {busy ? <Loader2 className="size-4 animate-spin" /> : <Layers className="size-4" />}
                  Create all
                </Button>
                <Button type="button" variant="outline" onClick={() => setText(EXAMPLE)}>Use example</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {created && (
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">Created ({created.length})</CardTitle>
              {created.length > 0 && (
                <Button size="sm" variant="outline" onClick={copyAll}>
                  {copied ? <CheckCircle2 className="size-4 text-emerald-600" /> : <Copy className="size-4" />}
                  Copy all URLs
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-0">
              {created.length === 0 ? (
                <p className="px-4 pb-4 text-sm text-muted-foreground">No links created.</p>
              ) : (
                <div className="divide-y divide-border">
                  {created.map((c) => (
                    <div key={c.slug} className="flex flex-wrap items-center justify-between gap-2 p-3 text-sm">
                      <div className="min-w-0">
                        <div className="truncate font-medium">{c.label}</div>
                        <div className="truncate text-xs text-muted-foreground">{c.targetUrl}</div>
                      </div>
                      <code className="rounded bg-muted px-2 py-1 text-xs">/go/{c.slug}</code>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {errors && errors.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="text-base">Errors ({errors.length})</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {errors.map((e, i) => (
                  <div key={i} className="px-4 py-2 text-xs">
                    <span className="text-rose-700">{e.error}</span>: <code className="text-muted-foreground">{e.line}</code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminShell>
  );
}
