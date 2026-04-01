/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isBlinking, setIsBlinking] = useState(false);
  const permissionRef = useRef<NotificationPermission>("default");
  const blinkingRef = useRef(false);
  const originalTitle = useRef<string>("");
  const blinkInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isSupported = "Notification" in window;
      const p = isSupported ? (window as any).Notification.permission : "default";
      setPermission(p);
      permissionRef.current = p;
      originalTitle.current = document.title;
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) return "default";
    const result = await (window as any).Notification.requestPermission();
    setPermission(result);
    permissionRef.current = result;
    return result;
  }, []);

  const sendNotification = useCallback((title: string, options?: NotificationOptions & { onClick?: () => void }) => {
    if (permissionRef.current !== "granted" || document.hasFocus()) return;

    try {
      if (!("Notification" in window)) return;
      const notification = new (window as any).Notification(title, {
        icon: "/favicon.ico",
        ...options,
      });

      if (options?.onClick) {
        notification.onclick = () => {
          window.focus();
          options.onClick?.();
          notification.close();
        };
      }
    } catch (error) {
      console.error("Failed to send browser notification:", error);
    }
  }, []);

  const startBlinking = useCallback((messages: string[]) => {
    if (document.hasFocus()) return;

    setIsBlinking(true);
    blinkingRef.current = true;
    if (blinkInterval.current) clearInterval(blinkInterval.current);

    let step = 0;
    const allMessages = [...messages];

    blinkInterval.current = setInterval(() => {
      document.title = allMessages[step % allMessages.length];
      step++;
    }, 2000);
  }, []);

  const stopBlinking = useCallback(() => {
    setIsBlinking(false);
    blinkingRef.current = false;
    if (blinkInterval.current) {
      clearInterval(blinkInterval.current);
      blinkInterval.current = null;
    }
    if (originalTitle.current) {
      document.title = originalTitle.current;
    }
  }, []);

  useEffect(() => {
    const handleFocus = () => stopBlinking();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [stopBlinking]);

  return {
    permission,
    isBlinking,
    requestPermission,
    sendNotification,
    startBlinking,
    stopBlinking,
    isSupported: typeof window !== "undefined" && "Notification" in window,
  };
};
