export { default as ArticleDetail } from "./ui/ArticleDetail/ArticleDetail";
export { default as ArticleList } from "./ui/ArticleList/ArticleList";

export type { IArticleDetailSchema } from "./models/types";

export { getArticleDetailData } from "./models/selectors/getArticleDetailData";
export { getArticleDetailError } from "./models/selectors/getArticleDetailError";
export { getArticleDetailLoading } from "./models/selectors/getArticleDetailLoading";
export { getArticleDetailState } from "./models/selectors/getArticleDetailState";

export { fetchAricleById } from "./models/services/fetchArticleById";
export { articleDetailReducer } from "./models/slice";
