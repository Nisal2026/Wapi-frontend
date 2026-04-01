import { baseApi } from "./baseApi";

export const tagsApi = baseApi.enhanceEndpoints({ addTagTypes: ["Tags"] }).injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.search) queryParams.append("search", params.search);
        return `/tags?${queryParams.toString()}`;
      },
      providesTags: ["Tags"],
    }),
    getTagById: builder.query({
      query: (id) => `/tags/${id}`,
      providesTags: (result, error, id) => [{ type: "Tags", id }],
    }),
    createTag: builder.mutation({
      query: (data) => ({
        url: "/tags",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tags"],
    }),
    updateTag: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/tags/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Tags", { type: "Tags", id }],
    }),
    deleteTag: builder.mutation({
      query: (ids) => ({
        url: `/tags`,
        method: "DELETE",
        body: { ids: Array.isArray(ids) ? ids : [ids] },
      }),
      invalidatesTags: ["Tags"],
    }),
  }),
});

export const { useGetTagsQuery, useGetTagByIdQuery, useCreateTagMutation, useUpdateTagMutation, useDeleteTagMutation } = tagsApi;
