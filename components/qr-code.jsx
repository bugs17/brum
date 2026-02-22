import { StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

const BrumQRCode = ({ value, size = 200 }) => {
  return (
    <View style={styles.qrContainer}>
      {/* Frame Luar ala Neubrutalism */}
      <View style={styles.qrWrapper}>
        <QRCode
          value={value}
          size={size}
          color="black"
          backgroundColor="white"
          // --- KUSTOMISASI LOGO DI TENGAH ---
          logo={require("../assets/images/maskot.png")} // Ganti dengan path logo Brum kamu
          logoSize={size * 0.25}
          logoBackgroundColor="white"
          logoMargin={2}
          logoBorderRadius={8}
          // ---------------------------------
          quietZone={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  qrContainer: {
    padding: 10,
    backgroundColor: "white",
    borderWidth: 3, // Border lebih tebal
    borderColor: "black",
    borderRadius: 16,
    // Efek Shadow Neubrutalism
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  qrWrapper: {
    overflow: "hidden",
    borderRadius: 8,
  },
});

export default BrumQRCode;
