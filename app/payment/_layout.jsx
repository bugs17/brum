import { Stack } from "expo-router";

const _layoutPayment = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="success" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layoutPayment;
