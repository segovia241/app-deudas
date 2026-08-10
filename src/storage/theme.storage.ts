import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemeName } from "../constants/colors";

const THEME_STORAGE_KEY = "app_theme";

export async function guardarTema(theme: ThemeName): Promise<void> {
  await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
}

export async function obtenerTema(): Promise<ThemeName | null> {
  const theme = await AsyncStorage.getItem(THEME_STORAGE_KEY);

  if (theme === "light" || theme === "dark") {
    return theme;
  }

  return null;
}
