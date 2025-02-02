import {
  ButtonHTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./Button.module.scss";
import { MODS_CLSX, clsx } from "@/shared/config/clsx";
import { Loading } from "../../Loading";
import { useTranslation } from "react-i18next";

type Variyant = "default" | "primary" | "dashed" | "text";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variyant?: Variyant;
  addClass?: string;
  loading?: boolean;
  danger?: boolean;
}

function Button(props: IProps) {
  const {
    children,
    addClass = "",
    variyant = "primary",
    loading = false,
    disabled,
    danger = false,
    ...otherProps
  } = props;

  const [cancellation, setCancellation] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (loading || disabled) {
      setCancellation(true);
    }

    return () => {
      setCancellation(false);
    };
  }, [loading, disabled]);

  const mods = useMemo<MODS_CLSX>(
    () => ({
      [styles[variyant]]: true,
      [styles.cancellation]: cancellation,
      [styles.loading]: loading,
      [styles.danger]: danger,
    }),
    [variyant, cancellation, loading, danger]
  );

  return (
    <button
      {...otherProps}
      className={clsx([styles.btn, addClass], mods)}
      disabled={cancellation}
    >
      {loading ? (
        <>
          <Loading size={20} />
          {t("Loading")}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
