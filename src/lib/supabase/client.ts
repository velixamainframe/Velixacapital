import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client for the CRM project (anon key, RLS-enforced).
 *
 * Activated by setting NEXT_PUBLIC_CRM_SUPABASE_URL +
 * NEXT_PUBLIC_CRM_SUPABASE_ANON_KEY in your environment.
 *
 * When Supabase is not configured, callers fall back to the local
 * Prisma + SQLite backend.
 *
 * NOTE: This file is safe to import from Client Components because it
 * only reads NEXT_PUBLIC_* env vars. The service-role key must never
 * appear in client code (see server.ts).
 */
let _client: SupabaseClient | null = null;

export function getSupabaseBrowser(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_CRM_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_CRM_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  if (!_client) {
    _client = createClient(url, anon, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
  }
  return _client;
}

export const supabase = getSupabaseBrowser();
