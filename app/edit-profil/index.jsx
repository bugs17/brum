import { MotiView } from "moti";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
    BanknotesIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    IdentificationIcon,
    ShieldCheckIcon,
    UserCircleIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../constants/fonts";

const EditProfileHub = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Pressable onPress={() => {}} style={styles.iconBtn}>
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Edit Profil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Section 1: Data Utama */}
        <Text style={styles.sectionLabel}>IDENTITAS & DOKUMEN</Text>

        <MenuCard
          title="Data Diri & KTP"
          subtitle="Nama, NIK, dan Foto KTP"
          icon={<IdentificationIcon size={24} color="black" />}
          status="verified"
          color="#BAE6FD" // Blue
          onPress={() => {
            /* Navigasi ke ProfileCompletionScreen dengan mode edit */
          }}
        />

        <MenuCard
          title="Dokumen Berkendara"
          subtitle="Foto SIM C Aktif"
          icon={<ShieldCheckIcon size={24} color="black" />}
          status="missing"
          color="#BBF7D0" // Green
          onPress={() => {}}
        />

        {/* Section 2: Finansial */}
        <Text style={[styles.sectionLabel, { marginTop: 20 }]}>KEUANGAN</Text>

        <MenuCard
          title="Rekening Bank"
          subtitle="Untuk penarikan saldo (Withdraw)"
          icon={<BanknotesIcon size={24} color="black" />}
          status="missing"
          color="#FEF08A" // Yellow
          onPress={() => {
            /* Navigasi ke Screen Atur Rekening */
          }}
        />

        {/* Section 3: Akun */}
        <Text style={[styles.sectionLabel, { marginTop: 20 }]}>KEAMANAN</Text>
        <MenuCard
          title="Ubah Username"
          subtitle="Ganti nama tampilan kamu"
          icon={<UserCircleIcon size={24} color="black" />}
          color="#FECACA" // Red/Pink
          onPress={() => {}}
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Beberapa data yang sudah terverifikasi oleh tim Brum tidak dapat
            diubah secara instan demi keamanan transaksi.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Komponen Reusable Menu Card ---
const MenuCard = ({ title, subtitle, icon, color, onPress, status = null }) => {
  const renderStatusBadge = () => {
    // Jika status tidak ada, jangan render apa-apa
    if (!status) return null;

    const statusStyles = {
      verified: { bg: "#BBF7D0", text: "TERVERIFIKASI" },
      pending: { bg: "#FEF08A", text: "MENUNGGU" },
      rejected: { bg: "#FECACA", text: "DITOLAK" },
      missing: { bg: "#E5E7EB", text: "BELUM LENGKAP", color: "#666" },
    };

    const current = statusStyles[status] || statusStyles.missing;

    return (
      <View style={[styles.badge, { backgroundColor: current.bg }]}>
        <Text
          style={[styles.badgeText, current.color && { color: current.color }]}
        >
          {current.text}
        </Text>
      </View>
    );
  };

  return (
    <Pressable
      onPress={onPress}
      style={[styles.cardWrapper, { height: status ? 105 : 90 }]}
    >
      {({ pressed }) => (
        <View style={{ flex: 1 }}>
          <View style={styles.cardShadow} />
          <MotiView
            animate={{
              translateX: pressed ? 4 : 0,
              translateY: pressed ? 4 : 0,
            }}
            transition={{ type: "timing", duration: 50 }}
            style={styles.cardBody}
          >
            <View style={[styles.iconContainer, { backgroundColor: color }]}>
              {icon}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{title}</Text>
              <Text
                style={[styles.cardSubtitle, { marginBottom: status ? 0 : 0 }]}
              >
                {subtitle}
              </Text>
              {renderStatusBadge()}
            </View>
            <ChevronRightIcon size={20} color="black" />
          </MotiView>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconBtn: { padding: 8 },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 6,
  },
  badgeText: {
    fontFamily: Fonts.bold,
    fontSize: 8, // Kecil saja agar elegan
    color: "black",
    letterSpacing: 0.5,
  },
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
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
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

  // CARD STYLE
  cardWrapper: { height: 105, marginBottom: 18, position: "relative" },
  cardShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 16,
  },
  cardBody: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: { flex: 1, marginLeft: 15 },
  cardTitle: { fontFamily: Fonts.bold, fontSize: 16, color: "black" },
  cardSubtitle: { fontFamily: Fonts.regular, fontSize: 12, color: "#666" },

  infoBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#EEE",
    borderRadius: 12,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#999",
  },
  infoText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
    textAlign: "center",
  },
});

export default EditProfileHub;
