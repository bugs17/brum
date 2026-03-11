import { MotiView } from "moti";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronUpIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.faqWrapper}>
      <View style={styles.faqShadow} />
      <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.faqBody}>
        <View style={styles.faqHeader}>
          <Text style={styles.faqTitle}>{title}</Text>
          {isOpen ? (
            <ChevronUpIcon size={20} color="black" />
          ) : (
            <ChevronDownIcon size={20} color="black" />
          )}
        </View>
        {isOpen && (
          <MotiView
            from={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            style={styles.faqContent}
          >
            <View style={styles.faqDivider} />
            <Text style={styles.faqText}>{content}</Text>
          </MotiView>
        )}
      </Pressable>
    </View>
  );
};

const PaymentFAQScreen = () => {
  const router = useSafeRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Bantuan Bayar</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AccordionItem
          title="Bagaimana cara bayar lewat QRIS?"
          content="Setelah konfirmasi pesanan, kode QRIS akan muncul. Anda bisa langsung screenshot/unduh dan bayar melalui aplikasi e-wallet atau m-banking apa saja."
        />
        <AccordionItem
          title="Status pembayaran belum berubah"
          content="Verifikasi QRIS biasanya memakan waktu 1-3 menit. Jika lebih dari itu, harap pastikan saldo terpotong dan simpan bukti transaksi untuk dicek tim kami."
        />
        <AccordionItem
          title="Ketentuan Refund/Pembatalan"
          content="Refund hanya bisa dilakukan jika mitra belum menyerahkan unit. Dana akan dikembalikan ke saldo wallet Brum Anda secara otomatis."
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 20,
    gap: 15,
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: { fontFamily: Fonts.bold, fontSize: 24 },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  faqWrapper: { position: "relative", marginBottom: 18 },
  faqShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 16,
  },
  faqBody: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    padding: 16,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqTitle: { fontFamily: Fonts.bold, fontSize: 14, color: "black", flex: 1 },
  faqContent: { marginTop: 12 },
  faqDivider: {
    height: 1,
    backgroundColor: "#EEE",
    marginBottom: 12,
    borderStyle: "dashed",
    borderWidth: 1,
  },
  faqText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },
});

export default PaymentFAQScreen;
