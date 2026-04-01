import { Plan } from "./subscription";

export interface PlanResponse {
  success: boolean;
  data: {
    plans: Plan[];
  };
}

export interface PlansListResponse {
  success: boolean;
  data: {
    plans: Plan[];
  };
}

export interface PaginatedPlansResponse {
  success: boolean;
  data: {
    plans: Plan[];
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
