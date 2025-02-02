import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Portal } from "../../Portal";
import styles from "./Modal.module.scss";
import { clsx } from "@/shared/config/clsx";
import { Title } from "../../Title";
import { X } from "lucide-react";
import BtnCloseModal from "./BtnCloseModal/BtnCloseModal";

interface IProps {
  children: ReactNode;
  show: boolean;
  close: () => void;
  lazy?: boolean;
  title?: string;
  addClass?: string;
  addClassHeader?: string;
  addClassBody?: string;
}

function Modal(props: IProps) {
  const {
    children,
    close,
    show,
    lazy = false,
    title,
    addClass = "",
    addClassHeader = "",
    addClassBody = "",
  } = props;

  const [didmount, setDidmount] = useState(false);
  const [activeShow, setActiveShow] = useState(false);
  const [activeHide, setActiveHide] = useState(false);

  const activeShowRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeHideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCloseModal = useCallback(() => {
    setActiveHide(true);

    activeHideRef.current = setTimeout(() => {
      close();
      clearTimeout(activeHideRef.current!);
      setActiveHide(false);
    }, 100);
  }, [close]);

  const handleKeyup = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onCloseModal();
      }
    },
    [onCloseModal]
  );

  const mods = useMemo(
    () => ({
      [styles.show]: activeShow,
      [styles.hide]: activeHide,
    }),
    [activeShow, activeHide]
  );

  useEffect(() => {
    if (show) {
      setDidmount(true);
      document.body.style.overflow = "hidden";
      window.addEventListener("keyup", handleKeyup);

      activeShowRef.current = setTimeout(() => {
        setActiveShow(true);
      }, 100);
    }

    return () => {
      setDidmount(false);
      document.body.style.overflow = "auto";
      window.removeEventListener("keyup", handleKeyup);
      clearTimeout(activeShowRef.current!);
      setActiveShow(false);
    };
  }, [show, activeShowRef]);

  if (!didmount && lazy) return null;

  return (
    <Portal>
      <div
        className={clsx([styles.modal, addClass], mods)}
        onClick={onCloseModal}
      >
        <div className={styles.inner} onClick={(e) => e.stopPropagation()}>
          {title ? (
            <div className={clsx([styles.modalHeader, addClassHeader])}>
              <Title text="Modal form" />
              <BtnCloseModal closeModal={onCloseModal} />
            </div>
          ) : (
            <BtnCloseModal
              addClass={styles.closeBtn}
              closeModal={onCloseModal}
            />
          )}
          <div className={clsx([styles.modalBody, addClassBody])}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
