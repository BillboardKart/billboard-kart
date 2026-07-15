"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck2,
  CheckCircle2,
  CircleDot,
  Clock3,
  FileSignature,
  Rocket,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export type TimelineStatus = "completed" | "current" | "upcoming";

export interface TimelineItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly status: TimelineStatus;
}

interface RentalTimelineProps {
  readonly items: readonly TimelineItem[];
}

function getIcon(status: TimelineStatus) {
  switch (status) {
    case "completed":
      return CheckCircle2;

    case "current":
      return CircleDot;

    case "upcoming":
      return Clock3;
  }
}

function getBadgeVariant(
  status: TimelineStatus,
): "default" | "secondary" | "outline" {
  switch (status) {
    case "completed":
      return "outline";

    case "current":
      return "default";

    case "upcoming":
      return "secondary";
  }
}

export default function RentalTimeline({ items }: RentalTimelineProps) {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-red-600">
          Campaign Timeline
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          From booking to campaign completion
        </h2>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Follow every important milestone in your billboard campaign lifecycle.
        </p>
      </div>

      <Card className="rounded-4xl border-border shadow-none">
        <div className="relative p-8 lg:p-10">
          {/* Vertical Line */}

          <div className="absolute bottom-10 left-7.75 top-10 w-px bg-border lg:left-8.75" />

          <div className="space-y-10">
            {items.map((item, index) => {
              const Icon = getIcon(item.status);

              return (
                <motion.div
                  key={item.id}
                  initial={{
                    opacity: 0,
                    x: -15,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.35,
                  }}
                  className="relative flex gap-6"
                >
                  {/* Timeline Dot */}

                  <div
                    className={`
                      relative
                      z-10
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      bg-background

                      ${
                        item.status === "current"
                          ? "border-red-600 text-red-600"
                          : ""
                      }

                      ${
                        item.status === "completed"
                          ? "border-green-600 text-green-600"
                          : ""
                      }

                      ${
                        item.status === "upcoming"
                          ? "border-border text-muted-foreground"
                          : ""
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Content */}

                  <div className="flex-1 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-red-200 hover:shadow-md">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold">
                            {item.title}
                          </h3>

                          <Badge
                            variant={getBadgeVariant(item.status)}
                            className="rounded-full capitalize"
                          >
                            {item.status}
                          </Badge>
                        </div>

                        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium">
                        <CalendarCheck2 className="h-4 w-4 text-red-600" />

                        {item.date}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Summary */}

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="rounded-3xl border-border shadow-none">
          <div className="flex items-start gap-4 p-6">
            <div className="rounded-2xl bg-red-50 p-3 dark:bg-red-950/30">
              <FileSignature className="h-5 w-5 text-red-600" />
            </div>

            <div>
              <h3 className="font-semibold">Digital Contracts</h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Every booking is secured with legally verified digital
                agreements and invoices.
              </p>
            </div>
          </div>
        </Card>

        <Card className="rounded-3xl border-border shadow-none">
          <div className="flex items-start gap-4 p-6">
            <div className="rounded-2xl bg-red-50 p-3 dark:bg-red-950/30">
              <Rocket className="h-5 w-5 text-red-600" />
            </div>

            <div>
              <h3 className="font-semibold">AI Deployment</h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Our AI validates creative, dimensions and compliance before
                publishing.
              </p>
            </div>
          </div>
        </Card>

        <Card className="rounded-3xl border-border shadow-none">
          <div className="flex items-start gap-4 p-6">
            <div className="rounded-2xl bg-red-50 p-3 dark:bg-red-950/30">
              <Clock3 className="h-5 w-5 text-red-600" />
            </div>

            <div>
              <h3 className="font-semibold">Live Monitoring</h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Track campaign progress, occupancy and audience estimates
                throughout the rental period.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
