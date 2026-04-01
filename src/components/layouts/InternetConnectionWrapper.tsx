"use client";

import useInternetConnection from "@/src/hooks/useInternetConnection";
import { InternetConnectionWrapperProps } from "@/src/types/components";
import NoInternetPage from "./NoInternetPage";

const InternetConnectionWrapper = ({ children }: InternetConnectionWrapperProps) => {
  const { isOnline, isChecking, retry } = useInternetConnection();

  if (!isOnline) {
    return <NoInternetPage onRetry={retry} isRetrying={isChecking} />;
  }

  return <>{children}</>;
};

export default InternetConnectionWrapper;
