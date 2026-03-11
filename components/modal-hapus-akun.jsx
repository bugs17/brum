import { MotiView } from "moti";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import {
    ExclamationTriangleIcon,
    InformationCircleIcon,
} from "react-native-heroicons/solid";
import { Fonts } from "../constants/fonts";

const ModalHapusAkun = ({ showDeleteModal, setShowDeleteModal }) => {
  const [userData] = useState({
    hasActiveTransaction: false, // Ganti ke false untuk tes modal hapus
    walletBalance: 55000,
  });

  const handleDeleteRequest = () => {
    // Logika hapus akun di sini
    alert("Permintaan penghapusan sedang diproses.");
    setShowDeleteModal(false);
  };

  return (
    <Modal
      visible={showDeleteModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowDeleteModal(false)}
    >
      <View style={styles.modalOverlay}>
        <MotiView
          from={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={styles.modalContent}
        >
          <View style={styles.modalHeader}>
            <View
              style={[
                styles.warningIconBg,
                userData.hasActiveTransaction && {
                  borderColor: "#F59E0B",
                  backgroundColor: "#FEF3C7",
                },
              ]}
            >
              {userData.hasActiveTransaction ? (
                <InformationCircleIcon size={30} color="#F59E0B" />
              ) : (
                <ExclamationTriangleIcon size={30} color="#EF4444" />
              )}
            </View>
            <Text style={styles.modalTitle}>
              {userData.hasActiveTransaction
                ? "Belum Bisa Hapus"
                : "Hapus Akun?"}
            </Text>
          </View>

          <View style={styles.descriptionContainer}>
            {userData.hasActiveTransaction ? (
              <Text style={styles.modalDescription}>
                Anda masih memiliki{" "}
                <Text style={{ fontFamily: Fonts.bold }}>transaksi aktif</Text>.
                Harap kembalikan unit motor dan selesaikan semua tagihan sebelum
                menghapus akun Brum Anda.
              </Text>
            ) : (
              <>
                <Text style={styles.modalDescription}>
                  Tindakan ini tidak dapat dibatalkan. Seluruh data identitas
                  dan riwayat transaksi akan dihapus secara permanen.
                </Text>
                {userData.walletBalance > 0 && (
                  <View style={styles.balanceWarning}>
                    <Text style={styles.balanceWarningText}>
                      ⚠️ Saldo wallet{" "}
                      <Text style={{ fontFamily: Fonts.bold }}>
                        Rp {userData.walletBalance.toLocaleString()}
                      </Text>{" "}
                      akan hangus dan tidak dapat dikembalikan.
                    </Text>
                  </View>
                )}
              </>
            )}
          </View>

          <View style={styles.modalActions}>
            <Pressable
              style={[styles.modalBtn, styles.cancelBtn]}
              onPress={() => setShowDeleteModal(false)}
            >
              <Text style={styles.cancelBtnText}>BATAL</Text>
            </Pressable>

            {!userData.hasActiveTransaction && (
              <Pressable
                style={[styles.modalBtn, styles.confirmBtn]}
                onPress={handleDeleteRequest}
              >
                <Text style={styles.confirmBtnText}>YA, HAPUS</Text>
              </Pressable>
            )}
          </View>
        </MotiView>
      </View>
    </Modal>
  );
};

export default ModalHapusAkun;

const styles = StyleSheet.create({
  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  modalContent: {
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 24,
    padding: 25,
    width: "100%",
  },
  modalHeader: { alignItems: "center", marginBottom: 15 },
  warningIconBg: {
    width: 60,
    height: 60,
    backgroundColor: "#FEE2E2",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#EF4444",
  },
  modalTitle: { fontFamily: Fonts.bold, fontSize: 20, color: "black" },
  descriptionContainer: { marginBottom: 25 },
  modalDescription: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    lineHeight: 22,
  },
  balanceWarning: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#FEF2F2",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  balanceWarningText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#991B1B",
    textAlign: "center",
  },
  modalActions: { flexDirection: "row", gap: 12 },
  modalBtn: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
  },
  cancelBtn: { backgroundColor: "#EEE" },
  cancelBtnText: { fontFamily: Fonts.bold, fontSize: 14, color: "black" },
  confirmBtn: { backgroundColor: "#EF4444" },
  confirmBtnText: { fontFamily: Fonts.bold, fontSize: 14, color: "white" },
});
