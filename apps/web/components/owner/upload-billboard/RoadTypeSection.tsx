"use client";

import { Field, Segmented } from "./ui";

export default function RoadTypeSection({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field
      label="Road / Junction Type"
      hint="What type of road or junction is the billboard located on?"
    >
      <Segmented
        wrap
        options={[
          "Highway",
          "Arterial Road",
          "Market Road",
          "Residential Road",
          "Signal/Junction",
          "Flyover",
          "Mall Frontage",
        ]}
        value={value}
        onChange={onChange}
      />
    </Field>
  );
}
