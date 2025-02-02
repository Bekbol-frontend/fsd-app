import { ThemeContext } from "@/app/Provider/ThemeProvider";
import { useContext } from "react";

export function useThemeContext() {
  return useContext(ThemeContext);
}
