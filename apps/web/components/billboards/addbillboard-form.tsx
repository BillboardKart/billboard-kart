import { useRef, useState, type ReactNode } from "react";
import svgPaths from "@/public/svg-oqrko3yzyk";
// import imgMap from "@/public/991f769c3915de6e31148d2af47bfeca4ac19477.png";
import imgHoarding from "@/public/bbe2da8bf93ca0b1373387f3158256ee6dc136b6.png";
import imgUnipole from "@/public/950883eebaf6bf714a744fded1d05a0a7d282faf.png";
import imgGantry from "@/public/26207b9e84fa5b49c2312417f250d1ea618c65b0.png";
import imgFacade from "@/public/b556b7b77bcf8d7a0fee50110626916aec4f55cb.png";
import Image from "next/image";
import { MapView } from "@/components/map/MapView";

// Palette carried from the imported design.
const ORANGE = "#f54900";
const ERROR = "#e7000b";

type Errors = Record<string, string>;

function ErrorText({ message }: { message: string }) {
  return (
    <div className="flex gap-[6px] items-center">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="shrink-0"
      >
        <path
          d={svgPaths.pc3ebf00}
          stroke={ERROR}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.16667"
        />
        <path
          d="M7 4.66667V7"
          stroke={ERROR}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.16667"
        />
        <path
          d="M7 9.33333H7.00583"
          stroke={ERROR}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.16667"
        />
      </svg>
      <p className="text-[14px] leading-[20px] text-[#e7000b]">{message}</p>
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  optional,
  error,
  children,
  className = "",
}: {
  label: ReactNode;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-[8px] ${className}`}>
      <div className="flex flex-col gap-[4px]">
        <div className="flex items-center gap-[8px]">
          <span className="text-[14px] leading-[20px] text-[#0a0a0a]">
            {label}
            {required && <span className="text-[#e7000b]"> *</span>}
          </span>
          {optional && (
            <span className="bg-[#f2f2f2] text-[#737373] text-[12px] rounded-[6px] px-[8px] py-[4px]">
              Optional
            </span>
          )}
        </div>
        {hint && (
          <p className="text-[14px] leading-[20px] text-[#737373]">{hint}</p>
        )}
      </div>
      {children}
      {error && <ErrorText message={error} />}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  invalid,
  prefix,
  rounded = "rounded-[12px]",
  boxClass = "h-[48px] px-[12px]",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  invalid?: boolean;
  prefix?: string;
  rounded?: string;
  boxClass?: string;
}) {
  return (
    <div
      className={`flex items-center gap-[4px] ${boxClass} w-full bg-[#f5f5f5] ${rounded} border shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors ${
        invalid
          ? "border-[#e7000b]"
          : "border-[#e5e5e5] focus-within:border-[#f54900]"
      }`}
    >
      {prefix && <span className="text-[14px] text-[#666]">{prefix}</span>}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 min-w-0 bg-transparent outline-none text-[14px] text-[#0a0a0a] placeholder:text-[#737373]"
      />
    </div>
  );
}

function Segmented({
  options,
  value,
  onChange,
  wrap,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  wrap?: boolean;
}) {
  return (
    <div
      className={`bg-[#f5f5f5] rounded-[12px] px-[8px] py-[4px] flex gap-[8px] ${wrap ? "flex-wrap" : ""} ${wrap ? "w-full" : "w-fit"}`}
    >
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`h-[29px] px-[12px] rounded-[8px] border text-[14px] whitespace-nowrap transition-colors ${
              active
                ? "bg-[#fff0ea] border-[#f54900] font-bold text-[#0a0a0a]"
                : "border-[#e5e5e5] font-medium text-[#0a0a0a] hover:bg-white"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

const BILLBOARD_TYPES = [
  { label: "Hoarding", img: imgHoarding },
  { label: "Unipole", img: imgUnipole },
  { label: "Gantry", img: imgGantry },
  { label: "Building Facade\n(Wall Branding)", img: imgFacade },
];

export default function AddBillboardForm() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [cityChip, setCityChip] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [mapsLink, setMapsLink] = useState("");
  const [type, setType] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [illuminated, setIlluminated] = useState("Yes");
  const [trafficSide, setTrafficSide] = useState("Left");
  const [facing, setFacing] = useState("North");
  const [roadType, setRoadType] = useState("Highway");
  const [dailyTraffic, setDailyTraffic] = useState("");
  const [peakHours, setPeakHours] = useState("");
  const [mix, setMix] = useState("");
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [monthlyRate, setMonthlyRate] = useState("");
  const [available, setAvailable] = useState(true);
  const [minDuration, setMinDuration] = useState("1 month");
  const [printingCost, setPrintingCost] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const clearError = (key: string) =>
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const addPhotos = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setPhotos((prev) => [...prev, ...urls]);
    clearError("photos");
  };

  const removePhoto = (idx: number) =>
    setPhotos((prev) => prev.filter((_, i) => i !== idx));

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Billboard name is required.";
    if (!city.trim() && !cityChip)
      next.city = "Please select or search a city.";
    if (!area.trim()) next.area = "Area / Locality is required.";
    if (!landmark.trim())
      next.landmark = "Landmark is required to help renters locate the site.";
    if (!type) next.type = "Select a billboard type.";
    if (!width.trim()) next.width = "Width is required.";
    if (!height.trim()) next.height = "Height is required.";
    if (photos.length < 3) {
      const remaining = 3 - photos.length;
      next.photos = `Add ${remaining} more photo${remaining > 1 ? "s" : ""} to continue.`;
    }
    if (!monthlyRate.trim()) next.monthlyRate = "Monthly rate is required.";
    return next;
  };

  const handleContinue = () => {
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Scroll to the first field with an error.
      const first = document.querySelector<HTMLElement>("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    // Valid — would advance to Step 2 (Media Specs).
    window.alert("Step 1 complete — continuing to Media Specs.");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center font-['Inter',sans-serif]">
      {/* Header */}
      <div className="w-full border-b border-[#e5e5e5] flex justify-center px-[24px]">
        <div className="w-full max-w-[900px] pt-[24px] pb-[16px] flex flex-col gap-[16px]">
          <div className="flex items-center gap-[16px]">
            <button
              type="button"
              className="size-[40px] rounded-full border border-[#e5e5e5] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
              aria-label="Go back"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="#0A0A0A"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.66667"
                />
              </svg>
            </button>
            <div className="size-[40px] shrink-0">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d={svgPaths.p23427d00} fill="#FEFEFE" />
                <path d={svgPaths.p3f1f300} fill="#181818" />
                <path d={svgPaths.p1e22c200} fill="#F9A006" />
                <path d={svgPaths.p224c2c00} fill="#FEFEFE" />
                <path d={svgPaths.p1f244000} fill="#FEFEFE" />
                <path d={svgPaths.pca161f0} fill="#FEFEFE" />
                <path d={svgPaths.p27efe200} fill="#181818" />
                <path d={svgPaths.p253e8400} fill="#F9A006" />
                <path d={svgPaths.p1599b900} fill="#FE4401" />
                <path d={svgPaths.p255b1580} fill="#FEFEFE" />
                <path d={svgPaths.p310fa600} fill="#29A760" />
                <path d={svgPaths.p20b96900} fill="#FEFEFE" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[18px] leading-[22.5px] text-[#0a0a0a]">
                Add Billboard
              </p>
              <p className="text-[14px] leading-[20px] text-[#737373]">
                Step 1 of 3
              </p>
            </div>
          </div>
          <div className="flex gap-[8px]">
            <div className="flex-1 h-[6px] rounded-full bg-[#f54900]" />
            <div className="flex-1 h-[6px] rounded-full bg-[#f5f5f5]" />
            <div className="flex-1 h-[6px] rounded-full bg-[#f5f5f5]" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="w-full max-w-[900px] px-[24px] sm:px-[32px] py-[32px] flex flex-col gap-[32px]">
        {/* Location block */}
        <div className="flex flex-col gap-[24px]">
          <Field label="Billboard Name" required error={errors.name}>
            <div data-error={!!errors.name}>
              <TextInput
                value={name}
                onChange={(v) => {
                  setName(v);
                  clearError("name");
                }}
                placeholder="e.g. MG Road Digital Hoarding"
                invalid={!!errors.name}
              />
            </div>
          </Field>

          {/* Billboard type */}
          <Field label="Billboard type" required error={errors.type}>
            <div
              data-error={!!errors.type}
              className="bg-[#f5f5f5] rounded-[12px] p-[8px] grid grid-cols-1 sm:grid-cols-2 gap-[8px]"
            >
              {BILLBOARD_TYPES.map((t) => {
                const active = type === t.label;
                return (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => {
                      setType(t.label);
                      clearError("type");
                    }}
                    className={`text-left rounded-[10px] border px-[16px] py-[8px] flex items-start justify-between gap-[8px] h-[184px] overflow-hidden transition-colors ${
                      active
                        ? "bg-[#fff0ea] border-[#f54900]"
                        : "bg-white border-[#e5e5e5] hover:border-[#d4d4d4]"
                    }`}
                  >
                    <span
                      className={`text-[16px] whitespace-pre-line ${active ? "font-bold" : "font-medium"} text-[#0a0a0a]`}
                    >
                      {t.label}
                    </span>
                    <Image
                      src={t.img}
                      alt={t.label}
                      fill
                      unoptimized
                      className="h-full w-[55%] object-contain shrink-0"
                    />
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="City" required error={errors.city}>
            <div data-error={!!errors.city} className="flex flex-col gap-[8px]">
              <TextInput
                value={city}
                onChange={(v) => {
                  setCity(v);
                  setCityChip(
                    ["Mumbai", "Pune", "Bangalore", "Delhi"].includes(v)
                      ? v
                      : "",
                  );
                  clearError("city");
                }}
                placeholder="Search a city"
                invalid={!!errors.city}
              />
              <div className="flex flex-wrap gap-[8px]">
                {["Mumbai", "Pune", "Bangalore", "Delhi"].map((c) => {
                  const active = cityChip === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        if (active) {
                          setCityChip("");
                          setCity("");
                        } else {
                          setCityChip(c);
                          setCity(c);
                        }
                        clearError("city");
                      }}
                      className={`rounded-full px-[13px] py-[9px] text-[12px] leading-[16px] border transition-colors ${
                        active
                          ? "bg-[#f54900] text-white border-[#f54900]"
                          : "bg-[#f5f5f5] text-[#171717] border-[#e5e5e5] hover:bg-white"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          </Field>

          <div className="flex flex-col sm:flex-row gap-[24px]">
            <Field
              label="Area / Locality"
              required
              error={errors.area}
              className="flex-1"
            >
              <div data-error={!!errors.area}>
                <TextInput
                  value={area}
                  onChange={(v) => {
                    setArea(v);
                    clearError("area");
                  }}
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
                  value={landmark}
                  onChange={(v) => {
                    setLandmark(v);
                    clearError("landmark");
                  }}
                  placeholder="e.g. Near Central Mall"
                  invalid={!!errors.landmark}
                />
              </div>
            </Field>
          </div>

          <div className="flex flex-col sm:flex-row gap-[16px]">
            <Field label="Latitude" className="flex-1">
              <TextInput
                value={lat}
                onChange={setLat}
                placeholder="e.g. 28.6139"
              />
            </Field>
            <Field label="Longitude" className="flex-1">
              <TextInput
                value={lng}
                onChange={setLng}
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
            <div className="relative h-[256px] w-full rounded-[16px] overflow-hidden border border-[#e5e5e5]">
              <MapView
                latitude={parseFloat(form.latitude) || 19.076}
                longitude={parseFloat(form.longitude) || 72.8777}
                onLocationChange={(lat, lng) => {
                  updateField("latitude", lat.toFixed(4));
                  updateField("longitude", lng.toFixed(4));
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-[40px] rounded-full bg-[#f54900] shadow-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d={svgPaths.p2020900}
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.66667"
                    />
                    <path
                      d={svgPaths.pf4e3080}
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.66667"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Field>
        </div>

        {/* Dimensions */}
        <div className="flex gap-[16px]">
          <Field
            label="Width (ft)"
            required
            error={errors.width}
            className="flex-1"
          >
            <div data-error={!!errors.width}>
              <TextInput
                value={width}
                onChange={(v) => {
                  setWidth(v);
                  clearError("width");
                }}
                placeholder="48"
                invalid={!!errors.width}
                rounded="rounded-[8px]"
              />
            </div>
          </Field>
          <Field
            label="Height (ft)"
            required
            error={errors.height}
            className="flex-1"
          >
            <div data-error={!!errors.height}>
              <TextInput
                value={height}
                onChange={(v) => {
                  setHeight(v);
                  clearError("height");
                }}
                placeholder="14"
                invalid={!!errors.height}
                rounded="rounded-[8px]"
              />
            </div>
          </Field>
        </div>

        {/* Illumination + Traffic side */}
        <div className="flex flex-col sm:flex-row gap-[32px]">
          <Field
            label="Illumination"
            hint="Is this billboard illuminated at night?"
            className="flex-1"
          >
            <Segmented
              options={["Yes", "No"]}
              value={illuminated}
              onChange={setIlluminated}
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
              onChange={setTrafficSide}
            />
          </Field>
        </div>

        {/* Facing direction */}
        <Field
          label="Facing Direction"
          hint="Which direction does the billboard face?"
        >
          <Segmented
            options={["North", "South", "East", "West"]}
            value={facing}
            onChange={setFacing}
          />
        </Field>

        {/* Road / junction */}
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
            value={roadType}
            onChange={setRoadType}
          />
        </Field>

        {/* Traffic estimate */}
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
                onChange={setDailyTraffic}
                placeholder="e.g. 50,000 vehicles/day"
                rounded="rounded-[8px]"
              />
            </div>
            <div className="flex-1 flex flex-col gap-[8px]">
              <span className="text-[12px] text-[#737373]">Peak hours</span>
              <TextInput
                value={peakHours}
                onChange={setPeakHours}
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
                onChange={setMix}
                placeholder="e.g. 70% vehicles, 30% pedestrians"
                rounded="rounded-[8px]"
              />
            </div>
          </div>
        </Field>

        {/* Visibility notes */}
        <Field label="Visibility notes">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe visibility, viewing distance, obstructions, etc."
            className="w-full min-h-[96px] rounded-[8px] border border-[#e5e5e5] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] px-[13px] py-[9px] text-[14px] text-[#0a0a0a] placeholder:text-[#737373] outline-none focus:border-[#f54900] resize-y"
          />
        </Field>

        {/* Photos */}
        <Field label="Photos" required error={errors.photos}>
          <div
            data-error={!!errors.photos}
            className="flex flex-col gap-[12px]"
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => addPhotos(e.target.files)}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full rounded-[16px] border-2 border-dashed border-[#e5e5e5] hover:border-[#f54900] transition-colors flex flex-col items-center justify-center gap-[8px] p-[50px]"
            >
              <span className="size-[48px] rounded-full bg-[#f5f5f5] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 2.5V12.5"
                    stroke="#737373"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.66667"
                  />
                  <path
                    d={svgPaths.p320a7e80}
                    stroke="#737373"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.66667"
                  />
                  <path
                    d={svgPaths.p2f601280}
                    stroke="#737373"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.66667"
                  />
                </svg>
              </span>
              <span className="text-[14px] text-[#0a0a0a]">Upload photos</span>
              <span className="text-[12px] text-[#737373]">
                Add at least 3 photos
              </span>
            </button>

            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-[12px]">
                {photos.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-[12px] border border-[#e5e5e5] overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt={`Billboard photo ${idx + 1}`}
                      className="size-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute top-[7px] right-[7px] size-[24px] rounded-full bg-[rgba(10,10,10,0.7)] flex items-center justify-center"
                      aria-label="Remove photo"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M10.5 3.5L3.5 10.5"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.16667"
                        />
                        <path
                          d="M3.5 3.5L10.5 10.5"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.16667"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="aspect-square rounded-[12px] border-2 border-dashed border-[#e5e5e5] hover:border-[#f54900] transition-colors flex items-center justify-center"
                  aria-label="Add photo"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19"
                      stroke="#737373"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 5V19"
                      stroke="#737373"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </Field>

        {/* Pricing */}
        <div className="bg-white rounded-[16px] border border-[#e5e5e5] px-[33px] py-[25px] flex flex-col gap-[16px]">
          <p className="text-[16px] leading-[24px] text-[#0a0a0a]">Pricing</p>
          <div className="flex flex-col sm:flex-row gap-[24px] sm:items-end">
            <Field
              label="Monthly rate"
              required
              error={errors.monthlyRate}
              className="flex-1"
            >
              <div data-error={!!errors.monthlyRate}>
                <TextInput
                  value={monthlyRate}
                  onChange={(v) => {
                    setMonthlyRate(v);
                    clearError("monthlyRate");
                  }}
                  placeholder="1,45,500"
                  prefix="₹"
                  invalid={!!errors.monthlyRate}
                  rounded="rounded-[8px]"
                />
              </div>
            </Field>
            <div className="flex-1 flex items-center justify-between gap-[24px]">
              <div className="flex flex-col gap-[4px]">
                <span className="text-[14px] leading-[20px] text-[#0a0a0a]">
                  Availability
                </span>
                <span className="text-[14px] leading-[20px] text-[#737373]">
                  Mark as available for booking
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAvailable((a) => !a)}
                className={`w-[32px] h-[18px] rounded-full border border-[#e5e5e5] flex items-center px-px transition-colors ${
                  available
                    ? "bg-[#171717] justify-end"
                    : "bg-[#e5e5e5] justify-start"
                }`}
                role="switch"
                aria-checked={available}
                aria-label="Available for booking"
              >
                <span className="size-[16px] rounded-full bg-white" />
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-[24px]">
            <div className="flex-1 flex flex-col gap-[8px]">
              <span className="text-[14px] text-[#666]">Minimum duration</span>
              <div className="relative">
                <select
                  value={minDuration}
                  onChange={(e) => setMinDuration(e.target.value)}
                  className="w-full appearance-none bg-white border border-[#d9d9d9] rounded-[8px] px-[12px] py-[8px] text-[12px] text-[#333] outline-none focus:border-[#f54900]"
                >
                  <option value="1 week">1 week</option>
                  <option value="1 month">1 month (Default)</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="12 months">12 months</option>
                </select>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none opacity-50"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#0A0A0A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.33333"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[8px]">
              <span className="text-[14px] text-[#666]">
                Printing/Mounting cost (If Any)
              </span>
              <TextInput
                value={printingCost}
                onChange={setPrintingCost}
                placeholder="25,000"
                prefix="₹"
                rounded="rounded-[8px]"
                boxClass="py-[8px] px-[12px]"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-[#e5e5e5] pt-[16px]">
          <button
            type="button"
            onClick={handleContinue}
            style={{ backgroundColor: ORANGE }}
            className="h-[48px] rounded-[12px] px-[16px] flex items-center gap-[8px] text-white text-[14px] shadow-sm hover:brightness-95 transition"
          >
            Continue to Media Specs
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.33333 8H12.6667"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.33333"
              />
              <path
                d={svgPaths.p1d405500}
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.33333"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
