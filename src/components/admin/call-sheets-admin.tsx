"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
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
  FileSpreadsheet,
  Upload,
  Download,
  Loader2,
  ArrowRight,
  RefreshCw,
  Users,
  FileUp,
} from "lucide-react";

type Employee = {
  id: string;
  fullName: string;
  email: string;
  userEmail: string;
  designation?: string | null;
  employeeCode?: string | null;
  assignments: number;
  converted: number;
};

type CallSheet = {
  id: string;
  name: string;
  fileName?: string | null;
  totalRecords: number;
  createdAt: string;
  assignmentCount: number;
};

const SAMPLE_CSV = `name,mobile,email,city,service,loan_amount,employment_type,monthly_income,notes
Aarav Sharma,9876543210,aarav@example.com,Mumbai,Personal Loan,500000,Salaried,80000,Walk-in customer
Diya Patel,9123456780,diya@example.com,Pune,Business Loan,1500000,Business,200000,Called via referral
Vivaan Mehta,9988776655,vivaan@example.com,Delhi,Home Loan,3500000,Salaried,180000,Existing customer`;

function parseCsvPreview(text: string): { headers: string[]; rows: string[][] } {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").filter((l) => l.trim());
  if (lines.length === 0) return { headers: [], rows: [] };
  const headers = splitLine(lines[0]);
  const rows = lines.slice(1, 11).map(splitLine); // preview first 10 rows
  return { headers, rows };
}

function splitLine(line: string): string[] {
  const out: string[] = [];
  let field = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQ) {
      if (ch === '"' && line[i + 1] === '"') { field += '"'; i++; continue; }
      if (ch === '"') { inQ = false; continue; }
      field += ch; continue;
    }
    if (ch === '"') { inQ = true; continue; }
    if (ch === ",") { out.push(field); field = ""; continue; }
    field += ch;
  }
  out.push(field);
  return out;
}

