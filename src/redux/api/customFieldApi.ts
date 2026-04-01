import { baseApi } from "./baseApi";

export const customFieldApi = baseApi.enhanceEndpoints({ addTagTypes: ["CustomFields", "FieldTypes"] }).injectEndpoints({
  endpoints: (builder) => ({
    getCustomFields: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.search) queryParams.append("search", params.search);
        if (params.sort_by) queryParams.append("sort_by", params.sort_by);
        if (params.sort_order) queryParams.append("sort_order", params.sort_order);

        return `/custom-fields?${queryParams.toString()}`;
      },
      providesTags: ["CustomFields"],
    }),
    getCustomFieldById: builder.query({
      query: (id) => `/custom-fields/${id}`,
      providesTags: (result, error, id) => [{ type: "CustomFields", id }],
    }),
    createCustomField: builder.mutation({
      query: (data) => ({
        url: "/custom-fields",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CustomFields"],
    }),
    updateCustomField: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/custom-fields/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["CustomFields", { type: "CustomFields", id }],
    }),
    deleteCustomField: builder.mutation({
      query: (ids) => ({
        url: `/custom-fields`,
        method: "DELETE",
        body: { ids: ids },
      }),
      invalidatesTags: ["CustomFields"],
    }),
    getFieldTypes: builder.query({
      query: () => "/custom-fields/types",
      providesTags: ["FieldTypes"],
    }),
  }),
});

export const { useGetCustomFieldsQuery, useGetCustomFieldByIdQuery, useCreateCustomFieldMutation, useUpdateCustomFieldMutation, useDeleteCustomFieldMutation, useGetFieldTypesQuery } = customFieldApi;
