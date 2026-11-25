"use client";

import { Field } from "./ui";

export type BillboardCityOption = {
  id: string;
  name: string;
  label: string;
  latitude: number | null;
  longitude: number | null;
};

export default function CitySelector({
  value,
  options,
  selectedId,
  onSelect,
  isLoading = false,
  error,
}: {
  value: string;
  options: BillboardCityOption[];
  selectedId: string;
  onSelect: (city: BillboardCityOption) => void;
  isLoading?: boolean;
  error?: string;
}) {
  return (
    <Field label="City" required error={error}>
      <div data-error={!!error} className="flex flex-col gap-[8px]">
        <input
          value={value}
          readOnly
          placeholder={isLoading ? "Loading cities…" : "Choose a city"}
          aria-invalid={!!error}
          className="h-11 w-full rounded-xl border border-[#e5e5e5] bg-white px-3 text-sm outline-none placeholder:text-[#737373]"
        />
        <div className="flex flex-wrap gap-[8px]">
          {options.map((city) => {
            const active = selectedId === city.id;
            return (
              <button
                key={city.id}
                type="button"
                onClick={() => {
                  onSelect(city);
                }}
                className={`rounded-full px-[13px] py-[9px] text-[12px] leading-[16px] border transition-colors cursor-pointer disabled:pointer-events-none ${
                  active
                    ? "bg-[#f54900] text-white border-[#f54900]"
                    : "bg-[#f5f5f5] text-[#171717] border-[#e5e5e5] hover:bg-white"
                }`}
              >
                {city.label}
              </button>
            );
          })}
          {!isLoading && options.length === 0 && (
            <span className="text-xs text-[#737373]">
              Pune and Bombay are not available right now.
            </span>
          )}
        </div>
      </div>
    </Field>
  );
}
