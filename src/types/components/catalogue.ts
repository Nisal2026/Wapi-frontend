export interface Pagination {
  total: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AvailableCatalogue {
  id: string;
  _id: string;
  name: string;
  product_count: number;
  catalog_id: string;
}

export interface Catalogue {
  _id: string;
  user_id: string;
  waba_id: string;
  catalog_id: string;
  name: string;
  currency: string;
  country: string;
  is_linked: boolean;
  is_active: boolean;
  meta_data: {
    id: string;
    name: string;
  };
  deleted_at: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  product_count: number;
}

export interface ProductAttribute {
  key: string;
  value: string;
}

export interface Product {
  _id: string;
  user_id: string;
  catalog_id: string;
  product_external_id: string;
  name: string;
  description: string;
  price: string | number;
  sale_price?: string | number;
  currency: string;
  availability: string;
  condition: string;
  image_urls: string[];
  image_url: string;
  url: string;
  category: string;
  brand: string;
  retailer_id: string;
  is_active: boolean;
  is_variant: boolean;
  retailer_product_group_id: string;
  parent_product_external_id: string | null;
  deleted_at: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  variants: Product[];
}

export interface ProductPayload {
  retailer_id: string;
  name: string;
  description: string;
  price: number;
  sale_price: number;
  currency: string;
  availability: string;
  condition: string;
  image_urls: string[];
  image_url: string;
  url: string;
  category: string;
  brand: string;
}

export interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: ProductPayload) => Promise<void>;
  isLoading: boolean;
  title: string;
}
