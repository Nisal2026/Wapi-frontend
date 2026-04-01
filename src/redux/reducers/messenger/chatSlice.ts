import { RecentChatResponseItem } from "@/src/types/components/chat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStorage } from "@/src/utils";

const storage = getStorage();

interface ChatState {
  selectedChat: RecentChatResponseItem | null;
  selectedPhoneNumberId: string | null;
  profileToggle: boolean;
  isRehydrated: boolean;
  leftSidebartoggle: boolean;
  isMobileScreen: boolean;
  replyToMessage: RecentChatResponseItem["lastMessage"] | null;
}

const initialState: ChatState = {
  selectedChat: null,
  selectedPhoneNumberId: null,
  profileToggle: true,
  isRehydrated: false,
  leftSidebartoggle: true,
  isMobileScreen: false,
  replyToMessage: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    rehydrateChat: (state) => {
      state.selectedChat = storage.getItem("selectedChat");
      const savedPhoneId = storage.getItem("selectedPhoneNumberId");
      state.selectedPhoneNumberId = savedPhoneId === "undefined" || !savedPhoneId ? null : savedPhoneId;
      state.isRehydrated = true;
    },
    selectChat: (state, action: PayloadAction<RecentChatResponseItem | null>) => {
      state.selectedChat = action.payload;
      state.replyToMessage = null;
      if (action.payload) {
        storage.setItem("selectedChat", action.payload);
      } else {
        storage.removeItem("selectedChat");
      }
    },
    selSelectPhoneNumber: (state, action: PayloadAction<string | null | { id: string | null; skipClearChat?: boolean }>) => {
      const payload = action.payload;
      const id = typeof payload === "string" || payload === null ? payload : payload.id;
      const skipClearChat = typeof payload === "object" && payload !== null ? payload.skipClearChat : false;

      state.selectedPhoneNumberId = id;
      if (!skipClearChat) {
        state.selectedChat = null;
        state.replyToMessage = null;
        storage.removeItem("selectedChat");
      }

      if (id) {
        storage.setItem("selectedPhoneNumberId", id);
      } else {
        storage.removeItem("selectedPhoneNumberId");
      }
    },
    setProfileToggle: (state) => {
      state.profileToggle = !state.profileToggle;
    },
    setLeftSidebartoggle: (state, action: PayloadAction<{ isMobile: boolean; forceState?: boolean }>) => {
      if (typeof action.payload.forceState === "boolean") {
        state.leftSidebartoggle = action.payload.forceState;
      } else {
        state.leftSidebartoggle = !state.leftSidebartoggle;
      }
    },
    setProfileToggleStatus: (state, action: PayloadAction<boolean>) => {
      state.profileToggle = action.payload;
    },
    setIsMobileScreen: (state, action: PayloadAction<boolean>) => {
      state.isMobileScreen = action.payload;
    },
    updateSelectedChatStatus: (state, action: PayloadAction<"open" | "resolved">) => {
      if (state.selectedChat) {
        state.selectedChat.contact.chat_status = action.payload;
        storage.setItem("selectedChat", state.selectedChat);
      }
    },
    setReplyToMessage: (state, action: PayloadAction<RecentChatResponseItem["lastMessage"] | null>) => {
      state.replyToMessage = action.payload;
    },
    clearReplyToMessage: (state) => {
      state.replyToMessage = null;
    },
    resetChatState: (state) => {
      state.selectedChat = null;
      state.selectedPhoneNumberId = null;
      if (typeof window !== "undefined") {
        storage.removeItem("selectedChat");
        storage.removeItem("selectedPhoneNumberId");
      }
    },
  },
});

export const { selectChat, selSelectPhoneNumber, setProfileToggle, setProfileToggleStatus, rehydrateChat, setLeftSidebartoggle, setIsMobileScreen, resetChatState, updateSelectedChatStatus, setReplyToMessage, clearReplyToMessage } = chatSlice.actions;
export default chatSlice.reducer;
