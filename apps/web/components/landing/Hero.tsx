"use client";

import { motion } from "framer-motion";
import HeroBadge from "./HeroBadge";
import HeroCTA from "./HeroCTA";
import BillboardCarousel from "./BillboardCarousel";
import TrustedLogos from "./TrustedLogos";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 lg:pt-48">
      <div className="absolute inset-0 -z-10 bg-background" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
        >
          <HeroBadge />

          <h1 className="mt-8 max-w-5xl text-balance text-[3.5rem] font-semibold leading-[0.98] tracking-tight text-foreground sm:text-[4.5rem] lg:text-[6rem]">
            Book Premium
            <span className="text-red-600"> Billboards </span>
            Across India.
            <br />
            Powered by AI.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
            Discover, compare and book premium outdoor advertising inventory in
            minutes. Generate billboard creatives with AI and launch campaigns
            without endless broker calls.
          </p>

          <HeroCTA />
        </motion.div>

        <div className="mt-24">
          <BillboardCarousel />
        </div>

        <div className="mt-20">
          <TrustedLogos />
        </div>
      </div>
    </section>
  );
}
