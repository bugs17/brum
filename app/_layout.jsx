import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    SfThin: require("../assets/fonts/SF-Pro-Rounded-Thin.otf"),
    SfRegular: require("../assets/fonts/SF-Pro-Rounded-Regular.otf"),
    SfMedium: require("../assets/fonts/SF-Pro-Rounded-Medium.otf"),
    SfSemibold: require("../assets/fonts/SF-Pro-Rounded-Semibold.otf"),
    SfBold: require("../assets/fonts/SF-Pro-Rounded-Bold.otf"),
  });

  // Loading => keep splash visible
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Masih cek semua data => jangan render apa-apa dulu
  if (!loaded) return null;

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
