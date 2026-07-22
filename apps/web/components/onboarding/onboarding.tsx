"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { AdvertiserFlow } from "@/components/onboarding/advertiser-flow";
import { ONBOARDING_ROLES } from "@/components/onboarding/constants";
import { OnboardingHeader } from "@/components/onboarding/onboarding-header";
import { OwnerFlow } from "@/components/onboarding/owner-flow";
import { RoleSelector } from "@/components/onboarding/role-selector";
import { onboardingTransition } from "@/lib/motion";
import type { UserRole } from "@/lib/types";

export function Onboarding() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [step, setStep] = useState<"role" | "advertiser" | "owner">("role");

  const continueAction = () => {
    if (selectedRole === "advertiser") {
      setStep("advertiser");
      return;
    }

    if (selectedRole === "owner") {
      setStep("owner");
    }
  };

  const backAction = () => {
    setStep("role");
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {step === "role" && (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={onboardingTransition}
              className="p-10"
            >
              <OnboardingHeader />

              <RoleSelector
                roles={ONBOARDING_ROLES}
                selectedRole={selectedRole}
                onSelectAction={setSelectedRole}
              />

              <div className="mt-10">
                <button
                  type="button"
                  disabled={!selectedRole}
                  onClick={continueAction}
                  className="h-12 w-full rounded-sm font-semibold text-white bg-red-600 transition hover:opacity-85 cursor-pointer disabled:pointer-events-none disabled:opacity-80"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === "advertiser" && (
            <motion.div
              key="advertiser-flow"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={onboardingTransition}
              className="p-10"
            >
              <AdvertiserFlow
                onBackAction={backAction}
                selectedRole={selectedRole}
              />
            </motion.div>
          )}

          {step === "owner" && (
            <motion.div
              key="owner-flow"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={onboardingTransition}
              className="p-10"
            >
              <OwnerFlow
                onBackAction={backAction}
                selectedRole={selectedRole}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
