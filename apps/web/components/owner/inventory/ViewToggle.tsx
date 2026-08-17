"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "./types";

export default function ViewToggle({
  view,
  onChange,
}: {
  view: "card" | "list";
  onChange: (v: "card" | "list") => void;
}) {
  return (
    <div className="flex h-10 items-center rounded-lg border border-[#e5e5e5] bg-white p-1 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <button
        type="button"
        aria-label="Card view"
        onClick={() => onChange("card")}
        className={cn(
          "flex size-8 items-center justify-center rounded-md transition-colors cursor-pointer disabled:pointer-events-none",
          view === "card"
            ? "bg-[#f5f5f5] text-[#0a0a0a]"
            : "text-[#737373] hover:text-[#0a0a0a]",
        )}
      >
        <LayoutGrid className="size-4" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        aria-label="List view"
        onClick={() => onChange("list")}
        className={cn(
          "flex size-8 items-center justify-center rounded-md transition-colors cursor-pointer disabled:pointer-events-none",
          view === "list"
            ? "bg-[#f5f5f5] text-[#0a0a0a]"
            : "text-[#737373] hover:text-[#0a0a0a]",
        )}
      >
        <List className="size-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}
