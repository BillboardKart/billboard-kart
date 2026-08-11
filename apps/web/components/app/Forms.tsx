import React from "react";

import { FormInputProps } from "@/types/form";
import { ShieldAlert } from "lucide-react";

export const FormInput: React.FC<FormInputProps> = ({
  label,
  icon,
  error,
  required,
  className = "",
  ...props
}) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
      {icon && <span className="text-muted-foreground">{icon}</span>}
      {label}
      {required && <span className="text-orange-500">*</span>}
    </label>
    <input
      className={`w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground/60 focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 ${
        error
          ? "border-destructive focus:border-destructive"
          : "border-border focus:border-orange-500"
      } ${className}`}
      {...props}
    />
    {error && (
      <p className="text-xs text-destructive flex items-center gap-1 mt-0.5">
        <ShieldAlert className="h-3 w-3" />
        {error}
      </p>
    )}
  </div>
);
