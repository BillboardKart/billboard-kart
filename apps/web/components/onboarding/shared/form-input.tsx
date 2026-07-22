"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type FormInputProps = {
  label: string;
  value: string;
  onChangeAction: (value: string) => void;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  icon?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  trailing?: React.ReactNode;
  className?: string;
  inputClassName?: string;
};

export function FormInput({
  label,
  value,
  onChangeAction,
  placeholder,
  type = "text",
  icon,
  required = false,
  disabled = false,
  error,
  helperText,
  trailing,
  className,
  inputClassName,
}: FormInputProps) {
  const hasError = Boolean(error);

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </label>

      <div
        className={cn(
          "flex h-12 items-center rounded-sm border bg-card px-4 transition-all",
          hasError
            ? "border-destructive focus-within:border-destructive"
            : "border-border focus-within:border-primary",
          disabled && "cursor-not-allowed opacity-60",
        )}
      >
        {icon && (
          <span className="mr-3 flex shrink-0 text-muted-foreground">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => onChangeAction(e.target.value)}
          className={cn(
            "flex-1 bg-transparent text-sm outline-none",
            "placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed",
            inputClassName,
          )}
        />

        {trailing}
      </div>

      {hasError ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}
