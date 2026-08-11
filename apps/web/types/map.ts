// types/map.ts
export interface MapViewProps {
  latitude: number;
  longitude: number;
  onLocationChange: (lat: number, lng: number) => void;
}
