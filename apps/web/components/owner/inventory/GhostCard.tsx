"use client";

export default function GhostCard() {
  return (
    <div className="rounded-2xl border border-[#e5e5e5] bg-white p-4 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
      <div className="h-44 w-full animate-pulse rounded-lg bg-[#ededed]" />
      <div className="mt-5 space-y-3">
        <div className="h-3 w-3/5 animate-pulse rounded-full bg-[#ededed]" />
        <div className="h-3 w-2/5 animate-pulse rounded-full bg-[#ededed]" />
        <div className="flex items-center justify-between pt-1">
          <div className="h-3 w-1/4 animate-pulse rounded-full bg-[#ededed]" />
          <div className="h-6 w-6 animate-pulse rounded-full bg-[#ededed]" />
        </div>
      </div>
    </div>
  );
}
