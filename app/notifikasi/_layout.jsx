import { Stack } from "expo-router";

const _layoutNotifikasiScreen = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layoutNotifikasiScreen;
