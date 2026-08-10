import { createContext, ReactNode, useEffect, useState } from "react";

import { Colors, ThemeColors, ThemeName } from "../constants/colors";

import { guardarTema, obtenerTema } from "../storage/theme.storage";

type ThemeContextType = {
  theme: ThemeName;
  colors: ThemeColors;
  toggleTheme: () => Promise<void>;
  setTheme: (theme: ThemeName) => Promise<void>;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>("light");

  useEffect(() => {
    cargarTema();
  }, []);

  async function cargarTema(): Promise<void> {
    try {
      const temaGuardado = await obtenerTema();

      if (temaGuardado) {
        setThemeState(temaGuardado);
      }
    } catch (error) {
      console.error("Error cargando tema:", error);
    }
  }

  async function setTheme(nuevoTema: ThemeName): Promise<void> {
    setThemeState(nuevoTema);

    await guardarTema(nuevoTema);
  }

  async function toggleTheme(): Promise<void> {
    const nuevoTema: ThemeName = theme === "light" ? "dark" : "light";

    await setTheme(nuevoTema);
  }

  const colors: ThemeColors = Colors[theme];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
