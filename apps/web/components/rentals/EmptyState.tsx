"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  readonly title?: string;
  readonly description?: string;
}

export default function EmptyState({
  title = "No rentals found",
  description = "Once you rent a billboard, your campaigns will appear here together with live AI insights and performance metrics.",
}: EmptyStateProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-[36px]
        border
        border-dashed
        border-border
        bg-card
        px-8
        py-24
        text-center
      "
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-muted">
        <Building2 className="h-9 w-9 text-red-600" />
      </div>
      <h2 className="mt-8 text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-4 max-w-lg leading-7 text-muted-foreground">
        {description}
      </p>
      <Button asChild size="lg" className="mt-10 bg-red-600 hover:bg-red-700">
        <Link href="/browse">
          Browse Billboards
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </motion.section>
  );
}
