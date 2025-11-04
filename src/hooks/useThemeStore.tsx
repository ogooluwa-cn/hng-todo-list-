// src/hooks/useThemeStore.tsx
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { loadTheme, saveTheme } from "../storage";
import { darkTheme, lightTheme, Theme } from "../theme";

type ThemeContextType = {
  theme: Theme; // current colors (not animated)
  isDark: boolean;
  toggleTheme: () => void;
  progress: { value: number }; // reanimated shared value for interpolation
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const progress = useSharedValue(0); // 0 => light, 1 => dark

  useEffect(() => {
    (async () => {
      const storedStr = await loadTheme();
      const stored = storedStr === "dark" ? true : storedStr === "light" ? false : null;
      if (stored !== null) {
        setIsDark(stored);
        progress.value = stored ? 1 : 0;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
  saveTheme(isDark ? "dark" : "light");
    progress.value = withTiming(isDark ? 1 : 0, { duration: 400 });
  }, [isDark, progress]);

  const toggleTheme = useCallback(() => setIsDark((s) => !s), []);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, progress }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

// Backwards-compatible alias used elsewhere in the app
export const useThemeStore = useTheme;
