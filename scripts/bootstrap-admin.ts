/**
 * Bootstrap the first admin user.
 *
 * Usage:
 *   npm run bootstrap-admin -- --email you@example.com --password "YourPassword123" --name "Your Name"
 *
 * What it does:
 *   1. Creates a user in the AUTH Supabase project (auth.users) with the
 *      given email + password, auto-confirmed so they can sign in immediately.
 *   2. Inserts a matching profile row in the CRM Supabase project
 *      (public.users) with role = 'admin'.
 *   3. Prints the sign-in URL.
 *
 * Prerequisites:
 *   - .env.local must have the AUTH + CRM Supabase URL + service-role keys filled in.
 *   - The SQL schemas (02_auth_schema.sql + 01_crm_schema.sql) must already be run
 *     in their respective projects.
 *
 * Run it with:  npm run bootstrap-admin -- --email ... --password ... --name ...
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { db } from "../src/lib/db";
import { hashPassword } from "../src/lib/auth/session";

// ---------- parse args ----------
function parseArgs(): { email: string; password: string; name: string } {
  const args = process.argv.slice(2);
  const get = (key: string): string | undefined => {
    const i = args.indexOf(`--${key}`);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const email = get("email");
  const password = get("password");
  const name = get("name") || "Velixa Admin";
  if (!email || !password) {
    console.error("Usage: npm run bootstrap-admin -- --email you@example.com --password YourPassword123 [--name \"Your Name\"]");
    console.error("");
    console.error("Both --email and --password are required. Password must be 8+ chars.");
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }
  return { email: email.toLowerCase(), password, name };
}

// ---------- load env ----------
function loadEnvFile(path: string) {
  if (!existsSync(path)) return;
  const content = readFileSync(path, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

async function main() {
  const { email, password, name } = parseArgs();

  const authUrl = process.env.NEXT_PUBLIC_AUTH_SUPABASE_URL || "";
  const authKey = process.env.AUTH_SUPABASE_SERVICE_ROLE_KEY || "";
  const crmUrl = process.env.NEXT_PUBLIC_CRM_SUPABASE_URL || "";
  const crmKey = process.env.CRM_SUPABASE_SERVICE_ROLE_KEY || "";
  const useSupabase = process.env.DATA_BACKEND === "supabase" && Boolean(authUrl && authKey && crmUrl && crmKey);

  if (!useSupabase) {
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      await db.user.update({
        where: { id: existing.id },
        data: {
          passwordHash: hashPassword(password),
          displayName: name,
          role: "admin",
          isActive: true,
        },
      });
    } else {
      await db.user.create({
        data: {
          email,
          passwordHash: hashPassword(password),
          displayName: name,
          role: "admin",
          isActive: true,
        },
      });
    }
    console.log(`\n✅ Local admin ready.`);
    console.log(`   Email:    ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Sign in at: ${process.env.NEXT_PUBLIC_SITE_URL || "https://velixacapital.in"}/auth`);
    return;
  }

  const authAdmin = createClient(authUrl, authKey, { auth: { persistSession: false } });
  const crmAdmin = createClient(crmUrl, crmKey, { auth: { persistSession: false } });

  // ---------- Step 1: create the auth user ----------
  console.log(`\n1/3  Creating auth user ${email}…`);
  let authUser: { id: string } | null = null;
  try {
    const { data, error } = await authAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // auto-confirm so they can sign in immediately
      user_metadata: { display_name: name },
    });
    if (error) throw error;
    authUser = data.user as { id: string } | null;
    console.log(`     ✓ Auth user created (id: ${authUser?.id})`);
  } catch (e: any) {
    if (String(e?.message || "").includes("already been registered")) {
      console.log("     ℹ  User already exists in AUTH project — looking up id…");
      const { data, error } = await authAdmin.auth.admin.listUsers();
      if (error) throw error;
      const existing = data.users.find((u: any) => u.email?.toLowerCase() === email);
      if (!existing) throw new Error("User exists but could not be found.");
      authUser = { id: existing.id };
      console.log(`     ✓ Found existing auth user (id: ${authUser.id})`);
    } else {
      throw e;
    }
  }

  // ---------- Step 2: create the CRM profile row ----------
  console.log(`\n2/3  Creating admin profile in CRM project…`);
  const adminId = `admin-${Date.now().toString(36)}`;
  const { error: profileErr } = await crmAdmin.from("users").upsert({
    id: adminId,
    email,
    display_name: name,
    role: "admin",
    is_active: true,
  }, { onConflict: "email" });

  if (profileErr) {
    console.error("     ❌ Failed to create CRM profile:", profileErr.message);
    console.error("        You can do it manually in the CRM SQL editor:");
    console.error(`        insert into public.users (id, email, display_name, role, is_active)`);
    console.error(`        values ('${adminId}', '${email}', '${name}', 'admin', true);`);
    process.exit(1);
  }
  console.log(`     ✓ CRM profile created (id: ${adminId}, role: admin)`);

  // ---------- Step 3: done ----------
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
  console.log(`\n3/3  ✅ Admin bootstrap complete.`);
  console.log(`\n     Sign in at:  ${siteUrl}/auth`);
  console.log(`     Email:       ${email}`);
  console.log(`     Password:    ${"*".repeat(password.length)} (${password.length} chars)`);
  console.log(`\n     After signing in you'll be redirected to /admin where you can`);
  console.log(`     create employees and partners.\n`);
}

main().catch((e) => {
  console.error("\n❌ Bootstrap failed:", e?.message || e);
  process.exit(1);
});
