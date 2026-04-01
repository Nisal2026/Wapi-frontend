/* eslint-disable @typescript-eslint/no-explicit-any */

export type ReplyMaterialSourceType = "ReplyMaterial" | "Template" | "EcommerceCatalog";
export type DelayUnit = "minutes" | "hours" | "days";
export type SendDay = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export interface Sequence {
  _id: string;
  user_id: string;
  waba_id: string;
  name: string;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updatedAt: string;
  __v: number;
  steps_count?: number;
}

export interface SequenceStep {
  _id: string;
  sequence_id: string;
  reply_material_id: string;
  reply_material_type: ReplyMaterialSourceType;
  is_active: boolean;
  delay_value: number;
  delay_unit: DelayUnit;
  send_anytime: boolean;
  from_time?: string;
  to_time?: string;
  send_days: SendDay[];
  sort: number;
  variables_mapping?: Record<string, string>;
  media_url?: string;
  carousel_cards_data?: any[];
  carousel_products?: { product_retailer_id: string; catalog_id: string }[];
  coupon_code?: string;
  offer_expiration_minutes?: number;
  catalog_id?: string;
  product_retailer_id?: string;
  deleted_at: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  /** Populated from backend */
  reply_material_id_data?: any; 
}

/** Grouped response for sequences list */
export interface SequenceListResponse {
  success: boolean;
  data: Sequence[];
}

/** Response for a single sequence with its steps */
export interface SequenceDetailResponse {
  success: boolean;
  data: Sequence & { steps: SequenceStep[] };
}

export interface SequenceResponse {
  success: boolean;
  message?: string;
  data: Sequence;
}

export interface SequenceStepResponse {
  success: boolean;
  message?: string;
  data: SequenceStep;
}
