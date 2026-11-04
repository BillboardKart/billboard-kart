"use client";

import { useBillboardFormStore } from "@/stores/billboard-form-store";
import { SectionCard, SectionTitle, Input } from "./ui";

export default function PhysicalSize() {
  const width = useBillboardFormStore((s) => s.form.width);
  const height = useBillboardFormStore((s) => s.form.height);
  const updateField = useBillboardFormStore((s) => s.updateField);

  return (
    <SectionCard>
      <SectionTitle>Physical size</SectionTitle>
      <div className="flex gap-4 items-end">
        <Input
          label="Width (ft)"
          value={width}
          onChange={(v) => updateField("width", v)}
        />
        <div className="h-11 flex items-center justify-center shrink-0">
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
        <Input
          label="Height (ft)"
          value={height}
          onChange={(v) => updateField("height", v)}
        />
      </div>
    </SectionCard>
  );
}
