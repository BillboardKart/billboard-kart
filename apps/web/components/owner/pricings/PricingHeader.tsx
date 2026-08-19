"use client";

import { ChevronLeftIcon, InboxIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const imgBillboard =
  "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=96&h=96&fit=crop&auto=format";

export default function PricingHeader() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-xs bg-[rgba(255,255,255,0.95)] border-b border-[#e5e5e5] w-full">
      <div className="flex items-center justify-between px-8 py-4 max-w-250 mx-auto">
        {/* Left: back + billboard info */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Go back"
            className="rounded-full"
          >
            <ChevronLeftIcon size={20} />
          </Button>
          {/* Billboard thumbnail */}
          <div className="relative rounded-2xl size-12 overflow-hidden border border-[#e5e5e5] shrink-0">
            <Image
              src={imgBillboard}
              alt="Western Express Highway Billboard"
              fill
              unoptimized
              className="absolute inset-0 w-full h-[143%] top-[-21%] object-cover"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[20px] tracking-[-0.5px] text-[#0a0a0a] leading-7 font-normal">
              Western Express Highway Billboard
            </p>
            <p className="text-[14px] text-[#737373] leading-5">
              1236 WE Road, Mumbai, MH · Set pricing and available dates for
              this listing.
            </p>
          </div>
        </div>
        {/* Draft badge */}
        <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 rounded-full">
          <InboxIcon size={12} />
          Draft
        </Badge>
      </div>
    </div>
  );
}
