"use client";

import { useAppDispatch } from "@/src/redux/hooks";
import { setCredentials, stopLoading, updateUser } from "@/src/redux/reducers/authSlice";
import { User } from "@/src/types/auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useGetProfileQuery } from "../redux/api/authApi";

const SessionSyncProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const { data: profileData } = useGetProfileQuery(undefined, {
    skip: status !== "authenticated",
  });

  useEffect(() => {
    if (status === "authenticated" && session) {
      // Map session data to User interface
      const userData: User = {
        id: session.user?.id || "",
        name: session.user?.name || session.user?.email?.split("@")[0] || "User",
        email: session.user?.email || "",
        role: session.user?.role || "user",
        avatar: session.user?.image || undefined,
      };

      dispatch(
        setCredentials({
          user: userData,
          token: session.accessToken || "",
        })
      );
    } else if (status === "unauthenticated") {
      dispatch(stopLoading());
    }
  }, [session, status, dispatch]);

  useEffect(() => {
    if (profileData?.user) {
      dispatch(updateUser(profileData.user));
    }
  }, [profileData, dispatch]);

  return <>{children}</>;
};

export default SessionSyncProvider;