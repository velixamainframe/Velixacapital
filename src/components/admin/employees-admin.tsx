"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Users, Plus, Loader2, RefreshCw, Phone, Mail, Target, CheckCircle2 } from "lucide-react";

type Employee = {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  userEmail: string;
  employeeCode?: string | null;
  designation?: string | null;
  targetCalls: number;
  assignments: number;
  converted: number;
};

export function EmployeesAdminClient() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("Telecaller");
  const [employeeCode, setEmployeeCode] = useState("");
  const [targetCalls, setTargetCalls] = useState("50");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/employees", { cache: "no-store" });
      const j = await res.json();
      setEmployees(j.employees || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/admin/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          password,
          mobile,
          designation,
          employeeCode: employeeCode.trim() || undefined,
          targetCalls: Number(targetCalls) || 50,
        }),
      });
      const j = await res.json();
      if (!res.ok) return toast.error(j?.error || "Failed");
      toast.success(`Employee ${fullName} created — they can sign in at /auth.`);
      setFullName(""); setEmail(""); setPassword(""); setMobile(""); setEmployeeCode(""); setTargetCalls("50");
      setShowForm(false);
      await load();
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminShell active="employees">
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl">Employees</h1>
            <p className="text-sm text-muted-foreground">{employees.length} active employees with CRM access.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={load}><RefreshCw className="size-4" /> Refresh</Button>
            <Button size="sm" onClick={() => setShowForm((s) => !s)}>
              <Plus className="size-4" /> {showForm ? "Cancel" : "Add employee"}
            </Button>
          </div>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Add a new employee</CardTitle>
              <CardDescription>Creates a User (role=employee) with login + an encrypted Employee profile.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={create} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Full name" required><Input value={fullName} onChange={(e) => setFullName(e.target.value)} required /></Field>
                <Field label="Login email" required><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
                <Field label="Password" required><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} /></Field>
                <Field label="Mobile" required><Input value={mobile} onChange={(e) => setMobile(e.target.value)} inputMode="numeric" required /></Field>
                <Field label="Designation">
                  <Select value={designation} onValueChange={setDesignation}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Telecaller", "Senior Telecaller", "Credit Manager", "Team Lead", "Operations"].map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Employee code"><Input value={employeeCode} onChange={(e) => setEmployeeCode(e.target.value)} placeholder="e.g. VC-E-014" /></Field>
                <Field label="Target calls / day"><Input value={targetCalls} onChange={(e) => setTargetCalls(e.target.value)} inputMode="numeric" /></Field>
                <div className="sm:col-span-2">
                  <Button type="submit" disabled={busy}>
                    {busy ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                    Create employee
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="space-y-2 p-4">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}</div>
            ) : employees.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <Users className="mb-2 size-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No employees yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {employees.map((e) => (
                  <div key={e.id} className="p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="grid size-10 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {e.fullName.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                        </div>
                        <div>
                          <div className="font-medium">{e.fullName}</div>
                          <div className="text-xs text-muted-foreground">
                            {e.designation || "—"} · {e.employeeCode || "no code"} · {e.userEmail}
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-xs">
                        <div className="text-muted-foreground">{e.email}</div>
                        <a href={`tel:+91${e.mobile.replace(/\D/g, "").slice(-10)}`} className="text-primary hover:underline">+91 {e.mobile}</a>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Target className="size-3.5" /> Target: {e.targetCalls}/day</span>
                      <span className="inline-flex items-center gap-1"><Users className="size-3.5" /> {e.assignments} assignments</span>
                      <span className="inline-flex items-center gap-1 text-emerald-700"><CheckCircle2 className="size-3.5" /> {e.converted} converted</span>
                      <a href={`mailto:${e.userEmail}`} className="inline-flex items-center gap-1 hover:text-foreground"><Mail className="size-3.5" /> Email</a>
                      <a href={`tel:+91${e.mobile.replace(/\D/g, "").slice(-10)}`} className="inline-flex items-center gap-1 hover:text-foreground"><Phone className="size-3.5" /> Call</a>
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

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}{required && <span className="ml-0.5 text-destructive">*</span>}</Label>
      {children}
    </div>
  );
}
