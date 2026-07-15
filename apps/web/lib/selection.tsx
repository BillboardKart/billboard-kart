"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface SelectionItem {
  id: string;
  startDate: string; // ISO
  endDate: string; // ISO
}

interface SelectionState {
  items: SelectionItem[];
  artworkName: string | null;
  add: (item: SelectionItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  setArtwork: (name: string | null) => void;
}

const Ctx = createContext<SelectionState | null>(null);

const KEY = "billboard-selection-v1";

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SelectionItem[]>([]);
  const [artworkName, setArtworkName] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          items?: SelectionItem[];
          artworkName?: string | null;
        };
        if (parsed.items) setItems(parsed.items);
        if (parsed.artworkName !== undefined)
          setArtworkName(parsed.artworkName);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ items, artworkName }));
    } catch {
      /* ignore */
    }
  }, [items, artworkName]);

  const add = useCallback((item: SelectionItem) => {
    setItems((prev) => {
      const next = prev.filter((p) => p.id !== item.id);
      return [...next, item];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setArtworkName(null);
  }, []);

  const value = useMemo<SelectionState>(
    () => ({
      items,
      artworkName,
      add,
      remove,
      clear,
      setArtwork: setArtworkName,
    }),
    [items, artworkName, add, remove, clear],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSelection(): SelectionState {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useSelection must be used inside SelectionProvider");
  return ctx;
}
