import { NextResponse } from "next/server";
import { findUserByEmail, createUser } from "@/lib/data";
import { hashPassword, signSession, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/auth/session";
import { supabaseAuthAdmin } from "@/lib/supabase/config";

export const runtime = "nodejs";

async function createSupabaseAuthAccount(email: string, password: string, displayName: string) {
  if (!supabaseAuthAdmin) return null;

  const { data, error } = await supabaseAuthAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { displayName },
  });

  if (error) throw error;
  return data.user;
}

export async function POST(req: Request) {
  try {
    const { email, password, displayName } = await req.json();
    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: "Email and a 6+ char password are required" }, { status: 400 });
    }

    const normalizedEmail = String(email).toLowerCase();
    const normalizedDisplayName = displayName || normalizedEmail.split("@")[0];
    const passwordValue = String(password);

    const existing = await findUserByEmail(normalizedEmail);
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    let authUserId: string | undefined;
    try {
      const authUser = await createSupabaseAuthAccount(normalizedEmail, passwordValue, normalizedDisplayName);
      authUserId = authUser?.id;
    } catch (error) {
      console.warn("Supabase auth user creation failed; falling back to local user creation", error);
    }

    const user = await createUser({
      email: normalizedEmail,
      passwordHash: hashPassword(passwordValue),
      displayName: normalizedDisplayName,
      role: "user",
      id: authUserId,
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
