import React from "react";
import { OptionItem } from "@/types/form";

interface BillboardTypeSelectProps {
  label: string;
  icon?: React.ReactNode;
  options: OptionItem[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export function BillboardTypeSelect({
  label,
  icon,
  options,
  selectedValue,
  onSelect,
}: BillboardTypeSelectProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        {label}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const isSelected = selectedValue === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              className={`flex items-start p-5 h-28 rounded-md border text-left transition-all cursor-pointer ${
                isSelected
                  ? "border-orange-500 bg-orange-500/5 shadow-xs"
                  : "border-border bg-card hover:bg-muted/40"
              }`}
            >
              <span className="text-sm font-medium text-foreground">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
