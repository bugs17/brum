import { MotiView } from "moti";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Ilustrasi3 from "../../assets/images/step-3.png"; // Sesuaikan path asset lo
import { Fonts } from "../../constants/fonts";

const { width } = Dimensions.get("window");

const StepThree = () => {
  return (
    <MotiView
      // Animasi masuk dari bawah dengan sedikit pantulan
      from={{
        opacity: 0,
        scale: 0.9,
        translateY: 30,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        translateY: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
        translateY: -30,
      }}
      transition={{
        type: "timing",
        duration: 500,
      }}
      style={styles.container}
    >
      {/* 1. Ilustrasi dengan efek Zoom-in Spring */}
      <MotiView
        from={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          damping: 12,
          delay: 200,
        }}
        style={styles.imageWrapper}
      >
        <Image source={Ilustrasi3} style={styles.image} resizeMode="contain" />
      </MotiView>

      {/* 2. Content Teks */}
      <View style={styles.textWrapper}>
        <Text style={styles.title}>Ambil Motor, Gas{"\n"}Kemudian! ✨</Text>

        <Text style={styles.description}>
          Tunjukkan kode booking ke diler, ambil motornya, dan nikmati
          perjalananmu tanpa hambatan.
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
    width: width * 0.85, // Sedikit lebih besar untuk efek selebrasi
    height: width * 0.85,
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
    fontFamily: Fonts.regular,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
});

export default StepThree;
