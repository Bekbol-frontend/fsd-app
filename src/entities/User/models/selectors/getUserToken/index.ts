import { createSelector } from "@reduxjs/toolkit";
import { getUserState } from "../getUserState/getUserState";

export const getUserToken = createSelector(getUserState, (user) => user.token);
