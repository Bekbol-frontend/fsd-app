import { IThunkAPI } from "@/app/Provider/Store";
import { IArticle } from "@/entities/Article/models/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getArticlesLimit } from "../selectors";

interface IProps {
  page: number;
}

export interface IReturnFetchArticle {
  currentData: IArticle[];
  totalCount: number;
}

export const fetchArticles = createAsyncThunk<
  IReturnFetchArticle,
  IProps,
  IThunkAPI
>(
  "articleSlice/fetchArticles",
  async (props, { rejectWithValue, extra, getState }) => {
    const { page } = props;

    const limit = getArticlesLimit(getState());
    try {
      const response = await extra.api.get<{
        articles: IArticle[];
        totalCount: number;
      }>("/articles", {
        params: {
          _limit: limit,
          _page: page,
        },
      });

      if (response.status !== 200) throw new Error();

      return {
        currentData: response.data.articles,
        totalCount: response.data.totalCount,
      };
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  }
);
