import { IStateSchema } from "@/app/Provider/Store";
import { createSelector } from "@reduxjs/toolkit";

export const getSidebarMinState = (state: IStateSchema) => state.sidebarMin;

export const getSidebarMinShow = createSelector(
  getSidebarMinState,
  (state) => state.show
);
