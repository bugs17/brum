import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CheckBadgeIcon, XMarkIcon } from "react-native-heroicons/solid";
import { Fonts } from "../constants/fonts";
import BrumQRCode from "./qr-code";

const BookingDetailModal = ({ isVisible, booking, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      onRequestClose={() => onClose()}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalShadow} />
          <View style={styles.modalBody}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>TIKET PENGAMBILAN</Text>
                <Text style={styles.orderId}>
                  {booking?.id || "BRM-XXXXXX"}
                </Text>
              </View>
              <Pressable onPress={onClose} style={styles.closeBtn}>
                <XMarkIcon size={20} color="black" />
              </Pressable>
            </View>

            {/* --- SCROLLABLE CONTENT --- */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
            >
              {/* --- INFO KENDARAAN --- */}
              <View style={styles.motorCard}>
                <View style={styles.motorImagePlaceholder}>
                  <Text
                    style={{ fontSize: 10, color: "#999", textAlign: "center" }}
                  >
                    FOTO MOTOR
                  </Text>
                </View>
                <View style={styles.motorInfo}>
                  <Text style={styles.motorName}>
                    {booking?.motor || "Motor Unit"}
                  </Text>
                  <View style={styles.plateBadge}>
                    <Text style={styles.plateText}>PA 1234 ABC</Text>
                  </View>
                </View>
              </View>

              {/* --- QR SECTION --- */}
              <View style={styles.qrSection}>
                <BrumQRCode value={`PICKUP-${booking?.id}`} size={180} />
                <Text style={styles.qrHint}>
                  Tunjukkan ke petugas diler untuk scan
                </Text>
              </View>

              {/* --- PAYMENT STATUS --- */}
              <View style={styles.paymentBox}>
                <View style={styles.paymentRow}>
                  <View>
                    <Text style={styles.paymentLabel}>Status Pembayaran</Text>
                    <View style={styles.statusLunas}>
                      <CheckBadgeIcon size={14} color="#10B981" />
                      <Text style={styles.lunasText}>LUNAS</Text>
                    </View>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.paymentLabel}>Total Bayar</Text>
                    <Text style={styles.paymentValue}>Rp 155.000</Text>
                  </View>
                </View>
                <Text style={styles.paymentTime}>
                  Dibayar pada: 22 Feb 2026, 14:20 WIT
                </Text>
              </View>

              <View style={styles.divider} />

              {/* --- RENT DETAIL --- */}
              <View style={styles.rentDetail}>
                <Text style={styles.detailTitle}>Rincian Sewa</Text>
                <Text style={styles.detailText}>
                  Durasi: {booking?.date || "-"}
                </Text>
                <Text style={styles.detailText}>
                  Lokasi: {booking?.location || "-"}
                </Text>
              </View>

              {/* --- IMPORTANT NOTE --- */}
              <View style={styles.noteContainer}>
                <Text style={styles.note}>
                  *Harap membawa KTP asli saat pengambilan unit untuk verifikasi
                  akhir.
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 25,
  },
  modalContainer: {
    position: "relative",
    maxHeight: "85%", // Menjaga agar modal tidak "mentok" atas bawah di layar kecil
  },
  modalShadow: {
    position: "absolute",
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
    backgroundColor: "black",
    borderRadius: 20,
  },
  modalBody: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    overflow: "hidden", // Menjaga konten tidak bocor dari radius border
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  title: { fontFamily: Fonts.semibold, fontSize: 16 },
  orderId: { fontFamily: Fonts.regular, fontSize: 12, color: "#666" },
  closeBtn: {
    padding: 4,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
  },
  scrollView: {
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 10, // Ruang ekstra di bawah agar tidak mepet
  },
  motorCard: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    marginBottom: 20,
    width: "100%",
  },
  motorImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: "#DDD",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  motorInfo: { marginLeft: 12, justifyContent: "center" },
  motorName: { fontFamily: Fonts.semibold, fontSize: 14 },
  plateBadge: {
    backgroundColor: "black",
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  plateText: { color: "white", fontFamily: Fonts.semibold, fontSize: 10 },
  qrSection: { alignItems: "center", marginBottom: 25 },
  qrHint: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: "#999",
    marginTop: 10,
  },
  paymentBox: {
    width: "100%",
    padding: 15,
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentLabel: { fontFamily: Fonts.regular, fontSize: 10, color: "#666" },
  statusLunas: { flexDirection: "row", alignItems: "center", gap: 4 },
  lunasText: { fontFamily: Fonts.semibold, fontSize: 12, color: "#059669" },
  paymentValue: { fontFamily: Fonts.semibold, fontSize: 14 },
  paymentTime: {
    fontFamily: Fonts.regular,
    fontSize: 9,
    color: "#999",
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 20,
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 1,
    width: "100%",
  },
  rentDetail: { width: "100%", marginBottom: 15 },
  detailTitle: { fontFamily: Fonts.semibold, fontSize: 13, marginBottom: 5 },
  detailText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  noteContainer: {
    width: "100%",
    marginTop: 15,
  },
  note: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: "#7f1d1d",
    backgroundColor: "#fef2f2",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fecaca",
    borderStyle: "dashed",
    textAlign: "center",
    lineHeight: 16,
  },
});

export default BookingDetailModal;
