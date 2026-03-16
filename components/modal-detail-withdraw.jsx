import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";
import { Fonts } from "../constants/fonts";
import BrumButton from "./ui/button";

const WithdrawDetailModal = ({ isVisible, onClose, data, statusStyle }) => {
  if (!data) return null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} />
      <View style={styles.modalCentered}>
        <View style={styles.detailModalContainer}>
          <View style={styles.modalShadow} />
          <View style={styles.detailModalBody}>
            {/* Header */}
            <View style={styles.detailHeader}>
              <Text style={styles.detailTitle}>DETAIL PENARIKAN</Text>
              <Pressable onPress={onClose} style={styles.closeBtn}>
                <XMarkIcon size={20} color="black" />
              </Pressable>
            </View>

            {/* Status Banner */}
            <View
              style={[
                styles.detailStatusBanner,
                { backgroundColor: statusStyle.bg },
              ]}
            >
              {statusStyle.icon}
              <Text
                style={[styles.detailStatusText, { color: statusStyle.text }]}
              >
                TRANSAKSI {data.status}
              </Text>
            </View>

            {/* Info Rows */}
            <View style={styles.infoSection}>
              <View style={styles.detailRow}>
                <Text style={styles.detailRowLabel}>Waktu</Text>
                <Text style={styles.detailRowValue}>{data.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailRowLabel}>ID Transaksi</Text>
                <Text style={styles.detailRowValue}>BRM-{data.id}9928371</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailRowLabel}>Metode</Text>
                <Text style={styles.detailRowValue}>{data.bank}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Tarik</Text>
                <Text style={styles.totalValue}>
                  Rp {data.amount.toLocaleString("id-ID")}
                </Text>
              </View>
            </View>

            <Text style={styles.detailFooterNote}>
              {data.status === "PENDING"
                ? "Mohon tunggu, tim kami sedang memverifikasi penarikanmu."
                : "Simpan bukti ini jika kamu membutuhkan bantuan lebih lanjut."}
            </Text>

            <BrumButton title="OKE, MENGERTI" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  modalCentered: { flex: 1, justifyContent: "center", padding: 25 },
  detailModalContainer: { position: "relative", width: "100%" },
  modalShadow: {
    position: "absolute",
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
    backgroundColor: "black",
    borderRadius: 16,
  },
  detailModalBody: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    padding: 20,
  },
  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  detailTitle: { fontFamily: Fonts.bold, fontSize: 16 },
  closeBtn: {
    padding: 4,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
  },
  detailStatusBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 20,
  },
  detailStatusText: { fontFamily: Fonts.bold, fontSize: 12 },
  infoSection: { marginBottom: 20 },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailRowLabel: { fontFamily: Fonts.regular, fontSize: 12, color: "#666" },
  detailRowValue: {
    fontFamily: Fonts.semibold,
    fontSize: 12,
    textAlign: "right",
    flex: 1,
    marginLeft: 20,
  },
  divider: { height: 2, backgroundColor: "#EEE", marginVertical: 15 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { fontFamily: Fonts.bold, fontSize: 14 },
  totalValue: { fontFamily: Fonts.bold, fontSize: 20 },
  detailFooterNote: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: "#999",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default WithdrawDetailModal;
