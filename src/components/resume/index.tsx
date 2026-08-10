import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { obtenerUsuario } from "../../database/repositories/usuario.repository";
import { useAppTheme } from "../../theme/useAppTheme";

import CardsInfo from "./cardsInfo";

export default function Resume() {
  const { colors } = useAppTheme();

  const [saldoActual, setSaldoActual] = useState(0);
  const [moneda, setMoneda] = useState("PEN");

  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);

  useEffect(() => {
    cargarResumen();
  }, []);

  async function cargarResumen() {
    try {
      const usuario = await obtenerUsuario();

      if (!usuario) {
        Alert.alert("Usuario", "No se encontró ningún usuario.");

        return;
      }

      setSaldoActual(usuario.saldo_actual);
      setMoneda(usuario.moneda);
    } catch (error) {
      Alert.alert("Error", `No se pudo cargar el resumen:\n${String(error)}`);
    } finally {
      setCargando(false);
    }
  }

  async function refrescarResumen() {
    try {
      setRefrescando(true);

      await cargarResumen();
    } finally {
      setRefrescando(false);
    }
  }

  if (cargando) {
    return (
      <View
        style={[
          styles.cargando,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        backgroundColor: colors.background,
      }}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refrescando}
          onRefresh={refrescarResumen}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
    >
      <CardsInfo saldoActual={saldoActual} moneda={moneda} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },

  cargando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
