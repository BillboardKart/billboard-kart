"use client";

import { SectionCard, SectionTitle, Input } from "./ui";

export default function PhysicalSize() {
  return (
    <SectionCard>
      <SectionTitle>Physical size</SectionTitle>
      <div className="flex gap-[16px] items-end">
        <Input label="Width (ft)" value="48" />
        <div className="h-[44px] flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M15 5L5 15"
              stroke="#737373"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 5L15 15"
              stroke="#737373"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <Input label="Height (ft)" value="14" />
      </div>
    </SectionCard>
  );
}
