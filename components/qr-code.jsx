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
          // Kita pakai Hitam ke Navy Gelap agar tidak membosankan tapi tetap kontras
          color="#1A1A1A"
          backgroundColor="white"
          // --- KUSTOMISASI LOGO ---
          logo={require("../assets/images/logo.png")}
          logoSize={size * 0.22} // Sedikit diperkecil agar lebih proporsional
          logoBackgroundColor="white" // Background logo putih biar menyatu dengan QR
          logoMargin={3}
          logoBorderRadius={12} // Lebih membulat agar kontras dengan frame kotak
          quietZone={10}
          ecl="H" // High error correction agar logo tidak mengganggu scanning
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  qrContainer: {
    padding: 12,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 20, // Lebih rounded biar modern

    // Shadow Neubrutalism yang solid
    shadowColor: "#000",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  qrWrapper: {
    borderRadius: 10,
    overflow: "hidden",
    // Memberikan sedikit border dalam tipis untuk memisahkan QR dengan padding luar
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
});

export default BrumQRCode;
