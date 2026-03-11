import { MotiView } from "moti";
import { StyleSheet, View } from "react-native";

export const LegalSkeleton = () => {
  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ loop: true, type: "timing", duration: 800 }}
        style={styles.skeletonIntro}
      />

      {[1, 2, 3].map((i) => (
        <View key={i} style={styles.sectionContainer}>
          <View style={styles.headerRow}>
            <MotiView
              from={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{
                loop: true,
                type: "timing",
                duration: 800,
                delay: i * 100,
              }}
              style={styles.skeletonNumber}
            />
            <MotiView
              from={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{
                loop: true,
                type: "timing",
                duration: 800,
                delay: i * 100,
              }}
              style={styles.skeletonTitle}
            />
          </View>
          <MotiView
            from={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              loop: true,
              type: "timing",
              duration: 800,
              delay: i * 100,
            }}
            style={styles.skeletonContent}
          />
          <MotiView
            from={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              loop: true,
              type: "timing",
              duration: 800,
              delay: i * 100,
            }}
            style={[styles.skeletonContent, { width: "70%" }]}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  skeletonIntro: {
    height: 160,
    backgroundColor: "#E5E5E5",
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#DDD",
    marginBottom: 35,
    marginTop: 10,
  },
  sectionContainer: { marginBottom: 30 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  skeletonNumber: {
    width: 28,
    height: 28,
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
  },
  skeletonTitle: {
    height: 20,
    backgroundColor: "#E5E5E5",
    borderRadius: 4,
    flex: 0.6,
  },
  skeletonContent: {
    height: 14,
    backgroundColor: "#E5E5E5",
    borderRadius: 4,
    marginBottom: 8,
  },
});
