"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Newspaper, Plus, Loader2, RefreshCw, Sprout, Edit, X } from "lucide-react";
import { slugify as toSlug } from "@/lib/data";

type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  published: boolean;
  publishedAt?: string | null;
  createdAt: string;
};

export function BlogsAdminClient() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [showForm, setShowForm] = useState(false);

  // form state
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(true);
  const [busy, setBusy] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs", { cache: "no-store" });
      const j = await res.json();
      setBlogs(j.blogs || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function resetForm() {
    setId(null); setTitle(""); setSlug(""); setExcerpt(""); setContent(""); setCoverImage(""); setPublished(true);
  }

  function openNew() {
    resetForm();
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(b: Blog) {
    setId(b.id); setTitle(b.title); setSlug(b.slug); setExcerpt(b.excerpt); setContent(b.content);
    setCoverImage(b.coverImage || ""); setPublished(b.published);
    setEditing(b);
    setShowForm(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) return toast.error("Title and slug required");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id ?? undefined, title: title.trim(), slug: slug.trim(), excerpt, content, coverImage: coverImage || undefined, published }),
      });
      const j = await res.json();
      if (!res.ok) return toast.error(j?.error || "Failed");
      toast.success(id ? "Blog updated" : "Blog created");
      resetForm(); setShowForm(false); setEditing(null);
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function seed() {
    setSeeding(true);
    try {
      const res = await fetch("/api/admin/blogs/seed", { method: "POST" });
      const j = await res.json();
      if (res.ok) toast.success(`Seeded ${j.inserted} posts (skipped ${j.skipped} existing).`);
      else toast.error(j?.error || "Seed failed");
      await load();
    } finally {
      setSeeding(false);
    }
  }

  return (
    <AdminShell active="blogs">
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl">Blogs</h1>
            <p className="text-sm text-muted-foreground">{blogs.length} posts · {blogs.filter((b) => b.published).length} published.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={load}><RefreshCw className="size-4" /> Refresh</Button>
            <Button variant="outline" size="sm" onClick={seed} disabled={seeding}>
              {seeding ? <Loader2 className="size-4 animate-spin" /> : <Sprout className="size-4" />} Seed starter posts
            </Button>
            <Button size="sm" onClick={openNew}><Plus className="size-4" /> New post</Button>
          </div>
        </div>

        {showForm && (
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">{id ? "Edit post" : "New post"}</CardTitle>
                <CardDescription>Slug auto-generates from title — override if needed.</CardDescription>
              </div>
              <Button size="icon" variant="ghost" onClick={() => { setShowForm(false); resetForm(); setEditing(null); }}><X className="size-4" /></Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={save} className="space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" value={title} onChange={(e) => { setTitle(e.target.value); if (!id) setSlug(toSlug(e.target.value)); }} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cover">Cover image URL (optional)</Label>
                  <Input id="cover" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="/blog/cover.jpg or https://…" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="content">Content (Markdown)</Label>
                  <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="font-mono text-xs" />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="published" checked={published} onCheckedChange={(v) => setPublished(!!v)} />
                  <Label htmlFor="published" className="cursor-pointer text-sm">Published (visible on /blog)</Label>
                </div>
                <Button type="submit" disabled={busy}>
                  {busy ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                  {id ? "Save changes" : "Create post"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="space-y-2 p-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
            ) : blogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <Newspaper className="mb-2 size-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No blog posts yet. Use "Seed starter posts" or create a new one.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {blogs.map((b) => (
                  <div key={b.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{b.title}</span>
                        <Badge variant="outline" className={b.published ? "bg-emerald-50 text-emerald-800" : "bg-muted text-muted-foreground"}>
                          {b.published ? "published" : "draft"}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">/blog/{b.slug} · {new Date(b.createdAt).toLocaleDateString("en-IN")}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(b)}><Edit className="size-4" /> Edit</Button>
                      <Button size="sm" variant="ghost" asChild>
                        <a href={`/blog/${b.slug}`} target="_blank" rel="noopener noreferrer">View</a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
