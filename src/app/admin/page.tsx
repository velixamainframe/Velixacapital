import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth/session";
import { adminStats, listLeads, listPartnerFiles } from "@/lib/data";
import { maskPhone, maskEmail } from "@/lib/crypto";
import { AdminShell } from "@/components/admin/admin-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PhoneCall,
  Newspaper,
  CreditCard,
  Link2,
  Users,
  Handshake,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Admin — Velixa Capital" },
  description: "Admin dashboard.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const user = await getSessionUser();
  if (!user || user.role !== "admin") redirect("/auth");

  const [stats, recentLeads, recentFiles] = await Promise.all([
    adminStats(),
    listLeads(5),
    listPartnerFiles(),
  ]);
  const recentFilesTop = recentFiles.slice(0, 5);

  const cards = [
    { label: "Leads", value: stats.leads, icon: PhoneCall, href: "/admin/leads" },
    { label: "Blog posts", value: stats.blogs, icon: Newspaper, href: "/admin/blogs" },
    { label: "Credit cards", value: stats.cards, icon: CreditCard, href: "/admin/cards" },
    { label: "Affiliate links", value: stats.affiliates, icon: Link2, href: "/admin/affiliate" },
    { label: "Employees", value: stats.employees, icon: Users, href: "/admin/employees" },
    { label: "Partners", value: stats.partners, icon: Handshake, href: "/admin/partner-access" },
    { label: "Call sheets", value: stats.callSheets, icon: FileSpreadsheet, href: "/admin/call-sheets" },
    { label: "Partner files", value: stats.partnerFiles, icon: FileText, href: "/admin/partners" },
    { label: "Call assignments", value: stats.assignments, icon: PhoneCall, href: "/admin/call-sheets" },
    {
      label: "Conversions",
      value: stats.converted,
      icon: CheckCircle2,
      href: "/admin/leads",
      sub:
        stats.assignments > 0
          ? `${Math.round((stats.converted / stats.assignments) * 100)}% of assignments`
          : undefined,
    },
  ];

  return (
    <AdminShell active="dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Signed in as {user.email}. Overview of all platform activity.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link key={c.label} href={c.href} className="block">
                <Card className="h-full transition hover:border-gold/50 hover:shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{c.label}</div>
                      <Icon className="size-4 text-muted-foreground" />
                    </div>
                    <div className="mt-1 font-display text-2xl">{c.value.toLocaleString()}</div>
                    {c.sub && <div className="mt-0.5 text-[11px] text-muted-foreground">{c.sub}</div>}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">Recent leads</CardTitle>
              <Link href="/admin/leads" className="text-xs text-primary hover:underline">View all →</Link>
            </CardHeader>
            <CardContent className="p-0">
              {recentLeads.length === 0 ? (
                <p className="px-6 pb-6 text-sm text-muted-foreground">No leads yet.</p>
              ) : (
                <ul className="divide-y divide-border">
                  {recentLeads.map((l) => (
                    <li key={l.id} className="flex items-center justify-between px-6 py-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">{l.name}</div>
                        <div className="truncate text-xs text-muted-foreground">
                          {maskPhone(l.mobile)} · {l.service || "General"} · {l.city || "—"}
                        </div>
                      </div>
                      <div className="ml-3 shrink-0 text-right text-xs">
                        <div className="font-medium uppercase tracking-wide text-muted-foreground">{l.status}</div>
                        <div className="text-muted-foreground">{new Date(l.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">Recent partner files</CardTitle>
              <Link href="/admin/partners" className="text-xs text-primary hover:underline">View all →</Link>
            </CardHeader>
            <CardContent className="p-0">
              {recentFilesTop.length === 0 ? (
                <p className="px-6 pb-6 text-sm text-muted-foreground">No partner files yet.</p>
              ) : (
                <ul className="divide-y divide-border">
                  {recentFilesTop.map((f) => (
                    <li key={f.id} className="flex items-center justify-between px-6 py-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">{f.customerName}</div>
                        <div className="truncate text-xs text-muted-foreground">
                          {f.service || "—"} · {f.fileName || maskEmail(f.customerEmail)}
                        </div>
                      </div>
                      <div className="ml-3 shrink-0 text-right text-xs">
                        <div className="font-medium uppercase tracking-wide text-muted-foreground">{f.status.replace(/_/g, " ")}</div>
                        <div className="text-muted-foreground">{new Date(f.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Quick links</CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Link href="/admin/call-sheets" className="btn-outline">Upload call sheet</Link>
              <Link href="/admin/employees" className="btn-outline">Add employee</Link>
              <Link href="/admin/partner-access" className="btn-outline">Grant partner access</Link>
              <Link href="/admin/blogs" className="btn-outline">Manage blogs</Link>
              <Link href="/admin/bulk-affiliate" className="btn-outline">Bulk-create affiliate links</Link>
              <Link href="/crm" className="btn-outline">Preview employee CRM</Link>
              <Link href="/portal" className="btn-outline">Preview partner portal</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
