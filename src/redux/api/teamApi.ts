import { Team, TeamPermissionGroup } from "@/src/types/components";
import { baseApi } from "./baseApi";

export const teamApi = baseApi.enhanceEndpoints({ addTagTypes: ["Teams"] }).injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query<
      {
        success: boolean;
        data: {
          teams: Team[];
          pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
          };
        };
      },
      { page?: number; limit?: number; search?: string; sort_by?: string; sort_order?: string; status?: string }
    >({
      query: (params) => ({
        url: "/teams",
        params,
      }),
      providesTags: ["Teams"],
    }),

    getTeamById: builder.query<{ success: boolean; data: Team }, string>({
      query: (id) => `/teams/${id}`,
      providesTags: (result, error, id) => [{ type: "Teams", id }],
    }),

    getPermissions: builder.query<{ success: boolean; data: TeamPermissionGroup[] }, void>({
      query: () => "/teams/permissions",
    }),

    createTeam: builder.mutation<{ success: boolean; message: string; data: Team }, Partial<Team>>({
      query: (body) => ({
        url: "/teams",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Teams"],
    }),

    updateTeam: builder.mutation<{ success: boolean; message: string; data: Team }, { id: string; body: Partial<Team> }>({
      query: ({ id, body }) => ({
        url: `/teams/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => ["Teams", { type: "Teams", id }],
    }),

    deleteTeams: builder.mutation<{ success: boolean; message: string }, string[]>({
      query: (ids) => ({
        url: "/teams",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["Teams"],
    }),

    toggleTeamStatus: builder.mutation<{ success: boolean; message: string; data: Team }, string>({
      query: (id) => ({
        url: `/teams/${id}/toggle-status`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => ["Teams", { type: "Teams", id }],
    }),
  }),
});

export const { useGetTeamsQuery, useGetTeamByIdQuery, useGetPermissionsQuery, useCreateTeamMutation, useUpdateTeamMutation, useDeleteTeamsMutation, useToggleTeamStatusMutation } = teamApi;
