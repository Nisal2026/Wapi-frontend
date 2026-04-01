// Import/export progress types

export type ImportStatus = "idle" | "started" | "progress" | "completed" | "failed";

export interface ImportError {
  row?: number;
  message: string;
}

export interface ImportProgressState {
  status: ImportStatus;
  jobId: string | null;
  fileName: string;
  totalRecords: number;
  processedCount: number;
  errorCount: number;
  percent: number;
  errors: string[];
  isMinimized: boolean;
  isDismissed: boolean;
}

export interface ContactImportModalProps {
  open: boolean;
  onClose: () => void;
}

export interface ContactExportModalProps {
  open: boolean;
  onClose: () => void;
  selectedIds: string[];
}
export interface ImportJobData {
  _id: string;
  user_id: string;
  original_filename: string;
  total_records: number;
  processed_count: number;
  error_count: number;
  status: ImportStatus;
  errors: string[];
  created_at: string;
  updated_at: string;
}

export interface ImportJobsListResponse {
  success: boolean;
  data: {
    import_jobs: ImportJobData[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

export interface ImportJobResponse {
  success: boolean;
  data: ImportJobData;
}
