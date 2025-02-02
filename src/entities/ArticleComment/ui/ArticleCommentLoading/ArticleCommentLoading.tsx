import { memo } from "react";
import styles from "./ArticleCommentLoading.module.scss";
import { Skeleton } from "@/shared/ui/Skeleton";

function ArticleCommentLoading() {
  return (
    <div className={styles.articleCommentLoading}>
      <Skeleton addClass={styles.imgBlock} width={50} height={50} circle />
      <div className={styles.textBlock}>
        <Skeleton width="20%" height={10} />
        <Skeleton addClass={styles.desc} height={12} />
        <Skeleton addClass={styles.desc} height={12} width="50%" />
        <Skeleton addClass={styles.desc} height={12} width="75%" />
      </div>
    </div>
  );
}

export default memo(ArticleCommentLoading);
