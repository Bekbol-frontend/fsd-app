import { IStateSchema } from "@/app/Provider/Store";

export const getArticleDetailState = (state: IStateSchema) =>
  state.article_details;
