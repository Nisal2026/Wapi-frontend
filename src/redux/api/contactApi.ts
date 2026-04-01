import { baseApi } from "./baseApi";

export const contactApi = baseApi.enhanceEndpoints({ addTagTypes: ["Contact"] }).injectEndpoints({
  endpoints: (builder) => ({
    getContact: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.search) queryParams.append("search", params.search);
        if (params.sort_by) queryParams.append("sort_by", params.sort_by);
        if (params.sort_order) queryParams.append("sort_order", params.sort_order);

        return `/contacts?${queryParams.toString()}`;
      },
      providesTags: ["Contact"],
    }),
    getContactsById: builder.query({
      query: (id) => `/contacts/${id}`,
      providesTags: (result, error, id) => [{ type: "Contact", id }],
    }),
    createContact: builder.mutation({
      query: (data) => ({
        url: "/contacts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),
    updateContact: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Contact", { type: "Contact", id }],
    }),
    deleteContact: builder.mutation({
      query: (ids) => ({
        url: `/contacts`,
        method: "DELETE",
        body: { ids: ids },
      }),
      invalidatesTags: ["Contact"],
    }),
    exportContacts: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "/contacts/export",
        method: "POST",
      }),
    }),
    importContacts: builder.mutation<{ success: boolean; message: string; data?: { imported: number; failed: number } }, FormData>({
      query: (formData) => ({
        url: "/contacts/import",
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),
    contactInquiries: builder.mutation({
      query: (data) => ({
        url: "/inquiry",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateContactMutation, useDeleteContactMutation, useGetContactQuery, useGetContactsByIdQuery, useUpdateContactMutation, useExportContactsMutation, useImportContactsMutation, useContactInquiriesMutation } = contactApi;
