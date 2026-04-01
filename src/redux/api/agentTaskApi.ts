/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";
import { GetAgentTasksParams, GetAgentTasksResponse, CreateAgentTaskRequest, UpdateAgentTaskStatusRequest, AddCommentRequest, AgentTask } from "@/src/types/agentTask";

export const agentTaskApi = baseApi.enhanceEndpoints({ addTagTypes: ["AgentTask"] }).injectEndpoints({
  endpoints: (builder) => ({
    getAgentTasks: builder.query<GetAgentTasksResponse, GetAgentTasksParams>({
      query: (params) => ({
        url: "/agent-task",
        method: "GET",
        params,
      }),
      providesTags: ["AgentTask"],
    }),
    getAgentTaskById: builder.query<any, string>({
      query: (id) => ({
        url: `/agent-task/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "AgentTask", id }],
    }),
    createAgentTask: builder.mutation<any, CreateAgentTaskRequest>({
      query: (data) => ({
        url: "/agent-task",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AgentTask"],
    }),
    updateAgentTask: builder.mutation<any, { id: string; data: Partial<CreateAgentTaskRequest> }>({
      query: ({ id, data }) => ({
        url: `/agent-task/${id}/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AgentTask"],
    }),
    updateAgentTaskStatus: builder.mutation<any, UpdateAgentTaskStatusRequest>({
      query: ({ id, status }) => ({
        url: `/agent-task/${id}/update/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["AgentTask"],
    }),
    deleteAgentTask: builder.mutation<any, string[]>({
      query: (ids) => ({
        url: "/agent-task",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["AgentTask"],
    }),
    addAgentTaskComment: builder.mutation<any, AddCommentRequest>({
      query: ({ id, comment }) => ({
        url: `/agent-task/${id}/comment`,
        method: "POST",
        body: { comment },
      }),
      invalidatesTags: ["AgentTask"],
    }),
    updateAgentTaskComment: builder.mutation<any, { id: string; commentId: string; comment: string }>({
      query: ({ id, commentId, comment }) => ({
        url: `/agent-task/${id}/comment/${commentId}`,
        method: "PUT",
        body: { comment },
      }),
      invalidatesTags: ["AgentTask"],
    }),
    deleteAgentTaskComment: builder.mutation<any, { id: string; commentId: string }>({
      query: ({ id, commentId }) => ({
        url: `/agent-task/${id}/comment/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AgentTask"],
    }),
  }),
});

export const { 
  useGetAgentTasksQuery, 
  useGetAgentTaskByIdQuery, 
  useCreateAgentTaskMutation, 
  useUpdateAgentTaskMutation, 
  useUpdateAgentTaskStatusMutation, 
  useDeleteAgentTaskMutation, 
  useAddAgentTaskCommentMutation,
  useUpdateAgentTaskCommentMutation,
  useDeleteAgentTaskCommentMutation
} = agentTaskApi;
