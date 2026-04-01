import { ShortLinkResponse, ShortLinksListResponse } from "@/src/types/shortLink";
import { baseApi } from "./baseApi";

export const shortLinkApi = baseApi.enhanceEndpoints({ addTagTypes: ["ShortLinks"] }).injectEndpoints({
  endpoints: (builder) => ({
    getShortLinks: builder.query<ShortLinksListResponse, { page?: number; limit?: number; search?: string; sort_by?: string; sort_order?: string } | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) searchParams.append(key, String(value));
          });
        }
        return {
          url: `/short-links?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: (result) => (result?.data?.short_links ? [...result.data.short_links.map(({ _id }) => ({ type: "ShortLinks" as const, id: _id })), { type: "ShortLinks", id: "LIST" }] : [{ type: "ShortLinks", id: "LIST" }]),
    }),
    getShortLinkById: builder.query<ShortLinkResponse, string>({
      query: (id) => ({
        url: `/short-links/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "ShortLinks", id }],
    }),
    createShortLink: builder.mutation<ShortLinkResponse, { mobile: string; first_message: string }>({
      query: (body) => ({
        url: "/short-links",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "ShortLinks", id: "LIST" }],
    }),
    updateShortLink: builder.mutation<ShortLinkResponse, { id: string; mobile: string; first_message: string }>({
      query: ({ id, ...body }) => ({
        url: `/short-links/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ShortLinks", id },
        { type: "ShortLinks", id: "LIST" },
      ],
    }),
    bulkDeleteShortLinks: builder.mutation<{ success: boolean; message: string }, { ids: string[] }>({
      query: (body) => ({
        url: "/short-links/bulk-delete",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "ShortLinks", id: "LIST" }],
    }),
  }),
});

export const { useGetShortLinksQuery, useGetShortLinkByIdQuery, useCreateShortLinkMutation, useUpdateShortLinkMutation, useBulkDeleteShortLinksMutation } = shortLinkApi;
