import { MutableRefObject, useMemo } from "react";

interface IProps {
  ref: MutableRefObject<HTMLElement | null>;
  handle: () => void;
  showSelect: boolean;
}

export function useOutside({ ref, handle, showSelect }: IProps) {
  useMemo(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handle();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        handle();
      }
    };

    if (showSelect) {
      document.body.addEventListener("click", handleClick);
      window.addEventListener("keyup", handleKeyUp);
    }

    return () => {
      document.body.removeEventListener("click", handleClick);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [ref, showSelect]);
}
