import { Stack } from "expo-router";

const _layoutRiwayatInvoice = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[idTransaksi]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layoutRiwayatInvoice;
