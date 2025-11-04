// components/InputField.tsx
import React from "react";
import { Text, TextInput, View } from "react-native";
import { useTheme } from "../src/hooks/useThemeStore";

type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (t: string) => void;
  multiline?: boolean;
};

export default function InputField({ label, placeholder, value, onChangeText, multiline = false }: Props) {
  const { theme } = useTheme();

  return (
    <View style={{ marginVertical: 6 }}>
      {label ? <Text style={{ color: theme.subText, marginBottom: 4 }}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.placeholder as string}
        multiline={multiline}
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          padding: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: theme.border as string,
        }}
      />
    </View>
  );
}
