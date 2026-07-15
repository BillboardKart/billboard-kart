import AccountOverview from "@/components/account/AccountOverview";
import { TopNav } from "@/components/app/TopNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account | BillboardRent",
  description:
    "Manage your BillboardRent profile, billing, security and workspace settings.",
};

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-background">
      <TopNav />
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
        <AccountOverview
          name="Alex Rivera"
          email="alex@billboardrent.com"
          avatar="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80"
        />
      </div>
    </main>
  );
}
