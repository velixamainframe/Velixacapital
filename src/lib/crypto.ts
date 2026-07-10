import crypto from "node:crypto";

/**
 * Velixa Capital — Application-layer encryption (AES-256-GCM).
 *
 * Sensitive PII (customer phone, name, PAN; partner credentials) is encrypted
 * BEFORE it is written to the database (Supabase or local SQLite). This means
 * that even in the event of a database breach, the protected fields remain
 * unreadable without the encryption key (which lives only in server env).
 *
 * The key is derived from ENCRYPTION_KEY (server-only env var). For local dev a
 * fixed dev key is used so the preview works without configuration — override
 * ENCRYPTION_KEY in production with a 64-char hex string (32 bytes).
 *
 * Format:  base64(iv) : base64(ciphertext) : base64(authTag)
 */

const DEV_KEY = "0".repeat(64); // 32 bytes — dev/preview only. NEVER use in prod.

function getKey(): Buffer {
  const raw = process.env.ENCRYPTION_KEY || DEV_KEY;
  let buf: Buffer;
  if (/^[0-9a-fA-F]{64}$/.test(raw)) {
    buf = Buffer.from(raw, "hex");
  } else {
    // Non-hex string: hash to derive a 32-byte key (stable per value).
    buf = crypto.createHash("sha256").update(raw).digest();
  }
  if (buf.length !== 32) buf = crypto.createHash("sha256").update(buf).digest();
  return buf;
}

const ALGO = "aes-256-gcm";

/**
 * Encrypt a plaintext string. Returns the colon-delimited token.
 * Overloads: when the input is a non-empty string, the return type is `string`
 * (never null). When the input is null/undefined/empty, returns null.
 */
export function encrypt(plaintext: string): string;
export function encrypt(plaintext: string | null | undefined): string | null;
export function encrypt(plaintext: string | null | undefined): string | null {
  if (plaintext == null || plaintext === "") return null;
  const key = getKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const enc = Buffer.concat([cipher.update(String(plaintext), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv.toString("base64"), enc.toString("base64"), tag.toString("base64")].join(":");
}

/** Decrypt a token produced by `encrypt`. Returns the plaintext, or null if invalid/empty. */
export function decrypt(token: string | null | undefined): string | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(":");
  if (parts.length !== 3) return null;
  try {
    const [ivB, encB, tagB] = parts;
    const key = getKey();
    const decipher = crypto.createDecipheriv(ALGO, key, Buffer.from(ivB, "base64"));
    decipher.setAuthTag(Buffer.from(tagB, "base64"));
    const dec = Buffer.concat([decipher.update(Buffer.from(encB, "base64")), decipher.final()]);
    return dec.toString("utf8");
  } catch {
    return null;
  }
}

/** Mask a phone/mobile for display in lists: 9876543210 -> 98765 43210 (last 5 visible). */
export function maskPhone(phone: string | null | undefined): string {
  const p = decrypt(phone) ?? phone ?? "";
  const digits = String(p).replace(/\D/g, "");
  if (digits.length < 4) return "••••";
  return "••••• " + digits.slice(-5);
}

/** Mask an email for display: rohan@gmail.com -> r••••@gmail.com */
export function maskEmail(email: string | null | undefined): string {
  const e = decrypt(email) ?? email ?? "";
  if (!e || !e.includes("@")) return "••••";
  const [name, domain] = e.split("@");
  if (!name) return "••••@" + domain;
  const visible = name.slice(0, 1);
  return `${visible}${"•".repeat(Math.min(name.length, 4))}@${domain}`;
}

/** Mask a PAN: ABCDE1234F -> ABC••••••F */
export function maskPan(pan: string | null | undefined): string {
  const p = decrypt(pan) ?? pan ?? "";
  if (!p || p.length < 6) return "••••••";
  return p.slice(0, 3) + "•".repeat(p.length - 4) + p.slice(-1);
}

/** One-way hash (SHA-256) for tokens like affiliate slugs lookups / dedupe. Not reversible. */
export function hashToken(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}
