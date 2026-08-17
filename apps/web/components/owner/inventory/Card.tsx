"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, FileWarning, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { cn, type Listing } from "./types";
import StatusBadge from "./StatusBadge";

export default function Card({ listing }: { listing: Listing }) {
  const [saved, setSaved] = useState(false);
  const needsDocs = listing.status === "Needs documents";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className="group overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] transition-shadow hover:shadow-[0px_10px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.06)]"
    >
      <div className="relative h-44 w-full overflow-hidden bg-[#e5e5e5]">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          unoptimized
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <StatusBadge
          status={listing.status}
          className="absolute left-3 top-3"
        />
        {needsDocs && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg border border-white/15 bg-black/50 px-2.5 py-1.5 backdrop-blur-md">
            <FileWarning
              className="size-4 shrink-0 text-white"
              strokeWidth={1.33}
            />
            <span className="text-xs text-white">Documentation Pending</span>
          </div>
        )}
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-label={saved ? "Remove from saved" : "Save listing"}
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/90 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] backdrop-blur transition-colors hover:bg-white cursor-pointer disabled:pointer-events-none"
        >
          <Star
            className={cn(
              "size-4.5",
              saved ? "text-[#f54900]" : "text-[#0a0a0a]",
            )}
            fill={saved ? "currentColor" : "none"}
            strokeWidth={1.8}
          />
        </button>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base text-[#0a0a0a]">{listing.title}</h3>
          <div className="flex items-center gap-1 text-sm text-[#737373]">
            <MapPin className="size-3.5" strokeWidth={1.8} />
            <span>{listing.city}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="flex items-baseline">
            <span className="text-lg text-[#0a0a0a]">{listing.price}</span>
            <span className="text-sm text-[#737373]">/mo</span>
          </p>
          <button
            type="button"
            aria-label="View listing"
            className="flex size-8 items-center justify-center rounded-full text-[#737373] transition-colors hover:bg-[#f5f5f5] hover:text-[#0a0a0a]"
          >
            <ChevronRight className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
