import { createContext } from "react";
import { IThemeValue } from "../model/type";


export const ThemeContext = createContext<IThemeValue>(null!);