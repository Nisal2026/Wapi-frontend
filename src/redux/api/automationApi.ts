import { baseApi } from "./baseApi";

export const automationApi = baseApi.enhanceEndpoints({ addTagTypes: ["AutomationFlow"] }).injectEndpoints({
  endpoints: (builder) => ({
    getAutomationFlows: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.search) queryParams.append("search", params.search);
        if (params?.sort_by) queryParams.append("sort_by", params.sort_by);
        if (params?.sort_order) queryParams.append("sort_order", params.sort_order);
        return {
          url: `/automation?${queryParams.toString()}`,
        };
      },
      providesTags: ["AutomationFlow"],
    }),
    getAutomationFlow: builder.query({
      query: (flowId) => `/automation/${flowId}`,
      providesTags: (result, error, flowId) => [{ type: "AutomationFlow", id: flowId }],
    }),
    createAutomationFlow: builder.mutation({
      query: (body) => ({
        url: "/automation",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AutomationFlow"],
    }),
    updateAutomationFlow: builder.mutation({
      query: ({ flowId, ...body }) => ({
        url: `/automation/${flowId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { flowId }) => [
        { type: "AutomationFlow", id: flowId },
        "AutomationFlow",
      ],
    }),
    deleteAutomationFlow: builder.mutation({
      query: (ids) => ({
        url: `/automation/${ids}`,
        method: "DELETE",
        body: { ids: Array.isArray(ids) ? ids : [ids] },
      }),
      invalidatesTags: ["AutomationFlow"],
    }),
    toggleAutomationFlow: builder.mutation({
      query: ({ flowId, is_active }) => ({
        url: `/automation/${flowId}/toggle`,
        method: "PATCH",
        body: { is_active },
      }),
      invalidatesTags: (result, error, { flowId }) => [
        { type: "AutomationFlow", id: flowId },
        "AutomationFlow",
      ],
    }),
  }),
});

export const {
  useGetAutomationFlowsQuery,
  useGetAutomationFlowQuery,
  useCreateAutomationFlowMutation,
  useUpdateAutomationFlowMutation,
  useDeleteAutomationFlowMutation,
  useToggleAutomationFlowMutation,
} = automationApi;
