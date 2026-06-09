"use client";

import { useEffect, useRef, useState } from "react";
import { sellerProducts } from "@/data/campaigns";

interface Props {
  onClose: () => void;
}

const DURATION_OPTIONS = [
  { days: 7, label: "7 dni" },
  { days: 14, label: "14 dni" },
  { days: 30, label: "30 dni" },
] as const;

function getEstimate(budget: number) {
  const impressionsLow = Math.round(budget * 28);
  const impressionsHigh = Math.round(budget * 38);
  const clicksLow = Math.round(impressionsLow * 0.045);
  const clicksHigh = Math.round(impressionsHigh * 0.055);
  return { impressionsLow, impressionsHigh, clicksLow, clicksHigh };
}

export function PromoModal({ onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [productId, setProductId] = useState(sellerProducts[0].id);
  const [budget, setBudget] = useState(30);
  const [duration, setDuration] = useState<7 | 14 | 30>(7);

  const totalCost = budget * duration;
  const estimate = getEstimate(budget);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-black/8">
          <div>
            <h2 className="text-[15px] font-medium text-charcoal">Nowa kampania</h2>
            <p className="text-[11px] text-warm-gray mt-0.5">
              Krok {step} z 2 —{" "}
              {step === 1 ? "Konfiguracja" : "Podsumowanie kosztów"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-warm-gray hover:text-charcoal transition-colors text-xl leading-none"
            aria-label="Zamknij"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {step === 1 ? (
            <Step1
              productId={productId}
              setProductId={setProductId}
              budget={budget}
              setBudget={setBudget}
              estimate={estimate}
            />
          ) : (
            <Step2
              budget={budget}
              duration={duration}
              setDuration={setDuration}
              totalCost={totalCost}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 pb-6 pt-2">
          {step === 2 ? (
            <button
              onClick={() => setStep(1)}
              className="text-[12px] text-warm-gray underline underline-offset-2 hover:text-charcoal transition-colors"
            >
              ← Wstecz
            </button>
          ) : (
            <span />
          )}
          {step === 1 ? (
            <button
              onClick={() => setStep(2)}
              disabled={budget < 5}
              className="btn-cta text-[12px] px-6 py-2.5 disabled:opacity-40"
            >
              Dalej →
            </button>
          ) : (
            <button
              onClick={onClose}
              className="btn-cta text-[12px] px-6 py-2.5"
            >
              Uruchom kampanię
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Step1({
  productId,
  setProductId,
  budget,
  setBudget,
  estimate,
}: {
  productId: string;
  setProductId: (v: string) => void;
  budget: number;
  setBudget: (v: number) => void;
  estimate: ReturnType<typeof getEstimate>;
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="text-[11px] font-medium uppercase tracking-[0.6px] text-warm-gray block mb-1.5">
          Produkt
        </label>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full border border-black/15 rounded-md px-3 py-2 text-[13px] text-charcoal bg-white focus:outline-none focus:ring-1 focus:ring-charcoal"
        >
          {sellerProducts.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-[11px] font-medium uppercase tracking-[0.6px] text-warm-gray block mb-1.5">
          Dzienny budżet (PLN)
        </label>
        <input
          type="number"
          min={5}
          value={budget}
          onChange={(e) => setBudget(Math.max(5, Number(e.target.value)))}
          className="w-full border border-black/15 rounded-md px-3 py-2 text-[13px] text-charcoal bg-white focus:outline-none focus:ring-1 focus:ring-charcoal"
        />
        <p className="text-[11px] text-warm-gray mt-1">Minimum 5 PLN / dzień</p>
      </div>

      {budget >= 5 && (
        <div className="bg-cream-light rounded-md px-4 py-3 text-[12px] text-charcoal/80 space-y-0.5">
          <p className="font-medium text-charcoal text-[11px] uppercase tracking-[0.5px] mb-1.5">
            Prognoza dzienna
          </p>
          <p>
            Szacowane wyświetlenia:{" "}
            <span className="font-medium text-charcoal">
              {estimate.impressionsLow.toLocaleString("pl-PL")}–
              {estimate.impressionsHigh.toLocaleString("pl-PL")}
            </span>{" "}
            / dzień
          </p>
          <p>
            Szacowane kliknięcia:{" "}
            <span className="font-medium text-charcoal">
              {estimate.clicksLow}–{estimate.clicksHigh}
            </span>{" "}
            / dzień
          </p>
        </div>
      )}
    </div>
  );
}

function Step2({
  budget,
  duration,
  setDuration,
  totalCost,
}: {
  budget: number;
  duration: 7 | 14 | 30;
  setDuration: (v: 7 | 14 | 30) => void;
  totalCost: number;
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.6px] text-warm-gray mb-3">
          Czas trwania kampanii
        </p>
        <div className="flex gap-3">
          {DURATION_OPTIONS.map(({ days, label }) => (
            <label
              key={days}
              className={`flex-1 flex items-center justify-center border rounded-md py-2.5 cursor-pointer text-[13px] transition-colors ${
                duration === days
                  ? "border-charcoal bg-charcoal text-white"
                  : "border-black/15 text-charcoal hover:border-charcoal"
              }`}
            >
              <input
                type="radio"
                name="duration"
                value={days}
                checked={duration === days}
                onChange={() => setDuration(days as 7 | 14 | 30)}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="bg-cream-light rounded-md px-4 py-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.6px] text-warm-gray mb-2">
          Podsumowanie
        </p>
        <div className="flex items-baseline justify-between">
          <p className="text-[13px] text-charcoal">
            {budget} PLN / dzień × {duration} dni
          </p>
          <p className="text-xl font-medium text-charcoal tabular-nums">
            {totalCost} PLN
          </p>
        </div>
        <p className="text-[11px] text-warm-gray mt-1">
          Łączny koszt: {totalCost} PLN za {duration} dni
        </p>
      </div>
    </div>
  );
}
