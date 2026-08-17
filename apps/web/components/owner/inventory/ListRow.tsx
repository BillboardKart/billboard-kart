"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, FileWarning, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { cn, type Listing } from "./types";
import StatusBadge from "./StatusBadge";

export default function ListRow({ listing }: { listing: Listing }) {
  const [saved, setSaved] = useState(false);
  const needsDocs = listing.status === "Needs documents";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.2 }}
      className="group flex items-center gap-4 border-b border-[#e5e5e5] px-4 py-3 transition-colors hover:bg-[#fafafa]"
    >
      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-[#e5e5e5]">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          unoptimized
          className="h-full w-full object-cover"
        />
        {needsDocs && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <FileWarning className="size-4 text-white" strokeWidth={1.33} />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-medium text-[#0a0a0a]">
          {listing.title}
        </span>
        <div className="flex items-center gap-1 text-xs text-[#737373]">
          <MapPin className="size-3 shrink-0" strokeWidth={1.8} />
          <span>{listing.city}</span>
        </div>
      </div>

      <div className="hidden w-36 sm:block">
        <StatusBadge status={listing.status} />
      </div>

      <div className="hidden w-28 shrink-0 text-right md:block">
        <span className="text-sm text-[#0a0a0a]">{listing.price}</span>
        <span className="text-xs text-[#737373]">/mo</span>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-label={saved ? "Remove from saved" : "Save listing"}
          className="flex size-8 items-center justify-center rounded-full text-[#737373] transition-colors hover:bg-[#f5f5f5]"
        >
          <Star
            className={cn("size-3.5", saved ? "text-[#f54900]" : "")}
            fill={saved ? "currentColor" : "none"}
            strokeWidth={1.8}
          />
        </button>
        <button
          type="button"
          aria-label="View listing"
          className="flex size-8 items-center justify-center rounded-full text-[#737373] transition-colors hover:bg-[#f5f5f5] hover:text-[#0a0a0a]"
        >
          <ChevronRight className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </motion.div>
  );
}
