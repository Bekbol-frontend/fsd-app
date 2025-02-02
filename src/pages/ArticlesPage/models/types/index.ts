import { ArticleView, IArticle } from "@/entities/Article/models/types";
import { EntityState } from "@reduxjs/toolkit";

export interface IArticleSchema extends EntityState<IArticle> {
  isLoading: boolean;
  error?: string;
  view: ArticleView;

  limit?: number;
  page: number;
  totalCount: number;

  checkFetch: boolean;
}
