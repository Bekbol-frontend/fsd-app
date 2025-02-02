import { HtmlHTMLAttributes, memo, useMemo } from "react";
import styles from "./Sidebar.module.scss";
import { Link } from "react-router-dom";
import { routePaths } from "@/shared/config/route";
import { useSelector } from "react-redux";
import { getSidebarCollapsed, getSidebarItemsList } from "../models/selectors";
import { clsx } from "@/shared/config/clsx";
import SidebarItem from "./SidebarItem/SidebarItem";

interface IProps extends HtmlHTMLAttributes<HTMLDivElement> {
  addClass?: string;
}

function Sidebar(props: IProps) {
  const { addClass = "", ...otherProps } = props;

  const collapsed = useSelector(getSidebarCollapsed);
  const sidebarItems = useSelector(getSidebarItemsList);

  const mods = useMemo(
    () => ({
      [styles.collapsed]: collapsed,
    }),
    [collapsed]
  );

  const sidebarItemElements = useMemo(
    () =>
      sidebarItems.map((item) => (
        <SidebarItem item={item} key={item.path} collapsed={collapsed} />
      )),
    [collapsed, sidebarItems]
  );

  return (
    <aside className={clsx([styles.sidebar, addClass], mods)} {...otherProps}>
      <div className={styles.sidebarHeader}>
        <Link className={styles.logoLink} to={routePaths.HOME}>
          BBA
        </Link>
      </div>
      <div className={styles.sidebarBody}>
        <div className={styles.menuItems}>{sidebarItemElements}</div>
      </div>
    </aside>
  );
}

export default memo(Sidebar);
