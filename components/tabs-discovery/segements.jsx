import { Fonts } from "@/constants/fonts";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ListBulletIcon, MapIcon } from "react-native-heroicons/outline";

const Segments = ({ activeTab, setActiveTab }) => {
  return (
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
  );
};

export default Segments;

const styles = StyleSheet.create({
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
});
