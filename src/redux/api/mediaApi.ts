import { baseApi } from "./baseApi";

export const mediaApi = baseApi.enhanceEndpoints({ addTagTypes: ["Media"] }).injectEndpoints({
  endpoints: (builder) => ({
    getAttachments: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.search) queryParams.append("search", params.search);
        if (params.sort_by) queryParams.append("sort_by", params.sort_by);
        if (params.sort_order) queryParams.append("sort_order", params.sort_order);

        return `/attachments?${queryParams.toString()}`;
      },
      providesTags: ["Media"],
    }),
    getAttachmentById: builder.query({
      query: (id) => `/attachments/${id}`,
      providesTags: (result, error, id) => [{ type: "Media", id }],
    }),
    createAttachment: builder.mutation({
      query: (formData) => {
        return {
          url: "/attachments",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Media"],
    }),
    updateAttachment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/attachments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Media", { type: "Media", id }],
    }),
    bulkDeleteAttachments: builder.mutation({
      query: (ids) => ({
        url: `/attachments/delete`,
        method: "POST",
        body: { ids: ids },
      }),
      invalidatesTags: ["Media"],
    }),
  }),
});

export const { useGetAttachmentsQuery, useGetAttachmentByIdQuery, useCreateAttachmentMutation, useUpdateAttachmentMutation, useBulkDeleteAttachmentsMutation } = mediaApi;
