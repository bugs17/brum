import { MotiView } from "moti";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  ArrowDownTrayIcon,
  QrCodeIcon,
  ShieldCheckIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const PaymentScreen = () => {
  const router = useSafeRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <Text style={styles.title}>PEMBAYARAN</Text>
          <Text style={styles.subtitle}>
            Selesaikan pembayaran untuk mengamankan unit motor kamu.
          </Text>
        </View>

        {/* --- QRIS CARD --- */}
        <View style={styles.qrisContainer}>
          <View style={styles.cardShadow} />
          <View style={styles.cardBody}>
            <View style={styles.qrisHeader}>
              <Text style={styles.qrisTitle}>QRIS DINAMIS</Text>
              <View style={styles.qrisBadge}>
                <Text style={styles.qrisBadgeText}>OTOMATIS CEK</Text>
              </View>
            </View>

            {/* Dummy Barcode Area */}
            <View style={styles.barcodeWrapper}>
              <View style={styles.barcodePlaceholder}>
                <QrCodeIcon size={200} color="black" />
              </View>
            </View>

            <Text style={styles.totalAmount}>Rp 150.000</Text>
            <Text style={styles.orderId}>Order ID: BRM-882910</Text>

            {/* Download Button */}
            <Pressable style={styles.downloadBtn}>
              <ArrowDownTrayIcon size={18} color="black" />
              <Text style={styles.downloadText}>DOWNLOAD QRIS</Text>
            </Pressable>
          </View>
        </View>

        {/* --- WHY QRIS? (Copywriting Keamanan) --- */}
        <View style={styles.alertBanner}>
          <ShieldCheckIcon size={24} color="black" />
          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>Kenapa Hanya QRIS?</Text>
            <Text style={styles.alertText}>
              Demi keamanan bersama, Brum hanya menggunakan QRIS sebagai metode
              pembayaran sah. Ini memastikan transaksi kamu **tercatat sistem**,
              **bebas pungli**, dan memiliki **asuransi perlindungan** selama
              masa sewa.
            </Text>
          </View>
        </View>

        {/* --- RINCIAN SEWA --- */}
        <View style={styles.detailBox}>
          <Text style={styles.detailTitle}>Rincian Sewa</Text>
          <DetailRow label="Unit" value="Yamaha NMAX Turbo" />
          <DetailRow label="Durasi" value="1 Hari" />
          <DetailRow label="Tanggal" value="22 Feb - 23 Feb" />
          <View style={styles.line} />
          <DetailRow label="Total" value="Rp 150.000" isBold />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* --- FOOTER ACTION --- */}
      <View style={styles.footer}>
        <Pressable
          onPress={() => router.replace("payment/success")}
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
                style={styles.btnBody}
              >
                <Text style={styles.btnText}>SAYA SUDAH BAYAR</Text>
              </MotiView>
            </View>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

// Sub-component Rincian
const DetailRow = ({ label, value, isBold }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={[styles.rowValue, isBold && { fontFamily: Fonts.semibold }]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  scrollContent: { padding: 25 },
  header: { marginBottom: 25 },
  title: { fontFamily: Fonts.semibold, fontSize: 24, color: "black" },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  // QRIS CARD
  qrisContainer: { position: "relative", width: "100%", marginBottom: 30 },
  cardShadow: {
    position: "absolute",
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
    backgroundColor: "black",
    borderRadius: 16,
  },
  cardBody: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  qrisHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  qrisTitle: { fontFamily: Fonts.semibold, fontSize: 16 },
  qrisBadge: {
    backgroundColor: "#BAE6FD",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "black",
  },
  qrisBadgeText: { fontSize: 10, fontFamily: Fonts.semibold },
  barcodeWrapper: {
    padding: 15,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    marginBottom: 15,
  },
  totalAmount: { fontFamily: Fonts.semibold, fontSize: 32, color: "black" },
  orderId: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#999",
    marginBottom: 20,
  },
  downloadBtn: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    padding: 12,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
  },
  downloadText: { fontFamily: Fonts.semibold, fontSize: 12 },

  // ALERT BANNER (Style Biru Muda Konsisten)
  alertBanner: {
    backgroundColor: "#BAE6FD",
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 25,
    gap: 12,
  },
  alertTitle: {
    fontFamily: Fonts.semibold,
    fontSize: 14,
    color: "black",
    marginBottom: 4,
  },
  alertText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "black",
    lineHeight: 18,
  },

  // DETAIL BOX
  detailBox: {
    padding: 20,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
  },
  detailTitle: { fontFamily: Fonts.semibold, fontSize: 16, marginBottom: 15 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rowLabel: { fontFamily: Fonts.regular, fontSize: 14, color: "#666" },
  rowValue: { fontFamily: Fonts.regular, fontSize: 14, color: "black" },
  line: { height: 2, backgroundColor: "#eee", marginVertical: 10 },

  // FOOTER
  footer: {
    padding: 20,
    borderTopWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
  },
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
});

export default PaymentScreen;
