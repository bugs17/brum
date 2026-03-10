import { useLocalSearchParams } from "expo-router";
import { MotiView } from "moti";
import { useEffect, useState } from "react";
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

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Simulasi Load Data agar Skeleton terlihat
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const dealerInfo = {
    name: "Brum Rental Sentani",
    rating: 4.8,
    totalRent: "1.2k+",
    address: "Jl. Raya Sentani No. 12, Jayapura",
    isVerified: true,
    avatar: "https://via.placeholder.com/100",
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

  const renderHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.coverRect} />
      <View style={styles.profileInfoCard}>
        <View style={styles.cardShadow} />
        <View style={styles.cardBody}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarShadow} />
            <View style={styles.avatarBody}>
              <Image
                source={{ uri: dealerInfo.avatar }}
                style={styles.avatarImg}
              />
            </View>
          </View>

          <View style={styles.mainInfo}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Text style={styles.dealerName}>{dealerInfo.name}</Text>
              {dealerInfo.isVerified && (
                <CheckBadgeIcon size={20} color="#3B82F6" />
              )}
            </View>
            <View style={styles.locationTag}>
              <MapPinIcon size={14} color="#0369A1" />
              <Text style={styles.addressText}>{dealerInfo.address}</Text>
            </View>
          </View>

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
          </View>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Armada Tersedia</Text>
    </View>
  );

  const renderSkeletonItem = () => (
    <View style={styles.motorCardContainer}>
      <View style={{ position: "relative" }}>
        <View style={[styles.motorShadow, { backgroundColor: "#EEE" }]} />
        <MotiView
          from={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 1000, loop: true }}
          style={[styles.motorBody, { borderColor: "#EEE" }]}
        >
          <View
            style={[
              styles.motorImgPlaceholder,
              { backgroundColor: "#E5E5E5", borderColor: "#EEE" },
            ]}
          />
          <View style={{ flex: 1, marginLeft: 15 }}>
            <View
              style={[
                styles.skeletonBar,
                { width: "70%", height: 16, marginBottom: 8 },
              ]}
            />
            <View
              style={[
                styles.skeletonBar,
                { width: "40%", height: 12, marginBottom: 10 },
              ]}
            />
            <View style={[styles.skeletonBar, { width: "50%", height: 15 }]} />
          </View>
          <View
            style={[
              styles.arrowIndicator,
              { backgroundColor: "#F9F9F9", borderColor: "#EEE" },
            ]}
          />
        </MotiView>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation - Maps di pojok kanan agar statis */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text style={styles.topBarTitle}>Profil Diler</Text>
        <Pressable
          onPress={() => setMapModalVisible(true)}
          style={styles.mapHeaderBtn}
        >
          <MapIcon size={22} color="black" />
        </Pressable>
      </View>

      <FlatList
        data={isLoading ? [1, 2, 3, 4] : dealerInventory}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        contentContainerStyle={{ paddingBottom: 40 }}
        keyExtractor={(item, index) => (isLoading ? `skel-${index}` : item.id)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#DFF940"]}
            tintColor="#DFF940"
            progressBackgroundColor="black"
          />
        }
        renderItem={({ item }) =>
          isLoading ? (
            renderSkeletonItem()
          ) : (
            <Pressable
              onPress={() => router.push(`/detail-motor/yamaha-nmax`)}
              style={styles.motorCardContainer}
            >
              {({ pressed }) => (
                <View style={{ position: "relative" }}>
                  <View style={styles.motorShadow} />
                  <MotiView
                    animate={{
                      translateX: pressed ? 4 : 0,
                      translateY: pressed ? 4 : 0,
                    }}
                    transition={{ type: "timing", duration: 50 }}
                    style={styles.motorBody}
                  >
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
          )
        }
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
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  mapHeaderBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  topBarTitle: { fontFamily: Fonts.semibold, fontSize: 16 },

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

  sectionTitle: { fontFamily: Fonts.semibold, fontSize: 22, marginBottom: 15 },
  motorCardContainer: { marginHorizontal: 20, marginBottom: 22 },
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
  motorImgPlaceholder: {
    width: 65,
    height: 65,
    borderRadius: 10,
    borderWidth: 1,
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

  // Skeleton Specific Styles
  skeletonBar: { backgroundColor: "#F0F0F0", borderRadius: 4 },
});

export default DealerProfileScreen;
