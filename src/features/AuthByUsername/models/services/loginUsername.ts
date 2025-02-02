import { IThunkAPI } from "@/app/Provider/Store/model/type";
import { IUser, userActions } from "@/entities/User";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface ILoginUser {
  username: string;
  password: string;
}

export const loginUsername = createAsyncThunk<void, ILoginUser, IThunkAPI>(
  "loginSlice/loginUsername",
  async (user, { rejectWithValue, extra, dispatch }) => {
    try {
      const response = await extra.api.post<{ user: IUser; token: string }>(
        "/login",
        user
      );

      if (!response.data) throw new Error();

      dispatch(userActions.setUser(response.data));
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  }
);
