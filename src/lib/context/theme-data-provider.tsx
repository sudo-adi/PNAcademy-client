"use client";
import { useTheme } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import setGlobalColorTheme from "../theme-config/theme-colors";

type ThemeColors = "Slate" | "Rose" | "Blue" | "Green" | "Orange";

const ThemeContext = createContext<{
  themeColor: ThemeColors;
  setThemeColor: (color: ThemeColors) => void;
}>({ themeColor: "Slate", setThemeColor: () => {} });

export default function ThemeDataProvider({ children }: ThemeProviderProps) {
  const getSavedThemeColor = (): ThemeColors => {
    try {
      const savedColor = localStorage.getItem("themeColor") as ThemeColors;
      return savedColor &&
        ["Slate", "Rose", "Blue", "Green", "Orange"].includes(savedColor)
        ? savedColor
        : "Slate";
    } catch (error) {
      return "Slate";
    }
  };

  const [themeColor, setThemeColor] = useState<ThemeColors>(
    getSavedThemeColor()
  );
  const [isMounted, setIsMounted] = useState(false);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("themeColor", themeColor);
      const currentTheme = theme === "system" ? systemTheme : theme;
      if (currentTheme === "light" || currentTheme === "dark") {
        setGlobalColorTheme(currentTheme, themeColor);
      }
    }
  }, [themeColor, theme, systemTheme, isMounted]);

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
