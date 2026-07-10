// Central site configuration — single source of truth for brand/contact/URLs.
// CONTACT and disclaimers live in site-data.ts (re-exported here for convenience).
export { CONTACT, COMPLIANCE_DISCLAIMER, RATES_DISCLAIMER, GOVT_SCHEME_DISCLAIMER } from "./site-data";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.velixacapital.com";

export const BRAND = {
  name: "Velixa Capital",
  tagline: "Trust. Growth. Stability. Prosperity.",
  legalName: "Velixa Capital",
  domain: "velixacapital.com",
} as const;

/* ============================================================
   Backend selection
   ------------------------------------------------------------
   DATA_BACKEND controls which database the data layer talks to.

   • "local"   — Prisma + SQLite (default). Works out of the box
                 for local development — no Supabase setup needed.
                 Data is stored in /db/custom.db (gitignored).

   • "supabase" — Uses the three Supabase projects configured via
                 env vars (CRM, AUTH, CHAT). See README.md for the
                 full setup guide.

   Even when DATA_BACKEND=supabase, the app gracefully degrades:
   if a particular Supabase project's URL/key is missing, that
   subsystem falls back to local Prisma. This lets you go live
   incrementally (e.g. CRM on Supabase, chat still local).
   ============================================================ */
export const DATA_BACKEND: "local" | "supabase" =
  (process.env.DATA_BACKEND as "local" | "supabase") || "local";

// Convenience flags — used by UI components to show config status.
export const IS_CRM_SUPABASE_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_CRM_SUPABASE_URL && process.env.NEXT_PUBLIC_CRM_SUPABASE_ANON_KEY,
);
export const IS_AUTH_SUPABASE_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_AUTH_SUPABASE_URL && process.env.NEXT_PUBLIC_AUTH_SUPABASE_ANON_KEY,
);
export const IS_CHAT_SUPABASE_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_CHAT_SUPABASE_URL && process.env.NEXT_PUBLIC_CHAT_SUPABASE_ANON_KEY,
);

// Backwards-compatible alias.
export const IS_SUPABASE_CONFIGURED = IS_CRM_SUPABASE_CONFIGURED;
