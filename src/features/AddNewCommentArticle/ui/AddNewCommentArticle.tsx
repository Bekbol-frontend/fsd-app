import { ChangeEvent, FormEvent, memo, useCallback, useState } from "react";
import styles from "./AddNewCommentArticle.module.scss";
import { Button } from "@/shared/ui/Button";
import { InputTextArea } from "@/shared/ui/InputTextArea";
import { useTranslation } from "react-i18next";
import { useUser } from "@/shared/hooks/useUser";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { addArticleComment } from "@/entities/ArticleComment/models/services/addArticleComment";
import { useSelector } from "react-redux";
import {
  getArticleCommentAddError,
  getArticleCommentAddLoading,
} from "@/entities/ArticleComment";
import { Title } from "@/shared/ui/Title";

interface IProps {
  articleId: string;
}

function AddNewCommentArticle(props: IProps) {
  const { articleId } = props;

  const [text, setText] = useState("");
  const [textError, setTextError] = useState("");

  const loading = useSelector(getArticleCommentAddLoading);
  const error = useSelector(getArticleCommentAddError);

  const user = useUser();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onChangeText = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setText(value);

      if (value) {
        setTextError("");
      } else {
        setTextError(t("Please input your comment!"));
      }
    },
    []
  );

  const submitForm = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (!text) {
        setTextError(t("Please input your comment!"));
        return;
      }

      if (text && user) {
        dispatch(
          addArticleComment({
            text,
            articleId,
            userId: user._id,
          })
        );
        setText("");
        setTextError("");
        return;
      }

      return alert(t("Something went wrong"));
    },
    [text, articleId, user, dispatch]
  );

  return (
    <div className={styles.addNewCommentArticle}>
      <form className={styles.formComment} onSubmit={submitForm}>
        <InputTextArea
          addClass={styles.inputBlock}
          autofocus
          value={text}
          onChange={onChangeText}
          error={textError}
        />
        <Button
          danger={Boolean(error)}
          addClass={styles.btnForm}
          loading={loading}
        >
          submit
        </Button>
      </form>
      {error && <Title danger text={error} />}
    </div>
  );
}

export default memo(AddNewCommentArticle);
