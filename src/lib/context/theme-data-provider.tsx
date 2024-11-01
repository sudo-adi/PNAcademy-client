"use client";
import { useTheme } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import setGlobalColorTheme from "../theme-config/theme-colors";

type ThemeColors = "Zinc" | "Rose" | "Blue" | "Green" | "Orange";

const ThemeContext = createContext<{
  themeColor: ThemeColors;
  setThemeColor: (color: ThemeColors) => void;
}>({ themeColor: "Zinc", setThemeColor: () => {} });

export default function ThemeDataProvider({ children }: ThemeProviderProps) {
  const getSavedThemeColor = () => {
    try {
      return (localStorage.getItem("themeColor") as ThemeColors) || "Zinc";
    } catch (error) {
      return "Zinc" as ThemeColors;
    }
  };

  const [themeColor, setThemeColor] = useState(getSavedThemeColor());
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    localStorage.setItem("themeColor", themeColor);
    setGlobalColorTheme(theme as "light" | "dark", themeColor);

    if (!isMounted) {
      setIsMounted(true);
    }
  }, [themeColor, theme]);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
