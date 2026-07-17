import { type Metadata } from "next";
import { RentalsClient } from "@/components/rentals/RentalsClient";

export const metadata: Metadata = {
  title: "My Rentals — BillboardRent",
  description:
    "Track active billboard rentals, upcoming payments, artwork approvals, and renewals in one dashboard.",
};

export default function RentalsPage() {
  return <RentalsClient />;
}
