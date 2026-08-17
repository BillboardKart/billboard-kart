"use client";

export default function LoadingSpinner() {
  return (
    <div className="mt-10 flex items-center justify-center gap-2 text-sm text-[#737373]">
      <svg
        className="size-4 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      Loading more listings
    </div>
  );
}
