// lib/use-resolve-billboards.ts
"use client";

import { useEffect, useState } from "react";
import { getBillboard, type Billboard } from "@/lib/billboards";
import { fetchBillboard } from "@/lib/billboard-api";

/**
 * Resolves billboard ids to Billboard objects: static dummy data first
 * (`getBillboard`), then the live API (`fetchBillboard`) for anything the
 * dummy dataset doesn't know. Pattern is meant for booking-chain clients
 * that hold ids in a selection store or URL params.
 */
export function useResolveBillboards(ids: (string | undefined | null)[]) {
  const [fetched, setFetched] = useState<Record<string, Billboard>>({});
  const idKey = ids.filter(Boolean).join(",");

  useEffect(() => {
    if (!idKey) return;
    let cancelled = false;

    for (const id of [...new Set(idKey.split(","))]) {
      if (getBillboard(id) || fetched[id]) continue;
      fetchBillboard(id)
        .then((billboard) => {
          if (billboard && !cancelled) {
            setFetched((prev) =>
              prev[id] ? prev : { ...prev, [id]: billboard },
            );
          }
        })
        .catch(() => {
          // API unreachable — nothing to resolve for this id
        });
    }

    return () => {
      cancelled = true;
    };
  }, [idKey, fetched]);

  const resolve = (id: string): Billboard | undefined =>
    getBillboard(id) ?? fetched[id];

  return resolve;
}
