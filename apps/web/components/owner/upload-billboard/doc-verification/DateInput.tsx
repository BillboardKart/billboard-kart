"use client";

import { Calendar } from "lucide-react";

export default function DateInput({
  label,
  placeholder = "DD/MM/YYYY",
  optional,
  helpText,
}: {
  label: string;
  placeholder?: string;
  optional?: boolean;
  helpText?: string;
}) {
  return (
    <div className="flex flex-col gap-[8px] w-full">
      <div className="flex items-center gap-[8px]">
        <span
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-[14px] text-[#0a0a0a] leading-[20px]"
        >
          {label}
        </span>
        {optional && (
          <span
            style={{ fontFamily: "Inter, sans-serif" }}
            className="bg-[#f5f5f5] text-[#525252] text-[12px] px-[8px] py-[2px] rounded-full leading-[16px]"
          >
            Optional
          </span>
        )}
      </div>
      <div className="relative">
        <div className="absolute left-[12px] top-1/2 -translate-y-1/2 pointer-events-none">
          <Calendar className="size-4 text-[#737373]" />
        </div>
        <div className="bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[40px] rounded-[8px] relative">
          <div className="absolute inset-0 border border-[#d4d4d4] rounded-[8px] pointer-events-none" />
          <div className="flex items-center h-full pl-[36px] pr-[12px]">
            <span
              style={{ fontFamily: "Inter, sans-serif" }}
              className="text-[14px] text-[#737373]"
            >
              {placeholder}
            </span>
          </div>
        </div>
      </div>
      {helpText && (
        <span
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-[12px] text-[#737373] leading-[16px]"
        >
          {helpText}
        </span>
      )}
    </div>
  );
}
