import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProfile, IProfileSchema } from "../types";
import { fetchProfile } from "../services/fetchProfile";
import { updateProfile } from "../services/updateProfile";

const initialState: IProfileSchema = {
  profile: null,
  formProfile: null,
  isLoading: false,
  isLoadingUpdate: false,
  error: undefined,
  errorUpdate: undefined,
  disabled: true,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setDisabled: (state, { payload }: PayloadAction<boolean>) => {
      state.disabled = payload;
    },
    setCancelDisabled: (state) => {
      state.disabled = true;
      state.formProfile = state.profile;
    },
    setFormData: (state, { payload }: PayloadAction<IProfile>) => {
      state.formProfile = { ...state.formProfile, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<IProfile>) => {
          state.isLoading = false;
          state.profile = action.payload;
          state.formProfile = action.payload;
        }
      )
      .addCase(
        fetchProfile.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )

      .addCase(updateProfile.pending, (state) => {
        state.isLoadingUpdate = true;
        state.errorUpdate = undefined;
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<IProfile>) => {
          state.isLoadingUpdate = false;
          state.profile = action.payload;
          state.formProfile = action.payload;
        }
      )
      .addCase(
        updateProfile.rejected,
        (state, { payload }: PayloadAction<string | undefined>) => {
          state.isLoadingUpdate = false;
          state.errorUpdate = payload;
        }
      );
  },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
