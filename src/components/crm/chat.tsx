"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth/auth-context";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Send,
  Loader2,
  Hash,
  Users,
  Clock,
  ShieldCheck,
} from "lucide-react";

type Channel = "general" | "sales" | "support" | "random";

type ChatMessage = {
  id: string;
  userId: string | null;
  userName: string;
  userRole: string | null;
  channel: string;
  content: string;
  createdAt: string;
};

const CHANNELS: { value: Channel; label: string; hint: string }[] = [
  { value: "general", label: "General", hint: "Company-wide chatter" },
  { value: "sales", label: "Sales", hint: "Wins, losses, pitches" },
  { value: "support", label: "Support", hint: "Customer escalations" },
  { value: "random", label: "Random", hint: "Off-topic" },
];

const POLL_MS = 5000;

export function Chat() {
  const { user } = useAuth();
  const [channel, setChannel] = useState<Channel>("general");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async (ch: Channel, silent = false) => {
    if (!silent) setLoading(true);
    try {
      const r = await fetch(`/api/crm/chat?channel=${encodeURIComponent(ch)}`, {
        cache: "no-store",
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Failed to load chat");
      setMessages(data.messages ?? []);
    } catch {
      if (!silent) toast.error("Failed to load chat");
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  // Initial load on mount + whenever channel changes.
  useEffect(() => {
    load(channel);
  }, [channel, load]);

  // Poll every 5s.
  useEffect(() => {
    const id = setInterval(() => load(channel, true), POLL_MS);
    return () => clearInterval(id);
  }, [channel, load]);

  // Auto-scroll to bottom on new messages.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    const content = draft.trim();
    if (!content || !user) return;
    setSending(true);
    try {
      const r = await fetch("/api/crm/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, content }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Failed to send");
      setDraft("");
      await load(channel, true);
    } catch (e: any) {
      toast.error(e?.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  }

  const myId = user?.id;
  const activeChannel = CHANNELS.find((c) => c.value === channel)!;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Employee CRM
        </p>
        <h1 className="font-display text-2xl text-foreground sm:text-3xl">Team chat</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Coordinate with the team in real time.{" "}
          <span className="inline-flex items-center gap-1 text-amber-700">
            <Clock className="size-3.5" />
            Messages auto-delete after 48h.
          </span>
        </p>
      </div>

      {/* Channel tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scroll-thin">
        <Hash className="size-3.5 shrink-0 text-muted-foreground" />
        {CHANNELS.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => setChannel(c.value)}
            title={c.hint}
            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              channel === c.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            #{c.label}
          </button>
        ))}
      </div>

      <Card className="flex h-[calc(100vh-16rem)] min-h-[24rem] flex-col gap-0 overflow-hidden py-0">
        {/* Channel header */}
        <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/30 px-4 py-2.5">
          <div className="min-w-0">
            <p className="font-display text-sm text-foreground">#{activeChannel.label}</p>
            <p className="text-[11px] text-muted-foreground">{activeChannel.hint}</p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Users className="size-3.5" />
            <span>{messages.length} message{messages.length === 1 ? "" : "s"}</span>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scroll-thin"
        >
          {loading ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              <Loader2 className="mr-2 size-4 animate-spin" />
              Loading messages…
            </div>
          ) : messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-sm text-muted-foreground">
              <div className="mb-2 grid size-12 place-items-center rounded-full bg-muted text-muted-foreground">
                <Hash className="size-6" />
              </div>
              <p className="font-medium text-foreground">No messages yet</p>
              <p>Be the first to post in #{activeChannel.label}.</p>
            </div>
          ) : (
            messages.map((m) => {
              const mine = m.userId && m.userId === myId;
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${mine ? "items-end" : "items-start"}`}
                >
                  <div className={`max-w-[85%] ${mine ? "items-end" : "items-start"} flex flex-col`}>
                    <div
                      className={`mb-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground ${
                        mine ? "flex-row-reverse" : ""
                      }`}
                    >
                      <span className="font-medium text-foreground">{mine ? "You" : m.userName}</span>
                      {m.userRole && (
                        <span className="rounded border border-border bg-card px-1 py-0 text-[9px] uppercase tracking-wide">
                          {m.userRole}
                        </span>
                      )}
                      <span>{relativeTime(m.createdAt)}</span>
                    </div>
                    <div
                      className={`rounded-2xl px-3.5 py-2 text-sm ${
                        mine
                          ? "bg-gradient-gold text-gold-foreground rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={send}
          className="flex items-center gap-2 border-t border-border bg-card px-3 py-2.5"
        >
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`Message #${activeChannel.label}…`}
            disabled={sending}
            maxLength={1000}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <Button type="submit" size="icon" disabled={sending || !draft.trim()} aria-label="Send">
            {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          </Button>
        </form>
      </Card>

      <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
        <ShieldCheck className="size-3.5" />
        Be kind. Don&apos;t share customer PII in chat. Messages auto-delete after 48 hours.
      </p>
    </div>
  );
}

function relativeTime(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}
