import { IThunkAPI } from "@/app/Provider/Store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IArticle } from "../types";

export const fetchAricleById = createAsyncThunk<IArticle, string, IThunkAPI>(
  "article-detail-slice/fetchAricleById",
  async (id, { rejectWithValue, extra }) => {
    try {
      const response = await extra.api.get<IArticle>(`/article/${id}`);
      if (response.status !== 200) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);
