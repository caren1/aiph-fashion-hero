export interface Campaign {
  id: string;
  productName: string;
  productId: string;
  budgetMonthly: number;
  impressions: number;
  clicks: number;
  roas: number;
  status: "active" | "paused";
}

export interface DailyMetric {
  date: string;
  impressions: number;
  clicks: number;
}

export interface PromoMetrics {
  totalSpend: number;
  totalClicks: number;
  avgRoas: number;
}
