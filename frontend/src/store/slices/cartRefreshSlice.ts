import { createSlice } from "@reduxjs/toolkit";

type CartRefreshState = {
  version: number;
};

const initialState: CartRefreshState = {
  version: 0,
};

const cartRefreshSlice = createSlice({
  name: "cartRefresh",
  initialState,
  reducers: {
    requestCartRefresh: (state) => {
      state.version += 1;
    },
  },
});

export const { requestCartRefresh } = cartRefreshSlice.actions;
export const cartRefreshReducer = cartRefreshSlice.reducer;
