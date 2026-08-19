"use client";

import { ReactNode } from "react";

export default function DocVerificationCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-[16px] relative ${className}`}>
      <div className="absolute inset-0 border border-[#e5e5e5] rounded-[16px] shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] pointer-events-none" />
      <div className="p-[24px] flex flex-col gap-[16px] relative">
        {children}
      </div>
    </div>
  );
}
