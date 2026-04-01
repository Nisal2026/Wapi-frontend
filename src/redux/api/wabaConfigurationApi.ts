import { baseApi } from "./baseApi";
import { WabaConfigPayload, WabaConfigResponse } from "@/src/types/wabaConfiguration";

export const wabaConfigurationApi = baseApi.enhanceEndpoints({ addTagTypes: ["WabaConfiguration"] }).injectEndpoints({
  endpoints: (builder) => ({
    getWabaConfiguration: builder.query<WabaConfigResponse, string>({
      query: (wabaId) => `/waba-configuration/${wabaId}`,
      providesTags: (_, __, wabaId) => [{ type: "WabaConfiguration", id: wabaId }],
    }),

    updateWabaConfiguration: builder.mutation<WabaConfigResponse, { wabaId: string; data: WabaConfigPayload }>({
      query: ({ wabaId, data }) => ({
        url: `/waba-configuration/${wabaId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { wabaId }) => [{ type: "WabaConfiguration", id: wabaId }],
    }),
  }),
});

export const { useGetWabaConfigurationQuery, useUpdateWabaConfigurationMutation } = wabaConfigurationApi;
