import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
    CalendarDaysIcon,
    CheckBadgeIcon,
    MapPinIcon,
    TicketIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../constants/fonts";

const OrderSuccessScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* --- ANIMATED ICON CEK --- */}
        <MotiView
          from={{ scale: 0, rotate: "0deg" }}
          animate={{ scale: 1, rotate: "360deg" }}
          transition={{ type: "spring", damping: 12, delay: 200 }}
          style={styles.iconWrapper}
        >
          <View style={styles.iconShadow} />
          <View style={styles.iconBody}>
            <CheckBadgeIcon size={80} color="#dff940" />
          </View>
        </MotiView>

        {/* --- TEKS PERAYAAN --- */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 500 }}
          style={styles.textSection}
        >
          <Text style={styles.congratsText}>SEWA BERHASIL!</Text>
          <Text style={styles.subText}>
            Unit kamu telah diamankan. Silakan datang ke lokasi penyedia sesuai
            jadwal.
          </Text>
        </MotiView>

        {/* --- RINGKASAN KARTU (SOP Brum) --- */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 700 }}
          style={styles.summaryCard}
        >
          <View style={styles.cardShadow} />
          <View style={styles.cardBody}>
            <View style={styles.row}>
              <TicketIcon size={20} color="black" />
              <Text style={styles.infoTitle}>ID SEWA: BRM-882910</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <CalendarDaysIcon size={18} color="#666" />
              <Text style={styles.infoValue}>22 Feb - 23 Feb 2026</Text>
            </View>

            <View style={styles.infoRow}>
              <MapPinIcon size={18} color="#666" />
              <Text style={styles.infoValue}>
                Brum Rental Sentani, Jayapura
              </Text>
            </View>
          </View>
        </MotiView>

        <Text style={styles.instructionText}>
          Tunjukkan ID Sewa atau KTP kamu saat pengambilan unit.
        </Text>
      </View>

      {/* --- FOOTER ACTION --- */}
      <View style={styles.footer}>
        <Pressable
          onPress={() => router.replace("/")}
          style={styles.btnContainer}
        >
          {({ pressed }) => (
            <View style={{ position: "relative", height: 55 }}>
              <View style={styles.btnShadow} />
              <MotiView
                animate={{
                  translateX: pressed ? 4 : 0,
                  translateY: pressed ? 4 : 0,
                }}
                transition={{ type: "timing", duration: 50 }}
                style={styles.btnBody}
              >
                <Text style={styles.btnText}>KEMBALI KE BERANDA</Text>
              </MotiView>
            </View>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  // ICON PERAYAAN
  iconWrapper: { width: 140, height: 140, marginBottom: 30 },
  iconShadow: {
    position: "absolute",
    top: 8,
    left: 8,
    right: -8,
    bottom: -8,
    backgroundColor: "black",
    borderRadius: 70,
  },
  iconBody: {
    flex: 1,
    backgroundColor: "black",
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
  },

  // TEKS
  textSection: { alignItems: "center", marginBottom: 40 },
  congratsText: { fontFamily: Fonts.semibold, fontSize: 28, color: "black" },
  subText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },

  // SUMMARY CARD
  summaryCard: { width: "100%", marginBottom: 30 },
  cardShadow: {
    position: "absolute",
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
    backgroundColor: "black",
    borderRadius: 16,
  },
  cardBody: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    padding: 20,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  infoTitle: { fontFamily: Fonts.semibold, fontSize: 14 },
  divider: {
    height: 2,
    backgroundColor: "#000",
    marginVertical: 15,
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  infoValue: { fontFamily: Fonts.regular, fontSize: 14, color: "#444" },

  instructionText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    fontStyle: "italic",
  },

  // FOOTER
  footer: { padding: 25 },
  btnContainer: { width: "100%" },
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
    backgroundColor: "#dff940",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { fontFamily: Fonts.semibold, fontSize: 15, color: "black" },
});

export default OrderSuccessScreen;
