import { AnimatePresence, MotiView } from "moti";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  BanknotesIcon,
  MinusIcon,
  PlusIcon,
  QrCodeIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import { Fonts } from "../constants/fonts";

const BookingConfigModal = ({
  isVisible,
  onClose,
  onConfirm,
  unitPrice = 150000,
}) => {
  const [duration, setDuration] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("QRIS"); // 'QRIS' atau 'CASH'

  const APP_FEE = 10000;
  const subtotal = duration * unitPrice;
  const grandTotal = subtotal + APP_FEE;

  useEffect(() => {
    if (!isVisible) {
      setDuration(1);
      setIsProcessing(false);
      setPaymentMethod("QRIS");
    }
  }, [isVisible]);

  const handleConfirm = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onConfirm({ duration, totalPrice: grandTotal, paymentMethod });
  };

  const increment = () => setDuration((prev) => prev + 0.5);
  const decrement = () =>
    setDuration((prev) => (prev > 0.5 ? prev - 0.5 : 0.5));

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={() => onClose()}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalShadow} />

          <View style={styles.modalBody}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.modalTitle}>ATUR PESANAN</Text>
              <Pressable onPress={onClose} disabled={isProcessing}>
                <XMarkIcon size={24} color="black" />
              </Pressable>
            </View>

            {/* Durasi Picker */}
            <View style={styles.configSection}>
              <Text style={styles.label}>Mau sewa berapa lama?</Text>
              <View style={styles.counterRow}>
                <Pressable onPress={decrement} style={styles.counterBtn}>
                  <MinusIcon size={20} color="black" />
                </Pressable>

                <View style={styles.durationDisplay}>
                  <Text style={styles.durationValue}>{duration}</Text>
                  <Text style={styles.durationUnit}>Hari</Text>
                </View>

                <Pressable onPress={increment} style={styles.counterBtn}>
                  <PlusIcon size={20} color="black" />
                </Pressable>
              </View>
            </View>

            {/* --- PAYMENT METHOD SELECTION --- */}
            <View style={styles.paymentSection}>
              <Text style={styles.sectionLabel}>Metode Pembayaran</Text>
              <View style={styles.paymentContainer}>
                {/* QRIS Option */}
                <Pressable
                  onPress={() => setPaymentMethod("QRIS")}
                  style={[
                    styles.payOption,
                    paymentMethod === "QRIS" && styles.payOptionActive,
                  ]}
                >
                  <QrCodeIcon
                    size={20}
                    color={paymentMethod === "QRIS" ? "black" : "#666"}
                  />
                  <Text
                    style={[
                      styles.payText,
                      paymentMethod === "QRIS" && styles.payTextActive,
                    ]}
                  >
                    QRIS
                  </Text>
                </Pressable>

                {/* CASH Option */}
                <Pressable
                  onPress={() => setPaymentMethod("CASH")}
                  style={[
                    styles.payOption,
                    paymentMethod === "CASH" && styles.payOptionActive,
                  ]}
                >
                  <BanknotesIcon
                    size={20}
                    color={paymentMethod === "CASH" ? "black" : "#666"}
                  />
                  <Text
                    style={[
                      styles.payText,
                      paymentMethod === "CASH" && styles.payTextActive,
                    ]}
                  >
                    Tunai di Diler
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Price Summary */}
            <View style={styles.summaryBox}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Harga Sewa</Text>
                <Text style={styles.summaryValue}>
                  Rp {subtotal.toLocaleString()}
                </Text>
              </View>

              <View style={[styles.summaryRow, { marginTop: 8 }]}>
                <Text style={styles.summaryLabel}>Biaya Aplikasi</Text>
                <Text style={styles.summaryValue}>
                  Rp {APP_FEE.toLocaleString()}
                </Text>
              </View>

              <View style={styles.line} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total Bayar</Text>
                <Text style={styles.totalValue}>
                  Rp {grandTotal.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Action Button */}
            <Pressable
              onPress={handleConfirm}
              disabled={isProcessing}
              style={styles.confirmBtnContainer}
            >
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
                      isProcessing && { backgroundColor: "#ccc" },
                    ]}
                  >
                    <Text style={styles.btnText}>LANJUT PEMBAYARAN</Text>
                  </MotiView>
                </View>
              )}
            </Pressable>
          </View>

          {/* Loading Overlay */}
          <AnimatePresence>
            {isProcessing && (
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={styles.loadingOverlay}
              >
                <View style={styles.loadingCard}>
                  <ActivityIndicator size="large" color="#dff940" />
                  <Text style={styles.loadingText}>
                    Mengecek Ketersediaan...
                  </Text>
                  <Text style={styles.loadingSub}>
                    Sabar ya, Brum lagi mastiin motornya ready!
                  </Text>
                </View>
              </MotiView>
            )}
          </AnimatePresence>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.84)",
    justifyContent: "center",
    padding: 25,
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: { fontFamily: Fonts.semibold, fontSize: 18 },

  configSection: { alignItems: "center", marginBottom: 20 },
  label: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  counterRow: { flexDirection: "row", alignItems: "center", gap: 20 },
  counterBtn: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  durationDisplay: { alignItems: "center", minWidth: 80 },
  durationValue: { fontFamily: Fonts.semibold, fontSize: 32 },
  durationUnit: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#999",
    marginTop: -5,
  },

  // PAYMENT SECTION
  paymentSection: { marginBottom: 20 },
  sectionLabel: {
    fontFamily: Fonts.semibold,
    fontSize: 13,
    marginBottom: 10,
    color: "#333",
  },
  paymentContainer: { flexDirection: "row", gap: 10 },
  payOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: "#EEE",
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
  },
  payOptionActive: {
    backgroundColor: "#BAE6FD",
    borderColor: "black",
  },
  payText: { fontFamily: Fonts.regular, fontSize: 12, color: "#666" },
  payTextActive: { fontFamily: Fonts.semibold, color: "black" },

  summaryBox: {
    backgroundColor: "#F9FAFB",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: { fontFamily: Fonts.regular, fontSize: 12, color: "#666" },
  summaryValue: { fontFamily: Fonts.semibold, fontSize: 12 },
  line: {
    height: 1,
    backgroundColor: "#DDD",
    marginVertical: 10,
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 1,
  },
  totalLabel: { fontFamily: Fonts.semibold, fontSize: 14 },
  totalValue: { fontFamily: Fonts.semibold, fontSize: 18, color: "#000" },

  confirmBtnContainer: { width: "100%" },
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

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingCard: { alignItems: "center", padding: 20 },
  loadingText: { fontFamily: Fonts.semibold, fontSize: 16, marginTop: 15 },
  loadingSub: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
});

export default BookingConfigModal;
