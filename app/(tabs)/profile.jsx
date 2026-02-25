import { MotiView } from "moti";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  ArrowLeftOnRectangleIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  StarIcon,
  UserCircleIcon
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const Profile = () => {
  const router = useSafeRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [modalHowVisible, setModalHowVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Profil</Text>
          {isLoggedIn && (
            <Pressable style={styles.notifBtn}>
              <BellIcon size={24} color="black" />
            </Pressable>
          )}
        </View>

        {isLoggedIn ? <AuthenticatedUI /> : <GuestUI />}

        {/* --- QUICK SETTINGS GRID --- */}
        {isLoggedIn && (
          <>
            <Text style={styles.sectionTitle}>Pengaturan Akun</Text>
            <View style={styles.gridContainer}>
              <GridItem
                icon={<Cog6ToothIcon size={24} color="black" />}
                title="Edit Profil"
                color="#FECACA"
                onPress={() => router.push("edit-profil")}
              />
              <GridItem
                icon={<StarIcon size={24} color="black" />}
                title="Ulasan Saya"
                color="#FEF08A"
                onPress={() => router.push("ulasan")}
              />
            </View>
          </>
        )}

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <MenuItem
            icon={<ChatBubbleLeftRightIcon size={22} color="black" />}
            title="Pusat Bantuan"
          />
          <MenuItem
            icon={<ShieldCheckIcon size={22} color="black" />}
            title="Syarat & Ketentuan"
          />

          {isLoggedIn && (
            <MenuItem
              icon={<ArrowLeftOnRectangleIcon size={22} color="#FF4444" />}
              title="Keluar Akun"
              isLast
              color="#FF4444"
            />
          )}
        </View>

        <Text style={styles.versionText}>Brum App v1.0.4 - Made with ❤️</Text>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- SUB-COMPONENT: GUEST UI ---
const GuestUI = () => (
  <View style={styles.guestContainer}>
    <View style={styles.guestCard}>
      <View style={styles.cardShadow} />
      <View style={styles.cardBody}>
        <View style={styles.imagePlaceholder}>
          <UserCircleIcon size={80} color="#DDD" />
        </View>
        <Text style={styles.guestTitle}>Belum Masuk Akun</Text>
        <Text style={styles.guestSubtitle}>
          Masuk sekarang untuk mulai sewa motor dan pantau status pesananmu
          dengan mudah.
        </Text>

        <Pressable style={styles.loginBtn}>
          {({ pressed }) => (
            <View style={{ position: "relative", width: "100%", height: 50 }}>
              <View style={styles.btnShadow} />
              <MotiView
                animate={{
                  translateX: pressed ? 4 : 0,
                  translateY: pressed ? 4 : 0,
                }}
                transition={{ type: "timing", duration: 50 }}
                style={styles.btnBody}
              >
                <Text style={styles.btnText}>MASUK / DAFTAR</Text>
              </MotiView>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  </View>
);

// --- SUB-COMPONENT: AUTHENTICATED UI ---
const AuthenticatedUI = () => (
  <View style={styles.authContainer}>
    <View style={styles.userHeader}>
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarShadow} />
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>AS</Text>
        </View>
        <View style={styles.verifiedBadge}>
          <StarIcon size={12} color="black" />
        </View>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Alex Syahputra</Text>
        <Text style={styles.userEmail}>alex.design@gmail.com</Text>
      </View>
    </View>

    <View style={styles.statsRow}>
      <View style={[styles.statBox, { backgroundColor: "#BAE6FD" }]}>
        <CreditCardIcon size={20} color="black" />
        <Text style={styles.statLabel}>Saldo</Text>
        <Text style={styles.statValue}>Rp 125.000</Text>
      </View>
      <View style={[styles.statBox, { backgroundColor: "#BBF7D0" }]}>
        <Text style={styles.statLabel}>Total Trip</Text>
        <Text style={styles.statValue}>12 Kali</Text>
      </View>
    </View>
  </View>
);

const GridItem = ({ icon, title, color, onPress }) => (
  <Pressable onPress={onPress} style={styles.gridItemWrapper}>
    {({ pressed }) => (
      <View style={{ flex: 1 }}>
        <View style={styles.gridShadow} />
        <MotiView
          animate={{
            translateX: pressed ? 3 : 0,
            translateY: pressed ? 3 : 0,
          }}
          transition={{ type: "timing", duration: 50 }}
          style={[styles.gridBody, { backgroundColor: color }]}
        >
          {icon}
          <Text style={styles.gridTitle}>{title}</Text>
        </MotiView>
      </View>
    )}
  </Pressable>
);

const MenuItem = ({ icon, title, isLast, color = "black" }) => (
  <Pressable style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}>
    <View style={styles.menuLeft}>
      {icon}
      <Text style={[styles.menuTitle, { color }]}>{title}</Text>
    </View>
    <ChevronRightIcon size={20} color={color === "black" ? "#CCC" : color} />
  </Pressable>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  scrollContent: { padding: 25 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  headerTitle: { fontFamily: Fonts.bold, fontSize: 32 },
  notifBtn: {
    padding: 8,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    backgroundColor: "white",
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    marginBottom: 15,
    marginTop: 10,
  },

  // PROMO CARD (REPAIRED)
  promoWrapper: {
    marginBottom: 25,
    width: "100%",
  },
  promoShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 16,
  },
  promoBody: {
    flex: 1,
    backgroundColor: "#C7D2FE",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  promoTitle: { fontFamily: Fonts.bold, fontSize: 16, color: "black" },
  promoSub: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: "black",
    opacity: 0.7,
  },
  promoIconBtn: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "black",
    marginLeft: 5,
  },

  // GUEST UI STYLES
  guestContainer: { marginBottom: 30 },
  guestCard: { height: 320, position: "relative" },
  cardShadow: {
    position: "absolute",
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
    backgroundColor: "black",
    borderRadius: 20,
  },
  cardBody: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholder: { marginBottom: 15 },
  guestTitle: { fontFamily: Fonts.bold, fontSize: 20, marginBottom: 8 },
  guestSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  loginBtn: { width: "100%" },

  // GRID SETTINGS
  gridContainer: { flexDirection: "row", gap: 15, marginBottom: 25 },
  gridItemWrapper: { flex: 1, height: 100 },
  gridShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 16,
  },
  gridBody: {
    flex: 1,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  gridTitle: { fontFamily: Fonts.bold, fontSize: 13 },

  // AUTH STYLE
  authContainer: { marginBottom: 30 },
  userHeader: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
  avatarWrapper: { width: 80, height: 80, position: "relative" },
  avatarShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 24,
  },
  avatar: {
    flex: 1,
    backgroundColor: "#DDD",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: { fontFamily: Fonts.bold, fontSize: 24 },
  verifiedBadge: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: "#dff940",
    borderWidth: 2,
    borderColor: "black",
    padding: 4,
    borderRadius: 10,
  },
  userInfo: { marginLeft: 20 },
  userName: { fontFamily: Fonts.bold, fontSize: 22 },
  userEmail: { fontFamily: Fonts.regular, fontSize: 14, color: "#666" },
  statsRow: { flexDirection: "row", gap: 15 },
  statBox: {
    flex: 1,
    padding: 15,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "black",
    gap: 5,
  },
  statLabel: { fontFamily: Fonts.regular, fontSize: 10, color: "black" },
  statValue: { fontFamily: Fonts.bold, fontSize: 16 },

  // BUTTONS & OTHERS
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
  btnText: { fontFamily: Fonts.bold, fontSize: 14 },
  menuSection: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  menuLeft: { flexDirection: "row", alignItems: "center", gap: 15 },
  menuTitle: { fontFamily: Fonts.semibold, fontSize: 14 },
  versionText: {
    textAlign: "center",
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: "#CCC",
    marginTop: 25,
  },
});

export default Profile;
