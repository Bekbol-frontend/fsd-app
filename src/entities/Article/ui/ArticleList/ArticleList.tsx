import { memo, useMemo } from "react";
import { ArticleView, IArticle } from "../../models/types";
import ArticleListItem from "../ArticleListItem/ArticleListItem";
import styles from "./ArticleList.module.scss";
import { clsx } from "@/shared/config/clsx";
import ArticleListLoading from "../ArticleListLoading/ArticleListLoading";
import { Title } from "@/shared/ui/Title";

interface IProps {
  article: IArticle[];
  isLoading: boolean;
  error?: string;
  view: ArticleView;
}

function ArticleList(props: IProps) {
  const { article, isLoading, error, view = ArticleView.BIG } = props;

  const articleListItem = useMemo(
    () =>
      article.map((el) => (
        <ArticleListItem article={el} view={view} key={el._id} />
      )),
    [article, view]
  );

  if (error) {
    return <Title text={error} danger />;
  }

  return (
    <>
      {view === ArticleView.BIG ? (
        <div className={styles.articleList}>
          <div className={clsx([styles[view]])}>{articleListItem}</div>
        </div>
      ) : (
        <div className={styles.articleList}>
          <div className={clsx([styles[view]])}>{articleListItem}</div>
        </div>
      )}

      {isLoading && <ArticleListLoading view={view} />}
    </>
  );
}

export default memo(ArticleList);
