import { notFound } from "next/navigation";
import { getBillboard } from "@/lib/billboards";
import type { Metadata } from "next";
import BillboardClient from "./billboard-client";

// In modern Next.js (15+), params is a Promise that must be awaited
type Props = {
  params: Promise<{ id: string }>;
};

// 1. Generate dynamic SEO metadata based on the specific billboard
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const billboard = getBillboard(id);

  if (!billboard) {
    return { title: "Billboard Not Found" };
  }

  return {
    title: `${billboard.name} — BillboardRent`,
    description: `Rent ${billboard.name} in ${billboard.city}. Premium billboard availability, pricing, and specs.`,
  };
}

// 2. Server-side data fetching and rendering
export default async function BillboardPage({ params }: Props) {
  const { id } = await params;
  const billboard = getBillboard(id);

  if (!billboard) {
    notFound(); // Automatically triggers your app/not-found.tsx UI
  }

  // 3. Pass the fetched data to the interactive Client Component
  return <BillboardClient billboard={billboard} />;
}
