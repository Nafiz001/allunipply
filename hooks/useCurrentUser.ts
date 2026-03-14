"use client";

import { useState, useEffect } from "react";

type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  role: "STUDENT" | "COUNSELOR" | "ADMIN";
};

export function useCurrentUser() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          cache: "no-store",
        });

        if (response.ok) {
          const result = await response.json();
          if (mounted && result?.data) {
            setUser(result.data);
          }
        }
      } catch (error) {
        console.error("Failed to load user", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  return { user, loading };
}
