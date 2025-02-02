import { memo } from "react";
import styles from "./ArticleListLoading.module.scss";
import { ArticleView } from "../../models/types";
import { clsx } from "@/shared/config/clsx";
import { Skeleton } from "@/shared/ui/Skeleton";

interface IProps {
  view: ArticleView;
}

function ArticleListLoading(props: IProps) {
  const { view } = props;

  if (view === ArticleView.BIG) {
    return (
      <div className={clsx([styles.articleListLoading, styles[view]])}>
        {Array(20)
          .fill("")
          .map((_, i) => (
            <Skeleton key={i} height={250} />
          ))}
      </div>
    );
  }

  return (
    <div className={clsx([styles.articleListLoading, styles[view]])}>
      {Array(20)
        .fill("")
        .map((_, i) => (
          <Skeleton key={i} height={250} />
        ))}
    </div>
  );
}

export default memo(ArticleListLoading);
