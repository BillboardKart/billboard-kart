// app/(auth)/login/page.tsx
"use client";

// FIX: FIX ALL THE WARNINGS & TODOS BEFORE PUSHING THIS TO THE PRODUCTION
// WARNINGS ARE MENTIONED THROUGHOUT THE CODE

import { AnimatePresence, motion, Transition } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { getAuthCallbackUrl, getResetPasswordUrl } from "@/lib/appurl";
import { handleGoogleLogin } from "@/lib/google-oauth/login";
import { fieldVariants, slideUp } from "@/lib/motion";
import { createClient } from "@/lib/supabase/client";
import { CurrentUserResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user-store";

export default function AuthPageWrapper() {
  return (
    <Suspense>
      <AuthPage />
    </Suspense>
  );
}

type AuthMode = "signin" | "register" | "forgot";

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"] as const;

const GoogleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

function AuthPage() {
  const hydrateUser = useUserStore((state) => state.hydrate);

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode: AuthMode =
    searchParams.get("mode") === "register"
      ? "register"
      : searchParams.get("mode") === "forgot"
        ? "forgot"
        : "signin";

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [agree, setAgree] = useState(false);

  const [isResetSent, setIsResetSent] = useState(false);
  const [resetCooldown, setResetCooldown] = useState(0);
  const [resetError, setResetError] = useState("");
  const [isResetLoading, setIsResetLoading] = useState(false);

  const isRegister = mode === "register";
  const isForgot = mode === "forgot";
  const strength = getPasswordStrength(password);

  const switchMode = useCallback((newMode: AuthMode) => {
    setMode(newMode);
    setError("");
    setFieldErrors({});
    setEmailNotConfirmed(false);

    let url = "/login";

    if (newMode === "register") {
      url = "/login?mode=register";
    } else if (newMode === "forgot") {
      url = "/login?mode=forgot";
    }

    window.history.replaceState(null, "", url);

    if (newMode !== "forgot") {
      setIsResetSent(false);
    }
  }, []);

  function validateField(name: string, value: string) {
    switch (name) {
      case "businessName":
        return value.length < 2 ? "Business name is required" : "";
      case "fullName":
        return value.length < 2 ? "Full name is required" : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Enter a valid email"
          : "";
      case "password":
        return value.length < 8 ? "Password must be at least 8 characters" : "";
      case "confirmPassword":
        return value !== password ? "Passwords do not match" : "";
      default:
        return "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setEmailNotConfirmed(false);

    if (isRegister) {
      const fields = {
        businessName,
        fullName,
        email,
        password,
        confirmPassword,
      };

      const errors: Record<string, string> = {};

      for (const [key, val] of Object.entries(fields)) {
        const err = validateField(key, val);
        if (err) errors[key] = err;
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }
    } else {
      if (!email || !password) {
        setError("Please fill in all fields.");
        return;
      }
    }

    setIsLoading(true);
    try {
      const supabase = createClient();

      if (isRegister) {
        // console.log("[Auth] Attempting sign-up for:", email);
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: getAuthCallbackUrl(),
            data: {
              full_name: fullName,
              business_name: businessName,
            },
          },
        });

        if (signUpError) {
          console.error(
            "[Auth] Sign-up error:",
            signUpError.message,
            signUpError,
          );

          if (signUpError.message.toLowerCase().includes("rate limit")) {
            setError(
              "Too many sign-up attempts. Please wait a few minutes before trying again.",
            );
          } else {
            setError(signUpError.message);
          }
          return;
        }

        if (data.user && !data.session) {
          console.log("[Auth] Email confirmation required for: ", email);
          setConfirmationEmail(email);
          return;
        }

        // Store partial user immediately
        hydrateUser({
          authenticated: true,
          isOnboarded: false,
          auth: {
            id: data.user!.id,
            email: data.user!.email ?? "",
            fullName: (data.user!.user_metadata?.full_name as string) ?? null,
            avatarUrl: (data.user!.user_metadata?.avatar_url as string) ?? null,
          },
        });

        router.push("/onboarding");
      } else {
        const { data, error: signInError } =
          await supabase.auth.signInWithPassword({ email, password });

        if (signInError) {
          console.error(
            "[Auth] Sign-in error:",
            signInError.message,
            signInError,
          );

          if (signInError.message === "Email not confirmed") {
            setEmailNotConfirmed(true);
          } else if (signInError.status === 429) {
            setError("Too many attempts. Please try again later.");
          } else {
            setError("Invalid email or password.");
          }

          return;
        }

        // const session = await supabase.auth.getSession();
        const accessToken = data.session?.access_token;
        if (!accessToken) throw new Error("Missing access token.");

        const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/me`;
        const response = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) {
          throw new Error("Failed to sync user session with backend database.");
        }

        const res: CurrentUserResponse = await response.json();

        if (!res.authenticated) {
          setError("Authentication failed. Please log in again.");
          return;
        }

        // NOTE: Hydrate Zustand (handles both partial & full user)
        hydrateUser(res);

        if (!res.isOnboarded) {
          // console.log("[Auth] User authenticated but not onboarded in DB. Redirecting...");
          setError("Authentication failed.");
          router.push("/onboarding");
          return;
        }

        switch (res.user.primaryRole) {
          case "owner":
            router.push("/account");
            break;

          case "advertiser":
          default:
            router.push("/browse");
            break;
        }
      }
    } catch (err) {
      console.error("[Auth] Unexpected error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendConfirmation() {
    setIsResending(true);
    try {
      console.log("[Auth] Resending confirmation email to:", email);

      const supabase = createClient();
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (resendError) {
        console.error("[Auth] Resend error:", resendError.message);
        setError(resendError.message);
      } else {
        setEmailNotConfirmed(false);
        setError("Confirmation email resent. Check your inbox.");
      }
    } catch (err) {
      console.error("[Auth] Resend unexpected error:", err);
      setError("Failed to resend. Please try again.");
    } finally {
      setIsResending(false);
    }
  }

  async function onGoogleLogin() {
    setIsGoogleLoading(true);
    try {
      await handleGoogleLogin();
    } catch (err) {
      console.error("[Auth] Google login error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Google sign-in failed. Please try again.",
      );
      setIsGoogleLoading(false);
    }
  }

  // Email confirmation sent screen
  //   if (confirmationEmail) {
  //     return (
  //       <motion.div
  //         {...slideUp}
  //         className="w-full max-w-sm border border-border rounded-lg bg-card p-8 text-center"
  //       >
  //         <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
  //           <Mail className="h-5 w-5 text-muted-foreground" />
  //         </div>
  //         <h1 className="font-soria text-2xl font-normal text-foreground">
  //           Check your email
  //         </h1>
  //         <p className="mt-2 text-sm text-muted-foreground">
  //           We sent a confirmation link to{" "}
  //           <span className="font-medium text-foreground">
  //             {confirmationEmail}
  //           </span>
  //         </p>
  //         <p className="mt-1 text-sm text-muted-foreground">
  //           Click the link in the email to activate your account, then sign in.
  //         </p>
  //         <Button
  //           variant="outline"
  //           className="mt-6 w-full"
  //           onClick={() => {
  //             setConfirmationEmail("");
  //             switchMode("signin");
  //           }}
  //         >
  //           Go to sign in
  //         </Button>
  //       </motion.div>
  //     );
  //   }

  // --- NEW FORGOT PASSWORD LOGIC ---
  function startCooldown() {
    setResetCooldown(60);
    const interval = setInterval(() => {
      setResetCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function handleForgotSubmit(e: React.FormEvent) {
    e.preventDefault();

    // If already sent, handle the resend logic
    if (isResetSent) {
      if (resetCooldown > 0) return;
      setIsResetLoading(true);
      setResetError("");
      try {
        const supabase = createClient();
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: getResetPasswordUrl(),
        });
        startCooldown();
      } catch {
        setResetError("Failed to resend. Please try again.");
      } finally {
        setIsResetLoading(false);
      }
      return;
    }

    // Standard initial send logic
    setResetError("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setResetError("Enter a valid email address.");
      return;
    }

    setIsResetLoading(true);
    try {
      const supabase = createClient();
      const { error: resetSupabaseError } =
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: getResetPasswordUrl(),
        });

      if (resetSupabaseError) {
        setResetError(resetSupabaseError.message);
        return;
      }

      setIsResetSent(true);
      startCooldown();
    } catch {
      setResetError("Something went wrong. Please try again.");
    } finally {
      setIsResetLoading(false);
    }
  }

  const smoothTransition: Transition = { duration: 0.3, ease: "easeInOut" };

  return (
    <div className="h-full w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Left: Hero Section (Preserved) */}
          <section className="relative overflow-hidden rounded-3xl bg-[#3a1608] p-8 text-white md:p-12">
            <span className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">
              BillboardKart
            </span>
            <h1 className="mt-8 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              Start advertising
              <br />
              smarter today
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
              Reach the right audience with premium billboard inventory,
              transparent pricing, and a streamlined booking experience.
            </p>
            <div className="mx-auto mt-10 flex max-w-md justify-center md:mt-14">
              <div className="relative aspect-5/3 w-full rounded-2xl bg-white/4 p-6">
                <div className="absolute left-8 top-6 flex h-24 w-40 items-center justify-center rounded-sm bg-primary text-sm font-semibold shadow-lg md:h-32 md:w-56">
                  Digital Billboard
                </div>
                <div className="absolute bottom-10 right-8 flex h-16 w-36 items-center justify-center rounded-sm bg-white/10 text-xs text-white/80 backdrop-blur md:h-20 md:w-48 md:text-sm">
                  Outdoor advertising visual
                </div>
                <div className="absolute left-1/2 top-6 h-[70%] w-px -translate-x-1/2 bg-white/15" />
                <div className="absolute bottom-6 left-8 right-8 h-px bg-white/15" />
              </div>
            </div>
            <ul className="mt-10 space-y-4 md:mt-14">
              {[
                "No hidden fees",
                "Cancel anytime",
                "Dedicated support team",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium md:text-base">{f}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Right: Form Section */}
          <motion.section
            layout
            className="rounded-3xl bg-card p-8 md:p-12 border border-border shadow-sm"
          >
            {confirmationEmail ? (
              <motion.div
                {...slideUp}
                className="mx-auto w-full max-w-sm border p-8 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <h1 className="font-soria text-2xl font-normal text-foreground">
                  Check your email
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  We sent a confirmation link to{" "}
                  <span className="font-medium text-foreground">
                    {confirmationEmail}
                  </span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Click the link in the email to activate your account, then
                  sign in.
                </p>
                <Button
                  variant="outline"
                  className="mt-6 w-full"
                  onClick={() => {
                    setConfirmationEmail("");
                    switchMode("signin");
                  }}
                >
                  Go to sign in
                </Button>
              </motion.div>
            ) : (
              <>
                {/* Dynamic Headers */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={mode + (isResetSent ? "-sent" : "")}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={smoothTransition}
                  >
                    {isForgot && isResetSent ? (
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                          Check your email
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                          We sent a password reset link to{" "}
                          <span className="font-medium text-foreground">
                            {email}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                          {isForgot
                            ? "Forgot password?"
                            : isRegister
                              ? "Create your account"
                              : "Welcome back"}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {isForgot
                            ? "Enter your email and we'll send you a reset link."
                            : isRegister
                              ? "Join thousands of advertisers on BillboardKart"
                              : "Sign in to your account to continue."}
                        </p>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Error Warnings */}
                <AnimatePresence initial={false}>
                  {emailNotConfirmed && !isForgot && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        marginTop: "1.5rem",
                      }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={smoothTransition}
                      className="mb-2 overflow-hidden rounded-md border border-border bg-muted p-3"
                    >
                      <p className="text-sm text-foreground font-medium">
                        Email not confirmed
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Check your inbox for a confirmation link. Didn&apos;t
                        receive it?
                      </p>
                      <button
                        type="button"
                        className="mt-3 flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-xs font-medium text-foreground transition hover:bg-accent disabled:opacity-50"
                        onClick={() => {
                          handleResendConfirmation();
                        }}
                        disabled={isResending}
                      >
                        {isResending && (
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        )}
                        Resend confirmation email
                      </button>
                    </motion.div>
                  )}

                  {(error || resetError) && !emailNotConfirmed && (
                    <motion.p
                      layout
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        marginTop: "1.5rem",
                      }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={smoothTransition}
                      className={cn(
                        "text-sm overflow-hidden",
                        (error || resetError).includes("resent")
                          ? "text-foreground"
                          : "text-destructive",
                      )}
                    >
                      {isForgot ? resetError : error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.form
                  layout
                  className="mt-8"
                  onSubmit={isForgot ? handleForgotSubmit : handleSubmit}
                >
                  {/* Dynamic Inputs Wrapper */}
                  <AnimatePresence initial={false} mode="sync">
                    {!isResetSent && (
                      <motion.div
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={smoothTransition}
                        className="space-y-5 overflow-hidden"
                      >
                        {/* Register Fields */}
                        <AnimatePresence initial={false}>
                          {isRegister && (
                            <motion.div
                              layout
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              variants={fieldVariants}
                              transition={smoothTransition}
                              className="overflow-hidden"
                            >
                              <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                  <Field label="Business Name">
                                    <IconInput
                                      icon={<Briefcase className="h-4 w-4" />}
                                      value={businessName}
                                      onChange={(val) => {
                                        setBusinessName(val);
                                        if (fieldErrors.businessName)
                                          setFieldErrors((p) => ({
                                            ...p,
                                            businessName: "",
                                          }));
                                      }}
                                      placeholder="Acme Salon"
                                    />
                                  </Field>
                                  {fieldErrors.businessName && (
                                    <p className="mt-1 text-xs text-destructive">
                                      {fieldErrors.businessName}
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <Field label="Full Name">
                                    <IconInput
                                      icon={<User className="h-4 w-4" />}
                                      value={fullName}
                                      onChange={(val) => {
                                        setFullName(val);
                                        if (fieldErrors.fullName)
                                          setFieldErrors((p) => ({
                                            ...p,
                                            fullName: "",
                                          }));
                                      }}
                                      placeholder="Jane Doe"
                                    />
                                  </Field>
                                  {fieldErrors.fullName && (
                                    <p className="mt-1 text-xs text-destructive">
                                      {fieldErrors.fullName}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Shared Email Field */}
                        <motion.div layout>
                          <Field label="Email address">
                            <IconInput
                              icon={<Mail className="h-4 w-4" />}
                              type="email"
                              value={email}
                              onChange={(val) => {
                                setEmail(val);
                                if (fieldErrors.email)
                                  setFieldErrors((p) => ({ ...p, email: "" }));
                              }}
                              placeholder="jane@company.com"
                            />
                          </Field>
                          {fieldErrors.email && (
                            <p className="mt-1 text-xs text-destructive">
                              {fieldErrors.email}
                            </p>
                          )}
                        </motion.div>

                        {/* Password Fields (Hidden in Forgot Mode) */}
                        <AnimatePresence initial={false}>
                          {!isForgot && (
                            <motion.div
                              layout
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={smoothTransition}
                              className="overflow-hidden"
                            >
                              <motion.div layout>
                                <Field label="Password">
                                  <IconInput
                                    icon={<Lock className="h-4 w-4" />}
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(val) => {
                                      setPassword(val);
                                      if (fieldErrors.password)
                                        setFieldErrors((p) => ({
                                          ...p,
                                          password: "",
                                        }));
                                    }}
                                    placeholder={
                                      isRegister
                                        ? "Min. 8 characters"
                                        : "Enter your password"
                                    }
                                    trailing={
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setShowPassword((v) => !v)
                                        }
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                      >
                                        {showPassword ? (
                                          <EyeOff className="h-4 w-4" />
                                        ) : (
                                          <Eye className="h-4 w-4" />
                                        )}
                                      </button>
                                    }
                                  />
                                </Field>

                                {/* Password Strength UI */}
                                <AnimatePresence initial={false}>
                                  {isRegister && password.length > 0 && (
                                    <motion.div
                                      layout
                                      initial={{
                                        opacity: 0,
                                        height: 0,
                                        marginTop: 0,
                                      }}
                                      animate={{
                                        opacity: 1,
                                        height: "auto",
                                        marginTop: "0.75rem",
                                      }}
                                      exit={{
                                        opacity: 0,
                                        height: 0,
                                        marginTop: 0,
                                      }}
                                      transition={smoothTransition}
                                      className="overflow-hidden"
                                    >
                                      <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">
                                          Password strength
                                        </span>
                                        <span className="font-medium text-primary">
                                          {strengthLabels[strength] ||
                                            strengthLabels[0]}
                                        </span>
                                      </div>
                                      <div className="mt-2 grid grid-cols-4 gap-2">
                                        {[0, 1, 2, 3].map((i) => (
                                          <div
                                            key={i}
                                            className={`h-1.5 rounded-full transition-colors duration-300 ${i < strength ? "bg-primary" : "bg-muted"}`}
                                          />
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                                {fieldErrors.password && (
                                  <p className="mt-1 text-xs text-destructive">
                                    {fieldErrors.password}
                                  </p>
                                )}

                                {/* Trigger: Forgot Password Switch */}
                                {!isRegister && (
                                  <motion.div
                                    layout
                                    className="mt-3 text-right"
                                  >
                                    <button
                                      type="button"
                                      onClick={() => switchMode("forgot")}
                                      className="text-xs text-muted-foreground underline hover:text-foreground transition-colors cursor-pointer disabled:cursor-not-allowed"
                                    >
                                      Forgot password?
                                    </button>
                                  </motion.div>
                                )}
                              </motion.div>

                              {/* Confirm Password (Register only) */}
                              <AnimatePresence initial={false}>
                                {isRegister && (
                                  <motion.div
                                    layout
                                    initial={{
                                      opacity: 0,
                                      height: 0,
                                      marginTop: 0,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      height: "auto",
                                      marginTop: "1.25rem",
                                    }}
                                    exit={{
                                      opacity: 0,
                                      height: 0,
                                      marginTop: 0,
                                    }}
                                    transition={smoothTransition}
                                    className="overflow-hidden"
                                  >
                                    <Field label="Confirm password">
                                      <IconInput
                                        icon={<Lock className="h-4 w-4" />}
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(val) => {
                                          setConfirmPassword(val);
                                          if (fieldErrors.confirmPassword)
                                            setFieldErrors((p) => ({
                                              ...p,
                                              confirmPassword: "",
                                            }));
                                        }}
                                        placeholder="Confirm your password"
                                      />
                                    </Field>
                                    {fieldErrors.confirmPassword && (
                                      <p className="mt-1 text-xs text-destructive">
                                        {fieldErrors.confirmPassword}
                                      </p>
                                    )}
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              {/* Terms Checkbox */}
                              <AnimatePresence initial={false}>
                                {isRegister && (
                                  <motion.label
                                    layout
                                    initial={{
                                      opacity: 0,
                                      height: 0,
                                      marginTop: 0,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      height: "auto",
                                      marginTop: "1.25rem",
                                    }}
                                    exit={{
                                      opacity: 0,
                                      height: 0,
                                      marginTop: 0,
                                    }}
                                    transition={smoothTransition}
                                    className="flex items-start gap-3 text-sm text-foreground overflow-hidden"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={agree}
                                      onChange={(e) =>
                                        setAgree(e.target.checked)
                                      }
                                      className="mt-0.5 h-4 w-4 rounded border-border accent-primary cursor-pointer disabled:cursor-not-allowed"
                                    />
                                    <span>
                                      I agree to the{" "}
                                      <Link
                                        className="font-medium text-red-600"
                                        href="#"
                                      >
                                        Terms of Service
                                      </Link>{" "}
                                      and{" "}
                                      <Link
                                        className="font-medium text-red-600"
                                        href="#"
                                      >
                                        Privacy Policy
                                      </Link>
                                    </span>
                                  </motion.label>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form Buttons & Actions Layer */}
                  <motion.div layout className="mt-6 space-y-5">
                    <motion.button
                      layout
                      type="submit"
                      disabled={
                        isLoading ||
                        isGoogleLoading ||
                        isResetLoading ||
                        (isForgot && isResetSent && resetCooldown > 0) ||
                        (isRegister && !agree)
                      }
                      className="flex w-full items-center justify-center rounded-sm py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 bg-red-600 hover:bg-red-600/80"
                    >
                      {(isLoading || isResetLoading) && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {isForgot && isResetSent
                        ? resetCooldown > 0
                          ? `Resend in ${resetCooldown}s`
                          : "Resend email"
                        : isForgot
                          ? "Send reset link"
                          : isRegister
                            ? "Create Account"
                            : "Sign In"}
                    </motion.button>

                    {/* Back to Login View (Visible in Forgot mode) */}
                    <AnimatePresence initial={false}>
                      {isForgot && (
                        <motion.div
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={smoothTransition}
                          className="text-center overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() => switchMode("signin")}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:cursor-not-allowed"
                          >
                            <ArrowLeft className="h-4 w-4" />
                            Back to login
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Social Login & Modes (Hidden in Forgot mode) */}
                    <AnimatePresence initial={false}>
                      {!isForgot && (
                        <motion.div
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={smoothTransition}
                          className="space-y-5 overflow-hidden"
                        >
                          <div className="flex items-center gap-4 py-2">
                            <div className="h-px flex-1 bg-border" />
                            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                              Or continue with
                            </span>
                            <div className="h-px flex-1 bg-border" />
                          </div>

                          <div className="grid">
                            <button
                              type="button"
                              onClick={() => {
                                onGoogleLogin();
                              }}
                              disabled={isGoogleLoading || isLoading}
                              className="flex items-center justify-center gap-2 rounded-sm border border-border py-3 text-sm font-medium text-foreground transition hover:bg-accent cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isGoogleLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <GoogleIcon />
                              )}
                              Continue with Google
                            </button>
                          </div>

                          <p className="pt-2 text-center text-sm text-muted-foreground">
                            {isRegister
                              ? "Already have an account? "
                              : "Don't have an account? "}
                            <button
                              type="button"
                              onClick={() =>
                                switchMode(isRegister ? "signin" : "register")
                              }
                              className="font-semibold cursor-pointer disabled:cursor-not-allowed text-red-600"
                              disabled={isLoading || isGoogleLoading}
                            >
                              {isRegister ? "Sign In" : "Create one"}
                            </button>
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.form>
              </>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  );
}

// HELPER COMPONENTS

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function IconInput({
  icon,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  trailing,
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 rounded-sm border border-border bg-white px-3.5 py-3 transition-colors focus-within:border-primary">
      <span className="text-muted-foreground">{icon}</span>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />

      {trailing}
    </div>
  );
}
