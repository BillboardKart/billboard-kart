"use client";

import { cn } from "@/lib/utils";
import { BadgeCheck, Building2, CheckCircle2, Megaphone } from "lucide-react";

import type { RoleOption } from "@/lib/types";

type RoleCardProps = {
  role: RoleOption;
  selected: boolean;
  onClickAction: () => void;
};

export function RoleCard({ role, selected, onClickAction }: RoleCardProps) {
  const Icon = role.id === "advertiser" ? Megaphone : Building2;

  return (
    <button
      type="button"
      onClick={onClickAction}
      className={cn(
        "group relative w-full rounded-sm border bg-card p-6 text-left transition-all duration-200 cursor-pointer disabled:pointer-events-none",
        "hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-primary/30",
        selected ? "border-primary bg-amber-50/25 shadow-md" : "border-border",
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Icon className="h-7 w-7 text-primary" />
        </div>

        <CheckCircle2
          className={cn(
            "h-6 w-6 transition-all",
            selected
              ? "scale-100 text-primary opacity-100"
              : "scale-90 text-muted-foreground/30 opacity-40",
          )}
        />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-foreground">
        {role.title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {role.description}
      </p>

      {role.badge && (
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border-red-600 text-red-600 bg-card/70 hover:border-red-600/30 px-3 py-1.5 text-xs font-medium shadown-sm">
          <BadgeCheck className="h-3.5 w-3.5" />
          {role.badge}
        </div>
      )}
    </button>
  );
}
