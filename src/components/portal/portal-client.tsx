"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  LayoutDashboard,
  Link2,
  Users,
  FileUp,
  FileText,
  LogOut,
  Loader2,
  ShieldAlert,
  Copy,
  Trash2,
  Plus,
  Lock,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { LOANS } from "@/lib/site-data";

type Tab = "dashboard" | "links" | "leads" | "submit" | "files";

type AffiliateLink = {
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

type PartnerFile = {
  id: string;
  customerName: string;
  customerMobileMasked?: string;
  customerMobile?: string;
  customerEmailMasked?: string | null;
  customerEmail?: string | null;
  city?: string | null;
  service?: string | null;
  loanAmount?: number | null;
  employmentType?: string | null;
  fileName?: string | null;
  notes?: string | null;
  status: string;
  adminNotes?: string | null;
  createdAt: string;
};

type PartnerStats = {
  total: number;
  new: number;
  review: number;
  sanctioned: number;
  rejected: number;
};

type PartnerLead = {
  id: string;
  name: string;
  mobileMasked: string;
  emailMasked: string;
  service?: string | null;
  city?: string | null;
  loanAmount?: number | null;
  status: string;
  sourcePage?: string | null;
  affiliateSlug?: string | null;
  createdAt: string;
};

const TARGET_PRESETS: { label: string; url: string }[] = [
  { label: "Home", url: "/" },
  { label: "All Loans", url: "/loans" },
  { label: "Personal Loan", url: "/loans/personal-loan" },
  { label: "Business Loan", url: "/loans/business-loan" },
  { label: "Loan Against Property", url: "/loans/loan-against-property" },
  { label: "Credit Cards", url: "/credit-cards" },
  { label: "Tax & Accounting", url: "/tax-accounting" },
  { label: "Property Consulting", url: "/property-consulting" },
  { label: "Contact", url: "/contact" },
];

const STATUS_TONE: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  in_review: "bg-amber-100 text-amber-800 border-amber-200",
  submitted_to_bank: "bg-violet-100 text-violet-800 border-violet-200",
  sanctioned: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rejected: "bg-rose-100 text-rose-800 border-rose-200",
};

const LEAD_TONE: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  contacted: "bg-amber-100 text-amber-800 border-amber-200",
  qualified: "bg-violet-100 text-violet-800 border-violet-200",
  converted: "bg-emerald-100 text-emerald-800 border-emerald-200",
  lost: "bg-rose-100 text-rose-800 border-rose-200",
};

