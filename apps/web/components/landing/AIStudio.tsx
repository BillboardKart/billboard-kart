"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  WandSparkles,
  Images,
  BadgeCheck,
  BrainCircuit,
} from "lucide-react";
import Link from "next/link";

const previewImage =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80";

const features = [
  {
    icon: WandSparkles,
    title: "Generate creatives",
    description:
      "Create billboard-ready artwork from a simple prompt in seconds.",
  },
  {
    icon: Images,
    title: "Auto resize",
    description:
      "Every creative is exported to the exact billboard dimensions automatically.",
  },
  {
    icon: BadgeCheck,
    title: "Brand safe",
    description:
      "AI validates typography, spacing, readability and compliance before publishing.",
  },
  {
    icon: BrainCircuit,
    title: "Performance insights",
    description:
      "Receive AI suggestions to improve campaign visibility and engagement.",
  },
] as const;

export default function AIStudio() {
  return (
    <section
      id="ai"
      className="relative overflow-hidden border-t border-border py-32"
    >
      <div className="absolute inset-0 -z-10 bg-background" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          {/* Left Content */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
              <Sparkles className="h-4 w-4 text-red-600" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                AI Studio
              </span>
            </div>

            <h2 className="mt-8 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Design billboard
              <br />
              campaigns in
              <span className="text-red-600"> minutes.</span>
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
              Generate production-ready billboard creatives using AI. Every
              design is automatically adapted to the selected billboard size,
              location and viewing distance.
            </p>

            <div className="mt-12 space-y-8">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    whileHover={{
                      x: 8,
                    }}
                    className="flex items-start gap-5"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                      <Icon className="h-5 w-5" strokeWidth={2.2} />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>

                      <p className="mt-2 leading-7 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Link
              href="/browse"
              className="group mt-14 inline-flex h-14 items-center gap-3 rounded-sm bg-red-600 px-7 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-red-700"
            >
              Try AI Studio
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right Content */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[36px] border border-border bg-card shadow-2xl">
              {/* Browser Header */}

              <div className="flex h-14 items-center justify-between border-b border-border px-6">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <div className="rounded-full bg-muted px-4 py-1 text-xs text-muted-foreground">
                  ai.billboardrent.com
                </div>
              </div>

              {/* App */}

              <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
                {/* Sidebar */}

                <div className="border-r border-border bg-muted/20 p-6">
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <div className="text-sm font-semibold">Prompt</div>

                    <div className="mt-4 rounded-xl bg-muted p-4 text-sm leading-6 text-muted-foreground">
                      Create a luxury fashion billboard for Mumbai using bold
                      typography and a minimal black aesthetic.
                    </div>

                    <button className="mt-5 flex h-11 w-full items-center justify-center rounded-sm bg-red-600 text-sm font-semibold text-white transition hover:bg-red-700">
                      Generate
                    </button>
                  </div>

                  <div className="mt-6 rounded-2xl border border-border bg-background p-5">
                    <div className="text-sm font-semibold">Campaign</div>

                    <div className="mt-4 space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">City</span>

                        <span>Mumbai</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Billboard</span>

                        <span>48 × 14 ft</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Format</span>

                        <span>Digital LED</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview */}

                <div className="bg-background p-6">
                  <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
                    <Image
                      src={previewImage}
                      alt="AI generated billboard"
                      fill
                      unoptimized
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute left-6 right-6 bottom-6 rounded-2xl bg-white/10 p-5 text-white backdrop-blur-xl">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70">
                        <Sparkles className="h-3 w-3" />
                        AI Generated Preview
                      </div>

                      <h3 className="mt-4 text-3xl font-semibold leading-tight">
                        Summer Collection
                      </h3>

                      <p className="mt-2 max-w-sm text-sm text-white/80">
                        Automatically optimized for readability from over 150
                        metres away.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card */}

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
                delay: 0.35,
              }}
              className="absolute -bottom-8 -left-8 hidden w-72 rounded-3xl border border-border bg-background p-6 shadow-xl lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <Sparkles className="h-5 w-5" />
                </div>

                <div>
                  <div className="text-sm font-semibold">
                    Generated Successfully
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Ready for publishing
                  </div>
                </div>
              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{
                    width: "0%",
                  }}
                  whileInView={{
                    width: "100%",
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 1.4,
                    delay: 0.4,
                  }}
                  className="h-full rounded-full bg-red-600"
                />
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Creative generated in under <strong>4.2 seconds</strong>.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
