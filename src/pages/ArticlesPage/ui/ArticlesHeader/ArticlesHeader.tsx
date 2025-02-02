import { ChangeEvent, memo, useCallback, useState } from "react";
import { Rows3, Table } from "lucide-react";
import { ArticleView } from "@/entities/Article/models/types";
import { Button } from "@/shared/ui/Button";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { articleActions } from "../../models/slice";
import { useSelector } from "react-redux";
import { getArticlesView } from "../../models/selectors";
import { InputSelect } from "@/shared/ui/InputSelect";
import styles from "./ArticlesHeader.module.scss";
import { clsx } from "@/shared/config/clsx";

const viewsArray = [
  {
    Icon: Rows3,
    type: ArticleView.BIG,
  },
  {
    Icon: Table,
    type: ArticleView.SMALL,
  },
];

function ArticlesHeader() {
  const dispatch = useAppDispatch();
  const articlesView = useSelector(getArticlesView);

  const [sortSelect, setSortSelect] = useState("");

  const onHandleView = useCallback(
    (view: ArticleView) => {
      if (view === articlesView) {
        return;
      }

      return function () {
        dispatch(articleActions.setArticleView(view));
      };
    },
    [dispatch, articlesView]
  );

  const onHandleSortSelect = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;

      setSortSelect(value);
    },
    []
  );

  return (
    <div className={styles.articlesHeader}>
      <div className="left">
        {sortSelect}
        <InputSelect
          value={sortSelect}
          options={[
            { value: "title", content: "title" },
            { value: "desc", content: "desc" },
          ]}
          onChange={onHandleSortSelect}
        />
      </div>
      <div className={styles.right}>
        {viewsArray.map((el) => (
          <Button
            variyant="text"
            addClass={clsx([styles.btnView], {
              [styles.activeBtnView]: el.type === articlesView,
            })}
            key={el.type}
            onClick={onHandleView(el.type)}
          >
            <el.Icon />
          </Button>
        ))}
      </div>
    </div>
  );
}

export default memo(ArticlesHeader);
