"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";

export default function Example() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error(error);
      }

      console.log("Logged in user:", user);

      setUser(user);
      setLoading(false);
    }

    loadUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user is logged in.</p>;
  }

  return (
    <div className="max-w-lg rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">Logged In User</h2>

      <div className="space-y-2">
        <p>
          <strong>User ID:</strong> {user.id}
        </p>

        <p>
          <strong>Name:</strong> {user.user_metadata?.full_name ?? "N/A"}
        </p>

        <p>
          <strong>Email:</strong> {user.email ?? "N/A"}
        </p>

        <p>
          <strong>Provider:</strong> {user.app_metadata?.provider ?? "N/A"}
        </p>

        <p>
          <strong>Email Verified:</strong>{" "}
          {user.email_confirmed_at ? "Yes" : "No"}
        </p>

        <p>
          <strong>Created At:</strong>{" "}
          {new Date(user.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
