"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { ONBOARDING_ROLES } from "@/components/onboarding/constants";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { OnboardingHeader } from "@/components/onboarding/onboarding-header";
import { RoleSelector } from "@/components/onboarding/role-selector";
import { onboardingTransition } from "@/lib/motion";
import type { UserRole } from "@/lib/types";

export function Onboarding() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [step, setStep] = useState<"role" | "form">("role");

  const continueAction = () => {
    if (selectedRole) setStep("form");
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

          {step === "form" && selectedRole && (
            <motion.div
              key={`${selectedRole}-form`}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={onboardingTransition}
              className="p-10"
            >
              <OnboardingForm
                selectedRole={selectedRole}
                onBackAction={backAction}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
