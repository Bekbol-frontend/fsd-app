import { memo, useCallback, useMemo, useState } from "react";
import styles from "./Header.module.scss";
import { MODS_CLSX, clsx } from "@/shared/config/clsx";
import { ToggleCollapsed } from "@/shared/ui/ToggleCollapsed";
import { SwitchTheme } from "@/shared/ui/SwitchTheme";
import { ToggleCollapsedMin } from "@/shared/ui/ToggleCollapsedMin";
import { SwitchTranslate } from "@/shared/ui/SwitchTranslate";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import { LoginModal } from "@/features/AuthByUsername";
import { useSelector } from "react-redux";
import { getUserAuth } from "@/entities/User/models/selectors/getUserAuth";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { userActions } from "@/entities/User";

interface IProps {
  addClass?: string;
  collapsed: boolean;
}

function Header(props: IProps) {
  const { addClass = "", collapsed } = props;

  const [show, setShow] = useState(false);
  const userAuth = useSelector(getUserAuth);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const close = useCallback(() => {
    setShow(false);
  }, []);

  const open = useCallback(() => {
    setShow(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const mods: MODS_CLSX = useMemo(
    () => ({
      [styles.collapsed]: collapsed,
    }),
    [collapsed]
  );

  return (
    <>
      <header className={clsx([styles.header, addClass], mods)}>
        <div className={styles.headerInner}>
          <div>
            <ToggleCollapsed />
            <ToggleCollapsedMin />
          </div>

          <div className={styles.right}>
            {userAuth ? (
              <Button onClick={onLogout}>{t("Logout")}</Button>
            ) : (
              <Button onClick={open}>{t("Login")}</Button>
            )}

            <SwitchTranslate />
            <SwitchTheme />
          </div>
        </div>
      </header>

      <LoginModal show={show} close={close} />
    </>
  );
}

export default memo(Header);
