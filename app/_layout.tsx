import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ThemeProvider as AppThemeProvider } from '../src/hooks/useThemeStore';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ConvexProvider client={new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!)}>
      <AppThemeProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {/* Render the router Slot so the normal index route is used */}
          <Slot />
          <StatusBar style="auto" />
        </ThemeProvider>
      </AppThemeProvider>
    </ConvexProvider>
  );
}
