import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ImportStatus, ImportError, ImportProgressState } from "@/src/types/import";

// Re-export for backward compatibility
export type { ImportStatus, ImportError, ImportProgressState };


const initialState: ImportProgressState = {
  status: "idle",
  jobId: null,
  fileName: "",
  totalRecords: 0,
  processedCount: 0,
  errorCount: 0,
  percent: 0,
  errors: [],
  isMinimized: false,
  isDismissed: false,
};

const importProgressSlice = createSlice({
  name: "importProgress",
  initialState,
  reducers: {
    setImportStarted: (
      state,
      action: PayloadAction<{ jobId: string; fileName: string; totalRecords: number }>
    ) => {
      state.status = "started";
      state.jobId = action.payload.jobId;
      state.fileName = action.payload.fileName;
      state.totalRecords = action.payload.totalRecords;
      state.processedCount = 0;
      state.errorCount = 0;
      state.percent = 0;
      state.errors = [];
      state.isMinimized = false;
      state.isDismissed = false;
    },
    setImportProgress: (
      state,
      action: PayloadAction<{ processedCount: number; totalRecords: number; percent: number }>
    ) => {
      state.status = "progress";
      state.processedCount = action.payload.processedCount;
      state.totalRecords = action.payload.totalRecords;
      state.percent = action.payload.percent;
    },
    setImportCompleted: (
      state,
      action: PayloadAction<{ processedCount: number; errorCount: number; errors: string[] }>
    ) => {
      state.status = "completed";
      state.processedCount = action.payload.processedCount;
      state.errorCount = action.payload.errorCount;
      state.errors = action.payload.errors;
      state.percent = 100;
    },
    setImportFailed: (state, action: PayloadAction<{ message: string }>) => {
      state.status = "failed";
      state.errors = [action.payload.message];
    },
    minimizeImport: (state) => {
      state.isMinimized = true;
    },
    maximizeImport: (state) => {
      state.isMinimized = false;
    },
    dismissImport: (state) => {
      state.isDismissed = true;
      state.isMinimized = false;
    },
    resetImport: () => initialState,
  },
});

export const {
  setImportStarted,
  setImportProgress,
  setImportCompleted,
  setImportFailed,
  minimizeImport,
  maximizeImport,
  dismissImport,
  resetImport,
} = importProgressSlice.actions;

export default importProgressSlice.reducer;
