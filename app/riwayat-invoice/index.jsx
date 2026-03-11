import { MotiView } from "moti";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DocumentTextIcon,
    ReceiptPercentIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";
// Import Skeleton
import { InvoiceListSkeleton } from "../../components/skeleton/list-invoice-skeleton";

const InvoiceListScreen = () => {
  const router = useSafeRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [invoices] = useState([
    {
      id: "INV-88291",
      date: "16 Mar 2026",
      amount: 155000,
      status: "MENUNGGU",
      item: "Perpanjangan Sewa - NMAX",
    },
    {
      id: "INV-88102",
      date: "12 Mar 2026",
      amount: 305000,
      status: "LUNAS",
      item: "Sewa Motor - Honda Vario",
    },
    {
      id: "INV-87990",
      date: "01 Mar 2026",
      amount: 455000,
      status: "LUNAS",
      item: "Sewa Motor - Yamaha XMAX",
    },
    {
      id: "INV-87552",
      date: "20 Feb 2026",
      amount: 155000,
      status: "BATAL",
      item: "Perpanjangan Sewa - Scoopy",
    },
  ]);

  const renderStatusStyle = (status) => {
    switch (status) {
      case "LUNAS":
        return { bg: "#BBF7D0", text: "#166534" };
      case "MENUNGGU":
        return { bg: "#FEF08A", text: "#854D0E" };
      case "BATAL":
        return { bg: "#FECACA", text: "#991B1B" };
      default:
        return { bg: "#E5E7EB", text: "#374151" };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backBtn,
            pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] },
          ]}
        >
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Riwayat Invoice</Text>
      </View>

      <View style={styles.listContent}>
        {isLoading ? (
          <InvoiceListSkeleton />
        ) : (
          <FlatList
            data={invoices}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            contentContainerStyle={{ paddingHorizontal: 20 }}
            renderItem={({ item, index }) => {
              const statusStyle = renderStatusStyle(item.status);
              return (
                <MotiView
                  from={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ delay: index * 100 }}
                  style={styles.invoiceWrapper}
                >
                  <Pressable
                    onPress={() => router.push(`/riwayat-invoice/${item.id}`)}
                    style={({ pressed }) => [
                      styles.invoiceCard,
                      pressed && {
                        transform: [
                          { scale: 0.98 },
                          { translateX: 2 },
                          { translateY: 2 },
                        ],
                      },
                    ]}
                  >
                    <View style={styles.cardShadow} />
                    <View style={styles.cardBody}>
                      <View style={styles.topRow}>
                        <View style={styles.idGroup}>
                          <DocumentTextIcon size={16} color="#666" />
                          <Text style={styles.invoiceId}>{item.id}</Text>
                        </View>
                        <View
                          style={[
                            styles.statusBadge,
                            { backgroundColor: statusStyle.bg },
                          ]}
                        >
                          <Text
                            style={[
                              styles.statusText,
                              { color: statusStyle.text },
                            ]}
                          >
                            {item.status}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.divider} />

                      <View style={styles.mainInfo}>
                        <View style={styles.infoLeft}>
                          <Text style={styles.itemName}>{item.item}</Text>
                          <Text style={styles.dateText}>{item.date}</Text>
                        </View>
                        <View style={styles.infoRight}>
                          <Text style={styles.amountText}>
                            Rp {item.amount.toLocaleString()}
                          </Text>
                          <ChevronRightIcon size={18} color="black" />
                        </View>
                      </View>
                    </View>
                  </Pressable>
                </MotiView>
              );
            }}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <ReceiptPercentIcon size={60} color="#DDD" />
                <Text style={styles.emptyText}>Belum ada transaksi</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  header: { flexDirection: "row", alignItems: "center", padding: 20, gap: 15 },
  backBtn: {
    padding: 8,
    backgroundColor: "white",
  },
  headerTitle: { fontFamily: Fonts.bold, fontSize: 24 },
  listContent: { flex: 1 },

  invoiceWrapper: { marginBottom: 22 },
  invoiceCard: { position: "relative" },
  cardShadow: {
    position: "absolute",
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
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
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  idGroup: { flexDirection: "row", alignItems: "center", gap: 6 },
  invoiceId: { fontFamily: Fonts.semibold, fontSize: 12, color: "#666" },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
  },
  statusText: { fontFamily: Fonts.bold, fontSize: 10 },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 12,
    borderStyle: "dashed",
    borderWidth: 0.5,
  },
  mainInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLeft: { flex: 1 },
  itemName: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: "black",
    marginBottom: 4,
  },
  dateText: { fontFamily: Fonts.regular, fontSize: 12, color: "#999" },
  infoRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  amountText: { fontFamily: Fonts.bold, fontSize: 16, color: "black" },
  emptyContainer: { alignItems: "center", marginTop: 100, gap: 15 },
  emptyText: { fontFamily: Fonts.semibold, fontSize: 14, color: "#AAA" },
});

export default InvoiceListScreen;
