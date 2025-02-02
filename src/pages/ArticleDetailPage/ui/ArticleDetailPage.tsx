import {
  ArticleDetail,
  articleDetailReducer,
  fetchAricleById,
  getArticleDetailData,
  getArticleDetailError,
  getArticleDetailLoading,
} from "@/entities/Article";
import {
  articleCommentReducer,
  ArticleCommentList,
} from "@/entities/ArticleComment";
import {
  fetchArticleComment,
  getArticleDetailCommentsLoading,
  getArticleDetailCommentsError,
} from "@/entities/ArticleComment";
import { articleCommentsSelectors } from "@/entities/ArticleComment/models/slice";
import { AddNewCommentArticle } from "@/features/AddNewCommentArticle";

import AddOrRemoveReducer, {
  ReducersList,
} from "@/shared/config/components/AddOrRemoveReducer/AddOrRemoveReducer";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { Section } from "@/shared/ui/Section";
import { Title } from "@/shared/ui/Title";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const reducers: ReducersList = {
  article_details: articleDetailReducer,
  article_comment: articleCommentReducer,
};

function ArticleDetailPage() {
  const { id } = useParams<{ id?: string }>();

  const isLoading = useSelector(getArticleDetailLoading);
  const error = useSelector(getArticleDetailError);
  const data = useSelector(getArticleDetailData);

  const dispatch = useAppDispatch();

  const articleDetailCommentsData = useSelector(
    articleCommentsSelectors.selectAll
  );
  const articleDetailCommentsLoading = useSelector(
    getArticleDetailCommentsLoading
  );
  const articleDetailCommentsError = useSelector(getArticleDetailCommentsError);

  useEffect(() => {
    if (id) {
      dispatch(fetchAricleById(id));
      dispatch(fetchArticleComment());
    }
  }, [id, dispatch]);

  if (!id) {
    return <Title text="Not found!" />;
  }

  return (
    <AddOrRemoveReducer reducersList={reducers}>
      <Section>
        <ArticleDetail data={data} isLoading={isLoading} error={error} />
        <AddNewCommentArticle articleId={id} />
        <ArticleCommentList
          articleComments={articleDetailCommentsData}
          isLoading={articleDetailCommentsLoading}
          error={articleDetailCommentsError}
        />
      </Section>
    </AddOrRemoveReducer>
  );
}

export default memo(ArticleDetailPage);
