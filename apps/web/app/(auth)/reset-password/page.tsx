"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { slideUp } from "@/lib/motion";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type ResetStatus = "verifying" | "ready" | "error" | "success";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordSkeleton />}>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordSkeleton() {
  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm md:p-10">
      <div className="flex flex-col items-center text-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-4 text-sm text-muted-foreground">
          Verifying your reset link...
        </p>
      </div>
    </div>
  );
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  const initRef = useRef(false);

  const [status, setStatus] = useState<ResetStatus>("verifying");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    let active = true;

    async function initialise() {
      const params = new URLSearchParams(search);
      const supabase = createClient();

      const queryError = params.get("error_description") ?? params.get("error");

      if (queryError) {
        if (active) {
          setError(queryError);
          setStatus("error");
        }
        return;
      }

      try {
        const code = params.get("code");
        const tokenHash = params.get("token_hash");

        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) throw exchangeError;
        } else if (tokenHash) {
          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: "recovery",
          });

          if (verifyError) throw verifyError;
        } else {
          const hash = window.location.hash.replace(/^#/, "");
          const hashParams = new URLSearchParams(hash);
          const accessToken = hashParams.get("access_token");
          const refreshToken = hashParams.get("refresh_token");

          if (accessToken && refreshToken) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (sessionError) throw sessionError;
          } else {
            const {
              data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
              throw new Error(
                "This password reset link is invalid or has expired. Please request a new one.",
              );
            }
          }
        }

        // Keep tokens and one-time codes out of the browser history.
        window.history.replaceState(null, "", "/reset-password");

        if (active) setStatus("ready");
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "This password reset link is invalid or has expired. Please request a new one.",
          );
          setStatus("error");
        }
      }
    }

    void initialise();

    return () => {
      active = false;
    };
  }, [search]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    const errors: Record<string, string> = {};

    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      // The recovery session is no longer needed after the password change.
      await supabase.auth.signOut();

      setStatus("success");
      router.replace("/login?reset=success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update your password. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status === "verifying") {
    return <ResetPasswordSkeleton />;
  }

  if (status === "error") {
    return (
      <motion.div
        {...slideUp}
        className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-sm md:p-10"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-5 w-5 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Reset link unavailable
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>

        <Button asChild className="mt-6 w-full">
          <Link href="/login?mode=forgot">Request a new reset link</Link>
        </Button>

        <Link
          href="/login"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to login
        </Link>
      </motion.div>
    );
  }

  if (status === "success") {
    return (
      <motion.div
        {...slideUp}
        className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-sm md:p-10"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Password updated
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You can now sign in with your new password.
        </p>
        <Button asChild className="mt-6 w-full">
          <Link href="/login">Go to sign in</Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      {...slideUp}
      className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm md:p-10"
    >
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Set a new password
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Choose a strong password for your BillboardKart account.
      </p>

      {error && (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <PasswordField
          label="New password"
          value={password}
          onChangeAction={(value) => {
            setPassword(value);
            if (fieldErrors.password) {
              setFieldErrors((previous) => ({ ...previous, password: "" }));
            }
          }}
          placeholder="Min. 8 characters"
          autoComplete="new-password"
          showPassword={showPassword}
          onToggleVisibilityAction={() => setShowPassword((value) => !value)}
        />
        {fieldErrors.password && (
          <p className="text-xs text-destructive">{fieldErrors.password}</p>
        )}

        <PasswordField
          label="Confirm new password"
          value={confirmPassword}
          onChangeAction={(value) => {
            setConfirmPassword(value);
            if (fieldErrors.confirmPassword) {
              setFieldErrors((previous) => ({
                ...previous,
                confirmPassword: "",
              }));
            }
          }}
          placeholder="Re-enter your new password"
          autoComplete="new-password"
          showPassword={showPassword}
          onToggleVisibilityAction={() => setShowPassword((value) => !value)}
        />
        {fieldErrors.confirmPassword && (
          <p className="text-xs text-destructive">
            {fieldErrors.confirmPassword}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center rounded-sm bg-red-600 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-red-600/80 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update password
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to login
        </Link>
      </div>
    </motion.div>
  );
}

function PasswordField({
  label,
  value,
  onChangeAction,
  placeholder,
  autoComplete,
  showPassword,
  onToggleVisibilityAction,
}: {
  label: string;
  value: string;
  onChangeAction: (value: string) => void;
  placeholder: string;
  autoComplete: string;
  showPassword: boolean;
  onToggleVisibilityAction: () => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </span>

      <div className="flex w-full items-center gap-2 rounded-sm border border-border bg-white px-3.5 py-3 transition-colors focus-within:border-primary">
        <span className="text-muted-foreground">
          <Lock className="h-4 w-4" />
        </span>

        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(event) => onChangeAction(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cn(
            "flex-1 bg-transparent text-sm text-foreground outline-none",
            "placeholder:text-muted-foreground",
          )}
        />

        <button
          type="button"
          onClick={onToggleVisibilityAction}
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </label>
  );
}
