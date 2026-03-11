import { MotiView } from "moti";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  ArrowDownTrayIcon,
  CheckBadgeIcon,
  ChevronLeftIcon,
  ClockIcon,
  XCircleIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";
// Import Skeleton yang baru dibuat
import { InvoiceDetailSkeleton } from "../../components/skeleton/detail-invoice-skeleton";

const InvoiceDetailScreen = ({ route }) => {
  const router = useSafeRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const data = {
    id: "INV-88291",
    type: "PERPANJANGAN",
    status: "LUNAS",
    date: "16 Mar 2026",
    paymentMethod: "QRIS Otomatis",
    unit: "Yamaha NMAX 155cc",
    plate: "PA 1234 AB",
    duration: "2 Hari",
    price: 300000,
    appFee: 5000,
    total: 305000,
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "LUNAS":
        return {
          color: "#BBF7D0",
          icon: <CheckBadgeIcon size={20} color="#166534" />,
          text: "Pembayaran Berhasil",
        };
      case "MENUNGGU":
        return {
          color: "#FEF08A",
          icon: <ClockIcon size={20} color="#854D0E" />,
          text: "Menunggu Pembayaran",
        };
      case "BATAL":
        return {
          color: "#FECACA",
          icon: <XCircleIcon size={20} color="#991B1B" />,
          text: "Invoice Dibatalkan",
        };
      default:
        return { color: "#EEE", icon: null, text: "" };
    }
  };

  const config = getStatusConfig(data.status);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Detail Invoice</Text>
      </View>

      <ScrollView
        overScrollMode="never"
        contentContainerStyle={styles.scrollContent}
      >
        {isLoading ? (
          <InvoiceDetailSkeleton />
        ) : (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 500 }}
          >
            {/* --- STATUS BANNER --- */}
            <View
              style={[styles.statusBanner, { backgroundColor: config.color }]}
            >
              {config.icon}
              <Text style={styles.statusBannerText}>{config.text}</Text>
            </View>

            {/* --- INFO UTAMA --- */}
            <View style={styles.sectionCard}>
              <View style={styles.cardShadow} />
              <View style={styles.cardBody}>
                <View style={styles.rowBetween}>
                  <Text style={styles.label}>Nomor Invoice</Text>
                  <Text style={styles.valueBold}>{data.id}</Text>
                </View>
                <View style={[styles.rowBetween, { marginTop: 10 }]}>
                  <Text style={styles.label}>Tanggal</Text>
                  <Text style={styles.value}>{data.date}</Text>
                </View>
                <View style={[styles.rowBetween, { marginTop: 10 }]}>
                  <Text style={styles.label}>Metode Bayar</Text>
                  <Text style={styles.value}>{data.paymentMethod}</Text>
                </View>
              </View>
            </View>

            {/* --- DETAIL ITEM --- */}
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Rincian Sewa</Text>
              <View
                style={[
                  styles.typeBadge,
                  {
                    backgroundColor:
                      data.type === "PERPANJANGAN" ? "#C7D2FE" : "#DFF940",
                  },
                ]}
              >
                <Text style={styles.typeBadgeText}>
                  {data.type.replace("_", " ")}
                </Text>
              </View>
            </View>

            <View style={styles.sectionCard}>
              <View style={styles.cardShadow} />
              <View style={styles.cardBody}>
                <Text style={styles.unitName}>{data.unit}</Text>
                <Text style={styles.unitPlate}>{data.plate}</Text>
                <View style={styles.line} />
                <View style={styles.rowBetween}>
                  <Text style={styles.label}>Durasi</Text>
                  <Text style={styles.value}>{data.duration}</Text>
                </View>
                <View style={[styles.rowBetween, { marginTop: 8 }]}>
                  <Text style={styles.label}>Biaya Sewa</Text>
                  <Text style={styles.value}>
                    Rp {data.price.toLocaleString()}
                  </Text>
                </View>
                <View style={[styles.rowBetween, { marginTop: 8 }]}>
                  <Text style={styles.label}>Biaya Aplikasi</Text>
                  <Text style={styles.value}>
                    Rp {data.appFee.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.totalDivider} />
                <View style={styles.rowBetween}>
                  <Text style={styles.totalLabel}>Total Bayar</Text>
                  <Text style={styles.totalValue}>
                    Rp {data.total.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>

            {/* --- TOMBOL AKSI --- */}
            <View style={{ gap: 15, marginTop: 10 }}>
              {data.status === "MENUNGGU" && (
                <Pressable onPress={() => alert("Ke Halaman Bayar")}>
                  <View style={styles.primaryBtnWrapper}>
                    <View style={styles.btnShadow} />
                    <View style={styles.btnBody}>
                      <Text style={styles.btnText}>BAYAR SEKARANG</Text>
                    </View>
                  </View>
                </Pressable>
              )}
              <Pressable
                style={styles.downloadBtn}
                onPress={() => alert("Mendownload PDF...")}
              >
                <ArrowDownTrayIcon size={20} color="black" />
                <Text style={styles.downloadBtnText}>DOWNLOAD PDF</Text>
              </Pressable>
            </View>
          </MotiView>
        )}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  header: { flexDirection: "row", alignItems: "center", padding: 20, gap: 15 },
  backBtn: { padding: 8, backgroundColor: "white" },
  headerTitle: { fontFamily: Fonts.bold, fontSize: 22 },
  scrollContent: { padding: 20 },
  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "black",
    gap: 10,
    marginBottom: 25,
  },
  statusBannerText: { fontFamily: Fonts.bold, fontSize: 14, color: "black" },
  sectionCard: { position: "relative", marginBottom: 25 },
  cardShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 16,
  },
  cardBody: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    padding: 16,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { fontFamily: Fonts.regular, fontSize: 13, color: "#666" },
  value: { fontFamily: Fonts.semibold, fontSize: 13, color: "black" },
  valueBold: { fontFamily: Fonts.bold, fontSize: 14, color: "black" },
  sectionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontFamily: Fonts.bold, fontSize: 16 },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "black",
  },
  typeBadgeText: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    textTransform: "uppercase",
  },
  unitName: { fontFamily: Fonts.bold, fontSize: 18, color: "black" },
  unitPlate: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  line: { height: 1, backgroundColor: "#EEE", marginVertical: 15 },
  totalDivider: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 15,
    borderStyle: "dashed",
    borderWidth: 0.5,
  },
  totalLabel: { fontFamily: Fonts.bold, fontSize: 16 },
  totalValue: { fontFamily: Fonts.bold, fontSize: 22, color: "black" },
  primaryBtnWrapper: { height: 55, position: "relative" },
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
    backgroundColor: "#DFF940",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { fontFamily: Fonts.bold, fontSize: 14 },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 55,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    backgroundColor: "white",
  },
  downloadBtnText: { fontFamily: Fonts.bold, fontSize: 14 },
});

export default InvoiceDetailScreen;
