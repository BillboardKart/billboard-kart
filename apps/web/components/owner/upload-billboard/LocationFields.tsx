"use client";

import { Field, TextInput } from "./ui";
import { MapView } from "@/components/map/MapView";
import { BillboardFormState } from "@/types/owner";

export default function LocationFields({
  form,
  updateField,
  errors,
  mapsLink,
  setMapsLink,
}: {
  form: BillboardFormState;
  updateField: <K extends keyof BillboardFormState>(
    key: K,
    value: BillboardFormState[K],
  ) => void;
  errors: Record<string, string>;
  mapsLink: string;
  setMapsLink: (v: string) => void;
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-[24px]">
        <Field
          label="Area / Locality"
          required
          error={errors.area}
          className="flex-1"
        >
          <div data-error={!!errors.area}>
            <TextInput
              value={form.area}
              onChange={(v) => updateField("area", v)}
              placeholder="e.g. Downtown, Sector 4"
              invalid={!!errors.area}
            />
          </div>
        </Field>
        <Field
          label="Landmark"
          required
          error={errors.landmark}
          className="flex-1"
        >
          <div data-error={!!errors.landmark}>
            <TextInput
              value={form.landmark}
              onChange={(v) => updateField("landmark", v)}
              placeholder="e.g. Near Central Mall"
              invalid={!!errors.landmark}
            />
          </div>
        </Field>
      </div>

      <div className="flex flex-col sm:flex-row gap-[16px]">
        <Field label="Latitude" className="flex-1">
          <TextInput
            value={form.latitude}
            onChange={(v) => updateField("latitude", v)}
            placeholder="e.g. 28.6139"
          />
        </Field>
        <Field label="Longitude" className="flex-1">
          <TextInput
            value={form.longitude}
            onChange={(v) => updateField("longitude", v)}
            placeholder="e.g. 77.2090"
          />
        </Field>
      </div>

      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-[12px]">
          <div className="flex-1 h-px bg-[#e5e5e5]" />
          <span className="text-[14px] text-[#737373]">or</span>
          <div className="flex-1 h-px bg-[#e5e5e5]" />
        </div>
        <Field label="Paste Google Maps link">
          <TextInput
            value={mapsLink}
            onChange={setMapsLink}
            placeholder="e.g. https://maps.google.com/..."
            rounded="rounded-[8px]"
          />
        </Field>
      </div>

      <Field label="Pin location on map">
        <MapView
          latitude={parseFloat(form.latitude) || 19.076}
          longitude={parseFloat(form.longitude) || 72.8777}
          onLocationChange={(lat, lng) => {
            updateField("latitude", lat.toFixed(4));
            updateField("longitude", lng.toFixed(4));
          }}
        />
      </Field>
    </>
  );
}
