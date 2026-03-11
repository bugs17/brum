import { MotiView } from "moti";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import { Fonts } from "../constants/fonts"; // Sesuaikan path constants lo

export const HelpCategoryCard = ({ title, icon, color, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      {({ pressed }) => (
        <View style={{ flex: 1 }}>
          <View style={styles.shadow} />
          <MotiView
            animate={{
              translateX: pressed ? 4 : 0,
              translateY: pressed ? 4 : 0,
            }}
            transition={{ type: "timing", duration: 50 }}
            style={styles.body}
          >
            <View style={[styles.iconBox, { backgroundColor: color }]}>
              {icon}
            </View>
            <View style={styles.textBox}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <ChevronRightIcon size={20} color="black" />
          </MotiView>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: { height: 80, marginBottom: 18, position: "relative" },
  shadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 16,
  },
  body: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: { flex: 1, marginLeft: 15 },
  title: { fontFamily: Fonts.bold, fontSize: 15, color: "black" },
});
