// app/details.tsx
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { ThemeProvider, useTheme } from "../src/hooks/useThemeStore";

export default function DetailsWrapper() {
  return (
    <ThemeProvider>
      <Details />
    </ThemeProvider>
  );
}

function Details() {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ padding: 16 }}>
        <Text style={{ color: theme.text, fontSize: 18 }}>Todo details (stub)</Text>
      </View>
    </SafeAreaView>
  );
}
