import { ArticleList } from "@/entities/Article";
import AddOrRemoveReducer, {
  ReducersList,
} from "@/shared/config/components/AddOrRemoveReducer/AddOrRemoveReducer";
import { memo, useCallback, useEffect } from "react";
import {
  articleActions,
  articleReducer,
  getArticleSelectors,
} from "../models/slice";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { fetchArticles } from "../models/services/fetchArticles";
import { useSelector } from "react-redux";
import {
  getArticlesCheckFetch,
  getArticlesError,
  getArticlesIsLoading,
  getArticlesPage,
  getArticlesView,
} from "../models/selectors";
import ArticlesHeader from "./ArticlesHeader/ArticlesHeader";
import { Section } from "@/shared/ui/Section";

const reducers: ReducersList = {
  article: articleReducer,
};

function ArticlesPage() {
  const dispatch = useAppDispatch();
  const articlesData = useSelector(getArticleSelectors.selectAll);
  const view = useSelector(getArticlesView);
  const isLoading = useSelector(getArticlesIsLoading);
  const error = useSelector(getArticlesError);
  const page = useSelector(getArticlesPage);
  const checkFetch = useSelector(getArticlesCheckFetch);

  const callbackPageScroll = useCallback(() => {
    dispatch(articleActions.setPage());

    // dispatch-не нужен!
  }, []);

  useEffect(() => {
    dispatch(articleActions.setInit());
  }, [dispatch]);

  useEffect(() => {
    if (checkFetch) {
      dispatch(fetchArticles({ page }));
    }
  }, [view, page, checkFetch]);

  return (
    <AddOrRemoveReducer reducersList={reducers} removeReducer={false}>
      <Section callbackPageScroll={callbackPageScroll}>
        <ArticlesHeader />
        <ArticleList
          article={articlesData}
          view={view}
          isLoading={isLoading}
          error={error}
        />
      </Section>
    </AddOrRemoveReducer>
  );
}

export default memo(ArticlesPage);
