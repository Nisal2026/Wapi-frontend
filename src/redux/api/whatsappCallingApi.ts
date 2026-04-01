/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

export const whatsappCallingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCallAgents: builder.query<any, any>({
      query: (params) => ({
        url: "/whatsapp/calling/agents",
        params,
      }),
      providesTags: ["WhatsappCallAgent"],
    }),
    getCallAgentById: builder.query<any, string>({
      query: (id) => `/whatsapp/calling/agents/${id}`,
      providesTags: (result, error, id) => [{ type: "WhatsappCallAgent", id }],
    }),
    createCallAgent: builder.mutation<any, any>({
      query: (body) => ({
        url: "/whatsapp/calling/agents",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WhatsappCallAgent"],
    }),
    updateCallAgent: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/whatsapp/calling/agents/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => ["WhatsappCallAgent", { type: "WhatsappCallAgent", id }],
    }),
    deleteCallAgents: builder.mutation<any, string[]>({
      query: (ids) => ({
        url: "/whatsapp/calling/agents",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["WhatsappCallAgent"],
    }),
    getCallLogs: builder.query<any, any>({
      query: (params) => ({
        url: "/whatsapp/calling/logs",
        params,
      }),
      providesTags: ["WhatsappCallLog"],
    }),
    getCallLogById: builder.query<any, string>({
      query: (id) => `/whatsapp/calling/logs/${id}`,
      providesTags: (result, error, id) => [{ type: "WhatsappCallLog", id }],
    }),
    assignAgentToContact: builder.mutation<any, { contact_id: string; agent_id: string }>({
      query: (body) => ({
        url: "/whatsapp/calling/assign-agent",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { contact_id }) => ["WhatsappCallLog", { type: "Chats", id: contact_id }],
    }),
    assignAgentBulk: builder.mutation<any, { agent_id: string; contact_ids?: string[]; tag_ids?: string[] }>({
      query: (body) => ({
        url: "/whatsapp/calling/assign-agent-bulk",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WhatsappCallLog", "WhatsappCallAgent", "Chats"],
    }),
    removeAgentFromContact: builder.mutation<any, string>({
      query: (contact_id) => ({
        url: `/whatsapp/calling/remove-agent/${contact_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, contact_id) => ["WhatsappCallLog", { type: "Chats", id: contact_id }],
    }),
    removeAgentBulk: builder.mutation<any, { contact_ids?: string[]; tag_ids?: string[] }>({
      query: (body) => ({
        url: "/whatsapp/calling/remove-agent-bulk",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WhatsappCallLog", "WhatsappCallAgent", "Chats"],
    }),
    getCallSettings: builder.query<any, { phone_number_id: string }>({
      query: ({ phone_number_id }) => ({
        url: `/whatsapp/calling/settings?phone_number_id=${phone_number_id}`,
      }),
      providesTags: ["WhatsappCallLog"],
    }),
    updateCallSettings: builder.mutation<any, any>({
      query: (body) => ({
        url: "/whatsapp/calling/settings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WhatsappCallLog"],
    }),
  }),
});

export const { useGetCallAgentsQuery, useGetCallAgentByIdQuery, useCreateCallAgentMutation, useUpdateCallAgentMutation, useDeleteCallAgentsMutation, useGetCallLogsQuery, useGetCallLogByIdQuery, useAssignAgentToContactMutation, useAssignAgentBulkMutation, useRemoveAgentFromContactMutation, useRemoveAgentBulkMutation, useGetCallSettingsQuery, useUpdateCallSettingsMutation } = whatsappCallingApi;
