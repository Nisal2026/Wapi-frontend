"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";
import SessionSyncProvider from "./SessionSyncProvider";

const SessionWrapper = ({ children, session }: { children: React.ReactNode; session: Session | null }) => {
  return (
    <SessionProvider session={session}>
      <SessionSyncProvider>
        {children}
      </SessionSyncProvider>
    </SessionProvider>
  );
};

export default SessionWrapper;
