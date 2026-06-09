import type { PromoMetrics } from "@/types/campaign";
import { PromoTooltip } from "./promo-tooltip";

const ROAS_TOOLTIP =
  "Zwrot z wydatków na reklamę — ile złotych przychodu generuje każda złotówka wydana na Boost. ROAS 4,2x = 1 PLN wydane → 4,20 PLN ze sprzedaży przypisanej reklamie.";

const CTR_TOOLTIP =
  "Współczynnik kliknięć — procent osób które zobaczyły reklamę i ją kliknęły. CTR 5% = 5 na 100 wyświetleń kończy się kliknięciem.";

function formatRoas(v: number) {
  return v.toFixed(1).replace(".", ",") + "x";
}

interface Props {
  metrics: PromoMetrics;
}

export function PromoMetrics({ metrics }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <MetricCard
        label="Łączne wydatki"
        value={`${metrics.totalSpend} PLN`}
        sub="ostatnie 30 dni"
      />
      <MetricCard
        label="Łączne kliknięcia"
        value={metrics.totalClicks.toLocaleString("pl-PL")}
        sub="ostatnie 30 dni"
        tooltip={CTR_TOOLTIP}
      />
      <MetricCard
        label="Średni ROAS"
        value={formatRoas(metrics.avgRoas)}
        sub="ostatnie 30 dni"
        tooltip={ROAS_TOOLTIP}
        highlight
      />
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
  tooltip,
  highlight,
}: {
  label: string;
  value: string;
  sub: string;
  tooltip?: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-white rounded-lg border border-black/8 px-5 py-4">
      <div className="flex items-center gap-1 mb-1">
        <span className="text-[11px] font-medium uppercase tracking-[0.6px] text-warm-gray">
          {label}
        </span>
        {tooltip && <PromoTooltip content={tooltip} />}
      </div>
      <p
        className={`text-2xl font-light ${highlight ? "text-charcoal" : "text-charcoal"} mb-0.5`}
      >
        {value}
      </p>
      <p className="text-[11px] text-warm-gray">{sub}</p>
    </div>
  );
}
