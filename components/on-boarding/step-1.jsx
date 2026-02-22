import { MotiView } from "moti"; // Import Moti
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Ilustrasi1 from "../../assets/images/step-1.png";
import { Fonts } from "../../constants/fonts";

const { width } = Dimensions.get("window");

const StepOne = () => {
  return (
    <MotiView
      // 1. Initial State (Saat baru lahir)
      from={{
        opacity: 0,
        translateY: 20,
      }}
      // 2. Animate To (Posisi akhir)
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      // 3. Exit State (Saat menghilang karena diganti step lain)
      exit={{
        opacity: 0,
        translateY: -20,
      }}
      transition={{
        type: "timing",
        duration: 400,
      }}
      style={styles.container}
    >
      {/* Area Gambar / Ilustrasi */}
      <MotiView
        from={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 100 }}
        style={styles.imageWrapper}
      >
        <Image source={Ilustrasi1} style={styles.image} resizeMode="contain" />
      </MotiView>

      {/* Area Teks Content */}
      <View style={styles.textWrapper}>
        <Text style={styles.title}>Cari Motor Jadi Lebih{"\n"}Mudah 🛵</Text>

        <Text style={styles.description}>
          Temukan berbagai jenis motor dari diler terdekat dengan harga
          transparan langsung dari aplikasi.
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
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
});

export default StepOne;
