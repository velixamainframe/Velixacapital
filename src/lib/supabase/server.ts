import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client for the CRM project (service role key —
 * bypasses RLS).
 *
 * SECURITY: NEVER import this from a Client Component. Use only inside
 * Route Handlers (app/api/**), Server Actions, Server Components and the
 * data layer. The service role key must never reach the browser.
 *
 * Activated by setting CRM_SUPABASE_SERVICE_ROLE_KEY in your environment
 * (plus NEXT_PUBLIC_CRM_SUPABASE_URL).
 */
let _admin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_CRM_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.CRM_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!_admin) {
    _admin = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _admin;
}

export const supabaseAdmin = getSupabaseAdmin();
