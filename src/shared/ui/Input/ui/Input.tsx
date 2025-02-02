import { InputHTMLAttributes, memo, useEffect, useRef } from "react";
import styles from "./Input.module.scss";
import { clsx } from "@/shared/config/clsx";

interface IProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "autoFocus"> {
  addClass?: string;
  label?: string;
  error?: string;
  autofocus?: boolean;
}

function Input(props: IProps) {
  const {
    addClass = "",
    type = "text",
    label,
    error,
    autofocus,
    ...otherProps
  } = props;
  
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (label && inputRef.current) {
      inputRef.current.setAttribute("id", label);
    }
  }, [label, inputRef]);

  useEffect(() => {
    if (autofocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autofocus, inputRef]);

  return (
    <div className={clsx([styles.wrapper, addClass])}>
      {label && (
        <label className={styles.label} htmlFor={label}>
          {label}
        </label>
      )}
      <input
        {...otherProps}
        type={type}
        className={clsx([styles.input], {
          [styles.inputError]: Boolean(error),
        })}
        ref={inputRef}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default memo(Input);
