import { IArticle } from "@/entities/Article/models/types";
import { IUser } from "@/entities/User";
import { EntityState } from "@reduxjs/toolkit";

export interface IArticleComment {
  _id: string;
  text: string;
  articleId: IArticle;
  userId: IUser;
}

export interface IArticleCommentSchema extends EntityState<IArticleComment> {
  isLoading: boolean;
  addLoading: boolean;
  addError?: string;
  error?: string;
}
