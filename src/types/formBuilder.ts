/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormField {
  id?: string;
  type: string;
  label: string;
  name: string;
  required?: boolean;
  options?: { label: string; value: string; id?: string }[];
  step?: number;
  order?: number;
  helper_text?: string;
  default_value?: any;
  meta?: any;
}

export interface Form {
  _id: string;
  name: string;
  description?: string;
  slug: string;
  category: string;
  is_active: boolean;
  is_multi_step: boolean;
  enable_recaptcha?: boolean;
  submit_settings?: {
    success_message?: string;
    button_text?: string;
  };
  appearance?: {
    theme_color?: string;
  };
  contact_settings?: any;
  fields: FormField[];
  flow?: {
    flow_id?: string;
    meta_status?: string;
    sync_status?: string;
    template_name?: string;
    last_synced_at?: string;
    is_flow_enabled?: boolean;
  };
  status?: string;
  created_at: string;
  updated_at: string;
}

export interface EditFormPageProps {
  params: Promise<{
    id: string;
  }>;
}
