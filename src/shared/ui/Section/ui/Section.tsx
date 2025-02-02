import { clsx } from "@/shared/config/clsx";
import { ReactNode, useRef, UIEvent, useEffect } from "react";
import styles from "./Section.module.scss";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { getSaveScroll, saveScrollActions } from "@/features/SaveScroll";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

interface IProps {
  children: ReactNode;
  addClass?: string;
  callbackPageScroll?: () => void;
}

function Section({ children, addClass = "", callbackPageScroll }: IProps) {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const scroll = useSelector(getSaveScroll);

  useInfiniteScroll({
    callback: () => {
      callbackPageScroll?.();
    },
    wrapperRef,
    triggerRef,
  });

  useEffect(() => {
    const wrapperElement = wrapperRef.current;

    if (wrapperElement) {
      wrapperElement.scrollTop = scroll[pathname];
    }
  }, [wrapperRef.current, pathname]);

  const onScrollChange = (event: UIEvent<HTMLElement>) => {
    const position = event.currentTarget.scrollTop;

    dispatch(
      saveScrollActions.setScrollPosition({
        path: pathname,
        position,
      })
    );
  };

  return (
    <section
      className={clsx([styles.section, addClass])}
      ref={wrapperRef}
      onScroll={onScrollChange}
    >
      {children}
      <div ref={triggerRef} />
    </section>
  );
}

export default Section;
