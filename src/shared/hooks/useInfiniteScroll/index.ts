import { MutableRefObject, useEffect } from "react";

interface IProps {
  callback: () => void;
  wrapperRef: MutableRefObject<HTMLElement | null>;
  triggerRef: MutableRefObject<HTMLDivElement | null>;
}

export const useInfiniteScroll = (props: IProps) => {
  const { wrapperRef, triggerRef, callback } = props;

  useEffect(() => {
    if (!wrapperRef.current || !triggerRef.current) return;

    const options = {
      root: wrapperRef.current,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log("INTER");

        callback();
      }
    }, options);

    observer.observe(triggerRef.current);

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current);
      }
    };
  }, [wrapperRef, triggerRef, callback]);
};
