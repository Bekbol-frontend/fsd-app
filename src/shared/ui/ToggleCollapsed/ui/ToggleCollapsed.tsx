import { memo, useCallback } from "react";
import { Button } from "../../Button";
import { AlignJustify } from "lucide-react";
import styles from "./ToggleCollapsed.module.scss";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { sidebarActions } from "@/widgets/Sidebar";

function ToggleCollapsed() {
  const dispatch = useAppDispatch();

  const toggle = useCallback(() => {
    dispatch(sidebarActions.setCollapsed());
  }, [dispatch]);

  return (
    <Button variyant="text" addClass={styles.collapsedBtn} onClick={toggle}>
      <AlignJustify size={20} />
    </Button>
  );
}

export default memo(ToggleCollapsed);
