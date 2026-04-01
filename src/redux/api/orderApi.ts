import { baseApi } from "./baseApi";
import type { OrderItem, Order, OrdersResponse } from "@/src/types/order";

// Re-export for backward compatibility
export type { OrderItem, Order, OrdersResponse };

export const orderApi = baseApi.enhanceEndpoints({ addTagTypes: ["Order"] }).injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrdersResponse, { page?: number; limit?: number; search?: string; sort_by?: string; sort_order?: string }>({
      query: (params) => ({
        url: "/orders",
        params,
      }),
      providesTags: ["Order"],
    }),
    bulkDeleteOrders: builder.mutation<{ success: boolean; message: string }, { ids: string[] }>({
      query: (body) => ({
        url: "/orders/bulk-delete",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useGetOrdersQuery, useBulkDeleteOrdersMutation } = orderApi;
