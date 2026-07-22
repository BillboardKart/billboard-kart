"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import type { UserRole } from "@/lib/types";

type OnboardingFooterProps = {
  selectedRole: UserRole | null;
};

export function OnboardingFooter({ selectedRole }: OnboardingFooterProps) {
  return (
    <footer className="mt-10 border-t border-border pt-6">
      <div className="flex flex-col items-center gap-4">
        <Button
          className="w-full rounded-xl"
          size="lg"
          disabled={!selectedRole}
        >
          Continue
        </Button>

        <Button
          asChild
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <Link href="/login?mode=register">
            <ArrowLeft className="h-4 w-4" />
            Back to sign up
          </Link>
        </Button>
      </div>
    </footer>
  );
}
