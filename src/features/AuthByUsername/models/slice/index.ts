import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginUsername } from "../services/loginUsername";
import { ILoginUsernameSchame } from "../types";

const initialState: ILoginUsernameSchame = {
  loading: false,
  error: undefined
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUsername.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginUsername.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        loginUsername.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
