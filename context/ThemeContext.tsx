import { useColorScheme } from "@/hooks/use-color-scheme";
import { createContext, useContext, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

type ThemeContextValue = {
  themeMode: ThemeMode;
  activeTheme: "light" | "dark";
  setThemeMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();

  const [themeMode, setThemeMode] = useState<ThemeMode>("system");

  const activeTheme =
    themeMode === "system" ? systemColorScheme ?? "light" : themeMode;

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        activeTheme,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used inside AppThemeProvider");
  }

  return context;
}