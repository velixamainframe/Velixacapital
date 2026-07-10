"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Link2, Plus, Loader2, RefreshCw, Trash2, Copy, ExternalLink, CheckCircle2 } from "lucide-react";

type Link = {
  id: string;
  slug: string;
  label: string;
  targetUrl: string;
  description?: string | null;
  clicks: number;
  leadCount: number;
  shareUrl: string;
  createdAt: string;
};

const TARGET_PRESETS = [
  { label: "Home", url: "/" },
  { label: "All Loans", url: "/loans" },
  { label: "Personal Loan", url: "/loans/personal-loan" },
  { label: "Business Loan", url: "/loans/business-loan" },
  { label: "LAP", url: "/loans/loan-against-property" },
  { label: "Credit Cards", url: "/credit-cards" },
  { label: "Tax & Accounting", url: "/tax-accounting" },
  { label: "Property Consulting", url: "/property-consulting" },
  { label: "Contact", url: "/contact" },
];

export function AffiliateAdminClient() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState("");
  const [target, setTarget] = useState(TARGET_PRESETS[0].url);
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/affiliate", { cache: "no-store" });
      const j = await res.json();
      setLinks(j.links || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!label.trim()) return toast.error("Label required");
    setBusy(true);
    try {
      const res = await fetch("/api/affiliate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: label.trim(), targetUrl: target, slug: slug.trim() || undefined, description: description.trim() || undefined }),
      });
      const j = await res.json();
      if (!res.ok) return toast.error(j?.error || "Failed");
      toast.success("Tracking link created");
      setLabel(""); setSlug(""); setDescription("");
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this link?")) return;
    const res = await fetch(`/api/affiliate/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Deleted"); await load(); } else toast.error("Failed");
  }

  return (
    <AdminShell active="affiliate">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl">Affiliate Links</h1>
          <p className="text-sm text-muted-foreground">{links.length} tracking links · {links.reduce((s, l) => s + l.clicks, 0)} total clicks.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Create a tracking link</CardTitle>
            <CardDescription>Admin-created links are not bound to a partner. Use Bulk Affiliate for mass creation.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={create} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="label">Label</Label>
                <Input id="label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Diwali campaign" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="target">Target</Label>
                <select
                  id="target"
                  className="input"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                >
                  {TARGET_PRESETS.map((p) => <option key={p.url} value={p.url}>{p.label} — {p.url}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="slug">Slug (optional)</Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="desc">Description (internal)</Label>
                <Input id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Partner campaign with Bank X" />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" disabled={busy}>
                  {busy ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                  Create link
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">All links ({links.length})</CardTitle>
            <Button variant="ghost" size="sm" onClick={load}><RefreshCw className="size-4" /></Button>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="space-y-2 p-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}</div>
            ) : links.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <Link2 className="mb-2 size-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No links yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {links.map((l) => (
                  <div key={l.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <div className="truncate font-medium">{l.label}</div>
                      <div className="truncate text-xs text-muted-foreground">{l.targetUrl}</div>
                      {l.description && <div className="truncate text-[11px] text-muted-foreground">{l.description}</div>}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">{l.clicks} clicks</span>
                      <span className="text-muted-foreground">{l.leadCount} leads</span>
                      <CopyUrl url={l.shareUrl} />
                      <a href={l.shareUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 hover:border-gold/50">
                        <ExternalLink className="size-3.5" />
                      </a>
                      <Button size="icon" variant="ghost" onClick={() => remove(l.id)}><Trash2 className="size-4" /></Button>
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

function CopyUrl({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const full = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(full);
          setCopied(true);
          toast.success("Copied");
          setTimeout(() => setCopied(false), 1200);
        } catch { toast.error("Copy failed"); }
      }}
      className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 hover:border-gold/50"
    >
      {copied ? <CheckCircle2 className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
      {url}
    </button>
  );
}
