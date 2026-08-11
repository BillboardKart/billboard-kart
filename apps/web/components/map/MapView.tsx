import React, { lazy, Suspense, useEffect, useState } from "react";
import { MapViewProps } from "@/types/map";

//Leaflet Map Integration (Lazy Loaded)
const MapInner = lazy(() => import("../../components/map/GlobalMapInner"));

export function MapView({
  latitude,
  longitude,
  onLocationChange,
}: MapViewProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-48 w-full animate-pulse rounded-xl bg-linear-to-br from-secondary via-muted to-secondary" />
    );
  }

  return (
    <Suspense
      fallback={
        <div className="h-48 w-full animate-pulse rounded-xl bg-linear-to-br from-secondary via-muted to-secondary" />
      }
    >
      <div className="relative h-48 w-full overflow-hidden rounded-xl border border-border shadow-xs">
        <MapInner
          latitude={latitude}
          longitude={longitude}
          onLocationChange={onLocationChange}
        />
      </div>
    </Suspense>
  );
}
