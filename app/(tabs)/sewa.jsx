import { useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ArrowPathIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  MapIcon,
  MapPinIcon,
  QrCodeIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import ActiveBookingModal from "../../components/active-booking-modal";
import BookingDetailModal from "../../components/ready-booking-modal";
import CountdownTimer from "../../components/ui/count-down-timer";
import PulseBadge from "../../components/ui/pulse-badge";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const ActivityScreen = () => {
  const router = useSafeRouter();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const dummyBookings = [
    {
      id: "BRM-882910",
      motor: "Yamaha NMAX Turbo",
      date: "22 Feb - 23 Feb",
      status: "Siap Diambil",
      statusCode: "PENDING",
      location: "Brum Rental Sentani",
      returnTime: null,
      unreadChat: false,
    },
    {
      id: "BRM-882911",
      motor: "Honda Vario 160",
      date: "23 Feb - 24 Feb",
      status: "Sedang Digunakan",
      statusCode: "ACTIVE",
      location: "Brum Rental Sentani",
      returnTime: "2026-03-12T18:00:00",
      unreadChat: false,
    },
  ];

  // Fungsi Refresh Data
  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    // Simulasi Fetching Data dari Backend Brum
    // Ganti ini dengan fungsi hit API lo: await fetchMyBookings();
    console.log("Refetching data...");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setRefreshing(false);
  }, []);

  const handleChatPress = () => {
    router.push("/chat/id-transaksi-123");
  };

  const handleNavPress = () => {
    router.push("/navigasi-to-diler/id-diler-123");
  };

  const renderItem = ({ item }) => {
    const isActive = item.statusCode === "ACTIVE";

    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardShadow} />
        <Pressable
          onPress={() => setSelectedBooking(item)}
          style={styles.cardBody}
        >
          {/* Badge Status Dinamis */}
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: isActive ? "#FB923C" : "#BAE6FD" },
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>

          <Text style={styles.motorName}>{item.motor}</Text>

          <View style={styles.infoRow}>
            <CalendarDaysIcon size={16} color="#666" />
            <Text style={styles.infoText}>{item.date}</Text>
          </View>

          <View style={styles.infoRow}>
            <MapPinIcon size={16} color="#666" />
            <Text style={styles.infoText}>{item.location}</Text>
          </View>

          {/* FOOTER DINAMIS */}
          <View style={styles.footerRow}>
            {isActive ? (
              <View style={styles.activeFooter}>
                <CountdownTimer targetDate={item.returnTime} />

                <Pressable
                  onPress={() => handleChatPress(item.id)}
                  style={styles.chatBtn}
                >
                  <ChatBubbleLeftRightIcon size={20} color="black" />
                  {item.unreadChat && <PulseBadge />}
                </Pressable>
              </View>
            ) : (
              <View style={styles.pendingFooter}>
                <View style={styles.qrTrigger}>
                  <QrCodeIcon size={20} color="black" />
                  <Text style={styles.qrTriggerText}>TAP UNTUK QR PICKUP</Text>
                </View>

                <Pressable
                  onPress={() => handleNavPress(item)}
                  style={styles.navBtn}
                >
                  <MapIcon size={20} color="black" />
                </Pressable>
              </View>
            )}
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER DENGAN TOMBOL REFRESH */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>SEWA SAYA</Text>
          <Pressable
            onPress={onRefresh}
            disabled={refreshing}
            style={({ pressed }) => [
              styles.refreshBtn,
              pressed && { opacity: 0.7 },
            ]}
          >
            <ArrowPathIcon size={22} color="black" />
          </Pressable>
        </View>
      </View>

      <FlatList
        data={dummyBookings}
        contentContainerStyle={{ padding: 20 }}
        keyExtractor={(item) => item.id}
        overScrollMode="never"
        renderItem={renderItem}
        // INTEGRASI PULL TO REFRESH
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#DFF940", "black"]} // Warna spinner di Android
            tintColor="#DFF940" // Warna spinner di iOS
            progressBackgroundColor="black" // Background spinner (opsional, biar makin brutalist)
          />
        }
      />

      {/* Modal 1: Jika status PENDING (Belum diambil) */}
      <BookingDetailModal
        isVisible={
          !!selectedBooking && selectedBooking.statusCode === "PENDING"
        }
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />

      {/* Modal 2: Jika status ACTIVE (Sedang digunakan) */}
      <ActiveBookingModal
        isVisible={!!selectedBooking && selectedBooking.statusCode === "ACTIVE"}
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  header: { paddingHorizontal: 20, paddingTop: 10, marginBottom: 10 },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontFamily: Fonts.semibold, fontSize: 24 },
  refreshBtn: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
  },

  cardContainer: { position: "relative", marginBottom: 25 },
  cardShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 12,
  },
  cardBody: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    padding: 15,
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "black",
    marginBottom: 10,
  },
  statusText: { fontFamily: Fonts.semibold, fontSize: 10 },

  motorName: { fontFamily: Fonts.semibold, fontSize: 18, marginBottom: 10 },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  infoText: { fontFamily: Fonts.regular, fontSize: 13, color: "#666" },

  footerRow: {
    marginTop: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderStyle: "dashed",
    borderColor: "#CCC",
  },

  pendingFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qrTrigger: { flexDirection: "row", alignItems: "center", gap: 8 },
  qrTriggerText: { fontFamily: Fonts.semibold, fontSize: 12 },

  activeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countdownBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  countdownText: { fontFamily: Fonts.semibold, fontSize: 14, color: "black" },

  chatBtn: {
    width: 40,
    height: 40,
    backgroundColor: "#DFF940",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },

  navBtn: {
    width: 40,
    height: 40,
    backgroundColor: "#BAE6FD",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
});

export default ActivityScreen;
