import { Loader } from "lucide-react";
import styles from "./Loading.module.scss";

interface IProps {
  size?: number;
}

export function Loading(props: IProps) {
  const { size = 35 } = props;

  return <Loader className={styles.loading} size={size} />;
}
