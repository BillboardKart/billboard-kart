"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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
import { parseCurrentUserResponse } from "@/lib/auth/current-user";
import { getRoleHomePath } from "@/lib/auth/role-redirect";
import { createClient } from "@/lib/supabase/client";
import type { City, UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user-store";

type OnboardingFormProps = {
  selectedRole: UserRole;
  onBackAction: () => void;
};

const backendEndpoint = process.env.NEXT_PUBLIC_API_URL!;

const ROLE_CONTENT: Record<
  UserRole,
  {
    title: string;
    description: string;
    businessLabel: string;
    businessPlaceholder: string;
    websiteLabel: string;
    phonePlaceholder: string;
    fullNameIcon: React.ReactNode;
  }
> = {
  advertiser: {
    title: "Advertiser onboarding",
    description:
      "Tell us a little about yourself so we can personalize your advertising experience.",
    businessLabel: "Company name",
    businessPlaceholder: "Acme Advertising Pvt Ltd",
    websiteLabel: "Website",
    phonePlaceholder: "+91xxxxxxxxxx",
    fullNameIcon: <Megaphone className="h-5 w-5" />,
  },
  owner: {
    title: "Billboard owner onboarding",
    description:
      "Tell us about your business so we can verify your account and help you publish billboard listings.",
    businessLabel: "Business name",
    businessPlaceholder: "Skyline Media Pvt Ltd",
    websiteLabel: "Business website",
    phonePlaceholder: "+91-xxxx-xx-xxxx",
    fullNameIcon: <User className="h-5 w-5" />,
  },
};

export function OnboardingForm({
  selectedRole,
  onBackAction,
}: OnboardingFormProps) {
  const router = useRouter();
  const content = ROLE_CONTENT[selectedRole];

  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessUrl, setBusinessUrl] = useState("");
  const [phone, setPhone] = useState("");

  const [cities, setCities] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState("");

  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCities = async () => {
      try {
        const response = await fetch(`${backendEndpoint}/api/v1/cities`, {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch cities");

        const data: City[] = await response.json();

        setCities(data);
      } catch (loadError) {
        console.error(loadError);
        setError("Unable to load cities. Please refresh the page.");
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

  const isFormValid =
    fullName.trim().length >= 2 &&
    businessName.trim().length >= 2 &&
    phone.trim().length >= 8 &&
    selectedCityId.length > 0;

  const handleCompleteOnboarding = async () => {
    if (!isFormValid) return;

    setError("");
    setIsSubmitting(true);

    try {
      const {
        data: { session },
      } = await createClient().auth.getSession();

      if (!session?.access_token) {
        setError("Your session has expired. Please sign in again.");
        return;
      }

      const response = await fetch(`${backendEndpoint}/api/v1/user/onboard`, {
        method: "POST",

        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          fullName: fullName.trim(),
          primaryRole: selectedRole,
          businessName: businessName.trim(),
          businessUrl: businessUrl.trim() || undefined,
          phone: phone.trim(),
          cityId: selectedCityId,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(
          payload?.error ?? "Failed to complete onboarding. Please try again.",
        );
      }

      const data = parseCurrentUserResponse(await response.json());

      if (!data || !data.authenticated || !data.isOnboarded) {
        throw new Error(
          "Onboarding could not be verified. Please try again or sign in again.",
        );
      }

      useUserStore.getState().hydrate(data);
      router.push(getRoleHomePath(data.user.primaryRole));
    } catch (submitError) {
      console.error(submitError);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to complete onboarding. Please try again.",
      );
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

      <SectionTitle title={content.title} description={content.description} />

      <div className="space-y-6">
        <FormInput
          label="Full name"
          placeholder="John Doe"
          value={fullName}
          onChangeAction={setFullName}
          required
          icon={content.fullNameIcon}
        />

        <FormInput
          label={content.businessLabel}
          placeholder={content.businessPlaceholder}
          value={businessName}
          onChangeAction={setBusinessName}
          required
          icon={<Building2 className="h-5 w-5" />}
        />

        <FormInput
          label={content.websiteLabel}
          placeholder="https://example.com"
          value={businessUrl}
          onChangeAction={setBusinessUrl}
          icon={<Globe2 className="h-5 w-5" />}
        />

        <FormInput
          label="Phone number"
          placeholder={content.phonePlaceholder}
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
          placeholder={selectedRole}
          value={selectedRole}
          onChangeAction={() => {}}
          disabled
          icon={<User className="h-5 w-5" />}
        />
      </div>

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

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
          disabled={isSubmitting || !isFormValid}
          className="rounded-sm bg-red-600 hover:bg-red-500 shadow-sm cursor-pointer"
        >
          {isSubmitting ? "Completing..." : "Complete onboarding"}
        </Button>
      </div>
    </div>
  );
}
