import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { findUserByEmail } from "@/lib/data";
import { hashPassword, verifyPassword, signSession, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }
    const user = await findUserByEmail(String(email).toLowerCase());
    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    if (!verifyPassword(String(password), user.passwordHash)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    if (!user.isActive) {
      return NextResponse.json({ error: "Account disabled. Contact your administrator." }, { status: 403 });
    }
    const token = signSession(user.id);
    const res = NextResponse.json({
      user: { id: user.id, email: user.email, displayName: user.displayName, role: user.role },
    });
    res.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });
    return res;
  } catch (e) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
