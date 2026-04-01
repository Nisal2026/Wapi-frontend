import { baseApi } from "./baseApi";
import { Workspace } from "@/src/types/workspace";

interface GetWorkspacesResponse {
  success: boolean;
  data: Workspace[];
}

interface CreateWorkspacePayload {
  name: string;
  description?: string;
}

interface UpdateWorkspacePayload {
  id: string;
  name: string;
  description?: string;
}

interface WorkspaceResponse {
  success: boolean;
  data: Workspace;
}

export const workspaceApi = baseApi.enhanceEndpoints({ addTagTypes: ["Workspace"] }).injectEndpoints({
  endpoints: (builder) => ({
    getWorkspaces: builder.query<GetWorkspacesResponse, void>({
      query: () => `/workspace`,
      providesTags: [{ type: "Workspace", id: "LIST" }],
    }),
    createWorkspace: builder.mutation<WorkspaceResponse, CreateWorkspacePayload>({
      query: (body) => ({ url: `/workspace`, method: "POST", body }),
      invalidatesTags: [{ type: "Workspace", id: "LIST" }],
    }),
    updateWorkspace: builder.mutation<WorkspaceResponse, UpdateWorkspacePayload>({
      query: ({ id, ...body }) => ({ url: `/workspace/${id}`, method: "PATCH", body }),
      invalidatesTags: [{ type: "Workspace", id: "LIST" }],
    }),
    deleteWorkspace: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({ url: `/workspace/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Workspace", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetWorkspacesQuery, useCreateWorkspaceMutation, useUpdateWorkspaceMutation, useDeleteWorkspaceMutation } = workspaceApi;
