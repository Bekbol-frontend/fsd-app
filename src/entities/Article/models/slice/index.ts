import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArticle, IArticleDetailSchema } from "../types";
import { fetchAricleById } from "../services/fetchArticleById";

const initialState: IArticleDetailSchema = {
  isLoading: false,
  error: undefined,
  article: null,
};

const articleDetailSlice = createSlice({
  name: "article-detail-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAricleById.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        fetchAricleById.fulfilled,
        (state, action: PayloadAction<IArticle>) => {
          state.isLoading = false;
          state.article = action.payload;
        }
      )
      .addCase(
        fetchAricleById.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { reducer: articleDetailReducer } = articleDetailSlice;
export const { actions: articleDetailActions } = articleDetailSlice;
