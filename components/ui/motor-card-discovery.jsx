import { MotiView } from "moti";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MapPinIcon } from "react-native-heroicons/outline";
import { Fonts } from "../../constants/fonts";

export const DUMMY_MOTORS = [
  {
    id: 1,
    title: "Honda Vario 160 ABS",
    dealer: "AHASS Menteng",
    price: "Rp 29.500.000",
  },
  {
    id: 2,
    title: "Yamaha NMAX Turbo",
    dealer: "Yamaha Pusat",
    price: "Rp 45.000.000",
  },
  {
    id: 3,
    title: "Kawasaki Ninja ZX-25R",
    dealer: "Kawi Jakarta",
    price: "Rp 105.000.000",
  },
  {
    id: 4,
    title: "Vespa Primavera",
    dealer: "Vespa Sinergi",
    price: "Rp 52.000.000",
  },
];

const MotorCardDiscovery = ({ item, onPress }) => {
  return (
    <View style={styles.cardContainer}>
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <View style={styles.innerWrapper}>
            {/* Shadow: Persis BrumSearchTrigger */}
            <View style={styles.cardShadow} />

            {/* Body: Persis BrumSearchTrigger */}
            <MotiView
              animate={{
                translateX: pressed ? 4 : 0,
                translateY: pressed ? 4 : 0,
              }}
              transition={{
                type: "timing",
                duration: 50,
              }}
              style={styles.cardBody}
            >
              {/* Image Box: Ukuran dikunci, style ngikutin kontainer utama */}
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>IMAGE</Text>
              </View>

              <View style={styles.contentWrapper}>
                <Text style={styles.motorTitle} numberOfLines={1}>
                  {item.title}
                </Text>

                <View style={styles.dealerRow}>
                  <MapPinIcon size={14} color="#999" strokeWidth={2} />
                  <Text style={styles.dealerText} numberOfLines={1}>
                    {item.dealer}
                  </Text>
                </View>

                <Text style={styles.priceText}>{item.price}</Text>
              </View>
            </MotiView>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 110, // Kunci tinggi biar konsisten
    marginBottom: 20,
    width: "100%",
  },
  innerWrapper: {
    height: "100%",
    position: "relative",
  },
  cardShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 12, // Identik BrumSearchTrigger
  },
  cardBody: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12, // Identik BrumSearchTrigger
    paddingHorizontal: 15, // Padding dalam yang sama
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: "#999",
  },
  contentWrapper: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  motorTitle: {
    fontFamily: Fonts.semibold, // Pakai semibold biar tegas
    fontSize: 16,
    color: "black",
    marginBottom: 2,
  },
  dealerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  dealerText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#999",
    marginLeft: 4,
  },
  priceText: {
    fontFamily: Fonts.semibold,
    fontSize: 15,
    color: "black",
  },
});

export default MotorCardDiscovery;
