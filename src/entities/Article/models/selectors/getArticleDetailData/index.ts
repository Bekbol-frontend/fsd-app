import { createSelector } from "@reduxjs/toolkit";
import { getArticleDetailState } from "../getArticleDetailState";

export const getArticleDetailData = createSelector(
  getArticleDetailState,
  (article) => article?.article || null
);
