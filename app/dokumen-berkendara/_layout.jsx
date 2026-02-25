import { Stack } from "expo-router";

const _layoutDokumenBerkendara = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layoutDokumenBerkendara;
