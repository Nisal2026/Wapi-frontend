"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function ForceLightTheme() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");

    return () => {
      const saved = localStorage.getItem("theme");
      if (saved && saved !== "light") {
        setTheme(saved);
      }
    };
  }, [setTheme]);

  return null;
}
