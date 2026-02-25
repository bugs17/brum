import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import { Fonts } from "../constants/fonts"; // Pastikan path sesuai

const LoadingOverlay = ({ visible, message = "MENGAMBIL DATA..." }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.loadingContainer}>
        <View style={styles.loadingCard}>
          {/* Shadow khas Neubrutalism */}
          <View style={styles.loadingShadow} />

          <View style={styles.loadingBody}>
            {/* Spinner standar yang ringan */}
            <ActivityIndicator size="large" color="black" />

            <Text style={styles.loadingText}>{message}</Text>

            {/* Tips: Di sini kamu bisa selipkan Image kucing pixel art 
                kecil di bawah teks agar lebih gemas */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff", // Overlay transparan
    justifyContent: "center",
    alignItems: "center",
  },
  loadingCard: {
    width: 220,
    height: 140,
    position: "relative",
  },
  loadingShadow: {
    position: "absolute",
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
    backgroundColor: "black",
    borderRadius: 20,
  },
  loadingBody: {
    flex: 1,
    backgroundColor: "#BAE6FD", // Warna biru muda konsisten dengan Brum
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: "black",
    textAlign: "center",
    letterSpacing: 1,
  },
});

export default LoadingOverlay;
