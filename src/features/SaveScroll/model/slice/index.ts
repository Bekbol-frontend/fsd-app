import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISaveScrollSchema } from "../types";

const initialState: ISaveScrollSchema = {
  scroll: {},
};

const saveScrollSlice = createSlice({
  name: "saveScroll",
  initialState,
  reducers: {
    setScrollPosition(
      state,
      { payload }: PayloadAction<{ path: string; position: number }>
    ) {
      const { path, position } = payload;

      state.scroll[path] = position;
    },
  },
});

export const { actions: saveScrollActions } = saveScrollSlice;
export const { reducer: saveScrollReducer } = saveScrollSlice;
