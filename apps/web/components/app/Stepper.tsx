import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  label: string;
}

interface StepperProps {
  steps: Step[];
  current: number; // 1-based
}

export function Stepper({ steps, current }: StepperProps) {
  return (
    <ol className="flex w-full items-center gap-2 sm:gap-3">
      {steps.map((step, i) => {
        const idx = i + 1;
        const complete = idx < current;
        const active = idx === current;
        return (
          <li
            key={step.label}
            className="flex flex-1 items-center gap-2 sm:gap-3"
          >
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold sm:h-9 sm:w-9 sm:text-sm",
                  complete && "bg-foreground text-background",
                  active && "bg-red-600 text-white",
                  !complete &&
                    !active &&
                    "border border-border text-muted-foreground",
                )}
              >
                {complete ? <Check className="h-4 w-4" strokeWidth={3} /> : idx}
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-medium uppercase tracking-wider text-red-600">
                  Step {idx}
                </div>
                <div
                  className={cn(
                    "truncate text-sm font-semibold",
                    active ? "text-red-600" : "text-foreground",
                  )}
                >
                  {step.label}
                </div>
              </div>
            </div>
            {idx < steps.length && (
              <div
                className={cn(
                  "h-px flex-1",
                  active
                    ? "bg-primary/40"
                    : complete
                      ? "bg-foreground/70"
                      : "bg-border",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
