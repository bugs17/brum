import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ChevronLeftIcon, ShieldCheckIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { LegalSection } from "../../components/legal-section";
import { LegalSkeleton } from "../../components/skeleton/legal-skeleton";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const TermsConditionsScreen = () => {
  const router = useSafeRouter();
  const [loading, setLoading] = useState(true);
  const [legalData, setLegalData] = useState([]);

  useEffect(() => {
    // Simulasi penarikan data dari Backend Brum
    const timer = setTimeout(() => {
      setLegalData([
        {
          id: "1",
          title: "Peran Brum sebagai Agregator",
          content:
            "Brum adalah platform marketplace yang menghubungkan penyewa dengan mitra rental motor. Brum tidak memiliki, mengelola, atau mengoperasikan unit kendaraan secara langsung.",
        },
        {
          id: "2",
          title: "Tanggung Jawab Unit",
          content:
            "Kondisi fisik, perawatan, dan kelaikan jalan unit motor adalah tanggung jawab sepenuhnya dari Mitra Rental. Pengguna wajib memeriksa kondisi unit sebelum melakukan serah terima.",
        },
        {
          id: "3",
          title: "Pembayaran & Pembatalan",
          content:
            "Seluruh pembayaran wajib dilakukan melalui sistem QRIS Brum. Pembatalan sewa mengikuti kebijakan refund yang berlaku sesuai dengan durasi waktu sebelum pengambilan unit.",
        },
        {
          id: "4",
          title: "Sanksi & Denda",
          content:
            "Keterlambatan pengembalian, kerusakan unit, atau kehilangan perlengkapan (helm/STNK) akan dikenakan denda yang besarnya ditentukan oleh kebijakan masing-masing Mitra Rental.",
        },
        {
          id: "5",
          title: "Kehilangan & Kerusakan",
          content:
            "Segala bentuk kehilangan unit atau kerusakan yang disebabkan oleh kelalaian pengguna akan diproses sesuai hukum yang berlaku dan kebijakan asuransi mitra (jika tersedia).",
        },
      ]);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const lastUpdateDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Back button tanpa border sesuai instruksi */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>S&K Layanan</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <LegalSkeleton />
        ) : (
          <>
            <View style={styles.introBox}>
              <ShieldCheckIcon size={40} color="black" />
              <Text style={styles.introTitle}>Transparansi & Keamanan</Text>
              <Text style={styles.introDesc}>
                Harap baca ketentuan ini dengan seksama untuk memahami hak dan
                kewajiban Anda sebagai pengguna platform Brum.
              </Text>
            </View>

            {/* --- LOOPING DARI DATA --- */}
            {legalData.map((item, index) => (
              <LegalSection
                key={item.id}
                number={index + 1}
                title={item.title}
                content={item.content}
              />
            ))}

            <View style={styles.footer}>
              <Text style={styles.updateText}>
                Terakhir diperbarui: {lastUpdateDate}
              </Text>
            </View>
          </>
        )}
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
  scrollContent: {
    paddingHorizontal: 25, // Padding horizontal balik ke sini
    paddingBottom: 40,
  },
  introBox: {
    alignItems: "center",
    backgroundColor: "#DFF940",
    padding: 25,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 35,
    marginTop: 10,
  },
  introTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    marginTop: 10,
    color: "black",
  },
  introDesc: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    textAlign: "center",
    color: "#333",
    marginTop: 8,
    lineHeight: 20,
  },
  footer: { marginTop: 20, paddingBottom: 20, alignItems: "center" },
  updateText: { fontFamily: Fonts.regular, fontSize: 12, color: "#999" },
});

export default TermsConditionsScreen;
