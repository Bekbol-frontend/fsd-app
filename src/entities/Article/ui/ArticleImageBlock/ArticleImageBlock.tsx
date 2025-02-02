import { memo } from "react";
import { IArticleImageBlock } from "../../models/types";
import { Title } from "@/shared/ui/Title";
import styles from "./ArticleImageBlock.module.scss";

interface IProps {
  block: IArticleImageBlock;
}

function ArticleImageBlock(props: IProps) {
  const { block } = props;
  const { title, src } = block;

  return (
    <div className={styles.articleImageBlock}>
      <Title text={title} />
      <div className={styles.imgBlock}>
        <img src={src} alt={title} />
      </div>
    </div>
  );
}

export default memo(ArticleImageBlock);
