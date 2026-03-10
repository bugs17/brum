import { MotiView } from "moti";
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
  PlusIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Fonts } from "../constants/fonts";
import { useSafeRouter } from "../hooks/use-safe-router";

const ActiveBookingModal = ({ isVisible, booking, onClose }) => {
  const insets = useSafeAreaInsets();
  const router = useSafeRouter();

  const handleExtendLease = () => {
    router.push(`/perpanjang-sewa/${booking?.id}`);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[styles.modalContainer, { marginBottom: insets.bottom + 40 }]}
        >
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

              {/* --- EXTEND LEASE PROMPT --- */}
              <View style={styles.extendSection}>
                <View style={styles.extendInfo}>
                  <Text style={styles.extendTitle}>
                    Ingin pakai lebih lama?
                  </Text>
                  <Text style={styles.extendSub}>
                    Perpanjang masa sewa Anda sekarang tanpa perlu ke diler.
                  </Text>
                </View>

                {/* FIX: Pressable area harus mencakup seluruh tombol */}
                <Pressable onPress={handleExtendLease}>
                  {({ pressed }) => (
                    <View style={styles.extendBtnWrapper}>
                      {/* Shadow tetap diam di belakang */}
                      <View style={styles.extendBtnShadow} />

                      {/* MotiView yang bergerak menutupi shadow saat ditekan */}
                      <MotiView
                        animate={{
                          translateX: pressed ? 4 : 0,
                          translateY: pressed ? 4 : 0,
                        }}
                        transition={{
                          type: "timing",
                          duration: 70, // Lebih cepat agar responsif
                        }}
                        style={styles.extendBtnBody}
                      >
                        <PlusIcon size={18} color="black" />
                        <Text style={styles.extendBtnText}>PERPANJANG</Text>
                      </MotiView>
                    </View>
                  )}
                </Pressable>
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
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  modalContainer: {
    position: "relative",
    maxHeight: "80%",
    width: "100%",
  },
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
  timeCard: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  timeTitle: { fontFamily: Fonts.regular, fontSize: 12 },
  timeValue: { fontFamily: Fonts.semibold, fontSize: 18 },
  timeSub: { fontFamily: Fonts.regular, fontSize: 12, color: "#666" },
  divider: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 12,
    opacity: 0.1,
  },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  locationText: { fontFamily: Fonts.regular, fontSize: 12, color: "#666" },

  extendSection: {
    width: "100%",
    backgroundColor: "#F0F9FF",
    borderWidth: 2,
    borderColor: "#BAE6FD",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    gap: 12,
  },
  extendInfo: { flex: 1 },
  extendTitle: { fontFamily: Fonts.semibold, fontSize: 14, color: "#0369A1" },
  extendSub: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: "#075985",
    marginTop: 2,
  },

  // Perbaikan Button Wrapper
  extendBtnWrapper: {
    position: "relative",
    height: 48,
    width: "100%",
  },
  extendBtnShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 12,
  },
  extendBtnBody: {
    position: "absolute", // Harus absolute agar menimpa shadow
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#DFF940",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  extendBtnText: { fontFamily: Fonts.semibold, fontSize: 13 },

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
