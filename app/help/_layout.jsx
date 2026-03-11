import { Stack } from "expo-router";

const _layoutHelp = () => {
  return (
    <Stack>
      <Stack.Screen name="payment-faq" options={{ headerShown: false }} />
      <Stack.Screen name="report-merchant" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layoutHelp;
