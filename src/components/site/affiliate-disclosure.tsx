import { AFFILIATE_DISCLOSURE as AffText } from "@/lib/software-data";
import { Star } from "lucide-react";

export function AffiliateDisclosure() {
  return (
    <div className="border-b border-amber-500/20 bg-amber-50 px-4 py-2.5 text-[11px] leading-relaxed text-amber-900">
      <strong className="font-semibold">Affiliate Earnings Disclosure —</strong> {AffText}
    </div>
  );
}

export function AffiliateButton({ href, children, className = "", variant = "gold" }: { href: string; children: React.ReactNode; className?: string; variant?: "gold" | "ivory" }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer sponsored" className={variant === "gold" ? `btn-gold ${className}` : `btn-outline-ivory ${className}`}>
      {children}
    </a>
  );
}

export function SoftwareLogo({ text, color, size = 56 }: { text: string; color: string; size?: number }) {
  return (
    <div className="flex shrink-0 items-center justify-center rounded-xl font-bold text-white shadow-inner" style={{ width: size, height: size, background: color, fontSize: size * 0.34 }}>
      {text.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => {
          const fill = Math.max(0, Math.min(1, rating - (i - 1)));
          return (
            <span key={i} className="relative inline-block">
              <Star className="h-3.5 w-3.5 text-gray-300" />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              </span>
            </span>
          );
        })}
      </div>
      <span className="text-xs font-medium text-foreground">{rating.toFixed(1)}</span>
      {count != null && <span className="text-xs text-muted-foreground">({count})</span>}
    </div>
  );
}
