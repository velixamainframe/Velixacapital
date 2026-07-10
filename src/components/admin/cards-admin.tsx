"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { CreditCard, Plus, Loader2, RefreshCw, Edit, X } from "lucide-react";
import { slugify as toSlug } from "@/lib/data";

type Card2 = {
  id: string;
  slug: string;
  name: string;
  bank: string;
  category: string;
  imageUrl?: string | null;
  annualFee: number;
  joiningFee: number;
  features: string[];
  benefits: string;
  affiliateUrl?: string | null;
  published: boolean;
  displayOrder: number;
  createdAt: string;
};

const CATEGORIES = ["Cashback", "Travel", "Rewards", "Premium", "Business", "Fuel", "Shopping", "Lifestyle"];

export function CardsAdminClient() {
  const [cards, setCards] = useState<Card2[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [id, setId] = useState<string | null>(null);
  const [bank, setBank] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Cashback");
  const [imageUrl, setImageUrl] = useState("");
  const [annualFee, setAnnualFee] = useState("0");
  const [joiningFee, setJoiningFee] = useState("0");
  const [features, setFeatures] = useState("");
  const [benefits, setBenefits] = useState("");
  const [affiliateUrl, setAffiliateUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState("0");
  const [published, setPublished] = useState(true);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/cards", { cache: "no-store" });
      const j = await res.json();
      setCards(j.cards || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function reset() {
    setId(null); setBank(""); setName(""); setSlug(""); setCategory("Cashback"); setImageUrl(""); setAnnualFee("0"); setJoiningFee("0");
    setFeatures(""); setBenefits(""); setAffiliateUrl(""); setDisplayOrder("0"); setPublished(true);
  }

  function openEdit(c: Card2) {
    setId(c.id); setBank(c.bank); setName(c.name); setSlug(c.slug); setCategory(c.category);
    setImageUrl(c.imageUrl || ""); setAnnualFee(String(c.annualFee)); setJoiningFee(String(c.joiningFee));
    setFeatures(c.features.join("\n")); setBenefits(c.benefits); setAffiliateUrl(c.affiliateUrl || "");
    setDisplayOrder(String(c.displayOrder)); setPublished(c.published);
    setShowForm(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!bank.trim() || !name.trim()) return toast.error("Bank and name required");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id ?? undefined,
          bank: bank.trim(),
          name: name.trim(),
          slug: slug || undefined,
          category,
          imageUrl: imageUrl || undefined,
          annualFee: Number(annualFee) || 0,
          joiningFee: Number(joiningFee) || 0,
          features,
          benefits,
          affiliateUrl: affiliateUrl || undefined,
          displayOrder: Number(displayOrder) || 0,
          published,
        }),
      });
      const j = await res.json();
      if (!res.ok) return toast.error(j?.error || "Failed");
      toast.success(id ? "Card updated" : "Card created");
      reset(); setShowForm(false); await load();
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminShell active="cards">
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl">Credit Cards</h1>
            <p className="text-sm text-muted-foreground">{cards.length} offers · {cards.filter((c) => c.published).length} published.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={load}><RefreshCw className="size-4" /> Refresh</Button>
            <Button size="sm" onClick={() => { reset(); setShowForm(true); }}><Plus className="size-4" /> New card</Button>
          </div>
        </div>

        {showForm && (
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">{id ? "Edit card" : "New card"}</CardTitle>
                <CardDescription>Slug auto-generates from bank + name.</CardDescription>
              </div>
              <Button size="icon" variant="ghost" onClick={() => { setShowForm(false); reset(); }}><X className="size-4" /></Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={save} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Bank" required><Input value={bank} onChange={(e) => { setBank(e.target.value); if (!id) setSlug(toSlug(`${e.target.value}-${name}`)); }} required /></Field>
                <Field label="Card name" required><Input value={name} onChange={(e) => { setName(e.target.value); if (!id) setSlug(toSlug(`${bank}-${e.target.value}`)); }} required /></Field>
                <Field label="Slug"><Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto" /></Field>
                <Field label="Category">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Image URL"><Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="/cards/example.jpg" /></Field>
                <Field label="Affiliate URL"><Input value={affiliateUrl} onChange={(e) => setAffiliateUrl(e.target.value)} placeholder="https://…" /></Field>
                <Field label="Joining fee (₹)"><Input value={joiningFee} onChange={(e) => setJoiningFee(e.target.value)} inputMode="numeric" /></Field>
                <Field label="Annual fee (₹)"><Input value={annualFee} onChange={(e) => setAnnualFee(e.target.value)} inputMode="numeric" /></Field>
                <Field label="Display order"><Input value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} inputMode="numeric" /></Field>
                <div className="flex items-center gap-2 self-end pb-2">
                  <Checkbox id="pub" checked={published} onCheckedChange={(v) => setPublished(!!v)} />
                  <Label htmlFor="pub" className="cursor-pointer text-sm">Published</Label>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="features">Features (one per line)</Label>
                  <Textarea id="features" value={features} onChange={(e) => setFeatures(e.target.value)} rows={4} placeholder={"1.5% cashback\nNo annual fee\nLounge access"} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="benefits">Benefits (summary)</Label>
                  <Textarea id="benefits" value={benefits} onChange={(e) => setBenefits(e.target.value)} rows={3} />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" disabled={busy}>
                    {busy ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                    {id ? "Save changes" : "Create card"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="space-y-2 p-4">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
            ) : cards.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <CreditCard className="mb-2 size-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No credit cards yet — create one above.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {cards.map((c) => (
                  <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{c.bank} · {c.name}</span>
                        <Badge variant="outline" className={c.published ? "bg-emerald-50 text-emerald-800" : "bg-muted text-muted-foreground"}>
                          {c.published ? "published" : "draft"}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">/credit-cards/{c.slug} · {c.category} · ₹{c.annualFee}/yr · order {c.displayOrder}</div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => openEdit(c)}><Edit className="size-4" /> Edit</Button>
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

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}{required && <span className="ml-0.5 text-destructive">*</span>}</Label>
      {children}
    </div>
  );
}
