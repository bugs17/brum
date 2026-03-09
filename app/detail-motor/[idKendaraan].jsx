import { useLocalSearchParams } from "expo-router";
import { MotiView } from "moti";
import { useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
import ModalMapsLokasiUnit from "../../components/modal-maps-lokasi-unit";
import WishlistButton from "../../components/ui/wish-list-icon";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const MotorDetailScreen = () => {
  const { idKendaraan } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useSafeRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isConfigModalVisible, setConfigModalVisible] = useState(false);

  // Fitur Baru: State untuk Modal Map
  const [isMapModalVisible, setMapModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // <--- Tambahkan ini

  const onRefresh = () => {
    setRefreshing(true);
    // Simulasi fetch data
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleBookingPress = () => {
    if (!isLoggedIn) {
      setLoginModalVisible(true);
    } else {
      setConfigModalVisible(true);
    }
  };

  const handleConfirmBooking = (data) => {
    setConfigModalVisible(false);
    router.push("/payment");
  };

  // test print params
  console.log(idKendaraan);

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
        overScrollMode="never"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            // Styling agar sesuai dengan tema Brum
            colors={["#DFF940", "black"]} // Warna spinner di Android
            tintColor="#DFF940" // Warna spinner di iOS
            progressBackgroundColor="black" // Background spinner (opsional, biar makin brutalist)
          />
        }
      >
        {/* --- IMAGE HERO --- */}
        <View style={styles.imageContainer}>
          <View style={styles.imageShadow} />
          <View style={styles.imageBody}>
            <View style={styles.imgPlaceholder}>
              <Text style={{ fontFamily: Fonts.semibold }}>IMAGE MOTOR</Text>
            </View>
          </View>
        </View>

        {/* --- INFO UTAMA & MAP TRIGGER --- */}
        <View style={styles.infoWrapper}>
          <Text style={styles.motorName}>Yamaha NMAX Turbo 2024</Text>

          {/* Section Lokasi yang bisa di klik (Neubrutalism Style) */}
          <Pressable
            onPress={() => setMapModalVisible(true)}
            style={styles.locationContainer}
          >
            {({ pressed }) => (
              <View style={{ position: "relative", flex: 1 }}>
                <View style={styles.locationShadow} />
                <MotiView
                  animate={{
                    translateX: pressed ? 2 : 0,
                    translateY: pressed ? 2 : 0,
                  }}
                  transition={{ type: "timing", duration: 50 }}
                  style={styles.locationBody}
                >
                  <MapPinIcon size={18} color="black" />
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.locationTextBold}>
                      Abepura, Jayapura
                    </Text>
                    <Text style={styles.locationSubText}>
                      Jarak: 2.5 km dari lokasimu
                    </Text>
                  </View>
                  <View style={styles.mapBadge}>
                    <Text style={styles.mapBadgeText}>LIHAT PETA</Text>
                  </View>
                </MotiView>
              </View>
            )}
          </Pressable>
        </View>

        {/* --- SPEK GRID --- */}
        <View style={styles.specGrid}>
          <SpecItem label="Mesin" value="155 CC" />
          <SpecItem label="Trans" value="Otomatis" />
          <SpecItem label="BBM" value="Pertamax" />
        </View>

        {/* --- PENYEDIA / OWNER --- */}
        <Pressable
          onPress={() => router.push(`/profil-rental/${123}`)} // Ganti dengan logic navigasi diler
          style={styles.ownerCard}
        >
          {({ pressed }) => (
            <View style={{ position: "relative" }}>
              {/* Bayangan tetap statis di belakang */}
              <View style={styles.ownerShadow} />

              {/* Body kartu yang bergerak saat ditekan */}
              <MotiView
                animate={{
                  translateX: pressed ? 4 : 0,
                  translateY: pressed ? 4 : 0,
                }}
                transition={{ type: "timing", duration: 50 }}
                style={styles.ownerBody}
              >
                <View style={styles.avatar} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.ownerLabel}>Penyedia Unit</Text>
                  <Text style={styles.ownerName}>Brum Rental Sentani</Text>
                </View>
                <View style={styles.verifiedBadge}>
                  <BoltIcon size={14} color="black" />
                </View>
              </MotiView>
            </View>
          )}
        </Pressable>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* --- MODAL MAPS DUMMY --- */}
      <ModalMapsLokasiUnit
        isMapModalVisible={isMapModalVisible}
        setMapModalVisible={setMapModalVisible}
      />

      {/* --- STICKY FOOTER --- */}
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
        unitPrice={150000}
      />
    </SafeAreaView>
  );
};

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

  // INFO & LOCATION CARD
  infoWrapper: { marginBottom: 25 },
  motorName: { fontFamily: Fonts.semibold, fontSize: 24, marginBottom: 12 },
  locationContainer: { height: 70, width: "100%" },
  locationShadow: {
    position: "absolute",
    top: 3,
    left: 3,
    right: -3,
    bottom: -3,
    backgroundColor: "black",
    borderRadius: 12,
  },
  locationBody: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "#F3F4F6",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
  },
  locationTextBold: {
    fontFamily: Fonts.semibold,
    fontSize: 14,
    color: "black",
  },
  locationSubText: { fontFamily: Fonts.regular, fontSize: 11, color: "#666" },
  mapBadge: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "black",
  },
  mapBadgeText: { fontFamily: Fonts.bold, fontSize: 9 },

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
  ownerCard: {
    marginBottom: 20,
    width: "100%",
  },
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    padding: 12,
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

  // MODAL MAPS STYLE
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 20,
  },
  mapModalContent: { position: "relative", width: "100%", height: 400 },
  modalShadowEffect: {
    position: "absolute",
    top: 8,
    left: 8,
    right: -8,
    bottom: -8,
    backgroundColor: "black",
    borderRadius: 16,
  },
  mapModalBody: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 16,
    padding: 15,
  },
  mapHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  mapTitle: { fontFamily: Fonts.bold, fontSize: 18 },
  closeMapBtn: {
    padding: 5,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
  },
  dummyMapArea: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
  },
  dummyMapText: { fontFamily: Fonts.bold, fontSize: 14, marginTop: 10 },
  dummyMapCoords: { fontFamily: Fonts.regular, fontSize: 10, color: "#666" },
  mapFooter: { marginTop: 15 },
  mapFooterText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#444",
    textAlign: "center",
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
