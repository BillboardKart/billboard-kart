"use client";

import { AlertCircle } from "lucide-react";
import { ReactNode } from "react";

export default function InfoBanner({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-[rgba(245,73,0,0.08)] rounded-[16px] relative ${className}`}
    >
      <div className="absolute inset-0 border border-[rgba(0,0,0,0.01)] rounded-[16px] pointer-events-none" />
      <div className="flex gap-[8px] items-start p-[17px]">
        <AlertCircle className="size-4 text-[#F54900] shrink-0 mt-[2px]" />
        <span
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-[14px] text-[#0a0a0a] leading-[20px]"
        >
          {children}
        </span>
      </div>
    </div>
  );
}
