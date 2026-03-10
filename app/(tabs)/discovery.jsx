import { useTabBarStore } from "@/store/tab-bar-store";
import { AnimatePresence } from "moti";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CariMotor from "../../components/tabs-discovery/segement-cari-motor";
import PetaDiler from "../../components/tabs-discovery/segement-peta-diler";
import Segements from "../../components/tabs-discovery/segements";

const DiscoveryScreen = () => {
  const [activeTab, setActiveTab] = useState("list"); // 'list' atau 'map'
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
      <Segements activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* --- CONTENT AREA --- */}
      <View style={{ flex: 1 }}>
        <AnimatePresence exitBeforeEnter>
          {activeTab === "list" ? <CariMotor /> : <PetaDiler />}
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
});
