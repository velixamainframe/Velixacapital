"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  PhoneCall,
  Search,
  Phone,
  MessageCircle,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  Download,
  RefreshCw,
} from "lucide-react";

type Lead = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  service?: string | null;
  city?: string | null;
  loanAmount?: number | null;
  employmentType?: string | null;
  sourcePage?: string | null;
  affiliateSlug?: string | null;
  status: string;
  notes?: string | null;
  createdAt: string;
};

const STATUSES = ["all", "new", "contacted", "qualified", "converted", "lost"] as const;
type FilterStatus = (typeof STATUSES)[number];

const STATUS_TONE: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  contacted: "bg-amber-100 text-amber-800 border-amber-200",
  qualified: "bg-violet-100 text-violet-800 border-violet-200",
  converted: "bg-emerald-100 text-emerald-800 border-emerald-200",
  lost: "bg-rose-100 text-rose-800 border-rose-200",
};

function maskPhone(phone: string): string {
  const d = (phone || "").replace(/\D/g, "");
  if (d.length < 5) return "••••";
  return "••••• " + d.slice(-5);
}

function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return "—";
  const [name, domain] = email.split("@");
  return `${name.slice(0, 1)}${"•".repeat(Math.min(name.length, 4))}@${domain}`;
}

function telHref(phone: string): string {
  const d = (phone || "").replace(/\D/g, "");
  if (d.length === 10) return `tel:+91${d}`;
  if (d.length === 11 && d.startsWith("0")) return `tel:+91${d.slice(1)}`;
  if (d.length === 12 && d.startsWith("91")) return `tel:+${d}`;
  return `tel:${d}`;
}

function waHref(phone: string): string {
  const d = (phone || "").replace(/\D/g, "");
  const digits = d.length === 10 ? `91${d}` : d.length === 11 && d.startsWith("0") ? `91${d.slice(1)}` : d;
  return `https://wa.me/${digits}`;
}

