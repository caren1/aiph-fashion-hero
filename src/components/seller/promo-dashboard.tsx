"use client";

import { useState } from "react";
import { activeCampaigns, dailyMetrics, promoMetrics } from "@/data/campaigns";
import type { Campaign } from "@/types/campaign";
import { PromoMetrics } from "./promo-metrics";
import { PromoChart } from "./promo-chart";
import { PromoTable } from "./promo-table";
import { PromoModal } from "./promo-modal";

export function PromoDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(activeCampaigns);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePause = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === "active" ? "paused" : "active" } : c
      )
    );
  };

  const handleEdit = (_id: string) => {
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-charcoal mb-1">Promocje</h1>
          <p className="text-[13px] text-warm-gray">
            Zarządzaj płatnymi kampaniami Boost i śledź ich ROI.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-cta text-[12px] px-5 py-2.5 shrink-0"
        >
          + Nowa kampania
        </button>
      </div>

      <PromoMetrics metrics={promoMetrics} />
      <PromoChart data={dailyMetrics} />
      <PromoTable
        campaigns={campaigns}
        onPause={handlePause}
        onEdit={handleEdit}
      />

      {isModalOpen && (
        <PromoModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
