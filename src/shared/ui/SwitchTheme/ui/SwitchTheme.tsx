import { memo } from "react";
import styles from "./SwitchTheme.module.scss";
import { MoonStar, Sun } from "lucide-react";
import { useThemeContext } from "@/shared/hooks/useThemeContext";
import { clsx } from "@/shared/config/clsx";

function SwitchTheme() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className={styles.wrapper} onClick={toggleTheme}>
      <span
        className={clsx([styles.icon], {
          [styles.toggle]: Boolean(theme === "dark"),
        })}
      >
        {theme === "light" ? <Sun size={18} /> : <MoonStar size={18} />}
      </span>
    </div>
  );
}

export default memo(SwitchTheme);
