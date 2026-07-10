import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { listChatMessages, createChatMessage, purgeOldChatMessages } from "@/lib/data";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "employee" && user.role !== "admin") return NextResponse.json({ error: "Employee access required" }, { status: 403 });
  const { searchParams } = new URL(req.url);
  const channel = searchParams.get("channel") || "general";
  const msgs = await listChatMessages(channel, 200);
  await purgeOldChatMessages().catch(() => {});
  return NextResponse.json({ messages: msgs });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "employee" && user.role !== "admin") return NextResponse.json({ error: "Employee access required" }, { status: 403 });
  const body = await req.json();
  const content = String(body.content || "").trim();
  if (!content) return NextResponse.json({ error: "Message required" }, { status: 400 });
  const msg = await createChatMessage({
    userId: user.id, userName: user.displayName || user.email.split("@")[0],
    userRole: user.role, channel: String(body.channel || "general"), content,
  });
  return NextResponse.json({ message: msg });
}
