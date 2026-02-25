import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { BookOpenIcon, XMarkIcon } from "react-native-heroicons/solid";
import { Fonts } from "../constants/fonts";

const HowItWorksModal = ({ isVisible, onClose }) => {
  const steps = [
    {
      no: "01",
      title: "Pilih Motor & Durasi",
      desc: "Cari motor yang kamu suka di katalog Brum, lalu tentukan berapa lama kamu akan menyewa.",
    },
    {
      no: "02",
      title: "Pembayaran Aman",
      desc: "Lakukan pembayaran instan via QRIS atau pilih opsi bayar tunai langsung di diler pilihanmu.",
    },
    {
      no: "03",
      title: "Ambil Unit",
      desc: "Datang ke diler, tunjukkan bukti booking di aplikasi, dan bawa SIM C yang masih aktif.",
    },
    {
      no: "04",
      title: "Aturan Jayapura",
      desc: "Selalu gunakan helm, patuhi batas kecepatan, dan jaga kebersihan unit selama masa sewa.",
    },
  ];

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        style={[StyleSheet.absoluteFill, styles.overlay]}
      />
      <View style={styles.centeredView} pointerEvents="box-none">
        <View style={styles.modalContent}>
          {/* Shadow khas Brum - Menggunakan offset positif agar tidak terpotong */}
          <View style={styles.modalShadow} />

          <View style={styles.modalBody}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <View style={styles.headerLeft}>
                <BookOpenIcon size={22} color="black" />
                <Text style={styles.modalTitle}>CARA KERJA BRUM</Text>
              </View>
              <Pressable onPress={onClose} style={styles.closeBtn}>
                <XMarkIcon size={20} color="black" />
              </Pressable>
            </View>

            {/* Content */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
            >
              {steps.map((step, index) => (
                <View key={index} style={styles.stepItem}>
                  <Text style={styles.stepNumber}>{step.no}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepDesc}>{step.desc}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.84)" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },
  modalContent: {
    position: "relative",
    width: "100%",
    // Memberikan ruang ekstra sedikit agar shadow di kanan-bawah terlihat sempurna
    paddingRight: 6,
    paddingBottom: 6,
  },
  modalShadow: {
    position: "absolute",
    // Offset ke kanan dan bawah
    top: 6,
    left: 6,
    // Lebar dan tinggi tetap 100% mengikuti kontainer
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    borderRadius: 16,
  },
  modalBody: {
    maxHeight: 500, // Memberikan batas tinggi agar tidak overflow layar
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    padding: 20,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1.5,
    borderBottomColor: "black",
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  modalTitle: { fontFamily: Fonts.bold, fontSize: 18 },
  closeBtn: {
    padding: 4,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
    backgroundColor: "white",
  },
  stepItem: { flexDirection: "row", gap: 15, marginBottom: 20 },
  stepNumber: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: "#C7D2FE",
    // Memberikan stroke effect sederhana pada teks angka
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  stepTitle: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: "black",
    marginBottom: 4,
  },
  stepDesc: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
});

export default HowItWorksModal;
