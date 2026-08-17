"use client";

import { cn, statusStyles, type Status } from "./types";

export default function StatusBadge({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) {
  const needsDocs = status === "Needs documents";
  return (
    <span
      className={cn(
        "rounded-md px-2 py-0.5 text-xs font-medium",
        statusStyles[status],
        className,
      )}
    >
      {needsDocs ? "Need Documentation" : status}
    </span>
  );
}
