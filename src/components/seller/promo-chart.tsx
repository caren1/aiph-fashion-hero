"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { DailyMetric } from "@/types/campaign";

interface Props {
  data: DailyMetric[];
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getDate()}.${d.getMonth() + 1}`;
}

const tickFormatter = (val: string) => {
  const day = new Date(val).getDate();
  return day % 5 === 0 || day === 1 ? formatDate(val) : "";
};

export function PromoChart({ data }: Props) {
  const chartData = data.map((d) => ({
    ...d,
    dateLabel: formatDate(d.date),
  }));

  return (
    <div className="bg-white rounded-lg border border-black/8 px-5 pt-5 pb-4 mb-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.6px] text-warm-gray mb-4">
        Aktywność kampanii — ostatnie 30 dni
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData} margin={{ top: 4, right: 16, left: -8, bottom: 0 }}>
          <XAxis
            dataKey="date"
            tickFormatter={tickFormatter}
            tick={{ fontSize: 11, fill: "#6b6b6b" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#6b6b6b" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              border: "1px solid #cdcdcd",
              borderRadius: 6,
              color: "#212121",
            }}
            labelFormatter={(v) => formatDate(v as string)}
            formatter={(value, name) => [
              typeof value === "number" ? value.toLocaleString("pl-PL") : value,
              name === "impressions" ? "Wyświetlenia" : "Kliknięcia",
            ]}
          />
          <Legend
            formatter={(value) =>
              value === "impressions" ? "Wyświetlenia" : "Kliknięcia"
            }
            wrapperStyle={{ fontSize: 12, color: "#6b6b6b" }}
          />
          <Line
            type="monotone"
            dataKey="impressions"
            stroke="#212121"
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#6b6b6b"
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
