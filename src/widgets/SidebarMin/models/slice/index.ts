import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISidebarMinSchema } from "../types";

const initialState: ISidebarMinSchema = {
  show: false,
};

const sidebarMinSlice = createSlice({
  name: "sidebarMinSlice",
  initialState,
  reducers: {
    toggleShow(state) {
      state.show = !state.show;
    },
    setShow(state, { payload }: PayloadAction<boolean>) {
      state.show = payload;
    },
  },
});

export const { actions: sidebarMinActions } = sidebarMinSlice;
export const { reducer: sidebarMinReducer } = sidebarMinSlice;
