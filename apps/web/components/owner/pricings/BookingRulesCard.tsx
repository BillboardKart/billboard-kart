"use client";

import { Clock2Icon, MinusIcon, PlusIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const DURATION_OPTIONS = ["1 Week", "2 Weeks", "1 Month", "3 Months"];

export default function BookingRulesCard({
  minDuration,
  onMinDurationChangeAction,
  leadDays,
  onLeadDaysChangeAction,
}: {
  minDuration: string;
  onMinDurationChangeAction: (v: string) => void;
  leadDays: number;
  onLeadDaysChangeAction: (v: number) => void;
}) {
  return (
    <Card className="p-6 rounded-md">
      <CardContent className="p-0">
        <div className="flex flex-col gap-8">
          {/* Minimum booking duration */}
          <div className="flex flex-col gap-3">
            <label className="text-[14px] text-[#0a0a0a] leading-5">
              Minimum booking duration
            </label>
            <div className="bg-[#f5f5f5] rounded-2xl flex items-center px-2 py-1 w-fit gap-2">
              {DURATION_OPTIONS.map((opt) => {
                const active = minDuration === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => onMinDurationChangeAction(opt)}
                    className={`h-9 px-4 rounded-[10px] text-[16px] transition-all ${
                      active
                        ? "bg-[#fff0ea] border border-[#f54900] font-medium text-[#0a0a0a]"
                        : "border border-transparent text-[#0a0a0a] hover:bg-white/60"
                    }`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Lead time */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-8 rounded-xl bg-[rgba(245,73,0,0.12)]">
                <Clock2Icon size={16} color="#F54900" />
              </div>
              <span className="text-[16px] text-[#0a0a0a] leading-6">
                Lead time
              </span>
            </div>
            <div className="rounded-2xl border border-[#e5e5e5] flex items-center justify-between px-4 py-4.25">
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] text-[#0a0a0a] leading-5">
                  Days notice required
                </span>
                <span className="text-[12px] text-[#737373] leading-4">
                  Before a booking can start
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() =>
                    onLeadDaysChangeAction(Math.max(0, leadDays - 1))
                  }
                  aria-label="Decrease days"
                  className="rounded-xl"
                >
                  <MinusIcon size={16} />
                </Button>
                <span className="text-[18px] text-[#0a0a0a] w-8 text-center leading-7">
                  {leadDays}
                </span>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => onLeadDaysChangeAction(leadDays + 1)}
                  aria-label="Increase days"
                  className="rounded-xl"
                >
                  <PlusIcon size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
