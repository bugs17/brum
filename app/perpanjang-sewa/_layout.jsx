import { Stack } from "expo-router";

const _layoutPerpanjangSewa = () => {
  return (
    <Stack>
      <Stack.Screen name="[idTransaksi]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layoutPerpanjangSewa;
