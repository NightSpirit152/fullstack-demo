import { configureStore } from "@reduxjs/toolkit";
import { cartRefreshReducer } from "./slices/cartRefreshSlice";

export const store = configureStore({
  reducer: {
    cartRefresh: cartRefreshReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
