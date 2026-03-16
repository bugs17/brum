import { MotiView } from "moti";
import { useCallback, useEffect, useState } from "react";
import {
    FlatList,
    Pressable,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {
    CheckCircleIcon,
    ChevronLeftIcon,
    ClockIcon,
    InboxIcon,
    XCircleIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import WithdrawDetailModal from "../../components/modal-detail.withdraw";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const WithdrawHistory = () => {
  const router = useSafeRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setShowDetail(true);
  };

  const fetchData = (isRefreshing = false) => {
    if (!isRefreshing) setLoading(true);

    setTimeout(() => {
      const data = [
        {
          id: "1",
          amount: 125000,
          date: "16 Mar 2026, 14:20",
          status: "PENDING",
          bank: "BCA - Alex ***",
        },
        {
          id: "2",
          amount: 50000,
          date: "12 Mar 2026, 09:15",
          status: "SUCCESS",
          bank: "BNI - Alex ***",
        },
        {
          id: "3",
          amount: 1000000,
          date: "05 Mar 2026, 18:45",
          status: "FAILED",
          bank: "BCA - Alex ***",
        },
      ];
      setHistoryData(data);
      setLoading(false);
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(true);
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "SUCCESS":
        return {
          bg: "#CCFBF1",
          text: "#14B8A6",
          icon: <CheckCircleIcon size={16} color="#14B8A6" />,
        };
      case "FAILED":
        return {
          bg: "#FEE2E2",
          text: "#EF4444",
          icon: <XCircleIcon size={16} color="#EF4444" />,
        };
      default:
        return {
          bg: "#FEF9C3",
          text: "#CA8A04",
          icon: <ClockIcon size={16} color="#CA8A04" />,
        };
    }
  };

  const SkeletonItem = ({ index }) => (
    <View style={styles.cardWrapper}>
      {/* Menambahkan kembali bayangan hitam khas Brum */}
      <View style={styles.cardShadow} />

      <View
        style={[
          styles.cardBody,
          { backgroundColor: "white", borderColor: "#DDD", borderWidth: 2 },
        ]}
      >
        <View style={styles.cardHeader}>
          {/* Status Badge Skeleton */}
          <MotiView
            from={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              loop: true,
              type: "timing",
              duration: 800,
              delay: index * 100,
            }}
            style={styles.skeletonStatus}
          />
          {/* Date Skeleton */}
          <MotiView
            from={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              loop: true,
              type: "timing",
              duration: 800,
              delay: index * 100 + 100,
            }}
            style={styles.skeletonDate}
          />
        </View>

        <View style={[styles.cardMain, { marginTop: 10 }]}>
          <View style={{ gap: 8 }}>
            {/* Bank Info Skeleton */}
            <MotiView
              from={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{
                loop: true,
                type: "timing",
                duration: 800,
                delay: index * 100 + 200,
              }}
              style={styles.skeletonBank}
            />
            {/* Amount Skeleton */}
            <MotiView
              from={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{
                loop: true,
                type: "timing",
                duration: 800,
                delay: index * 100 + 300,
              }}
              style={styles.skeletonAmount}
            />
          </View>
        </View>
      </View>
    </View>
  );

  const EmptyState = () => (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 0.6, scale: 1 }}
      style={styles.emptyContainer}
    >
      <View style={styles.emptyIconCircle}>
        <InboxIcon size={50} color="#999" />
      </View>
      <Text style={[styles.emptyTitle, { color: "#666" }]}>
        Belum ada riwayat
      </Text>
      <Text style={[styles.emptySubtitle, { color: "#999" }]}>
        Transaksi penarikan saldomu bakal muncul di sini nanti.
      </Text>
    </MotiView>
  );

  const renderItem = ({ item, index }) => {
    const style = getStatusStyle(item.status);
    return (
      <Pressable
        onPress={() => handleOpenDetail(item)}
        style={styles.cardWrapper}
      >
        {({ pressed }) => (
          /* SATU MOTIVIEW UNTUK SEMUA: Shadow dan Body muncul bareng */
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{
              opacity: 1,
              // Jika ditekan, seluruh unit kartu bergeser ke arah bayangan
              translateY: pressed ? 4 : 0,
              translateX: pressed ? 4 : 0,
            }}
            transition={{
              // Delay hanya untuk animasi masuk (mount), bukan pas ditekan
              delay: pressed ? 0 : index * 100,
              type: "timing",
              duration: 250,
            }}
            style={{ flex: 1 }}
          >
            {/* Bayangan Hitam */}
            <View style={styles.cardShadow} />

            {/* Isi Kartu */}
            <View style={styles.cardBody}>
              <View style={styles.cardHeader}>
                <View
                  style={[styles.statusBadge, { backgroundColor: style.bg }]}
                >
                  {style.icon}
                  <Text style={[styles.statusText, { color: style.text }]}>
                    {item.status}
                  </Text>
                </View>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>

              <View style={styles.cardMain}>
                <View>
                  <Text style={styles.bankText}>{item.bank}</Text>
                  <Text style={styles.amountText}>
                    Rp {item.amount.toLocaleString("id-ID")}
                  </Text>
                </View>
                <ChevronLeftIcon
                  size={20}
                  color="#CCC"
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
              </View>
            </View>
          </MotiView>
        )}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Riwayat Tarik Saldo</Text>
        <View style={{ width: 45 }} />
      </View>

      <FlatList
        data={loading ? [1, 2, 3, 4] : historyData}
        keyExtractor={(item, index) =>
          loading ? `skeleton-${index}` : item.id
        }
        renderItem={
          loading ? ({ index }) => <SkeletonItem index={index} /> : renderItem
        }
        contentContainerStyle={[
          styles.listContent,
          historyData.length === 0 && !loading && { flex: 1 },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#DFF940"]}
            tintColor="#DFF940"
            progressBackgroundColor="black"
          />
        }
        ListEmptyComponent={!loading && EmptyState}
      />

      {/* TEMPAT MODAL DETAIL */}
      <WithdrawDetailModal
        isVisible={showDetail}
        onClose={() => setShowDetail(false)}
        data={selectedItem}
        statusStyle={selectedItem ? getStatusStyle(selectedItem.status) : {}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  backBtn: {
    padding: 10,
    backgroundColor: "white",
  },
  headerTitle: { fontFamily: Fonts.bold, fontSize: 20 },
  listContent: { padding: 25, paddingBottom: 50 },

  skeletonStatus: {
    width: 80,
    height: 24,
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  skeletonDate: {
    width: 100,
    height: 14,
    backgroundColor: "#E5E5E5",
    borderRadius: 4,
  },
  skeletonBank: {
    width: 120,
    height: 14,
    backgroundColor: "#E5E5E5",
    borderRadius: 4,
  },
  skeletonAmount: {
    width: 160,
    height: 26,
    backgroundColor: "#E5E5E5",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  // CARD STYLES
  cardWrapper: { marginBottom: 20, height: 115, position: "relative" },
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
    flex: 1,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    padding: 15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
  },
  statusText: { fontFamily: Fonts.bold, fontSize: 10 },
  dateText: { fontFamily: Fonts.regular, fontSize: 11, color: "#999" },
  cardMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bankText: { fontFamily: Fonts.regular, fontSize: 12, color: "#666" },
  amountText: { fontFamily: Fonts.bold, fontSize: 18, color: "black" },

  // EMPTY STATE STYLES
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    backgroundColor: "#F3F4F6",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#CCC",
    marginBottom: 20,
  },
  emptyTitle: { fontFamily: Fonts.bold, fontSize: 18, marginBottom: 8 },
  emptySubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 40,
  },
});

export default WithdrawHistory;
