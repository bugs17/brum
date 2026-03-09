import { Stack } from "expo-router";

const _layoutNavigasiToDIler = () => {
  return (
    <Stack>
      <Stack.Screen name="[idBooking]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layoutNavigasiToDIler;
