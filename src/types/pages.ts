export interface Page {
  _id: string;
  title: string;
  slug: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  meta_image?: string;
  status: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface GetPagesResponse {
  success: boolean;
  data: {
    pages: Page[];
    pagination: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
    };
  };
}
