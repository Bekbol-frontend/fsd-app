import { IStateSchema } from "@/app/Provider/Store";
import { createSelector } from "@reduxjs/toolkit";
import { IArticleCommentSchema } from "../types";

export const getArticleDetailCommentsState = (state: IStateSchema) =>
  state.article_comment;

export const getArticleDetailCommentsLoading = createSelector(
  getArticleDetailCommentsState,
  (state) => state?.isLoading || false
);

export const getArticleDetailCommentsError = createSelector(
  getArticleDetailCommentsState,
  (state) => state?.error
);

// ---------

export const getArticleCommentAddLoading = createSelector(
  getArticleDetailCommentsState,
  (state) => state?.addLoading || false
);

export const getArticleCommentAddError = createSelector(
  getArticleDetailCommentsState,
  (state) => state?.addError
);
