import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { getEmployeeByUserId, releaseLead, audit } from "@/lib/data";

export const runtime = "nodejs";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "employee") return NextResponse.json({ error: "Only employees can release leads" }, { status: 403 });
  const { id } = await params;
  const employee = await getEmployeeByUserId(user.id);
  if (!employee) return NextResponse.json({ error: "No employee record" }, { status: 403 });
  try {
    await releaseLead(id, employee.id);
    await audit({ actorId: user.id, actorRole: user.role, action: "release_lead", entity: "call_assignment", entityId: id });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Could not release lead" }, { status: 409 });
  }
}
