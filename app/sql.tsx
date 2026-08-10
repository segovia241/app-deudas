import { useState } from "react";
import {
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { dbPromise } from "../src/database/db";

export default function SqlTerminal() {
  const [sql, setSql] = useState("SELECT * FROM usuario;");

  const [resultado, setResultado] = useState("Ejecuta una consulta...");

  const [ejecutando, setEjecutando] = useState(false);

  async function ejecutarSQL() {
    const consulta = sql.trim();

    if (!consulta) {
      Alert.alert("SQL", "Escribe una consulta.");

      return;
    }

    try {
      setEjecutando(true);

      const db = await dbPromise;

      const esConsulta =
        consulta.toUpperCase().startsWith("SELECT") ||
        consulta.toUpperCase().startsWith("PRAGMA");

      if (esConsulta) {
        const filas = await db.getAllAsync(consulta);

        setResultado(JSON.stringify(filas, null, 2));
      } else {
        const result = await db.runAsync(consulta);

        setResultado(
          JSON.stringify(
            {
              mensaje: "Consulta ejecutada correctamente",
              cambios: result.changes,
              ultimoId: result.lastInsertRowId,
            },
            null,
            2,
          ),
        );
      }
    } catch (error) {
      setResultado(`ERROR SQL\n\n${String(error)}`);
    } finally {
      setEjecutando(false);
    }
  }

  function limpiar() {
    setSql("");
    setResultado("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>SQL Terminal</Text>

      <Text style={styles.label}>Consulta</Text>

      <TextInput
        style={styles.editor}
        value={sql}
        onChangeText={setSql}
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="SELECT * FROM usuario;"
        textAlignVertical="top"
      />

      <View style={styles.botones}>
        <Button
          title={ejecutando ? "Ejecutando..." : "Ejecutar"}
          onPress={ejecutarSQL}
          disabled={ejecutando}
        />

        <Button title="Limpiar" onPress={limpiar} />
      </View>

      <Text style={styles.label}>Resultado</Text>

      <ScrollView style={styles.resultado}>
        <Text style={styles.resultadoTexto} selectable>
          {resultado}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },

  editor: {
    minHeight: 150,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    fontFamily: "monospace",
    marginBottom: 15,
  },

  botones: {
    gap: 10,
    marginBottom: 25,
  },

  resultado: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 12,
  },

  resultadoTexto: {
    fontFamily: "monospace",
    fontSize: 13,
  },
});
