import { lazy, Suspense, useEffect, useState } from "react";
import type { Billboard } from "@/lib/billboards";

const MapInner = lazy(() => import("./MapInner"));

interface MapViewProps {
  billboards: Billboard[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export function MapView(props: MapViewProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-full w-full animate-pulse bg-linear-to-br from-secondary via-muted to-secondary" />
    );
  }

  return (
    <Suspense
      fallback={
        <div className="h-full w-full animate-pulse bg-linear-to-br from-secondary via-muted to-secondary" />
      }
    >
      <MapInner {...props} />
    </Suspense>
  );
}
