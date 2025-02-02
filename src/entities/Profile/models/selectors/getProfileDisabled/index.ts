import { createSelector } from "@reduxjs/toolkit";
import { getProfile } from "../getProfile";

export const getProfileDisabled = createSelector(
  getProfile,
  (profile) => profile?.disabled || false
);
