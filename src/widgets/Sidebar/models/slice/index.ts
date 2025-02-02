import { createSlice } from "@reduxjs/toolkit";
import { ISidebarSchema } from "../types";

const initialState: ISidebarSchema = {
  collapsed: false,
};

const sidebarSlice = createSlice({
  name: "sidebar-slice",
  initialState,
  reducers: {
    setCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
  },
});

export const { actions: sidebarActions } = sidebarSlice;
export const { reducer: sidebarReducer } = sidebarSlice;
