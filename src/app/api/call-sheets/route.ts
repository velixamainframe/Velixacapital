import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/session";
import {
  createCallSheet,
  addCallAssignments,
  listCallSheets,
  audit,
} from "@/lib/data";

export const runtime = "nodejs";

/* ---------- minimal CSV parser (handles quoted fields, commas, newlines) ---------- */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let cur: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  // Normalize CRLF -> LF
  const s = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  while (i < s.length) {
    const ch = s[i];
    if (inQuotes) {
      if (ch === '"') {
        if (s[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += ch;
      i++;
      continue;
    }
    if (ch === '"') { inQuotes = true; i++; continue; }
    if (ch === ",") { cur.push(field); field = ""; i++; continue; }
    if (ch === "\n") {
      cur.push(field);
      rows.push(cur);
      cur = [];
      field = "";
      i++;
      continue;
    }
    field += ch;
    i++;
  }
  // Last field/row if any content remains.
  if (field.length > 0 || cur.length > 0) {
    cur.push(field);
    rows.push(cur);
  }
  // Drop trailing empty rows.
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

function rowToCallRow(headerMap: Record<string, number>, row: string[]) {
  const get = (h: string) => {
    const idx = headerMap[h];
    if (idx === undefined) return undefined;
    const v = row[idx];
    return v === undefined ? undefined : v.trim();
  };
  const num = (h: string) => {
    const v = get(h);
    if (!v) return undefined;
    const n = Number(v.replace(/[,₹\s]/g, ""));
    return Number.isFinite(n) ? n : undefined;
  };
  return {
    customerName: get("name"),
    customerMobile: get("mobile"),
    customerEmail: get("email"),
    city: get("city"),
    service: get("service"),
    loanAmount: num("loan_amount"),
    employmentType: get("employment_type"),
    monthlyIncome: num("monthly_income"),
    notes: get("notes"),
    priority: num("priority"),
  };
}

/** POST /api/call-sheets (multipart/form-data): name, file, employeeId (optional) */
export async function POST(req: Request) {
  try {
    const user = await requireRole("admin");
    const form = await req.formData();
    const name = String(form.get("name") || "").trim();
    const file = form.get("file") as File | null;
    

    if (!name) return NextResponse.json({ error: "Sheet name required" }, { status: 400 });
    if (!file) return NextResponse.json({ error: "CSV file required" }, { status: 400 });

    const text = await file.text();
    const rows = parseCsv(text);
    if (rows.length === 0) {
      return NextResponse.json({ error: "CSV appears empty" }, { status: 400 });
    }

    // Detect header row.
    const firstRow = rows[0].map((c) => c.toLowerCase().trim().replace(/\s+/g, "_"));
    const hasHeader = firstRow.some((h) =>
      ["name", "mobile", "email", "city", "service", "loan_amount", "employment_type", "monthly_income", "notes", "priority"].includes(h),
    );

    let headerMap: Record<string, number> = {};
    let dataRows = rows;
    if (hasHeader) {
      firstRow.forEach((h, i) => {
        if (!headerMap[h]) headerMap[h] = i;
      });
      // Also accept 'loanAmount'/'loanAmount' etc — already normalized.
      dataRows = rows.slice(1);
    } else {
      // Default positional order if no header.
      headerMap = { name: 0, mobile: 1, email: 2, city: 3, service: 4, loan_amount: 5, employment_type: 6, monthly_income: 7, notes: 8 };
    }

    if (dataRows.length === 0) {
      return NextResponse.json({ error: "No data rows found after header" }, { status: 400 });
    }

    const callRows = dataRows
      .map((r) => rowToCallRow(headerMap, r))
      .filter((r) => r.customerName || r.customerMobile);

    if (callRows.length === 0) {
      return NextResponse.json({ error: "No valid rows found (need name or mobile)" }, { status: 400 });
    }

    const sheet = await createCallSheet({
      name,
      uploadedById: user.id,
      fileName: file.name || "upload.csv",
    });
    const count = await addCallAssignments(sheet.id, callRows);

    // If employeeId provided, reassign all pending rows explicitly (addCallAssignments already sets employeeId for new rows).
    await audit({
      actorId: user.id,
      actorRole: user.role,
      action: "admin.callsheet.upload",
      entity: "CallSheet",
      entityId: sheet.id,
      meta: { name, fileName: file.name, rows: count },
    });

    return NextResponse.json({
      ok: true,
      id: sheet.id,
      rowsCreated: count,
      totalParsed: callRows.length,
    });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e?.message === "FORBIDDEN") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    console.error(e);
    return NextResponse.json({ error: "Failed to upload call sheet" }, { status: 500 });
  }
}

/** GET /api/call-sheets — list all sheets with assignment counts. */
export async function GET() {
  try {
    await requireRole("admin");
    const sheets = await listCallSheets();
    return NextResponse.json({
      sheets: sheets.map((s) => ({
        id: s.id,
        name: s.name,
        fileName: s.fileName,
        totalRecords: s.totalRecords,
        createdAt: s.createdAt,
        uploadedById: s.uploadedById,
        assignmentCount: (s as any)._count?.assignments ?? 0,
      })),
    });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (e?.message === "FORBIDDEN") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    console.error(e);
    return NextResponse.json({ error: "Failed to list call sheets" }, { status: 500 });
  }
}
