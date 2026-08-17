"use client";

import { cn } from "./types";

const tabs = [
  "All",
  "Live",
  "Pending review",
  "Draft",
  "Unavailable",
  "Needs documents",
];

export default function TabBar({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "flex h-9 items-center rounded-sm border-primary px-4 text-sm transition-colors cursor-pointer disabled:pointer-events-none",
            activeTab === tab
              ? "bg-[#0a0a0a] text-white"
              : "text-[#0a0a0a] hover:bg-[#f5f5f5]",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
