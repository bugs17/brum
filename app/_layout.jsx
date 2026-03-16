import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
      <Stack>
        <Stack.Screen name="(on-boarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="detail-motor" options={{ headerShown: false }} />
        <Stack.Screen
          name="profile-completion"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="payment" options={{ headerShown: false }} />
        <Stack.Screen name="edit-profil" options={{ headerShown: false }} />
        <Stack.Screen
          name="dokumen-berkendara"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="setting-rekening"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="edit-username" options={{ headerShown: false }} />
        <Stack.Screen name="ulasan" options={{ headerShown: false }} />
        <Stack.Screen name="profil-rental" options={{ headerShown: false }} />
        <Stack.Screen
          name="navigasi-to-diler"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="chat" options={{ headerShown: false }} />
        <Stack.Screen name="perpanjang-sewa" options={{ headerShown: false }} />
        <Stack.Screen name="notifikasi" options={{ headerShown: false }} />
        <Stack.Screen name="riwayat-invoice" options={{ headerShown: false }} />
        <Stack.Screen name="pusat-bantuan" options={{ headerShown: false }} />
        <Stack.Screen name="help" options={{ headerShown: false }} />
        <Stack.Screen
          name="syarat-dan-ketentuan"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="kebijakan-privasi"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="withdraw" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
