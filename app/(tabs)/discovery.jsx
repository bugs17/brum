import { useTabBarStore } from "@/store/tab-bar-store";
import { AnimatePresence, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  ListBulletIcon,
  MagnifyingGlassIcon,
  MapIcon,
  MapPinIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import MotorCardDiscovery, {
  DUMMY_MOTORS,
} from "../../components/ui/motor-card-discovery";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const { width, height } = Dimensions.get("window");

const DiscoveryScreen = () => {
  const [activeTab, setActiveTab] = useState("list"); // 'list' atau 'map'
  const router = useSafeRouter();
  const { setHideTabBar, resetTabBar } = useTabBarStore();

  useEffect(() => {
    if (activeTab === "map") {
      setHideTabBar(true);
    } else {
      resetTabBar();
    }
    return () => resetTabBar();
  }, [activeTab]);

  return (
    <SafeAreaView style={styles.container}>
      {/* --- HEADER & SWITCHER --- */}
      <View style={styles.header}>
        <View style={styles.switcherWrapper}>
          <View style={styles.switcherShadow} />
          <View style={styles.switcherBody}>
            {/* Tab List */}
            <Pressable
              onPress={() => setActiveTab("list")}
              style={[styles.tabItem, activeTab === "list" && styles.tabActive]}
            >
              <ListBulletIcon size={20} color="black" />
              <Text style={styles.tabText}>Cari Motor</Text>
            </Pressable>

            {/* Tab Map */}
            <Pressable
              onPress={() => setActiveTab("map")}
              style={[styles.tabItem, activeTab === "map" && styles.tabActive]}
            >
              <MapIcon size={20} color="black" />
              <Text style={styles.tabText}>Peta Diler</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* --- CONTENT AREA --- */}
      <View style={{ flex: 1 }}>
        <AnimatePresence exitBeforeEnter>
          {activeTab === "list" ? (
            <MotiView
              key="list"
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ opacity: 0, translateX: -20 }}
              style={{ flex: 1 }}
            >
              {/* Search Bar khusus List */}
              <View style={styles.searchSection}>
                <View style={styles.searchShadow} />
                <View style={styles.searchBody}>
                  <MagnifyingGlassIcon size={20} color="black" />
                  <TextInput
                    placeholder="Ketik tipe motor (ex: NMAX)..."
                    style={styles.searchInput}
                    cursorColor={"#000"}
                    selectionColor={"#dff940"}
                    placeholderTextColor={"gray"}
                  />
                </View>
              </View>

              <ScrollView
                contentContainerStyle={styles.scrollList}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.resultsText}>
                  Ditemukan 12 Motor di sekitarmu
                </Text>

                {/* Dummy Card Motor */}
                {DUMMY_MOTORS.map((motor) => (
                  <MotorCardDiscovery
                    key={motor.id}
                    item={motor}
                    onPress={() => router.push("detail-motor")}
                  />
                ))}
                <View style={{ height: 100 }} />
              </ScrollView>
            </MotiView>
          ) : (
            <MotiView
              key="map"
              from={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={styles.mapContainer}
            >
              {/* Dummy Map Placeholder */}
              <View style={styles.dummyMap}>
                {/* Garis-garis grid khas blueprint/brutalist */}
                {[...Array(10)].map((_, i) => (
                  <View
                    key={i}
                    style={[styles.gridLine, { top: i * (height / 10) }]}
                  />
                ))}

                {/* Dummy Markers */}
                <View style={[styles.marker, { top: "30%", left: "40%" }]}>
                  <View style={styles.markerShadow} />
                  <View style={styles.markerBody}>
                    <MapPinIcon size={20} color="black" />
                  </View>
                </View>

                <View style={[styles.marker, { top: "50%", left: "70%" }]}>
                  <View style={styles.markerShadow} />
                  <View style={styles.markerBody}>
                    <MapPinIcon size={20} color="black" />
                  </View>
                </View>

                <View style={styles.mapOverlay}>
                  <Text style={styles.mapHint}>
                    Google Maps akan di-render di sini
                  </Text>
                </View>
              </View>
            </MotiView>
          )}
        </AnimatePresence>
      </View>
    </SafeAreaView>
  );
};

export default DiscoveryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
  header: {
    padding: 20,
    backgroundColor: "#FDFDFD",
  },
  // SWITCHER STYLE (PILL TAB)
  switcherWrapper: {
    height: 55,
    position: "relative",
  },
  switcherShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 15,
  },
  switcherBody: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
    padding: 4,
  },
  tabItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: "#dff940",
    borderWidth: 1.5,
    borderColor: "black",
  },
  tabText: {
    fontFamily: Fonts.medium,
    fontSize: 13,
  },
  // SEARCH STYLE
  searchSection: {
    marginHorizontal: 20,
    height: 50,
    marginBottom: 15,
  },
  searchShadow: {
    position: "absolute",
    top: 3,
    left: 3,
    right: -3,
    bottom: -3,
    backgroundColor: "black",
    borderRadius: 12,
  },
  searchBody: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: Fonts.regular,
    color: "#000",
  },
  // LIST STYLE
  scrollList: {
    paddingHorizontal: 20,
  },
  resultsText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#666",
    marginBottom: 15,
  },

  // MAP DUMMY STYLE
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden",
    backgroundColor: "#BBF7D0", // Hijau mint tadi
  },
  dummyMap: {
    flex: 1,
    position: "relative",
  },
  gridLine: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  marker: {
    position: "absolute",
    width: 40,
    height: 40,
  },
  markerShadow: {
    position: "absolute",
    top: 3,
    left: 3,
    width: 40,
    height: 40,
    backgroundColor: "black",
    borderRadius: 10,
  },
  markerBody: {
    width: 40,
    height: 40,
    backgroundColor: "#dff940",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  mapOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapHint: {
    fontFamily: Fonts.button,
    backgroundColor: "black",
    color: "white",
    padding: 10,
    fontSize: 12,
  },
});
