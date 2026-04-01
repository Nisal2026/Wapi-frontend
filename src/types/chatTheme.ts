export interface FormValues {
  theme_color: string | null;
  user_bubble_color: string | null;
  contact_bubble_color: string | null;
  bg_color: string | null;
  bg_image: File | string | null;
  user_text_color: string | null;
  contact_text_color: string | null;
}

export interface ThemePreset {
  id: number;
  type: string;
  name: string;
  bg_color: string;
  user_bubble: string;
  contact_bubble: string;
  theme_color: string;
}
