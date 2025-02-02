import { IStateSchema } from "@/app/Provider/Store";
import { ArticleView } from "@/entities/Article/models/types";
import { createSelector } from "@reduxjs/toolkit";

export const getArticlesState = (state: IStateSchema) => state.article;

export const getArticlesIsLoading = createSelector(
  getArticlesState,
  (article) => article?.isLoading || false
);

export const getArticlesError = createSelector(
  getArticlesState,
  (article) => article?.error
);

export const getArticlesView = createSelector(
  getArticlesState,
  (article) => article?.view || ArticleView.SMALL
);

export const getArticlesPage = createSelector(
  getArticlesState,
  (article) => article?.page || 1
);

export const getArticlesLimit = (state: IStateSchema) =>
  state.article?.limit || 10;

export const getArticlesCheckFetch = (state: IStateSchema) =>
  state.article?.checkFetch;
