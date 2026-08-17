"use client";

import { Field, TextInput } from "./ui";

export default function TrafficEstimateSection({
  dailyTraffic,
  onDailyTrafficChange,
  peakHours,
  onPeakHoursChange,
  mix,
  onMixChange,
}: {
  dailyTraffic: string;
  onDailyTrafficChange: (v: string) => void;
  peakHours: string;
  onPeakHoursChange: (v: string) => void;
  mix: string;
  onMixChange: (v: string) => void;
}) {
  return (
    <Field
      label="Traffic Estimate"
      optional
      hint="Provide traffic details if known. This helps our advertisers find your billboard."
    >
      <div className="flex flex-col sm:flex-row gap-[16px]">
        <div className="flex-1 flex flex-col gap-[8px]">
          <span className="text-[12px] text-[#737373]">Daily traffic</span>
          <TextInput
            value={dailyTraffic}
            onChange={onDailyTrafficChange}
            placeholder="e.g. 50,000 vehicles/day"
            rounded="rounded-[8px]"
          />
        </div>
        <div className="flex-1 flex flex-col gap-[8px]">
          <span className="text-[12px] text-[#737373]">Peak hours</span>
          <TextInput
            value={peakHours}
            onChange={onPeakHoursChange}
            placeholder="e.g. 8AM–10AM, 5PM–8PM"
            rounded="rounded-[8px]"
          />
        </div>
        <div className="flex-1 flex flex-col gap-[8px]">
          <span className="text-[12px] text-[#737373]">
            Vehicle/Pedestrian mix
          </span>
          <TextInput
            value={mix}
            onChange={onMixChange}
            placeholder="e.g. 70% vehicles, 30% pedestrians"
            rounded="rounded-[8px]"
          />
        </div>
      </div>
    </Field>
  );
}
