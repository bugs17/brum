import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-gesture-handler";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [loaded] = useFonts({
    IB_bold: require("../assets/fonts/ibm-plex-mono/IBMPlexMono-Bold.ttf"),
    IB_light: require("../assets/fonts/ibm-plex-mono/IBMPlexMono-Light.ttf"),
    IB_extra_light: require("../assets/fonts/ibm-plex-mono/IBMPlexMono-ExtraLight.ttf"),
    IB_medium: require("../assets/fonts/ibm-plex-mono/IBMPlexMono-Medium.ttf"),
    IB_regular: require("../assets/fonts/ibm-plex-mono/IBMPlexMono-Regular.ttf"),
    IB_SemiBold: require("../assets/fonts/ibm-plex-mono/IBMPlexMono-SemiBold.ttf"),
    IB_Thin: require("../assets/fonts/ibm-plex-mono/IBMPlexMono-Thin.ttf"),
    Comforta_bold: require("../assets/fonts/comfortaa/Comfortaa-Bold.ttf"),
    Comforta_light: require("../assets/fonts/comfortaa/Comfortaa-Light.ttf"),
    Comforta_medium: require("../assets/fonts/comfortaa/Comfortaa-Medium.ttf"),
    Comforta_regular: require("../assets/fonts/comfortaa/Comfortaa-Regular.ttf"),
    Comforta_Semibold: require("../assets/fonts/comfortaa/Comfortaa-SemiBold.ttf"),
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
        <Stack.Screen name="(on-boarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
