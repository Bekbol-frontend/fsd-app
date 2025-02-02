import { IStateSchema } from "@/app/Provider/Store";
import { getUserState } from "@/entities/User/models/selectors/getUserState/getUserState";
import { routePaths } from "@/shared/config/route";
import { createSelector } from "@reduxjs/toolkit";
import {
  FileText,
  Home,
  LucideIcon,
  NotepadText,
  UserRound,
} from "lucide-react";
import { ISidebarItem } from "../types";

export const getSidebarState = (state: IStateSchema) => state.sidebar;

export const getSidebarCollapsed = createSelector(
  getSidebarState,
  (state) => state.collapsed
);

export const getSidebarItemsList = createSelector(getUserState, (userState) => {
  const siderbarItems: ISidebarItem[] = [
    {
      icon: Home,
      path: routePaths.HOME,
      text: "Home",
    },
    {
      icon: FileText,
      path: routePaths.ABOUT,
      text: "About",
    },
  ];

  if (userState.user) {
    siderbarItems.push(
      {
        icon: UserRound,
        path: `${routePaths.PROFILE}/${userState.user._id}`,
        text: "Profile",
        check: true,
      },
      {
        icon: NotepadText,
        path: routePaths.ARTICLES,
        text: "Articles",
        check: true,
      }
    );
  }

  return siderbarItems;
});
