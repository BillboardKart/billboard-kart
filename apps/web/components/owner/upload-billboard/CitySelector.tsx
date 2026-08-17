"use client";

import { Field, TextInput } from "./ui";

const CITIES = ["Mumbai", "Pune", "Bangalore", "Delhi"];

export default function CitySelector({
  value,
  onChange,
  chip,
  onChipChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  chip: string;
  onChipChange: (chip: string) => void;
  error?: string;
}) {
  return (
    <Field label="City" required error={error}>
      <div data-error={!!error} className="flex flex-col gap-[8px]">
        <TextInput
          value={value}
          onChange={(v) => {
            onChange(v);
            onChipChange(CITIES.includes(v) ? v : "");
          }}
          placeholder="Search a city"
          invalid={!!error}
        />
        <div className="flex flex-wrap gap-[8px]">
          {CITIES.map((c) => {
            const active = chip === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => {
                  if (active) {
                    onChipChange("");
                    onChange("");
                  } else {
                    onChipChange(c);
                    onChange(c);
                  }
                }}
                className={`rounded-full px-[13px] py-[9px] text-[12px] leading-[16px] border transition-colors cursor-pointer disabled:pointer-events-none ${
                  active
                    ? "bg-[#f54900] text-white border-[#f54900]"
                    : "bg-[#f5f5f5] text-[#171717] border-[#e5e5e5] hover:bg-white"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </Field>
  );
}
