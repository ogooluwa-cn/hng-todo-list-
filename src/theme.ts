// src/theme.ts
import { ColorValue } from "react-native";

export type Theme = {
  background: ColorValue;
  card: ColorValue;
  text: ColorValue;
  subText: ColorValue;
  primary: ColorValue;
  accent: ColorValue;
  border: ColorValue;
  placeholder: ColorValue;
};

export const lightTheme: Theme = {
  background: "#F6F7FB",
  card: "#FFFFFF",
  text: "#0B1220",
  subText: "#6B7280",
  primary: "#6366F1", // indigo
  accent: "#10B981", // green
  border: "#E5E7EB",
  placeholder: "#9CA3AF",
};

export const darkTheme: Theme = {
  background: "#0B0F13",
  card: "#111418",
  text: "#E6EEF6",
  subText: "#9CA3AF",
  primary: "#8B5CF6",
  accent: "#34D399",
  border: "#1F2937",
  placeholder: "#6B7280",
};
