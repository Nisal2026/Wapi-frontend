import { baseApi } from "./baseApi";
import { ReplyMaterialsResponse, ReplyMaterialQueryParams, ReplyMaterialResponse, BulkDeleteResponse } from "@/src/types/replyMaterial";

export const replyMaterialApi = baseApi.enhanceEndpoints({ addTagTypes: ["ReplyMaterial"] }).injectEndpoints({
  endpoints: (builder) => ({
    getReplyMaterials: builder.query<ReplyMaterialsResponse, ReplyMaterialQueryParams>({
      query: (params) => {
        const qs = new URLSearchParams();
        qs.set("waba_id", params.waba_id);
        if (params.page) qs.set("page", String(params.page));
        if (params.limit) qs.set("limit", String(params.limit));
        if (params.search) qs.set("search", params.search);
        return `/reply-materials?${qs.toString()}`;
      },
      providesTags: ["ReplyMaterial"],
    }),

    createReplyMaterial: builder.mutation<ReplyMaterialResponse, FormData>({
      query: (formData) => ({
        url: "/reply-materials",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ReplyMaterial"],
    }),

    updateReplyMaterial: builder.mutation<ReplyMaterialResponse, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/reply-materials/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["ReplyMaterial"],
    }),

    deleteReplyMaterial: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/reply-materials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ReplyMaterial"],
    }),

    bulkDeleteReplyMaterials: builder.mutation<BulkDeleteResponse, string[]>({
      query: (ids) => ({
        url: "/reply-materials/bulk-delete",
        method: "POST",
        body: { ids },
      }),
      invalidatesTags: ["ReplyMaterial"],
    }),
  }),
});

export const { useGetReplyMaterialsQuery, useCreateReplyMaterialMutation, useUpdateReplyMaterialMutation, useDeleteReplyMaterialMutation, useBulkDeleteReplyMaterialsMutation } = replyMaterialApi;
