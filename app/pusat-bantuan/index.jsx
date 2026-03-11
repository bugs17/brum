import { useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ChatBubbleLeftRightIcon,
  ChevronLeftIcon,
  CreditCardIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { HelpCategoryCard } from "../../components/help-kategory-card"; // Pastikan path benar
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const HelpCenterScreen = () => {
  const router = useSafeRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openCSBrum = () => {
    // Fokus CS: Masalah sistem, pembayaran, atau penengah komplain
    Linking.openURL(
      "https://wa.me/6281234567890?text=Halo CS Brum, saya ada kendala terkait transaksi saya.",
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Pusat Bantuan</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Notice Agregator - Edukasi User */}
        <View style={styles.noticeBox}>
          <View style={styles.noticeShadow} />
          <View style={styles.noticeBody}>
            <View style={styles.noticeHeader}>
              <UserGroupIcon size={20} color="black" />
              <Text style={styles.noticeTitle}>Info Layanan Brum</Text>
            </View>
            <Text style={styles.noticeDesc}>
              Brum memfasilitasi transaksi Anda dengan mitra rental. Kami siap
              membantu jika terjadi kendala pada sistem pembayaran atau
              perselisihan dengan mitra.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>KATEGORI BANTUAN</Text>

        {/* Masalah Pembayaran - Arahkan ke Screen FAQ Payment */}
        <HelpCategoryCard
          title="Masalah Pembayaran & QRIS"
          color="#FEF08A"
          icon={<CreditCardIcon size={24} color="black" />}
          onPress={() => router.push("help/payment-faq")}
        />

        {/* Komplain - Arahkan ke Alur Laporan Mitra */}
        {isLoggedIn && (
          <>
            <HelpCategoryCard
              title="Lapor Kendala Mitra Rental"
              color="#FECACA"
              icon={<ExclamationTriangleIcon size={24} color="black" />}
              onPress={() => router.push("help/report-merchant")}
            />

            <View style={styles.spacer} />

            <Text style={styles.sectionLabel}>HUBUNGI KAMI</Text>

            {/* Chat CS - Masalah Mendesak */}
            <Pressable onPress={openCSBrum} style={styles.csCard}>
              <View style={styles.csShadow} />
              <View style={styles.csBody}>
                <View style={styles.csIconCircle}>
                  <ChatBubbleLeftRightIcon size={24} color="black" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.csTitle}>Chat Customer Service</Text>
                  <Text style={styles.csSubtitle}>
                    Tanggapan cepat (08:00 - 22:00 WIT)
                  </Text>
                </View>
              </View>
            </Pressable>
          </>
        )}

        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>
            Layanan pengaduan konsumen Brum Jayapura{"\n"}
            Email: support@brum.id
          </Text>
        </View>
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
    backgroundColor: "white",
  },
  headerTitle: { fontFamily: Fonts.bold, fontSize: 24 },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  sectionLabel: {
    fontFamily: Fonts.semibold,
    fontSize: 12,
    color: "#666",
    marginBottom: 15,
    letterSpacing: 1,
  },
  spacer: { height: 10 },

  // NOTICE BOX
  noticeBox: { position: "relative", marginBottom: 30, marginTop: 10 },
  noticeShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 16,
  },
  noticeBody: {
    backgroundColor: "#BAE6FD",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    padding: 16,
  },
  noticeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  noticeTitle: { fontFamily: Fonts.bold, fontSize: 14, color: "black" },
  noticeDesc: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#333",
    lineHeight: 18,
  },

  // CS CARD
  csCard: { position: "relative", height: 80, marginTop: 5 },
  csShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 16,
  },
  csBody: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    gap: 15,
  },
  csIconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#BBF7D0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
  },
  csTitle: { fontFamily: Fonts.bold, fontSize: 16, color: "black" },
  csSubtitle: { fontFamily: Fonts.regular, fontSize: 12, color: "#666" },

  footerInfo: { marginTop: 40, alignItems: "center" },
  footerText: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: "#999",
    textAlign: "center",
    lineHeight: 18,
  },
});

export default HelpCenterScreen;
