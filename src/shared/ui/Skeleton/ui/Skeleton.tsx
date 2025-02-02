import { CSSProperties, memo, useMemo } from "react";
import styles from "./Sekeleton.module.scss";
import { clsx } from "@/shared/config/clsx";

interface IProps {
  addClass?: string;
  width?: number | string;
  height?: number | string;
  circle?: boolean;
}

function Skeleton(props: IProps) {
  const { addClass = "", width, height, circle } = props;

  const stylesSkeleton: CSSProperties = useMemo(() => {
    return {
      width: width ?? "100%",
      height: height ?? "30px",
      borderRadius: circle ? "50%" : "var(--border-radius)",
    };
  }, [width, height, circle]);

  return (
    <span
      style={stylesSkeleton}
      className={clsx([styles.skeletonBox, addClass])}
    ></span>
  );
}

export default memo(Skeleton);
