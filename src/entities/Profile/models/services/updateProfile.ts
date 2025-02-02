import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IThunkAPI } from "@/app/Provider/Store";
import { getProfileFormData } from "../selectors/getProfileFormData";
import { IProfile } from "../types";
import { profileActions } from "../slice";

export const updateProfile = createAsyncThunk<IProfile, string, IThunkAPI>(
  "profile/updateProfile",
  async (id, { rejectWithValue, extra, getState, dispatch }) => {
    try {
      const profileFormData = getProfileFormData(getState());
      const res = await extra.api.put<IProfile>(
        `/profile/${id}`,
        profileFormData
      );

      if (res.status !== 200) {
        throw new Error();
      }

      dispatch(profileActions.setDisabled(true));
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  }
);
