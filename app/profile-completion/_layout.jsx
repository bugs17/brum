import { Stack } from "expo-router";

const _layoutProfileCompletion = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layoutProfileCompletion;
