import { createContext, useState, type ReactNode } from "react";

export type Theme = "light" | "dark" | "ocean";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`app ${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}
