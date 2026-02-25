import { MotiView } from "moti";
import { useEffect, useState } from "react";
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
    CalendarIcon,
    CameraIcon,
    ChevronLeftIcon,
    InformationCircleIcon
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingOverlay from "../../components/loading-overlay";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const DokumenBerkendaraScreen = () => {
  const router = useSafeRouter();
  const [simPhoto, setSimPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading data SIM jika sudah ada
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.headerSection}>
            <View style={styles.headerRow}>
              <Pressable onPress={() => router.back()} style={styles.iconBtn}>
                <ChevronLeftIcon size={24} color="black" />
              </Pressable>
              <Text style={styles.mainTitle}>DOKUMEN SIM</Text>
            </View>
            <Text style={styles.subTitle}>
              Unggah foto SIM C kamu yang masih aktif untuk syarat utama
              berkendara.
            </Text>
          </View>

          {/* --- UPLOAD SIM SECTION --- */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>FOTO SIM C</Text>
            <Pressable
              onPress={() => {
                /* Logic Camera */
              }}
            >
              {({ pressed }) => (
                <View style={styles.uploadContainer}>
                  <View style={styles.uploadShadow} />
                  <MotiView
                    animate={{
                      translateX: pressed ? 4 : 0,
                      translateY: pressed ? 4 : 0,
                    }}
                    transition={{ type: "timing", duration: 50 }}
                    style={[
                      styles.uploadBody,
                      simPhoto && { backgroundColor: "#FDFDFD" },
                    ]}
                  >
                    {simPhoto ? (
                      <View style={styles.imagePreviewWrapper}>
                        <Image
                          source={{ uri: simPhoto }}
                          style={styles.previewImage}
                        />
                        <View style={styles.changePhotoBadge}>
                          <Text style={styles.changePhotoText}>GANTI FOTO</Text>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.uploadPlaceholder}>
                        <View
                          style={[
                            styles.cameraCircle,
                            { backgroundColor: "#BBF7D0" },
                          ]}
                        >
                          <CameraIcon size={32} color="black" />
                        </View>
                        <Text style={styles.uploadInfoTitle}>
                          Ambil Foto SIM C
                        </Text>
                        <Text style={styles.uploadInfoSub}>
                          Pastikan semua teks terbaca jelas
                        </Text>
                      </View>
                    )}
                  </MotiView>
                </View>
              )}
            </Pressable>
          </View>

          {/* Input Masa Berlaku SIM */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>MASA BERLAKU SIM</Text>
            <View style={styles.inputWrapper}>
              <CalendarIcon size={20} color="black" style={styles.inputIcon} />
              <TextInput
                placeholder="DD / MM / YYYY"
                style={styles.input}
                placeholderTextColor="#999"
              />
            </View>
            <Text style={styles.inputHelp}>Contoh: 12/05/2028</Text>
          </View>

          {/* Alert Info */}
          <View style={styles.infoBox}>
            <InformationCircleIcon size={20} color="black" />
            <Text style={styles.infoText}>
              Brum akan memberikan pengingat 30 hari sebelum masa berlaku SIM
              kamu habis.
            </Text>
          </View>

          {/* Submit Button */}
          <View style={{ marginTop: 30, marginBottom: 40 }}>
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
                    <Text style={styles.btnText}>SIMPAN DOKUMEN</Text>
                  </MotiView>
                </View>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <LoadingOverlay visible={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  scrollContent: { padding: 25 },
  headerSection: { marginBottom: 30 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 15,
  },
  iconBtn: { padding: 8 }, // Sesuaikan dengan header ProfileCompletion
  mainTitle: { fontFamily: Fonts.bold, fontSize: 26, color: "black" },
  subTitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },

  // INPUT STYLES
  inputGroup: { marginBottom: 25 },
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
  inputHelp: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: "#999",
    marginTop: 6,
    marginLeft: 2,
  },

  // UPLOAD STYLES
  uploadContainer: { height: 180, width: "100%", position: "relative" },
  uploadShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 12,
  },
  uploadBody: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  cameraCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  uploadInfoTitle: { fontFamily: Fonts.semibold, fontSize: 14, color: "black" },
  uploadInfoSub: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: "#999",
    marginTop: 4,
  },
  imagePreviewWrapper: { width: "100%", height: "100%" },
  previewImage: { width: "100%", height: "100%", resizeMode: "cover" },
  changePhotoBadge: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "black",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  changePhotoText: { color: "white", fontSize: 10, fontFamily: Fonts.semibold },

  // INFO BOX
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "black",
    gap: 10,
    alignItems: "center",
  },
  infoText: { fontFamily: Fonts.medium, fontSize: 12, color: "black", flex: 1 },

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
    backgroundColor: "#BBF7D0",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { fontFamily: Fonts.semibold, fontSize: 15, color: "black" },
});

export default DokumenBerkendaraScreen;
