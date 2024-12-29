import React from "react";
import { TouchableOpacity, ViewStyle, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface NeumorphicButtonProps {
  size?: number;
  icon?: any;
  color?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({
  size = 40,
  icon = "ellipsis-horizontal",
  color = "#808080",
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      <LinearGradient
        colors={["rgba(45, 45, 45, 1)", "rgba(25, 25, 25, 1)"]}
        style={[
          styles.gradient,
          {
            borderRadius: size / 2,
          },
        ]}
      >
        <Ionicons name={icon} size={size * 0.5} color={color} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    borderLeftColor: "rgba(255, 255, 255, 0.1)",
    borderRightColor: "rgba(0, 0, 0, 0.2)",
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
  },
});

export default NeumorphicButton;
