import type { RoleOption } from "@/lib/types";

export const ONBOARDING_ROLES: ReadonlyArray<RoleOption> = [
  {
    id: "advertiser",
    title: "I want to advertise",
    description:
      "Browse premium billboard inventory, launch campaigns, and reach your audience.",
    badge: null,
  },
  {
    id: "owner",
    title: "I own billboard inventory",
    description:
      "List your billboard sites, manage bookings, and grow your revenue.",
    badge: "Verified Owner",
  },
] as const;
