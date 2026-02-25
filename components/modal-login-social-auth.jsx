import { MotiView } from "moti";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { ExclamationCircleIcon, XMarkIcon } from "react-native-heroicons/solid";
import { Fonts } from "../constants/fonts";

const LoginModalSocialAuth = ({
  isVisible,
  onClose,
  onGoogleLogin,
  onAppleLogin,
}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      {/* OVERLAY HITAM */}
      <View style={[StyleSheet.absoluteFill, styles.overlay]} />

      <View style={styles.containerView}>
        <View style={styles.modalContainer}>
          {/* Shadow Modal Utama */}
          <View style={styles.modalShadow} />

          <View style={styles.modalBody}>
            {/* ALERT BANNER */}
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
              Gunakan akun sosial media kamu untuk masuk lebih cepat dan aman.
            </Text>

            {/* Social Auth Buttons */}
            <View style={styles.buttonGroup}>
              {/* Google Button */}
              <Pressable onPress={onGoogleLogin} style={styles.btnWrapper}>
                {({ pressed }) => (
                  <View style={{ flex: 1, position: "relative" }}>
                    <View
                      style={[styles.btnShadow, { backgroundColor: "#000" }]}
                    />
                    <MotiView
                      animate={{
                        translateX: pressed ? 4 : 0,
                        translateY: pressed ? 4 : 0,
                      }}
                      transition={{ type: "timing", duration: 50 }}
                      style={[styles.btnBody, { backgroundColor: "white" }]}
                    >
                      <Text style={styles.btnText}>LANJUT DENGAN GOOGLE</Text>
                    </MotiView>
                  </View>
                )}
              </Pressable>

              {/* Apple Button */}
              <Pressable onPress={onAppleLogin} style={styles.btnWrapper}>
                {({ pressed }) => (
                  <View style={{ flex: 1, position: "relative" }}>
                    <View
                      style={[styles.btnShadow, { backgroundColor: "#000" }]}
                    />
                    <MotiView
                      animate={{
                        translateX: pressed ? 4 : 0,
                        translateY: pressed ? 4 : 0,
                      }}
                      transition={{ type: "timing", duration: 50 }}
                      style={[styles.btnBody, { backgroundColor: "black" }]}
                    >
                      <Text style={[styles.btnText, { color: "white" }]}>
                        LANJUT DENGAN APPLE
                      </Text>
                    </MotiView>
                  </View>
                )}
              </Pressable>
            </View>

            <Text style={styles.footerNote}>
              Dengan melanjutkan, kamu menyetujui syarat dan ketentuan kami.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.84)",
  },
  containerView: {
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
    backgroundColor: "#BAE6FD",
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
    marginBottom: 25,
    lineHeight: 18,
  },
  buttonGroup: {
    gap: 18,
    marginBottom: 20,
  },
  btnWrapper: {
    height: 55,
    width: "100%",
  },
  btnShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "black",
  },
  btnBody: {
    flex: 1,
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

export default LoginModalSocialAuth;
