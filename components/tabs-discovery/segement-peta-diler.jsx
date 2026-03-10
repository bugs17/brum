import { Fonts } from "@/constants/fonts";
import { MotiView } from "moti";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { MapPinIcon } from "react-native-heroicons/outline";

const { height } = Dimensions.get("window");

const PetaDiler = () => {
  return (
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
          <View key={i} style={[styles.gridLine, { top: i * (height / 10) }]} />
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
          <Text style={styles.mapHint}>Google Maps akan di-render di sini</Text>
        </View>
      </View>
    </MotiView>
  );
};

export default PetaDiler;

const styles = StyleSheet.create({
  // MAP DUMMY STYLE
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden",
    backgroundColor: "#BBF7D0", // Hijau mint
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
