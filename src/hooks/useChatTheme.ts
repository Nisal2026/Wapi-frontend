"use client";

import { useAppSelector } from "@/src/redux/hooks";

export const CHAT_THEME_DEFAULTS = {
  theme_color: null,
  user_bubble_color: null,
  contact_bubble_color: null,
  bg_color: null,
  user_text_color: null,
  contact_text_color: null,
};

export const useChatTheme = () => {
  const { userSetting } = useAppSelector((state) => state.setting);
  const data = userSetting?.data;

  // Check if we have CUSTOM settings (not null/empty)
  const isCustom = !!(data?.theme_color || data?.bg_color || data?.bg_image);

  return {
    isCustom,
    themeColor: data?.theme_color || CHAT_THEME_DEFAULTS.theme_color,
    userBubbleColor: data?.user_bubble_color || CHAT_THEME_DEFAULTS.user_bubble_color,
    contactBubbleColor: data?.contact_bubble_color || CHAT_THEME_DEFAULTS.contact_bubble_color,
    bgColor: data?.bg_color || CHAT_THEME_DEFAULTS.bg_color,
    bgImage: data?.bg_image ? (data.bg_image.startsWith("http") ? data.bg_image : `${process.env.NEXT_PUBLIC_STORAGE_URL}${data.bg_image}`) : null,
    userTextColor: data?.user_text_color || CHAT_THEME_DEFAULTS.user_text_color,
    contactTextColor: data?.contact_text_color || CHAT_THEME_DEFAULTS.contact_text_color,
  };
};
