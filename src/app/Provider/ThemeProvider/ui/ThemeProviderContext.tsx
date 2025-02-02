import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../config";
import { THEME_KEY, THEME_TYPE } from "../model/type";

interface IProps {
  children: ReactNode;
}

export const getThemeLocalStorage = (): THEME_TYPE => {
  const theme = localStorage.getItem(THEME_KEY);

  return theme ? (theme as THEME_TYPE) : "light";
};

function ThemeProviderContext({ children }: IProps) {
  const [theme, setTheme] = useState<THEME_TYPE>(() => getThemeLocalStorage());

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.body.removeAttribute("class");

    document.body.classList.add(theme);
  }, [theme]);

  const values = useMemo(() => {
    return { theme, toggleTheme };
  }, [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProviderContext;
