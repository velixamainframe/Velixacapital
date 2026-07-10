// Captures ?ref=SLUG from any URL and persists for 30 days so lead form
// submissions get attributed to the originating affiliate.
const KEY = "vcs_ref";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

type Stored = { slug: string; ts: number };

export function captureRefFromUrl() {
  if (typeof window === "undefined") return;
  const sp = new URLSearchParams(window.location.search);
  const slug = sp.get("ref");
  if (!slug) return;
  const clean = slug.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 64);
  if (!clean) return;
  try {
    localStorage.setItem(KEY, JSON.stringify({ slug: clean, ts: Date.now() } satisfies Stored));
  } catch { /* ignore */ }
}

export function getStoredRef(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (!parsed?.slug) return null;
    if (Date.now() - parsed.ts > TTL_MS) { localStorage.removeItem(KEY); return null; }
    return parsed.slug;
  } catch { return null; }
}
