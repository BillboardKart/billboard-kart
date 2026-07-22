"use client";

import { useEffect } from "react";

import { createClient } from "@/lib/supabase/client";
import type { CurrentUserResponse } from "@/lib/types";
import { useUserStore } from "@/stores/user-store";

type UserProviderProps = {
  children: React.ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const hydrate = useUserStore((state) => state.hydrate);
  const setLoading = useUserStore((state) => state.setLoading);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      try {
        setLoading(true);

        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.access_token) {
          if (mounted) clearUser();
          return;
        }

        const endpoint = process.env.NEXT_PUBLIC_API_URL!;
        const response = await fetch(`${endpoint}/api/v1/user/me`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) throw new Error("Unable to fetch current user.");

        const user: CurrentUserResponse = await response.json();

        if (mounted) hydrate(user);
      } catch (err) {
        console.error("[UserProvider]", err);
        if (mounted) clearUser();
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadUser();
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") clearUser();
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") loadUser();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [hydrate, clearUser, setLoading]);

  return <>{children}</>;
}
