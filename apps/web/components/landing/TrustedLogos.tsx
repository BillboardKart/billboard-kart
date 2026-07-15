"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface CompanyLogo {
  readonly name: string;
  readonly logo: string;
}

const companies: readonly CompanyLogo[] = [
  {
    name: "Y Combinator",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Y_Combinator_logo.svg",
  },
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo_%28cropped%29.svg",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Uber",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
];

export default function TrustedLogos() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-red-600" />

            <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Trusted by modern brands & agencies
            </span>
          </div>

          <p className="mt-6 max-w-xl text-center text-sm leading-7 text-muted-foreground">
            Thousands of marketers, founders and agencies use BillboardRent to
            discover premium outdoor advertising inventory across India.
          </p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.15,
            duration: 0.7,
          }}
          className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6"
        >
          {companies.map((company) => (
            <motion.div
              key={company.name}
              whileHover={{
                y: -4,
              }}
              transition={{
                duration: 0.2,
              }}
              className="group flex h-28 items-center justify-center rounded-3xl border border-border bg-card transition-colors duration-300 hover:border-red-600/20"
            >
              <div className="relative h-8 w-28 opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/*
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.3,
            duration: 0.6,
          }}
          className="mt-16 grid gap-6 rounded-[36px] border border-border bg-card p-8 md:grid-cols-3"
        >
          <div className="text-center md:text-left">
            <div className="text-4xl font-semibold tracking-tight text-foreground">
              12K+
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              Campaigns launched
            </p>
          </div>

          <div className="text-center md:text-left">
            <div className="text-4xl font-semibold tracking-tight text-foreground">
              2,400+
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              Premium billboards
            </p>
          </div>

          <div className="text-center md:text-left">
            <div className="text-4xl font-semibold tracking-tight text-foreground">
              40+
            </div>

            <p className="mt-2 text-sm text-muted-foreground">Cities covered</p>
          </div>
        </motion.div>
        */}
      </div>
    </section>
  );
}
