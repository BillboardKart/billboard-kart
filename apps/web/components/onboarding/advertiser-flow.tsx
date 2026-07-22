"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "@/stores/user-store";

import {
  ArrowLeft,
  Building2,
  Check,
  ChevronsUpDown,
  Globe2,
  Megaphone,
  User,
} from "lucide-react";

import { FormInput } from "@/components/onboarding/shared/form-input";
import { ProgressBar } from "@/components/onboarding/shared/progress-bar";
import { SectionTitle } from "@/components/onboarding/shared/section-title";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { UserRole, City, CurrentUserResponse } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

type AdvertiserFlowProps = {
  selectedRole: UserRole | null;
  onBackAction: () => void;
};

const backendEndpoint = process.env.NEXT_PUBLIC_API_URL!;

export function AdvertiserFlow({
  selectedRole,
  onBackAction,
}: AdvertiserFlowProps) {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessUrl, setBusinessUrl] = useState("");
  const [phone, setPhone] = useState("");

  const [cities, setCities] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState("");

  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const response = await fetch(`${backendEndpoint}/api/v1/cities`, {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch cities");

        const data: City[] = await response.json();

        setCities(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingCities(false);
      }
    };

    loadCities();
  }, []);

  const selectedCity = useMemo(
    () => cities.find((city) => city.id === selectedCityId),
    [cities, selectedCityId],
  );

  const handleCompleteOnboarding = async () => {
    try {
      setIsSubmitting(true);

      const {
        data: { session },
      } = await createClient().auth.getSession();

      const response = await fetch(`${backendEndpoint}/api/v1/user/onboard`, {
        method: "POST",

        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          fullName,
          primaryRole: selectedRole,
          businessName,
          businessUrl: businessUrl || undefined,
          phone,
          cityId: selectedCityId,
        }),
      });

      if (!response.ok) throw new Error("Failed to complete onboarding");

      const data: CurrentUserResponse = await response.json();
      useUserStore.getState().hydrate(data);

      router.push("/browse");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <ProgressBar currentStep={2} totalSteps={2} />

      <Button
        type="button"
        variant="ghost"
        onClick={onBackAction}
        className="w-fit px-0 hover:bg-transparent cursor-pointer disabled:pointer-events-none"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <SectionTitle
        title="Advertiser onboarding"
        description="Tell us a little about yourself so we can personalize your advertising experience."
      />

      <div className="space-y-6">
        <FormInput
          label="Full name"
          placeholder="John Doe"
          value={fullName}
          onChangeAction={setFullName}
          required
          icon={<Megaphone className="h-5 w-5" />}
        />

        <FormInput
          label="Company name"
          placeholder="Acme Advertising Pvt Ltd"
          value={businessName}
          onChangeAction={setBusinessName}
          required
          icon={<Building2 className="h-5 w-5" />}
        />

        <FormInput
          label="Website"
          placeholder="https://example.com"
          value={businessUrl}
          onChangeAction={setBusinessUrl}
          icon={<Globe2 className="h-5 w-5" />}
        />

        <FormInput
          label="Phone number"
          placeholder="+91xxxxxxxxxx"
          value={phone}
          onChangeAction={setPhone}
          required
          icon={<Building2 className="h-5 w-5" />}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">Primary operating city</label>

          <Popover open={cityDropdownOpen} onOpenChange={setCityDropdownOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                disabled={isLoadingCities}
                className="w-full h-12 justify-between rounded-sm"
              >
                {selectedCity
                  ? `${selectedCity.name}, ${selectedCity.stateRegion ?? ""}`
                  : "Select a city"}

                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0 rounded-sm">
              <Command>
                <CommandInput placeholder="Search city..." />

                <CommandList>
                  <CommandEmpty>No city found.</CommandEmpty>

                  <CommandGroup>
                    {cities.map((city) => (
                      <CommandItem
                        key={city.id}
                        value={`${city.name} ${city.stateRegion ?? ""}`}
                        onSelect={() => {
                          setSelectedCityId(city.id);
                          setCityDropdownOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedCityId === city.id
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />

                        <div className="flex flex-col">
                          <span>{city.name}</span>

                          {city.stateRegion && (
                            <span className="text-xs text-muted-foreground">
                              {city.stateRegion}
                            </span>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <FormInput
          label="Role"
          placeholder={selectedRole ?? ""}
          value={selectedRole ?? ""}
          onChangeAction={() => {}}
          disabled
          icon={<User className="h-5 w-5" />}
        />
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-border pt-8">
        <Button
          type="button"
          variant="outline"
          onClick={onBackAction}
          disabled={isSubmitting}
          className="rounded-sm border border-gray-300 shadow-sm cursor-pointer"
        >
          Back
        </Button>

        <Button
          type="button"
          onClick={handleCompleteOnboarding}
          disabled={
            isSubmitting ||
            !fullName ||
            !businessName ||
            !phone ||
            !selectedCityId
          }
          className="rounded-sm bg-red-600 hover:bg-red-500 shadow-sm cursor-pointer"
        >
          {isSubmitting ? "Completing..." : "Complete onboarding"}
        </Button>
      </div>
    </div>
  );
}
