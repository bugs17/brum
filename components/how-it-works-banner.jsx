import { MotiView } from "moti";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { QuestionMarkCircleIcon } from "react-native-heroicons/solid";
import { Fonts } from "../constants/fonts";

const HowItWorksBanner = ({ setModalHowVisible }) => {
  return (
    <View style={styles.promoWrapper}>
      <Pressable onPress={() => setModalHowVisible(true)}>
        {({ pressed }) => (
          <View style={{ position: "relative", height: 90 }}>
            {/* Shadow tetap di belakang */}
            <View style={styles.promoShadow} />
            {/* Body yang bergerak */}
            <MotiView
              animate={{
                translateX: pressed ? 4 : 0,
                translateY: pressed ? 4 : 0,
              }}
              transition={{ type: "timing", duration: 50 }}
              style={styles.promoBody}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.promoTitle}>Cara Kerja Brum</Text>
                <Text style={styles.promoSub}>
                  Pelajari cara sewa, ambil unit, dan aturan berkendara di
                  Jayapura.
                </Text>
              </View>
              <View style={styles.promoIconBtn}>
                <QuestionMarkCircleIcon size={20} color="black" />
              </View>
            </MotiView>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default HowItWorksBanner;

const styles = StyleSheet.create({
  promoWrapper: {
    marginBottom: 25,
    width: "100%",
    paddingHorizontal: 20,
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
});
