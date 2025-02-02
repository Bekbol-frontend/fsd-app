import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface IProps {
  children: ReactNode;
  htmlElement?: Element;
}

function Portal({ children, htmlElement = document.body }: IProps) {
  return createPortal(children, htmlElement);
}

export default Portal;
