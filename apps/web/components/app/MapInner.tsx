"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, ZoomControl } from "react-leaflet";
import type { Billboard } from "@/lib/billboards";

interface MapInnerProps {
  billboards: Billboard[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

function priceIcon(
  price: number,
  active: boolean,
  status: Billboard["status"],
) {
  const bg = active
    ? "var(--primary)"
    : status === "booked"
      ? "#ffffff"
      : status === "premium"
        ? "#fbbf24"
        : "var(--primary)";
  const color = active
    ? "#fff"
    : status === "booked"
      ? "#111"
      : status === "premium"
        ? "#1a1a1a"
        : "#fff";
  const border = active
    ? "0 6px 24px rgba(242,84,45,0.4)"
    : "0 4px 14px rgba(0,0,0,0.18)";

  return L.divIcon({
    className: "billboard-price-marker",
    iconSize: [1, 1],
    iconAnchor: [0, 0],
    html: `<div style="
      transform: translate(-50%, -100%);
      display:inline-flex;align-items:center;gap:4px;
      padding:6px 12px;border-radius:999px;
      background:${bg};color:${color};
      font: 600 13px/1 'DM Sans', sans-serif;
      box-shadow:${border};
      white-space:nowrap;
      border: 1px solid rgba(0,0,0,0.06);
    ">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
      $${price.toLocaleString()}
    </div>`,
  });
}

export default function MapInner({
  billboards,
  activeId,
  onSelect,
}: MapInnerProps) {
  const center: [number, number] = [40.762, -73.982];

  return (
    <MapContainer
      center={center}
      zoom={13}
      zoomControl={false}
      scrollWheelZoom
      className="h-full w-full"
      /* Added explicit 100% dimensions and zIndex 0 to keep Leaflet contained */
      style={{ height: "100%", width: "100%", background: "var(--surface)", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <ZoomControl position="topright" />
      {billboards.map((b) => (
        <Marker
          key={b.id}
          position={[b.lat, b.lng]}
          icon={priceIcon(b.weeklyPrice, b.id === activeId, b.status)}
          eventHandlers={{ click: () => onSelect(b.id) }}
        />
      ))}
    </MapContainer>
  );
}
