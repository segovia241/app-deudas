import { Pressable, StyleSheet, Text } from "react-native";

import { useAppTheme } from "../../theme/useAppTheme";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
};

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
}: AppButtonProps) {
  const { colors } = useAppTheme();

  function getBackgroundColor() {
    if (disabled) {
      return colors.disabled;
    }

    switch (variant) {
      case "secondary":
        return colors.surface;

      case "danger":
        return colors.danger;

      default:
        return colors.primary;
    }
  }

  function getTextColor() {
    if (variant === "secondary") {
      return colors.text;
    }

    return colors.textInverse;
  }

  function getBorderColor() {
    if (variant === "secondary") {
      return colors.border;
    }

    return getBackgroundColor();
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: getTextColor(),
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
