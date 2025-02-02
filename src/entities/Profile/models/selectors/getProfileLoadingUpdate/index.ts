import { createSelector } from "@reduxjs/toolkit";
import { getProfile } from "../getProfile";

export const getProfileLoadingUpdate = createSelector(
  getProfile,
  (profile) => profile?.isLoadingUpdate || false
);
