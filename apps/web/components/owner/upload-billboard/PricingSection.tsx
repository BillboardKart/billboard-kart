"use client";

import { Field, TextInput } from "./ui";

export default function PricingSection({
  monthlyRate,
  onMonthlyRateChange,
  isAvailable,
  onToggleAvailability,
  minDuration,
  onMinDurationChange,
  printingCost,
  onPrintingCostChange,
  monthlyRateError,
}: {
  monthlyRate: string;
  onMonthlyRateChange: (v: string) => void;
  isAvailable: boolean;
  onToggleAvailability: () => void;
  minDuration: string;
  onMinDurationChange: (v: string) => void;
  printingCost: string;
  onPrintingCostChange: (v: string) => void;
  monthlyRateError?: string;
}) {
  return (
    <div className="bg-white rounded-[16px] border border-[#e5e5e5] px-[33px] py-[25px] flex flex-col gap-[16px]">
      <p className="text-[16px] leading-[24px] text-[#0a0a0a]">Pricing</p>
      <div className="flex flex-col sm:flex-row gap-[24px] sm:items-end">
        <Field
          label="Monthly rate"
          required
          error={monthlyRateError}
          className="flex-1"
        >
          <div data-error={!!monthlyRateError}>
            <TextInput
              value={monthlyRate}
              onChange={onMonthlyRateChange}
              placeholder="1,45,500"
              prefix="₹"
              invalid={!!monthlyRateError}
              rounded="rounded-[8px]"
            />
          </div>
        </Field>
        <div className="flex-1 flex items-center justify-between gap-[24px]">
          <div className="flex flex-col gap-[4px]">
            <span className="text-[14px] leading-[20px] text-[#0a0a0a]">
              Availability
            </span>
            <span className="text-[14px] leading-[20px] text-[#737373]">
              Mark as available for booking
            </span>
          </div>
          <button
            type="button"
            onClick={onToggleAvailability}
            className={`w-[32px] h-[18px] rounded-full border border-[#e5e5e5] flex items-center px-px transition-colors cursor-pointer disabled:pointer-events-none ${
              isAvailable
                ? "bg-[#171717] justify-end"
                : "bg-[#e5e5e5] justify-start"
            }`}
            role="switch"
            aria-checked={isAvailable}
            aria-label="Available for booking"
          >
            <span className="size-[16px] rounded-full bg-white" />
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-[24px]">
        <div className="flex-1 flex flex-col gap-[8px]">
          <span className="text-[14px] text-[#666]">Minimum duration</span>
          <div className="relative">
            <select
              value={minDuration}
              onChange={(e) => onMinDurationChange(e.target.value)}
              className="w-full appearance-none bg-white border border-[#d9d9d9] rounded-[8px] px-[12px] py-[8px] text-[12px] text-[#333] outline-none focus:border-[#f54900] cursor-pointer disabled:pointer-events-none"
            >
              <option value="1 week">1 week</option>
              <option value="1 month">1 month (Default)</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
              <option value="12 months">12 months</option>
            </select>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none opacity-50"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#0A0A0A"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.33333"
              />
            </svg>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-[8px]">
          <span className="text-[14px] text-[#666]">
            Printing/Mounting cost (If Any)
          </span>
          <TextInput
            value={printingCost}
            onChange={onPrintingCostChange}
            placeholder="25,000"
            prefix="₹"
            rounded="rounded-[8px]"
            boxClass="py-[8px] px-[12px]"
          />
        </div>
      </div>
    </div>
  );
}
