export const LightColors = {
  // Marca
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  primaryLight: "#DBEAFE",

  // Fondos
  background: "#F8FAFC",
  surface: "#FFFFFF",

  // Texto
  text: "#0F172A",
  textSecondary: "#64748B",
  textMuted: "#94A3B8",
  textInverse: "#FFFFFF",

  // Bordes
  border: "#E2E8F0",
  borderFocus: "#2563EB",

  // Estados
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
  info: "#0284C7",

  // Finanzas
  income: "#16A34A",
  expense: "#DC2626",
  debt: "#EA580C",
  positive: "#16A34A",
  negative: "#DC2626",

  // UI
  disabled: "#CBD5E1",
  overlay: "rgba(15, 23, 42, 0.5)",

  //colors
  green: "#16A34A",
} as const;

export type ThemeColors = {
  [K in keyof typeof LightColors]: string;
};

export const DarkColors: ThemeColors = {
  // Marca
  primary: "#3B82F6",
  primaryDark: "#2563EB",
  primaryLight: "#1E3A5F",

  // Fondos
  background: "#101823",
  surface: "#1E293B",

  // Texto
  text: "#F8FAFC",
  textSecondary: "#CBD5E1",
  textMuted: "#94A3B8",
  textInverse: "#0F172A",

  // Bordes
  border: "#334155",
  borderFocus: "#3B82F6",

  // Estados
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#38BDF8",

  // Finanzas
  income: "#22C55E",
  expense: "#EF4444",
  debt: "#F97316",
  positive: "#22C55E",
  negative: "#EF4444",

  // UI
  disabled: "#475569",
  overlay: "rgba(0, 0, 0, 0.65)",

  //colors
  green: "#16A34A",
};

export const Colors = {
  light: LightColors,
  dark: DarkColors,
} as const;

export type ThemeName = keyof typeof Colors;

export type ColorName = keyof ThemeColors;
