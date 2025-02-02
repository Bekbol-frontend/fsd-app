import { clsx } from "@/shared/config/clsx";
import { HTMLAttributes, ReactNode, useCallback } from "react";
import styles from "./Option.module.scss";

interface IProps {
  value: string;
  text: string;
  handleSelect: (val: string) => void;

  addClass?: string;
}

function Option(props: IProps) {
  const { addClass = "", text, value, handleSelect } = props;

  const onSelect = useCallback(
    (val: string) => {
      handleSelect(val);
    },
    [handleSelect]
  );

  return (
    <div
      className={clsx([styles.option, addClass])}
      onClick={() => onSelect(value)}
    >
      {text}
    </div>
  );
}

export default Option;
