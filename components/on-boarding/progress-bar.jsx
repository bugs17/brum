import { MotiView } from "moti";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useOnBoardingStep } from "../../store/on-boarding-step";

const ProgressBar = ({ totalStep = 3 }) => {
  const { step, nextStep, prevStep } = useOnBoardingStep();
  const [containerWidth, setContainerWidth] = useState(0);

  // Hitung progres (0 sampai 1)
  const progress = step / totalStep;

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <View style={styles.backgroundBar}>
        <MotiView
          from={{ width: 0 }}
          animate={{
            // Sekarang dia mengacu pada containerWidth yang ditangkap onLayout
            width: containerWidth * progress,
          }}
          transition={{
            type: "timing",
            duration: 500,
          }}
          style={styles.progressBar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%", // Mengikuti flex: 1 dari parent
  },
  backgroundBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#dff940",
    borderRadius: 10,
  },
});

export default ProgressBar;
