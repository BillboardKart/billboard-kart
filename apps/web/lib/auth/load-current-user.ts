import { useUserStore } from "@/stores/user-store";
import { createClient } from "@/lib/supabase/server";

export async function loadCurrentUser() {
  const client = await createClient();
  const session = await client.auth.getSession();

  const accessToken = session.data.session?.access_token;
  const response = await fetch("/api/v1/users/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to load current user.");
  }

  const data = await response.json();

  useUserStore.getState().setCurrentUser(data);

  return data;
}
