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
    LockClosedIcon,
    ShieldCheckIcon,
    XMarkIcon,
} from "react-native-heroicons/solid";
import { Fonts } from "../constants/fonts";
import BrumButton from "./ui/button"; // Pastikan path ini benar

const ModalOTP = ({ isVisible, onClose, onVerify }) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <Pressable
        style={[StyleSheet.absoluteFill, styles.overlay]}
        onPress={onClose}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.containerAvoidingView}
        pointerEvents="box-none"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalShadow} />

          <View style={styles.modalBody}>
            {/* ALERT BANNER - Verifikasi Keamanan */}
            <View style={styles.alertBanner}>
              <ShieldCheckIcon size={20} color="black" />
              <Text style={styles.alertText}>
                Demi keamanan, masukkan kode verifikasi yang kami kirim ke
                emailmu.
              </Text>
            </View>

            <View style={styles.header}>
              <Text style={styles.title}>KONFIRMASI PIN</Text>
              <Pressable onPress={onClose} style={styles.closeBtn}>
                <XMarkIcon size={20} color="black" />
              </Pressable>
            </View>

            <Text style={styles.subtitle}>
              Masukkan 6 digit kode OTP untuk memproses penarikan saldo.
            </Text>

            {/* Input OTP */}
            <View style={styles.inputWrapper}>
              <LockClosedIcon
                size={20}
                color="black"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="000000"
                style={styles.input}
                placeholderTextColor="#999"
                keyboardType="number-pad"
                maxLength={6}
              />
            </View>

            <BrumButton onPress={onVerify} title={"KONFIRMASI TARIK"} />

            <Pressable style={{ marginTop: 15 }}>
              <Text style={styles.resendText}>Kirim ulang kode (59s)</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
  containerAvoidingView: { flex: 1, justifyContent: "center", padding: 25 },
  modalContainer: { position: "relative", width: "100%" },
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
    backgroundColor: "#dff940", // Kuning khas Brum
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
  title: { fontFamily: Fonts.semibold, fontSize: 18, color: "black" },
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
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: "black",
    letterSpacing: 5,
  },
  resendText: {
    fontFamily: Fonts.semibold,
    fontSize: 12,
    textAlign: "center",
    color: "black",
    textDecorationLine: "underline",
  },
});

export default ModalOTP;
