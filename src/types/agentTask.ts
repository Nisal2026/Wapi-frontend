/* eslint-disable @typescript-eslint/no-explicit-any */
export type TaskStatus = "pending" | "in_progress" | "on_hold" | "completed" | "cancelled";
export type TaskPriority = "low" | "medium" | "high";

export interface AgentTaskComment {
  _id: string;
  comment: string;
  commented_by: {
    _id: string;
    name: string;
  };
  commented_by_role: string;
  created_at: string;
  updated_at: string;
}

export interface AgentTask {
  _id: string;
  title: string;
  description: string;
  agent_id: any;
  assigned_by: string;
  task_priority: TaskPriority;
  status: TaskStatus;
  due_date: string;
  started_at?: string;
  completed_at?: string;
  agent_comments: AgentTaskComment[];
  created_at: string;
  updated_at: string;
}

export interface GetAgentTasksParams {
  agent_id?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}

export interface GetAgentTasksResponse {
  success: boolean;
  data: {
    tasks: AgentTask[];
    pagination: {
      total: number;
      totalPages: number;
      currentPage: number;
      perPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export interface CreateAgentTaskRequest {
  title: string;
  description: string;
  status?: TaskStatus;
  agent_id: string;
  task_priority: TaskPriority;
  due_date?: string;
}

export interface UpdateAgentTaskStatusRequest {
  id: string;
  status: TaskStatus;
}

export interface AddCommentRequest {
  id: string;
  comment: string;
}
