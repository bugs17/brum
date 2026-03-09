import { useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  ChatBubbleLeftRightIcon,
  ChevronLeftIcon,
  MapIcon,
  MapPinIcon,
} from "react-native-heroicons/solid";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import PulseBadge from "../../components/ui/pulse-badge";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const NavigationMapScreen = () => {
  const router = useSafeRouter();
  const { dealerName, lat, lng, distance = "0.0" } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  // State dummy untuk simulasi chat yang belum dibaca
  // Di produksi, ini bisa diambil dari state global atau context
  const hasUnreadChat = false;

  const handleChatPress = () => {
    // Navigasi ke room chat berdasarkan ID Transaksi
    router.push("/chat/123");
  };

  return (
    <View style={styles.container}>
      {/* AREA MAPBOX (Full Screen) */}
      <View style={styles.mapProvider}>
        <View style={styles.mapPlaceholder}>
          <MapIcon size={60} color="#DDD" />
          <Text style={styles.placeholderText}>MAPBOX FULL VIEW</Text>
          <Text style={styles.coordinatesText}>
            Destinasi: {lat}, {lng}
          </Text>
          <Text style={styles.infoNote}>
            Stroke A → B akan di-render di sini
          </Text>
        </View>
      </View>

      {/* FLOATING BACK BUTTON */}
      <SafeAreaView style={styles.topOverlay} pointerEvents="box-none">
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeftIcon size={28} color="black" />
        </Pressable>
      </SafeAreaView>

      {/* BOTTOM INFO OVERLAY (Diler & Jarak) */}
      <View style={[styles.bottomOverlay, { bottom: insets.bottom + 20 }]}>
        <View style={styles.infoCardShadow} />
        <View style={styles.infoCardBody}>
          <View style={styles.dragIndicator} />

          <View style={styles.mainRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.destinationLabel}>LOKASI RENTAL</Text>
              <Text style={styles.dealerTitle}>
                {dealerName || "Brum Rental Sentani"}
              </Text>
              <View style={styles.addressRow}>
                <MapPinIcon size={14} color="#666" />
                <Text style={styles.addressText}>Sentani Kota, Jayapura</Text>
              </View>
            </View>

            {/* Tombol Chat dengan PulseBadge */}
            <Pressable onPress={handleChatPress} style={styles.chatBtn}>
              <ChatBubbleLeftRightIcon size={24} color="black" />
              {hasUnreadChat && <PulseBadge />}
            </Pressable>
          </View>

          <View style={styles.distanceRow}>
            <View style={styles.distInfo}>
              <Text style={styles.distValue}>{distance}</Text>
              <Text style={styles.distUnit}>KM DARI POSISI ANDA</Text>
            </View>

            <View style={styles.statusBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.statusText}>TRACKING AKTIF</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },

  // Map Area
  mapProvider: { ...StyleSheet.absoluteFillObject },
  mapPlaceholder: { flex: 1, justifyContent: "center", alignItems: "center" },
  placeholderText: { fontFamily: Fonts.semibold, color: "#999", marginTop: 10 },
  coordinatesText: { fontFamily: Fonts.regular, fontSize: 11, color: "#BBB" },
  infoNote: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#3B82F6",
    marginTop: 5,
  },

  // Floating Back Button
  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  backBtn: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },

  // Bottom UI
  bottomOverlay: { position: "absolute", left: 20, right: 20 },
  infoCardShadow: {
    position: "absolute",
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
    backgroundColor: "black",
    borderRadius: 20,
  },
  infoCardBody: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    padding: 20,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#EEE",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 15,
  },

  mainRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  destinationLabel: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    color: "#3B82F6",
    marginBottom: 2,
  },
  dealerTitle: { fontFamily: Fonts.bold, fontSize: 18, marginBottom: 4 },
  addressRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  addressText: { fontFamily: Fonts.regular, fontSize: 12, color: "#666" },

  chatBtn: {
    width: 54,
    height: 54,
    backgroundColor: "#DFF940",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    // Penting agar PulseBadge yang absolute bisa nempel dengan benar
    position: "relative",
  },

  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderStyle: "dashed",
    borderColor: "#EEE",
    paddingTop: 15,
  },
  distInfo: { flexDirection: "column" },
  distValue: { fontFamily: Fonts.bold, fontSize: 24, lineHeight: 28 },
  distUnit: { fontFamily: Fonts.bold, fontSize: 10, color: "#999" },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    marginRight: 6,
  },
  statusText: { fontFamily: Fonts.bold, fontSize: 10, color: "#166534" },
});

export default NavigationMapScreen;
