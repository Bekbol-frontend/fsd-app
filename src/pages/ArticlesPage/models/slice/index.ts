import { ArticleView, IArticle } from "@/entities/Article/models/types";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IArticleSchema } from "../types";
import { IStateSchema } from "@/app/Provider/Store";
import { fetchArticles, IReturnFetchArticle } from "../services/fetchArticles";
import { VIEW_KEY } from "@/shared/constants";

const articleEntityAdapter = createEntityAdapter<IArticle>({
  selectId: (article: IArticle) => article._id,
  // sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const getViewLocalStorage = (): ArticleView => {
  const view = localStorage.getItem(VIEW_KEY);
  return view ? (view as ArticleView) : ArticleView.SMALL;
};

const initialState: IArticleSchema = articleEntityAdapter.getInitialState({
  isLoading: false,
  error: undefined,
  view: getViewLocalStorage(),
  _inited: false,

  // pagination
  page: 1,
  limit: 10,
  totalCount: 0,

  checkFetch: true,
});

export const getArticleSelectors = articleEntityAdapter.getSelectors(
  (state: IStateSchema) =>
    state.article || articleEntityAdapter.getInitialState()
);

const articleSlice = createSlice({
  name: "articleSlice",
  initialState,
  reducers: {
    setArticleView(state, { payload }: PayloadAction<ArticleView>) {
      state.view = payload;
      localStorage.setItem(VIEW_KEY, payload);
    },
    setInit(state) {
      const view = getViewLocalStorage();
      state.view = view;
      state.limit = view === ArticleView.BIG ? 5 : 10;
    },
    setPage(state) {
      const check = Math.ceil(state.totalCount / Number(state.limit));

      if (state.page < check) {
        state.page++;
      } else {
        state.checkFetch = false;
      }
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        fetchArticles.fulfilled,
        (state, { payload }: PayloadAction<IReturnFetchArticle>) => {
          const { currentData, totalCount } = payload;

          state.isLoading = false;
          articleEntityAdapter.addMany(state, currentData);
          state.totalCount = totalCount;
        }
      )
      .addCase(
        fetchArticles.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || "Error";
        }
      );
  },
});

export const { actions: articleActions } = articleSlice;
export const { reducer: articleReducer } = articleSlice;
