import { StatusBar } from "expo-status-bar";
import { AnimatePresence } from "moti";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FootrOnBoarding from "../../components/on-boarding/footer";
import HeaderOnBoarding from "../../components/on-boarding/header";
import StepOne from "../../components/on-boarding/step-1";
import StepTwo from "../../components/on-boarding/step-2";
import StepThree from "../../components/on-boarding/step-3";
import { useOnBoardingStep } from "../../store/on-boarding-step";

const OnBoardingIndex = () => {
  const { step, nextStep, prevStep } = useOnBoardingStep();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar style="dark" />

      {/* headers container */}
      <HeaderOnBoarding />

      {/* content */}
      <View style={{ flex: 1 }}>
        <AnimatePresence exitBeforeEnter>{renderStep()}</AnimatePresence>
      </View>

      {/* footer */}
      <FootrOnBoarding />
    </SafeAreaView>
  );
};

export default OnBoardingIndex;

const styles = StyleSheet.create({});