export function PortalClient() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [links, setLinks] = useState<AffiliateLink[]>([]);
  const [files, setFiles] = useState<PartnerFile[]>([]);
  const [leads, setLeads] = useState<PartnerLead[]>([]);
  const [stats, setStats] = useState<PartnerStats | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  const loadAll = useCallback(async () => {
    setDataLoading(true);
    try {
      const [lRes, fRes, leadRes] = await Promise.all([
        fetch("/api/affiliate", { cache: "no-store" }),
        fetch("/api/partner-files", { cache: "no-store" }),
        fetch("/api/partner-leads", { cache: "no-store" }),
      ]);
      if (lRes.ok) {
        const j = await lRes.json();
        setLinks(j.links || []);
      }
      if (fRes.ok) {
        const j = await fRes.json();
        setFiles(j.files || []);
        setStats(j.stats || null);
      }
      if (leadRes.ok) {
        const j = await leadRes.json();
        setLeads(j.leads || []);
      }
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && !user) router.replace("/auth");
  }, [loading, user, router]);

  useEffect(() => {
    if (user && (user.role === "partner" || user.role === "admin")) {
      loadAll();
    }
  }, [user, loadAll]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-gold" />
      </div>
    );
  }
  if (!user) return null;

  if (user.role !== "partner" && user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-soft">
          <ShieldAlert className="mx-auto mb-4 size-10 text-amber-600" />
          <h1 className="font-display text-2xl">Partner access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account ({user.email}) doesn&apos;t have partner privileges. Please sign in with a partner account.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Button asChild><Link href="/auth">Go to sign-in</Link></Button>
            <Button variant="outline" onClick={() => signOut()}>Sign out</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
          <Link href="/portal" className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-md bg-gradient-gold font-display font-bold text-gold-foreground">V</span>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Velixa Capital</div>
              <div className="text-[10px] uppercase tracking-wider text-primary-foreground/70">Partner Portal</div>
            </div>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden text-right leading-tight sm:block">
              <div className="text-sm font-medium">{user.email}</div>
              <div className="text-[10px] uppercase tracking-wide text-primary-foreground/60">{user.role}</div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={async () => {
                await signOut();
                router.replace("/auth");
              }}
              className="text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              aria-label="Sign out"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
        {/* Tab nav (horizontal, scrollable on mobile) */}
        <nav className="border-t border-primary-foreground/10">
          <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 py-1.5 scroll-thin">
            <TabButton active={tab === "dashboard"} onClick={() => setTab("dashboard")} icon={LayoutDashboard}>Dashboard</TabButton>
            <TabButton active={tab === "links"} onClick={() => setTab("links")} icon={Link2}>My Links</TabButton>
            <TabButton active={tab === "leads"} onClick={() => setTab("leads")} icon={Users}>My Leads</TabButton>
            <TabButton active={tab === "submit"} onClick={() => setTab("submit")} icon={FileUp}>Submit File</TabButton>
            <TabButton active={tab === "files"} onClick={() => setTab("files")} icon={FileText}>My Files</TabButton>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6 pb-24 md:pb-8">
          {tab === "dashboard" && (
            <DashboardTab links={links} leads={leads} files={files} stats={stats} loading={dataLoading} />
          )}
          {tab === "links" && <LinksTab links={links} loading={dataLoading} onChange={loadAll} />}
          {tab === "leads" && <LeadsTab leads={leads} loading={dataLoading} />}
          {tab === "submit" && <SubmitTab onSubmitted={loadAll} />}
          {tab === "files" && <FilesTab files={files} loading={dataLoading} />}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card md:hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-5">
          <MobileTab active={tab === "dashboard"} onClick={() => setTab("dashboard")} icon={LayoutDashboard} label="Home" />
          <MobileTab active={tab === "links"} onClick={() => setTab("links")} icon={Link2} label="Links" />
          <MobileTab active={tab === "leads"} onClick={() => setTab("leads")} icon={Users} label="Leads" />
          <MobileTab active={tab === "submit"} onClick={() => setTab("submit")} icon={FileUp} label="Submit" />
          <MobileTab active={tab === "files"} onClick={() => setTab("files")} icon={FileText} label="Files" />
        </div>
      </nav>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, children }: { active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition ${
        active ? "bg-primary-foreground/15 text-primary-foreground" : "text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground"
      }`}
    >
      <Icon className="size-4" />
      {children}
    </button>
  );
}

function MobileTab({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition ${
        active ? "text-gold" : "text-muted-foreground"
      }`}
    >
      <Icon className={`size-5 ${active ? "text-gold" : ""}`} />
      {label}
    </button>
  );
}

