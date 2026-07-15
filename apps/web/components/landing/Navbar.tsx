"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  {
    label: "Marketplace",
    href: "/browse",
  },
  {
    label: "Locations",
    href: "#locations",
  },
  {
    label: "AI Studio",
    href: "#ai",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
] as const;

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-10">
        <div className="flex h-16 items-center justify-between rounded-2xl border border-border/60 bg-background/80 px-6 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-600 text-white">
              <MapPin className="h-5 w-5" strokeWidth={2.5} />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-base font-semibold tracking-tight">
                BillboardRent
              </span>
              <span className="text-xs text-muted-foreground">YC S25</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-muted-foreground transition hover:text-foreground sm:inline-flex"
            >
              Sign in
            </Link>

            <Link
              href="/browse"
              className="inline-flex h-11 items-center gap-2 rounded-sm bg-foreground px-5 text-sm font-semibold text-background transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
            >
              Book Demo
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
