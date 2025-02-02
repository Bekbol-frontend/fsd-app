import { memo, useCallback, useEffect, useState } from "react";
import styles from "./ArticleDetail.module.scss";
import { Title } from "@/shared/ui/Title";
import { Description } from "@/shared/ui/Description";
import { CalendarDays, Eye } from "lucide-react";
import { ArticleBlocks, ArticleTypes, IArticle } from "../../models/types";
import ArticleTextBlock from "../ArticleTextBlock/ArticleTextBlock";
import ArticleCodeBlock from "../ArticleCodeBlock/ArticleCodeBlock";
import ArticleImageBlock from "../ArticleImageBlock/ArticleImageBlock";
import ArticleDetailLoading from "../ArticleDetailLoading/ArticleDetailLoading";
import { useCreateDateFormat } from "@/shared/hooks/useCreateDateFormat";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routePaths } from "@/shared/config/route";

interface IProps {
  isLoading: boolean;
  error?: string;
  data: IArticle | null;
}

function ArticleDetail(props: IProps) {
  const { data, isLoading, error } = props;

  const dateFormat = useCreateDateFormat(data);
  const { t } = useTranslation("article");
  const navigate = useNavigate();

  const onBack = useCallback(() => {
    navigate(routePaths.ARTICLES);
  }, [navigate]);

  const articleBlockCallback = useCallback((block: ArticleBlocks) => {
    switch (block.type) {
      case ArticleTypes.TEXT:
        return <ArticleTextBlock block={block} key={block._id} />;
      case ArticleTypes.CODE:
        return <ArticleCodeBlock block={block} key={block._id} />;
      case ArticleTypes.IMAGE:
        return <ArticleImageBlock block={block} key={block._id} />;
      default:
        return null;
    }
  }, []);

  if (isLoading) {
    return <ArticleDetailLoading />;
  }

  if (error) {
    return <Title danger text={error} />;
  }

  if (data) {
    return (
      <div className={styles.articleDetail}>
        <Button onClick={onBack}>{t("Back")}</Button>
        <div className={styles.imageWrapper}>
          <img src={data.img} alt={data.title} />
        </div>
        <div className={styles.infoWrapper}>
          <Title text={data.title} />
          <Description text={data.subtitle} />
          <div className={styles.eyeWrapper}>
            <Eye /> <Description text={data.views} />
          </div>
          <div className={styles.calendarWrapper}>
            <CalendarDays />
            {<Description text={dateFormat} />}
          </div>
        </div>
        <div>{data.blocks.map(articleBlockCallback)}</div>
      </div>
    );
  }

  return <Title text="Not found!" />;
}

export default memo(ArticleDetail);
