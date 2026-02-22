import { MotiView } from "moti";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Ilustrasi2 from "../../assets/images/step-2.png"; // Sesuaikan path asset lo
import { Fonts } from "../../constants/fonts";

const { width } = Dimensions.get("window");

const StepTwo = () => {
  return (
    <MotiView
      // State awal
      from={{
        opacity: 0,
        translateX: 50, // Muncul dari samping kanan biar variatif
      }}
      // State masuk
      animate={{
        opacity: 1,
        translateX: 0,
      }}
      // State keluar (saat pindah step)
      exit={{
        opacity: 0,
        translateX: -50,
      }}
      transition={{
        type: "timing",
        duration: 400,
      }}
      style={styles.container}
    >
      {/* 1. Ilustrasi dengan efek Spring */}
      <MotiView
        from={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", delay: 150 }}
        style={styles.imageWrapper}
      >
        <Image source={Ilustrasi2} style={styles.image} resizeMode="contain" />
      </MotiView>

      {/* 2. Content Teks */}
      <View style={styles.textWrapper}>
        <Text style={styles.title}>Verifikasi Cepat &{"\n"}Aman 🛡️</Text>

        <Text style={styles.description}>
          Data kamu dienkripsi dengan standar keamanan tinggi. Cukup upload KTP
          dan mulai booking tanpa ribet.
        </Text>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  imageWrapper: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textWrapper: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.c_semibold,
    color: "#000",
    textAlign: "center",
    lineHeight: 32,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    fontFamily: Fonts.regular, // Comfortaa
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
});

export default StepTwo;
