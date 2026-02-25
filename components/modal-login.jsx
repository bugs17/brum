import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  EnvelopeIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import { Fonts } from "../constants/fonts";
import BrumButton from "./ui/button";

const LoginModal = ({ isVisible, onClose, onLoginSuccess }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => onClose()}
    >
      {/* 1. OVERLAY HITAM: Dipisah agar tidak ikut naik/turun saat keyboard aktif */}
      <Pressable style={[StyleSheet.absoluteFill, styles.overlay]} />

      {/* 2. KEYBOARD AVOIDING: Hanya mengurus posisi kotak modal */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.containerAvoidingView}
        pointerEvents="box-none"
      >
        <View style={styles.modalContainer}>
          {/* Shadow Modal - SOP Brum 6px offset */}
          <View style={styles.modalShadow} />

          <View style={styles.modalBody}>
            {/* --- ALERT BANNER (Warna Biru Muda agar tidak bosan neon) --- */}
            <View style={styles.alertBanner}>
              <ExclamationCircleIcon size={20} color="black" />
              <Text style={styles.alertText}>
                Satu langkah lagi! Login dulu yuk untuk lanjut sewa motor ini.
              </Text>
            </View>

            {/* Header Modal */}
            <View style={styles.header}>
              <Text style={styles.title}>MASUK / DAFTAR</Text>
              <Pressable onPress={onClose} style={styles.closeBtn}>
                <XMarkIcon size={20} color="black" />
              </Pressable>
            </View>

            <Text style={styles.subtitle}>
              Masukkan email kamu untuk mendapatkan link masuk ajaib (Magic
              Link).
            </Text>

            {/* Input Email */}
            <View style={styles.inputWrapper}>
              <EnvelopeIcon size={20} color="black" style={styles.inputIcon} />
              <TextInput
                placeholder="emailkamu@gmail.com"
                style={styles.input}
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Button Masuk */}
            <BrumButton onPress={onLoginSuccess} title={"KIRIM MAGIC LINK"} />
            <Text style={styles.footerNote}>
              Belum punya akun? Tenang, otomatis didaftarkan kok!
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.84)",
  },
  containerAvoidingView: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },
  modalContainer: {
    position: "relative",
    width: "100%",
  },
  modalShadow: {
    position: "absolute",
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
    backgroundColor: "black",
    borderRadius: 12,
  },
  modalBody: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    padding: 20,
  },
  alertBanner: {
    backgroundColor: "#BAE6FD", // Biru Muda (Sky Blue)
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 20,
    gap: 10,
  },
  alertText: {
    fontFamily: Fonts.semibold,
    fontSize: 12,
    color: "black",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontFamily: Fonts.semibold,
    fontSize: 18,
    color: "black",
  },
  closeBtn: {
    padding: 4,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: "#666",
    marginBottom: 20,
    lineHeight: 18,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  inputIcon: { marginRight: 10 },
  input: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "black",
  },
  actionBtnContainer: {
    width: "100%",
    marginBottom: 15,
  },
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
  btnText: {
    fontFamily: Fonts.semibold,
    fontSize: 14,
    color: "black",
  },
  footerNote: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    textAlign: "center",
    color: "#999",
  },
});

export default LoginModal;
