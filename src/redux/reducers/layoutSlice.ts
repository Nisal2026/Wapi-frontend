import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  sidebarToggle: false,
  isRTL: typeof window !== "undefined" ? localStorage.getItem("isRTL") === "true" : false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setSidebarToggle: (state, action: PayloadAction<boolean | undefined>) => {
      state.sidebarToggle = typeof action.payload === "boolean" ? action.payload : !state.sidebarToggle;
      // Persist to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebarToggle", String(state.sidebarToggle));
      }
    },
    setRTL: (state, action: PayloadAction<boolean | undefined>) => {
      state.isRTL = typeof action.payload === "boolean" ? action.payload : !state.isRTL;
      // Persist to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("isRTL", String(state.isRTL));
      }
    },
  },
});

export const { setSidebarToggle, setRTL } = layoutSlice.actions;

export default layoutSlice.reducer;
