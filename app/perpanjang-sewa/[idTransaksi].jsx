import { MotiView } from "moti";
import { useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {
    ArrowDownTrayIcon,
    ChevronLeftIcon,
    MinusIcon,
    PlusIcon,
    QrCodeIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import CountdownTimer from "../../components/ui/count-down-timer";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const ExtendLeaseScreen = () => {
  const router = useSafeRouter();
  const [duration, setDuration] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- HARGA & KALKULASI ---
  const UNIT_PRICE = 150000;
  const APP_FEE = 5000;
  const subtotal = duration * UNIT_PRICE;
  const grandTotal = subtotal + APP_FEE;

  // --- MOCK DATA ---
  const dumyData = {
    qrisUrl:
      "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=BRUM-EXTEND-12345",
    expiryTime: new Date(new Date().getTime() + 15 * 60000).toISOString(),
    total: grandTotal,
  };

  // --- STATE ---
  // Default set ke null untuk testing Config View, atau isi objek untuk testing Payment View
  const [paymentData, setPaymentData] = useState(null);

  // --- HANDLERS ---
  const handleCreateInvoice = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setPaymentData(dumyData);
    setIsProcessing(false);
  };

  const handleCancelPayment = () => {
    setPaymentData(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>
          {paymentData ? "PEMBAYARAN QRIS" : "PERPANJANG SEWA"}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!paymentData ? (
          /* --- STATE 1: CONFIG VIEW --- */
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key="config-view"
          >
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Sewa Saat Ini Berakhir:</Text>
              <Text style={styles.infoValue}>
                Senin, 16 Mar 2026 (18:00 WIT)
              </Text>
            </View>

            <View style={styles.configSection}>
              <Text style={styles.sectionLabel}>
                Mau perpanjang berapa lama?
              </Text>
              <View style={styles.counterRow}>
                <Pressable
                  onPress={() => setDuration((d) => (d > 0.5 ? d - 0.5 : 0.5))}
                  style={styles.counterBtn}
                >
                  <MinusIcon size={24} color="black" />
                </Pressable>
                <View style={styles.durationDisplay}>
                  <Text style={styles.durationValue}>{duration}</Text>
                  <Text style={styles.durationUnit}>Hari</Text>
                </View>
                <Pressable
                  onPress={() => setDuration((d) => d + 0.5)}
                  style={styles.counterBtn}
                >
                  <PlusIcon size={24} color="black" />
                </Pressable>
              </View>
            </View>

            <View style={styles.paymentSection}>
              <Text style={styles.sectionLabel}>Metode Pembayaran</Text>
              <View style={styles.qrisOnlyBox}>
                <QrCodeIcon size={22} color="black" />
                <View>
                  <Text style={styles.qrisTitle}>QRIS Otomatis</Text>
                  <Text style={styles.qrisSub}>
                    Verifikasi instan & otomatis
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.summaryBox}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Biaya Perpanjangan</Text>
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
          </MotiView>
        ) : (
          /* --- STATE 2: PAYMENT VIEW (QR CODE) --- */
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            key="payment-view"
          >
            <View style={styles.timerContainer}>
              <Text style={styles.timerLabel}>
                Selesaikan pembayaran dalam:
              </Text>
              <CountdownTimer targetDate={paymentData.expiryTime} />
            </View>

            <View style={styles.qrisDisplayContainer}>
              <View style={styles.qrisShadow} />
              <View style={styles.qrisCard}>
                <Image
                  source={{ uri: paymentData.qrisUrl }}
                  style={styles.qrImage}
                  resizeMode="contain"
                />
                <Text style={styles.totalAmountText}>
                  Rp {(paymentData?.total || 0).toLocaleString()}
                </Text>
              </View>
            </View>

            <Pressable
              style={styles.downloadBtn}
              onPress={() => alert("Menyimpan ke galeri...")}
            >
              <ArrowDownTrayIcon size={20} color="black" />
              <Text style={styles.downloadText}>SIMPAN QR KE GALERI</Text>
            </Pressable>

            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                Silahkan scan QRIS di atas menggunakan aplikasi m-banking atau
                e-wallet Anda.
              </Text>
            </View>
          </MotiView>
        )}
      </ScrollView>

      {/* --- FOOTER ACTIONS --- */}
      <View style={styles.footer}>
        {!paymentData ? (
          <Pressable onPress={handleCreateInvoice} disabled={isProcessing}>
            {({ pressed }) => (
              <View style={styles.actionBtnWrapper}>
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
                  {isProcessing ? (
                    <ActivityIndicator color="black" />
                  ) : (
                    <Text style={styles.btnText}>
                      BAYAR PERPANJANGAN SEKARANG
                    </Text>
                  )}
                </MotiView>
              </View>
            )}
          </Pressable>
        ) : (
          <View style={{ gap: 12 }}>
            <Pressable onPress={() => alert("Mengecek status pembayaran...")}>
              {({ pressed }) => (
                <View style={styles.actionBtnWrapper}>
                  <View style={styles.btnShadow} />
                  <MotiView
                    animate={{
                      translateX: pressed ? 4 : 0,
                      translateY: pressed ? 4 : 0,
                    }}
                    transition={{ type: "timing", duration: 50 }}
                    style={[styles.btnBody, { backgroundColor: "#BAE6FD" }]}
                  >
                    <Text style={styles.btnText}>SAYA SUDAH BAYAR</Text>
                  </MotiView>
                </View>
              )}
            </Pressable>

            <Pressable onPress={handleCancelPayment}>
              <Text style={styles.cancelText}>Batalkan Perpanjangan</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 15,
  },
  backBtn: { padding: 8, backgroundColor: "white" },
  headerTitle: { fontFamily: Fonts.semibold, fontSize: 18 },
  scrollContent: { padding: 20 },

  infoCard: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
  },
  infoLabel: { fontFamily: Fonts.regular, fontSize: 12, color: "#AAA" },
  infoValue: {
    fontFamily: Fonts.semibold,
    fontSize: 14,
    color: "#DFF940",
    marginTop: 4,
  },
  configSection: { alignItems: "center", marginBottom: 30 },
  sectionLabel: {
    fontFamily: Fonts.semibold,
    fontSize: 14,
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  counterRow: { flexDirection: "row", alignItems: "center", gap: 30 },
  counterBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  durationDisplay: { alignItems: "center", minWidth: 100 },
  durationValue: { fontFamily: Fonts.semibold, fontSize: 42 },
  durationUnit: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#999",
    marginTop: -5,
  },
  paymentSection: { marginBottom: 30 },
  qrisOnlyBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    backgroundColor: "#BAE6FD",
    gap: 12,
  },
  qrisTitle: { fontFamily: Fonts.semibold, fontSize: 14 },
  qrisSub: { fontFamily: Fonts.regular, fontSize: 11, color: "#444" },
  summaryBox: {
    backgroundColor: "#F9FAFB",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    padding: 15,
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
    marginVertical: 12,
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 1,
  },
  totalLabel: { fontFamily: Fonts.semibold, fontSize: 14 },
  totalValue: { fontFamily: Fonts.semibold, fontSize: 20 },

  timerContainer: { alignItems: "center", marginBottom: 25 },
  timerLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  qrisDisplayContainer: {
    alignSelf: "center",
    position: "relative",
    width: 260,
    height: 320,
    marginBottom: 20,
  },
  qrisShadow: {
    position: "absolute",
    top: 8,
    left: 8,
    right: -8,
    bottom: -8,
    backgroundColor: "black",
    borderRadius: 20,
  },
  qrisCard: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  qrImage: { width: "100%", height: 200 },
  totalAmountText: { fontFamily: Fonts.semibold, fontSize: 20, marginTop: 15 },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 12,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
  },
  downloadText: { fontFamily: Fonts.semibold, fontSize: 12 },
  warningBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#FFFBEB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FEF3C7",
  },
  warningText: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: "#92400E",
    textAlign: "center",
    lineHeight: 16,
  },

  footer: { padding: 20, borderTopWidth: 1, borderColor: "#EEE" },
  actionBtnWrapper: { position: "relative", height: 55 },
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
  btnText: { fontFamily: Fonts.semibold, fontSize: 14, color: "black" },
  cancelText: {
    textAlign: "center",
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: "#EF4444",
    marginTop: 5,
  },
});

export default ExtendLeaseScreen;
