import React from "react";
import { Pressable, Text, View } from "react-native";
import { useThemeStore } from "../src/hooks/useThemeStore";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeStore(); // Changed from 'toggle' to 'toggleTheme'
  
  return (
    <Pressable onPress={toggleTheme} accessibilityLabel="Toggle theme">
      <View style={{
        padding: 12,
        borderRadius: 20,
        backgroundColor: isDark ? "#333" : "#ddd",
        alignSelf: 'flex-start',
        marginBottom: 16,
      }}>
        <Text style={{ 
          color: isDark ? "#fff" : "#000",
          fontWeight: '600'
        }}>
          {isDark ? "🌙 Dark" : "☀️ Light"}
        </Text>
      </View>
    </Pressable>
  );
}