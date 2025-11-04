// src/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_KEY = "@todoapp:theme";

export async function saveTheme(name: string) {
  try {
    await AsyncStorage.setItem(THEME_KEY, name);
  } catch (e) {
    console.warn("Failed to save theme", e);
  }
}

export async function loadTheme(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(THEME_KEY);
  } catch (e) {
    console.warn("Failed to load theme", e);
    return null;
  }
}
