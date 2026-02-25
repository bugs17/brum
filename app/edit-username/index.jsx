import { MotiView } from "moti";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import {
    CameraIcon,
    ChevronLeftIcon,
    PencilIcon,
    UserCircleIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const EditUsernameScreen = () => {
  const router = useSafeRouter();
  const [username, setUsername] = useState("BudiSantoso"); // Initial state
  const [profileImage, setProfileImage] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.headerSection}>
            <View style={styles.headerRow}>
              <Pressable onPress={() => router.back()} style={styles.iconBtn}>
                <ChevronLeftIcon size={24} color="black" />
              </Pressable>
              <Text style={styles.mainTitle}>UBAH PROFIL</Text>
            </View>
            <Text style={styles.subTitle}>
              Ganti foto profil dan nama tampilan kamu agar diler dan penyewa
              lebih mengenali kamu.
            </Text>
          </View>

          {/* Avatar Section */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarShadow} />
            <View style={styles.avatarBody}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.imageFull}
                />
              ) : (
                <UserCircleIcon size={120} color="#E5E7EB" />
              )}

              {/* Tombol Kamera Kecil */}
              <Pressable
                onPress={() => {
                  /* Logic Gallery/Camera */
                }}
                style={styles.cameraBtn}
              >
                <CameraIcon size={20} color="white" />
              </Pressable>
            </View>
          </View>

          {/* Input Username */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>USERNAME / NAMA TAMPILAN</Text>
            <View style={styles.inputWrapper}>
              <PencilIcon size={20} color="black" style={styles.inputIcon} />
              <TextInput
                placeholder="Masukkan username baru"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="#999"
              />
            </View>
            <Text style={styles.helperText}>
              Username ini akan muncul di setiap ulasan dan profil publik kamu.
            </Text>
          </View>

          {/* Submit Button */}
          <View style={{ marginTop: 20 }}>
            <Pressable onPress={() => {}} style={styles.submitBtnContainer}>
              {({ pressed }) => (
                <View style={{ position: "relative", height: 55 }}>
                  <View style={styles.btnShadow} />
                  <MotiView
                    animate={{
                      translateX: pressed ? 4 : 0,
                      translateY: pressed ? 4 : 0,
                    }}
                    transition={{ type: "timing", duration: 50 }}
                    style={styles.btnBody}
                  >
                    <Text style={styles.btnText}>SIMPAN PERUBAHAN</Text>
                  </MotiView>
                </View>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  scrollContent: { padding: 25 },
  headerSection: { marginBottom: 40 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 15,
  },
  iconBtn: { padding: 8 },
  mainTitle: { fontFamily: Fonts.bold, fontSize: 26, color: "black" },
  subTitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },

  // AVATAR STYLE
  avatarContainer: {
    alignSelf: "center",
    width: 140,
    height: 140,
    marginBottom: 40,
    position: "relative",
  },
  avatarShadow: {
    position: "absolute",
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
    backgroundColor: "black",
    borderRadius: 70,
  },
  avatarBody: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imageFull: { width: "100%", height: "100%", resizeMode: "cover" },
  cameraBtn: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "black",
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },

  // INPUT STYLE
  inputGroup: { marginBottom: 30 },
  label: {
    fontFamily: Fonts.semibold,
    fontSize: 12,
    color: "black",
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    backgroundColor: "white",
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontFamily: Fonts.regular, fontSize: 14, color: "black" },
  helperText: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: "#999",
    marginTop: 8,
  },

  // BUTTON
  submitBtnContainer: { width: "100%" },
  btnShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 12,
  },
  btnBody: {
    flex: 1,
    backgroundColor: "#FECACA", // Warna Pink sesuai MenuCard
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { fontFamily: Fonts.semibold, fontSize: 15, color: "black" },
});

export default EditUsernameScreen;
