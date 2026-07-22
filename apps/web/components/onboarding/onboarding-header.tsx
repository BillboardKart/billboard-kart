"use client";

import { Sparkles } from "lucide-react";

export function OnboardingHeader() {
  return (
    <header className="text-center">
      <div className="group inline-flex items-center gap-3 rounded-full border border-border/70 bg-card/70 px-5 py-2 backdrop-blur-sm transition-all duration-300 hover:border-red-600/30 hover:bg-card">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600/10 text-red-600">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
        </span>

        <span className="text-sm font-medium tracking-tight text-foreground">
          Welcome to BillboardKart
        </span>
      </div>

      <h1 className="mt-8 text-display text-5xl text-foreground md:text-6xl">
        Tell us how
        <br />
        you want to use
        <br />
        <span className="italic text-red-600 font-bold">BillboardKart</span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
        Choose the option that best describes you. We&apos;ll personalize your
        onboarding experience and set up the right dashboard, features, and
        workflow.
      </p>
    </header>
  );
}
