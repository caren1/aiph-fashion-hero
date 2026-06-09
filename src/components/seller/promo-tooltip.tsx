"use client";

interface PromoTooltipProps {
  content: string;
}

export function PromoTooltip({ content }: PromoTooltipProps) {
  return (
    <span className="relative inline-flex group align-middle ml-1">
      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-warm-gray text-warm-gray text-[10px] font-medium cursor-default leading-none select-none">
        ?
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-md bg-charcoal text-cream-light text-[12px] leading-relaxed px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-20 shadow-lg"
      >
        {content}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-charcoal" />
      </span>
    </span>
  );
}
