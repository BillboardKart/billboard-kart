// import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh overflow-hidden bg-background">
      <main className="mx-auto flex min-h-svh w-full max-w-7xl items-start justify-center px-4 py-8 lg:items-center">
        {children}
      </main>

      {/* NOTE: ADD FOOTER*/}
    </div>
  );
}
