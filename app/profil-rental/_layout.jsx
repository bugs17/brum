import { Stack } from "expo-router";

const _layoutProfilRental = () => {
  return (
    <Stack>
      <Stack.Screen name="[idRental]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layoutProfilRental;
