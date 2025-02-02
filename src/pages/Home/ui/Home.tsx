import { memo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Home.module.scss";
import { Section } from "@/shared/ui/Section";

function Home() {
  const { t } = useTranslation();

  return (
    <Section>
      <h1>{t("Hello")}</h1>
      <div
        onMouseOver={() => console.log("Ota element!")}
        className={styles.ota}
      >
        <p
          onMouseOver={() => console.log("Bola element!")}
          className={styles.bola}
        >
          Bola element.
        </p>
      </div>
    </Section>
  );
}

export default memo(Home);
