import { PromoDashboard } from "@/components/seller/promo-dashboard";
import Link from "next/link";

export const metadata = {
  title: "Promocje — Panel Sellera | FashionHero",
};

export default function SellerDashboardPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Minimal top bar */}
      <header className="border-b border-black/8 bg-white">
        <div className="max-w-5xl mx-auto px-4 h-12 flex items-center gap-2 text-[12px] text-warm-gray">
          <Link href="/" className="hover:text-charcoal transition-colors">
            FashionHero
          </Link>
          <span>/</span>
          <span className="text-charcoal">Panel Sellera</span>
          <span>/</span>
          <span className="text-charcoal">Promocje</span>
        </div>
      </header>

      <PromoDashboard />
    </div>
  );
}
