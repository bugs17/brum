import { Stack } from "expo-router";

const _layoutDetailMotor = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layoutDetailMotor;
