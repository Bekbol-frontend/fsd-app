import { memo, SelectHTMLAttributes, useEffect, useMemo, useRef } from "react";
import styles from "./InputSelect.module.scss";
import { clsx } from "@/shared/config/clsx";
import { useTranslation } from "react-i18next";

interface ISelectOption {
  value: string;
  content: string;
}

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: ISelectOption[];

  addClass?: string;
  label?: string;
  error?: string;
}

function InputSelect(props: IProps) {
  const { addClass = "", label, error, options, ...otherProps } = props;
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const optionEl = useMemo(
    () =>
      options.map((el) => (
        <option value={el.value} key={el.value}>
          {el.content}
        </option>
      )),
    [options]
  );

  const { t } = useTranslation();

  useEffect(() => {
    if (label && selectRef.current) {
      selectRef.current.setAttribute("id", label);
    }
  }, [label, selectRef]);

  return (
    <div className={clsx([styles.wrapper, addClass])}>
      {label && (
        <label className={styles.label} htmlFor={label}>
          {label}
        </label>
      )}
      <select
        ref={selectRef}
        className={clsx([styles.input], {
          [styles.inputError]: Boolean(error),
        })}
        {...otherProps}
      >
        <option value="" disabled>
          {t("Select")}
        </option>
        {optionEl}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default memo(InputSelect);
