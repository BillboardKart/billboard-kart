/**
 * Centralized CARTO basemap tile URL builder.
 *
 * CARTO now requires `?key=` on basemaps.cartocdn.com requests, otherwise
 * tiles render an "API key is required" watermark.
 * See: https://carto.com/basemaps + https://carto.com/basemaps/apikey
 *
 * Client components can only read `NEXT_PUBLIC_*` vars, so the key must be
 * exposed as NEXT_PUBLIC_CARTO_BASE_MAP_API_KEY. We fall back to the legacy
 * NEXT_CARTO_BASE_MAP_API_KEY name for backwards compat (server-side only).
 */
export function getCartoTileUrl(): string {
  const apiKey =
    process.env.NEXT_PUBLIC_CARTO_BASE_MAP_API_KEY ??
    process.env.NEXT_CARTO_BASE_MAP_API_KEY ??
    "";

  const base =
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

  return apiKey ? `${base}?key=${apiKey}` : base;
}

export const CARTO_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>';
