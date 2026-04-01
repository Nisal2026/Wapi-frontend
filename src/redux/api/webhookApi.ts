/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";
import { Webhook, WebhookById, WebhookListResponse, WebhookResponse } from "../../types/webhook";

export const webhookApi = baseApi.enhanceEndpoints({ addTagTypes: ["Webhook"] }).injectEndpoints({
  endpoints: (builder) => ({
    listWebhooks: builder.query<WebhookListResponse, void>({
      query: () => "/webhooks/list",
      providesTags: ["Webhook"],
    }),
    getWebhook: builder.query<WebhookById, string>({
      query: (id) => `/webhooks/${id}`,
      providesTags: (result, error, id) => [{ type: "Webhook", id }],
    }),
    createWebhook: builder.mutation<Webhook, Partial<Webhook>>({
      query: (body) => ({
        url: "/webhooks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Webhook"],
    }),
    updateWebhook: builder.mutation<Webhook, { id: string; body: Partial<Webhook> }>({
      query: ({ id, body }) => ({
        url: `/webhooks/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => ["Webhook", { type: "Webhook", id }],
    }),
    deleteWebhook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/webhooks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Webhook"],
    }),
    toggleWebhook: builder.mutation<Webhook, string>({
      query: (id) => ({
        url: `/webhooks/${id}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => ["Webhook", { type: "Webhook", id }],
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapTemplate: builder.mutation<WebhookResponse, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/webhooks/${id}/map-template`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { id }) => ["Webhook", { type: "Webhook", id }],
    }),
  }),
});

export const { useListWebhooksQuery, useGetWebhookQuery, useCreateWebhookMutation, useUpdateWebhookMutation, useDeleteWebhookMutation, useToggleWebhookMutation, useMapTemplateMutation } = webhookApi;
