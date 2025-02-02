import { clsx } from "@/shared/config/clsx";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
} from "react";
import styles from "./Select.module.scss";
import { useOutside } from "@/shared/hooks/useOutside";

interface IProps {
  children: ReactNode;
  jsx: JSX.Element;
  showSelect: boolean;
  setShowSelect: Dispatch<SetStateAction<boolean>>;

  addClass?: string;
  addClassTop?: string;
  addClassBottom?: string;
}

function Select(props: IProps) {
  const {
    jsx,
    children,
    showSelect,
    setShowSelect,
    addClass = "",
    addClassTop = "",
    addClassBottom = "",
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  const handleShowSelect = useCallback(() => {
    setShowSelect((prev) => !prev);
  }, []);

  const mods = useMemo(
    () => ({
      [styles.show]: showSelect,
    }),
    [showSelect]
  );

  const onCloseOption = useCallback(() => {
    setShowSelect(false);
  }, []);

  useOutside({
    ref,
    showSelect,
    handle: () => {
      onCloseOption();
    },
  });

  return (
    <div className={clsx([styles.select, addClass])} ref={ref}>
      <div
        className={clsx([styles.top, addClassTop])}
        onClick={handleShowSelect}
      >
        {jsx}
      </div>
      <div
        className={clsx([styles.bottom, addClassBottom], mods)}
        onClick={onCloseOption}
      >
        {children}
      </div>
    </div>
  );
}

export default Select;
