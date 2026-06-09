import type { Campaign, DailyMetric, PromoMetrics } from "@/types/campaign";

export const activeCampaigns: Campaign[] = [
  {
    id: "c1",
    productName: "Cloud Runner",
    productId: "1",
    budgetMonthly: 60,
    impressions: 4820,
    clicks: 241,
    roas: 4.6,
    status: "active",
  },
  {
    id: "c2",
    productName: "Trail Pacer",
    productId: "3",
    budgetMonthly: 45,
    impressions: 3160,
    clicks: 154,
    roas: 3.8,
    status: "active",
  },
  {
    id: "c3",
    productName: "Merino Everyday Tee",
    productId: "7",
    budgetMonthly: 30,
    impressions: 2390,
    clicks: 117,
    roas: 4.2,
    status: "active",
  },
];

export const promoMetrics: PromoMetrics = {
  totalSpend: 420,
  totalClicks: 1240,
  avgRoas: 4.2,
};

const seed = [
  148, 162, 95, 201, 178, 133, 119, 187, 205, 144,
  98,  172, 160, 211, 189, 136, 101, 195, 177, 153,
  167, 88,  214, 192, 141, 108, 185, 173, 156, 199,
];

export const dailyMetrics: DailyMetric[] = seed.map((impressions, i) => {
  const d = new Date("2026-05-11");
  d.setDate(d.getDate() + i);
  return {
    date: d.toISOString().slice(0, 10),
    impressions,
    clicks: Math.round(impressions * 0.051),
  };
});

export const sellerProducts = [
  { id: "1", name: "Cloud Runner" },
  { id: "3", name: "Trail Pacer" },
  { id: "7", name: "Merino Everyday Tee" },
  { id: "9", name: "Wool Slip-On" },
  { id: "12", name: "Natural Dye Hoodie" },
];
