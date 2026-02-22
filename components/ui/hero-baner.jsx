import { MotiView } from "moti";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  UserPlusIcon,
} from "react-native-heroicons/solid";
import { Fonts } from "../../constants/fonts";

const BrumHeroBanner = ({
  isLoggedIn = false,
  isVerified = false,
  onPress,
}) => {
  // --- Logika Konten Dinamis ---
  const getContent = () => {
    if (!isLoggedIn) {
      return {
        title: "GABUNG SEKARANG",
        desc: "Daftar akun Brum untuk mulai booking motor impianmu.",
        color: "#dff940", // Tetap kuning neon untuk tarik perhatian guest
        icon: <UserPlusIcon size={24} color="black" />,
      };
    }
    if (!isVerified) {
      return {
        title: "LENGKAPI PROFIL",
        desc: "Verifikasi KTP-mu sekarang agar bisa melakukan booking diler.",
        color: "#dff940", // Kuning neon karena ini aksi krusial
        icon: <ShieldCheckIcon size={24} color="black" />,
      };
    }
    return {
      title: "ID TERVERIFIKASI",
      desc: "Akunmu aman. Kamu bisa langsung booking unit motor kapan saja.",
      color: "#BBF7D0", // Hijau sukses
      icon: <ShieldCheckIcon size={24} color="black" />,
    };
  };

  const contentData = getContent();

  return (
    <View style={styles.bannerContainer}>
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <View style={styles.innerWrapper}>
            <View style={styles.bannerShadow} />

            <MotiView
              animate={{
                translateX: pressed ? 5 : 0,
                translateY: pressed ? 5 : 0,
              }}
              transition={{
                type: "timing",
                duration: 50,
              }}
              style={[
                styles.bannerBody,
                { backgroundColor: contentData.color },
              ]}
            >
              <View style={styles.content}>
                <View style={styles.iconCircle}>{contentData.icon}</View>

                <View style={styles.textWrapper}>
                  <Text style={styles.bannerTitle}>{contentData.title}</Text>
                  <Text style={styles.bannerDesc}>{contentData.desc}</Text>
                </View>

                <View style={styles.arrowBox}>
                  <ArrowRightIcon size={18} color="white" />
                </View>
              </View>
            </MotiView>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    height: 110,
    marginBottom: 30,
    marginHorizontal: 20,
    paddingRight: 5,
    paddingBottom: 5,
  },
  innerWrapper: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
  bannerShadow: {
    position: "absolute",
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
    backgroundColor: "black",
    borderRadius: 16,
  },
  bannerBody: {
    height: "100%",
    width: "100%",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    padding: 16,
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  bannerTitle: {
    fontSize: 16,
    fontFamily: Fonts.c_bold,
    color: "black",
  },
  bannerDesc: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    color: "#333",
    lineHeight: 16,
    marginTop: 2,
  },
  arrowBox: {
    width: 32,
    height: 32,
    backgroundColor: "black",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BrumHeroBanner;
