"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const KEY = "vc-cookie-consent-v1";

type Prefs = { essential: boolean; analytics: boolean; functional: boolean; marketing: boolean };

const DEFAULT_PREFS: Prefs = { essential: true, analytics: true, functional: true, marketing: true };

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [manage, setManage] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);

  useEffect(() => {
    // One-time mount check: show the banner only if no consent is stored yet.
    let shouldShow = true;
    try {
      if (localStorage.getItem(KEY)) shouldShow = false;
    } catch {
      shouldShow = true;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (shouldShow) setVisible(true);
  }, []);

  function save(p: Prefs) {
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] border-t border-border bg-background/95 p-4 shadow-lg backdrop-blur-md">
      <div className="container-edge flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <p className="text-xs text-muted-foreground md:max-w-2xl">
            We use cookies to keep the site working and to understand how you use it. You can manage your preferences any time. See our{" "}
            <Link href="/cookie-policy" className="underline hover:text-foreground">Cookie Policy</Link>.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {manage && (
            <div className="flex flex-wrap items-center gap-3">
              {(["essential", "analytics", "functional", "marketing"] as const).map((k) => (
                <label key={k} className="flex items-center gap-1.5 text-xs capitalize">
                  <input
                    type="checkbox"
                    checked={prefs[k]}
                    disabled={k === "essential"}
                    onChange={(e) => setPrefs({ ...prefs, [k]: e.target.checked })}
                    className="h-3.5 w-3.5"
                  />
                  {k}
                </label>
              ))}
            </div>
          )}
          <button onClick={() => setManage((v) => !v)} className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted">
            {manage ? "Hide" : "Manage Preferences"}
          </button>
          <button onClick={() => save({ ...DEFAULT_PREFS, analytics: false, marketing: false })} className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted">
            Reject
          </button>
          <button onClick={() => save(prefs)} className="btn-gold text-xs">Accept</button>
          <button onClick={() => setVisible(false)} aria-label="Dismiss" className="rounded-md p-1.5 hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
