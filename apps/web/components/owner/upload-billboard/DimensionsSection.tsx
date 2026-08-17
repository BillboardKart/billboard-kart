"use client";

import { Field, TextInput } from "./ui";

export default function DimensionsSection({
  width,
  height,
  onWidthChange,
  onHeightChange,
  widthError,
  heightError,
}: {
  width: string;
  height: string;
  onWidthChange: (v: string) => void;
  onHeightChange: (v: string) => void;
  widthError?: string;
  heightError?: string;
}) {
  return (
    <div className="flex gap-[16px]">
      <Field label="Width (ft)" required error={widthError} className="flex-1">
        <div data-error={!!widthError}>
          <TextInput
            value={width}
            onChange={onWidthChange}
            placeholder="48"
            invalid={!!widthError}
            rounded="rounded-[8px]"
          />
        </div>
      </Field>
      <Field
        label="Height (ft)"
        required
        error={heightError}
        className="flex-1"
      >
        <div data-error={!!heightError}>
          <TextInput
            value={height}
            onChange={onHeightChange}
            placeholder="14"
            invalid={!!heightError}
            rounded="rounded-[8px]"
          />
        </div>
      </Field>
    </div>
  );
}
