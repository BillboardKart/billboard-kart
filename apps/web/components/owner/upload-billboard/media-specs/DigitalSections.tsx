"use client";

import { useState } from "react";
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
  return (
    <div className="bg-white rounded-[12px] relative">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="flex flex-col gap-[16px] px-[25px] py-[24px]">
          <SectionTitle>Screen resolution</SectionTitle>
          <div className="flex gap-[16px]">
            <Input label="Pixel width (px)" value="1920" />
            <Input label="Pixel height (px)" value="576" />
            <Input label="Aspect ratio" value="16:3" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 border border-[#ebebeb] rounded-[12px] pointer-events-none" />
    </div>
  );
}

function PlaybackCapabilities() {
  const [animOn, setAnimOn] = useState(true);
  const [videoOn, setVideoOn] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  return (
    <SectionCard>
      <SectionTitle>Playback capabilities</SectionTitle>
      <div className="pt-[4px]">
        <Input label="Loop duration (sec)" value="10" />
      </div>
      <div className="flex gap-[16px]">
        <Input label="Slot duration (sec)" value="10" />
        <Input label="Plays per hour" value="6" />
        <Input label="Plays per day" value="108" />
      </div>
      <div className="flex flex-col gap-[12px]">
        <p
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-[12px] text-[#525252]"
        >
          Supported content types
        </p>
        <SwitchRow
          on={animOn}
          onClick={() => setAnimOn((v) => !v)}
          label="Animation / motion graphics"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                // d={svgPaths.p26914900}
                stroke="#737373"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
          onClick={() => setVideoOn((v) => !v)}
          label="Full-motion video (MP4/H.264)"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              {/*
              <path d={svgPaths.p51f04c0} stroke="#737373" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
              <path d={svgPaths.p2e800bc0} stroke="#737373" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
              */}
            </svg>
          }
        />
        <SwitchRow
          on={audioOn}
          onClick={() => setAudioOn((v) => !v)}
          label="Audio output"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                // d={svgPaths.p1972c800}
                stroke="#737373"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                // d={svgPaths.p2be65080}
                stroke="#737373"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                // d={svgPaths.p18e22e10}
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
  return (
    <SectionCard>
      <SectionTitle>Accepted creative formats</SectionTitle>
      <p
        style={{ fontFamily: "Inter, sans-serif" }}
        className="text-[12px] text-[#737373] -mt-[8px]"
      >
        Select all file formats your digital billboard accepts from advertisers.
      </p>
      <div className="bg-[#f5f5f5] rounded-[12px] px-[8px] py-[4px] flex gap-[8px] items-center flex-wrap w-fit">
        {fmts.map((f) => (
          <button
            key={f}
            onClick={() => formats.toggle(f)}
            style={{ fontFamily: "Inter, sans-serif" }}
            className={`h-[30px] px-[12px] rounded-[8px] text-[14px] font-medium border transition-colors cursor-pointer ${
              formats.selected.has(f)
                ? "bg-[#fff0ea] border-[#f54900] text-[#0a0a0a] font-semibold"
                : "bg-transparent border-[#e5e5e5] text-[#0a0a0a]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-[6px]">
        <p
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-[12px] text-[#525252]"
        >
          Max file size (MB)
        </p>
        <div className="bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[48px] rounded-[8px] relative">
          <div className="absolute inset-0 border border-[#d4d4d4] rounded-[8px] pointer-events-none" />
          <div className="flex items-center h-full px-[16px]">
            <span
              style={{ fontFamily: "Inter, sans-serif" }}
              className="text-[14px] text-[#737373]"
            >
              50
            </span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function ConnectivityManagement() {
  const [weatherOn, setWeatherOn] = useState(false);
  return (
    <SectionCard>
      <SectionTitle>Connectivity &amp; management</SectionTitle>
      <div className="flex gap-[16px]">
        <Select label="Connectivity type" value="4G LTE" />
        <Input label="Operating hours / day" value="18" />
      </div>
      <div className="flex gap-[16px] items-end">
        <Select label="Scheduling type" value="Automated (CMS-driven)" />
        <div className="flex flex-col gap-[6px] flex-1 min-w-0">
          <div
            onClick={() => setWeatherOn((v) => !v)}
            className="bg-[#fafafa] h-[48px] rounded-[8px] relative cursor-pointer"
          >
            <div className="absolute inset-0 border border-[#e5e5e5] rounded-[8px] pointer-events-none" />
            <div className="flex items-center justify-between h-full px-[13px]">
              <div className="flex items-center gap-[8px]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    // d={svgPaths.p2388ff00}
                    stroke="#737373"
                    strokeWidth="1.33"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    // d={svgPaths.p213b52c0}
                    stroke="#737373"
                    strokeWidth="1.33"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="text-[14px] text-[#262626]"
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
  return (
    <div className="bg-white rounded-[12px] relative">
      <div className="overflow-clip rounded-[inherit]">
        <div className="flex flex-col gap-[16px] px-[25px] py-[24px]">
          <div className="flex items-center gap-[8px]">
            <SectionTitle>Advanced Specs</SectionTitle>
            <span
              style={{ fontFamily: "Inter, sans-serif" }}
              className="bg-[#f2f2f2] text-[#737373] text-[12px] px-[8px] py-[4px] rounded-[6px]"
            >
              Optional
            </span>
          </div>
          <p
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-[14px] text-[#737373] -mt-[4px]"
          >
            Fill these in only if you have the technical specifications
            available.
          </p>
          <div className="flex gap-[16px]">
            <Input label="Colour depth (bit)" value="24-bit (True Color)" />
            <Input label="PPI / DPI" value="72" />
          </div>
          <div className="flex gap-[16px] items-end">
            <Input label="Content refresh rate (sec)" value="24" />
            <div className="flex-1 min-w-0">
              <div
                onClick={() => setRemoteOn((v) => !v)}
                className="bg-[#fafafa] h-[48px] rounded-[8px] relative cursor-pointer"
              >
                <div className="absolute inset-0 border border-[#e5e5e5] rounded-[8px] pointer-events-none" />
                <div className="flex items-center justify-between h-full px-[13px]">
                  <div className="flex items-center gap-[8px]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        // d={svgPaths.p20888e80}
                        stroke="#737373"
                        strokeWidth="1.33"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        // d={svgPaths.p3b546700}
                        stroke="#737373"
                        strokeWidth="1.33"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      style={{ fontFamily: "Inter, sans-serif" }}
                      className="text-[14px] text-[#262626]"
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
      <div className="absolute inset-0 border border-[#ebebeb] rounded-[12px] pointer-events-none" />
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
