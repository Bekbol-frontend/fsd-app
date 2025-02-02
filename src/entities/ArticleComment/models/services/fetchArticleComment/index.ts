import { IThunkAPI } from "@/app/Provider/Store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IArticleComment } from "../../types";

export const fetchArticleComment = createAsyncThunk<
  IArticleComment[],
  void,
  IThunkAPI
>(
  "articleCommentSlice/fetchArticleComment",
  async (_, { rejectWithValue, extra }) => {
    try {
      const response = await extra.api.get<IArticleComment[]>(
        "/article-comments"
      );

      if (response.status !== 200) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  }
);
