"use client";

export default function GhostRow() {
  return (
    <div className="flex items-center gap-4 border-b border-[#e5e5e5] px-4 py-3 last:border-0">
      <div className="h-14 w-20 shrink-0 animate-pulse rounded-lg bg-[#ededed]" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="h-3 w-48 animate-pulse rounded-full bg-[#ededed]" />
        <div className="h-2.5 w-24 animate-pulse rounded-full bg-[#ededed]" />
      </div>
      <div className="hidden w-36 shrink-0 sm:block">
        <div className="h-5 w-24 animate-pulse rounded-md bg-[#ededed]" />
      </div>
      <div className="hidden w-28 shrink-0 items-center justify-end md:flex">
        <div className="h-3 w-16 animate-pulse rounded-full bg-[#ededed]" />
      </div>
      <div className="flex w-18 shrink-0 justify-end gap-1">
        <div className="size-8 animate-pulse rounded-full bg-[#ededed]" />
        <div className="size-8 animate-pulse rounded-full bg-[#ededed]" />
      </div>
    </div>
  );
}
