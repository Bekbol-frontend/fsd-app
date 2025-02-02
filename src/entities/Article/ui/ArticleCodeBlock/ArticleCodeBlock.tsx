import { memo, useCallback, useEffect, useRef, useState } from "react";
import { IArticleCodeBlock } from "../../models/types";
import styles from "./ArticleCodeBlock.module.scss";
import { Files, Check } from "lucide-react";
import { Button } from "@/shared/ui/Button";

interface IProps {
  block: IArticleCodeBlock;
}

function ArticleCodeBlock(props: IProps) {
  const { block } = props;
  const { code } = block;

  const [checkCopy, setCheckCopy] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const onCopyClick = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCheckCopy(true);
  }, []);

  useEffect(() => {
    if (checkCopy) {
      timerRef.current = setTimeout(() => {
        setCheckCopy(false);
      }, 1500);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [checkCopy]);

  return (
    <div className={styles.articleCodeBlock}>
      <div className={styles.code}>
        <Button
          variyant="text"
          addClass={styles.copytBtn}
          onClick={onCopyClick}
        >
          {checkCopy ? <Check /> : <Files />}
        </Button>
        <pre>{code}</pre>
      </div>
    </div>
  );
}

export default memo(ArticleCodeBlock);
