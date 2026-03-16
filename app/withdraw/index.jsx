import { MotiView } from "moti";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
    ChevronLeftIcon,
    ExclamationTriangleIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

const Withdraw = () => {
  const router = useSafeRouter();
  const [amount, setAmount] = useState("0");
  const balance = 125000000000; // Contoh saldo dari profil

  const quickAmounts = [50000, 100000, 250000, 500000];

  const handleNumpad = (val) => {
    if (val === "DEL") {
      setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (val === "000") {
      setAmount((prev) => (prev === "0" ? "0" : prev + "000"));
    } else {
      setAmount((prev) => (prev === "0" ? val : prev + val));
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(parseInt(val));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER - Gaya Neubrutalisme */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Tarik Saldo</Text>
        <View style={{ width: 45 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* INFO SALDO BOX */}
        <View style={styles.balanceInfo}>
          <View style={styles.infoShadow} />
          <View style={styles.infoBody}>
            <Text style={styles.infoLabel}>Saldo Tersedia</Text>
            <Text style={styles.infoValue}>
              {formatCurrency(balance.toString())}
            </Text>
          </View>
        </View>

        {/* INPUT DISPLAY */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Jumlah Penarikan</Text>
          <View style={styles.displayWrapper}>
            <View style={styles.displayShadow} />
            <View style={styles.displayBody}>
              <Text
                style={styles.displayText}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {formatCurrency(amount)}
              </Text>
            </View>
          </View>
        </View>

        {/* QUICK SELECTION */}
        <View style={styles.quickSelectRow}>
          {quickAmounts.map((val) => (
            <Pressable
              key={val}
              onPress={() => setAmount(val.toString())}
              style={styles.quickBtn}
            >
              <Text style={styles.quickText}>{val / 1000}K</Text>
            </Pressable>
          ))}
        </View>

        {/* NUMPAD CUSTOM - Biar gaya Brum makin sangar */}
        <View style={styles.numpadContainer}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "000", "0", "DEL"].map(
            (key) => (
              <Pressable
                key={key}
                onPress={() => handleNumpad(key)}
                style={styles.numKeyWrapper}
              >
                {({ pressed }) => (
                  <View style={{ flex: 1 }}>
                    <View style={styles.keyShadow} />
                    <MotiView
                      animate={{
                        translateX: pressed ? 3 : 0,
                        translateY: pressed ? 3 : 0,
                      }}
                      transition={{ type: "timing", duration: 50 }}
                      style={[
                        styles.keyBody,
                        key === "DEL" && { backgroundColor: "#FFB2B2" },
                      ]}
                    >
                      <Text style={styles.keyText}>{key}</Text>
                    </MotiView>
                  </View>
                )}
              </Pressable>
            ),
          )}
        </View>

        {/* WARNING BOX */}
        <View style={styles.warningBox}>
          <ExclamationTriangleIcon size={20} color="black" />
          <Text style={styles.warningText}>
            Penarikan akan diproses maksimal 1x24 jam ke rekening yang
            terdaftar.
          </Text>
        </View>

        {/* SUBMIT BUTTON */}
        <Pressable
          style={styles.submitBtn}
          onPress={() => alert(`Menarik: ${formatCurrency(amount)}`)}
        >
          {({ pressed }) => (
            <View style={{ height: 60, width: "100%" }}>
              <View style={styles.btnShadow} />
              <MotiView
                animate={{
                  translateX: pressed ? 4 : 0,
                  translateY: pressed ? 4 : 0,
                }}
                transition={{ type: "timing", duration: 50 }}
                style={styles.btnBody}
              >
                <Text style={styles.btnText}>TARIK SEKARANG</Text>
              </MotiView>
            </View>
          )}
        </Pressable>

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  backBtn: {
    padding: 10,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    backgroundColor: "white",
  },
  headerTitle: { fontFamily: Fonts.bold, fontSize: 20 },
  content: { padding: 25 },
  balanceInfo: { marginBottom: 30, height: 90 },
  infoShadow: {
    position: "absolute",
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
    backgroundColor: "black",
    borderRadius: 20,
  },
  infoBody: {
    flex: 1,
    backgroundColor: "#BAE6FD",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    padding: 15,
    justifyContent: "center",
  },
  infoLabel: { fontFamily: Fonts.regular, fontSize: 12 },
  infoValue: { fontFamily: Fonts.bold, fontSize: 20 },
  inputSection: { marginBottom: 20 },
  sectionTitle: { fontFamily: Fonts.bold, fontSize: 16, marginBottom: 12 },
  displayWrapper: { height: 80 },
  displayShadow: {
    position: "absolute",
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
    backgroundColor: "black",
    borderRadius: 16,
  },
  displayBody: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  displayText: { fontFamily: Fonts.bold, fontSize: 28, textAlign: "right" },
  quickSelectRow: { flexDirection: "row", gap: 10, marginBottom: 30 },
  quickBtn: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  quickText: { fontFamily: Fonts.bold, fontSize: 12 },
  numpadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 25,
  },
  numKeyWrapper: { width: "30.5%", height: 65 },
  keyShadow: {
    position: "absolute",
    top: 3,
    left: 3,
    right: -3,
    bottom: -3,
    backgroundColor: "black",
    borderRadius: 12,
  },
  keyBody: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  keyText: { fontFamily: Fonts.bold, fontSize: 20 },
  warningBox: {
    flexDirection: "row",
    backgroundColor: "#FEF9C3",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    padding: 15,
    gap: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  warningText: { fontFamily: Fonts.regular, fontSize: 12, flex: 1 },
  btnShadow: {
    position: "absolute",
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
    backgroundColor: "black",
    borderRadius: 16,
  },
  btnBody: {
    flex: 1,
    backgroundColor: "#dff940",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { fontFamily: Fonts.bold, fontSize: 18 },
});

export default Withdraw;
