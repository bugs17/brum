import { MotiView } from "moti";
import { useState } from "react";
import {
    FlatList,
    Linking,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    CreditCardIcon,
    InformationCircleIcon,
    TagIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const NotificationScreen = () => {
  const router = useSafeRouter();

  const [notifications] = useState([
    {
      id: "1",
      type: "transaksi",
      title: "Pembayaran Berhasil",
      desc: "Sewa motor Yamaha NMAX telah diperpanjang hingga 18 Mar 2026.",
      time: "10 Menit Lalu",
      isRead: false,
      actionType: "NAVIGATE",
      target: "active-rental", // Contoh: arahkan ke detail sewa aktif
    },
    {
      id: "2",
      type: "sistem",
      title: "Update Aplikasi v1.0.4",
      desc: "Kami baru saja memperbarui sistem pembayaran agar lebih cepat & instan.",
      time: "2 Jam Lalu",
      isRead: true,
      actionType: "EXTERNAL_URL",
      target:
        "https://play.google.com/store/apps/details?id=com.digoelsoft.brum",
    },
    {
      id: "3",
      type: "transaksi",
      title: "Tagihan Menunggu",
      desc: "Segera selesaikan pembayaran invoice #INV-88291 sebelum kedaluwarsa.",
      time: "1 Hari Lalu",
      isRead: false,
      actionType: "MODAL_QRIS",
      target: "BRUM-INV-88291", // ID Invoice untuk ditampilkan di QRIS
    },
    {
      id: "4",
      type: "promo",
      title: "Promo Jayapura Merdeka!",
      desc: "Gunakan kode 'BRUMJAYA' untuk diskon sewa 20% khusus area Jayapura.",
      time: "2 Hari Lalu",
      isRead: true,
      actionType: "STATIC", // Tidak ada aksi khusus
    },
  ]);

  // --- LOGIC HANDLER ---
  const handleNotificationPress = (item) => {
    switch (item.actionType) {
      case "NAVIGATE":
        router.push(item.target);
        break;
      case "EXTERNAL_URL":
        Linking.openURL(item.target).catch((err) =>
          console.error("Couldn't load page", err),
        );
        break;
      case "MODAL_QRIS":
        // Di sini lo bisa panggil modal QRIS seperti di screen ExtendLease
        alert(`Membuka Pembayaran QRIS untuk: ${item.target}`);
        // router.push({ pathname: 'payment-modal', params: { id: item.target } });
        break;
      default:
        console.log("Notif statis, tidak ada aksi.");
        break;
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case "transaksi":
        return <CreditCardIcon size={20} color="black" />;
      case "promo":
        return <TagIcon size={20} color="black" />;
      default:
        return <InformationCircleIcon size={20} color="black" />;
    }
  };

  const renderBgColor = (type) => {
    switch (type) {
      case "transaksi":
        return "#BAE6FD";
      case "promo":
        return "#FEF08A";
      default:
        return "#E5E7EB";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Notifikasi</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <MotiView
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ delay: index * 100 }}
            style={styles.notifWrapper}
          >
            <Pressable
              onPress={() => handleNotificationPress(item)}
              style={({ pressed }) => [
                styles.notifCard,
                pressed && { opacity: 0.8 },
              ]}
            >
              <View style={styles.cardShadow} />
              <View
                style={[styles.cardBody, !item.isRead && styles.unreadBorder]}
              >
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: renderBgColor(item.type) },
                  ]}
                >
                  {renderIcon(item.type)}
                </View>

                <View style={styles.textContent}>
                  <View style={styles.timeRow}>
                    <Text style={styles.notifType}>
                      {item.type.toUpperCase()}
                    </Text>
                    <Text style={styles.notifTime}>{item.time}</Text>
                  </View>
                  <Text style={styles.notifTitle}>{item.title}</Text>
                  <Text style={styles.notifDesc} numberOfLines={2}>
                    {item.desc}
                  </Text>
                </View>

                {/* Indikator Interaksi: Jika bukan statis, kasih icon chevron kecil */}
                {item.actionType !== "STATIC" && (
                  <View style={styles.actionIndicator}>
                    <ChevronRightIcon size={16} color="#CCC" />
                  </View>
                )}

                {!item.isRead && <View style={styles.unreadDot} />}
              </View>
            </Pressable>
          </MotiView>
        )}
      />
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
  listContent: { padding: 20 },
  notifWrapper: { marginBottom: 18 },
  notifCard: { position: "relative" },
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
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    padding: 15,
    gap: 12,
  },
  unreadBorder: { borderColor: "#DFF940", borderWidth: 2.5 },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  textContent: { flex: 1 },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  notifType: {
    fontFamily: Fonts.bold,
    fontSize: 9,
    color: "#999",
    letterSpacing: 0.5,
  },
  notifTime: { fontFamily: Fonts.regular, fontSize: 10, color: "#AAA" },
  notifTitle: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: "black",
    marginBottom: 2,
  },
  notifDesc: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
  actionIndicator: { justifyContent: "center", marginLeft: 5 },
  unreadDot: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 12,
    height: 12,
    backgroundColor: "#DFF940",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "black",
  },
});

export default NotificationScreen;
