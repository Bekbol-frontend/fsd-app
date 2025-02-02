export interface IThemeValue {
  theme: THEME_TYPE;
  toggleTheme: () => void;
}
export const THEME_KEY = "theme";
export type THEME_TYPE = "dark" | "light";
