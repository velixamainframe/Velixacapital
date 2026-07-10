import crypto from "node:crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import type { Role } from "@/lib/data";

/**
 * Cookie-based session auth for the local backend.
 * - Passwords hashed with scrypt (salted).
 * - Session token = base64(userId).base64(ts).base64(hmac) signed with SESSION_SECRET.
 *
 * When Supabase is configured (DATA_BACKEND=supabase), the same AuthContext
 * can instead delegate to Supabase Auth — the cookie here is the local fallback.
 */

const SESSION_COOKIE = "vc_session";
const SECRET = process.env.SESSION_SECRET || process.env.ENCRYPTION_KEY || "velixa-dev-session-secret";

function hmac(data: string): string {
  return crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
}

export function signSession(userId: string): string {
  const ts = Date.now().toString(36);
  const payload = `${userId}.${ts}`;
  const sig = hmac(payload);
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

export function verifySession(token: string | undefined | null): { userId: string; ts: number } | null {
  if (!token) return null;
  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return null;
  try {
    const payload = Buffer.from(payloadB64, "base64url").toString("utf8");
    if (hmac(payload) !== sig) return null;
    const [userId, tsB36] = payload.split(".");
    if (!userId) return null;
    return { userId, ts: parseInt(tsB36 || "0", 36) };
  } catch {
    return null;
  }
}

// ---------- password hashing ----------
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split("$");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  const [, salt, hash] = parts;
  const test = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(test, "hex"));
}

// ---------- session user ----------
export type SessionUser = {
  id: string;
  email: string;
  displayName: string | null;
  role: Role;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  const verified = verifySession(token);
  if (!verified) return null;
  const user = await db.user.findUnique({ where: { id: verified.userId } });
  if (!user || !user.isActive) return null;
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    role: user.role as Role,
  };
}

export async function requireUser(): Promise<SessionUser> {
  const u = await getSessionUser();
  if (!u) throw new Error("UNAUTHORIZED");
  return u;
}

export async function requireRole(...roles: Role[]): Promise<SessionUser> {
  const u = await requireUser();
  if (!roles.includes(u.role)) throw new Error("FORBIDDEN");
  return u;
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
