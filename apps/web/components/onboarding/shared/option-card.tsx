"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type OptionCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  badge?: string;
  onClickAction: () => void;
};

export function OptionCard({
  title,
  description,
  icon,
  selected,
  badge,
  onClickAction,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClickAction}
      className={cn(
        "group relative w-full rounded-2xl border bg-card p-6 text-left transition-all duration-200",
        "hover:border-primary/60 hover:shadow-md",
        "focus:outline-none focus:ring-2 focus:ring-primary/20",
        selected
          ? "border-primary shadow-md ring-2 ring-primary/10"
          : "border-border",
      )}
    >
      {selected && (
        <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-4 w-4" strokeWidth={3} />
        </div>
      )}

      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-foreground">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      {badge && (
        <div className="mt-5 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {badge}
        </div>
      )}
    </button>
  );
}
