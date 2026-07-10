"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  to: string;
  image?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  applyUrl?: string;
};

export function ServiceCard({ to, image, eyebrow, title, description, applyUrl }: Props) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:border-gold/50 hover:shadow-[var(--shadow-soft)]">
      {image && (
        <Link href={to} className="block aspect-[16/9] overflow-hidden bg-muted">
          <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </Link>
      )}
      <div className="flex flex-1 flex-col p-5">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h3 className="mt-1 font-display text-lg">{title}</h3>
        {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-4">
          <Link href={to} className="flex items-center gap-1 text-sm font-medium text-primary hover:text-gold">Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></Link>
          {applyUrl && (
            <a href={applyUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gold hover:underline">Apply Now</a>
          )}
        </div>
      </div>
    </div>
  );
}
