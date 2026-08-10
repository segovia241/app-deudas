import { StyleSheet, View, ViewProps } from "react-native";

import { ReactNode } from "react";

import { useAppTheme } from "../../theme/useAppTheme";

type AppCardProps = ViewProps & {
  children: ReactNode;

  variant?: "default" | "outlined";

  padding?: number;
};

export default function AppCard({
  children,
  variant = "default",
  padding = 5,
  style,
  ...props
}: AppCardProps) {
  const { colors } = useAppTheme();

  return (
    <View
      {...props}
      style={[
        styles.card,

        {
          padding,
          backgroundColor: colors.surface,

          borderColor: variant === "outlined" ? colors.border : "transparent",

          borderWidth: variant === "outlined" ? 1 : 0,
        },

        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
  },
});
