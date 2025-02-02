import { createSlice } from "@reduxjs/toolkit";
import { ICounterSchema } from "../types";

const initialState: ICounterSchema = {
  value: 1,
};

const counterSlice = createSlice({
  name: "counter-slice",
  initialState,
  reducers: {
    plus(state) {
      state.value += 1;
    },
    minus(state) {
      state.value -= 1;
    },
  },
});

export const { actions: counterActions } = counterSlice;
export const { reducer: counterReducer } = counterSlice;
