import type { Metadata } from "next";
import ReviewClient from "./review-client";

// Clean, static metadata handling optimized for Next.js SEO
export const metadata: Metadata = {
  title: "Upload Artwork — BillboardRent",
  description: "Upload your creative for your booked billboards.",
};

export default function UploadPage() {
  return <ReviewClient />;
}
