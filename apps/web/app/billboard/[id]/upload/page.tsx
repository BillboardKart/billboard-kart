import type { Metadata } from "next";
import UploadClient from "./upload-client";

// Clean, static metadata handling optimized for Next.js SEO
export const metadata: Metadata = {
  title: "Upload Artwork — BillboardRent",
  description: "Upload your creative for your booked billboards.",
};

export default function UploadPage() {
  return <UploadClient />;
}
