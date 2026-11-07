"use client";

import { useEffect } from "react";

import { createClient } from "@/lib/supabase/client";
import { fetchCurrentUser } from "@/lib/auth/current-user";
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
    let loadSequence = 0;

    async function loadUser(accessToken?: string) {
      const sequence = ++loadSequence;
      try {
        setLoading(true);

        let token = accessToken;
        if (!token) {
          const supabase = createClient();
          const {
            data: { session },
          } = await supabase.auth.getSession();
          token = session?.access_token;
        }

        if (!token) {
          if (mounted && sequence === loadSequence) clearUser();
          return;
        }

        const user = await fetchCurrentUser(token);
        if (mounted && sequence === loadSequence) {
          if (user) hydrate(user);
          else clearUser();
        }
      } catch (err) {
        console.error("[UserProvider]", err);
        if (mounted && sequence === loadSequence) clearUser();
      } finally {
        if (mounted && sequence === loadSequence) setLoading(false);
      }
    }

    loadUser();
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event: string, session: { access_token: string } | null) => {
        if (event === "SIGNED_OUT") {
          loadSequence++;
          clearUser();
        }
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          void loadUser(session?.access_token);
        }
      },
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [hydrate, clearUser, setLoading]);

  return <>{children}</>;
}
