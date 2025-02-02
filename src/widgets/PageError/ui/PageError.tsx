import { Title } from "@/shared/ui/Title";
import { useTranslation } from "react-i18next";
import styles from "./PageError.module.scss";
import { Button } from "@/shared/ui/Button";
import { useCallback } from "react";

export function PageError() {
  const { t } = useTranslation();

  const reloadWindos = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <Title text={t("Something went wrong")} danger />
        <Button variyant="primary" addClass={styles.btn} onClick={reloadWindos}>
          {t("Reload")}
        </Button>
      </div>
    </div>
  );
}
