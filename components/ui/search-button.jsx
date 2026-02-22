import { AnimatePresence, MotiView } from "moti";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { Fonts } from "../../constants/fonts";

const PLACEHOLDERS = [
  "Cari diler terdekat...",
  "Cari Vario 160 CC...",
  "Cari diler di Abe...",
  "Cari diler di Sentani...",
  "Cari motor listrik terbaru...",
  "Cari diler di Jayapura kota...",
];

const BrumSearchTrigger = ({ onPress }) => {
  const [index, setIndex] = useState(0);

  // Logika ganti teks setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.searchContainer}>
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <View style={styles.innerWrapper}>
            <View style={styles.searchShadow} />

            <MotiView
              animate={{
                translateX: pressed ? 4 : 0,
                translateY: pressed ? 4 : 0,
              }}
              transition={{
                type: "timing",
                duration: 50,
              }}
              style={styles.searchBody}
            >
              <MagnifyingGlassIcon size={20} color="black" />

              <View style={styles.textContainer}>
                <AnimatePresence exitBeforeEnter>
                  <MotiView
                    key={PLACEHOLDERS[index]}
                    from={{ opacity: 0, translateY: 10 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: -10 }}
                    transition={{ type: "timing", duration: 400 }}
                  >
                    <Text style={styles.placeholderAsInput}>
                      {PLACEHOLDERS[index]}
                    </Text>
                  </MotiView>
                </AnimatePresence>
              </View>
            </MotiView>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    height: 55,
    marginBottom: 25,
    width: "100%",
  },
  innerWrapper: {
    height: "100%",
    position: "relative",
  },
  searchShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 12,
  },
  searchBody: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  textContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    marginLeft: 10,
    overflow: "hidden", // Supaya teks yang keluar nggak kelihatan
  },
  placeholderAsInput: {
    fontFamily: Fonts.copywriting,
    fontSize: 14,
    color: "#999",
  },
});

export default BrumSearchTrigger;
