import { ImportJobResponse, ImportJobsListResponse } from "@/src/types/import";
import { baseApi } from "./baseApi";

export const importJobApi = baseApi.enhanceEndpoints({ addTagTypes: ["ImportJobs"] }).injectEndpoints({
  endpoints: (builder) => ({
    getImportJobs: builder.query<ImportJobsListResponse, { page?: number; limit?: number; search?: string; sort_by?: string; sort_order?: string; status?: string }>({
      query: (params) => ({
        url: "/import-jobs",
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.import_jobs.map(({ _id }: { _id: string }) => ({ type: "ImportJobs" as const, id: _id })),
              { type: "ImportJobs", id: "LIST" },
            ]
          : [{ type: "ImportJobs", id: "LIST" }],
    }),
    getImportJobById: builder.query<ImportJobResponse, string>({
      query: (id) => `/import-jobs/${id}`,
      providesTags: (result, error, id) => [{ type: "ImportJobs", id }],
    }),
    bulkDeleteImportJobs: builder.mutation<{ success: boolean; message: string; data: { deletedCount: number; deletedIds: string[] } }, { ids: string[] }>({
      query: (body) => ({
        url: "/import-jobs/bulk-delete",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "ImportJobs", id: "LIST" }],
    }),
  }),
});

export const { useGetImportJobsQuery, useGetImportJobByIdQuery, useBulkDeleteImportJobsMutation } = importJobApi;
