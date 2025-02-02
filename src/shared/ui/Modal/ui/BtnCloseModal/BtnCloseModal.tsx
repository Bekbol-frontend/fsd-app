import { Button } from "@/shared/ui/Button";
import { X } from "lucide-react";
import { memo } from "react";
import styles from "./BtnCloseModal.module.scss";
import { clsx } from "@/shared/config/clsx";

interface IProps {
  addClass?: string;
  closeModal: () => void;
}

function BtnCloseModal({ addClass = "", closeModal }: IProps) {
  return (
    <Button
      addClass={clsx([styles.btnCloseModal, addClass])}
      variyant="text"
      onClick={closeModal}
    >
      <X size={19} />
    </Button>
  );
}

export default memo(BtnCloseModal);
