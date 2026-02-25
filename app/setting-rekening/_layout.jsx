import { Stack } from "expo-router";

const _layoutSettingRekening = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layoutSettingRekening;
