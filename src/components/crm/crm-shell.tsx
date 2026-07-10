"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LayoutDashboard,
  PhoneCall,
  CalendarClock,
  BarChart3,
  MessageSquare,
  LogOut,
  ShieldAlert,
  Loader2,
  Home,
  ExternalLink,
} from "lucide-react";
import { DISCORD_INVITE_URL, SHOW_DISCORD_LINK } from "@/lib/integrations";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV: NavItem[] = [
  { href: "/crm", label: "Dashboard", icon: LayoutDashboard },
  { href: "/crm/calls", label: "Leads", icon: PhoneCall },
  { href: "/crm/chat", label: "Chat", icon: MessageSquare },
  { href: "/crm/follow-ups", label: "Follow-ups", icon: CalendarClock },
  { href: "/crm/stats", label: "Stats", icon: BarChart3 },
];

type CrmShellProps = {
  children: React.ReactNode;
  active: "dashboard" | "calls" | "chat" | "follow-ups" | "stats";
};

export function CrmShell({ children, active }: CrmShellProps) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // Auth gate: redirect to /auth when no session (after loading completes).
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-gold" />
          <p className="text-sm text-muted-foreground">Loading employee CRM…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Brief state before redirect fires.
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-gold" />
          <p className="text-sm text-muted-foreground">Redirecting to sign-in…</p>
        </div>
      </div>
    );
  }

  // Wrong role.
  if (user.role !== "employee" && user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-soft">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <ShieldAlert className="size-6" />
          </div>
          <h1 className="font-display text-2xl text-foreground">Employee access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account ({user.email}) doesn&apos;t have employee privileges.
            Please sign in with an employee account.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Button asChild>
              <Link href="/auth">Go to sign-in</Link>
            </Button>
            <Button variant="outline" onClick={() => signOut()}>
              Sign out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isAdminPreview = user.role === "admin";
  const displayName = user.displayName || user.email.split("@")[0];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
          <Link href="/crm" className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-md bg-gradient-gold text-gold-foreground font-display font-bold">
              V
            </span>
            <div className="hidden leading-tight sm:block">
              <div className="text-sm font-semibold">Velixa Capital</div>
              <div className="text-[10px] uppercase tracking-wider text-primary-foreground/70">
                Employee CRM
              </div>
            </div>
            <div className="leading-tight sm:hidden">
              <div className="text-sm font-semibold">CRM</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-6 hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const Icon = item.icon;
              const isActive = activeKey(item.href) === active;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-foreground/10 text-primary-foreground"
                      : "text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Link href="/" title="Back to home" className="inline-flex items-center gap-1.5 rounded-md border border-primary-foreground/20 px-2.5 py-1.5 text-xs font-medium text-primary-foreground/90 transition hover:bg-primary-foreground/10">
              <Home className="size-3.5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            {SHOW_DISCORD_LINK && (
              <a href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer" title="Join the company Discord" className="inline-flex items-center gap-1.5 rounded-md border border-primary-foreground/20 px-2.5 py-1.5 text-xs font-medium text-primary-foreground/90 transition hover:bg-primary-foreground/10">
                <ExternalLink className="size-3.5" />
                <span className="hidden sm:inline">Discord</span>
              </a>
            )}
            {isAdminPreview && (
              <span className="hidden rounded-full border border-gold/40 bg-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold sm:inline">
                Admin preview
              </span>
            )}
            <div className="hidden text-right leading-tight sm:block">
              <div className="text-sm font-medium text-primary-foreground">{displayName}</div>
              <div className="text-[10px] uppercase tracking-wide text-primary-foreground/60">
                {user.role}
              </div>
            </div>
            <div className="grid size-8 place-items-center rounded-full bg-primary-foreground/10 text-xs font-semibold text-primary-foreground">
              {initials(displayName)}
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={async () => {
                await signOut();
                router.replace("/auth");
              }}
              className="text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              aria-label="Sign out"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6 pb-24 md:pb-8">{children}</div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card md:hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-6">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = activeKey(item.href) === active;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors ${
                  isActive
                    ? "text-gold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`size-5 ${isActive ? "text-gold" : ""}`} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function activeKey(href: string): CrmShellProps["active"] {
  if (href === "/crm") return "dashboard";
  if (href === "/crm/calls") return "calls";
  if (href === "/crm/chat") return "chat";
  if (href === "/crm/follow-ups") return "follow-ups";
  if (href === "/crm/stats") return "stats";
  return "dashboard";
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s.charAt(0).toUpperCase())
    .join("");
}

export function CrmPageSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-10 text-center">
      <div className="mb-3 grid size-12 place-items-center rounded-full bg-muted text-muted-foreground">
        <Icon className="size-6" />
      </div>
      <h3 className="font-display text-lg text-foreground">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
