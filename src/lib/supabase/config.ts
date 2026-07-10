import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* ============================================================
   Velixa Capital — Three Supabase projects
   ------------------------------------------------------------
   The app uses THREE separate Supabase projects for clean
   isolation of concerns and independent scaling:

   1. CRM  (NEXT_PUBLIC_CRM_SUPABASE_URL + keys)
      Stores: users, employees, partners, leads, call assignments,
              call outcomes, follow-ups, partner files, blogs,
              careers, credit cards, affiliate links, audit logs.
      This is the main application database.

   2. AUTH (NEXT_PUBLIC_AUTH_SUPABASE_URL + keys)
      Used exclusively for authentication of internal users
      (admins, employees, partners). Supabase Auth handles
      password hashing, session JWTs, email verification and
      password reset — so you never roll your own password
      storage for internal accounts.
      The `auth.users` table here is the single source of truth
      for who can sign in to /auth. After sign-in, the app looks
      up the matching profile in the CRM project to read roles.

   3. CHAT (NEXT_PUBLIC_CHAT_SUPABASE_URL + keys)
      Stores the employee team-chat messages (auto-deleted after
      48h via pg_cron). Kept in its own project so a chat spike
      or purge never touches the CRM database.

   Each project exposes:
     • a browser client (anon key, RLS-enforced) — safe for the client
     • an admin client  (service_role key, bypasses RLS) — server only

   When any of the three is not configured (URL/key missing), the
   app falls back to the local Prisma + SQLite backend so local
   development works without any Supabase setup.
   ============================================================ */

function makeClient(url: string | undefined, key: string | undefined, persist = false): SupabaseClient | null {
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: {
      persistSession: persist,
      autoRefreshToken: persist,
      detectSessionInUrl: persist,
    },
  });
}

/* ---------- 1. CRM project (main application database) ---------- */
const crmUrl = process.env.NEXT_PUBLIC_CRM_SUPABASE_URL;
const crmAnon = process.env.NEXT_PUBLIC_CRM_SUPABASE_ANON_KEY;
const crmService = process.env.CRM_SUPABASE_SERVICE_ROLE_KEY;

export const supabaseCrmBrowser = makeClient(crmUrl, crmAnon);
export const supabaseCrmAdmin = makeClient(crmUrl, crmService);
export const isCrmConfigured = Boolean(crmUrl && crmAnon);

/* ---------- 2. AUTH project (internal-user authentication) ---------- */
const authUrl = process.env.NEXT_PUBLIC_AUTH_SUPABASE_URL;
const authAnon = process.env.NEXT_PUBLIC_AUTH_SUPABASE_ANON_KEY;
const authService = process.env.AUTH_SUPABASE_SERVICE_ROLE_KEY;

/** Browser client with session persistence — used by AuthContext on the client. */
export const supabaseAuthBrowser = makeClient(authUrl, authAnon, true);
/** Server admin client — used by route handlers to look up users / set passwords. */
export const supabaseAuthAdmin = makeClient(authUrl, authService);
export const isAuthConfigured = Boolean(authUrl && authAnon);

/* ---------- 3. CHAT project (employee team chat) ---------- */
const chatUrl = process.env.NEXT_PUBLIC_CHAT_SUPABASE_URL;
const chatAnon = process.env.NEXT_PUBLIC_CHAT_SUPABASE_ANON_KEY;
const chatService = process.env.CHAT_SUPABASE_SERVICE_ROLE_KEY;

export const supabaseChatBrowser = makeClient(chatUrl, chatAnon);
export const supabaseChatAdmin = makeClient(chatUrl, chatService);
export const isChatConfigured = Boolean(chatUrl && chatAnon);
export const CHAT_TTL_MS = 48 * 60 * 60 * 1000;

/* ---------- Partner file storage bucket (lives in the CRM project) ---------- */
export const FILES_BUCKET = process.env.CRM_SUPABASE_FILES_BUCKET || "partner-files";

/* ---------- Convenience aliases ---------- */
// Backwards-compatible exports for any code that still references the old names.
export const supabase = supabaseCrmBrowser;
export const supabaseAdmin = supabaseCrmAdmin;
export const supabaseMainBrowser = supabaseCrmBrowser;
export const supabaseMainAdmin = supabaseCrmAdmin;
export const isMainConfigured = isCrmConfigured;
