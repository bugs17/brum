import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


import {
  HomeIcon as HomeOutline,
  MapPinIcon as MapPinIconOutline,
  TicketIcon as TicketOutline,
  UserIcon as UserOutline,
} from "react-native-heroicons/outline";
import {
  HomeIcon as HomeSolid,
  MapPinIcon as MapPinIconSolid,
  TicketIcon as TicketSolid,
  UserIcon as UserSolid,
} from "react-native-heroicons/solid";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const TAB_BAR_HEIGHT = 65;

  // --- LOGIKA AUTH & ORDER ---
  // Nantinya ini diambil dari Global State (Zustand/Context/Supabase)
  const isAuthenticated = true; // Ganti dengan logic auth asli
  const hasActiveOrder = true; // Ganti dengan logic cek database order

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarItemStyle: {
          height: TAB_BAR_HEIGHT,
          paddingVertical: 0,
          marginVertical: 0,
        },
        tabBarStyle: {
          position: "absolute",
          bottom: insets.bottom + 20,
          marginHorizontal: 50,
          backgroundColor: "#FFFFFF",
          height: TAB_BAR_HEIGHT,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: "#000",
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 2,
          paddingTop: 0,
          paddingBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused ? styles.activeContainer : styles.inactiveContainer
              }
            >
              {focused ? (
                <HomeSolid size={24} color="#000" />
              ) : (
                <HomeOutline size={24} color="#000" />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="discovery"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused ? styles.activeContainer : styles.inactiveContainer
              }
            >
              {focused ? (
                <MapPinIconSolid size={24} color="#000" />
              ) : (
                <MapPinIconOutline size={24} color="#000" />
              )}
            </View>
          ),
        }}
      />

      {/* --- TAB SEWA (CONDITIONAL) --- */}
      <Tabs.Screen
        name="sewa"
        options={{
          // Jika tidak login ATAU tidak ada order, tab ini hilang dari bar
          href: isAuthenticated && hasActiveOrder ? "/sewa" : null,
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused ? styles.activeContainer : styles.inactiveContainer
              }
            >
              {focused ? (
                <TicketSolid size={24} color="#000" />
              ) : (
                <TicketOutline size={24} color="#000" />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused ? styles.activeContainer : styles.inactiveContainer
              }
            >
              {focused ? (
                <UserSolid size={24} color="#000" />
              ) : (
                <UserOutline size={24} color="#000" />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeContainer: {
    backgroundColor: "#dff940",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
