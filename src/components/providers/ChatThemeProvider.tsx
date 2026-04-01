"use client";

import React, { useEffect, useRef } from "react";
import { useChatTheme } from "@/src/hooks/useChatTheme";

interface ChatThemeProviderProps {
  children: React.ReactNode;
}

const ChatThemeProvider: React.FC<ChatThemeProviderProps> = ({ children }) => {
  const theme = useChatTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const root = containerRef.current;
      root.style.setProperty("--chat-theme-color", theme.themeColor);
      root.style.setProperty("--chat-user-bubble", theme.userBubbleColor);
      root.style.setProperty("--chat-contact-bubble", theme.contactBubbleColor);
      root.style.setProperty("--chat-user-text", theme.userTextColor);
      root.style.setProperty("--chat-contact-text", theme.contactTextColor);
      root.style.setProperty("--chat-bg-color", theme.bgColor);
      root.style.setProperty("--chat-bg-image", theme.bgImage ? `url("${theme.bgImage}")` : "none");
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--chat-theme-color", theme.themeColor);
  }, [theme.themeColor]);

  return (
    <div ref={containerRef} className="h-full w-full contents">
      {children}
    </div>
  );
};

export default ChatThemeProvider;
