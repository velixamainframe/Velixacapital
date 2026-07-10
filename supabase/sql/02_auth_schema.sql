-- ============================================================
-- Velixa Capital — AUTH Supabase schema
-- ------------------------------------------------------------
-- Run this ENTIRE script in the SQL Editor of your AUTH Supabase project.
--
-- This project is used EXCLUSIVELY for authentication of internal
-- users (admins, employees, partners). Supabase Auth manages:
--   • password hashing (bcrypt)
--   • session JWTs
--   • email verification
--   • password reset flows
--
-- The `auth.users` table in THIS project is the single source of
-- truth for who can sign in at /auth. After a successful sign-in,
-- the app looks up the matching profile in the CRM project (by email)
-- to read the user's role and permissions.
--
-- You do NOT need to manually create any tables here — Supabase
-- creates auth.users automatically when you create users from the
-- dashboard or via the API. This script only adds:
--   1. A `public.app_roles` table that mirrors the role from the CRM
--      project (kept in sync by the admin when creating employees).
--   2. A helper RPC `is_admin()` / `is_employee()` / `is_partner()`
--      that can be used in RLS policies if you choose to enforce
--      access at the DB level.
--   3. The first-admin bootstrap instructions (see README.md).
-- ============================================================

-- ---------- app_roles: role mirror (optional, for RLS) ----------
-- This is a convenience table. The authoritative role lives in the
-- CRM project's public.users table. We mirror it here so you can
-- write RLS policies on the AUTH project if you ever need to.
create table if not exists public.app_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user',  -- admin | employee | partner | user
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.app_roles enable row level security;

-- Only the user themselves can read their own role.
create policy "app_roles_self_read" on public.app_roles
  for select to authenticated using (auth.uid() = user_id);

-- Auto-create a role row when a new auth user is created.
create or replace function public.handle_new_auth_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.app_roles (user_id, role)
  values (new.id, 'user')
  on conflict (user_id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- ---------- helper RPCs ----------
create or replace function public.is_admin()
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.app_roles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_employee()
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.app_roles
    where user_id = auth.uid() and role in ('employee', 'admin')
  );
$$;

create or replace function public.is_partner()
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.app_roles
    where user_id = auth.uid() and role in ('partner', 'admin')
  );
$$;

-- ---------- updated_at trigger ----------
create or replace function public.bump_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists app_roles_bump_updated_at on public.app_roles;
create trigger app_roles_bump_updated_at
  before update on public.app_roles
  for each row execute function public.bump_updated_at();

-- ============================================================
-- HOW TO CREATE THE FIRST ADMIN
-- ------------------------------------------------------------
-- After running this schema, do the following from your app's
-- bootstrap script (scripts/bootstrap-admin.ts) or manually:
--
-- 1. In the AUTH Supabase dashboard → Authentication → Users →
--    "Add user". Enter the admin's email + a strong password.
--    Tick "Auto Confirm User" so they can sign in immediately.
--
-- 2. In the CRM Supabase project's SQL editor, run:
--
--      insert into public.users (id, email, display_name, role, is_active)
--      values (
--        'admin-001',
--        'you@example.com',     -- MUST match the AUTH project email
--        'Velixa Admin',
--        'admin',
--        true
--      );
--
-- 3. Sign in at /auth with the email + password from step 1.
--    The app will read the role from the CRM project and grant
--    admin access.
--
-- Or just run:  npm run bootstrap-admin
-- (see scripts/bootstrap-admin.ts — it automates all three steps
-- using your service-role keys.)
-- ============================================================
