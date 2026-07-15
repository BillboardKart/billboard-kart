"use client";

import { motion } from "framer-motion";
import {
  Brain,
  CalendarDays,
  FileSignature,
  ImageIcon,
  MapPinned,
  Sparkles,
} from "lucide-react";

interface Feature {
  readonly title: string;
  readonly description: string;
  readonly icon: React.ElementType;
  readonly accent: string;
}

const features: readonly Feature[] = [
  {
    title: "Live Marketplace",
    description:
      "Browse verified billboard inventory across cities with live availability, pricing and specifications.",
    icon: MapPinned,
    accent: "bg-red-50 text-red-600",
  },
  {
    title: "Instant Booking",
    description:
      "Reserve premium billboard locations in minutes instead of waiting days for agencies and brokers.",
    icon: CalendarDays,
    accent: "bg-blue-50 text-blue-600",
  },
  {
    title: "AI Creative Studio",
    description:
      "Generate billboard creatives, headlines and campaign variations that fit every screen size automatically.",
    icon: Brain,
    accent: "bg-violet-50 text-violet-600",
  },
  {
    title: "Automatic Asset Review",
    description:
      "Every upload is validated for resolution, aspect ratio, readability and billboard compliance before launch.",
    icon: ImageIcon,
    accent: "bg-amber-50 text-amber-600",
  },
  {
    title: "Digital Contracts",
    description:
      "Complete agreements online with secure signatures and launch campaigns without endless paperwork.",
    icon: FileSignature,
    accent: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Campaign Intelligence",
    description:
      "Measure impressions, estimated reach and audience demographics with AI-powered campaign analytics.",
    icon: Sparkles,
    accent: "bg-pink-50 text-pink-600",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative border-t border-border bg-background py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.55,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-red-600">
            Platform
          </span>

          <h2 className="mt-8 text-balance text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
            Everything required to launch
            <br />
            outdoor campaigns faster.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
            BillboardRent combines discovery, booking, creative generation,
            contracts and campaign management into one modern platform for
            advertisers.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
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
                  delay: index * 0.08,
                  duration: 0.45,
                }}
                whileHover={{
                  y: -6,
                }}
                className="group rounded-4xl border border-border bg-card p-8 transition-all duration-300 hover:border-red-600/20 hover:shadow-xl"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.accent}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </div>

                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </p>

                <div className="mt-10 flex items-center gap-2 text-sm font-medium text-red-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 5 7 7-7 7" />
                  </svg>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.25,
            duration: 0.6,
          }}
          className="mt-28 overflow-hidden rounded-[40px] border border-border bg-card"
        >
          <div className="grid lg:grid-cols-[1.3fr_0.7fr]">
            <div className="p-10 sm:p-14">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
                Why companies switch
              </span>

              <h3 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                Traditional billboard buying
                <br />
                is broken.
              </h3>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Agencies rely on spreadsheets, phone calls and long approval
                cycles. BillboardRent replaces the entire workflow with a modern
                marketplace powered by AI.
              </p>

              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                <div>
                  <div className="text-5xl font-semibold text-red-600">10×</div>

                  <p className="mt-3 text-muted-foreground">
                    Faster campaign launches.
                  </p>
                </div>

                <div>
                  <div className="text-5xl font-semibold text-red-600">95%</div>

                  <p className="mt-3 text-muted-foreground">
                    Less manual coordination.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-border bg-muted/30 p-10 lg:border-l lg:border-t-0">
              <div className="space-y-8">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Before
                  </div>

                  <ul className="mt-5 space-y-4 text-muted-foreground">
                    <li>• Multiple brokers</li>
                    <li>• Manual quotations</li>
                    <li>• Email approvals</li>
                    <li>• Offline contracts</li>
                    <li>• Weeks to launch</li>
                  </ul>
                </div>

                <div className="h-px bg-border" />

                <div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-red-600">
                    With BillboardRent
                  </div>

                  <ul className="mt-5 space-y-4">
                    <li>✓ Live marketplace</li>
                    <li>✓ AI recommendations</li>
                    <li>✓ Instant booking</li>
                    <li>✓ Digital contracts</li>
                    <li>✓ Launch within hours</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
