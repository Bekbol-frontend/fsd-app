import styles from "./PageLoading.module.scss";
import { Loading } from "@/shared/ui/Loading";

export function PageLoading() {
  return (
    <div className={styles.wrapper}>
      <Loading />
    </div>
  );
}
