import { AnimatePresence, MotiView } from "moti";
import { useEffect, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import {
    BanknotesIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    CreditCardIcon,
    ExclamationTriangleIcon,
    XMarkIcon,
} from "react-native-heroicons/solid";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import LoadingOverlay from "../../components/loading-overlay";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

// Dummy Data Bank
const BANK_LIST = [
  { id: "1", name: "BCA", code: "014" },
  { id: "2", name: "MANDIRI", code: "008" },
  { id: "3", name: "BNI", code: "009" },
  { id: "4", name: "BRI", code: "002" },
];

const SettingRekeningScreen = () => {
  const router = useSafeRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isValidating, setIsValidating] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);

  // insets
  const insets = useSafeAreaInsets();

  // Form State
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Simulasi Validasi ala Xendit
  const handleValidateAndSave = () => {
    if (!bankName || !accountNumber)
      return alert("Isi Bank dan No Rekening dulu!");

    setIsValidating(true);

    // Simulasi hit API Xendit 2 detik
    setTimeout(() => {
      setIsValidating(false);
      setIsValidated(true);
      setAccountHolder("BUDI SANTOSO (SIMULASI)"); // Anggap API balikin nama pemilik
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.headerSection}>
            <View style={styles.headerRow}>
              <Pressable onPress={() => router.back()} style={styles.iconBtn}>
                <ChevronLeftIcon size={24} color="black" />
              </Pressable>
              <Text style={styles.mainTitle}>REKENING BANK</Text>
            </View>
            <Text style={styles.subTitle}>
              Daftarkan rekening untuk penarikan saldo sewa motor.
            </Text>
          </View>

          {/* Pilih Bank */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NAMA BANK</Text>
            <Pressable onPress={() => setShowBankModal(true)}>
              <View style={styles.inputWrapper}>
                <BanknotesIcon
                  size={20}
                  color="black"
                  style={styles.inputIcon}
                />
                <Text
                  style={[styles.inputText, !bankName && { color: "#999" }]}
                >
                  {bankName || "Pilih Bank Tujuan"}
                </Text>
                <ChevronDownIcon size={20} color="black" />
              </View>
            </Pressable>
          </View>

          {/* Nomor Rekening */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NOMOR REKENING</Text>
            <View style={styles.inputWrapper}>
              <CreditCardIcon
                size={20}
                color="black"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Contoh: 123456789"
                style={styles.input}
                keyboardType="number-pad"
                value={accountNumber}
                onChangeText={(txt) => {
                  setAccountNumber(txt);
                  setIsValidated(false); // Reset jika nomor diubah
                }}
              />
            </View>
          </View>

          {/* Nama Pemilik (Muncul/Terisi otomatis setelah validasi) */}
          <AnimatePresence>
            {isValidated && (
              <MotiView
                from={{ opacity: 0, translateY: -10 }}
                animate={{ opacity: 1, translateY: 0 }}
                style={styles.inputGroup}
              >
                <Text style={styles.label}>NAMA PEMILIK (HASIL VALIDASI)</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    { backgroundColor: "#F0FDF4", borderColor: "#22C55E" },
                  ]}
                >
                  <CheckCircleIcon
                    size={20}
                    color="#22C55E"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      { color: "#166534", fontFamily: Fonts.bold },
                    ]}
                    value={accountHolder}
                    editable={false}
                  />
                </View>
              </MotiView>
            )}
          </AnimatePresence>

          {/* Warning Card */}
          {!isValidated && (
            <View style={styles.warningCard}>
              <ExclamationTriangleIcon size={24} color="#B91C1C" />
              <View style={{ flex: 1 }}>
                <Text style={styles.warningTitle}>PERHATIAN!</Text>
                <Text style={styles.warningText}>
                  Data harus divalidasi sistem sebelum bisa disimpan.
                </Text>
              </View>
            </View>
          )}

          {/* Button Aksi */}
          <View style={{ marginTop: 30, marginBottom: 40 }}>
            <Pressable
              onPress={handleValidateAndSave}
              style={styles.submitBtnContainer}
            >
              {({ pressed }) => (
                <View style={{ position: "relative", height: 55 }}>
                  <View style={styles.btnShadow} />
                  <MotiView
                    animate={{
                      translateX: pressed ? 4 : 0,
                      translateY: pressed ? 4 : 0,
                      backgroundColor: isValidated ? "#22C55E" : "#FEF08A",
                    }}
                    transition={{ type: "timing", duration: 50 }}
                    style={styles.btnBody}
                  >
                    <Text
                      style={[
                        styles.btnText,
                        isValidated && { color: "white" },
                      ]}
                    >
                      {isValidating
                        ? "MENGECEK REKENING..."
                        : isValidated
                          ? "SIMPAN REKENING"
                          : "VALIDASI & CEK REKENING"}
                    </Text>
                  </MotiView>
                </View>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal List Bank */}
      <Modal visible={showBankModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>PILIH BANK</Text>
              <Pressable onPress={() => setShowBankModal(false)}>
                <XMarkIcon size={24} color="black" />
              </Pressable>
            </View>
            <FlatList
              data={BANK_LIST}
              contentContainerStyle={{ paddingBottom: insets.bottom }}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                // Cek apakah item ini yang sedang dipilih
                const isSelected = bankName === item.name;

                return (
                  <Pressable
                    onPress={() => {
                      setBankName(item.name);
                      setShowBankModal(false);
                      setIsValidated(false);
                    }}
                    style={[
                      styles.bankItem,
                      isSelected && styles.bankItemActive, // Opsional: Beri background tipis jika dipilih
                    ]}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          styles.bankName,
                          isSelected && { color: "#22C55E" }, // Ubah warna teks jadi hijau jika terpilih
                        ]}
                      >
                        {item.name}
                      </Text>
                      <Text style={styles.bankCode}>{item.code}</Text>
                    </View>

                    {/* Munculkan icon check jika isSelected true */}
                    {isSelected && (
                      <CheckCircleIcon size={24} color="#22C55E" />
                    )}
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
      </Modal>

      <LoadingOverlay
        visible={isLoading || isValidating}
        message={isValidating ? "MEMVALIDASI KE BANK..." : "MENGAMBIL DATA..."}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  scrollContent: { padding: 25 },
  headerSection: { marginBottom: 30 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 15,
  },
  iconBtn: { padding: 8 },
  mainTitle: { fontFamily: Fonts.bold, fontSize: 26, color: "black" },
  subTitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  inputGroup: { marginBottom: 25 },
  label: {
    fontFamily: Fonts.semibold,
    fontSize: 12,
    color: "black",
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    backgroundColor: "white",
  },
  inputIcon: { marginRight: 10 },
  inputText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "black",
  },
  input: { flex: 1, fontFamily: Fonts.regular, fontSize: 14, color: "black" },
  warningCard: {
    backgroundColor: "#FEF2F2",
    borderWidth: 2,
    borderColor: "#B91C1C",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    gap: 12,
  },
  warningTitle: { fontFamily: Fonts.bold, fontSize: 13, color: "#B91C1C" },
  warningText: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: "#B91C1C",
    lineHeight: 16,
  },
  submitBtnContainer: { width: "100%" },
  btnShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 12,
  },
  btnBody: {
    flex: 1,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { fontFamily: Fonts.semibold, fontSize: 15, color: "black" },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    maxHeight: "80%",
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: "black",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: { fontFamily: Fonts.bold, fontSize: 18 },
  bankItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center", // Agar icon dan teks sejajar vertikal
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  bankItemActive: {
    backgroundColor: "#F0FDF4", // Hijau sangat pudar khas Neubrutalism saat dipilih
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 2,
  },
  bankName: {
    fontFamily: Fonts.semibold,
    fontSize: 16,
    color: "black",
  },
  bankCode: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});

export default SettingRekeningScreen;
