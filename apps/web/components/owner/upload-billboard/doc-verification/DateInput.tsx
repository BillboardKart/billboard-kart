"use client";

import { Calendar } from "lucide-react";

export default function DateInput({
  label,
  value,
  onDateChangeAction,
  optional,
  helpText,
}: {
  label: string;
  value: string;
  onDateChangeAction: (v: string) => void;
  optional?: boolean;
  helpText?: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2">
        <span
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-sm text-[#0a0a0a] leading-5"
        >
          {label}
        </span>
        {optional && (
          <span
            style={{ fontFamily: "Inter, sans-serif" }}
            className="bg-[#f5f5f5] text-[#525252] text-xs px-2 py-0.5 rounded-full leading-4"
          >
            Optional
          </span>
        )}
      </div>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <Calendar className="size-4 text-[#737373]" />
        </div>
        <input
          type="date"
          value={value}
          onChange={(e) => onDateChangeAction(e.target.value)}
          className="bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-10 rounded-lg relative w-full border border-[#d4d4d4] pl-9 pr-3 text-sm text-[#0a0a0a] font-['Inter',sans-serif] outline-none focus:border-[#F54900] transition-colors"
        />
      </div>
      {helpText && (
        <span
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-xs text-[#737373] leading-4"
        >
          {helpText}
        </span>
      )}
    </div>
  );
}
