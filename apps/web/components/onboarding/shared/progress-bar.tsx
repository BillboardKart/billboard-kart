"use client";

import { cn } from "@/lib/utils";

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
  className?: string;
};

export function ProgressBar({
  currentStep,
  totalSteps,
  className,
}: ProgressBarProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-primary">
          Step {currentStep} of {totalSteps}
        </span>

        <span className="text-sm text-muted-foreground">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>

      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-2 flex-1 rounded-full transition-colors duration-300",
              index < currentStep ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}
