"use client";

import { useEffect, useRef } from "react";
import { BILLBOARDS } from "@/lib/billboards";
import { motion } from "framer-motion";
import BillboardCard from "./BillboardCard";

const cards = [...BILLBOARDS.slice(0, 8), ...BILLBOARDS.slice(0, 8)];

export default function BillboardCarousel() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<Animation | null>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;

    if (!marquee) {
      return;
    }

    const animation = marquee.animate(
      [
        {
          transform: "translate3d(0,0,0)",
        },
        {
          transform: "translate3d(-50%,0,0)",
        },
      ],
      {
        duration: 60000,
        iterations: Number.POSITIVE_INFINITY,
        easing: "linear",
      },
    );

    animationRef.current = animation;

    return () => {
      animation.cancel();
    };
  }, []);

  const slowDown = () => {
    animationRef.current?.updatePlaybackRate(0.45);
  };

  const speedUp = () => {
    animationRef.current?.updatePlaybackRate(1);
  };

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      viewport={{
        once: true,
      }}
      className="relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-32 bg-linear-to-r from-background via-background/80 to-transparent" />

      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-32 bg-linear-to-l from-background via-background/80 to-transparent" />

      <div ref={marqueeRef} className="flex w-max gap-8 py-3">
        {cards.map((billboard, index) => (
          <div
            key={`${billboard.id}-${index}`}
            className="shrink-0"
            onMouseEnter={slowDown}
            onMouseLeave={speedUp}
          >
            <BillboardCard
              image={billboard.image}
              city={billboard.city}
              name={billboard.name}
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
}
