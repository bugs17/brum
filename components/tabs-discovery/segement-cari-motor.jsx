import { MotiView } from "moti";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import MotorCardSkeleton from "../../components/skeleton/list-motor-skeleton";
import MotorCardDiscovery, {
  DUMMY_MOTORS,
} from "../../components/ui/motor-card-discovery";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const CariMotor = () => {
  const router = useSafeRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi untuk simulasi fetch data
  const fetchData = (isInitial = true) => {
    if (isInitial) setIsLoading(true);

    // Simulasi delay fetch data dari Supabase/API
    setTimeout(() => {
      setIsLoading(false);
      setIsRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    fetchData(true);
  }, []);

  // Fungsi Pull to Refresh
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchData(false); // Ambil data ulang tanpa mengaktifkan skeleton utama (opsional)
  }, []);

  const filteredMotors = DUMMY_MOTORS.filter((motor) =>
    motor.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <MotiView
      key="list"
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -20 }}
      style={{ flex: 1 }}
    >
      {/* STICKY SEARCH BAR */}
      <View style={styles.stickyHeader}>
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
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </View>

      <FlatList
        data={isLoading ? [1, 2, 3, 4] : filteredMotors}
        keyExtractor={(item, index) =>
          isLoading ? `skeleton-${index}` : item.id.toString()
        }
        renderItem={({ item }) =>
          isLoading ? (
            <MotorCardSkeleton />
          ) : (
            <MotorCardDiscovery
              item={item}
              onPress={() => router.push("detail-motor")}
            />
          )
        }
        ListHeaderComponent={
          <Text style={styles.resultsText}>
            {isLoading
              ? "Mencari motor..."
              : `Ditemukan ${filteredMotors.length} Motor di sekitarmu`}
          </Text>
        }
        contentContainerStyle={styles.scrollList}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        ListFooterComponent={<View style={{ height: 100 }} />}
        // INTEGRASI REFRESH CONTROL
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={["#dff940"]} // Warna panah (Android)
            tintColor={"#dff940"} // Warna spinner (iOS)
            progressBackgroundColor={"#000"} // Warna background spinner (Android) - Seragamkan dengan tema Brum
          />
        }
      />
    </MotiView>
  );
};

export default CariMotor;

const styles = StyleSheet.create({
  stickyHeader: {
    paddingHorizontal: 20,
    backgroundColor: "#FDFDFD",
    zIndex: 10,
    paddingTop: 10,
  },
  searchSection: {
    height: 50,
    marginBottom: 20,
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
  scrollList: {
    paddingHorizontal: 20,
  },
  resultsText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#666",
    marginBottom: 15,
  },
});
