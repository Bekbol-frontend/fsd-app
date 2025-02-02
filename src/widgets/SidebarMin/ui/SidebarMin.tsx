import { Portal } from "@/shared/ui/Portal";
import styles from "./SidebarMin.module.scss";
import { useSelector } from "react-redux";
import { getSidebarMinShow } from "../models/selectors/getSidebarMinState";
import { useCallback, useEffect, useMemo } from "react";
import { MODS_CLSX, clsx } from "@/shared/config/clsx";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { sidebarMinActions } from "../models/slice";
import Sidebar from "@/widgets/Sidebar/ui/Sidebar";
import { Button } from "@/shared/ui/Button";
import { X } from "lucide-react";

interface IProps {
  addClass?: string;
}

function SidebarMin(props: IProps) {
  const { addClass = "" } = props;

  const show = useSelector(getSidebarMinShow);
  const dispatch = useAppDispatch();

  const hideSidebarMin = useCallback(() => {
    dispatch(sidebarMinActions.setShow(false));
  }, [dispatch]);

  useEffect(() => {
    const onKeyup = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        hideSidebarMin();
      }
    };

    if (show) {
      window.addEventListener("keyup", onKeyup);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keyup", onKeyup);
      document.body.style.overflow = "auto";
    };
  }, [show, hideSidebarMin]);

  const mods: MODS_CLSX = useMemo(
    () => ({
      [styles.show]: show,
    }),
    [show]
  );

  return (
    <Portal>
      <aside
        className={clsx([styles.sidebarMin, addClass], mods)}
        onClick={hideSidebarMin}
      >
        <Button addClass={styles.btnClose} onClick={hideSidebarMin}>
          <X size={18} />
        </Button>
        <Sidebar
          addClass={styles.innerSidebar}
          onClick={(e) => e.stopPropagation()}
        />
      </aside>
    </Portal>
  );
}

export default SidebarMin;
