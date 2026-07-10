"use client";

import Link from "next/link";
import { SoftwareLogo, StarRating } from "./affiliate-disclosure";
import { ArrowRight } from "lucide-react";
import type { SoftwareProduct } from "@/lib/software-data";

export function SoftwareCard({ p }: { p: SoftwareProduct }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition hover:border-gold/50 hover:shadow-[var(--shadow-soft)]">
      <div className="flex items-start gap-3">
        <SoftwareLogo text={p.logoText} color={p.logoColor} />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base leading-tight">{p.name}</h3>
          <p className="text-xs text-muted-foreground">{p.vendor}</p>
          <div className="mt-1"><StarRating rating={p.rating} count={p.reviewCount} /></div>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{p.tagline}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">{p.deployment}</span>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">{p.countryFocus}</span>
        {p.freeTrial && <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-700">Free trial</span>}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="text-sm font-medium">{p.startingPrice}</span>
        <Link href={`/software/${p.category}/${p.slug}`} className="flex items-center gap-1 text-sm font-medium text-primary hover:text-gold">View <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></Link>
      </div>
    </div>
  );
}
