"use client";

import type { Campaign } from "@/types/campaign";
import { PromoTooltip } from "./promo-tooltip";

const ROAS_TOOLTIP =
  "Zwrot z wydatków na reklamę — ile złotych przychodu generuje każda złotówka wydana na Boost. ROAS 4,2x = 1 PLN wydane → 4,20 PLN ze sprzedaży przypisanej reklamie.";

function formatRoas(v: number) {
  return v.toFixed(1).replace(".", ",") + "x";
}

interface Props {
  campaigns: Campaign[];
  onPause: (id: string) => void;
  onEdit: (id: string) => void;
}

export function PromoTable({ campaigns, onPause, onEdit }: Props) {
  return (
    <div className="bg-white rounded-lg border border-black/8 mb-8">
      <div className="px-5 pt-5 pb-3 border-b border-black/6">
        <p className="text-[11px] font-medium uppercase tracking-[0.6px] text-warm-gray">
          Aktywne kampanie
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px] text-charcoal min-w-[640px]">
          <thead>
            <tr className="border-b border-black/6">
              <Th>Produkt</Th>
              <Th align="right">Budżet (PLN/mies.)</Th>
              <Th align="right">Wyświetlenia</Th>
              <Th align="right">Kliknięcia</Th>
              <Th align="right">
                <span className="inline-flex items-center gap-0.5">
                  ROAS
                  <PromoTooltip content={ROAS_TOOLTIP} />
                </span>
              </Th>
              <Th align="right">Akcje</Th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} className="border-b border-black/4 last:border-0 hover:bg-cream-light transition-colors">
                <td className="px-5 py-3 font-medium">{c.productName}</td>
                <td className="px-5 py-3 text-right">{c.budgetMonthly}</td>
                <td className="px-5 py-3 text-right">
                  {c.impressions.toLocaleString("pl-PL")}
                </td>
                <td className="px-5 py-3 text-right">
                  {c.clicks.toLocaleString("pl-PL")}
                </td>
                <td className="px-5 py-3 text-right font-medium">
                  {formatRoas(c.roas)}
                </td>
                <td className="px-5 py-3 text-right">
                  <button
                    onClick={() => onEdit(c.id)}
                    className="text-[12px] text-charcoal underline underline-offset-2 hover:text-warm-gray transition-colors mr-3"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => onPause(c.id)}
                    className="text-[12px] text-warm-gray underline underline-offset-2 hover:text-charcoal transition-colors"
                  >
                    Wstrzymaj
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-5 py-3 text-[11px] font-medium uppercase tracking-[0.6px] text-warm-gray ${align === "right" ? "text-right" : "text-left"}`}
    >
      {children}
    </th>
  );
}