/* ---------- Dashboard ---------- */
function DashboardTab({ links, leads, files, stats, loading }: { links: AffiliateLink[]; leads: PartnerLead[]; files: PartnerFile[]; stats: PartnerStats | null; loading: boolean }) {
  const totalClicks = useMemo(() => links.reduce((s, l) => s + (l.clicks || 0), 0), [links]);
  const totalLeads = useMemo(() => links.reduce((s, l) => s + (l.leadCount || 0), 0), [links]);
  const conversion = totalClicks > 0 ? Math.round((totalLeads / totalClicks) * 100) : 0;

  if (loading) return <SkeletonGrid />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl">Partner Dashboard</h1>
        <p className="text-sm text-muted-foreground">Track your referral performance and customer files.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="Total clicks" value={totalClicks.toLocaleString()} sub="across all links" />
        <StatCard label="Leads generated" value={totalLeads.toLocaleString()} sub={`${leads.length} attributed`} />
        <StatCard label="Conversion" value={`${conversion}%`} sub="clicks → leads" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <MiniStat label="Files submitted" value={files.length} />
        <MiniStat label="In review" value={stats?.review ?? 0} />
        <MiniStat label="Sanctioned" value={stats?.sanctioned ?? 0} />
        <MiniStat label="Rejected" value={stats?.rejected ?? 0} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Active tracking links</CardTitle>
          <CardDescription>Your top-performing referral links.</CardDescription>
        </CardHeader>
        <CardContent>
          {links.length === 0 ? (
            <EmptyMini icon={Link2} text="No links yet — create one in the My Links tab." />
          ) : (
            <ul className="divide-y divide-border">
              {links.slice(0, 5).map((l) => (
                <li key={l.id} className="flex items-center justify-between py-2.5">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{l.label}</div>
                    <div className="truncate text-xs text-muted-foreground">{l.shareUrl}</div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{l.clicks} clicks</span>
                    <span>{l.leadCount} leads</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-1 font-display text-3xl text-foreground">{value}</div>
        <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
      </CardContent>
    </Card>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-1 font-display text-2xl">{value}</div>
      </CardContent>
    </Card>
  );
}

function SkeletonGrid() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-56" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
      </div>
      <Skeleton className="h-64 rounded-xl" />
    </div>
  );
}

function EmptyMini({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      <Icon className="mb-2 size-8 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

/* ---------- My Links ---------- */
function LinksTab({ links, loading, onChange }: { links: AffiliateLink[]; loading: boolean; onChange: () => Promise<void> }) {
  const [label, setLabel] = useState("");
  const [target, setTarget] = useState(TARGET_PRESETS[0].url);
  const [customSlug, setCustomSlug] = useState("");
  const [busy, setBusy] = useState(false);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!label.trim()) return toast.error("Enter a label");
    setBusy(true);
    try {
      const res = await fetch("/api/affiliate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: label.trim(), targetUrl: target, slug: customSlug.trim() || undefined }),
      });
      const j = await res.json();
      if (!res.ok) return toast.error(j?.error || "Failed");
      toast.success("Tracking link created");
      setLabel(""); setCustomSlug("");
      await onChange();
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this tracking link?")) return;
    const res = await fetch(`/api/affiliate/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Link deleted");
      await onChange();
    } else {
      toast.error("Failed to delete");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl">My Tracking Links</h1>
        <p className="text-sm text-muted-foreground">Create shareable links and track clicks + leads.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Create a tracking link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={create} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="label">Label</Label>
              <Input id="label" placeholder="e.g. Diwali Personal Loan campaign" value={label} onChange={(e) => setLabel(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="target">Target page</Label>
              <Select value={target} onValueChange={setTarget}>
                <SelectTrigger id="target"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TARGET_PRESETS.map((p) => <SelectItem key={p.url} value={p.url}>{p.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="slug">Custom slug (optional)</Label>
              <Input id="slug" placeholder="auto-generated if blank" value={customSlug} onChange={(e) => setCustomSlug(e.target.value)} />
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
        <CardHeader><CardTitle className="text-base">Your links ({links.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
          ) : links.length === 0 ? (
            <EmptyMini icon={Link2} text="No links yet — create your first above." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground">
                    <th className="py-2 pr-3">Label</th>
                    <th className="py-2 pr-3">Share URL</th>
                    <th className="py-2 pr-3 text-right">Clicks</th>
                    <th className="py-2 pr-3 text-right">Leads</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {links.map((l) => (
                    <tr key={l.id}>
                      <td className="py-2.5 pr-3">
                        <div className="font-medium">{l.label}</div>
                        <div className="truncate text-xs text-muted-foreground max-w-[160px]">{l.targetUrl}</div>
                      </td>
                      <td className="py-2.5 pr-3">
                        <CopyUrl url={l.shareUrl} />
                      </td>
                      <td className="py-2.5 pr-3 text-right tabular-nums">{l.clicks}</td>
                      <td className="py-2.5 pr-3 text-right tabular-nums">{l.leadCount}</td>
                      <td className="py-2.5 text-right">
                        <Button size="icon" variant="ghost" onClick={() => remove(l.id)} aria-label="Delete">
                          <Trash2 className="size-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function CopyUrl({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const full = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;
  return (
    <div className="flex items-center gap-1.5">
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
        {url} <ExternalLink className="size-3" />
      </a>
      <Button
        size="icon"
        variant="ghost"
        className="size-7"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(full);
            setCopied(true);
            toast.success("Copied share URL");
            setTimeout(() => setCopied(false), 1500);
          } catch {
            toast.error("Copy failed");
          }
        }}
        aria-label="Copy URL"
      >
        {copied ? <CheckCircle2 className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
      </Button>
    </div>
  );
}

/* ---------- My Leads ---------- */
function LeadsTab({ leads, loading }: { leads: PartnerLead[]; loading: boolean }) {
  if (loading) return <SkeletonGrid />;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl">My Leads</h1>
        <p className="text-sm text-muted-foreground">Leads attributed to your tracking links (PII masked).</p>
      </div>
      <Card>
        <CardContent className="p-0">
          {leads.length === 0 ? (
            <EmptyMini icon={Users} text="No leads yet — share your tracking links to start." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Contact</th>
                    <th className="px-4 py-2">Service</th>
                    <th className="px-4 py-2">Source</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {leads.map((l) => (
                    <tr key={l.id}>
                      <td className="px-4 py-2.5 font-medium">{l.name}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">
                        <div>{l.mobileMasked}</div>
                        <div>{l.emailMasked}</div>
                      </td>
                      <td className="px-4 py-2.5">{l.service || "—"}</td>
                      <td className="px-4 py-2.5 text-xs">{l.sourcePage || l.affiliateSlug || "—"}</td>
                      <td className="px-4 py-2.5">
                        <Badge variant="outline" className={LEAD_TONE[l.status] || ""}>{l.status}</Badge>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{formatDate(l.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- Submit File ---------- */
function SubmitTab({ onSubmitted }: { onSubmitted: () => Promise<void> }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [service, setService] = useState(LOANS[0].name);
  const [amount, setAmount] = useState("");
  const [emp, setEmp] = useState("Salaried");
  const [notes, setNotes] = useState("");
  const [fileName, setFileName] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return toast.error("Customer name required");
    const digits = mobile.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(digits)) return toast.error("Enter a valid 10-digit mobile (6–9)");
    setBusy(true);
    try {
      const res = await fetch("/api/partner-files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name.trim(),
          customerMobile: digits,
          customerEmail: email.trim() || undefined,
          city: city.trim() || undefined,
          service,
          loanAmount: amount ? Number(amount) : undefined,
          employmentType: emp,
          notes: notes.trim() || undefined,
          fileName: fileName || undefined,
        }),
      });
      const j = await res.json();
      if (!res.ok) return toast.error(j?.error || "Submit failed");
      toast.success("Customer file submitted — view it under My Files.");
      setName(""); setMobile(""); setEmail(""); setCity(""); setAmount(""); setNotes(""); setFileName("");
      await onSubmitted();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl">Submit a Customer File</h1>
        <p className="text-sm text-muted-foreground">Submit a customer file for our team to route to the right lender.</p>
      </div>

      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
        <Lock className="mr-1 inline size-3.5" />
        Your customer&apos;s data is encrypted (AES-256-GCM) before storage. Only authorised admin/employee roles can decrypt.
      </div>

      <Card>
        <CardContent>
          <form onSubmit={submit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Customer name" required>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
            </Field>
            <Field label="Mobile" required>
              <Input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="10-digit mobile" inputMode="numeric" />
            </Field>
            <Field label="Email">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="customer@email.com" type="email" />
            </Field>
            <Field label="City">
              <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
            </Field>
            <Field label="Service">
              <Select value={service} onValueChange={setService}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {LOANS.map((l) => <SelectItem key={l.slug} value={l.name}>{l.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Loan amount (₹)">
              <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 500000" inputMode="numeric" />
            </Field>
            <Field label="Employment type">
              <Select value={emp} onValueChange={setEmp}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Salaried", "Self-employed", "Business", "Professional", "Other"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Document file (PDF/Image — filename only)">
              <Input
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
              />
              {fileName && <div className="mt-1 text-xs text-muted-foreground">Selected: {fileName}</div>}
            </Field>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any context for the credit team" rows={3} />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" disabled={busy} className="w-full sm:w-auto">
                {busy ? <Loader2 className="size-4 animate-spin" /> : <FileUp className="size-4" />}
                Submit customer file
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
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

/* ---------- My Files ---------- */
function FilesTab({ files, loading }: { files: PartnerFile[]; loading: boolean }) {
  if (loading) return <SkeletonGrid />;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl">My Files</h1>
        <p className="text-sm text-muted-foreground">Track status of customer files you&apos;ve submitted.</p>
      </div>
      <Card>
        <CardContent className="p-0">
          {files.length === 0 ? (
            <EmptyMini icon={FileText} text="No files submitted yet — use the Submit File tab." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground">
                    <th className="px-4 py-2">Customer</th>
                    <th className="px-4 py-2">Service</th>
                    <th className="px-4 py-2 text-right">Amount</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Admin notes</th>
                    <th className="px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {files.map((f) => (
                    <tr key={f.id}>
                      <td className="px-4 py-2.5">
                        <div className="font-medium">{f.customerName}</div>
                        <div className="text-xs text-muted-foreground">{f.fileName || f.customerMobileMasked || "—"}</div>
                      </td>
                      <td className="px-4 py-2.5">{f.service || "—"}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{f.loanAmount ? `₹${Number(f.loanAmount).toLocaleString("en-IN")}` : "—"}</td>
                      <td className="px-4 py-2.5">
                        <Badge variant="outline" className={STATUS_TONE[f.status] || ""}>{f.status.replace(/_/g, " ")}</Badge>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground max-w-[180px] truncate" title={f.adminNotes || ""}>
                        {f.adminNotes || "—"}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{formatDate(f.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- helpers ---------- */
function formatDate(d: string | Date) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
