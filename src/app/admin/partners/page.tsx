import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";
import { listPartnerApplications } from "@/lib/data";
import { AdminShell } from "@/components/admin/admin-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Handshake, Phone, Mail, Briefcase, MapPin, Calendar, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Partner Applications — Velixa Admin" },
  description: "Review partner applications.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const STATUS_TONE: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rejected: "bg-rose-100 text-rose-800 border-rose-200",
};

export default async function AdminPartnersPage() {
  const user = await getSessionUser();
  if (!user || user.role !== "admin") redirect("/auth");

  const apps = await listPartnerApplications();

  return (
    <AdminShell active="partners">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl">Partner Applications</h1>
          <p className="text-sm text-muted-foreground">{apps.length} applications received via the /partner form.</p>
        </div>

        {apps.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <Handshake className="mb-2 size-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No partner applications yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {apps.map((a) => (
              <Card key={a.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base">{a.fullName}</CardTitle>
                      <CardDescription className="mt-1 flex items-center gap-2 text-xs">
                        <Calendar className="size-3" />
                        {new Date(a.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={STATUS_TONE[a.status] || ""}>{a.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5"><MapPin className="size-3.5" /> {a.city}</div>
                    <div className="flex items-center gap-1.5"><Briefcase className="size-3.5" /> {a.currentProfession || "—"}</div>
                    <div className="flex items-center gap-1.5">Experience: <span className="text-foreground">{a.experienceYears} yrs</span></div>
                    <div className="flex items-center gap-1.5">Expected leads: <span className="text-foreground">{a.expectedMonthlyLeads}/mo</span></div>
                  </div>
                  {a.businessType && (
                    <div className="text-xs text-muted-foreground">Business type: <span className="text-foreground">{a.businessType}</span></div>
                  )}
                  {a.message && (
                    <div className="rounded-md bg-muted/60 p-2 text-xs">
                      <MessageSquare className="mr-1 inline size-3.5 text-muted-foreground" />
                      {a.message}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <a href={`tel:+91${a.mobile.replace(/\D/g, "").slice(-10)}`} className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs hover:border-emerald-500/50 hover:text-emerald-700">
                      <Phone className="size-3.5" /> {a.mobile}
                    </a>
                    <a href={`mailto:${a.email}`} className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs hover:border-primary/50">
                      <Mail className="size-3.5" /> {a.email}
                    </a>
                    {a.pan && <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs">PAN: {a.pan}</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
