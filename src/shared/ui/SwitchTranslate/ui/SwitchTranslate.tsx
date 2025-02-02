import { memo, useCallback, useMemo, useState } from "react";
import { IOption, Option, Select } from "../../Select";
import styles from "./SwitchTranslate.module.scss";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

const languages: IOption[] = [
  { value: "kz", text: "Қазақ" },
  { value: "en", text: "English" },
];

function SwitchTranslate() {
  const [show, setShow] = useState(false);

  const { t, i18n } = useTranslation();

  const changeTranslate = useCallback(
    (lng: string) => {
      console.log(lng);

      i18n.changeLanguage(lng);
    },
    [i18n]
  );

  const optionsElements = useMemo(() => {
    return languages.map((el) => (
      <Option
        key={el.value}
        value={el.value}
        text={el.text}
        handleSelect={changeTranslate}
      />
    ));
  }, [languages]);

  return (
    <Select
      jsx={
        <div className={styles.jsx}>
          <Languages size={18} />
          <p>
            {t("Select")}: {i18n.language}
          </p>
        </div>
      }
      showSelect={show}
      setShowSelect={setShow}
    >
      {optionsElements}
    </Select>
  );
}

export default memo(SwitchTranslate);
