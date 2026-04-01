/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import layoutReducer from "./reducers/layoutSlice";
import settingSlice from "./reducers/settingSlice";
import { baseApi } from "./api/baseApi";
import chatReducer from "./reducers/messenger/chatSlice";
import previewReducer from "./reducers/previewSlice";
import catalogueReducer from "./reducers/catalogueSlice";
import importProgressReducer from "./reducers/importProgressSlice";
import workspaceReducer from "./reducers/workspaceSlice";
import currencyReducer from "./reducers/currencySlice";


const appReducer = combineReducers({
  auth: authSlice,
  layout: layoutReducer,
  setting: settingSlice,
  chat: chatReducer,
  preview: previewReducer,
  catalogue: catalogueReducer,
  importProgress: importProgressReducer,
  workspace: workspaceReducer,
  currency: currencyReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/setLogout") {
    if (typeof window !== "undefined") {
      localStorage.removeItem("selectedChat");
      localStorage.removeItem("selectedPhoneNumberId");
      localStorage.removeItem("app_settings");
      localStorage.removeItem("selectedWorkspace");
    }
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
