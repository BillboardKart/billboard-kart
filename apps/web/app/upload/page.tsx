"use client";

import {
  Building,
  Image as ImageIcon,
  IndianRupee,
  MapPin,
  Maximize2,
  Navigation,
  Plus,
  ShieldAlert,
  Sun,
  Tag,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { BillboardFormState } from "@/types/owner";
import { MapView } from "@/components/map/MapView";
import { FormInput } from "@/components/app/Forms";
import { BillboardTypeSelect } from "@/components/billboards/billboard-selector-group";
import { TopNav } from "@/components/app/TopNav";

export default function AddBillboardPage() {
  const [form, setForm] = useState<BillboardFormState>({
    billboardName: "",
    city: "Mumbai",
    area: "",
    landmark: "",
    latitude: "19.0760",
    longitude: "72.8777",
    billboardType: "Digital Hoarding",
    width: "40",
    height: "20",
    illumination: "Yes",
    trafficSide: "Left",
    visibilityNotes: "",
    photos: [
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&auto=format&fit=crop&q=60",
    ],
    monthlyRate: "1,45,000",
    isAvailable: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({
    landmark: "Landmark is required to help renters locate the site.",
    photos: "Add 1 more photo(s) to continue.",
  });

  const updateField = <K extends keyof BillboardFormState>(
    key: K,
    value: BillboardFormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const cities = ["Mumbai", "Pune", "Bangalore", "Delhi"];
  const billboardTypes = [
    { id: "Digital Hoarding", label: "Digital Hoarding" },
    { id: "Static Billboard", label: "Static Billboard" },
    { id: "Gantry", label: "Gantry" },
    { id: "Unipole", label: "Unipole" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <TopNav />
      {/*
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 text-foreground" />
            </button>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-amber-500 flex items-center justify-center font-bold text-white text-xs shadow-xs">
                BK
              </div>
              <h1 className="text-base font-bold tracking-tight">
                Add Billboard
              </h1>
            </div>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Step 1 of 3
          </span>
        </div>
        <div className="w-full bg-muted h-1">
          <div className="bg-orange-500 h-1 w-1/3 transition-all duration-300" />
        </div>
      </header>
    */}

      <main className="max-w-3xl mx-auto px-4 pt-10 space-y-6">
        <FormInput
          label="Billboard name"
          icon={<Tag className="h-4 w-4" />}
          placeholder="e.g. MG Road Digital Hoarding"
          value={form.billboardName}
          onChange={(e) => updateField("billboardName", e.target.value)}
          required
        />

        <div className="flex flex-col gap-2">
          <FormInput
            label="City"
            icon={<Building className="h-4 w-4" />}
            placeholder="Search a city"
            value={form.city}
            onChange={(e) => updateField("city", e.target.value)}
            required
          />
          <div className="flex flex-wrap gap-2 pt-1">
            {cities.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => updateField("city", c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  form.city === c
                    ? "bg-orange-500 text-white shadow-xs"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Area / Locality"
            icon={<MapPin className="h-4 w-4" />}
            placeholder="e.g. Downtown, Sector 4"
            value={form.area}
            onChange={(e) => updateField("area", e.target.value)}
          />
          <FormInput
            label="Landmark"
            icon={<MapPin className="h-4 w-4" />}
            placeholder="e.g. Near Central Mall"
            value={form.landmark}
            onChange={(e) => updateField("landmark", e.target.value)}
            error={errors.landmark}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Latitude"
            icon={<Navigation className="h-4 w-4" />}
            placeholder="e.g. 19.0760"
            value={form.latitude}
            onChange={(e) => updateField("latitude", e.target.value)}
          />
          <FormInput
            label="Longitude"
            icon={<Navigation className="h-4 w-4" />}
            placeholder="e.g. 72.8777"
            value={form.longitude}
            onChange={(e) => updateField("longitude", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Pin location on map
          </label>
          <MapView
            latitude={parseFloat(form.latitude) || 19.076}
            longitude={parseFloat(form.longitude) || 72.8777}
            onLocationChange={(lat, lng) => {
              updateField("latitude", lat.toFixed(4));
              updateField("longitude", lng.toFixed(4));
            }}
          />
        </div>

        <BillboardTypeSelect
          label="Billboard type"
          icon={<Maximize2 className="h-4 w-4" />}
          options={billboardTypes}
          selectedValue={form.billboardType}
          onSelect={(val) => updateField("billboardType", val)}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Width (ft)"
            placeholder="40"
            value={form.width}
            onChange={(e) => updateField("width", e.target.value)}
          />
          <FormInput
            label="Height (ft)"
            placeholder="20"
            value={form.height}
            onChange={(e) => updateField("height", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Sun className="h-4 w-4 text-muted-foreground" />
              Illumination
            </label>
            <span className="text-xs text-muted-foreground">
              Is this billboard illuminated at night?
            </span>
            <div className="flex gap-2 mt-1">
              {(["Yes", "No"] as const).map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => updateField("illumination", val)}
                  className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                    form.illumination === val
                      ? "border-orange-500 bg-orange-500/5 text-orange-600 shadow-xs"
                      : "border-border bg-card text-foreground"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Navigation className="h-4 w-4 text-muted-foreground" />
              Traffic Side
            </label>
            <span className="text-xs text-muted-foreground">
              Which side of traffic is the billboard on?
            </span>
            <div className="flex gap-2 mt-1">
              {(["Left", "Right", "Not Applicable"] as const).map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => updateField("trafficSide", val)}
                  className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                    form.trafficSide === val
                      ? "border-orange-500 bg-orange-500/5 text-orange-600 shadow-xs"
                      : "border-border bg-card text-foreground"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-foreground">
            Visibility notes
          </label>
          <textarea
            className="w-full rounded-lg border border-border bg-background p-3.5 text-sm text-foreground shadow-xs placeholder:text-muted-foreground/60 focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            rows={3}
            placeholder="Describe visibility, viewing distance, obstructions, etc."
            value={form.visibilityNotes}
            onChange={(e) => updateField("visibilityNotes", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
            Photos
          </label>
          <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-muted/20">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Upload photos
              </p>
              <p className="text-xs text-muted-foreground">
                Add at least 2 photos
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {form.photos.map((photo, index) => (
              <div
                key={index}
                className="relative aspect-4/3 rounded-xl overflow-hidden border border-border bg-muted"
              >
                <Image
                  src={photo}
                  width={120}
                  height={96}
                  unoptimized
                  alt={`Billboard preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    updateField(
                      "photos",
                      form.photos.filter((_, i) => i !== index),
                    )
                  }
                  className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="aspect-4/3 rounded-xl border border-border border-dashed flex items-center justify-center hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <Plus className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
          {errors.photos && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <ShieldAlert className="h-3 w-3" />
              {errors.photos}
            </p>
          )}
        </div>

        <div className="border border-border rounded-xl p-5 bg-card space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center font-semibold text-xs">
              ₹
            </div>
            <h3 className="text-sm font-bold text-foreground">Pricing</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <FormInput
              label="Monthly rate"
              icon={<IndianRupee className="h-4 w-4" />}
              value={form.monthlyRate}
              onChange={(e) => updateField("monthlyRate", e.target.value)}
            />
            <div className="flex items-center justify-between pt-4 md:pt-0">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-foreground">
                  Availability
                </span>
                <span className="text-xs text-muted-foreground">
                  Mark as available for booking
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateField("isAvailable", !form.isAvailable)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  form.isAvailable ? "bg-orange-500" : "bg-muted"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    form.isAvailable ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </main>
      <div className="max-w-3xl mx-auto flex justify-end pt-6">
        <button
          type="button"
          className="w-full md:w-auto px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          Continue to documents &rarr;
        </button>
      </div>
    </div>
  );
}
