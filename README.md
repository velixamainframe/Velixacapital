# Velixa Capital

Loans, tax, property & accounting consultancy website with an employee CRM, admin
console, and partner portal. Built on Next.js 16 (App Router), Supabase, and
Tailwind CSS.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Quick start (local, no Supabase)](#quick-start-local-no-supabase)
3. [Architecture — three Supabase projects](#architecture--three-supabase-projects)
4. [Production setup (Supabase + Vercel)](#production-setup-supabase--vercel)
   - [Step 1 — Create the three Supabase projects](#step-1--create-the-three-supabase-projects)
   - [Step 2 — Run the SQL schemas](#step-2--run-the-sql-schemas)
   - [Step 3 — Fill in `.env.local`](#step-3--fill-in-envlocal)
   - [Step 4 — Create the first admin](#step-4--create-the-first-admin)
   - [Step 5 — Deploy to Vercel](#step-5--deploy-to-vercel)
5. [How auth works](#how-auth-works)
6. [CRM features](#crm-features)
7. [Available scripts](#available-scripts)
8. [Folder structure](#folder-structure)
9. [Troubleshooting](#troubleshooting)

---

## Tech stack

| Layer            | Technology                                                          |
| ---------------- | ------------------------------------------------------------------- |
| Framework        | Next.js 16 (App Router, Turbopack for dev, webpack for production)  |
| Language         | TypeScript 5                                                        |
| Styling          | Tailwind CSS 4 + shadcn/ui (New York style)                         |
| Database (prod)  | Supabase (Postgres) — three projects: CRM, AUTH, CHAT               |
| Database (local) | Prisma + SQLite (zero-config fallback)                              |
| Auth             | Supabase Auth (in the dedicated AUTH project)                       |
| AI chatbot       | z-ai-web-dev-sdk (server-side, with canned fallback)                |
| Hosting          | Vercel                                                              |

PII (customer names, mobiles, emails, PANs) is **AES-256-GCM encrypted at the
application layer** before it is written to any database — on both the local and
Supabase backends. The encryption key lives only in server env and never reaches
the browser.

---

## Quick start (local, no Supabase)

You can run the entire site on your machine with zero cloud setup. The app falls
back to a local SQLite database when Supabase is not configured.

```bash
# 1. Install dependencies
npm install

# 2. Create the local database
npm run db:push

# 3. (Optional) Seed sample data — admin, employees, leads, blogs
npm run seed

# 4. Start the dev server
npm run dev
```

Open <http://localhost:3000>.

**Seeded test accounts** (after `npm run seed`):

| Role     | Email                          | Password       |
| -------- | ------------------------------ | -------------- |
| Admin    | admin@velixacapital.com        | Admin@123      |
| Employee | employee@velixacapital.com     | Employee@123   |
| Employee | priya@velixacapital.com        | Employee@123   |
| Partner  | partner@velixacapital.com      | Partner@123    |

Sign in at <http://localhost:3000/auth>.

> These accounts exist only in your local SQLite DB. They are NOT created in
> Supabase. Use the [bootstrap-admin](#step-4--create-the-first-admin) script to
> create your real admin in Supabase.

---

## Architecture — three Supabase projects

The app uses **three separate Supabase projects** for clean isolation:

```
┌─────────────────────────────────────────────────────────────────┐
│                      Velixa Capital app                          │
│                     (Next.js on Vercel)                          │
└───────────────┬──────────────────┬──────────────────┬───────────┘
                │                  │                  │
                ▼                  ▼                  ▼
   ┌────────────────────┐ ┌──────────────────┐ ┌────────────────────┐
   │  1. CRM project    │ │  2. AUTH project │ │  3. CHAT project   │
   │  ────────────────  │ │  ──────────────  │ │  ────────────────  │
   │  users             │ │  auth.users      │ │  chat_messages     │
   │  employees         │ │  (passwords,     │ │  (auto-delete 48h) │
   │  partners          │ │   session JWTs,  │ │                    │
   │  leads             │ │   email verify)  │ │                    │
   │  call_assignments  │ │                  │ │                    │
   │  call_outcomes     │ │  app_roles       │ │                    │
   │  follow_ups        │ │  (role mirror)   │ │                    │
   │  partner_files     │ │                  │ │                    │
   │  blogs             │ │                  │ │                    │
   │  careers           │ │                  │ │                    │
   │  credit_cards      │ │                  │ │                    │
   │  affiliate_links   │ │                  │ │                    │
   │  audit_logs        │ │                  │ │                    │
   │  storage: files    │ │                  │ │                    │
   └────────────────────┘ └──────────────────┘ └────────────────────┘
```

**Why three projects?**

- **CRM** is the main application database. All business data lives here.
- **AUTH** is dedicated to authentication of internal users (admins, employees,
  partners). Supabase Auth handles password hashing, session JWTs, email
  verification and password reset. Keeping it separate means a CRM database
  breach never exposes password hashes.
- **CHAT** stores employee team-chat messages with a 48h auto-purge. Isolating
  it means a chat spike or purge never affects the CRM database, and you can
  scale/pause it independently.

Each project exposes:
- a **browser client** (anon key, RLS-enforced) — safe to ship to the browser
- an **admin client** (service_role key, bypasses RLS) — server only, never in client code

---

## Production setup (Supabase + Vercel)

### Step 1 — Create the three Supabase projects

Go to <https://supabase.com> and create three new projects. Name them clearly:

1. `velixa-crm`      — main application database
2. `velixa-auth`     — internal-user authentication
3. `velixa-chat`     — employee team chat

For each project, set a strong database password and pick the region closest to
your Vercel deployment region.

You don't need to create any tables manually — the SQL in Step 2 does that.

### Step 2 — Run the SQL schemas

For **each** of the three projects, open the Supabase dashboard → **SQL Editor**
→ **New query**, paste the matching SQL file from this repo, and click **RUN**.

| Project           | SQL file to run                       | Where to find it                          |
| ------------------ | ------------------------------------- | ----------------------------------------- |
| `velixa-crm`       | `supabase/sql/01_crm_schema.sql`      | [Link](supabase/sql/01_crm_schema.sql)    |
| `velixa-auth`      | `supabase/sql/02_auth_schema.sql`     | [Link](supabase/sql/02_auth_schema.sql)   |
| `velixa-chat`      | `supabase/sql/03_chat_schema.sql`     | [Link](supabase/sql/03_chat_schema.sql)   |

> **Important:** Run each SQL file in its OWN project only. Do not run all three
> in the same project — that defeats the isolation.

After running, you should see "Success. No rows returned." for each.

### Step 3 — Fill in `.env.local`

Copy `.env.example` to `.env.local` and fill in the values from each Supabase
project's dashboard (**Project Settings → API**):

```bash
cp .env.example .env.local
```

For **each** of the three projects, you need three values:

| Variable suffix        | Where to find it in Supabase dashboard       |
| ---------------------- | --------------------------------------------- |
| `*_SUPABASE_URL`       | Project Settings → API → **Project URL**      |
| `*_SUPABASE_ANON_KEY`  | Project Settings → API → **anon public** key  |
| `*_SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API → **service_role** key |

Map them like this (the prefixes are `CRM_`, `AUTH_`, `CHAT_`):

```env
# 1. CRM project (velixa-crm)
NEXT_PUBLIC_CRM_SUPABASE_URL=https://<your-crm-project>.supabase.co
NEXT_PUBLIC_CRM_SUPABASE_ANON_KEY=<anon key from velixa-crm>
CRM_SUPABASE_SERVICE_ROLE_KEY=<service_role key from velixa-crm>

# 2. AUTH project (velixa-auth)
NEXT_PUBLIC_AUTH_SUPABASE_URL=https://<your-auth-project>.supabase.co
NEXT_PUBLIC_AUTH_SUPABASE_ANON_KEY=<anon key from velixa-auth>
AUTH_SUPABASE_SERVICE_ROLE_KEY=<service_role key from velixa-auth>

# 3. CHAT project (velixa-chat)
NEXT_PUBLIC_CHAT_SUPABASE_URL=https://<your-chat-project>.supabase.co
NEXT_PUBLIC_CHAT_SUPABASE_ANON_KEY=<anon key from velixa-chat>
CHAT_SUPABASE_SERVICE_ROLE_KEY=<service_role key from velixa-chat>
```

Also generate the two app secrets (don't reuse the dev values):

```bash
# Generate a 32-byte hex key for PII encryption
openssl rand -hex 32
# → put the output in ENCRYPTION_KEY

# Generate a secret for session cookies
openssl rand -hex 32
# → put the output in SESSION_SECRET
```

Finally, flip the backend switch:

```env
DATA_BACKEND=supabase
```

### Step 4 — Create the first admin

There are two ways. The automated way is easier:

#### Option A — automated (recommended)

```bash
npm run bootstrap-admin -- --email you@example.com --password "YourStrongPassword123" --name "Your Name"
```

This script:
1. Creates a user in the **AUTH** project (auto-confirmed, so no email verification needed)
2. Inserts a matching `admin` row in the **CRM** project's `public.users` table
3. Prints the sign-in URL

#### Option B — manual

1. **AUTH project dashboard** → Authentication → Users → **Add user**.
   Enter your email + a strong password. Tick **Auto Confirm User**. Click **Create user**.

2. **CRM project SQL Editor** → run:
   ```sql
   insert into public.users (id, email, display_name, role, is_active)
   values ('admin-001', 'you@example.com', 'Your Name', 'admin', true);
   ```
   (replace the email with the one you used in step 1)

3. Sign in at <http://localhost:3000/auth> (or your Vercel URL `/auth`).

After signing in, you'll be redirected to `/admin` where you can:
- **Create employees** (Admin → Employees → "Create employee"). Each employee
  gets an account in the AUTH project + a profile in the CRM project.
- **Create partners** (Admin → Partner Access). Partners get portal access to
  upload customer files.
- **Upload call sheets** (Admin → Call Sheets) that distribute leads to the
  universal pool employees claim from.

### Step 5 — Deploy to Vercel

1. Push your code to GitHub.
2. Go to <https://vercel.com> → **Add New** → **Project** → import your repo.
3. Vercel auto-detects Next.js. **Keep the default Build & Output settings** —
   do NOT enable "standalone" output or override the build command.
4. Under **Environment Variables**, add **every** variable from your `.env.local`
   (the `NEXT_PUBLIC_*` ones plus the service-role ones). Set them for
   Production, Preview, and Development environments.
5. Click **Deploy**.

The first build takes ~3–5 minutes. Vercel will give you a URL like
`https://velixa-capital.vercel.app`.

> **Important:** Update `NEXT_PUBLIC_SITE_URL` in your Vercel env vars to your
> production URL (e.g. `https://velixa-capital.vercel.app`) so canonical URLs
> and OG tags are correct.

---

## How auth works

```
Browser                Next.js (Vercel)              Supabase AUTH        Supabase CRM
  │                        │                            │                    │
  │  POST /api/auth/login  │                            │                    │
  │ ─────────────────────► │                            │                    │
  │                        │  auth.signInWithPassword() │                    │
  │                        │ ─────────────────────────► │                    │
  │                        │  ◄──── access_token ────── │                    │
  │                        │                            │                    │
  │                        │  select role from public.users where email=…   │
  │                        │ ─────────────────────────────────────────────► │
  │                        │  ◄──────── role: 'admin' ───────────────────── │
  │                        │                            │                    │
  │                        │  set signed session cookie │                    │
  │  ◄──── 200 + cookie ── │                            │                    │
```

- The browser never sees the Supabase access token. The server exchanges it for
  a signed session cookie (HMAC-SHA256).
- On every request, the server verifies the cookie and looks up the user's role
  in the CRM project.
- When `DATA_BACKEND=local` (default), the same flow runs against Prisma + SQLite
  — no Supabase needed.

---

## CRM features

The employee CRM lives at `/crm` (sign in at `/auth` first). Features:

- **Pipeline kanban** — drag-and-drop leads across 9 stages (Available →
  In Progress → Callback → Reschedule → Success → Converted → Rejected → Not
  Connected → DND).
- **Lead detail drawer** — click any lead for full profile, lead score, activity
  timeline (every call outcome + follow-up), internal notes, and the
  **transfer-lead** action.
- **Lead transfer** — any employee can hand off a lead to another active
  employee. The recipient inherits the lead, its open follow-ups, and the full
  activity timeline. A transfer note is appended and an audit log entry is
  written.
- **Lead scoring** — every lead gets a 0–100 score (🔥 Hot / ⚡ Warm / ❄️ Cold)
  based on loan amount, recency, priority and engagement.
- **Today's Focus** — smart widget that surfaces hot leads, due callbacks, and
  stale in-progress leads.
- **Advanced search & filters** — by name, city, service, status, priority.
- **Bulk actions** — claim or status-update up to 100 leads at once.
- **Team chat** — 48h auto-deleting channels (lives in the CHAT project).
- **Follow-ups** — scheduled callbacks with "mark done" buttons.
- **Performance analytics** — daily calls, dispositions pie, conversion funnel.

The admin console lives at `/admin` (admin role only). Features:
- Create / manage employees and partners
- Upload call sheets (CSV) that populate the universal lead pool
- Review leads and partner files
- Manage blogs, careers, credit cards, affiliate links

---

## Available scripts

| Script                       | What it does                                                    |
| ---------------------------- | --------------------------------------------------------------- |
| `npm run dev`                | Start the dev server on http://localhost:3000                   |
| `npm run build`              | Production build (outputs to `.next/`)                          |
| `npm run start`              | Start the production server (after `build`)                     |
| `npm run lint`               | Run ESLint                                                      |
| `npm run db:push`            | Create / update the local SQLite schema from Prisma             |
| `npm run db:generate`        | Regenerate the Prisma client                                    |
| `npm run seed`               | Seed sample data into the local DB (admin, employees, leads)    |
| `npm run bootstrap-admin`    | Create the first admin user in Supabase (AUTH + CRM projects)   |

---

## Folder structure

```
velixa-capital/
├── prisma/
│   └── schema.prisma              # Local SQLite schema (mirrors Supabase CRM)
├── public/                        # Static assets (images, favicon, etc.)
├── scripts/
│   ├── seed.ts                    # Sample data for local dev
│   └── bootstrap-admin.ts         # Create first admin in Supabase
├── src/
│   ├── app/
│   │   ├── api/                   # Route handlers (server-side)
│   │   │   ├── auth/              # login, logout, me, signup
│   │   │   ├── crm/               # CRM API (leads, outcomes, chat, etc.)
│   │   │   ├── admin/             # Admin-only API (employees, leads, blogs)
│   │   │   └── leads/             # Public lead form submission
│   │   ├── crm/                   # Employee CRM pages
│   │   ├── admin/                 # Admin console pages
│   │   └── ...                    # Marketing pages (loans, tax, property, etc.)
│   ├── components/
│   │   ├── ui/                    # shadcn/ui primitives
│   │   ├── site/                  # Marketing-site components
│   │   ├── crm/                   # CRM components (kanban, drawer, etc.)
│   │   └── admin/                 # Admin console components
│   └── lib/
│       ├── auth/                  # Session + password hashing
│       ├── supabase/              # Three Supabase client configs
│       │   ├── config.ts          # CRM + AUTH + CHAT client factories
│       │   ├── client.ts          # Browser-side CRM client (anon key)
│       │   └── server.ts          # Server-side CRM client (service role)
│       ├── crypto.ts              # AES-256-GCM PII encryption
│       ├── data.ts                # Data access layer (Prisma or Supabase)
│       └── site-data.ts           # Brand config, loan products, contact info
├── supabase/
│   └── sql/
│       ├── 01_crm_schema.sql      # Run in the CRM project
│       ├── 02_auth_schema.sql     # Run in the AUTH project
│       └── 03_chat_schema.sql     # Run in the CHAT project
├── .env.example                   # Template — copy to .env.local and fill in
├── .env.local                     # Your secrets (gitignored)
├── next.config.ts                 # Next.js config (Vercel-compatible)
├── package.json
└── README.md                      # This file
```

---

## Troubleshooting

### "Turbopack error" / build fails on Vercel

This repo's `next.config.ts` is already configured for Vercel compatibility:
- No `output: "standalone"` (Vercel handles its own output)
- No Turbopack for production builds (Turbopack is dev-only; Vercel uses webpack)
- `typescript.ignoreBuildErrors` is `false` — type errors will fail the build,
  which is what you want in production

If you still see build errors on Vercel:
1. Make sure you're using the default Build Command (`next build`) — don't
   override it in Vercel project settings.
2. Make sure **all** environment variables from `.env.local` are added in
   Vercel (Project Settings → Environment Variables), including the
   non-`NEXT_PUBLIC_` ones.
3. Check the Vercel build logs — the error message will tell you which file
   failed.

### "npm exited" / install fails

Use **npm** (not bun or yarn) for consistency with Vercel:

```bash
rm -rf node_modules package-lock.json
npm install
```

If you see native-module errors (e.g. for `sharp`), make sure you're on Node 18+:

```bash
node --version   # should be 18.x or 20.x
```

### Sign-in works locally but not on Vercel

Check that:
1. `NEXT_PUBLIC_AUTH_SUPABASE_URL` and `NEXT_PUBLIC_AUTH_SUPABASE_ANON_KEY` are
   set in Vercel env vars (for Production, Preview, AND Development).
2. In the AUTH Supabase project → Authentication → URL Configuration, add your
   Vercel URL to **Site URL** and **Redirect URLs**.
3. Cookies need `secure: true` in production, which the app already sets when
   `NODE_ENV === "production"`. Vercel sets this automatically.

### Lead transfer fails with "You can only transfer leads you currently own"

Employees can only transfer leads they currently hold. Admins can transfer any
lead. If you're an admin and still see this, make sure your user's `role` in the
CRM project's `public.users` table is `admin` (not `user`).

### CRM page is empty after deploying to Vercel

The CRM reads from Supabase only when `DATA_BACKEND=supabase`. Check that:
1. `DATA_BACKEND=supabase` is set in Vercel env vars.
2. The CRM SQL schema (`01_crm_schema.sql`) was run in the CRM project.
3. You created at least one lead (either via the public site form, or by
   uploading a call sheet in the admin console).

### How do I reset the local database?

```bash
rm db/custom.db
npm run db:push
npm run seed   # optional
```

### How do I rotate the ENCRYPTION_KEY?

The `ENCRYPTION_KEY` is used to encrypt/decrypt PII. If you rotate it, existing
encrypted data becomes unreadable. To rotate:

1. Write a one-off migration script that reads all encrypted rows with the OLD
   key, decrypts, and re-encrypts with the NEW key.
2. Update `ENCRYPTION_KEY` in `.env.local` (and Vercel env vars).
3. Run the migration script with both keys available.

There's no automatic tool for this — handle it carefully. In practice, rotate
only if you suspect a key compromise.

### Need help?

Open an issue on the GitHub repo with:
- What you expected
- What happened (include the exact error message)
- The relevant env var names (NOT their values — redact secrets)
- Whether it's local dev or on Vercel
