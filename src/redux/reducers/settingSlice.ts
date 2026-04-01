import { SettingResponse, SettingState, UserSetting } from "@/src/types/settings";
import { Subscription } from "@/src/types/subscription";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SettingState & Partial<SettingResponse> & { subscription: Subscription | null } = {
  setting: null,
  userSetting: null,
  subscription: null,
  app_name: "",
  app_description: "",
  logo_light_url: "",
  logo_dark_url: "",
  landing_logo_url: "",
  sidebar_logo_url: "",
  sidebar_light_logo_url: "",
  sidebar_dark_logo_url: "",
  favicon_url: "",
  favicon_notification_logo_url: "",
  maintenance_mode: false,
  maintenance_title: "",
  maintenance_message: "",
  maintenance_image_url: "",
  maintenance_allowed_ips: [],
  client_ip: "",
  page_404_title: "404 - Not Found",
  page_404_content: "The page you are looking for does not exist.",
  no_internet_title: "No Internet Connection",
  no_internet_content: "Please check your internet connection and try again.",
  default_theme_mode: "light",
  is_demo_mode: false,
  pageTitle: "",
  pageDescription: "",
  allow_user_signup: false,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSetting: (state, action: PayloadAction<SettingResponse>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const settings = (action.payload as any)?.data || action.payload;
      state.setting = settings;
      state.app_name = settings.app_name || state.app_name;
      state.app_description = settings.app_description || state.app_description;
      state.logo_light_url = settings.logo_light_url;
      state.logo_dark_url = settings.logo_dark_url;
      state.landing_logo_url = settings.landing_logo_url || settings.logo_dark_url;
      state.sidebar_logo_url = settings.sidebar_logo_url;
      state.sidebar_light_logo_url = settings.sidebar_light_logo_url;
      state.sidebar_dark_logo_url = settings.sidebar_dark_logo_url;
      state.favicon_url = settings.favicon_url || state.favicon_url;
      state.favicon_notification_logo_url = settings.favicon_notification_logo_url || state.favicon_notification_logo_url;
      state.maintenance_mode = action.payload.maintenance_mode;
      state.maintenance_title = settings.maintenance_title || state.maintenance_title;
      state.maintenance_message = settings.maintenance_message || state.maintenance_message;
      state.maintenance_image_url = settings.maintenance_image_url || state.maintenance_image_url;
      state.maintenance_allowed_ips = settings.maintenance_allowed_ips || [];
      state.client_ip = settings.client_ip || "";
      state.page_404_title = settings.page_404_title || state.page_404_title;
      state.page_404_content = settings.page_404_content || state.page_404_content;
      state.no_internet_title = settings.no_internet_title || state.no_internet_title;
      state.no_internet_content = settings.no_internet_content || state.no_internet_content;
      state.app_email = settings.app_email;
      state.default_theme_mode = settings.default_theme_mode || state.default_theme_mode;
      state.allow_media_send = settings.allow_media_send;
      state.is_demo_mode = settings.is_demo_mode;
      state.allow_user_signup = settings.allow_user_signup;

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("app_settings", JSON.stringify(settings));
        } catch (error) {
          console.error("Failed to cache settings:", error);
        }
      }
    },
    setUserSetting: (state, action: PayloadAction<UserSetting>) => {
      state.userSetting = action.payload;
    },
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.pageTitle = action.payload;
    },
    setPageDescription: (state, action: PayloadAction<string>) => {
      state.pageDescription = action.payload;
    },
    setSubscription: (state, action: PayloadAction<Subscription>) => {
      state.subscription = action.payload;
    },
  },
});

export const { setSetting, setUserSetting, setPageTitle, setPageDescription, setSubscription } = settingSlice.actions;

export default settingSlice.reducer;
