import { Drawer } from "expo-router/drawer";

import { ThemeProvider } from "../src/theme/ThemeContext";
import { useAppTheme } from "../src/theme/useAppTheme";

function AppDrawer() {
  const { colors } = useAppTheme();

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },

        headerTintColor: colors.text,

        drawerStyle: {
          backgroundColor: colors.surface,
        },

        drawerActiveTintColor: colors.primary,
        drawerActiveBackgroundColor: colors.primaryLight,

        drawerInactiveTintColor: colors.text,

        sceneStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Resumen",
          title: "Resumen",
        }}
      />

      <Drawer.Screen
        name="usuario/editar"
        options={{
          drawerLabel: "Usuario",
          title: "Editar usuario",
        }}
      />

      <Drawer.Screen
        name="sql"
        options={{
          drawerLabel: "SQL Debug",
          title: "SQL Terminal",
        }}
      />
    </Drawer>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppDrawer />
    </ThemeProvider>
  );
}
