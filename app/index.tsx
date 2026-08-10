import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";

import { initDatabase } from "../src/database/db";

import {
  crearUsuario,
  obtenerUsuario,
} from "../src/database/repositories/usuario.repository";

import Resume from "../src/components/resume";
import { useAppTheme } from "../src/theme/useAppTheme";

export default function Index() {
  const [dbLista, setDbLista] = useState(false);

  const { theme, colors, toggleTheme } = useAppTheme();

  useEffect(() => {
    cargarDatabase();
  }, []);

  async function cargarDatabase() {
    try {
      await initDatabase();

      const usuario = await obtenerUsuario();

      if (!usuario) {
        await crearUsuario();
      }

      setDbLista(true);
    } catch (error) {
      Alert.alert(
        "Error",
        `No se pudo inicializar la aplicación:\n${String(error)}`,
      );
    }
  }

  if (!dbLista) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <Resume></Resume>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
});
