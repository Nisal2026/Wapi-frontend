import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreviewState {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
}

const initialState: PreviewState = {
  isOpen: false,
  images: [],
  currentIndex: 0,
};

const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    openPreview: (state, action: PayloadAction<{ images: string[]; index: number }>) => {
      state.isOpen = true;
      state.images = action.payload.images;
      state.currentIndex = action.payload.index;
    },
    closePreview: (state) => {
      state.isOpen = false;
      state.images = [];
      state.currentIndex = 0;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
  },
});

export const { openPreview, closePreview, setCurrentIndex } = previewSlice.actions;
export default previewSlice.reducer;
