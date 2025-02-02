import { NavLink } from "react-router-dom";
import { ISidebarItem } from "../../models/types";
import styles from "./SidebarItem.module.scss";
import { useTranslation } from "react-i18next";
import { clsx } from "@/shared/config/clsx";
import { memo, useCallback } from "react";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { sidebarMinActions } from "@/widgets/SidebarMin";
import { useUser } from "@/shared/hooks/useUser";

interface IProps {
  item: ISidebarItem;
  collapsed: boolean;
}

function SidebarItem(props: IProps) {
  const { item, collapsed } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onHideSidebarMin = useCallback(() => {
    dispatch(sidebarMinActions.setShow(false));
  }, [dispatch]);

  const user = useUser();

  if (item.check && !user) {
    return null;
  }

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        clsx([styles.sidebarItem], {
          [styles.collapsed]: collapsed,
          [styles.active]: isActive,
        })
      }
      onClick={onHideSidebarMin}
    >
      <item.icon className={styles.icon} size={20} />
      <span className={styles.text}>{t(item.text)}</span>
    </NavLink>
  );
}

export default memo(SidebarItem);
