"use client";

import type { SquareService } from "@/lib/square-booking";
import { formatUsdFromCents } from "@/lib/square-booking";

type Props = {
  service: SquareService;
  selected?: boolean;
  onSelect?: (id: string) => void;
  compact?: boolean;
};

export default function ServiceCard({
  service,
  selected = false,
  onSelect,
  compact = false
}: Props) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className={`${compact ? "text-xl" : "text-2xl"} font-serif text-ink leading-tight`}>
          {service.name}
        </h3>
        <span className="text-sm text-gold-deep whitespace-nowrap">
          {formatUsdFromCents(service.priceCents)}
        </span>
      </div>
      <p className="mt-2 text-sm text-ink/65 leading-relaxed">{service.description}</p>
      <p className="mt-3 text-[10px] tracking-xl uppercase text-ink/45">
        {service.durationMinutes} minutes
      </p>
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={() => onSelect(service.id)}
        aria-pressed={selected}
        className={`w-full text-left rounded-2xl border p-4 md:p-5 transition-colors ${
          selected ? "border-gold bg-gold/10" : "border-ink/10 bg-ivory hover:border-ink/25"
        }`}
      >
        {content}
      </button>
    );
  }

  return (
    <article className="h-full rounded-[22px] border border-ink/10 bg-ivory p-5 md:p-6 shadow-soft">
      {content}
    </article>
  );
}
