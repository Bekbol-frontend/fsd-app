import { IThunkAPI } from "@/app/Provider/Store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProfile } from "../types";
import { AxiosError } from "axios";

export const fetchProfile = createAsyncThunk<IProfile, string, IThunkAPI>(
  "fetvhProfile/profile",
  async (id, { rejectWithValue, extra }) => {
    try {
      const response = await extra.api.get<IProfile>(`/profile/${id}`);

      if (response.status !== 200) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  }
);
