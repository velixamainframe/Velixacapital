-- ============================================================
-- Velixa Capital — CHAT Supabase schema
-- ------------------------------------------------------------
-- Run this ENTIRE script in the SQL Editor of your CHAT Supabase project.
--
-- This project is a fully isolated database for employee team chat.
-- Messages auto-delete after 48 hours via pg_cron. Keeping chat in
-- its own project means a chat spike or purge never touches the CRM
-- database, and you can scale/pause it independently.
--
-- The app's employee CRM (/crm/chat) reads/writes here using the
-- service-role key from server-side route handlers.
-- ============================================================

-- ---------- pg_cron: required for the 48h auto-purge ----------
-- pg_cron is enabled by default on Supabase. If it isn't, run:
--   create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_cron;

-- ---------- chat_messages ----------
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,                       -- references auth.users in the AUTH project (loose — no FK)
  user_name text not null,
  user_role text,                     -- admin | employee
  channel text not null default 'general',
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_channel_idx on public.chat_messages (channel);
create index if not exists chat_messages_created_at_idx on public.chat_messages (created_at desc);

-- ---------- 48-hour auto-purge ----------
-- Runs every hour, deletes any message older than 48 hours.
select cron.schedule(
  'velixa-chat-purge-48h',
  '0 * * * *',
  $$ delete from public.chat_messages where created_at < now() - interval '48 hours'; $$
);

-- ---------- Row Level Security ----------
-- Only authenticated users can read/write. The server uses the
-- service-role key (which bypasses RLS) so these policies are a
-- safety net for any direct client access.
alter table public.chat_messages enable row level security;

create policy "chat_read_authenticated" on public.chat_messages
  for select to authenticated using (true);

create policy "chat_insert_authenticated" on public.chat_messages
  for insert to authenticated with check (true);

create policy "chat_delete_own" on public.chat_messages
  for delete to authenticated using (auth.uid() = user_id);

-- Realtime: enable live updates for the chat UI.
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    alter publication supabase_realtime add table public.chat_messages;
  end if;
exception when duplicate_object then null;
end $$;

-- ============================================================
-- DONE — CHAT schema is ready.
-- Copy this project's URL + anon key + service role key into
-- .env.local under the CHAT_* variables.
-- ============================================================
