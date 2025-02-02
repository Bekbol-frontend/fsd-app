import { memo } from "react";
import styles from "./ArticleDetailLoading.module.scss";
import { Skeleton } from "@/shared/ui/Skeleton";

function ArticleDetailLoading() {
  return (
    <div className={styles.articleLoading}>
      <Skeleton addClass={styles.img} width={140} height={100} />
      <Skeleton width={250} height={15} />
      <Skeleton width={150} height={15} />
      <Skeleton width={220} height={15} />
      <Skeleton width={420} height={25} />
      <Skeleton height={225} />
      <Skeleton width={420} height={25} />
      <Skeleton height={155} />
      <Skeleton width={420} height={25} />
      <Skeleton height={155} />
    </div>
  );
}

export default memo(ArticleDetailLoading);
