import { createSelector } from "@reduxjs/toolkit";
import { getArticleDetailState } from "../getArticleDetailState";

export const getArticleDetailError = createSelector(
  getArticleDetailState,
  (article) => article?.error
);
