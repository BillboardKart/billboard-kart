"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="overflow-hidden rounded-[40px] border border-border bg-card"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.06),transparent_55%)]" />

            <div className="relative flex flex-col items-center px-8 py-20 text-center sm:px-16 lg:px-24">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2">
                <Sparkles className="h-4 w-4 text-red-600" />

                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">
                  Ready to launch?
                </span>
              </div>

              <h2 className="mt-8 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-7xl">
                The fastest way to book
                <br />
                premium billboards.
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
                Browse verified inventory, generate AI creatives and launch
                campaigns across India in hours instead of weeks.
              </p>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/browse"
                  className="group inline-flex h-14 items-center justify-center gap-3 rounded-sm bg-red-600 px-8 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-700"
                >
                  Browse Marketplace
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex h-14 items-center justify-center rounded-sm border border-border bg-background px-8 text-sm font-semibold transition hover:bg-muted"
                >
                  Book a Demo
                </Link>
              </div>

              <div className="mt-16 grid w-full max-w-4xl gap-8 border-t border-border pt-12 sm:grid-cols-3">
                <div>
                  <div className="text-4xl font-semibold tracking-tight text-foreground">
                    2,400+
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Premium billboards
                  </p>
                </div>

                <div>
                  <div className="text-4xl font-semibold tracking-tight text-foreground">
                    40+
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Indian cities
                  </p>
                </div>

                <div>
                  <div className="text-4xl font-semibold tracking-tight text-foreground">
                    &lt;5 min
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Average booking time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
