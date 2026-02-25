import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { MapPinIcon, XMarkIcon } from "react-native-heroicons/solid";
import { Fonts } from "../constants/fonts";

const ModalMapsLokasiUnit = ({ isMapModalVisible, setMapModalVisible }) => {
  return (
    <Modal
      visible={isMapModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setMapModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.mapModalContent}>
          <View style={styles.modalShadowEffect} />
          <View style={styles.mapModalBody}>
            <View style={styles.mapHeader}>
              <Text style={styles.mapTitle}>Lokasi Unit</Text>
              <Pressable
                onPress={() => setMapModalVisible(false)}
                style={styles.closeMapBtn}
              >
                <XMarkIcon size={20} color="black" />
              </Pressable>
            </View>

            {/* Dummy Map Area */}
            <View style={styles.dummyMapArea}>
              <MapPinIcon size={40} color="red" />
              <Text style={styles.dummyMapText}>DUMMY GOOGLE MAPS</Text>
              <Text style={styles.dummyMapCoords}>-2.5916, 140.6622</Text>
            </View>

            <View style={styles.mapFooter}>
              <Text style={styles.mapFooterText}>
                Motor berada di diler. Kamu bisa ambil langsung atau minta antar
                (biaya tambahan).
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalMapsLokasiUnit;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 20,
  },
  mapModalContent: { position: "relative", width: "100%", height: 400 },
  modalShadowEffect: {
    position: "absolute",
    top: 8,
    left: 8,
    right: -8,
    bottom: -8,
    backgroundColor: "black",
    borderRadius: 16,
  },
  mapModalBody: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 16,
    padding: 15,
  },
  mapHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  mapTitle: { fontFamily: Fonts.bold, fontSize: 18 },
  closeMapBtn: {
    padding: 5,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
  },
  dummyMapArea: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
  },
  dummyMapText: { fontFamily: Fonts.bold, fontSize: 14, marginTop: 10 },
  dummyMapCoords: { fontFamily: Fonts.regular, fontSize: 10, color: "#666" },
  mapFooter: { marginTop: 15 },
  mapFooterText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#444",
    textAlign: "center",
  },
});
