import { useState } from "react"; // Tambah useState
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import {
    ChevronLeftIcon,
    ExclamationTriangleIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { TransactionSelectorModal } from "../../components/modal-select-motor-report";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const ReportMerchantScreen = () => {
  const router = useSafeRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Data Dummy untuk list transaksi
  const transactions = [
    {
      id: "8821",
      motorName: "Honda Vario 160",
      date: "12 Mar 2026",
      status: "Aktif",
    },
    {
      id: "8790",
      motorName: "Yamaha NMAX",
      date: "10 Mar 2026",
      status: "Selesai",
    },
    {
      id: "8755",
      motorName: "Honda Beat",
      date: "05 Mar 2026",
      status: "Selesai",
    },
    {
      id: "76",
      motorName: "Honda Beat",
      date: "05 Mar 2026",
      status: "Selesai",
    },
    {
      id: "23",
      motorName: "Honda Beat",
      date: "05 Mar 2026",
      status: "Selesai",
    },
    {
      id: "43",
      motorName: "Honda Beat",
      date: "05 Mar 2026",
      status: "Selesai",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Lapor Mitra</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.alertBox}>
          <ExclamationTriangleIcon size={20} color="#991B1B" />
          <Text style={styles.alertText}>
            Laporan Anda sangat penting bagi kualitas layanan Brum Jayapura.
            Kami akan melakukan evaluasi terhadap mitra terkait.
          </Text>
        </View>

        <Text style={styles.label}>PILIH TRANSAKSI</Text>
        <Pressable
          style={styles.selector}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={[
              styles.selectorText,
              selectedTransaction && { color: "black" },
            ]}
          >
            {selectedTransaction
              ? `${selectedTransaction.motorName} (INV-${selectedTransaction.id})`
              : "Pilih motor yang Anda sewa..."}
          </Text>
        </Pressable>

        <Text style={styles.label}>DETAIL KENDALA</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={5}
          placeholder="Jelaskan kendala Anda..."
          textAlignVertical="top"
          cursorColor={"black"}
        />

        <Pressable
          style={styles.submitBtn}
          onPress={() => alert("Laporan telah kami terima.")}
        >
          <Text style={styles.submitBtnText}>KIRIM LAPORAN</Text>
        </Pressable>
      </ScrollView>

      <TransactionSelectorModal
        visible={modalVisible}
        transactions={transactions}
        onClose={() => setModalVisible(false)}
        onSelect={(item) => {
          setSelectedTransaction(item);
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

// ... Styles tetap sama seperti sebelumnya ...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 20,
    gap: 15,
  },
  backBtn: { padding: 8 },
  headerTitle: { fontFamily: Fonts.bold, fontSize: 24 },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  alertBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#FEE2E2",
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  alertText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#991B1B",
    flex: 1,
    lineHeight: 18,
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
    letterSpacing: 1,
  },
  selector: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "white",
  },
  selectorText: { fontFamily: Fonts.regular, fontSize: 14, color: "#AAA" },
  textArea: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    padding: 15,
    backgroundColor: "white",
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginBottom: 25,
    minHeight: 120,
    color: "black",
  },
  submitBtn: {
    backgroundColor: "black",
    height: 55,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnText: { fontFamily: Fonts.bold, fontSize: 16, color: "white" },
});

export default ReportMerchantScreen;
