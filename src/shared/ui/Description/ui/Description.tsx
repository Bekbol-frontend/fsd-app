import { memo, useMemo } from "react";
import stlyes from "./Description.module.scss";
import { clsx } from "@/shared/config/clsx";

interface IProps {
  text: string | number;

  addClass?: string;
  danger?: boolean;
}

function Description(props: IProps) {
  const { addClass = "", text, danger = false } = props;

  const mods = useMemo(
    () => ({
      [stlyes.danger]: danger,
    }),
    [danger]
  );

  return <p className={clsx([stlyes.description, addClass], mods)}>{text}</p>;
}

export default memo(Description);
