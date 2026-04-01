export interface Currency {
  _id: string;
  name: string;
  code: string;
  symbol: string;
  exchange_rate: number;
  decimal_number: number;
  is_active: boolean;
  is_default: boolean;
}

export interface GetCurrenciesParams {
  is_active?: boolean;
  page?: number;
  limit?: number;
  search?: string;
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}

export interface GetCurrenciesResponse {
  success: boolean;
  data: {
    currencies: Currency[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}
