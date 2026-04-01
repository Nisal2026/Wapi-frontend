import { baseApi } from "./baseApi";
import type {
  DashboardData,
  DashboardCounts,
  ContactYearlyEntry,
  WeeklyMessageEntry,
  CampaignStatistics,
  CatalogData,
  MostUsedTemplate,
  TemplateInsights,
} from "@/src/types/dashboard";

// Re-export for backward compatibility
export type {
  DashboardData,
  DashboardCounts,
  ContactYearlyEntry,
  WeeklyMessageEntry,
  CampaignStatistics,
  CatalogData,
  MostUsedTemplate,
  TemplateInsights,
};

export const dashboardApi = baseApi.enhanceEndpoints({ addTagTypes: ["Dashboard"] }).injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<{ success: boolean; data: DashboardData }, { dateRange?: string; startDate?: string; endDate?: string } | void>({
      query: (params) => ({
        url: "/dashboard",
        params: params || {},
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
