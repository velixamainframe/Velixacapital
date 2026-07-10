"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  PhoneCall,
  FileSpreadsheet,
  Users,
  Handshake,
  KeyRound,
  Newspaper,
  CreditCard,
  Briefcase,
  Link2,
  Layers,
  LogOut,
  ShieldAlert,
  Loader2,
  Menu,
  X,
} from "lucide-react";

export type AdminSection =
  | "dashboard"
  | "leads"
  | "call-sheets"
  | "employees"
  | "partners"
  | "partner-access"
  | "blogs"
  | "cards"
  | "careers"
  | "affiliate"
  | "bulk-affiliate";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  section: AdminSection;
};

export const ADMIN_NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, section: "dashboard" },
  { href: "/admin/leads", label: "Leads & Dialer", icon: PhoneCall, section: "leads" },
  { href: "/admin/call-sheets", label: "Call Sheets", icon: FileSpreadsheet, section: "call-sheets" },
  { href: "/admin/employees", label: "Employees", icon: Users, section: "employees" },
  { href: "/admin/partners", label: "Partners", icon: Handshake, section: "partners" },
  { href: "/admin/partner-access", label: "Partner Access", icon: KeyRound, section: "partner-access" },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper, section: "blogs" },
  { href: "/admin/cards", label: "Cards", icon: CreditCard, section: "cards" },
  { href: "/admin/careers", label: "Careers", icon: Briefcase, section: "careers" },
  { href: "/admin/affiliate", label: "Affiliate", icon: Link2, section: "affiliate" },
  { href: "/admin/bulk-affiliate", label: "Bulk Affiliate", icon: Layers, section: "bulk-affiliate" },
];

export function AdminShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active: AdminSection;
}) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/auth");
  }, [loading, user, router]);

  // Close mobile drawer when a nav link is tapped (avoids setState-in-effect rule).
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-gold" />
          <p className="text-sm text-muted-foreground">Loading admin console…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-gold" />
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-soft">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <ShieldAlert className="size-6" />
          </div>
          <h1 className="font-display text-2xl">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account ({user.email}) doesn&apos;t have admin privileges.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Button asChild><Link href="/auth">Go to sign-in</Link></Button>
            <Button variant="outline" onClick={() => signOut()}>Sign out</Button>
          </div>
        </div>
      </div>
    );
  }

  const displayName = user.displayName || user.email.split("@")[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-primary text-primary-foreground">
        <div className="flex h-14 items-center gap-3 px-4">
          {/* Mobile menu trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10 lg:hidden"
                aria-label="Open navigation"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 border-border bg-card p-0 text-foreground">
              <SheetTitle className="sr-only">Admin navigation</SheetTitle>
              <div className="flex h-14 items-center justify-between border-b border-border px-4">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-md bg-gradient-gold font-display font-bold text-gold-foreground">V</span>
                  <span className="font-display text-sm font-semibold">Velixa Admin</span>
                </div>
                <SheetClose asChild>
                  <Button size="icon" variant="ghost" aria-label="Close"><X className="size-4" /></Button>
                </SheetClose>
              </div>
              <AdminNav active={active} onNavigate={closeMobile} />
            </SheetContent>
          </Sheet>

          <Link href="/admin" className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-md bg-gradient-gold font-display font-bold text-gold-foreground">V</span>
            <div className="hidden leading-tight sm:block">
              <div className="text-sm font-semibold">Velixa Capital</div>
              <div className="text-[10px] uppercase tracking-wider text-primary-foreground/70">Admin Console</div>
            </div>
            <div className="leading-tight sm:hidden">
              <div className="text-sm font-semibold">Admin</div>
            </div>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden text-right leading-tight sm:block">
              <div className="text-sm font-medium text-primary-foreground">{displayName}</div>
              <div className="text-[10px] uppercase tracking-wide text-primary-foreground/60">{user.role}</div>
            </div>
            <div className="grid size-8 place-items-center rounded-full bg-primary-foreground/10 text-xs font-semibold">
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

      <div className="mx-auto flex max-w-7xl">
        {/* Desktop sidebar */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-border bg-card p-3 scroll-thin">
            <AdminNav active={active} />
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          <div className="px-4 py-6 pb-16 md:px-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

function AdminNav({ active, onNavigate }: { active: AdminSection; onNavigate?: () => void }) {
  return (
    <nav className="space-y-0.5 p-2">
      {ADMIN_NAV.map((item) => {
        const Icon = item.icon;
        const isActive = item.section === active;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
      <div className="my-3 border-t border-border" />
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
      >
        <LayoutDashboard className="size-4" />
        View public site
      </Link>
    </nav>
  );
}

function initials(name: string): string {
  return name.split(/\s+/).slice(0, 2).map((s) => s.charAt(0).toUpperCase()).join("");
}

export function AdminPageSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-56" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
      </div>
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}

export function AdminEmptyState({
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
      <h3 className="font-display text-lg">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
