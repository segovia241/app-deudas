import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "../../theme/useAppTheme";
import AppCard from "../ui/AppCard";

type CardsInfoProps = {
  saldoActual: number;
  moneda: string;
};

export default function CardsInfo({ saldoActual, moneda }: CardsInfoProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      {/* DINERO DISPONIBLE */}
      <View style={styles.columna}>
        <AppCard style={styles.card}>
          <View style={styles.cardContent}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.text,
                },
              ]}
            >
              Dinero disponible
            </Text>

            <Text
              style={[
                styles.valor,
                {
                  color: colors.green,
                },
              ]}
            >
              {moneda} {saldoActual.toFixed(2)}
            </Text>
          </View>
        </AppCard>
      </View>

      {/* PAGO PRÓXIMO */}
      <View style={styles.columna}>
        <AppCard style={styles.card}>
          <View style={styles.cardContent}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.text,
                },
              ]}
            >
              Pago próximo
            </Text>

            <Text
              style={[
                styles.valor,
                {
                  color: colors.primary,
                },
              ]}
            >
              {moneda} 1,200
            </Text>

            <Text
              style={[
                styles.subtexto,
                {
                  color: colors.primary,
                },
              ]}
            >
              11 de mayo
            </Text>
          </View>
        </AppCard>
      </View>

      {/* PAGOS PRÓXIMOS */}
      <View style={styles.columna}>
        <AppCard style={styles.card}>
          <View style={styles.cardContent}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.text,
                },
              ]}
            >
              Pagos próximos
            </Text>

            <Text
              style={[
                styles.valor,
                {
                  color: colors.warning,
                },
              ]}
            >
              {moneda} 3,850
            </Text>

            <Text
              style={[
                styles.subtexto,
                {
                  color: colors.warning,
                },
              ]}
            >
              7 días
            </Text>
          </View>
        </AppCard>
      </View>

      {/* INGRESO PROMEDIO DIARIO */}
      <View style={styles.columna}>
        <AppCard style={styles.card}>
          <View style={styles.cardContent}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.text,
                },
              ]}
            >
              Ingreso prom. diario
            </Text>

            <Text
              style={[
                styles.valor,
                {
                  color: colors.green,
                },
              ]}
            >
              {moneda} 420
            </Text>
          </View>
        </AppCard>
      </View>

      {/* INGRESO MÍNIMO NECESARIO */}
      <View style={styles.columna}>
        <AppCard style={styles.card}>
          <View style={styles.cardContent}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.text,
                },
              ]}
            >
              Ingreso mín. necesario
            </Text>

            <Text
              style={[
                styles.valor,
                {
                  color: "#C45CFF",
                },
              ]}
            >
              {moneda} 510
            </Text>
          </View>
        </AppCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
    width: "19%",
  },

  columna: {
    height: 105,
    minHeight: 105,
  },

  card: {
    flex: 1,
  },

  cardContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  label: {
    fontSize: 10,
    textAlign: "center",
  },

  valor: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },

  subtexto: {
    fontSize: 12,
    textAlign: "center",
  },
});
