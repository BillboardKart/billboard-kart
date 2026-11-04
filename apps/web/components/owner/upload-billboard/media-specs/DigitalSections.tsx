"use client";

import { useState } from "react";
import { useBillboardFormStore } from "@/stores/billboard-form-store";
import {
  Input,
  SectionCard,
  SectionTitle,
  Select,
  Switch,
  SwitchRow,
  useMultiSelect,
} from "./ui";

function ScreenResolution() {
  const mediaSpecs = useBillboardFormStore((s) => s.form.mediaSpecs);
  const updateField = useBillboardFormStore((s) => s.updateField);

  const pixelWidth = (mediaSpecs.pixelWidth as string) ?? "";
  const pixelHeight = (mediaSpecs.pixelHeight as string) ?? "";
  const aspectRatio = (mediaSpecs.aspectRatio as string) ?? "";

  const setMediaSpec = (key: string, value: unknown) =>
    updateField("mediaSpecs", { ...mediaSpecs, [key]: value });

  return (
    <div className="bg-white rounded-xl relative">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="flex flex-col gap-4 px-[25px] py-6">
          <SectionTitle>Screen resolution</SectionTitle>
          <div className="flex gap-4">
            <Input
              label="Pixel width (px)"
              value={pixelWidth}
              onChange={(v) => setMediaSpec("pixelWidth", v)}
              placeholder="e.g. 1920"
            />
            <Input
              label="Pixel height (px)"
              value={pixelHeight}
              onChange={(v) => setMediaSpec("pixelHeight", v)}
              placeholder="e.g. 576"
            />
            <Input
              label="Aspect ratio"
              value={aspectRatio}
              onChange={(v) => setMediaSpec("aspectRatio", v)}
              placeholder="e.g. 16:3"
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 border border-[#ebebeb] rounded-xl pointer-events-none" />
    </div>
  );
}

function PlaybackCapabilities() {
  const [animOn, setAnimOn] = useState(true);
  const [videoOn, setVideoOn] = useState(false);
  const [audioOn, setAudioOn] = useState(false);

  const mediaSpecs = useBillboardFormStore((s) => s.form.mediaSpecs);
  const updateField = useBillboardFormStore((s) => s.updateField);

  const loopDuration = (mediaSpecs.loopDuration as string) ?? "";
  const slotDuration = (mediaSpecs.slotDuration as string) ?? "";
  const playsPerHour = (mediaSpecs.playsPerHour as string) ?? "";
  const playsPerDay = (mediaSpecs.playsPerDay as string) ?? "";

  const setMediaSpec = (key: string, value: unknown) =>
    updateField("mediaSpecs", { ...mediaSpecs, [key]: value });

  return (
    <SectionCard>
      <SectionTitle>Playback capabilities</SectionTitle>
      <div className="pt-1">
        <Input
          label="Loop duration (sec)"
          value={loopDuration}
          onChange={(v) => setMediaSpec("loopDuration", v)}
          placeholder="e.g. 10"
        />
      </div>
      <div className="flex gap-4">
        <Input
          label="Slot duration (sec)"
          value={slotDuration}
          onChange={(v) => setMediaSpec("slotDuration", v)}
          placeholder="e.g. 10"
        />
        <Input
          label="Plays per hour"
          value={playsPerHour}
          onChange={(v) => setMediaSpec("playsPerHour", v)}
          placeholder="e.g. 6"
        />
        <Input
          label="Plays per day"
          value={playsPerDay}
          onChange={(v) => setMediaSpec("playsPerDay", v)}
          placeholder="e.g. 108"
        />
      </div>
      <div className="flex flex-col gap-3">
        <p
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-xs text-[#525252]"
        >
          Supported content types
        </p>
        <SwitchRow
          on={animOn}
          onClick={() => {
            setAnimOn((v) => !v);
            setMediaSpec("supportsAnimation", !animOn);
          }}
          label="Animation / motion graphics"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4.66667 2V14"
                stroke="#737373"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 5H4.66667"
                stroke="#737373"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 8H14"
                stroke="#737373"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 11H4.66667"
                stroke="#737373"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.3333 2V14"
                stroke="#737373"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.3333 5H14"
                stroke="#737373"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.3333 11H14"
                stroke="#737373"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <SwitchRow
          on={videoOn}
          onClick={() => {
            setVideoOn((v) => !v);
            setMediaSpec("supportsVideo", !videoOn);
          }}
          label="Full-motion video (MP4/H.264)"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 4C2 2.89543 2.89543 2 4 2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4Z"
                stroke="#737373"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 5.5L10.5 8L6 10.5V5.5Z"
                stroke="#737373"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <SwitchRow
          on={audioOn}
          onClick={() => {
            setAudioOn((v) => !v);
            setMediaSpec("supportsAudio", !audioOn);
          }}
          label="Audio output"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 6V10H5L9 13V3L5 6H2Z"
                stroke="#737373"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 5.5C11.8284 6.32843 12.3284 7.46415 12.3284 8.65685C12.3284 9.84955 11.8284 10.9853 11 11.8137"
                stroke="#737373"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 3.5C14.3807 4.88071 15.1574 6.72639 15.1574 8.65685C15.1574 10.5873 14.3807 12.433 13 13.8137"
                stroke="#737373"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </div>
    </SectionCard>
  );
}

function AcceptedCreativeFormats() {
  const formats = useMultiSelect(["MP4"]);
  const fmts = ["MP4", "GIF", "HTML5", "JPEG", "PNG"];

  const mediaSpecs = useBillboardFormStore((s) => s.form.mediaSpecs);
  const updateField = useBillboardFormStore((s) => s.updateField);

  const maxFileSizeMb = (mediaSpecs.maxFileSizeMb as string) ?? "";

  const setMediaSpec = (key: string, value: unknown) =>
    updateField("mediaSpecs", { ...mediaSpecs, [key]: value });

  return (
    <SectionCard>
      <SectionTitle>Accepted creative formats</SectionTitle>
      <p
        style={{ fontFamily: "Inter, sans-serif" }}
        className="text-xs text-[#737373] -mt-2"
      >
        Select all file formats your digital billboard accepts from advertisers.
      </p>
      <div className="bg-[#f5f5f5] rounded-xl px-2 py-1 flex gap-2 items-center flex-wrap w-fit">
        {fmts.map((f) => (
          <button
            key={f}
            onClick={() => {
              formats.toggle(f);
              setMediaSpec("acceptedCreativeFormats", Array.from(formats.selected));
            }}
            style={{ fontFamily: "Inter, sans-serif" }}
            className={`h-[30px] px-3 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
              formats.selected.has(f)
                ? "bg-[#fff0ea] border-[#f54900] text-[#0a0a0a] font-semibold"
                : "bg-transparent border-[#e5e5e5] text-[#0a0a0a]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        <p
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-xs text-[#525252]"
        >
          Max file size (MB)
        </p>
        <Input
          label=""
          value={maxFileSizeMb}
          onChange={(v) => setMediaSpec("maxFileSizeMb", v)}
          placeholder="e.g. 50"
        />
      </div>
    </SectionCard>
  );
}

function ConnectivityManagement() {
  const [weatherOn, setWeatherOn] = useState(false);

  const mediaSpecs = useBillboardFormStore((s) => s.form.mediaSpecs);
  const updateField = useBillboardFormStore((s) => s.updateField);

  const connectivityType = (mediaSpecs.connectivityType as string) ?? "";
  const operatingHours = (mediaSpecs.operatingHours as string) ?? "";
  const schedulingType = (mediaSpecs.schedulingType as string) ?? "";

  const setMediaSpec = (key: string, value: unknown) =>
    updateField("mediaSpecs", { ...mediaSpecs, [key]: value });

  return (
    <SectionCard>
      <SectionTitle>Connectivity &amp; management</SectionTitle>
      <div className="flex gap-4">
        <Select
          label="Connectivity type"
          value={connectivityType || "4G LTE"}
          options={["4G LTE", "5G", "Wi-Fi", "Ethernet", "None"]}
          onChange={(v) => setMediaSpec("connectivityType", v)}
        />
        <Input
          label="Operating hours / day"
          value={operatingHours}
          onChange={(v) => setMediaSpec("operatingHours", v)}
          placeholder="e.g. 18"
        />
      </div>
      <div className="flex gap-4 items-end">
        <Select
          label="Scheduling type"
          value={schedulingType || "Automated (CMS-driven)"}
          options={["Automated (CMS-driven)", "Manual", "Programmatic"]}
          onChange={(v) => setMediaSpec("schedulingType", v)}
        />
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <div
            onClick={() => {
              setWeatherOn((v) => !v);
              setMediaSpec("weatherContextTriggers", !weatherOn);
            }}
            className="bg-[#fafafa] h-12 rounded-lg relative cursor-pointer"
          >
            <div className="absolute inset-0 border border-[#e5e5e5] rounded-lg pointer-events-none" />
            <div className="flex items-center justify-between h-full px-3">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 10C2.89543 10 2 9.10457 2 8C2 6.89543 2.89543 6 4 6C4.07483 6 4.14858 6.00411 4.22111 6.01215C4.87497 4.26519 6.52422 3 8.4 3C10.9493 3 13 5.05073 13 7.6C13 7.73066 12.9944 7.86021 12.9834 7.98819C12.9944 8.11882 13 8.25066 13 8.38333C13 10.3808 11.3808 12 9.38333 12H4C2.89543 12 2 11.1046 2 10Z"
                    stroke="#737373"
                    strokeWidth="1.33"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="text-sm text-[#262626]"
                >
                  Weather / context triggers
                </span>
              </div>
              <Switch on={weatherOn} />
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function AdvancedSpecs() {
  const [remoteOn, setRemoteOn] = useState(true);

  const mediaSpecs = useBillboardFormStore((s) => s.form.mediaSpecs);
  const updateField = useBillboardFormStore((s) => s.updateField);

  const colourDepth = (mediaSpecs.colourDepth as string) ?? "";
  const ppiDpi = (mediaSpecs.ppiDpi as string) ?? "";
  const contentRefreshRate = (mediaSpecs.contentRefreshRate as string) ?? "";

  const setMediaSpec = (key: string, value: unknown) =>
    updateField("mediaSpecs", { ...mediaSpecs, [key]: value });

  return (
    <div className="bg-white rounded-xl relative">
      <div className="overflow-clip rounded-[inherit]">
        <div className="flex flex-col gap-4 px-[25px] py-6">
          <div className="flex items-center gap-2">
            <SectionTitle>Advanced Specs</SectionTitle>
            <span
              style={{ fontFamily: "Inter, sans-serif" }}
              className="bg-[#f2f2f2] text-[#737373] text-xs px-2 py-1 rounded-md"
            >
              Optional
            </span>
          </div>
          <p
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-sm text-[#737373] -mt-1"
          >
            Fill these in only if you have the technical specifications
            available.
          </p>
          <div className="flex gap-4">
            <Input
              label="Colour depth (bit)"
              value={colourDepth}
              onChange={(v) => setMediaSpec("colourDepth", v)}
              placeholder="e.g. 24-bit (True Color)"
            />
            <Input
              label="PPI / DPI"
              value={ppiDpi}
              onChange={(v) => setMediaSpec("ppiDpi", v)}
              placeholder="e.g. 72"
            />
          </div>
          <div className="flex gap-4 items-end">
            <Input
              label="Content refresh rate (sec)"
              value={contentRefreshRate}
              onChange={(v) => setMediaSpec("contentRefreshRate", v)}
              placeholder="e.g. 24"
            />
            <div className="flex-1 min-w-0">
              <div
                onClick={() => {
                  setRemoteOn((v) => !v);
                  setMediaSpec("remoteContentManagement", !remoteOn);
                }}
                className="bg-[#fafafa] h-12 rounded-lg relative cursor-pointer"
              >
                <div className="absolute inset-0 border border-[#e5e5e5] rounded-lg pointer-events-none" />
                <div className="flex items-center justify-between h-full px-3">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 2V14M2 8H14"
                        stroke="#737373"
                        strokeWidth="1.33"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      style={{ fontFamily: "Inter, sans-serif" }}
                      className="text-sm text-[#262626]"
                    >
                      Remote content management
                    </span>
                  </div>
                  <Switch on={remoteOn} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 border border-[#ebebeb] rounded-xl pointer-events-none" />
    </div>
  );
}

export default function DigitalSections() {
  return (
    <>
      <ScreenResolution />
      <PlaybackCapabilities />
      <AcceptedCreativeFormats />
      <ConnectivityManagement />
      <AdvancedSpecs />
    </>
  );
}
