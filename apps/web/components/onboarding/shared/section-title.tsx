"use client";

import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionTitle({
  title,
  description,
  className,
  align = "left",
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "space-y-2",
        align === "center" && "text-center",
        className,
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-7 text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
