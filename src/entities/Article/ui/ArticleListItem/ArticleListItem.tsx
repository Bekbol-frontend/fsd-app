import { memo, useCallback } from "react";
import {
  ArticleTypes,
  ArticleView,
  IArticle,
  IArticleTextBlock,
} from "../../models/types";
import styles from "./ArticleListItem.module.scss";
import { clsx } from "@/shared/config/clsx";
import { Title } from "@/shared/ui/Title";
import { Description } from "@/shared/ui/Description";
import { Eye } from "lucide-react";
import { useCreateDateFormat } from "@/shared/hooks/useCreateDateFormat";
import { Link, useNavigate } from "react-router-dom";
import { routePaths } from "@/shared/config/route";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import ArticleTextBlock from "../ArticleTextBlock/ArticleTextBlock";

interface IProps {
  article: IArticle;
  view: ArticleView;
}

function ArticleListItem(props: IProps) {
  const { article, view } = props;
  const navigate = useNavigate();

  const { img, title, type, views, user, blocks, _id } = article;
  const { avatar, username } = user;
  const { t } = useTranslation("article");

  const dateFormat = useCreateDateFormat(article);

  const onShowTextBlock = useCallback(() => {
    navigate(`${routePaths.ARTICLES}/${_id}`);
  }, [navigate, _id]);

  if (view === ArticleView.BIG) {
    const textBlock = blocks.find(
      (el) => el.type === ArticleTypes.TEXT
    ) as IArticleTextBlock;

    return (
      <div className={clsx([styles.articleListItem, styles[view]])}>
        <div className={styles.bigHeader}>
          <div className={styles.bigHeaderLeft}>
            <span>
              <img src={avatar} alt={username} />
            </span>
            <Description text={username} />
          </div>
          <Description text={dateFormat} />
        </div>
        <div className={styles.bigContent}>
          <Title text={title} variyant="m" />
          <Title text={type.join(", ")} variyant="s" />
          <div className={styles.imgWrapper}>
            <img src={img} alt={title} />
          </div>
          {textBlock && (
            <ArticleTextBlock block={textBlock} addClass={styles.textBlock} />
          )}
        </div>
        <div className={styles.bigFooter}>
          <Button variyant="dashed" onClick={onShowTextBlock}>
            {t("Read more...")}
          </Button>
          <div className={styles.bigFooterRight}>
            <Description text={views} />
            <Eye />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx([styles.articleListItem, styles[view]])}>
      <div className={styles.imgBlock}>
        <img src={img} alt={title} className={styles.img} loading="lazy" />
        <Description text={dateFormat} addClass={styles.created} />
      </div>
      <div className={styles.bodyBlock}>
        <div className={styles.bodyBlockTop}>
          <Title text={type[0]} variyant="s" />
          <div className={styles.views}>
            <Description text={views} />
            <Eye size={18} />
          </div>
        </div>
        <div className={styles.titleBlock}>
          <Title text={title} variyant="s" addClass={styles.title} />
        </div>
      </div>

      <Link
        to={`${routePaths.ARTICLES}/${article._id}`}
        className={styles.link}
      />
    </div>
  );
}

export default memo(ArticleListItem);
