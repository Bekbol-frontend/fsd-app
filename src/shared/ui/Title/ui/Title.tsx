import { clsx } from "@/shared/config/clsx";
import { memo, useMemo } from "react";
import styles from "./Title.module.scss";

type Variyant = "l" | "m" | "s";

interface IProps {
  text: string | number;

  addClass?: string;
  danger?: boolean;
  variyant?: Variyant;
}

function Title(props: IProps) {
  const { addClass = "", variyant = "l", text, danger = false } = props;

  const mods = useMemo(
    () => ({
      [styles[variyant]]: true,
      [styles.danger]: danger,
    }),
    [variyant, danger]
  );

  return <h1 className={clsx([styles.title, addClass], mods)}>{text}</h1>;
}

export default memo(Title);
