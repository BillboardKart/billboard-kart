"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  ZoomControl,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect } from "react";

interface MapInnerProps {
  latitude: number;
  longitude: number;
  onLocationChange: (lat: number, lng: number) => void;
}

// Helper component to handle map click events for selecting locations
function LocationPicker({
  onLocationChange,
}: {
  onLocationChange: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// Helper component to dynamically re-center map when coordinates change externally
function MapViewController({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const map = useMap();
  useEffect(() => {
    if (!isNaN(latitude) && !isNaN(longitude)) {
      map.setView([latitude, longitude], map.getZoom(), {
        animate: true,
      });
    }
  }, [latitude, longitude, map]);
  return null;
}

// Custom modern orange marker pin icon matching branding
const pinIcon = L.divIcon({
  className: "custom-leaflet-pin",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  html: `<div style="
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background-color: #f97316;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
    border: 2px solid #ffffff;
  ">
    <div style="
      width: 8px;
      height: 8px;
      background-color: #ffffff;
      border-radius: 50%;
      transform: rotate(45deg);
    "></div>
  </div>`,
});

export default function MapInner({
  latitude,
  longitude,
  onLocationChange,
}: MapInnerProps) {
  const center: [number, number] = [
    !isNaN(latitude) ? latitude : 19.076,
    !isNaN(longitude) ? longitude : 72.8777,
  ];

  return (
    <MapContainer
      center={center}
      zoom={14}
      zoomControl={false}
      scrollWheelZoom={true}
      className="h-full w-full"
      style={{
        height: "100%",
        width: "100%",
        background: "var(--surface)",
        zIndex: 0,
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <ZoomControl position="topright" />
      <LocationPicker onLocationChange={onLocationChange} />
      <MapViewController latitude={latitude} longitude={longitude} />

      {!isNaN(latitude) && !isNaN(longitude) && (
        <Marker
          position={[latitude, longitude]}
          icon={pinIcon}
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target as L.Marker;
              const position = marker.getLatLng();
              onLocationChange(position.lat, position.lng);
            },
          }}
        />
      )}
    </MapContainer>
  );
}
