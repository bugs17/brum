import { Entypo } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Pressable, StyleSheet, View } from "react-native";
import { useOnBoardingStep } from "../../store/on-boarding-step";

const BackButton = () => {
  const { step, prevStep } = useOnBoardingStep();

  // Kita tetap return View kosong agar layout ProgressBar tidak geser saat step 1
  if (step === 1) return <View style={{ width: 42, height: 42 }} />;

  return (
    <Pressable onPress={prevStep} style={styles.pressable}>
      {({ pressed }) => (
        <View style={styles.container}>
          {/* 1. Shadow Layer (Kotak Hitam) */}
          <View style={styles.shadow} />

          {/* 2. Main Button Layer */}
          <MotiView
            animate={{
              translateX: pressed ? 2 : 0, // Efek mendepnya lebih kecil (2px) karena tombolnya kecil
              translateY: pressed ? 2 : 0,
            }}
            transition={{
              type: "timing",
              duration: 50,
            }}
            style={styles.buttonLayer}
          >
            <Entypo name="chevron-thin-left" size={16} color="black" />
          </MotiView>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: 42,
    height: 42,
  },
  container: {
    width: 42,
    height: 42,
    position: "relative",
  },
  shadow: {
    position: "absolute",
    top: 3, // Offset shadow sedikit lebih kecil dari tombol besar
    left: 3,
    right: -3,
    bottom: -3,
    backgroundColor: "black",
    borderRadius: 8,
  },
  buttonLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white", // Background putih bersih ala Saweria
    borderWidth: 2, // Border tebal
    borderColor: "black",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BackButton;
