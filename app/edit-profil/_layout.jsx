import { Stack } from "expo-router";

const _layoutEditProfil = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layoutEditProfil;
