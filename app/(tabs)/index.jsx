import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BellIcon, MapPinIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import BrumCategoryCard from "../../components/ui/category-button";
import BrumHeroBanner from "../../components/ui/hero-baner";
import BrumSearchTrigger from "../../components/ui/search-button";
import { Fonts } from "../../constants/fonts";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Halo, Pengendara! 🛵</Text>
            <Text style={styles.subGreeting}>Mau cari motor apa hari ini?</Text>
          </View>
          <Pressable style={styles.iconButton}>
            <BellIcon size={24} color="black" />
          </Pressable>
        </View>

        {/* --- SEARCH BAR --- */}
        <View style={{ paddingHorizontal: 20 }}>
          <BrumSearchTrigger onPress={() => {}} />
        </View>

        {/* --- PROMO BANNER --- */}
        <BrumHeroBanner isVerified={true} isLoggedIn={true} />

        {/* --- CATEGORIES --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Kategori</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.catScroll}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {["Sport", "Matic", "Bebek", "Listrik"].map((item, index) => (
            <BrumCategoryCard
              key={index}
              title={item}
              onPress={() => console.log(item)}
            />
          ))}
        </ScrollView>

        {/* --- POPULAR MOTOR --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Motor Terpopuler</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        {/* Card Motor */}
        <View style={{ paddingHorizontal: 20 }}>
          {[1, 2].map((item) => (
            <View key={item} style={styles.motorCard}>
              <View style={styles.motorShadow} />
              <View style={styles.motorBody}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=400&auto=format&fit=crop",
                  }}
                  style={styles.motorImage}
                />
                <View style={styles.motorInfo}>
                  <Text style={styles.motorName}>
                    Vario 160 CC Black Edition
                  </Text>
                  <View style={styles.locationRow}>
                    <MapPinIcon size={14} color="#666" />
                    <Text style={styles.locationText}>
                      Diler Menteng, Jakarta Pusat
                    </Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceText}>Rp 29.500.000</Text>
                    <TouchableOpacity style={styles.bookButton}>
                      <Text style={styles.bookButtonText}>CEK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Spacer untuk Floating Tabbar */}
        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 22,
    fontFamily: Fonts.c_bold, // IBM Plex Mono
    color: "#000",
  },
  subGreeting: {
    fontSize: 14,
    fontFamily: Fonts.medium, // Comfortaa
    color: "#666",
    marginTop: 4,
  },
  iconButton: {
    padding: 10,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    backgroundColor: "white",
  },
  // BANNER STYLE
  bannerContainer: {
    height: 120,
    marginBottom: 30,
  },
  bannerShadow: {
    position: "absolute",
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
    backgroundColor: "black",
    borderRadius: 16,
  },
  bannerBody: {
    flex: 1,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 18,
    fontFamily: Fonts.button,
    marginBottom: 5,
  },
  bannerDesc: {
    fontSize: 12,
    fontFamily: Fonts.copywriting,
    lineHeight: 18,
  },
  badge: {
    backgroundColor: "black",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: "#dff940",
    fontFamily: Fonts.button,
    fontSize: 12,
  },
  // SECTION
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.c_semibold,
  },
  seeAll: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#666",
    textDecorationLine: "underline",
  },
  // CATEGORY
  catScroll: {
    marginBottom: 25,
    paddingVertical: 5,
  },
  catItem: {
    width: 90,
    height: 45,
    marginRight: 15,
  },
  catShadow: {
    position: "absolute",
    top: 3,
    left: 3,
    right: -3,
    bottom: -3,
    backgroundColor: "black",
    borderRadius: 10,
  },
  catBody: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  catText: {
    fontFamily: Fonts.button,
    fontSize: 12,
  },
  // MOTOR CARD
  motorCard: {
    height: 280,
    marginBottom: 25,
  },
  motorShadow: {
    position: "absolute",
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
    backgroundColor: "black",
    borderRadius: 20,
  },
  motorBody: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    overflow: "hidden",
  },
  motorImage: {
    width: "100%",
    height: 150,
    borderBottomWidth: 2,
    borderColor: "black",
  },
  motorInfo: {
    padding: 15,
  },
  motorName: {
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  locationText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: "#666",
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  priceText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: "#000",
  },
  bookButton: {
    backgroundColor: "#dff940",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "black",
  },
  bookButtonText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
  },
});
