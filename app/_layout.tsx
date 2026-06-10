import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { AppThemeProvider, useAppTheme } from "@/context/ThemeContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/hooks/use-color-scheme";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";


function AppLayout() {
  const colorScheme = useColorScheme();
  const activeTheme = colorScheme === "dark" ? "dark" : "light";
console.log("colorScheme:", colorScheme);
  return (
    <GluestackUIProvider mode={activeTheme}>
      <ThemeProvider value={activeTheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>

        <StatusBar style={activeTheme === "dark" ? "light" : "dark"} />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <AppLayout />
    </AppThemeProvider>
  );
}
