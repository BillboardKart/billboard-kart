"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex h-10 w-64 items-center gap-2 rounded-lg bg-[#f5f5f5] px-4">
      <Search className="size-4 shrink-0 text-[#737373]" strokeWidth={1.5} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search listings"
        className="w-full bg-transparent text-sm text-[#0a0a0a] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none"
      />
    </div>
  );
}
