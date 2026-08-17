import React from "react";
import { OptionItem } from "@/types/form";

export interface SelectGroupProps {
  label: string;
  icon?: React.ReactNode;
  options: string[] | OptionItem[];
  selectedValue: string;
  onSelect: (value: string) => void;
  columns?: number;
}

export const SelectGroup: React.FC<SelectGroupProps> = ({
  label,
  icon,
  options,
  selectedValue,
  onSelect,
  columns = 4,
}) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
      {icon && <span className="text-muted-foreground">{icon}</span>}
      {label}
    </label>
    <div className={`grid grid-cols-2 sm:grid-cols-${columns} gap-2.5`}>
      {options.map((opt) => {
        const val = typeof opt === "string" ? opt : opt.id;
        const displayText = typeof opt === "string" ? opt : opt.label;
        const isSelected = selectedValue === val;

        return (
          <button
            key={val}
            type="button"
            onClick={() => onSelect(val)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
              isSelected
                ? "border-orange-500 bg-orange-500/5 text-orange-600 shadow-xs"
                : "border-border bg-card text-foreground hover:bg-muted/50"
            }`}
          >
            {displayText}
          </button>
        );
      })}
    </div>
  </div>
);
