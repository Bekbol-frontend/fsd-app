import { memo, useCallback } from "react";
import styles from "./NotFoundPage.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/Button";
import { useNavigate } from "react-router-dom";
import { routePaths } from "@/shared/config/route";
import { Title } from "@/shared/ui/Title";
import { Description } from "@/shared/ui/Description";
import { Section } from "lucide-react";

function NotFoundPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleHomePage = useCallback(() => {
    navigate(routePaths.HOME);
  }, [navigate]);

  return (
    <Section>
      <div className={styles.notFoundPage}>
        <div className={styles.inner}>
          <Title text={t("Not found page")} />
          <Description
            text={t(
              "The address is typed incorrectly or the page does not exist"
            )}
          />
          <Button onClick={handleHomePage} addClass={styles.btn}>
            {t("Go home page")}
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default memo(NotFoundPage);
