"use client";

import Image from "next/image";
import Link from "next/link";
// import { motion } from "framer-motion";
import {
  ArrowUpRight,
  //   Bell,
  Building2,
  CreditCard,
  //   FileText,
  Settings,
  //   ShieldCheck,
  //   User2,
  Users,
} from "lucide-react";

import { useUserStore } from "@/stores/user-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AccountOverview() {
  const user = useUserStore((state) => state.user);

  const avatar =
    user?.avatarUrl ||
    "https://ui-avatars.com/api/?name=User&background=ececec&color=555";

  const firstName = user?.fullName?.trim().split(" ")[0] || "User";
  const fullName = user?.fullName;
  const email = user?.email;

  return (
    <div className="space-y-10">
      {/* Hero */}

      <Card className="overflow-hidden rounded-[36px] border-border shadow-none">
        <div className="relative">
          <div className="h-36 bg-linear-to-r from-red-50 via-background to-red-50 dark:from-red-950/20 dark:to-red-950/20" />

          <div className="px-8 pb-8">
            <div className="-mt-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex items-center gap-5">
                <div className="relative h-28 w-28 overflow-hidden rounded-3xl border-4 border-background">
                  <Image
                    src={avatar}
                    alt={firstName}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                <div>
                  <Badge variant="secondary" className="mb-3 rounded-full">
                    BillboardRent Founder
                  </Badge>

                  <h1 className="text-4xl font-semibold tracking-tight">
                    {fullName}
                  </h1>

                  <p className="mt-2 text-muted-foreground">{email}</p>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 rounded-sm"
              >
                <Link href="/">
                  Account Settings
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-3">
        <Card className="rounded-3xl shadow-none border-border bg-background">
          <div className="p-6">
            <Building2 className="h-8 w-8 text-red-600" />

            <h3 className="mt-6 text-4xl font-semibold">12</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Billboards rented
            </p>
          </div>
        </Card>

        <Card className="rounded-3xl shadow-none">
          <div className="p-6">
            <CreditCard className="h-8 w-8 text-red-600" />

            <h3 className="mt-6 text-4xl font-semibold">₹4.8L</h3>

            <p className="mt-2 text-sm text-muted-foreground">Lifetime spend</p>
          </div>
        </Card>

        <Card className="rounded-3xl shadow-none">
          <div className="p-6">
            <Users className="h-8 w-8 text-red-600" />

            <h3 className="mt-6 text-4xl font-semibold">4</h3>

            <p className="mt-2 text-sm text-muted-foreground">Team members</p>
          </div>
        </Card>
      </div>

      {/* Settings */}
      {/*
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-semibold tracking-tight">Account</h2>

          <p className="mt-2 text-muted-foreground">
            Everything related to your profile, billing, organization and
            security.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {MENU_ITEMS.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
              >
                <Link href={item.href}>
                  <Card className="group rounded-3xl border-border shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg">
                    <div className="flex items-center justify-between p-6">
                      <div className="flex items-start gap-5">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted transition-colors group-hover:bg-red-50 dark:group-hover:bg-red-950/20">
                          <Icon className="h-6 w-6 text-red-600" />
                        </div>

                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">
                              {item.title}
                            </h3>

                            {item.badge ? (
                              <Badge
                                variant="secondary"
                                className="rounded-full"
                              >
                                {item.badge}
                              </Badge>
                            ) : null}
                          </div>

                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
      */}

      <Separator />

      {/* Organization */}

      <Card className="rounded-4xl shadow-none">
        <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Badge variant="outline" className="rounded-full">
              Organization
            </Badge>

            <h2 className="mt-4 text-2xl font-semibold">BillboardRent Inc.</h2>

            <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
              You&apos;re currently the workspace owner. Manage members, billing
              permissions and organization settings from one place.
            </p>
          </div>

          <Button asChild size="lg" variant="outline" className="rounded-sm">
            <Link href="/organization">
              <Settings className="mr-2 h-4 w-4" />
              Manage Workspace
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
