import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  BoltIcon,
  ChevronLeftIcon,
  MapPinIcon,
} from "react-native-heroicons/solid";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import BookingConfigModal from "../../components/modal-config-booking";
import LoginModal from "../../components/modal-login";
import WishlistButton from "../../components/ui/wish-list-icon";
import { Fonts } from "../../constants/fonts";

const MotorDetailScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // DUMMY AUTH STATE
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isConfigModalVisible, setConfigModalVisible] = useState(false);

  const handleBookingPress = () => {
    if (!isLoggedIn) {
      setLoginModalVisible(true);
    } else {
      // Langsung ke proses order jika sudah login
      setConfigModalVisible(true);
    }
  };

  const handleConfirmBooking = (data) => {
    // Data berisi { duration, totalPrice }
    setConfigModalVisible(false);
    router.push("/payment");
    // Nanti lo bisa kirim data ini lewat params atau global state
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- CUSTOM HEADER --- */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn}>
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Detail Motor</Text>
        <WishlistButton />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- IMAGE HERO --- */}
        <View style={styles.imageContainer}>
          <View style={styles.imageShadow} />
          <View style={styles.imageBody}>
            {/* Placeholder Gambar Motor */}
            <View style={styles.imgPlaceholder}>
              <Text style={{ fontFamily: Fonts.semibold }}>IMAGE MOTOR</Text>
            </View>
          </View>
        </View>

        {/* --- INFO UTAMA --- */}
        <View style={styles.infoWrapper}>
          <Text style={styles.motorName}>Yamaha NMAX Turbo 2024</Text>
          <View style={styles.locationRow}>
            <MapPinIcon size={16} color="#999" />
            <Text style={styles.locationText}>Abepura, Jayapura (2.5 km)</Text>
          </View>
        </View>

        {/* --- SPEK GRID (Radius 12 & Shadow 4) --- */}
        <View style={styles.specGrid}>
          <SpecItem label="Mesin" value="155 CC" />
          <SpecItem label="Trans" value="Otomatis" />
          <SpecItem label="BBM" value="Pertamax" />
        </View>

        {/* --- PENYEDIA / OWNER --- */}
        <View style={styles.ownerCard}>
          <View style={styles.ownerShadow} />
          <View style={styles.ownerBody}>
            <View style={styles.avatar} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.ownerLabel}>Penyedia Unit</Text>
              <Text style={styles.ownerName}>Brum Rental Sentani</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <BoltIcon size={14} color="black" />
            </View>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* --- STICKY FOOTER (ACTION) --- */}
      <View style={[styles.footer, { bottom: insets.bottom }]}>
        <View style={styles.priceInfo}>
          <Text style={styles.priceLabel}>Harga Sewa</Text>
          <Text style={styles.priceValue}>
            Rp 150.000
            <Text style={{ fontSize: 12, color: "#666" }}> /hari</Text>
          </Text>
        </View>

        <Pressable
          onPress={handleBookingPress}
          style={styles.bookingBtnContainer}
        >
          {({ pressed }) => (
            <View style={{ position: "relative", flex: 1 }}>
              <View style={styles.btnShadow} />
              <MotiView
                animate={{
                  translateX: pressed ? 4 : 0,
                  translateY: pressed ? 4 : 0,
                }}
                transition={{ type: "timing", duration: 50 }}
                style={styles.btnBody}
              >
                <Text style={styles.btnText}>SEWA SEKARANG</Text>
              </MotiView>
            </View>
          )}
        </Pressable>
      </View>

      <LoginModal
        isVisible={isLoginModalVisible}
        onClose={() => setLoginModalVisible(false)}
        onLoginSuccess={() => {
          setLoginModalVisible(false);
          setIsLoggedIn(true);
          router.push("/profile-completion");
        }}
      />

      <BookingConfigModal
        isVisible={isConfigModalVisible}
        onClose={() => setConfigModalVisible(false)}
        onConfirm={handleConfirmBooking}
        unitPrice={150000} // Bisa ambil dari data motor
      />
    </SafeAreaView>
  );
};

// Reusable Spec Item
const SpecItem = ({ label, value }) => (
  <View style={styles.specBox}>
    <Text style={styles.specLabel}>{label}</Text>
    <Text style={styles.specValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 60,
  },
  headerTitle: { fontFamily: Fonts.semibold, fontSize: 16 },
  iconBtn: { padding: 8 },
  scrollContent: { padding: 20 },

  // IMAGE HERO
  imageContainer: { height: 250, width: "100%", marginBottom: 25 },
  imageShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 12,
  },
  imageBody: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    overflow: "hidden",
  },
  imgPlaceholder: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },

  // INFO
  motorName: { fontFamily: Fonts.semibold, fontSize: 24, marginBottom: 8 },
  locationRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  locationText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },

  // SPEC GRID
  specGrid: { flexDirection: "row", gap: 12, marginBottom: 25 },
  specBox: {
    flex: 1,
    padding: 12,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    backgroundColor: "#BBF7D0",
  },
  specLabel: { fontFamily: Fonts.regular, fontSize: 10, color: "#000" },
  specValue: { fontFamily: Fonts.semibold, fontSize: 13, color: "#000" },

  // OWNER CARD
  ownerCard: { height: 80, position: "relative" },
  ownerShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 12,
  },
  ownerBody: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderColor: "black",
  },
  ownerLabel: { fontFamily: Fonts.regular, fontSize: 10, color: "#999" },
  ownerName: { fontFamily: Fonts.semibold, fontSize: 14 },
  verifiedBadge: {
    width: 24,
    height: 24,
    backgroundColor: "#dff940",
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // FOOTER
  footer: {
    position: "absolute",

    width: "100%",
    backgroundColor: "white",
    borderTopWidth: 2,
    borderColor: "black",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  priceInfo: { flex: 1 },
  priceLabel: { fontFamily: Fonts.regular, fontSize: 12, color: "#666" },
  priceValue: { fontFamily: Fonts.semibold, fontSize: 18, color: "black" },

  bookingBtnContainer: { flex: 1.5, height: 50 },
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
});

export default MotorDetailScreen;
