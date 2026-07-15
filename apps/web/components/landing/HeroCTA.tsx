"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function HeroCTA() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.3,
        duration: 0.5,
      }}
      className="mt-10 flex flex-col items-center gap-5 sm:flex-row"
    >
      <Link
        href="/browse"
        className="group inline-flex h-14 items-center justify-center gap-3 rounded-sm bg-red-600 px-7 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg"
      >
        Browse Marketplace
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2.5}
        />
      </Link>

      <Link
        href="#how-it-works"
        className="group inline-flex h-14 items-center gap-3 rounded-sm border border-border bg-background px-6 text-sm font-medium text-foreground transition-all duration-300 hover:border-foreground/20 hover:bg-muted/40"
      >
        <PlayCircle
          className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-red-600"
          strokeWidth={2.2}
        />
        See how it works
      </Link>
    </motion.div>
  );
}
