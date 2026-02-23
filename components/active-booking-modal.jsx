import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {
    ClockIcon,
    ExclamationTriangleIcon,
    MapPinIcon,
    XMarkIcon,
} from "react-native-heroicons/solid";
import { Fonts } from "../constants/fonts";

const ActiveBookingModal = ({ isVisible, booking, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalShadow} />
          <View style={styles.modalBody}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>DETAIL PENGGUNAAN</Text>
                <Text style={styles.orderId}>{booking?.id}</Text>
              </View>
              <Pressable onPress={onClose} style={styles.closeBtn}>
                <XMarkIcon size={20} color="black" />
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width: "100%" }}
              contentContainerStyle={styles.scrollContent}
            >
              {/* --- TIME INFO CARD --- */}
              <View style={styles.timeCard}>
                <View style={styles.timeRow}>
                  <ClockIcon size={20} color="black" />
                  <Text style={styles.timeTitle}>Waktu Pengembalian</Text>
                </View>
                <Text style={styles.timeValue}>Senin, 23 Feb 2026</Text>
                <Text style={styles.timeSub}>Maksimal pukul 18:00 WIT</Text>

                <View style={styles.divider} />

                <View style={styles.locationRow}>
                  <MapPinIcon size={16} color="#666" />
                  <Text style={styles.locationText}>{booking?.location}</Text>
                </View>
              </View>

              {/* --- RULES SECTION --- */}
              <View style={styles.sectionTitleBox}>
                <Text style={styles.sectionTitle}>ATURAN PENGEMBALIAN</Text>
              </View>

              <View style={styles.ruleItem}>
                <View style={styles.ruleBullet} />
                <Text style={styles.ruleText}>
                  BBM harus kembali dalam posisi yang sama saat pengambilan.
                </Text>
              </View>

              <View style={styles.ruleItem}>
                <View style={styles.ruleBullet} />
                <Text style={styles.ruleText}>
                  Keterlambatan akan dikenakan denda Rp 20.000 / jam.
                </Text>
              </View>

              <View style={styles.ruleItem}>
                <View style={styles.ruleBullet} />
                <Text style={styles.ruleText}>
                  Pastikan membawa kunci dan STNK asli saat mengembalikan.
                </Text>
              </View>

              {/* --- WARNING BOX --- */}
              <View style={styles.warningBox}>
                <ExclamationTriangleIcon size={18} color="#92400E" />
                <Text style={styles.warningText}>
                  Jika terjadi kendala di jalan atau kecelakaan, segera hubungi
                  diler melalui tombol chat.
                </Text>
              </View>
            </ScrollView>

            {/* --- FOOTER ACTION --- */}
            <Pressable onPress={onClose} style={styles.understandBtn}>
              <Text style={styles.understandText}>SAYA MENGERTI</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 25,
  },
  modalContainer: { position: "relative", maxHeight: "85%" },
  modalShadow: {
    position: "absolute",
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
    backgroundColor: "black",
    borderRadius: 20,
  },
  modalBody: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { fontFamily: Fonts.semibold, fontSize: 15 },
  orderId: { fontFamily: Fonts.regular, fontSize: 12, color: "#666" },
  closeBtn: {
    padding: 4,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
  },

  scrollContent: { paddingBottom: 10 },

  // TIME CARD
  timeCard: {
    width: "100%",
    backgroundColor: "#DFF940",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  timeTitle: { fontFamily: Fonts.regular, fontSize: 12 },
  timeValue: { fontFamily: Fonts.semibold, fontSize: 18 },
  timeSub: { fontFamily: Fonts.regular, fontSize: 12, color: "#333" },
  divider: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 12,
    opacity: 0.1,
  },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  locationText: { fontFamily: Fonts.regular, fontSize: 12, color: "#333" },

  // RULES
  sectionTitleBox: {
    alignSelf: "flex-start",
    borderBottomWidth: 2,
    borderColor: "#DFF940",
    marginBottom: 12,
  },
  sectionTitle: { fontFamily: Fonts.semibold, fontSize: 13 },
  ruleItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
    width: "100%",
  },
  ruleBullet: {
    width: 6,
    height: 6,
    backgroundColor: "black",
    borderRadius: 3,
    marginTop: 6,
  },
  ruleText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#444",
    flex: 1,
    lineHeight: 18,
  },

  warningBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#FFFBEB",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FEF3C7",
    marginTop: 10,
  },
  warningText: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: "#92400E",
    flex: 1,
    lineHeight: 16,
  },

  understandBtn: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  understandText: { color: "white", fontFamily: Fonts.semibold, fontSize: 14 },
});

export default ActiveBookingModal;
