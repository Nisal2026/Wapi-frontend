/* eslint-disable @typescript-eslint/no-explicit-any */
import { SequenceDetailResponse, SequenceListResponse, SequenceResponse, SequenceStepResponse } from "@/src/types/sequence";
import { baseApi } from "./baseApi";

export const sequenceApi = baseApi.enhanceEndpoints({ addTagTypes: ["Sequence", "SequenceStep"] }).injectEndpoints({
  endpoints: (builder) => ({
    getSequences: builder.query<SequenceListResponse, { waba_id: string }>({
      query: (params) => ({
        url: "/sequences",
        params,
      }),
      providesTags: ["Sequence"],
    }),

    getSequenceById: builder.query<SequenceDetailResponse, string>({
      query: (id) => `/sequences/${id}`,
      providesTags: (result, error, id) => [{ type: "Sequence", id }, "SequenceStep"],
    }),

    createSequence: builder.mutation<SequenceResponse, { waba_id: string; name: string }>({
      query: (body) => ({
        url: "/sequences",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sequence"],
    }),

    updateSequence: builder.mutation<SequenceResponse, { id: string; name?: string; is_active?: boolean }>({
      query: ({ id, ...body }) => ({
        url: `/sequences/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Sequence", id }, "Sequence"],
    }),

    deleteSequence: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/sequences/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sequence"],
    }),

    createSequenceStep: builder.mutation<SequenceStepResponse, any>({
      query: (body) => ({
        url: "/sequences/steps",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SequenceStep"],
    }),

    updateSequenceStep: builder.mutation<SequenceStepResponse, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/sequences/steps/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SequenceStep"],
    }),

    deleteSequenceStep: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/sequences/steps/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SequenceStep"],
    }),

    reorderSequenceSteps: builder.mutation<{ success: boolean; message: string }, { steps: { id: string; sort: number }[] }>({
      query: (body) => ({
        url: "/sequences/steps/reorder",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SequenceStep"],
    }),
  }),
});

export const { useGetSequencesQuery, useGetSequenceByIdQuery, useCreateSequenceMutation, useUpdateSequenceMutation, useDeleteSequenceMutation, useCreateSequenceStepMutation, useUpdateSequenceStepMutation, useDeleteSequenceStepMutation, useReorderSequenceStepsMutation } = sequenceApi;
