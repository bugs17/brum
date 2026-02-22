import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";
import { Fonts } from "../constants/fonts";
import BrumQRCode from "./qr-code";

const BookingDetailModal = ({ isVisible, booking, onClose }) => {
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalShadow} />
          <View style={styles.modalBody}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
              <Text style={styles.title}>QR PENGAMBILAN</Text>
              <Pressable onPress={onClose} style={styles.closeBtn}>
                <XMarkIcon size={20} color="black" />
              </Pressable>
            </View>

            <Text style={styles.subtitle}>
              Tunjukkan QR Code ini ke petugas diler untuk serah terima kunci.
            </Text>

            {/* --- CUSTOM QR CODE BRUM --- */}
            <View style={styles.qrSection}>
              <BrumQRCode value={`BRM-PICKUP-${booking?.id}`} size={200} />
            </View>

            {/* --- INFO BOOKING --- */}
            <View style={styles.idBox}>
              <Text style={styles.idLabel}>ID BOOKING</Text>
              <Text style={styles.idValue}>{booking?.id || "BRM-XXXXXX"}</Text>
            </View>

            <Text style={styles.note}>
              Pastikan diler telah melakukan scan sebelum kamu meninggalkan
              lokasi.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 30,
  },
  modalContainer: { position: "relative" },
  modalShadow: {
    position: "absolute",
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
    backgroundColor: "black",
    borderRadius: 16,
  },
  modalBody: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { fontFamily: Fonts.semibold, fontSize: 16 },
  closeBtn: {
    padding: 4,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginBottom: 25,
  },
  qrSection: {
    marginBottom: 25,
    // Kita biarkan styling ditangani oleh BrumQRCode
  },
  idBox: {
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderColor: "#EEE",
    borderStyle: "dashed",
    width: "100%",
  },
  idLabel: { fontFamily: Fonts.regular, fontSize: 10, color: "#999" },
  idValue: { fontFamily: Fonts.semibold, fontSize: 20, color: "black" },
  note: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    textAlign: "center",
    color: "#999",
    fontStyle: "italic",
    paddingHorizontal: 10,
  },
});

export default BookingDetailModal;
