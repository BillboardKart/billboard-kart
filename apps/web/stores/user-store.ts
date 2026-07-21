// app/stores/user-store.ts
import { create } from "zustand";

import {
  type CurrentUserResponse,
  type UserState,
  emptyUser,
} from "@/lib/types";

type UserStore = {
  user: UserState | null;
  isHydrated: boolean;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  hydrate: (response: CurrentUserResponse) => void;
  setUser: (user: UserState) => void;
  updateUser: (patch: Partial<UserState>) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isHydrated: false,
  isLoading: true,

  setLoading: (loading) => set({ isLoading: loading }),
  hydrate: (response) => {
    // Not authenticated
    if (!response.authenticated) {
      set({
        user: null,
        isHydrated: true,
        isLoading: false,
      });
      return;
    }

    // Authenticated but not onboarded
    if (!response.isOnboarded) {
      set({
        isHydrated: true,
        isLoading: false,
        user: {
          ...emptyUser,
          authenticated: true,
          isOnboarded: false,
          id: response.auth.id,
          email: response.auth.email,
          fullName: response.auth.fullName,
          avatarUrl: response.auth.avatarUrl,
        },
      });
      return;
    }

    // Fully onboarded
    set({
      isHydrated: true,
      isLoading: false,
      user: {
        ...emptyUser,
        authenticated: true,
        isOnboarded: true,
        id: response.user.id,
        tenantId: response.user.tenantId,
        email: response.user.email,
        fullName: response.user.fullName,
        avatarUrl: response.user.avatarUrl,
        primaryRole: response.user.primaryRole,
        status: response.user.status,
      },
    });
  },

  setUser: (user) => set({ user, isHydrated: true, isLoading: false }),

  updateUser: (patch) =>
    set((state) => {
      if (!state.user) {
        return { user: { ...emptyUser, ...patch } };
      }
      return { user: { ...state.user, ...patch } };
    }),

  clearUser: () =>
    set({
      user: null,
      isHydrated: false,
      isLoading: false,
    }),
}));
