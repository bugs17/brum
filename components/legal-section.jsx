import { StyleSheet, Text, View } from "react-native";
import { Fonts } from "../constants/fonts";

export const LegalSection = ({ number, title, content }) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.headerRow}>
        <View style={styles.numberBadge}>
          <Text style={styles.numberText}>{number}</Text>
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <Text style={styles.sectionContent}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: { marginBottom: 30 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  numberBadge: {
    width: 28,
    height: 28,
    backgroundColor: "black",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: { color: "white", fontFamily: Fonts.bold, fontSize: 14 },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: "black",
    flex: 1,
  },
  sectionContent: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "#444",
    lineHeight: 22,
    textAlign: "justify",
  },
});
