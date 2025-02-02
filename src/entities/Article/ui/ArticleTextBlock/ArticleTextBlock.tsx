import { memo } from "react";
import { IArticleTextBlock } from "../../models/types";
import { Title } from "@/shared/ui/Title";
import { Description } from "@/shared/ui/Description";
import styles from "./ArticleTextBlock.module.scss";
import { clsx } from "@/shared/config/clsx";

interface IProps {
  block: IArticleTextBlock;
  addClass?: string;
}

function ArticleTextBlock(props: IProps) {
  const { block, addClass = "" } = props;

  const { paragraphs, title } = block;

  return (
    <div className={clsx([styles.articleBlock, addClass])}>
      <Title text={title} />
      <div className={styles.paragraphs}>
        {paragraphs.map((el, i) => (
          <Description text={el} key={i} />
        ))}
      </div>
    </div>
  );
}

export default memo(ArticleTextBlock);
