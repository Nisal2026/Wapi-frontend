/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useAppSelector } from "@/src/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Loading from "../app/loading";

interface FeatureGuardProps {
  children: React.ReactNode;
}

const FeatureGuard: React.FC<FeatureGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { selectedWorkspace } = useAppSelector((state) => state.workspace);
  const { isAuthenticated, isLoading: authLoading } = useAppSelector((state) => state.auth);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const restrictedPaths = ["/templates", "/campaigns", "/orders", "/catalogues", "/templates_library","/webhooks"];
  
  const isBaileys = selectedWorkspace?.waba_type === "baileys";

  const isRestricted = useMemo(() => {
    if (!isBaileys) return false;
    return restrictedPaths.some((path) => pathname === path || pathname.startsWith(path + "/"));
  }, [isBaileys, pathname]);

  useEffect(() => {
    if (isAuthenticated && isRestricted) {
      setIsRedirecting(true);
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isRestricted, router]);

  useEffect(() => {
    if (!isRestricted && isRedirecting) {
      setIsRedirecting(false);
    }
  }, [pathname, isRestricted, isRedirecting]);

  if (authLoading || (isRestricted && isRedirecting)) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default FeatureGuard;
