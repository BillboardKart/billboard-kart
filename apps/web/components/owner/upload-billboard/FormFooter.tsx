"use client";

import Link from "next/link";

export default function FormFooter() {
  return (
    <div className="bg-white border-t border-[#e5e5e5] sticky bottom-0">
      <div className="max-w-225 mx-auto px-8 py-4 flex items-center justify-between">
        <Link href={"/owner/my-inventory"}>
          <button
            style={{ fontFamily: "Inter, sans-serif" }}
            className="h-10 px-4 rounded-sm border border-[#e5e5e5] text-[14px] font-medium text-[#0a0a0a] bg-white cursor-pointer hover:bg-[#f5f5f5] transition-colors"
          >
            Back
          </button>
        </Link>
        <div className="flex gap-3">
          <Link href={"/owner/my-inventory"}>
            <button
              style={{ fontFamily: "Inter, sans-serif" }}
              className="h-10 px-4 rounded-sm border border-[#e5e5e5] text-[14px] font-medium text-[#0a0a0a] bg-white cursor-pointer hover:bg-[#f5f5f5] transition-colors"
            >
              Skip for now
            </button>
          </Link>
          <button
            style={{ fontFamily: "Inter, sans-serif" }}
            className="h-10 px-5 rounded-sm bg-[#f54900] text-[14px] font-medium text-white cursor-pointer hover:bg-[#d93f00] transition-colors"
          >
            Continue to Media Specs
          </button>
        </div>
      </div>
    </div>
  );
}