export function LeadsAdminClient() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [statusBusy, setStatusBusy] = useState<Record<string, boolean>>({});
  const [notesOpen, setNotesOpen] = useState<Record<string, boolean>>({});
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      const j = await res.json();
      setLeads(j.leads || []);
    } catch {
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    let r = leads;
    if (filter !== "all") r = r.filter((l) => l.status === filter);
    const q = search.trim().toLowerCase();
    if (q) {
      r = r.filter((l) =>
        l.name.toLowerCase().includes(q) ||
        (l.email || "").toLowerCase().includes(q) ||
        (l.service || "").toLowerCase().includes(q) ||
        (l.city || "").toLowerCase().includes(q) ||
        (l.sourcePage || "").toLowerCase().includes(q),
      );
    }
    return r;
  }, [leads, filter, search]);

  async function changeStatus(id: string, status: string) {
    setStatusBusy((s) => ({ ...s, [id]: true }));
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const j = await res.json();
        toast.error(j?.error || "Update failed");
        return;
      }
      setLeads((arr) => arr.map((l) => (l.id === id ? { ...l, status } : l)));
      toast.success(`Lead marked ${status}`);
    } finally {
      setStatusBusy((s) => ({ ...s, [id]: false }));
    }
  }

  async function saveNotes(id: string) {
    const notes = notesDraft[id] ?? "";
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    if (res.ok) {
      setLeads((arr) => arr.map((l) => (l.id === id ? { ...l, notes } : l)));
      toast.success("Notes saved");
      setNotesOpen((s) => ({ ...s, [id]: false }));
    } else {
      toast.error("Failed to save notes");
    }
  }

  function exportCsv() {
    const rows = [
      ["Name", "Mobile", "Email", "Service", "City", "Loan Amount", "Source", "Status", "Date"],
      ...filtered.map((l) => [
        l.name,
        l.mobile,
        l.email,
        l.service || "",
        l.city || "",
        l.loanAmount ? String(l.loanAmount) : "",
        l.sourcePage || "",
        l.status,
        new Date(l.createdAt).toISOString(),
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `velixa-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AdminShell active="leads">
      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl">Leads & Dialer</h1>
            <p className="text-sm text-muted-foreground">
              {filtered.length} of {leads.length} leads · last 500 shown
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={load}><RefreshCw className="size-4" /> Refresh</Button>
            <Button variant="outline" size="sm" onClick={exportCsv}><Download className="size-4" /> Export CSV</Button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name, email, service, city, source…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  filter === s
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-gold/50"
                }`}
              >
                {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="space-y-2 p-4">
                {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <PhoneCall className="mb-2 size-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No leads match your filter.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filtered.map((l) => {
                  const phone = revealed[l.id] ? l.mobile : maskPhone(l.mobile);
                  const email = revealed[l.id] ? l.email : maskEmail(l.email);
                  return (
                    <div key={l.id} className="p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{l.name}</span>
                            <Badge variant="outline" className={STATUS_TONE[l.status] || ""}>{l.status}</Badge>
                          </div>
                          <div className="mt-0.5 text-xs text-muted-foreground">
                            {new Date(l.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {l.city || "—"} · {l.service || "General"}
                            {l.loanAmount ? ` · ₹${Number(l.loanAmount).toLocaleString("en-IN")}` : ""}
                            {l.employmentType ? ` · ${l.employmentType}` : ""}
                          </div>
                          {l.sourcePage && (
                            <div className="mt-0.5 text-[11px] text-muted-foreground">via {l.sourcePage}{l.affiliateSlug ? ` · /go/${l.affiliateSlug}` : ""}</div>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          <button
                            onClick={() => setRevealed((r) => ({ ...r, [l.id]: !r[l.id] }))}
                            className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs hover:border-gold/50"
                            title={revealed[l.id] ? "Mask PII" : "Reveal PII"}
                          >
                            {revealed[l.id] ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                            {revealed[l.id] ? "Mask" : "Reveal"}
                          </button>
                          <a href={telHref(l.mobile)} className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs hover:border-emerald-500/50 hover:text-emerald-700" title="Call">
                            <Phone className="size-3.5" /> Call
                          </a>
                          <a href={waHref(l.mobile)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs hover:border-emerald-500/50 hover:text-emerald-700" title="WhatsApp">
                            <MessageCircle className="size-3.5" /> WhatsApp
                          </a>
                          <a href={`mailto:${l.email}`} className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs hover:border-primary/50" title="Email">
                            <Mail className="size-3.5" /> Email
                          </a>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <div className="font-mono text-xs">{phone}</div>
                        <div className="font-mono text-xs text-muted-foreground">{email}</div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Select
                          value={l.status}
                          onValueChange={(v) => changeStatus(l.id, v)}
                          disabled={statusBusy[l.id]}
                        >
                          <SelectTrigger className="h-8 w-40 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUSES.filter((s) => s !== "all").map((s) => (
                              <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setNotesOpen((s) => ({ ...s, [l.id]: !s[l.id] }));
                            setNotesDraft((d) => ({ ...d, [l.id]: d[l.id] ?? l.notes ?? "" }));
                          }}
                        >
                          {notesOpen[l.id] ? "Hide notes" : (l.notes ? "Edit notes" : "Add notes")}
                        </Button>
                        {statusBusy[l.id] && <Loader2 className="size-3.5 animate-spin text-muted-foreground" />}
                      </div>

                      {notesOpen[l.id] && (
                        <div className="mt-2 space-y-2">
                          <Textarea
                            value={notesDraft[l.id] ?? ""}
                            onChange={(e) => setNotesDraft((d) => ({ ...d, [l.id]: e.target.value }))}
                            placeholder="Internal notes — disposition, next steps, etc."
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => saveNotes(l.id)}>Save notes</Button>
                            <Button size="sm" variant="outline" onClick={() => setNotesOpen((s) => ({ ...s, [l.id]: false }))}>Cancel</Button>
                          </div>
                        </div>
                      )}

                      {!notesOpen[l.id] && l.notes && (
                        <div className="mt-2 rounded-md bg-muted/60 p-2 text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">Notes:</span> {l.notes}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
