"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  DndContext, DragOverlay, PointerSensor, useSensor, useSensors,
  type DragStartEvent, type DragEndEvent, useDroppable, useDraggable,
} from "@dnd-kit/core";
import { Loader2, Flame, Search, X, ChevronDown, Filter } from "lucide-react";
import {
  KANBAN_COLUMNS, leadScore, tierTone, formatINR, relativeTime,
  type AssignmentStatus,
} from "./crm-shared";
import { LeadDetailDrawer } from "./lead-detail-drawer";

type Lead = {
  id: string;
  customerName: string;
  customerMobileMasked: string;
  city: string | null;
  service: string | null;
  loanAmount: number | null;
  priority: number;
  status: string;
  assignedAt: string;
  claimedAt: string | null;
  latestOutcome?: { disposition: string; createdAt: string; callbackAt: string | null } | null;
};

type FilterOpts = { services: string[]; cities: string[] };

const COLUMN_LIMITS: Record<AssignmentStatus, number> = {
  available: 30, in_progress: 30, callback: 30, reschedule: 30,
  success: 30, converted: 30, rejected: 30, not_connected: 30, dnd: 30,
};

export function PipelineKanban({ onUpdated }: { onUpdated?: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [filterOpts, setFilterOpts] = useState<FilterOpts>({ services: [], cities: [] });
  const [filters, setFilters] = useState<{ q: string; service: string; city: string }>({ q: "", service: "all", city: "all" });
  const [showFilters, setShowFilters] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.q) params.set("q", filters.q);
      if (filters.service !== "all") params.set("service", filters.service);
      if (filters.city !== "all") params.set("city", filters.city);
      params.set("scope", "all");
      const r = await fetch(`/api/crm/leads/search?${params.toString()}`, { cache: "no-store" });
      const d = await r.json();
      setLeads(d.leads ?? []);
    } catch {
      toast.error("Failed to load pipeline");
    } finally {
      setLoading(false);
    }
  }, [filters.q, filters.service, filters.city]);

  const loadFilterOpts = useCallback(async () => {
    try {
      const r = await fetch("/api/crm/leads/filter-options", { cache: "no-store" });
      const d = await r.json();
      setFilterOpts({ services: d.services ?? [], cities: d.cities ?? [] });
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { loadFilterOpts(); }, [loadFilterOpts]);
  useEffect(() => { load(); }, [load]);

  // Debounce text search
  useEffect(() => {
    const id = setTimeout(() => load(), 250);
    return () => clearTimeout(id);
  }, [filters.q, load]);

  const grouped = useMemo(() => {
    const map = new Map<AssignmentStatus, Lead[]>();
    for (const col of KANBAN_COLUMNS) map.set(col.id, []);
    for (const l of leads) {
      const col = map.get(l.status as AssignmentStatus);
      if (col) col.push(l);
    }
    return map;
  }, [leads]);

  const activeLead = leads.find((l) => l.id === activeId) ?? null;

  function handleDragStart(e: DragStartEvent) {
    setActiveId(String(e.active.id));
  }

  async function handleDragEnd(e: DragEndEvent) {
    setActiveId(null);
    const { active, over } = e;
    if (!over) return;
    const leadId = String(active.id);
    const newStatus = String(over.id) as AssignmentStatus;
    const lead = leads.find((l) => l.id === leadId);
    if (!lead || lead.status === newStatus) return;

    // Optimistic update
    setLeads((prev) => prev.map((l) => l.id === leadId ? { ...l, status: newStatus } : l));

    try {
      const r = await fetch(`/api/crm/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!r.ok) {
        const d = await r.json();
        throw new Error(d.error || "Move failed");
      }
      toast.success(`Moved to ${KANBAN_COLUMNS.find((c) => c.id === newStatus)?.label}`);
      onUpdated?.();
    } catch (err: any) {
      toast.error(err?.message || "Could not move lead");
      // Revert
      setLeads((prev) => prev.map((l) => l.id === leadId ? { ...l, status: lead.status } : l));
    }
  }

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[180px] flex-1">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
            placeholder="Search name, city, service…"
            className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-3 text-sm outline-none focus:border-primary"
          />
          {filters.q && (
            <button onClick={() => setFilters((f) => ({ ...f, q: "" }))} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium ${showFilters ? "border-primary bg-primary/5 text-primary" : "border-border bg-background text-foreground/80"}`}
        >
          <Filter className="h-3.5 w-3.5" /> Filters
          <ChevronDown className={`h-3 w-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </button>
        {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
      </div>

      {/* Filter row */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-muted/30 p-3">
          <select
            value={filters.service}
            onChange={(e) => setFilters((f) => ({ ...f, service: e.target.value }))}
            className="rounded-md border border-input bg-background px-2.5 py-1.5 text-xs"
          >
            <option value="all">All services</option>
            {filterOpts.services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={filters.city}
            onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
            className="rounded-md border border-input bg-background px-2.5 py-1.5 text-xs"
          >
            <option value="all">All cities</option>
            {filterOpts.cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {(filters.service !== "all" || filters.city !== "all") && (
            <button
              onClick={() => setFilters({ q: filters.q, service: "all", city: "all" })}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Kanban board */}
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-3 overflow-x-auto pb-4">
          {KANBAN_COLUMNS.map((col) => {
            const items = grouped.get(col.id) ?? [];
            return (
              <KanbanColumn key={col.id} col={col} items={items.slice(0, COLUMN_LIMITS[col.id])} totalCount={items.length} onLeadClick={setSelectedLead} />
            );
          })}
        </div>
        <DragOverlay>
          {activeLead ? <KanbanCard lead={activeLead} dragging /> : null}
        </DragOverlay>
      </DndContext>

      <LeadDetailDrawer leadId={selectedLead} onClose={() => setSelectedLead(null)} onUpdated={load} />
    </div>
  );
}

function KanbanColumn({ col, items, totalCount, onLeadClick }: {
  col: typeof KANBAN_COLUMNS[number];
  items: Lead[];
  totalCount: number;
  onLeadClick: (id: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: col.id });
  return (
    <div
      ref={setNodeRef}
      className={`flex w-72 shrink-0 flex-col rounded-xl border ${col.tone} ${isOver ? "ring-2 ring-primary/40" : ""} transition`}
    >
      <div className="flex items-center justify-between border-b border-border/60 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${col.dot}`} />
          <span className="text-xs font-semibold text-foreground">{col.label}</span>
        </div>
        <span className="rounded-full bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {items.length}{totalCount > items.length ? `/${totalCount}` : ""}
        </span>
      </div>
      <div className="scroll-thin flex-1 space-y-2 overflow-y-auto p-2" style={{ maxHeight: "calc(100vh - 280px)" }}>
        {items.length === 0 ? (
          <div className="rounded-md border border-dashed border-border/60 px-3 py-6 text-center text-[10px] text-muted-foreground">
            Drop leads here
          </div>
        ) : (
          items.map((l) => <DraggableCard key={l.id} lead={l} onClick={() => onLeadClick(l.id)} />)
        )}
      </div>
    </div>
  );
}

function DraggableCard({ lead, onClick }: { lead: Lead; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: lead.id });
  return (
    <div ref={setNodeRef} {...attributes} className={isDragging ? "opacity-60" : ""}>
      <KanbanCard lead={lead} dragging={isDragging} onClick={onClick} dragListeners={listeners} />
    </div>
  );
}

function KanbanCard({ lead, dragging, onClick, dragListeners }: {
  lead: Lead;
  dragging?: boolean;
  onClick?: () => void;
  dragListeners?: Record<string, any>;
}) {
  const score = leadScore({
    loanAmount: lead.loanAmount,
    assignedAt: lead.assignedAt,
    claimedAt: lead.claimedAt,
    priority: lead.priority,
    outcomesCount: lead.latestOutcome ? 1 : 0,
    latestDisposition: lead.latestOutcome?.disposition ?? null,
  });
  const tier = tierTone(score.tier);
  return (
    <div
      className={`group relative rounded-lg border border-border bg-card p-2.5 text-xs shadow-sm transition ${dragging ? "rotate-2 opacity-80 shadow-lg ring-2 ring-primary" : "hover:border-primary/40 hover:shadow-md"}`}
    >
      {/* Clickable content area — opens the detail drawer */}
      <button onClick={onClick} className="block w-full text-left" aria-label={`Open ${lead.customerName} detail`}>
        <div className="flex items-start justify-between gap-1.5">
          <p className="font-medium text-foreground line-clamp-1">{lead.customerName}</p>
          <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold ${tier.bg} ${tier.text}`}>
            {tier.emoji} {score.score}
          </span>
        </div>
        <p className="mt-0.5 text-[10px] text-muted-foreground line-clamp-1">
          {[lead.city, lead.service].filter(Boolean).join(" · ") || "—"}
        </p>
        <div className="mt-1.5 flex items-center justify-between text-[10px]">
          <span className="font-medium text-gold">{formatINR(lead.loanAmount)}</span>
          <span className="text-muted-foreground">{relativeTime(lead.claimedAt || lead.assignedAt)}</span>
        </div>
        {lead.priority >= 2 && (
          <div className="mt-1.5 inline-flex items-center gap-1 rounded bg-rose-100 px-1.5 py-0.5 text-[9px] font-bold text-rose-700">
            <Flame className="h-2.5 w-2.5" /> HIGH PRIORITY
          </div>
        )}
        {lead.latestOutcome?.callbackAt && (
          <div className="mt-1 text-[9px] text-amber-700">
            🔔 Callback: {relativeTime(lead.latestOutcome.callbackAt)}
          </div>
        )}
      </button>
      {/* Drag handle — grip dots in the top-right corner */}
      <div
        {...(dragListeners || {})}
        className="absolute right-1 top-1 cursor-grab rounded p-1 text-muted-foreground/40 opacity-0 transition group-hover:opacity-100 hover:text-muted-foreground active:cursor-grabbing"
        aria-label="Drag to move"
        title="Drag to another stage"
      >
        <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor"><circle cx="2" cy="2" r="1.2"/><circle cx="8" cy="2" r="1.2"/><circle cx="2" cy="7" r="1.2"/><circle cx="8" cy="7" r="1.2"/><circle cx="2" cy="12" r="1.2"/><circle cx="8" cy="12" r="1.2"/></svg>
      </div>
    </div>
  );
}
