import { Stack } from "expo-router";

const _layoutWithdraw = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layoutWithdraw;
