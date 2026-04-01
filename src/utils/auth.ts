"use client";

import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";

// For use in React components only
export const useGetToken = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return { token: null, isLoading: true };
  }

  if (!session) {
    return { token: null, isLoading: false };
  }

  return { token: session.accessToken, isLoading: false };
};

// For use outside React components (like in RTK Query)
export const getToken = async () => {
  const session = await getSession();
  return session?.accessToken || null;
};
