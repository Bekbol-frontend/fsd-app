import { clsx } from "@/shared/config/clsx";
import { ReactNode, useRef } from "react";
import styles from "./Section.module.scss";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";

interface IProps {
  children: ReactNode;
  addClass?: string;
  callbackPageScroll?: () => void;
}

function Section({ children, addClass = "", callbackPageScroll }: IProps) {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    callback: () => {
      callbackPageScroll?.();
    },
    wrapperRef,
    triggerRef,
  });

  return (
    <section className={clsx([styles.section, addClass])} ref={wrapperRef}>
      {children}
      <div ref={triggerRef} />
    </section>
  );
}

export default Section;
