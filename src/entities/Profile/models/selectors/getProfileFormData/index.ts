import { createSelector } from "@reduxjs/toolkit";
import { getProfile } from "../getProfile";

export const getProfileFormData = createSelector(
  getProfile,
  (profile) => profile?.formProfile || null
);
