import { useLocalSearchParams } from "expo-router";
import { MotiView } from "moti";
import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ArrowLeftIcon,
  CheckBadgeIcon,
  ChevronLeftIcon,
  MapIcon,
  MapPinIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import ModalMapsLokasiUnit from "../../components/modal-maps-lokasi-unit";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const DealerProfileScreen = () => {
  const router = useSafeRouter();
  const [isMapModalVisible, setMapModalVisible] = useState(false);
  const { idRental } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false); // <--- Tambahkan ini

  const onRefresh = () => {
    setRefreshing(true);
    // Di sini nanti lo panggil fungsi fetch data dari database
    setTimeout(() => {
      setRefreshing(false); // Matikan loading setelah data selesai di-fetch
    }, 2000);
  };

  // Dummy Data - Nanti bisa lo lempar lewat useLocalSearchParams()
  const dealerInfo = {
    name: "Brum Rental Sentani",
    rating: 4.8,
    totalRent: "1.2k+",
    address: "Jl. Raya Sentani No. 12, Jayapura",
    isVerified: true,
    avatar: "https://via.placeholder.com/100",
    coords: { lat: -2.5916, lng: 140.5121 }, // Lokasi Sentani
  };

  const dealerInventory = [
    {
      id: "1",
      name: "Yamaha NMAX Turbo",
      price: "150.000",
      type: "Matic",
      year: 2024,
    },
    {
      id: "2",
      name: "Honda Vario 160",
      price: "135.000",
      type: "Matic",
      year: 2023,
    },
    {
      id: "3",
      name: "Kawasaki KLX 150",
      price: "180.000",
      type: "Trail",
      year: 2022,
    },
    {
      id: "4",
      name: "Honda Scoopy Prestige",
      price: "110.000",
      type: "Matic",
      year: 2024,
    },
  ];

  console.log(idRental);

  const renderHeader = () => (
    <View style={styles.profileHeader}>
      {/* Decorative Cover */}
      <View style={styles.coverRect} />

      <View style={styles.profileInfoCard}>
        <View style={styles.cardShadow} />
        <View style={styles.cardBody}>
          {/* Avatar Section */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarShadow} />
            <View style={styles.avatarBody}>
              <Image
                source={{ uri: dealerInfo.avatar }}
                style={styles.avatarImg}
              />
            </View>
          </View>

          {/* Identity Section */}
          <View style={styles.mainInfo}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Text style={styles.dealerName}>{dealerInfo.name}</Text>
              {dealerInfo.isVerified && (
                <CheckBadgeIcon size={20} color="#3B82F6" />
              )}
            </View>

            <Pressable
              onPress={() => setMapModalVisible(true)}
              style={styles.locationTag}
            >
              <MapPinIcon size={14} color="#3B82F6" />
              <Text style={styles.addressText}>{dealerInfo.address}</Text>
            </Pressable>
          </View>

          {/* Stats & Actions Row */}
          <View style={styles.statsRow}>
            <View style={styles.statGroup}>
              <View style={styles.statItem}>
                <StarIcon size={16} color="#EAB308" />
                <Text style={styles.statValue}>{dealerInfo.rating}</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{dealerInfo.totalRent}</Text>
                <Text style={styles.statLabel}>Sewa</Text>
              </View>
            </View>

            <View style={styles.actionColumn}>
              <Pressable
                onPress={() => setMapModalVisible(true)}
                style={styles.btnMaps}
              >
                <MapIcon size={18} color="black" />
                <Text style={styles.btnText}>Maps</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Armada Tersedia</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text style={styles.topBarTitle}>Profil Diler</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={dealerInventory}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        contentContainerStyle={{ paddingBottom: 40 }}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#DFF940"]} // Warna panah/garis loading (Neon Brum)
            tintColor="#DFF940" // Warna spinner di iOS
            progressBackgroundColor="black" // Background lingkaran spinner (Biar sangar!)
          />
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/detail-motor/yamaha-nmax`)}
            style={styles.motorCardContainer}
          >
            {({ pressed }) => (
              <View style={{ position: "relative" }}>
                {/* Bayangan tetap diam di belakang */}
                <View style={styles.motorShadow} />

                {/* Body kartu yang bergeser saat ditekan */}
                <MotiView
                  animate={{
                    translateX: pressed ? 4 : 0,
                    translateY: pressed ? 4 : 0,
                  }}
                  transition={{ type: "timing", duration: 50 }}
                  style={styles.motorBody}
                >
                  {/* Image Placeholder */}
                  <View style={styles.motorImgPlaceholder} />

                  <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text style={styles.motorName}>{item.name}</Text>
                    <Text style={styles.motorSub}>
                      {item.type} • {item.year}
                    </Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.priceText}>Rp {item.price}</Text>
                      <Text style={styles.dayText}>/hari</Text>
                    </View>
                  </View>

                  {/* Icon Panah Kecil sebagai petunjuk (Affordance) */}
                  <View style={styles.arrowIndicator}>
                    <ArrowLeftIcon
                      size={16}
                      color="black"
                      style={{ transform: [{ rotate: "180deg" }] }}
                    />
                  </View>
                </MotiView>
              </View>
            )}
          </Pressable>
        )}
      />

      <ModalMapsLokasiUnit
        isMapModalVisible={isMapModalVisible}
        setMapModalVisible={setMapModalVisible}
        fromDilerProfile={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },

  // Navigation
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  topBarTitle: { fontFamily: Fonts.semibold, fontSize: 16 },

  // Header & Info Card
  profileHeader: { padding: 20 },
  coverRect: {
    height: 90,
    backgroundColor: "#DFF940",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: -45,
  },

  profileInfoCard: { position: "relative", marginBottom: 30 },
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
    padding: 15,
  },

  avatarContainer: {
    width: 80,
    height: 80,
    marginTop: -45,
    alignSelf: "center",
    position: "relative",
  },
  avatarShadow: {
    position: "absolute",
    top: 3,
    left: 3,
    right: -3,
    bottom: -3,
    backgroundColor: "black",
    borderRadius: 24,
  },
  avatarBody: {
    flex: 1,
    backgroundColor: "#EEE",
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden",
  },
  avatarImg: { width: "100%", height: "100%" },

  mainInfo: { alignItems: "center", marginTop: 12, marginBottom: 20 },
  dealerName: { fontFamily: Fonts.semibold, fontSize: 20 },
  locationTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
    backgroundColor: "#F0F9FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BAE6FD",
  },
  addressText: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: "#0369A1",
    textDecorationLine: "underline",
  },

  // Stats & Action Layout
  statsRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderStyle: "dashed",
    borderColor: "#DDD",
    paddingTop: 15,
  },
  statGroup: { flex: 1, flexDirection: "row", alignItems: "center" },
  statItem: { flex: 1, alignItems: "center" },
  statValue: { fontFamily: Fonts.semibold, fontSize: 16 },
  statLabel: { fontFamily: Fonts.regular, fontSize: 10, color: "#999" },
  divider: { width: 1, height: 30, backgroundColor: "#EEE" },

  actionColumn: { flex: 1, gap: 8, paddingLeft: 10 },
  btnChat: {
    flexDirection: "row",
    height: 40,
    backgroundColor: "#DFF940",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  btnMaps: {
    flexDirection: "row",
    height: 40,
    backgroundColor: "#BAE6FD",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  btnText: { fontFamily: Fonts.semibold, fontSize: 12 },

  // Inventory List
  sectionTitle: { fontFamily: Fonts.semibold, fontSize: 22, marginBottom: 15 },
  motorCardContainer: {
    marginHorizontal: 20, // Sesuaikan dengan padding screen
    marginBottom: 22,
    position: "relative",
  },
  motorShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 12,
  },
  motorBody: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    padding: 12,
  },
  // Style baru untuk pengganti tombol "Lihat"
  arrowIndicator: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  motorImgPlaceholder: {
    width: 65,
    height: 65,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  motorName: { fontFamily: Fonts.semibold, fontSize: 16 },
  motorSub: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: "#999",
    marginBottom: 4,
  },
  priceContainer: { flexDirection: "row", alignItems: "baseline" },
  priceText: { fontFamily: Fonts.semibold, fontSize: 15, color: "black" },
  dayText: { fontFamily: Fonts.regular, fontSize: 11, color: "#666" },
  checkBtn: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  checkBtnText: { fontFamily: Fonts.semibold, fontSize: 12 },
});

export default DealerProfileScreen;
