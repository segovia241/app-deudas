import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  actualizarIngresoMetaDiaria,
  actualizarIngresoMinMensual,
  actualizarMoneda,
  actualizarNombre,
  actualizarSaldoActual,
  obtenerUsuario,
} from "../../src/database/repositories/usuario.repository";

import AppButton from "@/src/components/ui/AppButton";
import { useAppTheme } from "../../src/theme/useAppTheme";

export default function UsuarioForm() {
  const { colors } = useAppTheme();

  const [modoEdicion, setModoEdicion] = useState(false);
  const [cargando, setCargando] = useState(true);

  const [nombre, setNombre] = useState("");
  const [moneda, setMoneda] = useState("PEN");
  const [saldoActual, setSaldoActual] = useState("");
  const [ingresoMinMensual, setIngresoMinMensual] = useState("");
  const [ingresoMetaDiaria, setIngresoMetaDiaria] = useState("");

  useEffect(() => {
    entrarModoVisualizacion();
  }, []);

  async function entrarModoVisualizacion() {
    setModoEdicion(false);
    setCargando(true);

    await cargarUsuario();

    setCargando(false);
  }

  async function cargarUsuario() {
    try {
      const usuario = await obtenerUsuario();

      if (!usuario) {
        Alert.alert("Usuario", "No se encontró ningún usuario.");

        return;
      }

      setNombre(usuario.nombre);
      setMoneda(usuario.moneda);
      setSaldoActual(String(usuario.saldo_actual));

      setIngresoMinMensual(String(usuario.ingreso_min_mensual));

      setIngresoMetaDiaria(String(usuario.ingreso_meta_diaria));
    } catch (error) {
      Alert.alert("Error", `No se pudo cargar el usuario:\n${String(error)}`);
    }
  }

  function entrarModoEdicion() {
    setModoEdicion(true);
  }

  async function cancelarEdicion() {
    await entrarModoVisualizacion();
  }

  async function guardarUsuario() {
    if (!nombre.trim()) {
      Alert.alert("Validación", "El nombre es obligatorio.");

      return;
    }

    try {
      await actualizarNombre(nombre.trim());

      await actualizarMoneda(moneda.trim() || "PEN");

      await actualizarSaldoActual(Number(saldoActual) || 0);

      await actualizarIngresoMinMensual(Number(ingresoMinMensual) || 0);

      await actualizarIngresoMetaDiaria(Number(ingresoMetaDiaria) || 0);

      Alert.alert("Guardado", "Los datos fueron actualizados correctamente.");

      await entrarModoVisualizacion();
    } catch (error) {
      Alert.alert("Error", `No se pudo guardar el usuario:\n${String(error)}`);
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
        <Text
          style={{
            color: colors.text,
          }}
        >
          Cargando usuario...{" "}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        backgroundColor: colors.background,
      }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.encabezado}>
        <Text
          style={[
            styles.titulo,
            {
              color: colors.text,
            },
          ]}
        >
          Datos financieros{" "}
        </Text>

        {!modoEdicion && (
          <AppButton title="Editar" onPress={entrarModoEdicion} />
        )}
      </View>
      {modoEdicion ? (
        <>
          <Text
            style={[
              styles.label,
              {
                color: colors.text,
              },
            ]}
          >
            Nombre
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Tu nombre"
            placeholderTextColor={colors.textMuted}
          />

          <Text
            style={[
              styles.label,
              {
                color: colors.text,
              },
            ]}
          >
            Moneda
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            value={moneda}
            onChangeText={setMoneda}
            placeholder="PEN"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="characters"
          />

          <Text
            style={[
              styles.label,
              {
                color: colors.text,
              },
            ]}
          >
            Saldo actual
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            value={saldoActual}
            onChangeText={setSaldoActual}
            placeholder="0"
            placeholderTextColor={colors.textMuted}
            keyboardType="decimal-pad"
          />

          <Text
            style={[
              styles.label,
              {
                color: colors.text,
              },
            ]}
          >
            Ingreso mínimo mensual
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            value={ingresoMinMensual}
            onChangeText={setIngresoMinMensual}
            placeholder="0"
            placeholderTextColor={colors.textMuted}
            keyboardType="decimal-pad"
          />

          <Text
            style={[
              styles.label,
              {
                color: colors.text,
              },
            ]}
          >
            Meta diaria
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            value={ingresoMetaDiaria}
            onChangeText={setIngresoMetaDiaria}
            placeholder="0"
            placeholderTextColor={colors.textMuted}
            keyboardType="decimal-pad"
          />

          <View style={styles.botonesEdicion}>
            <View style={styles.boton}>
              <AppButton title="Guardar cambios" onPress={guardarUsuario} />
            </View>

            <View style={styles.boton}>
              <AppButton
                title="Cancelar"
                onPress={cancelarEdicion}
                variant="secondary"
              />
            </View>
          </View>
        </>
      ) : (
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <CampoVisual label="Nombre" value={nombre} colors={colors} />

          <CampoVisual label="Moneda" value={moneda} colors={colors} />

          <CampoVisual
            label="Saldo actual"
            value={saldoActual}
            colors={colors}
          />

          <CampoVisual
            label="Ingreso mínimo mensual"
            value={ingresoMinMensual}
            colors={colors}
          />

          <CampoVisual
            label="Meta diaria"
            value={ingresoMetaDiaria}
            colors={colors}
          />
        </View>
      )}
    </ScrollView>
  );
}

function CampoVisual({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: {
    text: string;
    textSecondary: string;
    border: string;
  };
}) {
  return (
    <View
      style={[
        styles.campoVisual,
        {
          borderBottomColor: colors.border,
        },
      ]}
    >
      <Text
        style={[
          styles.campoLabel,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        {label}{" "}
      </Text>

      <Text
        style={[
          styles.campoValor,
          {
            color: colors.text,
          },
        ]}
      >
        {value || "-"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 40,
  },

  cargando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "700",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },

  card: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 18,
  },

  campoVisual: {
    paddingVertical: 18,
    borderBottomWidth: 1,
  },

  campoLabel: {
    fontSize: 13,
    marginBottom: 5,
  },

  campoValor: {
    fontSize: 17,
    fontWeight: "600",
  },

  botonesEdicion: {
    marginTop: 10,
    gap: 12,
  },

  boton: {
    width: "100%",
  },
});
