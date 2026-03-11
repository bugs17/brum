import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ChevronLeftIcon, EyeIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { LegalSection } from "../../components/legal-section";
import { LegalSkeleton } from "../../components/skeleton/legal-skeleton";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

// --- DUMMY DATA PRIVACY POLICY ---
const PRIVACY_DATA = [
  {
    id: "1",
    title: "Informasi Identitas & Verifikasi",
    content:
      "Untuk menjamin keamanan ekosistem Brum, kami mengumpulkan data verifikasi identitas (KTP/SIM). Data ini digunakan murni untuk validasi transaksi dan pencegahan penyalahgunaan akun.",
  },
  {
    id: "2",
    title: "Akses Lokasi Perangkat",
    content:
      "Kami memerlukan akses lokasi pada perangkat Anda secara real-time untuk membantu Anda menemukan Mitra Rental terdekat, menghitung estimasi jarak, serta mempermudah titik penjemputan unit.",
  },
  {
    id: "3",
    title: "Sistem Keamanan Kendaraan",
    content:
      "Demi keamanan bersama, setiap unit kendaraan dalam ekosistem Brum dilengkapi dengan sistem manajemen armada terintegrasi. Hal ini dilakukan untuk pemantauan kelaikan unit dan perlindungan aset dari tindakan ilegal.",
  },
  {
    id: "4",
    title: "Enkripsi Transaksi",
    content:
      "Seluruh data pembayaran melalui QRIS diproses secara aman melalui gerbang pembayaran terenkripsi. Brum berkomitmen untuk tidak menyimpan informasi finansial pribadi Anda secara permanen.",
  },
  {
    id: "5",
    title: "Hak & Kendali Pengguna",
    content:
      "Anda memiliki kendali penuh untuk menonaktifkan akun atau meminta penghapusan data pribadi dari server kami melalui koordinasi dengan Customer Service Brum Jayapura.",
  },
  {
    id: "6",
    title: "Komunikasi & Notifikasi",
    content:
      "Brum mengirimkan notifikasi push untuk memberikan informasi terkait status transaksi, pengingat waktu sewa, dan pembaruan layanan. Anda dapat mengatur preferensi notifikasi ini kapan saja melalui pengaturan perangkat Anda.",
  },
];

const PrivacyPolicyScreen = () => {
  const router = useSafeRouter();
  const [loading, setLoading] = useState(true);
  const [policyData, setPolicyData] = useState([]);

  useEffect(() => {
    // Simulasi penarikan data dari Backend
    const timer = setTimeout(() => {
      setPolicyData(PRIVACY_DATA);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const lastUpdateDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Back Button minimalis tanpa border */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Privasi</Text>
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
              <EyeIcon size={40} color="black" />
              <Text style={styles.introTitle}>Privasi Anda Aman</Text>
              <Text style={styles.introDesc}>
                Kami berkomitmen melindungi data pribadi Anda. Kebijakan ini
                menjelaskan bagaimana Brum mengelola informasi Anda secara
                transparan.
              </Text>
            </View>

            {/* --- LOOPING DARI DATA --- */}
            {policyData.map((item, index) => (
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
    paddingHorizontal: 25,
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

export default PrivacyPolicyScreen;
