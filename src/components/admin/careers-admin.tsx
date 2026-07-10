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
import { Briefcase, Plus, Loader2, RefreshCw, Edit, X } from "lucide-react";

type Career = {
  id: string;
  title: string;
  department?: string | null;
  location: string;
  employmentType: string;
  shortDescription: string;
  description: string;
  requirements: string[];
  salaryRange?: string | null;
  applyEmail: string;
  published: boolean;
  displayOrder: number;
  createdAt: string;
};

const EMP_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

export function CareersAdminClient() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("Mumbai, India");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [applyEmail, setApplyEmail] = useState("careers@velixacapital.in");
  const [displayOrder, setDisplayOrder] = useState("0");
  const [published, setPublished] = useState(true);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/careers", { cache: "no-store" });
      const j = await res.json();
      setCareers(j.careers || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function reset() {
    setId(null); setTitle(""); setDepartment(""); setLocation("Mumbai, India"); setEmploymentType("Full-time");
    setShortDescription(""); setDescription(""); setRequirements(""); setSalaryRange(""); setApplyEmail("careers@velixacapital.in");
    setDisplayOrder("0"); setPublished(true);
  }

  function openEdit(c: Career) {
    setId(c.id); setTitle(c.title); setDepartment(c.department || ""); setLocation(c.location);
    setEmploymentType(c.employmentType); setShortDescription(c.shortDescription); setDescription(c.description);
    setRequirements(c.requirements.join("\n")); setSalaryRange(c.salaryRange || ""); setApplyEmail(c.applyEmail);
    setDisplayOrder(String(c.displayOrder)); setPublished(c.published);
    setShowForm(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !shortDescription.trim() || !description.trim()) return toast.error("Title, short description and description required");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id ?? undefined,
          title: title.trim(),
          department: department.trim() || undefined,
          location: location.trim(),
          employmentType,
          shortDescription: shortDescription.trim(),
          description: description.trim(),
          requirements,
          salaryRange: salaryRange.trim() || undefined,
          applyEmail,
          displayOrder: Number(displayOrder) || 0,
          published,
        }),
      });
      const j = await res.json();
      if (!res.ok) return toast.error(j?.error || "Failed");
      toast.success(id ? "Career updated" : "Career posted");
      reset(); setShowForm(false); await load();
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminShell active="careers">
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl">Careers</h1>
            <p className="text-sm text-muted-foreground">{careers.length} postings · {careers.filter((c) => c.published).length} published.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={load}><RefreshCw className="size-4" /> Refresh</Button>
            <Button size="sm" onClick={() => { reset(); setShowForm(true); }}><Plus className="size-4" /> New posting</Button>
          </div>
        </div>

        {showForm && (
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">{id ? "Edit posting" : "New posting"}</CardTitle>
                <CardDescription>Career posting visible at /careers.</CardDescription>
              </div>
              <Button size="icon" variant="ghost" onClick={() => { setShowForm(false); reset(); }}><X className="size-4" /></Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={save} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Title" required><Input value={title} onChange={(e) => setTitle(e.target.value)} required /></Field>
                <Field label="Department"><Input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. Sales" /></Field>
                <Field label="Location"><Input value={location} onChange={(e) => setLocation(e.target.value)} /></Field>
                <Field label="Employment type">
                  <Select value={employmentType} onValueChange={setEmploymentType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {EMP_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Salary range"><Input value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} placeholder="₹6–10 LPA" /></Field>
                <Field label="Apply email"><Input value={applyEmail} onChange={(e) => setApplyEmail(e.target.value)} /></Field>
                <Field label="Display order"><Input value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} inputMode="numeric" /></Field>
                <div className="flex items-center gap-2 self-end pb-2">
                  <Checkbox id="pub" checked={published} onCheckedChange={(v) => setPublished(!!v)} />
                  <Label htmlFor="pub" className="cursor-pointer text-sm">Published</Label>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="short">Short description</Label>
                  <Input id="short" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="req">Requirements (one per line)</Label>
                  <Textarea id="req" value={requirements} onChange={(e) => setRequirements(e.target.value)} rows={4} />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" disabled={busy}>
                    {busy ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                    {id ? "Save changes" : "Create posting"}
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
            ) : careers.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <Briefcase className="mb-2 size-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No career postings yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {careers.map((c) => (
                  <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{c.title}</span>
                        <Badge variant="outline" className={c.published ? "bg-emerald-50 text-emerald-800" : "bg-muted text-muted-foreground"}>
                          {c.published ? "published" : "draft"}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {c.department || "—"} · {c.location} · {c.employmentType} · {c.salaryRange || "—"}
                      </div>
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