function downloadSample() {
  const blob = new Blob([SAMPLE_CSV], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "velixa-call-sheet-sample.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function CallSheetsAdminClient() {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("__none__");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<{ headers: string[]; rows: string[][] } | null>(null);
  const [busy, setBusy] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [sheets, setSheets] = useState<CallSheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [reassignId, setReassignId] = useState<string | null>(null);
  const [reassignEmp, setReassignEmp] = useState<string>("__none__");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [eRes, sRes] = await Promise.all([
        fetch("/api/admin/employees", { cache: "no-store" }),
        fetch("/api/call-sheets", { cache: "no-store" }),
      ]);
      if (eRes.ok) {
        const j = await eRes.json();
        setEmployees(j.employees || []);
      }
      if (sRes.ok) {
        const j = await sRes.json();
        setSheets(j.sheets || []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function onFileChange(f: File | null) {
    setFile(f);
    if (!f) { setPreview(null); return; }
    f.text().then((t) => setPreview(parseCsvPreview(t))).catch(() => setPreview(null));
  }

  async function upload() {
    if (!name.trim()) return toast.error("Enter a sheet name");
    if (!file) return toast.error("Pick a CSV file");
    setBusy(true);
    try {
      const fd = new FormData();
      fd.set("name", name.trim());
      fd.set("file", file);
      fd.set("employeeId", employeeId === "__none__" ? "" : employeeId);
      const res = await fetch("/api/call-sheets", { method: "POST", body: fd });
      const j = await res.json();
      if (!res.ok) return toast.error(j?.error || "Upload failed");
      toast.success(`Created ${j.rowsCreated} assignments from ${j.totalParsed} parsed rows.`, {
        duration: 6000,
        action: { label: "Open CRM", onClick: () => window.open("/crm", "_blank") },
      });
      setName(""); setFile(null); setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function doReassign(sheetId: string) {
    const emp = reassignEmp === "__none__" ? null : reassignEmp;
    const res = await fetch(`/api/call-sheets/${sheetId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeeId: emp }),
    });
    const j = await res.json();
    if (res.ok) {
      toast.success(`Reassigned ${j.updated || 0} pending rows.`);
      setReassignId(null);
    } else {
      toast.error(j?.error || "Reassign failed");
    }
  }

  return (
    <AdminShell active="call-sheets">
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl">Call Sheets</h1>
            <p className="text-sm text-muted-foreground">Upload a CSV of customer contacts — they become call assignments in the CRM.</p>
          </div>
          <Button variant="outline" size="sm" onClick={downloadSample}>
            <Download className="size-4" /> Download sample CSV
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upload a call sheet</CardTitle>
            <CardDescription>
              CSV columns: name, mobile, email, city, service, loan_amount, employment_type, monthly_income, notes. A header row is auto-detected.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="sheet-name">Sheet name</Label>
                <Input id="sheet-name" placeholder="e.g. Mumbai Personal Loan — July" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Bulk-assign to employee (optional)</Label>
                <Select value={employeeId} onValueChange={setEmployeeId}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">Leave unassigned</SelectItem>
                    {employees.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.fullName} {e.designation ? `· ${e.designation}` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="csv-file">CSV file</Label>
              <Input
                ref={fileRef}
                id="csv-file"
                type="file"
                accept=".csv,text/csv"
                onChange={(e) => onFileChange(e.target.files?.[0] || null)}
              />
              {file && <div className="text-xs text-muted-foreground">Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)</div>}
            </div>

            {preview && preview.headers.length > 0 && (
              <div className="rounded-lg border border-border">
                <div className="border-b border-border bg-muted/40 px-3 py-2 text-xs font-medium">
                  Preview ({preview.rows.length} rows shown)
                </div>
                <div className="max-h-64 overflow-auto scroll-thin">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-card">
                      <tr className="text-left">
                        {preview.headers.map((h, i) => <th key={i} className="px-2 py-1.5 font-medium text-muted-foreground">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {preview.rows.map((r, i) => (
                        <tr key={i} className="border-t border-border">
                          {preview.headers.map((_, j) => <td key={j} className="px-2 py-1.5">{r[j] ?? ""}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Button onClick={upload} disabled={busy}>
                {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
                Upload & create assignments
              </Button>
              <Button variant="outline" asChild>
                <Link href="/crm"><ArrowRight className="size-4" /> Open CRM</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Existing call sheets ({sheets.length})</CardTitle>
            <Button variant="ghost" size="sm" onClick={load}><RefreshCw className="size-4" /></Button>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="space-y-2 p-4">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
            ) : sheets.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-10 text-center">
                <FileSpreadsheet className="mb-2 size-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No call sheets yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {sheets.map((s) => (
                  <div key={s.id} className="flex flex-wrap items-start justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <FileUp className="size-4 text-muted-foreground" />
                        <span className="font-medium">{s.name}</span>
                        <Badge variant="outline">{s.totalRecords} records</Badge>
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {s.fileName || "no file"} · uploaded {new Date(s.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {reassignId === s.id ? (
                        <>
                          <Select value={reassignEmp} onValueChange={setReassignEmp}>
                            <SelectTrigger className="h-8 w-48 text-xs"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="__none__">Unassign</SelectItem>
                              {employees.map((e) => <SelectItem key={e.id} value={e.id}>{e.fullName}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <Button size="sm" onClick={() => doReassign(s.id)}>Save</Button>
                          <Button size="sm" variant="outline" onClick={() => setReassignId(null)}>Cancel</Button>
                        </>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => { setReassignId(s.id); setReassignEmp("__none__"); }}>
                          Reassign
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Employees ({employees.length})</CardTitle></CardHeader>
          <CardContent className="p-0">
            {employees.length === 0 ? (
              <p className="px-4 pb-4 text-sm text-muted-foreground">No employees yet — add one in the Employees tab.</p>
            ) : (
              <div className="divide-y divide-border">
                {employees.map((e) => (
                  <div key={e.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-2">
                      <div className="grid size-9 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {e.fullName.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{e.fullName}</div>
                        <div className="text-xs text-muted-foreground">{e.userEmail}{e.designation ? ` · ${e.designation}` : ""}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span><Users className="mr-1 inline size-3.5" />{e.assignments} assigned</span>
                      <span className="text-emerald-700">{e.converted} converted</span>
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
