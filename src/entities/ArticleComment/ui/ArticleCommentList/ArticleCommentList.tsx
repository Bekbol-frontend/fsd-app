import { Title } from "@/shared/ui/Title";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ArticleCommentCard from "../ArticleCommentCard/ArticleCommentCard";
import styles from "./ArticleCommentList.module.scss";
import { IArticleComment } from "../../models/types";
import { Skeleton } from "@/shared/ui/Skeleton";
import ArticleCommentLoading from "../ArticleCommentLoading/ArticleCommentLoading";

interface IProps {
  articleComments: IArticleComment[];
  isLoading: boolean;
  error?: string;
}

function ArticleCommentList(props: IProps) {
  const { articleComments, isLoading, error } = props;

  const { t } = useTranslation("article");

  const commentsElement = useMemo(
    () =>
      articleComments.map((comment) => (
        <ArticleCommentCard articleComment={comment} key={comment._id} />
      )),
    [articleComments]
  );

  if (isLoading) {
    return (
      <div className={styles.articleCommentList}>
        <Skeleton width={300} height={20} addClass={styles.titleLoading} />
        <div className={styles.commentsLoadingBlock}>
          {Array(5)
            .fill("")
            .map((_, i) => (
              <ArticleCommentLoading key={i} />
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <Title text={error} danger />;
  }

  return (
    <div className={styles.articleCommentList}>
      {articleComments.length ? (
        <>
          <Title text={t("Comments")} addClass={styles.titleComment} />
          <div className={styles.commentsBlock}>{commentsElement}</div>
        </>
      ) : (
        <Title text={t("No comments")} addClass={styles.titleComment} />
      )}
    </div>
  );
}

export default memo(ArticleCommentList);
