import { Stack } from "expo-router";

const _layoutPusatBantuan = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layoutPusatBantuan;
