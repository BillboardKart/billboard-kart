"use client";

import { IndianRupeeIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PricingCard({
  monthlyPrice,
  onMonthlyPriceChangeAction,
  weeklyEnabled,
  onWeeklyToggleAction,
  mountingFee,
  onMountingFeeChangeAction,
}: {
  monthlyPrice: string;
  onMonthlyPriceChangeAction: (v: string) => void;
  weeklyEnabled: boolean;
  onWeeklyToggleAction: () => void;
  mountingFee: string;
  onMountingFeeChangeAction: (v: string) => void;
}) {
  return (
    <Card className="p-6 rounded-md">
      <CardContent className="p-0">
        <div className="flex flex-col gap-6">
          {/* Section heading */}
          <div className="flex items-center gap-2 h-8">
            <div className="flex items-center justify-center size-8 rounded-xl bg-[rgba(245,73,0,0.12)]">
              <IndianRupeeIcon className="text-orange-600" size={16} />
            </div>
            <span className="text-[18px] text-[#0a0a0a] leading-7">
              Pricing
            </span>
          </div>

          <div className="flex flex-col gap-6">
            {/* Monthly price */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-[#0a0a0a] leading-5">
                Monthly price
              </label>
              <div className="bg-[#f5f5f5] rounded-md h-14 flex items-center px-4 gap-2 border border-transparent focus-within:border-[#f54900] transition-colors">
                <IndianRupeeIcon />
                <input
                  type="text"
                  value={monthlyPrice}
                  onChange={(e) => onMonthlyPriceChangeAction(e.target.value)}
                  className="flex-1 bg-transparent text-[24px] text-[#0a0a0a] outline-none leading-8 min-w-0"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
                <span className="text-[14px] text-[#737373] leading-5 shrink-0">
                  /mo
                </span>
              </div>
              <p className="text-[12px] text-[#737373] leading-4">
                Base rate charged per 30-day booking period.
              </p>
            </div>

            {/* Weekly price toggle */}
            <div className="rounded-2xl border border-[#e5e5e5] flex items-center justify-between px-4 py-4.25">
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] text-[#0a0a0a] leading-5">
                  Weekly price
                </span>
                <span className="text-[12px] text-[#737373] leading-4">
                  Allow shorter one-week bookings
                </span>
              </div>
              <button
                onClick={onWeeklyToggleAction}
                role="switch"
                aria-checked={weeklyEnabled}
                aria-label="Allow weekly bookings"
                className={`relative shrink-0 w-8.5 h-5 rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f54900] ${weeklyEnabled ? "bg-[#f54900]" : "bg-[#e5e5e5]"}`}
              >
                <div
                  className={`absolute top-0.5 size-4 bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-all duration-200 ${weeklyEnabled ? "left-4" : "left-0.5"}`}
                />
              </button>
            </div>

            <Separator />

            {/* Mounting fee */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-[#0a0a0a] leading-5">
                Printing / mounting charges
              </label>
              <div className="bg-[#f5f5f5] rounded-md h-14 flex items-center px-4 gap-2 border border-transparent focus-within:border-[#f54900] transition-colors">
                <IndianRupeeIcon />
                <input
                  type="text"
                  value={mountingFee}
                  onChange={(e) => onMountingFeeChangeAction(e.target.value)}
                  className="flex-1 bg-transparent text-[18px] text-[#0a0a0a] outline-none leading-7 min-w-0"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
                <span className="text-[14px] text-[#737373] leading-5 shrink-0">
                  one-time
                </span>
              </div>
              <p className="text-[12px] text-[#737373] leading-4">
                One-time fee for production and installation.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
