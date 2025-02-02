import { memo } from "react";
import { IArticleComment } from "../../models/types";
import styles from "./ArticleCommentCard.module.scss";
import { Title } from "@/shared/ui/Title";
import { Description } from "@/shared/ui/Description";
import { Link } from "react-router-dom";
import { routePaths } from "@/shared/config/route";

interface IProps {
  articleComment: IArticleComment;
}

function ArticleCommentCard(props: IProps) {
  const { articleComment } = props;
  const { text, userId } = articleComment;
  const { avatar, username, _id } = userId;

  return (
    <div className={styles.articleCommentCard}>
      <Link to={`${routePaths.PROFILE}/${_id}`} className={styles.imgWrapper}>
        <span className={styles.imgBlock}>
          <img src={avatar} alt={username} />
        </span>
        <Title text={username} variyant="s" />
      </Link>
      <div className={styles.textBlock}>
        <Description text={text} />
      </div>
    </div>
  );
}

export default memo(ArticleCommentCard);
