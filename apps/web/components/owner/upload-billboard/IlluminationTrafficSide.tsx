"use client";

import { Field, Segmented } from "./ui";

export default function IlluminationTrafficSide({
  illumination,
  onIlluminationChange,
  trafficSide,
  onTrafficSideChange,
}: {
  illumination: string;
  onIlluminationChange: (v: string) => void;
  trafficSide: string;
  onTrafficSideChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-[32px]">
      <Field
        label="Illumination"
        hint="Is this billboard illuminated at night?"
        className="flex-1"
      >
        <Segmented
          options={["Yes", "No"]}
          value={illumination}
          onChange={onIlluminationChange}
        />
      </Field>
      <Field
        label="Traffic Side"
        hint="Which side of traffic is the billboard on?"
        className="flex-1"
      >
        <Segmented
          options={["Left", "Right", "Not Applicable"]}
          value={trafficSide}
          onChange={onTrafficSideChange}
        />
      </Field>
    </div>
  );
}
