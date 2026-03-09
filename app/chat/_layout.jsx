import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";

const _layoutChat = () => {
  return (
    <KeyboardProvider>
      <Stack>
        <Stack.Screen name="[idTransaksi]" options={{ headerShown: false }} />
      </Stack>
    </KeyboardProvider>
  );
};

export default _layoutChat;
