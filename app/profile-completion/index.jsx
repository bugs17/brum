import { useLocalSearchParams } from "expo-router";
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
  CameraIcon,
  ChevronLeftIcon,
  ExclamationCircleIcon, // Pakai ini agar sama dengan modal
  IdentificationIcon,
  PhoneIcon,
  UserIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingOverlay from "../../components/loading-overlay";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const ProfileCompletionScreen = () => {
  const router = useSafeRouter();
  const params = useLocalSearchParams();
  const isEditMode = params.mode === "edit";
  const [ktpPhoto, setKtpPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
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
          {/* Header Title */}
          <View style={styles.headerSection}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
                marginBottom: 15,
              }}
            >
              {/* Button Back hanya muncul saat isEditMode = true */}
              {isEditMode && (
                <Pressable onPress={() => router.back()} style={styles.iconBtn}>
                  <ChevronLeftIcon size={24} color="black" />
                </Pressable>
              )}

              <Text style={styles.mainTitle}>
                {isEditMode ? "UPDATE PROFIL" : "LENGKAPI PROFIL"}
              </Text>
            </View>

            <Text style={styles.subTitle}>
              {isEditMode
                ? "Pastikan data diri kamu tetap akurat agar proses sewa tetap lancar."
                : "Satu langkah terakhir! Ambil foto KTP kamu untuk proses verifikasi instan."}
            </Text>
          </View>

          {/* --- UPLOAD KTP SECTION --- */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>FOTO KTP</Text>
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
                      ktpPhoto && { backgroundColor: "#FDFDFD" },
                    ]}
                  >
                    {ktpPhoto ? (
                      <View style={styles.imagePreviewWrapper}>
                        <Image
                          source={{ uri: ktpPhoto }}
                          style={styles.previewImage}
                        />
                        <View style={styles.changePhotoBadge}>
                          <Text style={styles.changePhotoText}>GANTI FOTO</Text>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.uploadPlaceholder}>
                        <View style={styles.cameraCircle}>
                          <CameraIcon size={32} color="black" />
                        </View>
                        <Text style={styles.uploadInfoTitle}>
                          Ambil Foto KTP
                        </Text>
                        <Text style={styles.uploadInfoSub}>
                          Pastikan NIK dan Foto terlihat jelas
                        </Text>
                      </View>
                    )}
                  </MotiView>
                </View>
              )}
            </Pressable>
          </View>

          {/* Input Nama Lengkap */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NAMA LENGKAP (Sesuai KTP)</Text>
            <View style={styles.inputWrapper}>
              <UserIcon size={20} color="black" style={styles.inputIcon} />
              <TextInput
                placeholder="Contoh: Budi Santoso"
                style={styles.input}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Input NIK / KTP */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NOMOR NIK / KTP</Text>
            <View style={styles.inputWrapper}>
              <IdentificationIcon
                size={20}
                color="black"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="16 Digit Nomor KTP"
                style={styles.input}
                placeholderTextColor="#999"
                keyboardType="number-pad"
              />
            </View>
          </View>

          {/* Input WhatsApp */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NOMOR WHATSAPP</Text>
            <View style={styles.inputWrapper}>
              <PhoneIcon size={20} color="black" style={styles.inputIcon} />
              <TextInput
                placeholder="0812xxxx"
                style={styles.input}
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* --- ALERT BANNER (Identik dengan Modal) --- */}
          <View style={styles.alertBanner}>
            <ExclamationCircleIcon size={20} color="black" />
            <Text style={styles.alertText}>
              Data kamu aman dan hanya digunakan untuk kontrak sewa yang sah.
            </Text>
          </View>

          {/* Submit Button */}
          <View style={{ marginTop: 25, marginBottom: 40 }}>
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
                    style={[
                      styles.btnBody,
                      isEditMode && { backgroundColor: "#C7D2FE" }, // Opsional: bedakan warna tombol saat edit
                    ]}
                  >
                    <Text style={styles.btnText}>
                      {isEditMode ? "SIMPAN PERUBAHAN" : "SIMPAN & LANJUT SEWA"}
                    </Text>
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
  iconBtn: {
    padding: 8,
  },
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  scrollContent: { padding: 25 },
  headerSection: { marginBottom: 30 },
  mainTitle: {
    fontFamily: Fonts.bold,
    fontSize: 26,
    color: "black",
    marginBottom: 8,
  },
  subTitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },

  // UPLOAD KTP STYLE
  inputGroup: { marginBottom: 25 },
  label: {
    fontFamily: Fonts.semibold,
    fontSize: 12,
    color: "black",
    marginBottom: 10,
  },
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
  uploadPlaceholder: { alignItems: "center" },
  cameraCircle: {
    width: 60,
    height: 60,
    backgroundColor: "#BAE6FD",
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

  // INPUT STYLE
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

  // ALERT BANNER STYLE (Update sesuai permintaan)
  alertBanner: {
    backgroundColor: "#BAE6FD", // Biru Muda konsisten
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    marginTop: 10,
    gap: 10,
  },
  alertText: {
    fontFamily: Fonts.semibold,
    fontSize: 12,
    color: "black",
    flex: 1,
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
    backgroundColor: "#dff940",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { fontFamily: Fonts.semibold, fontSize: 15, color: "black" },
});

export default ProfileCompletionScreen;
