import { memo, TextareaHTMLAttributes, useEffect, useRef } from "react";
import styles from "./InputTextArea.module.scss";
import { clsx } from "@/shared/config/clsx";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  addClass?: string;
  label?: string;
  error?: string;
  autofocus?: boolean;
}

function InputTextArea(props: IProps) {
  const { addClass = "", label, error, autofocus, ...otherProps } = props;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (label && textareaRef.current) {
      textareaRef.current.setAttribute("id", label);
    }
  }, [label, textareaRef]);

  useEffect(() => {
    if (autofocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autofocus, textareaRef]);

  return (
    <div className={clsx([styles.wrapper, addClass])}>
      {label && (
        <label className={styles.label} htmlFor={label}>
          {label}
        </label>
      )}
      <textarea
        {...otherProps}
        className={clsx([styles.textarea], {
          [styles.textareaError]: Boolean(error),
        })}
        ref={textareaRef}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default memo(InputTextArea);
