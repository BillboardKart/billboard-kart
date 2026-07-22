// lib/motion.ts
import type { Transition } from "framer-motion";

const easeOut: Transition = { duration: 0.2, ease: "easeOut" as const };

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 } satisfies Transition,
};

export const slideUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: easeOut,
};

export const slideInRight = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 16 },
  transition: easeOut,
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06 } },
};

export const staggerItem = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
};

export const fieldVariants = {
  hidden: { opacity: 0, height: 0, marginTop: 0, overflow: "hidden" as const },
  visible: {
    opacity: 1,
    height: "auto",
    marginTop: 16,
    overflow: "visible" as const,
  },
};

export const onboardingTransition = {
  duration: 0.25,
  ease: "easeOut",
} as const;
