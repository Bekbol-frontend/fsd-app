import { useCallback, useState } from "react";

interface IHover {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
type TypeHover = [boolean, IHover];

export const useHover = (): TypeHover => {
  const [hover, setHover] = useState(false);

  const onMouseEnter = useCallback(() => setHover(true), []);
  const onMouseLeave = useCallback(() => setHover(false), []);

  return [hover, { onMouseEnter, onMouseLeave }];
};
