import { createSelector } from "@reduxjs/toolkit";
import { getArticleDetailState } from "../getArticleDetailState";

export const getArticleDetailLoading = createSelector(
  getArticleDetailState,
  (article) => article?.isLoading || false
);
