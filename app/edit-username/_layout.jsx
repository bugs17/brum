import { Stack } from "expo-router";

const _layoutEditUsername = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layoutEditUsername;
