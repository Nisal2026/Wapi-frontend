/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Script from "next/script";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";

declare global {
  interface Window {
    FB?: any;
    fbAsyncInit?: () => void;
  }
}

const FacebookContext = createContext<boolean>(false);

export const useFacebookReady = () => useContext(FacebookContext);

export default function FacebookSDKProvider({ children }: { children: ReactNode }) {
  const { setting } = useAppSelector((state) => state.setting);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!setting?.app_id) return;
    if (window.FB) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReady(true);
      return;
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: setting.app_id,
        cookie: true,
        xfbml: false,
        version: "v21.0",
      });

      setReady(true);
    };
  }, [setting?.app_id]);

  return (
    <FacebookContext.Provider value={ready}>
      {setting?.app_id && !window.FB && <Script id="facebook-sdk" src="https://connect.facebook.net/en_US/sdk.js" strategy="afterInteractive" />}
      {children}
    </FacebookContext.Provider>
  );
}
