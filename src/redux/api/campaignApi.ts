import { baseApi } from "./baseApi";

export const campaignApi = baseApi.enhanceEndpoints({ addTagTypes: ["Campaign"] }).injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: (params) => ({
        url: "/campaigns",
        params,
      }),
      providesTags: ["Campaign"],
    }),
    getCampaignById: builder.query({
      query: (id) => ({
        url: `/campaigns/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Campaign", id }],
    }),
    createCampaign: builder.mutation({
      query: (data) => ({
        url: "/campaigns",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Campaign"],
    }),
    updateCampaign: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/campaigns/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Campaign", { type: "Campaign", id }],
    }),
    deleteCampaign: builder.mutation({
      query: (ids) => ({
        url: "/campaigns/bulk-delete",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["Campaign"],
    }),
  }),
});

export const { useGetCampaignsQuery, useGetCampaignByIdQuery, useCreateCampaignMutation, useUpdateCampaignMutation, useDeleteCampaignMutation } = campaignApi;
