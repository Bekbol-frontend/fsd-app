import { memo, useCallback } from "react";
import { Button } from "../../Button";
import { AlignJustify } from "lucide-react";
import styles from "./ToggleCollapsedMin.module.scss";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { sidebarMinActions } from "@/widgets/SidebarMin";

function ToggleCollapsedMin() {
  const dispatch = useAppDispatch();

  const setShowMinSidebar = useCallback(() => {
    dispatch(sidebarMinActions.toggleShow());
  }, [dispatch]);

  return (
    <Button
      variyant="text"
      addClass={styles.collapsedMinBtn}
      onClick={setShowMinSidebar}
    >
      <AlignJustify size={20} />
    </Button>
  );
}

export default memo(ToggleCollapsedMin);
