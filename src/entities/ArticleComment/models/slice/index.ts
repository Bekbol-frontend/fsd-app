import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IArticleComment, IArticleCommentSchema } from "../types";
import { fetchArticleComment } from "../services/fetchArticleComment";
import { IStateSchema } from "@/app/Provider/Store";
import { addArticleComment } from "../services/addArticleComment";

const articleCommentAdapter = createEntityAdapter<IArticleComment>({
  selectId: (articleComment) => articleComment._id,
  sortComparer: (a, b) => a.text.localeCompare(b.text),
});

export const articleCommentsSelectors =
  articleCommentAdapter.getSelectors<IStateSchema>(
    (state) => state.article_comment || articleCommentAdapter.getInitialState()
  );

const initialState: IArticleCommentSchema =
  articleCommentAdapter.getInitialState({
    isLoading: false,
    error: undefined,
    addLoading: false,
    addError: undefined,
  });

const articleCommentSlice = createSlice({
  name: "articleCommentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleComment.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        fetchArticleComment.fulfilled,
        (state, action: PayloadAction<IArticleComment[]>) => {
          state.isLoading = false;
          articleCommentAdapter.setAll(state, action.payload);
        }
      )
      .addCase(
        fetchArticleComment.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )

      .addCase(addArticleComment.pending, (state) => {
        state.addLoading = true;
        state.addError = undefined;
      })
      .addCase(
        addArticleComment.fulfilled,
        (state, action: PayloadAction<IArticleComment>) => {
          state.addLoading = false;
          articleCommentAdapter.addOne(state, action.payload);
        }
      )
      .addCase(
        addArticleComment.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.addLoading = false;
          state.addError = action.payload;
        }
      );
  },
});

export const { actions: articleCommentActions } = articleCommentSlice;
export const { reducer: articleCommentReducer } = articleCommentSlice;
