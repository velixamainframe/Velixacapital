import { NextResponse } from "next/server";
import { findUserByEmail, createUser } from "@/lib/data";
import { hashPassword, signSession, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, password, displayName } = await req.json();
    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: "Email and a 6+ char password are required" }, { status: 400 });
    }
    const existing = await findUserByEmail(String(email).toLowerCase());
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }
    const user = await createUser({
      email: String(email).toLowerCase(),
      passwordHash: hashPassword(String(password)),
      displayName: displayName || String(email).split("@")[0],
      role: "user",
    });
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
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
