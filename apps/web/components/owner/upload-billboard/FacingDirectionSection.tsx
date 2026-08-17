"use client";

import { Field, Segmented } from "./ui";

export default function FacingDirectionSection({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field
      label="Facing Direction"
      hint="Which direction does the billboard face?"
    >
      <Segmented
        options={["North", "South", "East", "West"]}
        value={value}
        onChange={onChange}
      />
    </Field>
  );
}
