"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function HeroBadge() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.15,
        duration: 0.45,
      }}
      className="inline-flex"
    >
      <div className="group inline-flex items-center gap-3 rounded-full border border-border/70 bg-card/70 px-5 py-2 backdrop-blur-sm transition-all duration-300 hover:border-red-600/30 hover:bg-card">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600/10 text-red-600">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
        </span>

        <span className="text-sm font-medium tracking-tight text-foreground">
          AI Powered Billboard Marketplace
        </span>

        <span className="rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
          YC S25
        </span>
      </div>
    </motion.div>
  );
}
