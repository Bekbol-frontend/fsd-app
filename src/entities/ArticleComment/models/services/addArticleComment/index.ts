import { IThunkAPI } from "@/app/Provider/Store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IArticleComment } from "../../types";

interface IComment {
  text: string;
  articleId: string;
  userId: string;
}

export const addArticleComment = createAsyncThunk<
  IArticleComment,
  IComment,
  IThunkAPI
>(
  "articleCommentSlice/addArticleComment",
  async (comment, { rejectWithValue, extra }) => {
    try {
      const response = await extra.api.post<IArticleComment>(
        "/article-comments",
        comment
      );
      console.log(response);

      if (response.status !== 201) throw new Error();

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  }
);
