/* eslint-disable @typescript-eslint/no-explicit-any */
import { Template } from "@/src/types/components";
import { baseApi } from "./baseApi";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const templateApi = baseApi.enhanceEndpoints({ addTagTypes: ["Template"] }).injectEndpoints({
  endpoints: (builder) => ({
    getTemplates: builder.query<ApiResponse<Template[]>, { waba_id: string; [key: string]: any }>({
      query: (params) => ({
        url: "/template",
        params,
      }),
      providesTags: ["Template"],
    }),
    createTemplate: builder.mutation<ApiResponse<Template>, any>({
      query: (data) => ({
        url: "/template",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Template"],
    }),
    getTemplate: builder.query<ApiResponse<Template>, string>({
      query: (id) => ({
        url: `/template/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Template", id }],
    }),
    updateTemplate: builder.mutation<ApiResponse<Template>, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/template/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Template", id }, "Template"],
    }),
    deleteTemplate: builder.mutation({
      query: (id) => ({
        url: `/template/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Template"],
    }),
    sendTemplate: builder.mutation({
      query: (body) => ({
        url: "/template/send-template",
        method: "POST",
        body,
      }),
    }),
    syncTemplates: builder.mutation({
      query: (body) => ({
        url: "/template/sync",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Template"],
    }),
    suggestTemplate: builder.mutation<ApiResponse<any>, any>({
      query: (data) => ({
        url: "/template/suggest",
        method: "POST",
        body: data,
      }),
    }),
    getMetaTemplates: builder.query<ApiResponse<any[]>, { waba_id: string }>({
      query: (params) => ({
        url: "/template/meta-list",
        params,
      }),
    }),
    syncMetaTemplates: builder.mutation<ApiResponse<any>, { waba_id: string; meta_template_ids: string[] }>({
      query: (body) => ({
        url: "/template/sync",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Template"],
    }),
    syncTemplatesStatus: builder.mutation<ApiResponse<any>, { waba_id: string }>({
      query: (waba_id) => ({
        url: "/template/sync-status",
        method: "POST",
        body: waba_id,
      }),
      invalidatesTags: ["Template"],
    }),
  }),
});

export const { useGetTemplatesQuery, useGetTemplateQuery, useCreateTemplateMutation, useUpdateTemplateMutation, useDeleteTemplateMutation, useSendTemplateMutation, useSyncTemplatesMutation, useSuggestTemplateMutation, useGetMetaTemplatesQuery, useSyncMetaTemplatesMutation, useSyncTemplatesStatusMutation } = templateApi;
