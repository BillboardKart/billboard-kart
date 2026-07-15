"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface BillboardCardProps {
  readonly name: string;
  readonly city: string;
  readonly image: string;
}

export default function BillboardCard({
  name,
  city,
  image,
}: BillboardCardProps) {
  return (
    <motion.article
      whileHover={{
        y: -8,
        scale: 1.015,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group relative w-72.5 shrink-0 overflow-hidden rounded-[28px] bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
    >
      <div className="relative aspect-4/5 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          unoptimized
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute left-5 right-5 bottom-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5 text-white" />

            <span className="text-xs font-medium text-white">{city}</span>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{name}</h3>

              <p className="mt-1 text-sm text-white/75">Premium Location</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
