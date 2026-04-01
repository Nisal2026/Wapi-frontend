import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workspace } from "@/src/types/workspace";

interface WorkspaceState {
  selectedWorkspace: Workspace | null;
}

const getPersistedWorkspace = (): Workspace | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("selectedWorkspace");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const initialState: WorkspaceState = {
  selectedWorkspace: getPersistedWorkspace(),
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspace: (state, action: PayloadAction<Workspace>) => {
      state.selectedWorkspace = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedWorkspace", JSON.stringify(action.payload));
      }
    },
    clearWorkspace: (state) => {
      state.selectedWorkspace = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("selectedWorkspace");
      }
    },
  },
});

export const { setWorkspace, clearWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
