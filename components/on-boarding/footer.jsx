import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, View } from "react-native";
import { useSafeRouter } from "../../hooks/use-safe-router";
import { useOnBoardingStep } from "../../store/on-boarding-step";
import BrumButton from "../ui/button";

const { width } = Dimensions.get("screen");

const FootrOnBoarding = () => {
  const { step, nextStep } = useOnBoardingStep();
  const router = useSafeRouter();

  const handleNext = async () => {
    if (step < 3) {
      nextStep();
    } else if (step === 3) {
      try {
        // 1. Simpan status ke AsyncStorage
        await AsyncStorage.setItem("isFinishOnboarding", "true");

        // 2. Gunakan safeRouter untuk replace ke (tabs)
        // Note: Expo router biasanya menggunakan path /(tabs) atau langsung /
        router.replace("/(tabs)");

        console.log("Onboarding Selesai & Gass ke Home!");
      } catch (error) {
        console.error("Gagal menyimpan status onboarding:", error);
      }
    }
  };

  return (
    <View
      style={{
        width: width,
        height: 100,
        paddingHorizontal: 16,
        justifyContent: "center", // Agar button pas di tengah secara vertikal
      }}
    >
      <BrumButton
        title={step === 3 ? "GAS SEKARANG!" : "LANJUT"}
        onPress={handleNext}
        color="#dff940"
      />
    </View>
  );
};

export default FootrOnBoarding;
